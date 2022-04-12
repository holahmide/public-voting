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
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is invalid')
    .trim()
    .escape(),
  body('firstName')
    .exists()
    .withMessage('firstName is required')
    .trim()
    .escape(),
  body('lastName').exists().withMessage('lastName is required').trim().escape(),
  body('password').exists().withMessage('password is required').trim().escape(),
];

export const validateUpdateUser = () => [
  body('email')
    .optional()
    .isEmail()
    .withMessage('email is invalid')
    .trim()
    .escape(),
  body('regNo').optional().trim().escape(),
  body('firstName')
    .optional()
    .exists()
    .withMessage('firstName is required')
    .trim()
    .escape(),
  body('lastName').optional().exists().withMessage('lastName is required').trim().escape(),
];

export const validateChangePassword = () => [
  body('newPassword').exists().withMessage('the new password is required'),
  body('oldPassword')
    .exists()
    .withMessage("user's current password is required"),
];
