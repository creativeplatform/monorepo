import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import { ethers } from "ethers";
export default function Events() {
    function truncateAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);
    const { data: events, isLoading: isEventsLoading, } = useContractEvents(contract, "TransactionCompleted", {
        queryFilter: {
            fromBlock: -7000,
        }
    });
    console.log(events);
    return (_jsxs(Box, Object.assign({ mt: 20, w: "100%" }, { children: [_jsx(Heading, { children: "Recent Transfer:" }), !isEventsLoading ? (events === null || events === void 0 ? void 0 : events.map((event, index) => (_jsxs(Card, Object.assign({ p: 8, my: 4 }, { children: [_jsxs(Flex, Object.assign({ flexDirection: "row", alignItems: "center" }, { children: [_jsx(Text, Object.assign({ p: 2, border: "1px solid grey", borderRadius: 6, fontSize: "xs" }, { children: truncateAddress(event.data.sender) })), _jsx(Text, Object.assign({ mx: 2, fontSize: "sm" }, { children: "To" })), _jsx(Text, Object.assign({ p: 2, border: "1px solid grey", borderRadius: 6, fontSize: "xs" }, { children: truncateAddress(event.data.receiver) }))] })), _jsx(Text, Object.assign({ fontSize: "xl", my: 4 }, { children: event.data.message })), _jsxs(Text, { children: ["Amount: ", ethers.utils.formatEther(event.data.amount)] })] }), index))).reverse()) : (_jsx(Spinner, {}))] })));
}
;
