import React from 'react'
import { default as NextHead } from 'next/head'
import {  siteMetadata } from 'utils/config'

interface Props {
  title?: string
  description?: string
}

export function Head(props: Props) {
  return (
    <NextHead>
      <title>{props.title ?? siteMetadata.NAME}</title>
      <meta name="description" content={props.description ?? siteMetadata.DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={siteMetadata.NAME} />
      <meta property="og:description" content={props.description ?? siteMetadata.DESCRIPTION} />
      <meta property="og:image" content="/creative-membership.png" />
      <meta property="og:type" content="image/png" />
    </NextHead>
  )
}
