import { Router } from 'express';
const router = Router();
import { add_users, login_user } from '../controllers/users-controller';
import validationsCreateUser from '../validations/users-validations/validations-create';
import validationsLogin from '../validations/users-validations/validations-login';

router.post('/', validationsCreateUser, add_users);
router.post('/login', validationsLogin, login_user);

export default router;