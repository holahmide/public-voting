import { RequestHandler } from 'express';
import { serverError } from '../../../utils';
import Category from '../../../models/Session/Category';

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const createdCategory = await Category.create({
      ...req.body,
    });

    return res.status(201).json({
      status: true,
      data: {
        createdCategory,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const updateCategory: RequestHandler = async (req: any, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndUpdate({ _id: id }, req.body);
    const updatedCategory = await Category.findOne({ _id: id });
    return res.status(200).json({
      status: true,
      data: {
        updatedCategory,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const deleteCategory: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    await Category.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'Category deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
