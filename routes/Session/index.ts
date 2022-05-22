import { Router } from 'express';
import { validateCreateSession, validateUpdateSession } from '../../validators/Session';
import { findSession } from '../../middlewares/Session';
import { createSession, updateSession, deleteSession } from '../../controllers/Session';
import { isAdminAuthenticated } from '../../middlewares/Auth/admin';
import { confirmValidation, multer } from '../../utils';

const router = Router();

router.post('/create', isAdminAuthenticated, multer.single('logo'), validateCreateSession(), confirmValidation, createSession);

router.put(
  '/update/:id',
  isAdminAuthenticated,
  multer.single('logo'),
  validateUpdateSession(),
  confirmValidation,
  updateSession
);

router.delete(
  '/delete/:id',
  isAdminAuthenticated,
  findSession,
  deleteSession 
);

export default router;
