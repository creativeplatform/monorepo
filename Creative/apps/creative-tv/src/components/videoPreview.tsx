import { Flex, Text, Box } from '@chakra-ui/react'

interface VideoPreviewProps {
  video: Blob | any
}

const VideoPreview = (props: VideoPreviewProps) => {
  return (
    <Flex justifyContent={'center'} alignContent={'center'} direction={'column'}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Video Preview:
      </Text>
      <Box style={{ width: '100%' }}>{props.video && <video style={{ margin: 'auto' }} src={URL.createObjectURL(props.video)} controls />}</Box>
    </Flex>
  )
}
export default VideoPreview;