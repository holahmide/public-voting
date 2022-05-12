import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Admin from '../../models/User/admin';
// import { passwordSchema } from '../../validators/User';
import { serverError } from '../../utils';

export const verifyCreateAdmin: RequestHandler = async (req, res, next) => {
  const { regno } = req.body;
  try {
    const userEmailTest = await Admin.findOne({ regno });
    if (userEmailTest) {
      return res.status(400).json({
        status: false,
        message: 'email provided already exists',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const findAdmin: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const exists = await Admin.exists({ _id: id });
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
