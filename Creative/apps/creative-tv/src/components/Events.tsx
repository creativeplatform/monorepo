import { Box, Card, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "utils/config";
import { ethers } from "ethers";

export default function Events() {
    function truncateAddress(address: string) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: events,
        isLoading: isEventsLoading,
    } = useContractEvents(
        contract,
        "TransactionCompleted",
        {
            queryFilter: {
                fromBlock: -7000,
            }
        }
    );
    console.log(events);

    return (
        <Box mt={20} w={"100%"}>
            <Heading>Recent Transfer:</Heading>
            {!isEventsLoading ? (
                events?.map((event: any, index) => (
                    <Card key={index} p={8} my={4}>
                        <Flex flexDirection={"row"} alignItems={"center"}>
                            <Text p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>{truncateAddress(event.data.sender)}</Text>
                            <Text mx={2} fontSize={"sm"}>To</Text>
                            <Text p={2} border={"1px solid grey"} borderRadius={6} fontSize={"xs"}>{truncateAddress(event.data.receiver)}</Text>
                        </Flex>
                        <Text fontSize={"xl"} my={4}>{event.data.message}</Text>
                        <Text>Amount: {ethers.utils.formatEther(event.data.amount)}</Text>
                    </Card>
                )).reverse()
            ) : (
                <Spinner />
            )}
        </Box>
    )
};