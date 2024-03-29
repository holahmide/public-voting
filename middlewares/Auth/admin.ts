import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { JWT_SECRET } from '../../config';
import { serverError } from '../../utils';
import Admin from '../../models/User/admin';
import Token from '../../models/Token';

export const isAdminAuthenticated: RequestHandler = async (req: any, res, next) => {
  try {
    const { special_access_token } = req.cookies;
    jwt.verify(special_access_token, JWT_SECRET, (err: any, decoded: any) => {
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
    const user = await Admin.findOne({ email });
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
