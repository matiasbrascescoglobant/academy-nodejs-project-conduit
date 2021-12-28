import { Router } from 'express';
import usersRouter from './users';
import articlesRouter from './articles';

const router = Router();

router.use('/api', usersRouter);
router.use('/api/articles', articlesRouter);

export default router;