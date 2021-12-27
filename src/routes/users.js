import { Router } from 'express';
const router = Router();
import { add_users } from '../controllers/users-controller';
import validationsCreateUser from '../validations/users-validations/validations-create';

router.post('/', validationsCreateUser, add_users);

export default router;