import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";
import authUserMiddleware from '../../middlewares/auth';

const validationsCreateComment = [
    authUserMiddleware,
    body('comment.body').notEmpty().withMessage('Comment body is required'),
    validationMiddleware
  ];

  export default validationsCreateComment;