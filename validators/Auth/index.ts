import { body } from 'express-validator';

export const validateSignIn = () => [
  body('regno').exists().withMessage('regno is required'),
  body('passcode').exists().withMessage('passcode is required'),
];