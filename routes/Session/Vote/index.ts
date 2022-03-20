import { Router } from 'express';
import {
  validateCreateVote,
} from '../../../validators/Session/Vote';
import { findCategory } from '../../../middlewares/Session/Category';
import { findNominee } from '../../../middlewares/Session/Nominee';
import {
  findVote,
  verifyCreateVote,
} from '../../../middlewares/Session/Vote';
import {
  createVote,
  deleteVote,
} from '../../../controllers/Session/Vote';
import { isAuthenticated } from '../../../middlewares/Auth';
import { confirmValidation } from '../../../utils';

const router = Router();

router.post(
  '/create',
  isAuthenticated,
  validateCreateVote(),
  confirmValidation,
  findNominee,
  verifyCreateVote,
  createVote
);

router.delete('/delete/:id', isAuthenticated, findVote, deleteVote);

export default router;
