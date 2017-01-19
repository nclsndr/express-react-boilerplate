/* ------------------------------------------
 * App layout
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'

const propTypes = {
  env: PropTypes.string,
  ssrOnly: PropTypes.bool,
  head: PropTypes.object,
  htmlData: PropTypes.string,
  initialState: PropTypes.string
}
const defaultProps = {
  env: 'development',
  ssrOnly: false,
  head: {},
  htmlData: '',
  initialState: '{}'
}
/**
 * Main layout for the app
 * @param env
 * @param ssrOnly
 * @param head
 * @param htmlData
 * @param initialState
 * @returns {XML}
 */
function layoutComponent({
  env,
  ssrOnly,
  head,
  htmlData,
  initialState
}) {
  const vendorLink = env === 'production'
    ? '/static/vendor.js'
    : '/vendor.js'
  const appLink = env === 'production'
    ? '/static/app.js'
    : '/app.js'
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
          ? (<link rel="stylesheet" type="text/css" href="/static/app.css" />)
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
          ? (<script src={vendorLink} />)
          : null
        }
        {!ssrOnly
          ? (<script src={appLink} />)
          : null
        }
      </body>
    </html>
  )
}
layoutComponent.propTypes = propTypes
layoutComponent.defaultProps = defaultProps

export default layoutComponent
