import { Router } from 'express';
import { validateCreateUser, validateUpdateUser, validateChangePassword } from '../../validators/User';
import { verifyCreateUser, findUser, verifyUpdateUser, verifyChangePassword } from '../../middlewares/User';
import { createUser, updateUser, deleteUser, changePassword } from '../../controllers/User';
import { isAuthenticated, isSuperUser } from '../../middlewares/Auth';

const router = Router();

router.post('/register', validateCreateUser(), verifyCreateUser, createUser);

router.put(
  '/update',
  isAuthenticated,
  validateUpdateUser(),
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
  verifyChangePassword,
  changePassword
);

export default router;
