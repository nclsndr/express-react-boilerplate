/* ------------------------------------------
 * Provide XHR wrapper returning a Promise
 *------------------------------------------- */
import axios from 'axios'
import _ from 'lodash'
import _debug from 'debug'

const debug = _debug('front:services:http')

export default class RequestFactory {
  /**
   * Format REST parameters
   * @param rest (Array)
   * @returns {string}
   */
  static formatREST(rest) {
    return `/${rest.join('/')}`
  }

  /**
   * Format params in order to get a proper string
   * which look like this : key=value&key=value
   * @param params (plain object)
   * @returns {string}
   */
  static formatParams(params) {
    const end = Object
      .keys(params)
      .filter(key => params[key] !== null)
      .map(key => `${key}=${encodeURI(params[key])}`)
      .join('&')
    return `?${end}`
  }

  /**
   * Exec async call wrapping Axios.js
   * @param method
   * @param url
   * @param data
   * @param params
   * @param rest
   * @param customHeaders
   * @param progress
   * @param responseType
   * @param maxContentLength
   * @param timeout
   * @param contentType
   * @returns {Promise}
   */
  static make({
    method = 'get',
    url,
    data = {},
    params = {},
    rest = [],
    customHeaders = {},
    progress = null,
    responseType = 'json',
    maxContentLength = 10000,
    timeout = 10000,
    contentType = 'application/json'
  }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Content-type'] = contentType
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' // allow all
      axios.defaults.headers.common.Accept = 'application/json'

      const builtURL = _.isEmpty(rest)
        ? url
        : `${url}${RequestFactory.formatREST(rest)}`

      const options = {
        url: builtURL,
        method,
        data,
        params,
        responseType,
        maxContentLength,
        timeout,
        baseURL: '',
        validateStatus: status => {
          return status >= 200 && status < 300
        }
        // transformRequest: [transformRequestData => {
        //   return transformRequestData
        // }],
        // transformResponse: [transformResponseData => {
        //   return transformResponseData
        // }],
        // paramsSerializer: p => {
        // https://www.npmjs.com/package/qs
        //   return p
        // },
        // adapter: (resolve, reject, config) => {
        // To use for test
        // },
        // auth: {},
        // withCredentials: false,
        // xsrfCookieName: 'XSRF-TOKEN', // default
        // xsrfHeaderName: 'X-XSRF-TOKEN', // default
      }

      // Bind progress callback if needed
      if (progress !== null && _.isFunction(progress)) {
        options.progress = progress
      }

      // Manage custom headers request case (auth)
      if (!_.isEmpty(customHeaders)) {
        options.headers = {
          ...options.headers,
          ...customHeaders
        }
      }

      debug('RequestFactory request options')
      debug(options)

      axios(options)
        .then(r => {
          debug('RequestFactory on resolve')
          debug(r)
          resolve(r.data)
        })
        .catch(e => {
          debug('RequestFactory on reject')
          debug(e)
          if (e instanceof Error) {
            reject(e.message)
          } else {
            reject(e.data ? e.data : e)
          }
        })
    })
  }
}
