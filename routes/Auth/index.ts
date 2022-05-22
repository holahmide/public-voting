import { Router } from 'express';
import {
  verifySignIn,
  isAuthenticated,
} from '../../middlewares/Auth';
import {
  signIn,
  signOut,
  status,
} from '../../controllers/Auth';
import {
  validateSignIn,
} from '../../validators/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/login', validateSignIn(), confirmValidation, verifySignIn, signIn);
router.get('/logout', signOut);
router.get('/status', isAuthenticated, status);

export default router;
