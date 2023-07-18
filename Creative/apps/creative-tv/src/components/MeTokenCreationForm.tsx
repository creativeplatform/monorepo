import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAddress } from '@thirdweb-dev/react';
import { createMeToken } from 'utils/fetchers/createMeToken';
import { getMeTokenContract } from 'utils/fetchers/createMeToken';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';

export default function MeTokenCreationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const address = useAddress();
  const [meTokenContract, setMeTokenContract] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const getContract = async () => {
      const contract = await getMeTokenContract(address || '');
      setMeTokenContract(contract);
    };
    getContract();
  }, [address]);

  console.log(meTokenContract);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const { name, symbol, hubId, assetsDeposited } = data;
      const tx = await createMeToken({ name, symbol, hubId, assetsDeposited }, meTokenContract);
      console.log(tx);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: any;

    if (isSubmitted) {
      timer = setTimeout(() => {
        setIsSubmitted(false);
        setIsLoading(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSubmitted]);

  const inputBoxStyle = {
    borderRadius: '4px',
    display: 'flex',
    width: '45vw',
    marginBottom: '15px',
    padding: '15px',
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="#171923"
        border="4px solid #EDEDEE"
        borderRadius="15px"
        width="100%"
        display="flex"
        flexDirection="column"
        padding="1rem"
        alignItems="center"
        marginBottom="30px"
      >
        <Heading marginBottom="0.5em" fontSize="2em" fontWeight="bold" color="#EDEDEE">
          MeToken Creation Form
        </Heading>
        <hr width="85%" margin="0 auto" marginBottom="3em" border="none" borderBottom="1px solid #EDEDEE" />
        <Stack spacing={4} width="45vw">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel color="#EDEDEE">Name:</FormLabel>
            <Input
              type="text"
              placeholder="Your meToken Name"
              {...register('name', { required: true })}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.symbol}>
            <FormLabel color="#EDEDEE">Symbol:</FormLabel>
            <Input
              type="text"
              placeholder="Your meToken symbol"
              {...register('symbol', { required: true })}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.hubId}>
            <FormLabel color="#EDEDEE">Hub ID:</FormLabel>
            <Input
              type="number"
              placeholder="Your Hub ID number"
              {...register('hubId', { required: true })}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.assetsDeposited}>
            <FormLabel color="#EDEDEE">Assets Deposited:</FormLabel>
            <Input
              type="text"
              placeholder="Number of assets deposited"
              {...register('assetsDeposited', { required: true })}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
        </Stack>
        {isLoading ? (
          <Button
            type="submit"
            disabled
            background="linear-gradient(to right, #E03C88, #E34335, #F6B138)"
            borderRadius="10px"
            fontSize="18px"
            fontWeight="bold"
            height="50px"
            width="75%"
            padding="10px"
            marginTop="20px"
            marginBottom="40px"
          >
            Creating meToken...
          </Button>
        ) : (
          <Button
            type="submit"
            background="linear-gradient(to right, #E03C88, #E34335, #F6B138)"
            borderRadius="10px"
            fontSize="18px"
            fontWeight="bold"
            height="50px"
            width="75%"
            padding="10px"
            marginTop="20px"
            marginBottom="40px"
          >
            {isSubmitted ? 'meToken Created!' : 'Submit'}
          </Button>
        )}
      </Box>
    </>
  );
}