import validationMiddleware from "../../middlewares/validation";
import { body } from "express-validator";
import authUserMiddleware from "../../middlewares/auth";

const validationsUpdateUser = [
    authUserMiddleware,
    body('user.username')
    .exists()
    .optional()
    .notEmpty()
    .withMessage('User name is required'),
    body('user.email')
    .exists()
    .optional()
    .isEmail()
    .withMessage('The Email format must be value@domain.com'),
    validationMiddleware,
];

export default validationsUpdateUser;