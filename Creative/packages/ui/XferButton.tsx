import { useContract } from "@thirdweb-dev/react";
import { Button } from "./Button";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

type Props = {
    tokenAddress: string;
    receiver: string;
    amount: string;
    message: string;
};

export default function TransferButton({ tokenAddress, receiver, amount, message }: Props) {
    const toast = useToast();

    const {
        contract: tokenContract
    } = useContract(tokenAddress, 'token');

    const {
        contract: transferContract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    return (
        <Button />
    );
}