import { getArticles, createArticle, 
         updateArticle, getSingleArticleBySlug,
         findArticleBySlug } from '../services/article-service';
import { findUserByEmail, findUserByUsername } from '../services/user-service';
import { findTagByName } from '../services/tag-service';
import { responseArticles } from '../response_formatter/response-article';
import slug from 'slug';

const get_articles = async (req, res) => {
    try {
      const author = await findUserByUsername(req.query.author);
      const tag = await findTagByName(req.query.tag);

      if(author){
        req.query.author = author._id;
      }

      if(tag){
        req.query.tag = tag._id;
        req.query.tagList = {"$in" : [req.query.tag]};
      }

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
      articles: responseArticles(article)
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

const update_articles = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await findArticleBySlug(slug);
    if (!article) {
      return res.status(422).json({
        error: 'Article not found'
      });
    }

    console.log("article");
console.log(article);

    const updatedArticle = await updateArticle(article, req.body);

    console.log("updatedArticle");
    console.log(updatedArticle);

    return res.json({
      articles: responseArticles(updatedArticle)
    });
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
    update_articles
};