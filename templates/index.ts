import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

// email RAW templates
const emailConfirmationHTML = fs.readFileSync(
  path.join(__dirname, './auth/email-confirmation.hbs'),
  'utf8'
);
const updateEmailConfirmationHTML = fs.readFileSync(
  path.join(__dirname, './auth/update-email-confirmation.hbs'),
  'utf8'
);
const requestEmailConfirmationHTML = fs.readFileSync(
  path.join(__dirname, './auth/request-email-confirmation.hbs'),
  'utf8'
);
const resetPasswordHTML = fs.readFileSync(
  path.join(__dirname, './auth/reset-password.hbs'),
  'utf8'
);

// templates
export const emailConfirmationTemplate = Handlebars.compile(
  emailConfirmationHTML
);
export const updateEmailConfirmationTemplate = Handlebars.compile(
  updateEmailConfirmationHTML
);
export const requestEmailConfirmationTemplate = Handlebars.compile(
  requestEmailConfirmationHTML
);
export const resetPasswordTemplate = Handlebars.compile(resetPasswordHTML);
