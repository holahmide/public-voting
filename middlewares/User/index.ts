import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import User from '../../models/User';
import { passwordSchema } from '../../validators/User';
import { serverError } from '../../utils';

export const verifyCreateUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmailTest = await User.findOne({ email });
    if (userEmailTest) {
      return res.status(400).json({
        status: false,
        message: 'email provided already exists',
      });
    }
    const passwordIsNotValid = passwordSchema.validate(password, {
      details: true,
    });
    if (passwordIsNotValid.length !== 0) {
      return res.status(422).json({
        status: false,
        message: passwordIsNotValid,
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const verifyUpdateUser: RequestHandler = async (req: any, res, next) => {
  const { email, phone, roles, isConfirmed } = req.body;
  if (roles) delete req.body.roles;
  if (isConfirmed) delete req.body.isConfirmed;
  const { user } = req;
  try {
    const userExists = await User.exists({ _id: user });
    if (!userExists) {
      return res.status(400).json({
        status: false,
        message: 'user does not exist',
      });
    }
    const userEmailTest = await User.findOne({ email });
    if (userEmailTest && userEmailTest._id.toString() !== user) {
      return res.status(400).json({
        status: false,
        message: 'email provided already exists',
      });
    }
    const userPhoneTest = await User.findOne({ phone });
    if (userPhoneTest && userPhoneTest._id.toString() !== user) {
      return res.status(400).json({
        status: false,
        message: 'phone provided already exists',
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

export const verifyChangePassword: RequestHandler = async (
  req: any,
  res,
  next
) => {
  const { oldPassword, newPassword } = req.body;
  const { user: user_id } = req;
  try {
    const user = await User.findById(user_id);
    const isValid = await user.validatePassword(oldPassword);
    if (!isValid) {
      return res.status(401).send({
        status: false,
        message: 'incorrect password',
        data: {
          user: null,
        },
      });
    }
    const passwordIsNotValid = passwordSchema.validate(newPassword, {
      details: true,
    });
    if (passwordIsNotValid.length !== 0) {
      return res.status(422).json({
        status: false,
        message: passwordIsNotValid,
      });
    }

    next();
  } catch (err) {
    serverError(res, err);
  }
};
