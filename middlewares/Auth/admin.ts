import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import dayjs from 'dayjs';
import { JWT_SECRET } from '../../config';
import { serverError } from '../../utils';
import User from '../../models/User';
import Token from '../../models/Token';

export const isAdminAuthenticated: RequestHandler = async (req: any, res, next) => {
  try {
    const { access_token } = req.cookies;
    jwt.verify(access_token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.clearCookie('special_access_token');
        return res.status(401).json({
          status: false,
          message: 'You are not logged in',
        });
      }
      req.user = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(422).json({
      status: false,
      message: 'No token provided',
    });
  }
};

export const verifyAdminSignIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'user not found',
      });
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).send({
        message: 'incorrect password',
        data: {
          user: null,
        },
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const verifyResetPassword: RequestHandler = async (req, res, next) => {
  const { token } = req.body;
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

    req.body.token = findToken;
    next();
  } catch (err) {
    serverError(res, err);
  }
};
