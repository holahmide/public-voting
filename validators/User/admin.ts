import { body } from 'express-validator';

export const validateCreateAdmin = () => [
  body('email')
    .exists()
    .withMessage('regno is required')
    .isEmail()
    .withMessage('email is invalid')
    .trim()
    .escape(),
];

export const validateUpdateAdmin = () => [
  body('email')
    .optional()
    .isEmail()
    .withMessage('email is invalid')
    .trim()
    .escape(),
];
