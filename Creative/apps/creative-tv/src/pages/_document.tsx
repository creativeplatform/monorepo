import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Main, Head, NextScript } from 'next/document'
import Script from 'next/script'
import theme from '../theme/theme'
import { getCssText } from "@livepeer/react";

declare global {
  interface Window {
    unlockProtocol: any
    unlockProtocolConfig: any
  }
}

export default class Document extends NextDocument {
  render() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:image" content="https://bafybeifvxi7xs6qrtaymrefolo56zxwm4z7tggf245uy6l5bf4idodda7m.ipfs.w3s.link/creative-membership.png"/>
        <meta property="og:title" content="Creative Membership"/>
        <meta property="og:description" content="For 10 USDC a month you can finally start earning for being creative."/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <link rel="icon" href="/favicon.ico" />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
        <Script src="https://_vercel/speed-insights/script.js" />
      </body>
    </Html>
  )
}}
