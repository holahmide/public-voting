import { RequestHandler } from 'express';
import Session from '../../models/Session';
import { serverError } from '../../utils';

export const findSession: RequestHandler = async (req: any, res, next) => {
  try {
    let { id } = req.params;
    if (!id) id = req.body.session; // For children models
    const session = await Session.exists({ _id: id });
    if (!session) {
      return res.status(404).json({
        status: false,
        message: 'session does not exist',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};
