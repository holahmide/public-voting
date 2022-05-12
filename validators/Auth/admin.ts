import { body } from 'express-validator';

export const validateAdminSignIn = () => [
  body('email').exists().withMessage('email is required'),
  body('password').exists().withMessage('password is required'),
];

export const validateRequestResetPassword = () => [
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is invalid'),
];

export const validateResetPassword = () => [
  body('password').exists().withMessage('password is required'),
  body('token').exists().withMessage('reset token is required'),
];
