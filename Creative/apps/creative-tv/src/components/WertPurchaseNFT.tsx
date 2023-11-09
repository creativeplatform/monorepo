import React from 'react';
import type { NextPage } from 'next';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import WertWidget from '@wert-io/widget-initializer';
import { Button } from '@chakra-ui/react';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { WERT_PRIVATE_KEY, CREATIVE_ADDRESS } from '../utils/config';
import { useAddress } from '@thirdweb-dev/react';
import { v4 as uuidv4 } from 'uuid';
import { encodeFunctionData } from 'viem';

import Unlock from '../utils/fetchers/Unlock.json'

const WertPurchaseNFT: NextPage = () => {
    const address = useAddress() || '';

    const data = encodeFunctionData({
        abi: Unlock.abi,
        functionName: 'purchase',
        args: [[1000000000000000000], [address], [CREATIVE_ADDRESS], [CREATIVE_ADDRESS], ['0x']]
      })

    // WERT SIGNER HELPER
    const signedData = signSmartContractData({
        address: address,
        commodity: "TTG",
        network: "goerli",
        commodity_amount: 1,
        sc_address: "0xc9bdfa5f177961d96f137c42241e8ecbca605781",
        sc_input_data: data,
    }, `${WERT_PRIVATE_KEY}`);

    const wertOptions = {
        partner_id: "01FGKYK638SV618KZHAVEY7P79",
        click_id: uuidv4(),
        origin: "https://sandbox.wert.io",
        color_buttons: "#EC407A",
        autosize: true,
        lang: 'en',
    }

    const wertWidget = new WertWidget({
        ...signedData,
        ...wertOptions,
    })

    return (
        <>
            <Button leftIcon={<MdOutlineShoppingCartCheckout />} onClick={() => wertWidget.mount()}>Purchase Membership</Button>
        </>
    )
}

export default WertPurchaseNFT;