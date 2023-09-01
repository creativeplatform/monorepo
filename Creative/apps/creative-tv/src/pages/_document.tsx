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
        <script
          id="unlockProtocolPaywallConfig"
          dangerouslySetInnerHTML={{
            __html: `
              var unlockProtocolConfig = {
                "locks": {
                  "0x697560ba635e92c19e660fa0eb0bdfcd7938a08b": {
                    "name": "Member Test",
                    "network": 5,
                  }
                },    
                "title": "Creative TV Membership",
                "icon": "https://bafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q.ipfs.nftstorage.link/"           
              }`,
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
