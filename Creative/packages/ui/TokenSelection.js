import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Card, Spinner, Text } from "@chakra-ui/react";
import { useContract, useContractMetadata } from "@thirdweb-dev/react";
export default function TokenSelection({ tokenAddress, isSelected }) {
    const { contract } = useContract(tokenAddress);
    const { data: tokenMetadata, isLoading: isTokenMetadataLoading, } = useContractMetadata(contract);
    let coinBorderColor = "gray.100";
    if (isSelected) {
        coinBorderColor = "green.100";
    }
    return (_jsx(Card, Object.assign({ p: 4, mr: 2, border: "2px solid", borderColor: coinBorderColor }, { children: !isTokenMetadataLoading ? (_jsx(Box, { children: _jsx(Text, { children: tokenMetadata === null || tokenMetadata === void 0 ? void 0 : tokenMetadata.symbol }) })) : (_jsx(Spinner, {})) })));
}
;
