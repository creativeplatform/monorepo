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
            <NextSeo title="Creative Xfer" />
            <Container maxW={"1200px"} mt={10}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => router.push(`/profile/${address}`)}>Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Xfer</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
                    <TransferCard />
                    <Events />
                </Flex>
            </Container>
        </>
    );
}