import type { NextPage } from 'next';
import WertWidget from '@wert-io/widget-initializer';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@chakra-ui/react';
import { TbMoneybag } from 'react-icons/tb'
import { useAddress } from '@thirdweb-dev/react';

const AddFunds: NextPage = () => {
    const address = useAddress() || '';

    if (address) {

    // WERT OPTIONS
    const options = {
        partner_id: "01FGKYK638SV618KZHAVEY7P79",
        origin: "https://sandbox.wert.io",
        currency: 'USD',
        commodity: 'MATIC',
        address: address,
        autosize: true,
        network: 'mumbai',
        lang: 'en',
        click_id: uuidv4(),
        color_buttons: "#EC407A",
        commodities: JSON.stringify([
            {
              commodity: "TTG",
              network: "mumbai",
            },
            {
              commodity: "MATIC",
              network: "mumbai",
            },
          ]),
        currency_amount: 20,
        listeners: {
        loaded: () => console.log('loaded'),
        },
    }

    const wertWidget = new WertWidget(options)

    return (
        <>
            <Button leftIcon={<TbMoneybag />} variant='solid' onClick={() => wertWidget.mount()}>Add Funds</Button>
        </>
    )
}
    return (
        <>
            <Button leftIcon={<TbMoneybag />} variant='solid' onClick={() => alert('You must be connected to purchase crypto')}>Add Funds</Button>
        </>
    )
}

export default AddFunds;