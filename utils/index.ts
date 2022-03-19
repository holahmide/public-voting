import server_error from './server';
import token from './token';
import mail from './mail';

// server utils
export const serverError = server_error;

// token utils
export const { tokenGenerator } = token;

// mail utils
export const { sendMail } = mail;
