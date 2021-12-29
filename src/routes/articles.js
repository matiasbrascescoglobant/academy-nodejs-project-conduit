import { Router } from 'express';
const router = Router();
import { get_articles, add_articles, get_feed_articles } from '../controllers/articles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/', get_articles);
router.get('/feed', authUserMiddleware, get_feed_articles);
router.post('/', authUserMiddleware, add_articles);

export default router;