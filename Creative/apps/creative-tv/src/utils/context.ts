import { link } from 'fs'
import { SITE_NAME } from './config'

// CREATIVE TV
// ===========
// This file contains the context for the Creative TV app.
// It is used to populate the homepage and other pages with
// the correct text and images.

const currentYear = new Date().getFullYear();

export const FOOTER_LINKS = {
  whitepaper: 'https://creativeplatform.xyz/docs/resources/whitepaper',
  blog: 'https://blog.creativeplatform.xyz',
  about_us: 'https://creativeplatform.xyz/docs/intro',
  releases: 'https://creative-org-dao.canny.io/changelog',
  pricing: 'https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220xe174caa294999ec622988242641a27c11e6c22d8%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%7D',
  tutorial: 'https://crew3.xyz/c/thecreativedao/questboard',
  cookie_policy: 'https://creativeplatform.xyz/docs/cookie-policy',
  privacy_policy: 'https://creativeplatform.xyz/docs/privacy-policy',
  terms_and_conditions: 'https://creativeplatform.xyz/docs/terms-and-conditions',
  status: 'https://thecreative.grafana.net/public-dashboards/0d59c3754efd4cf5be8298ff3b24b685?orgId=1',
  terminal: 'https://app.creativeplatform.xyz'
}

export const SITE_COPYRIGHT = `© ${currentYear} Creative Organization DAO, LLC. All rights reserved.`

// LINKS
export const SOCIAL_LINKS ={
  twitter: 'https://twitter.com/creativecrtv',
  github: 'https://github.com/creativeplatform',
  discord: 'https://discord.com/servers/creative-779364937503604777',
  lens: 'https://lensfrens.xyz/thecreative',
  linkedin: 'https://www.linkedin.com/company/creativeplatform',
  instagram: 'https://www.instagram.com/creativecrtv/',
  warpcast: 'https://warpcast.com/thecreative.eth',
  email: 'mailto:creatives@creativeplatform.xyz',
}

export const HERO_NAME = {
  top: 'Record Once,',
  bottom: 'Use Everywhere!',
}

export const HERO_DESCRIPTION = `${SITE_NAME} is a decentralized live streaming platform that puts you in control of your content and earnings. Get paid 100% of streaming revenue, have access to your own social token, and monetize your content into NFTs.`

export const HERO_BUTTONS = {
  primary: { text: 'Get Started', href: 'https://app.unlock-protocol.com/checkout?id=bbbcff5f-835d-4fa3-9761-988d5da9da18' },
  secondary: { text: 'How It Works', href: 'https://creativeplatform.xyz/docs/intro', target: '_blank' },
}

export const HERO_IMAGE = 'https://bafybeiefwmq6zykvyhwih5qbhucxrc34zbtxjbwboz7hdgkyh3u6p2ykfa.ipfs.nftstorage.link'

// FEATURED VIDEO
export const FEATURED_TEXT = {
  top: 'Record. Watch. Brand.',
  middle: 'Stream. Create. Inspire.',
  bottom: 'Engage. Dream. Earn.',
}

// export const FEATURED_IMAGE = ""

// BIGGER THAN YOU THINK
export const CREATIVE_LOGO_BLK = '/Blog-Logo_blk.png'
export const CREATIVE_LOGO_WHT = '/Blog-Logo_wht.png'
export const CREATIVE_ICON = '/creative_logo_only.png'
export const HEADING_1 = "You're Bigger, Than You Think"
export const GOVERN_DESC = "Our community is built to push creatives to the front of the line. The following videos have been voted on by the community to choose which videos should get more visibility."

// Profile.tsx
export const PFP = '/0.png'

export const PROFILE_VIDEOS = {
  tooltip: 'list of ypur uploaded videos',
  tooltip_position: 'bottom',
}

export const PROFILE_CAMPAIGNS = {
  tooltip: 'list of your campaigns',
  tooltip_position: 'bottom',
}


// CREATIVE PLATFORM
// =================
// This file contains the context for the Creative Platform app.
// It is used to populate the homepage and other pages with
// the correct text and images.
