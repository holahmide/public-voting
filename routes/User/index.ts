import { Router } from 'express';
import { validateCreateUser } from '../../validators/User';
import { verifyCreateUser, findUser } from '../../middlewares/User';
import {
  createUser,
} from '../../controllers/User';
import { confirmValidation } from '../../utils';

const router = Router();

router.post(
  '/register',
  validateCreateUser(),
  confirmValidation,
  verifyCreateUser,
  createUser
);

export default router;
