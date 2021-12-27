import { validationResult } from "express-validator";

export default function (request, response, next) {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(422).json(
      {
        "errors": {
          "body": [
            result.array()
          ]
        }  
      }
    );
  }

  next();
};