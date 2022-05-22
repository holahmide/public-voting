import server_error from './server';
import token from './token';
import passcode from './passcode';
import mail from './mail';
import validation from './validation';
import Multer from './multer';
import media from './media';
import functions from './functions';

// server utils
export const serverError = server_error;

// token utils
export const { tokenGenerator } = token;

// passcode utils
export const { passcodeGenerator } = passcode;

// mail utils
export const { sendMail } = mail;

// validation confirmation util
export const { confirmValidation } = validation;

// multer
export const multer = Multer;

// image upload utils
export const { uploadMedia } = media;
export const { deleteMedia } = media;

// helper functions
export const { generateRandomRegNo } = functions;
export const { generateArrayOfLength } = functions;
export const { generateRandomNumber } = functions;
