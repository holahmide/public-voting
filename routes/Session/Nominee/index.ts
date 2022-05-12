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
import { isAuthenticated } from '../../../middlewares/Auth';
import { confirmValidation, multer } from '../../../utils';
import { findSession } from '../../../middlewares/Session';

const router = Router();

router.post(
  '/create',
  isAuthenticated,
  multer.single('picture'),
  validateCreateNominee(),
  confirmValidation,
  findCategory,
  verifyCreateNominee,
  createNominee
);

router.post(
  '/create/multiple',
  isAuthenticated,
  multer.any(),
  findSession,
  createMultipleNominee
);

router.put(
  '/update/:id',
  isAuthenticated,
  multer.single('picture'),
  validateUpdateNominee(),
  confirmValidation,
  verifyUpdateNominee,
  updateNominee
);

router.delete('/delete/:id', isAuthenticated, findNominee, deleteNominee);

export default router;
