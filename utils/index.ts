import server_error from './server';
import token from './token';
import mail from './mail';
import validation from './validation';
import Multer from './multer';
import media from './media';

// server utils
export const serverError = server_error;

// token utils
export const { tokenGenerator } = token;

// mail utils
export const { sendMail } = mail;

// validation confirmation util
export const { confirmValidation } = validation;

// multer
export const multer = Multer;

// image upload utils
export const { uploadMedia } = media;
export const { deleteMedia } = media;
