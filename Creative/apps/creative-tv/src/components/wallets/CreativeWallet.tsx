import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { 
    Box, 
    Button, 
    Menu, 
    MenuButton,
    MenuList, 
    MenuItem,
    MenuDivider,
    MenuGroup,
} from '@chakra-ui/react'
import { SmartWallet, EmbeddedWallet } from '@thirdweb-dev/wallets'
import { Mumbai } from '@thirdweb-dev/chains'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { useAddress, shortenAddress } from '@thirdweb-dev/react'
import { THIRDWEB_API_KEY, ACCOUNT_FACTORY_TESTNET } from '../../utils/config'

export const ConnectSmartWallet = () => {
    const address = useAddress();
    const [sdk, setSdk] = useState<ThirdwebSDK | null>(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (sdk && isWalletConnected) {
            sdk.wallet.getAddress().then(setWalletAddress);
        }
    }, [sdk,isWalletConnected]);

    const connectSmartWallet = async () => {
        if (isWalletConnected) return;
    
        try {
          const personalWallet = new EmbeddedWallet({
            chain: Mumbai,
            clientId: THIRDWEB_API_KEY || '',
          });
    
          const authResult = await personalWallet.authenticate({ strategy: "iframe" });
          await personalWallet.connect({authResult});
    
          const config = {
            chain: "mumbai",
            factoryAddress: ACCOUNT_FACTORY_TESTNET,
            clientId: THIRDWEB_API_KEY,
            gasless: true,
          };
    
          const wallet = new SmartWallet(config);
          await wallet.connect({ personalWallet });
    
          const sdkInstance = await ThirdwebSDK.fromWallet(wallet, "mumbai", {
            clientId: THIRDWEB_API_KEY,
          });
    
          setSdk(sdkInstance);
          setIsWalletConnected(true);
        } catch (error) {
          console.error('Error setting up wallet and SDK:', error);
        }
    };

    return (
        <Box>
            {!address ? (
                <Button
                    onClick={connectSmartWallet}
                >
                Connect Wallet
                </Button>
            ) : (
                <Menu>
                    <MenuButton as={Button} colorScheme="pink" variant="outline">
                        {walletAddress ? shortenAddress(walletAddress) : 'Connect Wallet'}
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Profile">
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>Payments </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Help">
                            <MenuItem>Docs</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuItem>
                            <NextLink href="/logout">
                                <a>Logout</a>
                            </NextLink>
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Box>
    )
}