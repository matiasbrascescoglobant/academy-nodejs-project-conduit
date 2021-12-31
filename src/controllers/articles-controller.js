import { getArticles, createArticle, 
         updateArticle, getSingleArticleBySlug,
         findArticleBySlug, favoriteArticle,
         unfavoriteArticle, deleteArticle } from '../services/article-service';
import { findUserByEmail } from '../services/user-service';
import { responseArticles } from '../response_formatter/response-article';
import slug from 'slug';
import tagsModel from '../models/tags-model';

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

const get_single_article_by_slug = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await getSingleArticleBySlug(slug);

    return res.json({
      article: responseArticles(article)
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
    const tags = [];

    for (const name of tagList) {
      let tag = await tagsModel.findOne( { name: name } )
      if (!tag) {
        tag = await tagsModel.create({ name })
      }
      tags.unshift(tag);
    }

    const newArticle = await createArticle({
      title,
      description,
      body,
      author: author,
      slug: slug(title),
      tagList: tags
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

const update_articles = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await findArticleBySlug(slug);
    if (!article) {
      return res.status(422).json({
        error: 'Article not found'
      });
    }

    const updatedArticle = await updateArticle(article, req.body);

    return res.json({
      article: responseArticles(updatedArticle)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

const favorite_article = async (req, res) => {
  try{
    const { slug } = req.params;
    const article = await findArticleBySlug(slug);
    if (!article) {
      return res.status(422).json({
        error: 'Article not found'
      });
    }

    const favorite = await favoriteArticle(article);

    return res.json({
      article: responseArticles(favorite)
    });

  }catch(error){
      return res.status(500).json({
          error: error.message
      });
  }
}

const unfavorite_article = async (req, res) => {
  try{
    const { slug } = req.params;
    const article = await findArticleBySlug(slug);
    if (!article) {
      return res.status(422).json({
        error: 'Article not found'
      });
    }

    const unfavorite = await unfavoriteArticle(article);

    return res.json({
      article: responseArticles(unfavorite)
    });

  }catch(error){
      return res.status(500).json({
          error: error.message
      });
  }
}

const delete_article = async (req, res) => {
  try {
      const { slug } = req.params;

      await deleteArticle(slug);

      return res.json();
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

export {
    get_articles,
    add_articles,
    get_feed_articles,
    get_single_article_by_slug,
    update_articles,
    favorite_article,
    unfavorite_article,
    delete_article
};