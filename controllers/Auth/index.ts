import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import {
  JWT_SECRET,
  JWT_DURATION,
  COOKIE_CONFIG,
  MERCHANT_URL,
} from '../../config';
import { sendMail, serverError, tokenGenerator } from '../../utils';
import User from '../../models/User';
import Token from '../../models/Token';
import { passwordSchema } from '../../validators/User';
import {
  requestEmailConfirmationTemplate,
  resetPasswordTemplate,
} from '../../templates';

export const signIn: RequestHandler = async (req, res) => {
  const { regno } = req.body;
  try {
    const user = await User.findOne({ regno });
    const access_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_DURATION,
    });
    res.cookie('access_token', access_token, COOKIE_CONFIG);
    return res.status(200).json({
      status: true,
      data: {
        user: {
          id: user._id,
          token: access_token,
        },
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const status: RequestHandler = async (req, res) => {
  const { access_token } = req.cookies;
  try {
    const decoded = jwt.verify(access_token, JWT_SECRET);
      // @ts-ignore
    const userData = await User.findOne({_id : decoded.id});
    return res.status(200).json({
      status: true,
      // @ts-ignore
      user: decoded.id,
      userData,
      message: 'user is still authenticated',
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const signOut: RequestHandler = (_, res) => {
  res.clearCookie('access_token', COOKIE_CONFIG);
  return res.status(200).json({
    status: true,
    message: 'successfully logged out',
  });
};

export const sendConfirmationEmail: RequestHandler = async (req: any, res) => {
  const { user: user_id } = req;
  try {
    await Token.deleteMany({
      user_id,
      type: 'user/email-confirmation',
    });

    const user = await User.findById(user_id);

    const token = tokenGenerator();
    await Token.create({
      expires: dayjs().add(2, 'd'),
      user: user._id,
      token,
      type: 'user/email-confirmation',
    });

    const mailStatus = await sendMail(
      user.email,
      'Email Confirmation 📨',
      requestEmailConfirmationTemplate({
        name: user.firstName,
        link: `${MERCHANT_URL}/auth/confirm-email/${token}`,
      })
    );

    return res.status(200).json({
      status: true,
      mailStatus,
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const confirmEmail: RequestHandler = async (req: any, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({
      status: false,
      message: 'token not provided',
    });
  }

  try {
    const findToken = await Token.findOne({
      token,
      type: 'user/email-confirmation',
    });

    if (!findToken) {
      return res.status(403).json({
        status: false,
        message: 'token is invalid',
      });
    }
    if (findToken.expires < dayjs()) {
      return res.status(403).json({
        status: false,
        message: 'token expired',
      });
    }

    await User.updateOne({ _id: findToken.user }, { isConfirmed: true });
    await Token.deleteOne({ _id: findToken._id });

    return res.status(200).json({
      status: true,
      message: "user's email confirmed",
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const requestResetPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
  }
  try {
    const user = await User.findOne({
      email,
    });
    await Token.deleteMany({
      user: user._id,
      type: 'auth/reset-password',
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'user does not exist',
      });
    }
    const token = tokenGenerator();
    await Token.create({
      token,
      type: 'auth/reset-password',
      expires: dayjs().add(1, 'd'),
      user: user._id,
    });
    const mailStatus = await sendMail(
      user.email,
      'Email Confirmation 📨',
      resetPasswordTemplate({
        name: user.firstName,
        link: `${MERCHANT_URL}/auth/reset-password/${token}`,
      })
    );

    return res.status(200).json({
      status: true,
      mailStatus: mailStatus.status,
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { token, password } = req.body;
  const passwordIsNotValid = passwordSchema.validate(password, {
    details: true,
  });
  if (passwordIsNotValid.length !== 0) {
    return res.status(422).json({
      status: false,
      message: passwordIsNotValid,
    });
  }
  try {
    const user = await User.findById(token.user);
    user.password = password;
    await user.save();

    await Token.deleteOne({ _id: token._id });
    return res.status(200).json({
      status: true,
      data: {
        message: 'successfully reset password',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const confirmResetPassword: RequestHandler = async (req, res) => {
  const { token } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
  }
  if (!token) {
    return res.status(422).json({
      status: false,
      message: 'token is required',
    });
  }
  try {
    const findToken = await Token.findOne({
      token,
      type: 'auth/reset-password',
    });
    if (!findToken) {
      return res.status(403).json({
        status: false,
        message: 'token invalid',
      });
    }

    if (dayjs() > findToken.expires) {
      return res.status(403).json({
        status: false,
        message: 'token expired',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'reset password link is valid',
    });
  } catch (err) {
    serverError(res, err);
  }
};
