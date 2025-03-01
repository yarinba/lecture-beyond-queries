import * as Types from '@demo/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductBySkuQueryVariables = Types.Exact<{
  sku: Types.Scalars['String']['input'];
}>;


export type ProductBySkuQuery = { __typename?: 'Query', product?: { __typename?: 'Product', sku: string, name: string, price: number, description?: string | null, metadata: { __typename?: 'ProductMetadata', hasWarranty: boolean }, marketplace: { __typename?: 'Marketplace', _id: string, name: string } } | null };


export const ProductBySkuDocument = gql`
    query ProductBySku($sku: String!) {
  product(sku: $sku) {
    sku
    name
    price
    description
    metadata {
      hasWarranty
    }
    marketplace {
      _id
      name
    }
  }
}
    `;

/**
 * __useProductBySkuQuery__
 *
 * To run a query within a React component, call `useProductBySkuQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductBySkuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductBySkuQuery({
 *   variables: {
 *      sku: // value for 'sku'
 *   },
 * });
 */
export function useProductBySkuQuery(baseOptions: Apollo.QueryHookOptions<ProductBySkuQuery, ProductBySkuQueryVariables> & ({ variables: ProductBySkuQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductBySkuQuery, ProductBySkuQueryVariables>(ProductBySkuDocument, options);
      }
export function useProductBySkuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductBySkuQuery, ProductBySkuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductBySkuQuery, ProductBySkuQueryVariables>(ProductBySkuDocument, options);
        }
export function useProductBySkuSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductBySkuQuery, ProductBySkuQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductBySkuQuery, ProductBySkuQueryVariables>(ProductBySkuDocument, options);
        }
export type ProductBySkuQueryHookResult = ReturnType<typeof useProductBySkuQuery>;
export type ProductBySkuLazyQueryHookResult = ReturnType<typeof useProductBySkuLazyQuery>;
export type ProductBySkuSuspenseQueryHookResult = ReturnType<typeof useProductBySkuSuspenseQuery>;
export type ProductBySkuQueryResult = Apollo.QueryResult<ProductBySkuQuery, ProductBySkuQueryVariables>;