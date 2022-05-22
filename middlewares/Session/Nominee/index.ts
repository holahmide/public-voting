import { RequestHandler } from 'express';
import Nominee from '../../../models/Session/Nominee';
import { serverError } from '../../../utils';

export const verifyCreateNominee: RequestHandler = async (
  req: any,
  res,
  next
) => {
  try {
    req.body.name = req.body.name.toLowerCase();
    let { regno, category } = req.body;
    const findNominee = await Nominee.exists({ regno, category });
    if (findNominee) {
      return res.status(404).json({
        status: false,
        message: `nominee (${name}) already exist for this category`,
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const verifyUpdateNominee: RequestHandler = async (
    req: any,
    res,
    next
  ) => {
    if (!req.body.name) next();
    try {
      req.body.name = req.body.name.toLowerCase();
      let { regno, category } = req.body;
      const findNominee = await Nominee.exists({ regno, category });
      if (findNominee && (findNominee._id != req.body.id && findNominee._id != req.body._id)) {
        return res.status(404).json({
          status: false,
          message: `nominee (${name}) already exist for this category`,
        });
      }
      next();
    } catch (err) {
      serverError(res, err);
    }
  };

export const findNominee: RequestHandler = async (req: any, res, next) => {
  try {
    let { id } = req.params;
    if (!id) id = req.body.nominee; // For children models
    const nominee = await Nominee.exists({ _id: id });
    if (!nominee) {
      return res.status(404).json({
        status: false,
        message: 'Nominee does not exist',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};
