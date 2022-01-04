import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";
import authUserMiddleware from "../../middlewares/auth";

const validationsCreateArticle = [
    authUserMiddleware,
    body('article.title').notEmpty().withMessage('Title is required'),
    body('article.description').notEmpty().withMessage('Description is required'),
    body('article.body').notEmpty().withMessage('Body is required'),
    validationMiddleware
  ];

  export default validationsCreateArticle;