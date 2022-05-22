import { body } from 'express-validator';

export const validateCreateUser = () => [
  body('regno')
    .exists()
    .withMessage('regno is required')
    .isLength({ min: 7, max: 7 })
    .withMessage('regno is invalid')
    .trim()
    .escape(),
];

export const validateUpdateUser = () => [
  body('regno')
    .optional()
    .isLength({ min: 7, max: 7 })
    .withMessage('regno is invalid')
    .trim()
    .escape(),
];
