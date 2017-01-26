/**
 * Dev error middleware
 * @param error
 * @param req
 * @param res
 * @param next
 */
export default function (error, req, res, next) {
  res
    .status(error.statusCode || 500)
    .send({ code: error.code, message: error.message })
  next()
}
