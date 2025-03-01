import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          product: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Product',
                sku: args!.sku,
              });
            },
          },
        },
      },
      Product: {
        keyFields: ['sku'],
        fields: {
          description: {
            read(description) {
              return description ?? '--- N/A ---';
            },
          },
          metadata: {
            merge: true,
          },
        },
      },
    },
  }),
});
