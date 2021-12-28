import { Router } from 'express';
const router = Router();
import { get_all_articles } from '../controllers/articles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/', authUserMiddleware, get_all_articles);

export default router;