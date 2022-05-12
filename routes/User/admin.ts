import { Router } from 'express';
import { validateCreateAdmin } from '../../validators/User/admin';
import { verifyCreateUser, findUser } from '../../middlewares/User';
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
  verifyCreateUser,
  createAdmin
);

router.delete(
  '/delete/:id',
  isAuthenticated,
  findUser,
  deleteAdmin
);
export default router;
