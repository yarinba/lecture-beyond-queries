export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Marketplace = {
  __typename?: 'Marketplace';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMarketplace: Marketplace;
  createProduct: Product;
  deleteProduct: Scalars['Boolean']['output'];
  removeMarketplace: Marketplace;
};


export type MutationCreateMarketplaceArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasWarranty: Scalars['Boolean']['input'];
  marketplaceId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sku: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};


export type MutationDeleteProductArgs = {
  sku: Scalars['String']['input'];
};


export type MutationRemoveMarketplaceArgs = {
  id: Scalars['ID']['input'];
};

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']['output']>;
  marketplace: Marketplace;
  metadata: ProductMetadata;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
};

export type ProductMetadata = {
  __typename?: 'ProductMetadata';
  hasWarranty: Scalars['Boolean']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  marketplace: Marketplace;
  marketplaces: Array<Marketplace>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryMarketplaceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  sku: Scalars['String']['input'];
};
