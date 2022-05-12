import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import got from 'got';
import {
  serverError,
  tokenGenerator,
  sendMail,
  passcodeGenerator,
} from '../../utils';
import Admin from '../../models/User/admin';
import Token from '../../models/Token';
import {
  JWT_SECRET,
  JWT_DURATION,
  COOKIE_CONFIG,
  MERCHANT_URL,
  PASSCODE_LENGTH,
} from '../../config';
import {
  emailConfirmationTemplate,
  updateEmailConfirmationTemplate,
} from '../../templates';
import database from '../../models';

export const createAdmin: RequestHandler = async (req, res) => {
  // Start mongoose session
  const databaseConnection = await database.startSession();

  const { email } = req.body;

  try {
    databaseConnection.startTransaction();

    const password = passcodeGenerator(PASSCODE_LENGTH + 9);

    // Create User
    const user = await Admin.create({
      ...req.body,
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
      process.env.EMAIL || '',
      'College Voting Passcode 📨',
      emailConfirmationTemplate({
        // @ts-ignore
        name: user.firstName,
        link: `${MERCHANT_URL}/auth/confirm-email/${token}`,
        passcode: password,
      })
    );

    // JWT
    const access_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_DURATION,
    });
    res.cookie('access_token', access_token, COOKIE_CONFIG);

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

export const deleteAdmin: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    await Admin.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'admin deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};