import { createComment, getComments, deleteComment } from '../services/comment-service';
import { findUserByEmail } from '../services/user-service';
import { findArticleBySlug } from '../services/article-service';
import { responseComments } from '../response_formatter/response-comment';

const add_comment = async (req, res) => {
    try{
      const { body } = req.body.comment;
      const { slug } = req.params;
      const author = await findUserByEmail(req.user.email);
      const article = await findArticleBySlug(slug);
      if (!article) {
        return res.status(422).json({
          error: 'Article not found'
        });
      }
  
      const newComment = await createComment({
        body,
        author: author,
        article: article
      });
  
      return res.status(201).json({
        comment: responseComments(newComment)
      });
  
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
  }

  const get_comment = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await findArticleBySlug(slug);
        if (!article) {
            return res.status(422).json({
            error: 'Article not found'
            });
        }
        const comments = await getComments(article);

        return res.json({
            comments: responseComments(comments)
        });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  const delete_comment = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteComment(id);

        return res.json();
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  export {
    add_comment,
    get_comment,
    delete_comment
};