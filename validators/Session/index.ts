import { body } from 'express-validator';

export const validateCreateSession = () => [
  body('title')
    .exists()
    .withMessage('title is required')
    .trim()
    .escape(),
  body('description').trim().escape(),
  body('startDate')
    .isDate()
    .withMessage('The start date has to be a date')
    .trim()
    .escape(),
    body('endDate')
    .isDate()
    .withMessage('The end date has to be a date')
    .trim()
    .escape(),
];

export const validateUpdateSession = () => [
  body('title')
    .optional()
    .trim()
    .escape(),
  body('description').optional().trim().escape(),
  body('startDate')
    .optional()
    .isDate()
    .withMessage('The start date has to be a date')
    .trim()
    .escape(),
  body('endDate')
    .optional()
    .isDate()
    .withMessage('The end date has to be a date')
    .trim()
    .escape(),
];
