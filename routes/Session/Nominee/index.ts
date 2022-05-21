import { Router } from 'express';
import {
  validateCreateNominee,
  validateUpdateNominee,
} from '../../../validators/Session/Nominee';
import { findCategory } from '../../../middlewares/Session/Category';
import {
  findNominee,
  verifyCreateNominee,
  verifyUpdateNominee,
} from '../../../middlewares/Session/Nominee';
import {
  createNominee,
  createMultipleNominee,
  updateNominee,
  deleteNominee,
} from '../../../controllers/Session/Nominee';
import { isAdminAuthenticated } from '../../../middlewares/Auth/admin';
import { confirmValidation, multer } from '../../../utils';
import { findSession } from '../../../middlewares/Session';

const router = Router();

router.post(
  '/create',
  isAdminAuthenticated,
  multer.single('picture'),
  validateCreateNominee(),
  confirmValidation,
  findCategory,
  verifyCreateNominee,
  createNominee
);

router.post(
  '/create/multiple',
  isAdminAuthenticated,
  multer.any(),
  createMultipleNominee
);

router.put(
  '/update/:id',
  isAdminAuthenticated,
  multer.single('picture'),
  validateUpdateNominee(),
  confirmValidation,
  findNominee,
  verifyUpdateNominee,
  updateNominee
);

router.delete('/delete/:id', isAdminAuthenticated, findNominee, deleteNominee);

export default router;
