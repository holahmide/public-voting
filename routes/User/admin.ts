import { Router } from 'express';
import { validateCreateAdmin } from '../../validators/User/admin';
import { verifyCreateAdmin, findAdmin } from '../../middlewares/User/admin';
import {
  createAdmin,
} from '../../controllers/User/admin';
import { confirmValidation } from '../../utils';

const router = Router();

router.post(
  '/register',
  validateCreateAdmin(),
  confirmValidation,
  verifyCreateAdmin,
  createAdmin
);
export default router;
