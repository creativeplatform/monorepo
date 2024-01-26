import React from 'react'
import { default as NextHead } from 'next/head'
import {  SITE_DESCRIPTION, SITE_NAME } from 'utils/config'

interface Props {
  title?: string
  description?: string
}

export function Head(props: Props) {
  return (
    <NextHead>
      <title>{props.title ?? SITE_NAME}</title>
      <meta name="description" content={props.description ?? SITE_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={SITE_NAME} />
      <meta property="og:description" content={props.description ?? SITE_DESCRIPTION} />
      <meta property="og:image" content="/creative-membership.png" />
      <meta property="og:type" content="image/png" />
    </NextHead>
  )
}
