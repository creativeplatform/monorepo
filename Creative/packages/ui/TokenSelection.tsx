import { Box, Card, Spinner, Text } from "@chakra-ui/react";
import { useContract, useContractMetadata } from "@thirdweb-dev/react";

type Props = {
    tokenAddress: string;
    isSelected?: boolean;
};

export default function TokenSelection({ tokenAddress, isSelected }: Props) {
    const {
        contract
    } = useContract(tokenAddress);
    
    const {
        data: tokenMetadata,
        isLoading: isTokenMetadataLoading,
    } = useContractMetadata(contract);

    let coinBorderColor = "gray.100";

    if (isSelected) {
        coinBorderColor = "green.100";
    }

    return (
        <Card p={4} mr={2} border={"2px solid"} borderColor={coinBorderColor}>
            {!isTokenMetadataLoading ? (
                <Box>
                    <Text>{tokenMetadata.symbol}</Text>
                </Box>
            ) : (
                <Spinner />
            )}
        </Card>
    )
};