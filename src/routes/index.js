import { Router } from 'express';
import usersRouter from './users';
import articlesRouter from './articles';
import profilesRouter from './profiles';

const router = Router();

router.use('/api', usersRouter);
router.use('/api/articles', articlesRouter);
router.use('/api/profiles', profilesRouter);

export default router;