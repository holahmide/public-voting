import { body } from 'express-validator';

export const validateCreateVote = () => [
  body('nominee').exists().withMessage('nominee is required').trim().escape(),
];