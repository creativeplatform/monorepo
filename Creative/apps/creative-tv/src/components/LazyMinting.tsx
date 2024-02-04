import { Button, IconButton, Stack, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { formatString, handleCopyString } from 'utils/helpers'

type LazyMintProps = {
  lazyMintTxHash?: string
  isMinting: boolean
  handleLazyMintNFT: () => Promise<void>
}

//
function LazyMinting(props: LazyMintProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toast = useToast()

  return (
    <Stack spacing="20px" my={12} style={{ border: '1px solid #a4a4a4', padding: 24 }}>
      <Text as={'h4'} my={2} style={{ fontWeight: '500', fontSize: 22 }}>
        {props.lazyMintTxHash ? 'NFT was lazy minted successfully!' : 'Time to lazy mint your NFTs!'}
      </Text>

      {props.lazyMintTxHash ? (
        <p style={{ fontWeight: '500' }}>
          TxHash:{' '}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              handleCopyString({
                txt: props.lazyMintTxHash,
                toast: toast({
                  title: 'TxHash Copied',
                  description: `Successfully copied ${formatString.truncate(props.lazyMintTxHash!, 'middle', 8)}`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                }),
              })
            }>
            {formatString.truncate(props.lazyMintTxHash, 'middle', 8)}
          </span>
          <IconButton
            aria-label="Copy to clipboard"
            icon={<HiOutlineClipboardCopy />}
            onClick={() =>
              handleCopyString({
                txt: props.lazyMintTxHash,
                toast: toast({
                  title: 'TxHash Copied',
                  description: `Successfully copied ${formatString.truncate(props.lazyMintTxHash!, 'middle', 8)}`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                }),
              })
            }
          />
        </p>
      ) : (
        <Button
          onClick={props.handleLazyMintNFT}
          isLoading={props.isMinting}
          _hover={{ cursor: props.isMinting ? 'progress' : 'pointer' }}
          style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}>
          {props.isMinting ? 'Lazy Minting...' : 'Lazy Mint NFT'}
        </Button>
      )}

      {/* TODO: Wanting to listen to events : `LazyMinted` */}
      <Button
        onClick={props.handleLazyMintNFT}
        isLoading={props.isMinting}
        _hover={{ cursor: props.isMinting ? 'progress' : 'pointer' }}
        style={{ width: 160, margin: '12px 0', backgroundColor: '#EC407A' }}>
        {props.isMinting ? 'Lazy Minting...' : 'Lazy Mint NFT'}
      </Button>
    </Stack>
  )
}

export default LazyMinting;