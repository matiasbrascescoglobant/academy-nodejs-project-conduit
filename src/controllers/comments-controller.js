import { createComment } from '../services/comment-service';
import { findUserByEmail } from '../services/user-service';
import { responseComments } from '../response_formatter/response-comment';

const add_comment = async (req, res) => {
    try{
      const { body } = req.body.comment;
      const author = await findUserByEmail(req.user.email);
  
      const newComment = await createComment({
        body,
        author: author
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

  export {
    add_comment
};