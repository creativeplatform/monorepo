import { AddressZero } from "@ethersproject/constants";
import { useToast } from '@chakra-ui/react';
import sdk from "./useInitThirdweb";
import { readFileSync } from "fs";

const toast = useToast();

(async () => {
  try {
    const editionDropAddress = await sdk?.deployer.deployEditionDrop({
      name: "Creative Episode Drop",
      description: "An episode of Creative TV",
      image: readFileSync("https://storage.unlock-protocol.com/b7ed38f5-1c6f-4747-af62-250dbc6afafc"),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = await sdk?.getContract(`${editionDropAddress}`, "edition-drop");

    const metadata = await editionDrop?.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    console.log("✅ editionDrop metadata:", metadata);
    useToast({
      title: '🎉 Done!',
      description: `Successfully Verified ${editionDropAddress}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();
