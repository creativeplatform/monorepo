import React, { useState } from 'react'
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Input,
    useToast,
    Image,
    ButtonGroup,
    IconButton,
    Link,
    BreadcrumbItem, 
    BreadcrumbLink, 
    Breadcrumb,
} from '@chakra-ui/react'
import{ Emoji } from 'ui'
import { useRouter } from 'next/router'
import {
    useAddress,
    useContract,
    useOwnedNFTs,
    useNFTBalance,
    useContractWrite,
} from '@thirdweb-dev/react'
import { NextSeo } from 'next-seo'

export default function VideoPage() {
    const router = useRouter()
    const address = useAddress()

    return (
        <>
            <NextSeo title="" />
            <Container maxW={"1200px"} mt={10}>
                <Button colorScheme={'blue'} onClick={() => router.push("/")}>Back</Button>
            </Container>
        </>
    )
}