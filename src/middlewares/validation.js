import { validationResult } from "express-validator";

const errorMsg = ({ msg }) => {
  return `${msg}`
}

export default function (request, response, next) {
  const result = validationResult(request).formatWith(errorMsg);
  if (!result.isEmpty()) {
    return response.status(422).json(
      {
        errors: result.array()
      }
    );
  }

  next();
};