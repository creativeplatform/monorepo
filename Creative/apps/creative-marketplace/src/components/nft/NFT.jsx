import React from "react";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { 
    MARKETPLACE_ADDRESS, 
    NFT_COLLECTION_ADDRESS 
} from "../const/addresses";
import { NFT } from "@thirdweb-dev/sdk";
import PropTypes from 'prop-types';
import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions, useNFT } from "@thirdweb-dev/react";

NFTComponent.propTypes = {
    nft: PropTypes.shape(NFT).isRequired,
  };

export default function NFTComponent({ nft }) {
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const { contract: nftContract } = useContract(NFT_COLLECTION_ADDRESS);
    
    const { data: nft, isLoading: loadingNFT, error: nftError } = useNFT(nftContract, nft.metadata.id);
    
    const { data: directListing, isLoading: loadingDirectListing } = 
        useValidDirectListings(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
        });

    const { data: auctionListing, isLoading: loadingAuction } = 
        useValidEnglishAuctions(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
        });

        if (loadingNFT || nftError || !nft) {
            return <div>NFT not found or loading</div>;
          }

    return (
        <Container style={{ backgroundColor: '#EEE', padding: '20px', borderRadius: '6px', borderWidth: '1px', borderColor: 'lightgray'}}>
            <Row>
                <Col>
                    <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
                        <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <small style={{ color: 'darkgray' }}>Token ID #{nft.metadata.id}</small>
                    <p style={{ fontWeight: 'bold' }}>{nft.metadata.name}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                        <Spinner animation="border" />
                    ) : directListing && directListing[0] ? (
                        <div>
                            <small>Price</small>
                            <small>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</small>
                        </div>
                    ) : auctionListing && auctionListing[0] ? (
                        <div>
                            <small>Minimum Bid</small>
                            <small>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</small>
                        </div>
                    ) : (
                        <div>
                            <small>Price</small>
                            <small>Not Listed</small>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
