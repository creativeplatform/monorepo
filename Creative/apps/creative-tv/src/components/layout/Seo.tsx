import React from 'react'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from 'utils/config'
import { SOCIAL_LINKS } from 'utils/context'
import { DefaultSeo } from 'next-seo'
import {   SOCIAL_TWITTER, siteMetadata } from 'utils/config'

export function Seo() {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : siteMetadata.URL

  return (
    <DefaultSeo
      title={siteMetadata.NAME}
      defaultTitle={siteMetadata.NAME}
      titleTemplate={`%s | ${siteMetadata.NAME}`}
      description={siteMetadata.DESCRIPTION}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={630}
      openGraph={{
        type: 'website',
        siteName: siteMetadata.NAME,
        url: origin,
        images: [
          {
            url: `${origin}/og.png`,
            alt: `${siteMetadata.NAME} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_LINKS.twitter}`,
        site: `@${SOCIAL_LINKS.twitter}`,
        cardType: 'summary_large_image',
      }}
    />
  )
}
