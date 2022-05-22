import { Router } from 'express';
import {
  verifyAdminSignIn,
  isAdminAuthenticated,
} from '../../middlewares/Auth/admin';
import {
  signAdminIn,
  signAdminOut,
  status,
} from '../../controllers/Auth/admin';
import {
  validateAdminSignIn,
} from '../../validators/Auth/admin';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/login', validateAdminSignIn(), confirmValidation, verifyAdminSignIn, signAdminIn);
router.get('/logout', signAdminOut);
router.get('/status', isAdminAuthenticated, status);
export default router;
