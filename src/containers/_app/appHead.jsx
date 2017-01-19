/* ------------------------------------------
 * Head of app
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

const propTypes = {
  baseUrl: PropTypes.string
}
const defaultProps = {
  baseUrl: ''
}

/**
 * app global head content
 * @returns {XML}
 */
function appHead({
  baseUrl
}) {
  const title = 'Welcome homie'
  const titleTemplate = '%s - NCLSNDR'
  const defaultTitle = 'Welcome homie - NCLSNDR'
  const description = 'This a boilerplate'
  const url = baseUrl
  const OGImages = [
    `${baseUrl}/static/img/logo_inline.png`
  ]

  const metaData = [
    { name: 'description', content: description },

    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:site', content: url },
    { name: 'twitter:image', content: OGImages[0] },

    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url }
  ]
  OGImages.forEach(u => {
    metaData.push({ property: 'og:image', content: u })
  })

  return (
    <Helmet
      title={title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
      meta={metaData}
    />
  )
}
appHead.propTypes = propTypes
appHead.defaultProps = defaultProps

export default appHead
