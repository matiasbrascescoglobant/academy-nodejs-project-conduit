import { Router } from 'express';
import usersRouter from './users';
import articlesRouter from './articles';
import profilesRouter from './profiles';
import tagsRouter from './tags';

const router = Router();

router.use('/api', usersRouter);
router.use('/api/articles', articlesRouter);
router.use('/api/profiles', profilesRouter);
router.use('/api/tags', tagsRouter);

export default router;