import * as Types from '@demo/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarketplacesPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MarketplacesPageQuery = { __typename?: 'Query', marketplaces: Array<{ __typename?: 'Marketplace', _id: string, name: string }> };

export type CreateMarketplaceMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type CreateMarketplaceMutation = { __typename?: 'Mutation', createMarketplace: { __typename?: 'Marketplace', _id: string, name: string } };

export type RemoveMarketplaceMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RemoveMarketplaceMutation = { __typename?: 'Mutation', removeMarketplace: { __typename?: 'Marketplace', _id: string } };


export const MarketplacesPageDocument = gql`
    query MarketplacesPage {
  marketplaces {
    _id
    name
  }
}
    `;

/**
 * __useMarketplacesPageQuery__
 *
 * To run a query within a React component, call `useMarketplacesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketplacesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketplacesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketplacesPageQuery(baseOptions?: Apollo.QueryHookOptions<MarketplacesPageQuery, MarketplacesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketplacesPageQuery, MarketplacesPageQueryVariables>(MarketplacesPageDocument, options);
      }
export function useMarketplacesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketplacesPageQuery, MarketplacesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketplacesPageQuery, MarketplacesPageQueryVariables>(MarketplacesPageDocument, options);
        }
export function useMarketplacesPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MarketplacesPageQuery, MarketplacesPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MarketplacesPageQuery, MarketplacesPageQueryVariables>(MarketplacesPageDocument, options);
        }
export type MarketplacesPageQueryHookResult = ReturnType<typeof useMarketplacesPageQuery>;
export type MarketplacesPageLazyQueryHookResult = ReturnType<typeof useMarketplacesPageLazyQuery>;
export type MarketplacesPageSuspenseQueryHookResult = ReturnType<typeof useMarketplacesPageSuspenseQuery>;
export type MarketplacesPageQueryResult = Apollo.QueryResult<MarketplacesPageQuery, MarketplacesPageQueryVariables>;
export const CreateMarketplaceDocument = gql`
    mutation CreateMarketplace($name: String!) {
  createMarketplace(name: $name) {
    _id
    name
  }
}
    `;
export type CreateMarketplaceMutationFn = Apollo.MutationFunction<CreateMarketplaceMutation, CreateMarketplaceMutationVariables>;

/**
 * __useCreateMarketplaceMutation__
 *
 * To run a mutation, you first call `useCreateMarketplaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMarketplaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMarketplaceMutation, { data, loading, error }] = useCreateMarketplaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMarketplaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateMarketplaceMutation, CreateMarketplaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMarketplaceMutation, CreateMarketplaceMutationVariables>(CreateMarketplaceDocument, options);
      }
export type CreateMarketplaceMutationHookResult = ReturnType<typeof useCreateMarketplaceMutation>;
export type CreateMarketplaceMutationResult = Apollo.MutationResult<CreateMarketplaceMutation>;
export type CreateMarketplaceMutationOptions = Apollo.BaseMutationOptions<CreateMarketplaceMutation, CreateMarketplaceMutationVariables>;
export const RemoveMarketplaceDocument = gql`
    mutation RemoveMarketplace($id: ID!) {
  removeMarketplace(id: $id) {
    _id
  }
}
    `;
export type RemoveMarketplaceMutationFn = Apollo.MutationFunction<RemoveMarketplaceMutation, RemoveMarketplaceMutationVariables>;

/**
 * __useRemoveMarketplaceMutation__
 *
 * To run a mutation, you first call `useRemoveMarketplaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMarketplaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMarketplaceMutation, { data, loading, error }] = useRemoveMarketplaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMarketplaceMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMarketplaceMutation, RemoveMarketplaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMarketplaceMutation, RemoveMarketplaceMutationVariables>(RemoveMarketplaceDocument, options);
      }
export type RemoveMarketplaceMutationHookResult = ReturnType<typeof useRemoveMarketplaceMutation>;
export type RemoveMarketplaceMutationResult = Apollo.MutationResult<RemoveMarketplaceMutation>;
export type RemoveMarketplaceMutationOptions = Apollo.BaseMutationOptions<RemoveMarketplaceMutation, RemoveMarketplaceMutationVariables>;