import { 
    Container, 
    Flex, 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator, 
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useAddress } from '@thirdweb-dev/react';
import TransferCard from "ui/XferCard";
import Events from "ui/Events";

export default function TransferPage() {
    const router = useRouter();
    const address = useAddress();
    return (
        <>
            <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
                <TransferCard />
                <Events />
            </Flex>
        </>
    );
}