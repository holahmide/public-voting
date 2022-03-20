import { body } from 'express-validator';

export const validateCreateCategory = () => [
  body('name').exists().withMessage('name is required').trim().escape(),
  body('description').optional().trim().escape(),
  body('session').exists().withMessage('session is required').trim().escape(),
];

export const validateUpdateCategory = () => [
  body('name').optional().trim().escape(),
  body('description').optional().trim().escape(),
];
