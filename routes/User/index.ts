import { Router } from 'express';
import { validateCreateUser } from '../../validators/User';
import { verifyCreateUser, findUser } from '../../middlewares/User';
import {
  createUser,
  deleteUser,
  addRole,
  removeRole,
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

router.get(
  '/add-role/:id/:roleId',
  isAuthenticated,
  isAdmin,
  findUser,
  addRole
);

router.delete(
  '/remove-role/:id/:roleId',
  isAuthenticated,
  isAdmin,
  findUser,
  removeRole
);

export default router;
