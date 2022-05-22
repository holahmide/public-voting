import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import {
  JWT_SECRET,
  JWT_DURATION,
  COOKIE_CONFIG,
} from '../../config';
import { serverError } from '../../utils';
import User from '../../models/User';
import Blacklist from '../../models/User/blacklist';

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
          regno,
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
    const userData = await User.findOne({ _id: decoded.id }, { password: 0 });
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

export const signOut: RequestHandler = async (req, res) => {
  const { access_token } = req.cookies;
  // Blacklist JWT
  await Blacklist.create({ token: access_token });
  // Clear cookie
  res.clearCookie('access_token', COOKIE_CONFIG);

  return res.status(200).json({
    status: true,
    message: 'successfully logged out',
  });
};