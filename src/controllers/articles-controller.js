import { getArticles, createArticle, 
         updateArticle, getSingleArticleBySlug,
         findArticleBySlug } from '../services/article-service';
import { findUserByEmail, findUserByUsername } from '../services/user-service';
import { findTagByName } from '../services/tag-service';
import { responseArticles } from '../response_formatter/response-article';
import slug from 'slug';

const get_articles = async (req, res) => {
    try {

      console.log("req.query.author")
      console.log(req.query.author)

      const author = await findUserByUsername(req.query.author);
      const favoriter = await findUserByUsername(req.query.favorited);
      const tag = await findTagByName(req.query.tag);

      console.log("author")
      console.log(author)

      if(author){
        console.log("NO ENTRA!!!!")
        req.query.author = author.id;
      } else {
        req.query.author = null;
      }

      if(favoriter){
        req.query._id = {$in: favoriter.favorites};
      } else if(req.query.favorited){
        req.query._id = {$in: []};
      } else {
        req.query.favorited = null;
      }

      if(tag){
        req.query.tag = tag._id;
        req.query.tagList = {"$in" : [req.query.tag]};
      } else {
        req.query.tagList = null;
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

export {
    get_articles,
    add_articles,
    get_feed_articles,
    get_single_article_by_slug,
    update_articles
};