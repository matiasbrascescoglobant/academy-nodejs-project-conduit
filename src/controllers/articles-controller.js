import { getArticles, createArticle, getFeedArticles } from '../services/article-service';
import { findUserByEmail } from '../services/user-service';
import { responseArticles } from '../response_formatter/response-article';
import TagsModel from '../models/tags-model';
import slug from 'slug';

const get_articles = async (req, res) => {
    try {
      const articles = await getArticles(req.query);

      return res.json({
        articles: responseArticles(articles),
        articlesCount: articles.length
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
}

const get_feed_articles = async (req, res) => {
  try {
    const articles = await getFeedArticles(req.query);

    return res.json({
      articles: responseArticles(articles),
      articlesCount: articles.length
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

const add_articles = async (req, res) => {
  try{
    const { title, description, body, tagList = [] } = req.body.article;
    const author = await findUserByEmail(req.user.email);

    const newArticle = await createArticle({
      title,
      description,
      body,
      author: author,
      slug: slug(title)
    });

    return res.status(201).json({
      article: responseArticles(newArticle)
    });

  }catch(error){
      return res.status(500).json({
          error: error.message
      });
  }
}

export {
    get_articles,
    add_articles,
    get_feed_articles
};