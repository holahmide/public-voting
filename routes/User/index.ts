import { Router } from 'express';
import { validateCreateUser, validateUpdateUser, validateChangePassword } from '../../validators/User';
import { verifyCreateUser, findUser, verifyUpdateUser, verifyChangePassword } from '../../middlewares/User';
import { createUser, updateUser, deleteUser, changePassword, addRole, removeRole } from '../../controllers/User';
import { isAuthenticated, isSuperUser, isAdmin } from '../../middlewares/Auth';
import { confirmValidation } from '../../utils';

const router = Router();

router.post('/register', validateCreateUser(), confirmValidation, verifyCreateUser, createUser);

router.put(
  '/update',
  isAuthenticated,
  validateUpdateUser(),
  confirmValidation,
  verifyUpdateUser,
  updateUser
);

router.delete(
  '/delete/:id',
  isAuthenticated,
  isSuperUser,
  findUser,
  deleteUser
);

router.post(
  '/change-password',
  isAuthenticated,
  validateChangePassword(),
  confirmValidation,
  verifyChangePassword,
  changePassword
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
