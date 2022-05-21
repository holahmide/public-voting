import { Router } from 'express';
import {
  verifySignIn,
  isAuthenticated,
} from '../../middlewares/Auth';
import {
  signIn,
  signOut,
  status,
  sendConfirmationEmail,
  confirmEmail,
} from '../../controllers/Auth';
import {
  validateSignIn,
} from '../../validators/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/login', validateSignIn(), confirmValidation, verifySignIn, signIn);
router.get('/logout', signOut);
router.get('/status', isAuthenticated, status);
router.get(
  '/request-email-confirmation',
  isAuthenticated,
  sendConfirmationEmail
);
router.post('/email-confirmation', confirmEmail);
export default router;
