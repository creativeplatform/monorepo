import { Container, Flex } from "@chakra-ui/react";
import TransferCard from "ui/XferCard";
import Events from "ui/Events";

export default function TransferPage() {
    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <TransferCard />
                <Events />
            </Flex>
        </Container>
    );
}