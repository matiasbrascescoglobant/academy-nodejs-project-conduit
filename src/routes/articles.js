import { Router } from 'express';
const router = Router();
import { get_articles } from '../controllers/articles-controller';
import authUserMiddleware from '../middlewares/auth';

router.get('/', get_articles);

export default router;