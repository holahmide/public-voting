import dotenv from 'dotenv';
import InitializeDB from "./database";

dotenv.config();

export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',');
export const PORT = process.env.PORT || 3000;

// database
export const DB_URL = process.env.DB_URL || '';
export const DB_USER_ROLES = [
  'ADMIN',
  'SUPER_USER'
];
export const INITIALIZE_DB = InitializeDB;

export const JWT_DURATION = 604800; // 7 days in seconds
export const JWT_SECRET = process.env.JWT_SECRET || 'NONE';
export const COOKIE_CONFIG = { httpOnly: true };
export const PASSWORD_SALT_ROUNDS = 10;

// company info
export const EMAIL = process.env.EMAIL || 'olami02bj@gmail.com';
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
export const EMAIL_CLIENT_ID = process.env.EMAIL_CLIENT_ID || '';
export const EMAIL_SECRET = process.env.EMAIL_SECRET || '';

// website info
export const MERCHANT_URL = process.env.MERCHANT_URL || '';

// token types
export const TOKEN_TYPES: TokenTypes = [
  'user/email-confirmation',
]

// generated passcode length
export const PASSCODE_LENGTH: any = process.env.PASSCODE_LENGTH || 15;
