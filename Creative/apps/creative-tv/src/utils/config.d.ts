import { ThemingProps } from '@chakra-ui/react';
export declare const SITE_NAME = "CREATIVE TV";
export declare const SITE_DESCRIPTION = "The way your content should be.";
export declare const SITE_IMAGE = "/creative-membership.gif";
export declare const SITE_URL = "https://creativeplatform.xyz";
export declare const SITE_COPYRIGHT = "\u00A9 2023 Creative Organization DAO, LLC. All rights reserved.";
export declare const SITE_LOGO = "/grant-logo.png";
export declare const NEXT_PUBLIC_STUDIO_API_KEY: string | undefined;
export declare const NEXT_PUBLIC_THIRDWEB_API_KEY: string | undefined;
export declare const SESSION_PASSWORD: string | undefined;
export declare const NODE_ENV: string | undefined;
export declare const SIWE_SESSION_SECRET: string | undefined;
export declare const ALCHEMY_API_KEY: string | undefined;
export declare const INFURA_API_KEY: string | undefined;
export declare const POLYGONSCAN_API_KEY: string | undefined;
export declare const HOST: string | undefined;
export declare const THIRDWEB_API_KEY: string | undefined;
export declare const EXPLORER_KEY: string | undefined;
export declare const PAPER_CLIENT_ID: string | undefined;
export declare const WALLET_CONNECT: string | undefined;
export declare const THEME_INITIAL_COLOR = "system";
export declare const THEME_COLOR_MODES: Record<string, any>;
export declare const THEME_COLOR_SCHEME: ThemingProps['colorScheme'];
export declare const THEME_CONFIG: {
    initialColorMode: string;
};
export declare const GOERLI_PROVIDER_URL = "https://ethereum-goerli.publicnode.com";
export declare const EXPLORER_API_URL: {
    GOERLI: string;
    POLYGON: string;
};
export declare const SOCIAL_TWITTER = "https://twitter.com/creativecrtv";
export declare const SOCIAL_GITHUB = "https://github.com/creativeplatform/creative-tv";
export declare const SOCIAL_DISCORD = "https://discord.gg/creativeplatform";
export declare const SOCIAL_EMAIL = "mailto:creatives@creativeplatform.xyz";
export declare const SOCIAL_LENS = "https://lensfrens.xyz/thecreative.lens";
export declare const SOCIAL_LINKEDIN = "https://www.linkedin.com/company/creativeplatform";
export declare const CAROUSEL_PLAYLISTS: {
    0: {
        title: string;
        description: string;
        name_1: string;
        playbackId_1: string;
        name_2: string;
        playbackId_2: string;
        name_3: string;
        playbackId_3: string;
        name_4: string;
        playbackId_4: string;
    };
};
export declare const ETH_CHAINS: {
    readonly name: "Goerli";
    readonly title: "Ethereum Testnet Goerli";
    readonly chain: "ETH";
    readonly rpc: readonly ["https://goerli.rpc.thirdweb.com/${THIRDWEB_API_KEY}", "https://goerli.infura.io/v3/${INFURA_API_KEY}", "wss://goerli.infura.io/v3/${INFURA_API_KEY}", "https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}", "https://rpc.goerli.mudit.blog/", "https://ethereum-goerli.publicnode.com", "https://goerli.gateway.tenderly.co", "wss://goerli.gateway.tenderly.co"];
    readonly faucets: readonly ["https://faucet.paradigm.xyz/", "http://fauceth.komputing.org?chain=5&address=${ADDRESS}", "https://goerli-faucet.slock.it?address=${ADDRESS}", "https://faucet.goerli.mudit.blog"];
    readonly nativeCurrency: {
        readonly name: "Goerli Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly infoURL: "https://goerli.net/#about";
    readonly shortName: "gor";
    readonly chainId: 5;
    readonly networkId: 5;
    readonly ens: {
        readonly registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
    };
    readonly explorers: readonly [{
        readonly name: "etherscan-goerli";
        readonly url: "https://goerli.etherscan.io";
        readonly standard: "EIP3091";
    }, {
        readonly name: "blockscout-goerli";
        readonly url: "https://eth-goerli.blockscout.com";
        readonly icon: {
            readonly url: "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM";
            readonly width: 551;
            readonly height: 540;
            readonly format: "png";
        };
        readonly standard: "EIP3091";
    }];
    readonly icon: {
        readonly url: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png";
        readonly height: 512;
        readonly width: 512;
        readonly format: "png";
    };
    readonly testnet: true;
    readonly slug: "goerli";
}[];
export declare const POLYGON_CHAINS: {
    readonly name: "Polygon Mainnet";
    readonly chain: "Polygon";
    readonly icon: {
        readonly url: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/polygon/512.png";
        readonly height: 512;
        readonly width: 512;
        readonly format: "png";
    };
    readonly rpc: readonly ["https://polygon.rpc.thirdweb.com/${THIRDWEB_API_KEY}", "https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}", "https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}", "https://polygon-rpc.com/", "https://rpc-mainnet.matic.network", "https://matic-mainnet.chainstacklabs.com", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet-full-rpc.bwarelabs.com", "https://polygon-bor.publicnode.com", "https://polygon.gateway.tenderly.co", "wss://polygon.gateway.tenderly.co"];
    readonly faucets: readonly [];
    readonly nativeCurrency: {
        readonly name: "MATIC";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    readonly infoURL: "https://polygon.technology/";
    readonly shortName: "matic";
    readonly chainId: 137;
    readonly networkId: 137;
    readonly slip44: 966;
    readonly explorers: readonly [{
        readonly name: "polygonscan";
        readonly url: "https://polygonscan.com";
        readonly standard: "EIP3091";
    }];
    readonly testnet: false;
    readonly slug: "polygon";
}[];
export declare const MUMBAI_CHAIN: {
    readonly name: "Mumbai";
    readonly title: "Polygon Testnet Mumbai";
    readonly chain: "Polygon";
    readonly icon: {
        readonly url: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/polygon/512.png";
        readonly height: 512;
        readonly width: 512;
        readonly format: "png";
    };
    readonly rpc: readonly ["https://mumbai.rpc.thirdweb.com/${THIRDWEB_API_KEY}", "https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}", "https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}", "https://matic-mumbai.chainstacklabs.com", "https://rpc-mumbai.maticvigil.com", "https://matic-testnet-archive-rpc.bwarelabs.com", "https://polygon-mumbai-bor.publicnode.com", "https://polygon-mumbai.gateway.tenderly.co", "wss://polygon-mumbai.gateway.tenderly.co"];
    readonly faucets: readonly ["https://faucet.polygon.technology/"];
    readonly nativeCurrency: {
        readonly name: "MATIC";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    readonly infoURL: "https://polygon.technology/";
    readonly shortName: "maticmum";
    readonly chainId: 80001;
    readonly networkId: 80001;
    readonly explorers: readonly [{
        readonly name: "polygonscan";
        readonly url: "https://mumbai.polygonscan.com";
        readonly standard: "EIP3091";
    }];
    readonly testnet: true;
    readonly slug: "mumbai";
}[];
export declare const TRANSACTION_TITLES: {
    transactionStarted: string;
    transactionSucceed: string;
};
export declare const EPISODE_DROP_ADDRESS: {
    testnet: string;
};
export declare const LOCK_ADDRESS_CREATIVE_TV: {
    creator: string;
    fan: string;
    brand: string;
};
export declare const LOCK_ADDRESS_GOERLI_TESTNET: {
    address: string;
    rpc_url: string;
    chainId: string;
    symbol: string;
};
export declare const FREE_LOCK_ADDRESS_GOERLI_TESTNET: {
    address: string;
    rpc_url: string;
    chainId: string;
    symbol: string;
    data: string;
};
export declare const ACCOUNT_FACTORY_TESTNET = "0xEA69aD73011E39E223873214a1F98aFF008A8ab6";
export declare const ACCOUNT_FACTORY_MUMBAI = "";
export declare const SMART_WALLET_CONFIG: {
    chain: {
        readonly name: "Goerli";
        readonly title: "Ethereum Testnet Goerli";
        readonly chain: "ETH";
        readonly rpc: readonly ["https://goerli.rpc.thirdweb.com/${THIRDWEB_API_KEY}", "https://goerli.infura.io/v3/${INFURA_API_KEY}", "wss://goerli.infura.io/v3/${INFURA_API_KEY}", "https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}", "https://rpc.goerli.mudit.blog/", "https://ethereum-goerli.publicnode.com", "https://goerli.gateway.tenderly.co", "wss://goerli.gateway.tenderly.co"];
        readonly faucets: readonly ["https://faucet.paradigm.xyz/", "http://fauceth.komputing.org?chain=5&address=${ADDRESS}", "https://goerli-faucet.slock.it?address=${ADDRESS}", "https://faucet.goerli.mudit.blog"];
        readonly nativeCurrency: {
            readonly name: "Goerli Ether";
            readonly symbol: "ETH";
            readonly decimals: 18;
        };
        readonly infoURL: "https://goerli.net/#about";
        readonly shortName: "gor";
        readonly chainId: 5;
        readonly networkId: 5;
        readonly ens: {
            readonly registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
        };
        readonly explorers: readonly [{
            readonly name: "etherscan-goerli";
            readonly url: "https://goerli.etherscan.io";
            readonly standard: "EIP3091";
        }, {
            readonly name: "blockscout-goerli";
            readonly url: "https://eth-goerli.blockscout.com";
            readonly icon: {
                readonly url: "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM";
                readonly width: 551;
                readonly height: 540;
                readonly format: "png";
            };
            readonly standard: "EIP3091";
        }];
        readonly icon: {
            readonly url: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png";
            readonly height: 512;
            readonly width: 512;
            readonly format: "png";
        };
        readonly testnet: true;
        readonly slug: "goerli";
    };
    factoryAddress: string;
    clientId: string | undefined;
    gasless: boolean;
};
export declare const CREATIVE_ADDRESS = "0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260";
export declare const TRANSFER_CONTRACT_ADDRESS = "0xBd25C36811Df69d080735eC53Ea4A61C55FdccCd";
export declare const UNLOCK_API_URL = "https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2";
export declare const UNLOCK_QUERY_HOLDS_KEY: import("graphql/language/ast").DocumentNode;
export declare const LIVEPEER_API_URL = "https://livepeer.com/api";
export declare const LIVEPEER_HERO_PLAYBACK_ID = "cbd1dw72qst9xmps";
export declare const LIVEPEER_FEATURED_PLAYBACK_ID = "5c2bzf537qbq0r7o";
export declare const SERVER_SESSION_SETTINGS: {
    cookieName: string;
    password: string;
    cookieOptions: {
        secure: boolean;
    };
};
export declare const CREATIVE_CREW3 = "thecreativedao";
export declare const METOKENS_ADDRESS_GOERLI: {
    foundryFacet: string;
    hubFacet: string;
    metokenFactory: string;
    metokensRegistryFactory: string;
    meTokenDiamond: string;
    meTokensRegistryFacet: string;
};
export declare const METOKENS_ADDRESS_MAINNET: {
    foundryFacet: string;
    hubFacet: string;
    meTokenFactory: string;
    metokensRegistryFactory: string;
    meTokenDiamond: string;
};
export declare const FOUNDRY_FACET_ABI: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const HUB_FACET_ABI: ({
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const METOKEN_FACTORY_ABI: {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
}[];
export declare const METOKENS_REGISTRY_ABI: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const METOKENS_DIAMOND_ABI: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    anonymous: boolean;
    inputs: ({
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    } | {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    })[];
    name: string;
    type: string;
    outputs?: undefined;
    stateMutability?: undefined;
} | {
    inputs: ({
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    } | {
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    })[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const DAI: {
    goerli: string;
    mainnet: string;
};
export declare const ERC20_ABI: ({
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    type: string;
    stateMutability?: undefined;
} | {
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    constant?: undefined;
    payable?: undefined;
})[];
export declare const MAINNET_RPC: string;
export declare const VIDEO_NFT_CONTRACT_ADDRESS = "0x205e06b24328b59e3846c3Fa4a55de7c1D6b227C";
export declare const LENS_CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";
export declare const LENS_CONTRACT_ABI: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    name?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    inputs: never[];
    name: string;
    type: string;
    stateMutability?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: ({
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        components: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
//# sourceMappingURL=config.d.ts.map