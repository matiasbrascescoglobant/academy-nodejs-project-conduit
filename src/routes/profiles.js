import { Router } from 'express';
const router = Router();
import { get_profile } from '../controllers/profiles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/:username', authUserMiddleware, get_profile);

export default router;