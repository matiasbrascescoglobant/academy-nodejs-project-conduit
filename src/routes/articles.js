import { Router } from 'express';
const router = Router();
import { get_articles, add_articles, 
         get_feed_articles,
         get_single_article_by_slug,
         update_articles,
         favorite_article,
         unfavorite_article, 
         delete_article} from '../controllers/articles-controller';
import { add_comment, get_comment, delete_comment } from '../controllers/comments-controller';
import authUserMiddleware from '../middlewares/auth';
import authUserOptionalMiddleware from '../middlewares/optionalAuth';
import validationsCreateArticle from '../validations/articles_validations/validations-create';
import validationsUpdateArticle from '../validations/articles_validations/validations-update';
import validationsCreateComment from '../validations/comments_validations/validations-create';

router.get('/', authUserOptionalMiddleware, get_articles);
router.get('/feed', authUserMiddleware, get_feed_articles);
router.get('/:slug', get_single_article_by_slug);
router.post('/', validationsCreateArticle, add_articles);
router.post('/:slug/favorite', authUserMiddleware, favorite_article);
router.delete('/:slug/favorite', authUserMiddleware, unfavorite_article);
router.put('/:slug', validationsUpdateArticle, update_articles);
router.post('/:slug/comments', validationsCreateComment, add_comment);
router.get('/:slug/comments', authUserOptionalMiddleware, get_comment);
router.delete('/:slug/comments/:id', authUserMiddleware, delete_comment);
router.delete('/:slug', authUserMiddleware, delete_article);

export default router;