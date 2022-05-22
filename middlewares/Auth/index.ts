import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { serverError } from '../../utils';
import User from '../../models/User';
import Blacklist from '../../models/User/blacklist';

export const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  try {
    const { access_token } = req.cookies;
    jwt.verify(access_token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        res.clearCookie('access_token');
        return res.status(401).json({
          status: false,
          message: 'You are not logged in',
        });
      }
      const checkIfInBlackList = await Blacklist.exists({token: access_token})
      if (checkIfInBlackList) {
        res.clearCookie('access_token');
        return res.status(401).json({
          status: false,
          message: 'Token Invalid!',
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

export const verifySignIn: RequestHandler = async (req, res, next) => {
  const { regno, passcode } = req.body;
  try {
    const user = await User.findOne({ regno });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'user not found',
      });
    }
    const isValid = await user.validatePassword(passcode);
    if (!isValid) {
      return res.status(401).send({
        message: 'incorrect passcode',
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
