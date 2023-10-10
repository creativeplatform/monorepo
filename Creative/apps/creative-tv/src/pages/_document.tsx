import { ColorModeScript } from '@chakra-ui/react'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { THEME_INITIAL_COLOR } from 'utils/config'

declare global {
  interface Window {
    unlockProtocol: any
    unlockProtocolConfig: any
  }
}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:image" content="https://bafybeifvxi7xs6qrtaymrefolo56zxwm4z7tggf245uy6l5bf4idodda7m.ipfs.w3s.link/membership_banner.gif"/>
        <meta property="og:title" content="Creative Membership"/>
        <meta property="og:description" content="For 10 USDC a month you can finally start earning for being creative."/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <link rel="icon" href="/favicon.ico" />
        <script
          id="unlock-protocol-paywall"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s) {
                var js = d.createElement(s),
                  sc = d.getElementsByTagName(s)[0];
                js.src = "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
                sc.parentNode.insertBefore(js, sc);
              }(document, "script"));`,
          }}
        />

      </Head>
      <body>
        <ColorModeScript initialColorMode={THEME_INITIAL_COLOR} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
