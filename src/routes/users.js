import { Router } from 'express';
const router = Router();
import { add_users, login_user, update_users, get_current_user } from '../controllers/users-controller';
import validationsCreateUser from '../validations/users-validations/validations-create';
import validationsUpdateUser from '../validations/users-validations/validations-update';
import validationsLogin from '../validations/users-validations/validations-login';
import authUserMiddleware from '../middlewares/auth';

router.post('/', validationsCreateUser, add_users);
router.put('/', validationsUpdateUser, update_users);
router.get('/', authUserMiddleware, get_current_user);
router.post('/login', validationsLogin, login_user);

export default router;