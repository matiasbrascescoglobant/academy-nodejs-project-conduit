import { Router } from 'express';
const router = Router();
import { get_profile, add_profile } from '../controllers/profiles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/:username', get_profile);
router.post('/:username/follow', authUserMiddleware, add_profile);

export default router;