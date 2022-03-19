import { Router } from 'express';
import {
  verifySignIn,
  verifyResetPassword,
  isAuthenticated,
} from '../../middlewares/Auth';
import {
  signIn,
  signOut,
  status,
  resetPassword,
  requestResetPassword,
  sendConfirmationEmail,
  confirmEmail,
  confirmResetPassword,
} from '../../controllers/Auth';
import {
  validateRequestResetPassword,
  validateResetPassword,
  validateSignIn,
} from '../../validators/Auth';

const router = Router();

router.post('/login', validateSignIn(), verifySignIn, signIn);
router.get('/logout', signOut);
router.get('/status', status);
router.get(
  '/request-email-confirmation',
  isAuthenticated,
  sendConfirmationEmail
);
router.post('/email-confirmation', confirmEmail);
router.post(
  '/request-reset-password',
  validateRequestResetPassword(),
  requestResetPassword
);
router.post('/confirm-reset-password', confirmResetPassword);
router.post(
  '/reset-password',
  validateResetPassword(),
  verifyResetPassword,
  resetPassword
);

export default router;
