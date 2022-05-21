import { RequestHandler } from 'express';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import https from 'https';
import {
  serverError,
  tokenGenerator,
  sendMail,
  passcodeGenerator,
} from '../../utils';
import User from '../../models/User';
import Token from '../../models/Token';
import {
  MERCHANT_URL,
  PASSCODE_LENGTH,
} from '../../config';
import { emailConfirmationTemplate } from '../../templates';
import database from '../../models';

export const createUser: RequestHandler = async (req, res) => {
  const { regno } = req.body;
  // Start mongoose session
  const databaseConnection = await database.startSession();

  try {
    databaseConnection.startTransaction();

    /****** Get User details API *******/ 
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await fetch(
      `https://core.lmu.edu.ng:4846/api/student/${regno}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        agent,
      }
    );
    const data = await response.json();
    /****** End API Session *******/ 

    if (data === 'null') {
      throw new Error('regno does not exist');
    }

    // Get name & email
    const {email} = data;
    const fullName = data.fullname.toLowerCase().split(' ');

    // Generate Passcode
    const password = passcodeGenerator(PASSCODE_LENGTH);

    // Create User
    const user = await User.create({
      regno,
      email,
      lastName: fullName[0],
      firstName: fullName[1],
      password,
    });

    // email Confirmation with passcode information
    const token = tokenGenerator();
    await Token.create({
      token,
      type: 'user/email-confirmation',
      user: user._id,
      expires: dayjs().add(1, 'd'),
    });
    const mailStatus = await sendMail(
      user.email,
      'College Voting Passcode 📨',
      emailConfirmationTemplate({
        // @ts-ignore
        name: user.firstName,
        link: `${MERCHANT_URL}/auth/confirm-email/${token}`,
        passcode: password,
      })
    );

    await databaseConnection.commitTransaction();

    return res.status(201).json({
      status: true,
      data: {
        user,
        mailStatus,
      },
    });
  } catch (err) {
    await databaseConnection.abortTransaction();
    serverError(res, err);
  }
};

export const deleteUser: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'user deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
