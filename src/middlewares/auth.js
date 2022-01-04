import debug from 'debug';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { HttpStatus } from 'http-status';
import { responseError } from '../response_formatter/response-errors';

const log = debug('globant:auth-middleware');

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');
  
  if (!authHeader) {
    return res.status(422).json({
      errors: responseError('Missing token')
    });
  }

  const token = authHeader.replace('Token ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    log(decoded);

    req.user = decoded;
    req.user.token = token;
    
    next();
  } catch (error) {
    console.error(error)
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({
        errors: responseError('Wrong token')
      });
    }

    return res.status(HttpStatus[503]).json({
      errors: responseError('Service Unavailable')
    });
  }
}

export default authUserMiddleware