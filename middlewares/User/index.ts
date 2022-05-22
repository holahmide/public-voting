import { RequestHandler } from 'express';
import User from '../../models/User';
import { serverError } from '../../utils';

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
