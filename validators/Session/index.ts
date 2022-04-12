import { body, check } from 'express-validator';

export const validateCreateSession = () => [
  body('title').exists().withMessage('title is required').trim().escape(),
  body('description').trim().escape(),
  check('startDate').isISO8601().toDate(),
  check('endDate').isISO8601().toDate(),
];

export const validateUpdateSession = () => [
  body('title').optional().trim().escape(),
  body('description').optional().trim().escape(),
  check('startDate').optional().isISO8601().toDate(),
  check('endDate').optional().isISO8601().toDate(),
];
