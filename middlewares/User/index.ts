import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import User from '../../models/User';
// import { passwordSchema } from '../../validators/User';
import { serverError } from '../../utils';

export const verifyCreateUser: RequestHandler = async (req, res, next) => {
  const { regno } = req.body;
  try {
    const userRegnoTest = await User.findOne({ regno });
    if (userRegnoTest) {
      return res.status(400).json({
        status: false,
        message: 'regno provided already exists, check your webmail for the passcode sent',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const findUser: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const exists = await User.exists({ _id: id });
    if (exists) {
      next();
    } else {
      return res.status(404).send({
        status: false,
        message: 'user not found',
        data: {
          user: null,
        },
      });
    }
  } catch (err) {
    serverError(res, err);
  }
};
