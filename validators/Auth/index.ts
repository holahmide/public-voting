import { body } from 'express-validator';

export const validateSignIn = () => [
  body('regno').exists().withMessage('regno is required'),
  body('passcode').exists().withMessage('passcode is required'),
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
