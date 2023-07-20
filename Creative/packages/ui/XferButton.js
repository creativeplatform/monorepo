import { jsx as _jsx } from "react/jsx-runtime";
import { useContract } from "@thirdweb-dev/react";
import { Button } from "./Button";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import { useToast } from "@chakra-ui/react";
export default function TransferButton({ tokenAddress, receiver, amount, message }) {
    const toast = useToast();
    const { contract: tokenContract } = useContract(tokenAddress, 'token');
    const { contract: transferContract } = useContract(TRANSFER_CONTRACT_ADDRESS);
    return (_jsx(Button, {}));
}
