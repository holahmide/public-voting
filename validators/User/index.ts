import { body } from 'express-validator';
import PasswordValidator from 'password-validator';

export const passwordSchema = new PasswordValidator()
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

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
