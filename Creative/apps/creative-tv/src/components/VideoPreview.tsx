import { Box, Text } from '@chakra-ui/react';

// VideoPreview component
const VideoPreview = ({ video }: { video: File | undefined }) => (
  <Box mt={4}>
    <Text fontSize="lg" fontWeight="bold">
      Video Preview:
    </Text>
    {video && (
      <video
        src={URL.createObjectURL(video)}
        height={500}
        controls
        style={{ maxWidth: '100%', marginTop: '8px' }}
      />
    )}
  </Box>
);

export default VideoPreview;