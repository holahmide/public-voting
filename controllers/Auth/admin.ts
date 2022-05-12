import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import {
  JWT_SECRET,
  JWT_DURATION,
  COOKIE_CONFIG,
} from '../../config';
import { serverError } from '../../utils';
import Admin from '../../models/User/admin';
import Token from '../../models/Token';
import { passwordSchema } from '../../validators/User';

export const signAdminIn: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    const access_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_DURATION,
    });
    res.cookie('special_access_token', access_token, COOKIE_CONFIG);
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
    const userData = await Admin.findOne({ _id: decoded.id });
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

export const signAdminOut: RequestHandler = (_, res) => {
    res.clearCookie('access_token', COOKIE_CONFIG);
    return res.status(200).json({
      status: true,
      message: 'successfully logged out',
    });
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
    const user = await Admin.findById(token.user);
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
