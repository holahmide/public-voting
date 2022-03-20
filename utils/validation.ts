import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const confirmValidation: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
  }
  next();
};

export default {
  confirmValidation,
};
