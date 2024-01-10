import React from 'react'
import { Button } from '@chakra-ui/react'
import { useSmartWallet, embeddedWallet } from '@thirdweb-dev/react'
import { ACCOUNT_FACTORY_TESTNET } from 'utils/config'

export default function SignInWallet({ btnTitle }: { btnTitle: string }) {
    const { connect } = useSmartWallet(embeddedWallet(), {
        factoryAddress: ACCOUNT_FACTORY_TESTNET,
        gasless: true,
    });
    
    const signIn = async () => {
        try {
        await connect({
            connectPersonalWallet: async (embeddedWallet) => {
            const authResult = await embeddedWallet.authenticate({
                strategy: "iframe"
            });
            await embeddedWallet.connect({ authResult });
            },
        });
        } catch (error) {
        if (error) {
            // Handle the specific 'user closed modal' error
            console.log("Authentication process was not completed.");
        } else {
            // Handle other errors
            console.log("Something went wrong.");
        }
        }
    };
    
    return (
        <Button onClick={signIn}>{btnTitle}</Button>
    )
}