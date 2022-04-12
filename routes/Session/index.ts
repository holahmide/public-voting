import { Router } from 'express';
import { validateCreateSession, validateUpdateSession } from '../../validators/Session';
import { findSession } from '../../middlewares/Session';
import { createSession, updateSession, deleteSession } from '../../controllers/Session';
import { isAuthenticated } from '../../middlewares/Auth';
import { confirmValidation, multer } from '../../utils';

const router = Router();

router.post('/create', isAuthenticated, multer.single('logo'), validateCreateSession(), confirmValidation, createSession);

router.put(
  '/update/:id',
  isAuthenticated,
  multer.single('logo'),
  validateUpdateSession(),
  confirmValidation,
  updateSession
);

router.delete(
  '/delete/:id',
  isAuthenticated,
  findSession,
  deleteSession 
);

export default router;
