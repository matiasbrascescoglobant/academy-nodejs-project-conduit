import { Router } from 'express';
const router = Router();
import { get_articles, add_articles, 
         get_feed_articles,
         get_single_article_by_slug,
         update_articles,
         favorite_article,
         unfavorite_article } from '../controllers/articles-controller';
import { add_comment, get_comment } from '../controllers/comments-controller';

import authUserMiddleware from '../middlewares/auth';

router.get('/', get_articles);
router.get('/feed', authUserMiddleware, get_feed_articles);
router.get('/:slug', get_single_article_by_slug);
router.post('/', authUserMiddleware, add_articles);
router.post('/:slug/favorite', authUserMiddleware, favorite_article);
router.delete('/:slug/favorite', authUserMiddleware, unfavorite_article);
router.put('/:slug', authUserMiddleware, update_articles);
router.post('/:slug/comments', authUserMiddleware, add_comment);
router.get('/:slug/comments', get_comment);

export default router;