import { getAllArticles } from '../services/article-service';

const get_all_articles = async (req, res) => {
    try {
      const articles = await getAllArticles();
      return res.json({
        "articles": articles,
        "articlesCount": articles.length
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
}

export {
    get_all_articles
};