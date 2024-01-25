import { SITE_LOGO, CREATIVE_ADDRESS } from "./config"

const baseUrl = 'https://app.unlock-protocol.com/checkout?'
const redirectUri: string = 'https://tv.creativeplatform.xyz'
const crtvLogoUrl = siteMetadata.LOGO /* SITE_LOGO*/
const checkoutTitle = 'Creative TV'
const checkoutReferrer = CREATIVE_ADDRESS

const requiredMetadata = [
    {
        name: 'first name',
        defaultValue: '',
        type: 'text',
        required: true,
        placeholder: 'Satoshi',
        public: false,
    },
    {
        name: 'last name',
        defaultValue: '',
        type: 'text',
        required: true,
        placeholder: 'Nakamoto',
        public: false,
    },
]

export const creatorPaywallConfig = {
    locks: {
        '0x9a9280897c123b165e23f77cf4c58292d6ab378d': {
            network: 80001, // Mumbai
            emailRequired: true,
        },
        pessimistic: false,
    },
    icon: crtvLogoUrl,
    title: checkoutTitle,
    referrer: checkoutReferrer,
    metadataInputs: requiredMetadata,
}

export const creatorCheckoutUrl = `${baseUrl}id=1505d0df-b86c-4171-80d5-da502a081db7`