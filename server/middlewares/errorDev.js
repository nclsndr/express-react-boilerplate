/* ------------------------------------------
 * Dev error middleware
 * We assumed that prod env errors must be catch in requestHandler
 * @flow
 *------------------------------------------- */
/**
 * Dev error middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default function (err: Object, req: Object, res: Object, next: Function): Function {
  return res
    .status(err.statusCode || 500)
    .send({ code: err.code, message: err.message })
}
