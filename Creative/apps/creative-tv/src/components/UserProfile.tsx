import { useState } from "react";
import { useQuery, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const fetchUsers = async (ethAddress: any) => {
  const res = await fetch(
    `https://api.crew3.xyz/communities/thecreativedao/users?ethAddress=${ethAddress}`
  );
  const data = await res.json();
  return data;
};

const queryClient = new QueryClient();

const UserList = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError } = useQuery(
    ["users", address],
    () => fetchUsers(address),
    {
      enabled: !!address,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Flex direction="column">
      {data?.map((user: any) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </Flex>
    </QueryClientProvider>
  </>
  );
};

export default UserList;
