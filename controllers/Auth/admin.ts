import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { JWT_SECRET, JWT_DURATION, COOKIE_CONFIG } from '../../config';
import { serverError } from '../../utils';
import Admin from '../../models/User/admin';

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
  const { special_access_token } = req.cookies;
  try {
    const decoded = jwt.verify(special_access_token, JWT_SECRET);
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
