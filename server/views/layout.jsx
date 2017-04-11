/* ------------------------------------------
 * App layout
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import serialize from 'serialize-javascript'

const propTypes = {
  env: PropTypes.string.isRequired,
  ssrOnly: PropTypes.bool.isRequired,
  head: PropTypes.object.isRequired,
  htmlData: PropTypes.string.isRequired,
  initialState: PropTypes.string.isRequired,
  webpackAssets: PropTypes.object.isRequired,
  debugVars: PropTypes.object
}
const defaultProps = {
  debugVars: {}
}

/**
 * Main layout for the app
 * @param env
 * @param ssrOnly
 * @param head
 * @param htmlData
 * @param initialState
 * @param webpackAssets
 * @param debugVars
 * @returns {XML}
 */
function layoutComponent({
  env,
  ssrOnly,
  head,
  htmlData,
  initialState,
  webpackAssets,
  debugVars
}) {
  const vendorJSLink = env === 'production' && webpackAssets.vendor && webpackAssets.vendor.js
    ? `${webpackAssets.vendor.js}`
    : '/webpack/vendor.js'
  const appJSLink = env === 'production' && webpackAssets.app && webpackAssets.app.js
    ? `${webpackAssets.app.js}`
    : '/webpack/app.js'
  const appCSSLink = env === 'production' && webpackAssets.app && webpackAssets.app.css
    ? `${webpackAssets.app.css}`
    : ''
  const createBodyMarkup = () => ({
    __html: htmlData
  })
  const createInitialStateMarkup = () => ({
    __html: `window.__PRELOADED_STATE__ = ${serialize(initialState, { isJson: true })};`
  })
  const createDebugMarkup = () => ({
    __html: `window.debugVars = ${serialize(debugVars, { isJson: false })};`
  })
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.base.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.noscript.toComponent()}
        {head.style.toComponent()}
        <link rel="icon" type="image/png" href="/static/favicon/favicon-32x32.png" />
        {env === 'production' && !ssrOnly
          ? (<link rel="stylesheet" type="text/css" href={appCSSLink} />)
          : null
        }
      </head>
      <body>
        <div id="app_root" dangerouslySetInnerHTML={createBodyMarkup()} />
        <script dangerouslySetInnerHTML={createInitialStateMarkup()} type="text/javascript" />
        {!ssrOnly
          ? (<script src={vendorJSLink} type="text/javascript" />)
          : null
        }
        {!ssrOnly
          ? (<script src={appJSLink} type="text/javascript" />)
          : null
        }
        {env === 'development'
          ? (<script dangerouslySetInnerHTML={createDebugMarkup()} type="text/javascript" />)
          : null
        }
      </body>
    </html>
  )
}
layoutComponent.propTypes = propTypes
layoutComponent.defaultProps = defaultProps

export default layoutComponent
