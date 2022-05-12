import { Router } from 'express';
import { validateCreateAdmin } from '../../validators/User/admin';
import { verifyCreateAdmin, findAdmin } from '../../middlewares/User/admin';
import {
  createAdmin,
  deleteAdmin,
} from '../../controllers/User/admin';
import { isAuthenticated } from '../../middlewares/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post(
  '/register',
  validateCreateAdmin(),
  confirmValidation,
  verifyCreateAdmin,
  createAdmin
);

router.delete(
  '/delete/:id',
  isAuthenticated,
  findAdmin,
  deleteAdmin
);
export default router;
