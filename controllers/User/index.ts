import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { serverError, tokenGenerator, sendMail } from '../../utils';
import User from '../../models/User';
import Token from '../../models/Token';
import {
  JWT_SECRET,
  JWT_DURATION,
  COOKIE_CONFIG,
  MERCHANT_URL,
} from '../../config';
import {
  emailConfirmationTemplate,
  updateEmailConfirmationTemplate,
} from '../../templates';

export const createUser: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.create({
      ...req.body,
    });
    // email Confirmation
    const token = tokenGenerator();
    await Token.create({
      token,
      type: 'user/email-confirmation',
      user: user._id,
      expires: dayjs().add(1, 'd'),
    });
    const mailStatus = await sendMail(
      email,
      'Email Confirmation 📨',
      emailConfirmationTemplate({
        // @ts-ignore
        name: user.firstName,
        link: `${MERCHANT_URL}/auth/confirm-email/${token}`,
      })
    );
    // JWT
    const access_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_DURATION,
    });
    res.cookie('access_token', access_token, COOKIE_CONFIG);

    return res.status(201).json({
      status: true,
      data: {
        user,
        mailStatus,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const updateUser: RequestHandler = async (req: any, res) => {
  const { user } = req;
  const { id } = req.params;
  const { email, password } = req.body;
  if (password) delete req.body.password;

  try {
    const findUser = await User.findOne({ _id: id || user });
    let mailStatus: SendMailReturn = {
      status: true,
      message: '',
    };
    if (findUser.email !== email) {
      const token = tokenGenerator();
      await Token.create({
        token,
        type: 'user/email-confirmation',
        user: findUser._id,
        expires: dayjs().add(1, 'd'),
      });
      mailStatus = await sendMail(
        email,
        'Email Confirmation 📨',
        updateEmailConfirmationTemplate({
          name: findUser.firstName,
          link: `${MERCHANT_URL}/auth/confirm-email/${token}`,
        })
      );
      req.body.isConfirmed = false;
    }
    await User.findByIdAndUpdate({ _id: id || user }, req.body);
    return res.status(200).json({
      status: true,
      data: {
        user,
        mailStatus,
      },
    });
  } catch (err) {
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

export const changePassword: RequestHandler = async (req: any, res) => {
  const { newPassword } = req.body;
  const { user: user_id } = req;

  try {
    const user = await User.findById(user_id);
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      status: true,
      data: {
        message: 'Successfully changed password',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const removeRole: RequestHandler = async (req: any, res) => {
  const { id, roleId } = req.params;
  try {
    const user = await User.findById(id).populate('roles');
    user.roles = [
      ...user.roles
        .filter((el: any) => el._id.toString() !== roleId)
        .map((el: any) => el._id),
    ];
    await user.save();

    return res.status(200).json({
      status: true,
      data: {
        message: 'Successfully removed role',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const addRole: RequestHandler = async (req: any, res) => {
  const { id, roleId } = req.params;
  try {
    const user = await User.findById(id).populate('roles');
    if (!user.roles.includes(roleId)) {
      user.roles = [...user.roles, roleId];
    }
    await user.save();
    return res.status(200).json({
      status: true,
      data: {
        message: 'Successfully added role',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
