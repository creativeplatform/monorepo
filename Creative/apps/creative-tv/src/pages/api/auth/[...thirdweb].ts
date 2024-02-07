import { ThirdwebAuth } from '@thirdweb-dev/auth/next'
import { EthersWallet, PrivateKeyWallet } from '@thirdweb-dev/wallets'
import { ethers } from 'ethers'
import { NEXT_PUBLIC_AUTH_DOMAIN, THIRDWEB_AUTH_PRIVATE_KEY } from 'utils/config'

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  // Use the domain from the environment or default to evmkit.com
  domain: NEXT_PUBLIC_AUTH_DOMAIN || 'creativeplatform.xyz',

  // Use the private key from the environment or generate a random one
  wallet: THIRDWEB_AUTH_PRIVATE_KEY ? new PrivateKeyWallet(THIRDWEB_AUTH_PRIVATE_KEY) : new EthersWallet(ethers.Wallet.createRandom()),
})

export default ThirdwebAuthHandler()
