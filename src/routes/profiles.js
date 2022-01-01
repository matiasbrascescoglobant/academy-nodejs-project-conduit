import { Router } from 'express';
const router = Router();
import { get_profile, add_profile, delete_profile } from '../controllers/profiles-controller';
import authUserMiddleware from '../middlewares/auth';
import authUserOptionalMiddleware from '../middlewares/optionalAuth';

router.get('/:username', authUserOptionalMiddleware, get_profile);
router.post('/:username/follow', authUserMiddleware, add_profile);
router.delete('/:username/follow', authUserMiddleware, delete_profile);

export default router;