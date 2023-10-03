import { SITE_LOGO, CREATIVE_ADDRESS } from "./config"

const baseUrl = 'https://app.unlock-protocol.com/checkout?'
const redirectUri: string = window.location.href
const crtvLogoUrl = SITE_LOGO
const checkoutTitle = 'Creative'
const checkoutRefefrer = CREATIVE_ADDRESS

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
        '0xc9bdfa5f177961d96f137c42241e8ecbca605781': {
            network: 5, // Goerli
            emailRequired: true,
        },
        pessimistic: true,
    },
    icon: crtvLogoUrl,
    title: checkoutTitle,
    referrer: checkoutRefefrer,
    metadataInputs: requiredMetadata,
}

export const creatorCheckoutUrl = `${baseUrl}&paywallConfig=${encodeURIComponent(JSON.stringify(creatorPaywallConfig))}&redirectUri=${redirectUri}`