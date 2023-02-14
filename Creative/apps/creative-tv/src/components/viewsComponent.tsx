import React from 'react'
import { Box, StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { View } from 'utils/fetchers/view'

const ViewsComponent = (): JSX.Element => {
    const views = useQuery<View[]>([''], () => fetch('/api/livepeer/views').then((res) => res.json()), {
        staleTime: 3000,
  })

  if (views.isLoading) {
    console.log('loading...')
    return <Box><p>Loading...</p></Box>
    }

    if (views.isError) {
    console.log('error', views.error)
    return <Box children='error' />
    }

  return (
    <Box>
        {views.data.map((props) => (
            <StatGroup key={props.id}>
                <Stat>
                    <StatLabel>Views</StatLabel>
                    <StatNumber>{props.startViews}</StatNumber>
                </Stat>
            </StatGroup>
        ))}
    </Box>
  )

}

export default ViewsComponent;