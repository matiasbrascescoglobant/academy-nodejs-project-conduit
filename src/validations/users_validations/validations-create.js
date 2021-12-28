import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";

const validationsCreateUser = [
    body('user.username').notEmpty().withMessage('User name is required'),
    body('user.email').notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email have to have email@email.com format'),
    body('user.password').notEmpty().withMessage('Password is required'),
    validationMiddleware,
  ];

  export default validationsCreateUser;