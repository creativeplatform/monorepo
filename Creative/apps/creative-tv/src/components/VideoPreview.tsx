import { Flex, Text } from '@chakra-ui/react'

interface VideoPreviewProps {
  video: Blob | any
}
/**
 * Renders a video preview component.
 *
 * @component
 * @param {VideoPreviewProps} props - The props for the VideoPreview component.
 * @returns {JSX.Element} - The rendered VideoPreview component.
 */
export const VideoPreview = (props: VideoPreviewProps) => {
  return (
    <Flex justifyContent={'center'} alignContent={'center'} direction={'column'}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Video Preview:
      </Text>
      <div style={{ width: '100%' }}>{props.video && <video style={{ margin: 'auto' }} src={URL.createObjectURL(props.video)} controls />}</div>
    </Flex>
  )
}