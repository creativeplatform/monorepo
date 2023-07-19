var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Web3Button, useContract } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
export default function TransferButton({ tokenAddress, receiver, amount, message }) {
    const toast = useToast();
    const { contract: tokenContract } = useContract(tokenAddress, 'token');
    const { contract: transferContract } = useContract(TRANSFER_CONTRACT_ADDRESS);
    return (_jsx(Web3Button, Object.assign({ contractAddress: TRANSFER_CONTRACT_ADDRESS, action: (contract) => __awaiter(this, void 0, void 0, function* () {
            yield (tokenContract === null || tokenContract === void 0 ? void 0 : tokenContract.setAllowance(TRANSFER_CONTRACT_ADDRESS, ethers.utils.parseEther(amount).toString()));
            yield (transferContract === null || transferContract === void 0 ? void 0 : transferContract.call("transfer", [
                tokenAddress,
                receiver,
                ethers.utils.parseEther(amount),
                message
            ]));
        }), onSuccess: () => toast({
            title: 'Transfer Successful',
            description: "You have successfully transferred tokens!",
            status: 'success',
            duration: 9000,
            isClosable: true,
        }) }, { children: "Transfer Token" })));
}
