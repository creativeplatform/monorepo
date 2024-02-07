import { Spinner, VStack } from '@chakra-ui/react'
import { globalTheme } from 'utils/config'

export const AppSpinner = () => {
  return (
    <VStack spacing={0} alignItems={'flex-start'} my={4}>
      <Spinner my={12} alignSelf={'center'} size="md" thickness="3px" speed="0.5s" emptyColor="gray.200" color={globalTheme.colors.primary} />
    </VStack>
  )
}
