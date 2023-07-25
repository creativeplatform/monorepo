import { Box, Card, CardHeader, CardBody, CardFooter, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../apps/creative-tv/src/utils/config";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./XferButton";

export default function TransferCard() {
    const address = useAddress();

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(contract, "getVerifiedTokens");

    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: ''
    });

    const [selectedToken, setSelectedToken] = useState('');

    const handleChange = (event: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    };

    return (
        <Card w={"50%"} p={5}>
            <CardHeader>
                <Heading>Creative Xfer</Heading>
                <Text size={'sm'} fontStyle={'italic'}>Empowering Creative TV users to transfer collected tokens and NFTs seamlessly. Unlock new experiences by exchanging unique assets within the app's vibrant and diverse creative ecosystem.</Text>
            </CardHeader>
            <CardBody>
                <Text mt={4} fontWeight={"bold"}>Select Token:</Text>
                <Flex flexDirection={"row"} mt={4}>
                    {!isVerifiedTokensLoading && 
                        verifiedTokens.map((token: string) => (
                            <Box
                                as={"button"}
                                key={token}
                                onClick={() => handleTokenSelection(token)}
                            >
                                <TokenSelection
                                    tokenAddress={token}
                                    isSelected={selectedToken === token}
                                />
                            </Box>
                            
                        ))}
                </Flex>
                
                <TokenBalance tokenAddress={selectedToken} />

                <Text mt={4} fontWeight={"bold"}>Send To:</Text>
                <Input
                    placeholder="0x0000000"
                    type="text"
                    value={formData.receiver}
                    onChange={(event) => handleChange(event, "receiver")}
                />
                <Text mt={4} fontWeight={"bold"}>Amount:</Text>
                <Input
                    placeholder="0.0"
                    type="number"
                    value={formData.amount}
                    onChange={(event) => handleChange(event, "amount")}
                />
                <Text mt={4} fontWeight={"bold"}>Message:</Text>
                <Textarea
                    placeholder="Add short message here."
                    value={formData.message}
                    onChange={(event) => handleChange(event, "message")}
                />
            </CardBody>
            <CardFooter>
                <Box mt={8}>
                    {address ? (
                        <TransferButton
                            tokenAddress={selectedToken}
                            receiver={formData.receiver}
                            amount={formData.amount.toString()}
                            message={formData.message}
                        />
                    ) : (
                        <Text>Please connect your wallet to make a transfer.</Text>
                    )}
                </Box>
            </CardFooter>
        </Card>
    );
};