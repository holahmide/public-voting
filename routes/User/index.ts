import { Router } from 'express';
import { validateCreateUser } from '../../validators/User';
import {
  createUser,
} from '../../controllers/User';
import { confirmValidation } from '../../utils';

const router = Router();

router.post(
  '/register',
  validateCreateUser(),
  confirmValidation,
  createUser
);

export default router;
