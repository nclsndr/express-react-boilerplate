/* ------------------------------------------
 * App layout
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'

const propTypes = {
  env: PropTypes.string.isRequired,
  ssrOnly: PropTypes.bool.isRequired,
  head: PropTypes.object.isRequired,
  htmlData: PropTypes.string.isRequired,
  initialState: PropTypes.string.isRequired,
  webpackAssets: PropTypes.object.isRequired
}

/**
 * Main layout for the app
 * @param env
 * @param ssrOnly
 * @param head
 * @param htmlData
 * @param initialState
 * @param webpackAssets
 * @returns {XML}
 */
function layoutComponent({
  env,
  ssrOnly,
  head,
  htmlData,
  initialState,
  webpackAssets
}) {
  const vendorJSLink = env === 'production'
    ? `${webpackAssets.vendor.js}`
    : '/webpack/vendor.js'
  const appJSLink = env === 'production'
    ? `${webpackAssets.app.js}`
    : '/webpack/app.js'
  const appCSSLink = env === 'production'
    ? `${webpackAssets.app.css}`
    : ''
  const createBodyMarkup = () => ({
    __html: htmlData
  })
  const createPropsMarkup = () => ({
    __html: `window.__PRELOADED_STATE__ = ${initialState};`
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
        <link rel="icon" type="image/png" href="/static/favicon/favicon-32x32.png?v=1" />
        {env === 'production' && !ssrOnly
          ? (<link rel="stylesheet" type="text/css" href={appCSSLink} />)
          : null
        }
      </head>
      <body>
        <div
          id="app_root"
          dangerouslySetInnerHTML={createBodyMarkup()}
        />
        <script
          dangerouslySetInnerHTML={createPropsMarkup()}
        />
        {!ssrOnly
          ? (<script src={vendorJSLink} />)
          : null
        }
        {!ssrOnly
          ? (<script src={appJSLink} />)
          : null
        }
      </body>
    </html>
  )
}
layoutComponent.propTypes = propTypes

export default layoutComponent
