import React from 'react'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from 'utils/config'
import { SOCIAL_LINKS } from 'utils/context'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL

  return (
    <DefaultSeo
      title={SITE_NAME}
      defaultTitle={SITE_NAME}
      titleTemplate={`%s | ${SITE_NAME}`}
      description={SITE_DESCRIPTION}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={630}
      openGraph={{
        type: 'website',
        siteName: SITE_NAME,
        url: origin,
        images: [
          {
            url: `${origin}/og.png`,
            alt: `${SITE_NAME} Open Graph Image`,
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
