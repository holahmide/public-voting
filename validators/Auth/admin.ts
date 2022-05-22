import { body } from 'express-validator';

export const validateAdminSignIn = () => [
  body('email').exists().withMessage('email is required'),
  body('password').exists().withMessage('password is required'),
];