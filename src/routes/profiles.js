import { Router } from 'express';
const router = Router();
import { get_profile, follow_user, unfollow_user } from '../controllers/profiles-controller';
import authUserMiddleware from '../middlewares/auth';
import authUserOptionalMiddleware from '../middlewares/optionalAuth';

router.get('/:username', authUserOptionalMiddleware, get_profile);
router.post('/:username/follow', authUserMiddleware, follow_user);
router.delete('/:username/follow', authUserMiddleware, unfollow_user);

export default router;