import { Router } from 'express';
const router = Router();
import { get_articles, add_articles } from '../controllers/articles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/', get_articles);
router.post('/', authUserMiddleware, add_articles);

export default router;