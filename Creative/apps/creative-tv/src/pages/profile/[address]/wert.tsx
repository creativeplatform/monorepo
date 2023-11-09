import type { NextPage } from 'next';
import WertWidget from '@wert-io/widget-initializer';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@chakra-ui/react';
import { TbMoneybag } from 'react-icons/tb'
import { useAddress } from '@thirdweb-dev/react';

const Wert: NextPage = () => {
    const address = useAddress() || '';

    // WERT OPTIONS
    const options = {
        partner_id: "01FGKYK638SV618KZHAVEY7P79",
        origin: "https://sandbox.wert.io",
        currency: 'USD',
        commodity: 'ETH',
        address: address,
        autosize: true,
        network: 'goerli',
        lang: 'en',
        click_id: uuidv4(),
        color_buttons: "#EC407A",
        commodities: JSON.stringify([
            {
              commodity: "TTG",
              network: "goerli",
            },
            {
              commodity: "ETH",
              network: "goerli",
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
            <Button leftIcon={<TbMoneybag />} variant='solid' colorScheme='blue' onClick={() => wertWidget.mount()}>Add Funds</Button>
        </>
    )
}

export default Wert