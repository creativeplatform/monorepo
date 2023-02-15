import { Tooltip } from '@chakra-ui/react'
  
export const CustomToolTip = ( message: any, position: any) => (
    <Tooltip label={message} aria-label={message} placement={position}>
    </Tooltip>
)