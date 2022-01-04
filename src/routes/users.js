import { Router } from 'express';
const router = Router();
import { add_users, login_user, update_users, get_current_user } from '../controllers/users-controller';
import validationsCreateUser from '../validations/users_validations/validations-create';
import validationsUpdateUser from '../validations/users_validations/validations-update';
import validationsLogin from '../validations/users_validations/validations-login';
import authUserMiddleware from '../middlewares/auth';

router.post('/users', validationsCreateUser, add_users);
router.put('/user', validationsUpdateUser, update_users);
router.get('/user', authUserMiddleware, get_current_user);
router.post('/users/login', validationsLogin, login_user);

export default router;