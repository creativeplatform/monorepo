import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, BreadcrumbItem, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react';
import { LivepeerConfig } from '@livepeer/react';
import WagmiNft from './WagmiNft';
import { useLivepeerClient } from 'hooks/useLivepeerClient';
import { AssetData } from './CreateAndViewAsset';

interface HeaderProps {
  children: ReactNode;
}

const MintNftVideo = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter();
  const [exportedAsset, setExportedAsset] = useState<AssetData>({} as AssetData);


  return (
    <LivepeerConfig client={useLivepeerClient}>
      <Box>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink href="#">Mint NFT Video</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <WagmiNft exportedAsset={exportedAsset} />
      </Box>
    </LivepeerConfig>
  );
};

export default MintNftVideo;
