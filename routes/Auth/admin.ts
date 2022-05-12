import { Router } from 'express';
import {
  verifyAdminSignIn,
  verifyResetPassword,
  isAdminAuthenticated,
} from '../../middlewares/Auth/admin';
import {
  signAdminIn,
  signAdminOut,
  status,
  resetPassword,
} from '../../controllers/Auth/admin';
import {
  validateResetPassword,
  validateAdminSignIn,
} from '../../validators/Auth/admin';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/login', validateAdminSignIn(), confirmValidation, verifyAdminSignIn, signAdminIn);
router.get('/logout', signAdminOut);
router.get('/status', isAdminAuthenticated, status);
router.post(
  '/reset-password',
  validateResetPassword(),
  confirmValidation,
  verifyResetPassword,
  resetPassword
);

export default router;
