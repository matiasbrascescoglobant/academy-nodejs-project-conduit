import { getArticles } from '../services/article-service';
import { responseArticles } from '../response_formatter/response-article';

const get_articles = async (req, res) => {
    try {
      const articles = await getArticles(req.query);

      return res.json({
        "articles": await responseArticles(articles),
        "articlesCount": articles.length
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
}

export {
    get_articles
};