import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./XferButton";
export default function TransferCard() {
    const address = useAddress();
    const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);
    const { data: verifiedTokens, isLoading: isVerifiedTokensLoading, } = useContractRead(contract, "getVerifiedTokens");
    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: ''
    });
    const [selectedToken, setSelectedToken] = useState('');
    const handleChange = (event, name) => {
        setFormData((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: event.target.value })));
    };
    const handleTokenSelection = (tokenAddress) => {
        setSelectedToken(tokenAddress);
    };
    return (_jsxs(Card, Object.assign({ w: "50%", p: 20 }, { children: [_jsx(Heading, { children: "Transfer:" }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Select Token:" })), _jsx(Flex, Object.assign({ flexDirection: "row", mt: 4 }, { children: !isVerifiedTokensLoading &&
                    verifiedTokens.map((token) => (_jsx(Box, Object.assign({ as: "button", onClick: () => handleTokenSelection(token) }, { children: _jsx(TokenSelection, { tokenAddress: token, isSelected: selectedToken === token }) }), token))) })), _jsx(TokenBalance, { tokenAddress: selectedToken }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Send To:" })), _jsx(Input, { placeholder: "0x0000000", type: "text", value: formData.receiver, onChange: (event) => handleChange(event, "receiver") }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Amount:" })), _jsx(Input, { placeholder: "0.0", type: "number", value: formData.amount, onChange: (event) => handleChange(event, "amount") }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Message:" })), _jsx(Input, { placeholder: "Add short message here.", type: "text", value: formData.message, onChange: (event) => handleChange(event, "message") }), _jsx(Box, Object.assign({ mt: 8 }, { children: address ? (_jsx(TransferButton, { tokenAddress: selectedToken, receiver: formData.receiver, amount: formData.amount.toString(), message: formData.message })) : (_jsx(Text, { children: "Please connect your wallet to make a transfer." })) }))] })));
}
;
