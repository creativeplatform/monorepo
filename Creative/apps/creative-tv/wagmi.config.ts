import { defineConfig } from '@wagmi/cli'
import {etherscan, react } from '@wagmi/cli/plugins'
import { erc721ABI } from 'wagmi'
import { POLYGONSCAN_API_KEY } from 'utils/config'

export default defineConfig({ 
    out: 'src/generated.ts', 
    contracts: [
        {
            name: 'erc721',
            abi: erc721ABI,
        },
    ], 
    plugins: [
        etherscan({
            apiKey: POLYGONSCAN_API_KEY,
            chainId: 80001,
            cacheDuration: 300_000,
            contracts: [
                {
                    name: 'Creative TV NFT',
                    address: '0xdfcb0abE62911aC9eaB22D2E662F53CF4C7f90d4'
                }
            ],
        }),
        react({
            useContractRead: true,
            useContractFunctionRead: true
        }),
    ] 
})
