import debug from 'debug';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { HttpStatus } from 'http-status';

const log = debug('globant:auth-middleware');

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(422).json({
      error: 'Missing token'
    });
  }
console.log(authHeader);
  const token = authHeader.replace('Token ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error)
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({
        message: 'Wrong token'
      });
    }

    return res.status(HttpStatus[503]).json({
      message: 'Service Unavailable'
    });
  }
}

export default authUserMiddleware