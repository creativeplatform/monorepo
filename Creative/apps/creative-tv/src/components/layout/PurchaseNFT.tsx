import React from 'react'
import usePurchaseNFT from 'hooks/usePurchaseNFT'
import { MenuItem } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'


export default function PurchaseNFT() {
  const { purchaseNFT } = usePurchaseNFT()

  return (
    <MenuItem icon={<WarningIcon />} onClick={() => purchaseNFT()}>
      Subscribe for 0.02 ETH
    </MenuItem>
  )
}
