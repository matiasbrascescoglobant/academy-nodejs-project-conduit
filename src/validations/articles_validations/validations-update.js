import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";
import authUserMiddleware from "../../middlewares/auth";

const validationsUpdateArticle = [
    authUserMiddleware,
    body('article.title').exists()
    .optional()
    .notEmpty().withMessage('Title is required'),
    body('article.description').exists()
    .optional()
    .notEmpty().withMessage('Description is required'),
    body('article.body').exists()
    .optional()
    .notEmpty().withMessage('Body is required'),
    validationMiddleware,
  ];

  export default validationsUpdateArticle;