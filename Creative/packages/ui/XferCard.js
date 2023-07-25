import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardHeader, CardBody, CardFooter, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
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
    return (_jsxs(Card, Object.assign({ w: "50%", p: 5 }, { children: [_jsxs(CardHeader, { children: [_jsx(Heading, { children: "Creative Xfer" }), _jsx(Text, Object.assign({ size: 'sm', fontStyle: 'italic' }, { children: "Empowering Creative TV users to transfer collected tokens and NFTs seamlessly. Unlock new experiences by exchanging unique assets within the app's vibrant and diverse creative ecosystem." }))] }), _jsxs(CardBody, { children: [_jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Select Token:" })), _jsx(Flex, Object.assign({ flexDirection: "row", mt: 4 }, { children: !isVerifiedTokensLoading &&
                            verifiedTokens.map((token) => (_jsx(Box, Object.assign({ as: "button", onClick: () => handleTokenSelection(token) }, { children: _jsx(TokenSelection, { tokenAddress: token, isSelected: selectedToken === token }) }), token))) })), _jsx(TokenBalance, { tokenAddress: selectedToken }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Send To:" })), _jsx(Input, { placeholder: "0x0000000", type: "text", value: formData.receiver, onChange: (event) => handleChange(event, "receiver") }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Amount:" })), _jsx(Input, { placeholder: "0.0", type: "number", value: formData.amount, onChange: (event) => handleChange(event, "amount") }), _jsx(Text, Object.assign({ mt: 4, fontWeight: "bold" }, { children: "Message:" })), _jsx(Textarea, { placeholder: "Add short message here.", value: formData.message, onChange: (event) => handleChange(event, "message") })] }), _jsx(CardFooter, { children: _jsx(Box, Object.assign({ mt: 8 }, { children: address ? (_jsx(TransferButton, { tokenAddress: selectedToken, receiver: formData.receiver, amount: formData.amount.toString(), message: formData.message })) : (_jsx(Text, { children: "Please connect your wallet to make a transfer." })) })) })] })));
}
;
