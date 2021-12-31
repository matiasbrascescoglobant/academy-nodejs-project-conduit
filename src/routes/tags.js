import { Router } from 'express';
const router = Router();
import { get_tags } from '../controllers/tags-controller';

router.get('/', get_tags);

export default router;