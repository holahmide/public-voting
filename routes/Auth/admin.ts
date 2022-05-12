import { Router } from 'express';
import {
  verifyAdminSignIn,
  verifyResetPassword,
  isAdminAuthenticated,
} from '../../middlewares/Auth/admin';
import {
  signIn,
  signOut,
  status,
  resetPassword,
} from '../../controllers/Auth';
import {
  validateResetPassword,
  validateSignIn,
} from '../../validators/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/login', validateSignIn(), confirmValidation, verifyAdminSignIn, signIn);
router.get('/logout', signOut);
router.get('/status', isAdminAuthenticated, status);
router.post(
  '/reset-password',
  validateResetPassword(),
  confirmValidation,
  verifyResetPassword,
  resetPassword
);

export default router;
