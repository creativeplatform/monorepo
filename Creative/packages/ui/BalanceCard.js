import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractEvents, useContractMetadata, useTokenBalance } from "@thirdweb-dev/react";
export default function BalanceCard({ tokenAddress }) {
    const address = useAddress();
    const { contract } = useContract(tokenAddress);
    const { data: contractMetadata, isLoading: isContractMetadataLoading, } = useContractMetadata(contract);
    const { data: tokenBalance, isLoading: isTokenBalanceLoading, } = useTokenBalance(contract, address);
    const { data: events, isLoading: isEventsLoading, } = useContractEvents(contract, "get");
    return (_jsx(Card, Object.assign({ p: 4, width: "100%", height: "100%", border: "2px solid", borderColor: "gray.100" }, { children: !isContractMetadataLoading ? (_jsxs(Stack, Object.assign({ textAlign: "center" }, { children: [_jsx(Text, Object.assign({ fontWeight: "bold", fontSize: "2xl" }, { children: contractMetadata === null || contractMetadata === void 0 ? void 0 : contractMetadata.symbol })), _jsx(Text, { children: "Balance:" }), !isTokenBalanceLoading ? (_jsx(Text, Object.assign({ fontSize: "3xl", fontWeight: "bold" }, { children: tokenBalance === null || tokenBalance === void 0 ? void 0 : tokenBalance.displayValue }))) : (_jsx(Spinner, {}))] }))) : (_jsx(Spinner, {})) })));
}
