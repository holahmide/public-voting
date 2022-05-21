import { Router } from 'express';
import { validateCreateUser } from '../../validators/User';
import { verifyCreateUser, findUser } from '../../middlewares/User';
import {
  createUser,
  deleteUser,
} from '../../controllers/User';
import { isAuthenticated, isSuperUser, isAdmin } from '../../middlewares/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post(
  '/register',
  validateCreateUser(),
  confirmValidation,
  verifyCreateUser,
  createUser
);

router.delete(
  '/delete/:id',
  isAuthenticated,
  isSuperUser,
  findUser,
  deleteUser
);

export default router;
