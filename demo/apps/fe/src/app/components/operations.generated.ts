import * as Types from '@demo/types';

import { gql } from '@apollo/client';
import { ProductFieldsFragmentDoc } from './fragments.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarketplacesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MarketplacesQuery = { __typename?: 'Query', marketplaces: Array<{ __typename?: 'Marketplace', _id: string, name: string }> };

export type ProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', sku: string, name: string, price: number, description?: string | null, isInCart?: boolean | null, metadata: { __typename?: 'ProductMetadata', hasWarranty: boolean, tags: Array<string> }, marketplace: { __typename?: 'Marketplace', _id: string, name: string } }> };

export type CreateProductMutationVariables = Types.Exact<{
  sku: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  price: Types.Scalars['Float']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  marketplaceId: Types.Scalars['String']['input'];
  hasWarranty: Types.Scalars['Boolean']['input'];
  tags: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', sku: string, name: string, price: number, description?: string | null, isInCart?: boolean | null, metadata: { __typename?: 'ProductMetadata', hasWarranty: boolean, tags: Array<string> }, marketplace: { __typename?: 'Marketplace', _id: string, name: string } } };

export type UpdateProductNameMutationVariables = Types.Exact<{
  sku: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
}>;


export type UpdateProductNameMutation = { __typename?: 'Mutation', updateProductName: { __typename?: 'Product', sku: string, name: string } };

export type DeleteProductMutationVariables = Types.Exact<{
  sku: Types.Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };


export const MarketplacesDocument = gql`
    query Marketplaces {
  marketplaces {
    _id
    name
  }
}
    `;

/**
 * __useMarketplacesQuery__
 *
 * To run a query within a React component, call `useMarketplacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketplacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketplacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketplacesQuery(baseOptions?: Apollo.QueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
      }
export function useMarketplacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
        }
export function useMarketplacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MarketplacesQuery, MarketplacesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MarketplacesQuery, MarketplacesQueryVariables>(MarketplacesDocument, options);
        }
export type MarketplacesQueryHookResult = ReturnType<typeof useMarketplacesQuery>;
export type MarketplacesLazyQueryHookResult = ReturnType<typeof useMarketplacesLazyQuery>;
export type MarketplacesSuspenseQueryHookResult = ReturnType<typeof useMarketplacesSuspenseQuery>;
export type MarketplacesQueryResult = Apollo.QueryResult<MarketplacesQuery, MarketplacesQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($sku: String!, $name: String!, $price: Float!, $description: String, $marketplaceId: String!, $hasWarranty: Boolean!, $tags: [String!]!) {
  createProduct(
    sku: $sku
    name: $name
    price: $price
    description: $description
    marketplaceId: $marketplaceId
    hasWarranty: $hasWarranty
    tags: $tags
  ) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      sku: // value for 'sku'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      marketplaceId: // value for 'marketplaceId'
 *      hasWarranty: // value for 'hasWarranty'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductNameDocument = gql`
    mutation UpdateProductName($sku: String!, $name: String!) {
  updateProductName(sku: $sku, name: $name) {
    sku
    name
  }
}
    `;
export type UpdateProductNameMutationFn = Apollo.MutationFunction<UpdateProductNameMutation, UpdateProductNameMutationVariables>;

/**
 * __useUpdateProductNameMutation__
 *
 * To run a mutation, you first call `useUpdateProductNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductNameMutation, { data, loading, error }] = useUpdateProductNameMutation({
 *   variables: {
 *      sku: // value for 'sku'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProductNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductNameMutation, UpdateProductNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductNameMutation, UpdateProductNameMutationVariables>(UpdateProductNameDocument, options);
      }
export type UpdateProductNameMutationHookResult = ReturnType<typeof useUpdateProductNameMutation>;
export type UpdateProductNameMutationResult = Apollo.MutationResult<UpdateProductNameMutation>;
export type UpdateProductNameMutationOptions = Apollo.BaseMutationOptions<UpdateProductNameMutation, UpdateProductNameMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($sku: String!) {
  deleteProduct(sku: $sku)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      sku: // value for 'sku'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;