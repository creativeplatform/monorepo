import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const useAllMetokens = () => {
    return useQuery(['allMetokens'], async () => {
      const response = await axios.post('https://api.studio.thegraph.com/query/35797/metokens-core/v0.2.0/graphql', {
        query: `
          query AllMetokensQuery {
            meTokens(orderBy: createdAt) {
              id
            }
          }
        `,
      });
  
      return response.data.data.meTokens;
    });
};
  
  