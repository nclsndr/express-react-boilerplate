/* ------------------------------------------
 * NASA API example
 * @flow
 *------------------------------------------- */
import request from '../request'

export function getAPOD(): Promise<Object> {
  return request.make({
    method: 'get',
    url: 'https://api.nasa.gov/planetary/apod',
    params: { api_key: 'XzhKSQcMbUmYyjOvrMFawSSsGwR0zH1IS7a8EZXF' }
  })
}

export function setAny() {}
