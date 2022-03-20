import { body } from 'express-validator';

export const validateCreateNominee = () => [
  body('name').exists().withMessage('name is required').trim().escape(),
  body('category').exists().withMessage('nominee category is required').trim().escape(),
];

export const validateUpdateNominee = () => [
    body('name').optional().trim().escape(),
];
