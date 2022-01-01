import authUserMiddleware from './auth'

const authUserOptionalMiddleware = (req, res, next) => {
  if (!req.get('Authorization')) {
    return next()
  }
  return authUserMiddleware(req, res, next)
}

export default authUserOptionalMiddleware;