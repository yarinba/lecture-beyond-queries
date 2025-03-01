import * as Types from '@demo/types';

import { gql } from '@apollo/client';
export type ProductFieldsFragment = { __typename?: 'Product', sku: string, name: string, price: number, description?: string | null, isInCart?: boolean | null, metadata: { __typename?: 'ProductMetadata', hasWarranty: boolean, tags: Array<string> }, marketplace: { __typename?: 'Marketplace', _id: string, name: string } };

export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  sku
  name
  price
  description
  metadata {
    hasWarranty
    tags
  }
  marketplace {
    _id
    name
  }
  isInCart @client
}
    `;