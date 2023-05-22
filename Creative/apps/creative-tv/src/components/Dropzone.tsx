import { useDropzone } from 'react-dropzone'
import { Box } from '@chakra-ui/react'

// Dropzone component
const Dropzone = ({ onDrop }: { onDrop: (acceptedFiles: File[]) => void }) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: { 'video/*': ['.mp4'] },
      maxFiles: 1,
      onDrop,
    });
  
    return (
      <Box className="parent-dropZone" w="100%" p={4} border="4px dashed #EC407A" my={5} cursor="pointer">
        <Box className="dropZone" {...getRootProps()}>
          <Box as="input" {...getInputProps()} />
          <Box as="span" className="drag-txt">
            Drag and Drop or Browse Files
          </Box>
        </Box>
      </Box>
    );
};
export default Dropzone;