/* ------------------------------------------
 * Provide XHR wrapper returning a Promise
 * @flow
 *------------------------------------------- */
import axios from 'axios'
import _ from 'lodash'
import _debug from 'debug'

const debugAll = _debug('debug:src:services:http')
const debugError = _debug('app:src:services:http')

export default class RequestFactory {
  /**
   * Format REST parameters
   * @param rest (Array)
   * @returns {string}
   */
  static formatREST(rest: Array<string | number>): string {
    if (_.isArray(rest) && !_.isEmpty(rest)) {
      return `/${rest.join('/')}`
    }
    return ''
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
        },
        progress: () => {},
        headers: {}
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

      debugAll('RequestFactory request options')
      debugAll(options)

      axios(options)
        .then(res => {
          debugAll('RequestFactory on resolve')
          debugAll(res)
          resolve(res.data)
        })
        .catch(e => {
          debugError('RequestFactory on reject')
          debugError(e)
          if (e instanceof Error) {
            reject(e.message)
          } else {
            reject(e.data ? e.data : e)
          }
        })
    })
  }
}
