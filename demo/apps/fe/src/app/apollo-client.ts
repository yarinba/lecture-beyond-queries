import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

// Define the cart item type
export interface CartItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

// Create reactive variables
export const cartItemsVar = makeVar<CartItem[]>([]);

// Create the Apollo client
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
          isInCart: {
            read(_, { readField }) {
              const sku = readField('sku');
              if (typeof sku !== 'string') return false;
              return cartItemsVar().some((item) => item.sku === sku);
            },
          },
        },
      },
    },
  }),
});
