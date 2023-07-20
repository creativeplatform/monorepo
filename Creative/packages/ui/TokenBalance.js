import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
export default function TokenBalance({ tokenAddress }) {
    const address = useAddress();
    const { contract } = useContract(tokenAddress);
    const { data: tokenBalance, isLoading: isTokenBalanceLoading, } = useTokenBalance(contract, address);
    return (_jsx(Box, Object.assign({ mt: 4 }, { children: !isTokenBalanceLoading && (_jsxs(Text, { children: ["Balance: ", tokenBalance === null || tokenBalance === void 0 ? void 0 : tokenBalance.displayValue] })) })));
}
