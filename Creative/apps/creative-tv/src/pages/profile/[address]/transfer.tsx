import { 
    Flex, 
} from "@chakra-ui/react";
import type { NextPage } from "next"
import TransferCard from "ui/XferCard";
import Events from "ui/Events";

const TransferPage: NextPage = () => {
    return (
        <>
            <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
                <TransferCard />
                <Events />
            </Flex>
        </>
    );
}
export default TransferPage;