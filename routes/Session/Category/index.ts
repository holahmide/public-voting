import { Router } from 'express';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../../../validators/Session/Category';
import { findSession } from '../../../middlewares/Session';
import {
  findCategory,
  verifyCreateCategory,
  verifyUpdateCategory,
} from '../../../middlewares/Session/Category';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../controllers/Session/Category';
import { isAdminAuthenticated } from '../../../middlewares/Auth/admin';
import { confirmValidation } from '../../../utils';

const router = Router();

router.post(
  '/create',
  isAdminAuthenticated,
  validateCreateCategory(),
  confirmValidation,
  findSession,
  verifyCreateCategory,
  createCategory
);

router.put(
  '/update/:id',
  isAdminAuthenticated,
  validateUpdateCategory(),
  confirmValidation,
  verifyUpdateCategory,
  updateCategory
);

router.delete('/delete/:id', isAdminAuthenticated, findCategory, deleteCategory);

export default router;
