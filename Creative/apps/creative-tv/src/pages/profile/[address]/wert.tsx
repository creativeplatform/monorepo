import type { NextPage } from 'next';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import WertWidget from '@wert-io/widget-initializer';
import { Button } from '@chakra-ui/react';
import { TbMoneybag } from 'react-icons/tb'
import { WERT_PRIVATE_KEY } from '../../../utils/config';
import { useAddress } from '@thirdweb-dev/react';

const Wert: NextPage = () => {
    const address = useAddress() || '';

    // WERT SIGNER HELPER
    const signedData = signSmartContractData({
        address: address,
        commodity: "TTG",
        network: "goerli",
        commodity_amount: 1,
        sc_address: "0xc9bdfa5f177961d96f137c42241e8ecbca605781",
        sc_input_data: "0x",
    }, `${WERT_PRIVATE_KEY}`);

    const wertOptions = {
        partner_id: "01FGKYK638SV618KZHAVEY7P79",
        origin: "https://sandbox.wert.io",
        autosize: true,
        lang: 'en',
    }

    const wertWidget = new WertWidget({
        ...signedData,
        ...wertOptions,
    })

    return (
        <>
            <Button leftIcon={<TbMoneybag />} variant='solid' colorScheme='blue' onClick={() => wertWidget.mount()}>Add Funds to Account</Button>
        </>
    )
}

export default Wert