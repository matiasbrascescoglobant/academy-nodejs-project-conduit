import { Router } from 'express';
const router = Router();
import { get_articles, add_articles, 
         get_feed_articles,
         get_single_article_by_slug,
         update_articles,
         favorite_article } from '../controllers/articles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/', get_articles);
router.get('/feed', authUserMiddleware, get_feed_articles);
router.get('/:slug', get_single_article_by_slug);
router.post('/', authUserMiddleware, add_articles);
router.post('/:slug/favorite', authUserMiddleware, favorite_article);
router.put('/:slug', authUserMiddleware, update_articles);

export default router;