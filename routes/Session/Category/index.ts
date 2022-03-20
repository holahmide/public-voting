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
import { isAuthenticated } from '../../../middlewares/Auth';
import { confirmValidation } from '../../../utils';

const router = Router();

router.post(
  '/create',
  isAuthenticated,
  validateCreateCategory(),
  confirmValidation,
  findSession,
  verifyCreateCategory,
  createCategory
);

router.put(
  '/update/:id',
  isAuthenticated,
  validateUpdateCategory(),
  confirmValidation,
  verifyUpdateCategory,
  updateCategory
);

router.delete('/delete/:id', isAuthenticated, findCategory, deleteCategory);

export default router;
