import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";
import authUserMiddleware from "../../middlewares/auth";

const validationsUpdateUser = [
    authUserMiddleware,
    body('user.email')
    .exists()
    .optional()
    .isEmail()
    .withMessage('Email have to have email@domain.com format'),
    validationMiddleware,
];

module.exports = validationsUpdateUser;