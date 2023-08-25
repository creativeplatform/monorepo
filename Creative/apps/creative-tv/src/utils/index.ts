import { CreateToastFnReturn } from '@chakra-ui/react'
import truncateEthAddress from 'truncate-eth-address'

export const handleCopyAddress = (address: string, toasta: CreateToastFnReturn) => {
  navigator.clipboard.writeText(address ?? '')
  // Optionally, you can show a success message or perform any other actions

  toasta({
    title: 'Address Copied',
    description: 'Successfully Copied ' + truncateEthAddress(`${address}`),
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
}

export const formatString = (str: string) => {
  if (!str.includes('_')) {
    return str.toUpperCase()
  } else {
    return str.split('_').join(' ').toUpperCase()
  }
}
