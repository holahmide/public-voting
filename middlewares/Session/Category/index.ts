import { RequestHandler } from 'express';
import Category from '../../../models/Session/Category';
import { serverError } from '../../../utils';

export const verifyCreateCategory: RequestHandler = async (
  req: any,
  res,
  next
) => {
  try {
    req.body.name = req.body.name.toLowerCase();
    let { name, session } = req.body;
    const findCategory = await Category.exists({ name, session });
    if (findCategory) {
      return res.status(404).json({
        status: false,
        message: `category (${name}) already exist for this session`,
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const verifyUpdateCategory: RequestHandler = async (
    req: any,
    res,
    next
  ) => {
    if (!req.body.name) next();
    try {
      req.body.name = req.body.name.toLowerCase();
      let { name, session } = req.body;
      const findCategory = await Category.exists({ name, session });
      if (findCategory) {
        return res.status(404).json({
          status: false,
          message: `category (${name}) already exist for this session`,
        });
      }
      next();
    } catch (err) {
      serverError(res, err);
    }
  };

export const findCategory: RequestHandler = async (req: any, res, next) => {
  try {
    let { id } = req.params;
    if (!id) id = req.body.category; // For children models
    const category = await Category.exists({ _id: id });
    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'category does not exist',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};
