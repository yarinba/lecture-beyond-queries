# Beyond Queries: Apollo Client as a State Management Solution

This repository contains a demonstration of how to use Apollo Client as a comprehensive state management solution for React applications. It showcases various techniques for configuring and interacting with the Apollo cache, going beyond simple GraphQL queries.

## Repository Structure

- **demo/**: Contains the main application code
  - **apps/fe/**: Frontend React application
  - **apps/be/**: Backend NestJS GraphQL server
- **slidev/**: Contains presentation slides

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/lecture-beyond-queries.git
   cd lecture-beyond-queries
   ```

2. Install dependencies:
   ```bash
   cd demo
   npm install
   ```

### Running the Application

Start both the frontend and backend servers:

```bash
npm run start
```

This will start:

- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- GraphQL Playground: http://localhost:3000/graphql

## Demo Branches

This repository contains several branches that demonstrate different aspects of Apollo Client's cache management capabilities. Each branch builds upon the previous one, showing a progressive implementation of advanced Apollo Client features.

### 1. Key Fields Configuration (`01-keyFields`)

Demonstrates how to configure the Apollo Client cache to use custom key fields for entity identification.

```javascript
cache: new InMemoryCache({
  typePolicies: {
    Product: {
      keyFields: ['sku'],
    },
  },
}),
```

### 2. Field Read Functions (`02-field-read-default-value`)

Shows how to use field read functions to provide default values for nullable fields.

```javascript
fields: {
  description: {
    read(description) {
      return description ?? '--- N/A ---';
    },
  },
},
```

### 3. Field Merge Policies (`03-field-merge`)

Demonstrates how to configure merge policies for nested objects in the cache.

```javascript
metadata: {
  merge: true,
},
```

### 4. Cache Redirects (`04-cache-redirect`)

Shows how to implement cache redirects to resolve individual entities from lists without additional network requests.

```javascript
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
```

### 5. Cache Modification (`05-cache.modify`)

Demonstrates how to manually modify the cache after mutations instead of refetching data.

```javascript
update: (cache, { data }) => {
  if (!data) return;

  const newProduct = cache.writeFragment({
    id: cache.identify(data.createProduct),
    fragment: ProductFieldsFragmentDoc,
    data: data.createProduct,
  });

  cache.modify({
    fields: {
      products: (existingProducts) => [...existingProducts, newProduct],
    },
  });
},
```

### 6. Optimistic Responses (`06-optimistic-response`)

Shows how to implement optimistic UI updates for mutations before the server responds.

```javascript
optimisticResponse: {
  createProduct: {
    __typename: 'Product',
    sku: input.sku,
    name: input.name,
    // ... other fields
  },
},
```

### 7. Cache Eviction (`07-cache.evict`)

Demonstrates how to remove items from the cache after deletion operations.

```javascript
update: (cache) => {
  cache.evict({ id: cache.identify(product) });
},
```

### 8. Local State Management (`08-local-state`)

Shows how to use Apollo Client for managing local state with reactive variables.

```javascript
// Define reactive variables
export const cartItemsVar = makeVar<CartItem[]>([]);

// Use in field policies
isInCart: {
  read(_, { readField }) {
    const sku = readField('sku');
    if (typeof sku !== 'string') return false;
    return cartItemsVar().some((item) => item.sku === sku);
  },
},
```

## Application Features

The demo application is an inventory management system with the following features:

- Product listing and management
- Marketplace management
- Product search
- Shopping cart functionality (in the local state branch)

## Technologies Used

- **Frontend**:

  - React
  - Apollo Client
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Backend**:

  - NestJS
  - GraphQL
  - MongoDB (via Mongoose)

- **Development Tools**:
  - GraphQL Code Generator
  - NX Monorepo
  - Vite

## Learning Objectives

By exploring this repository, you will learn:

1. How to configure Apollo Client's cache for optimal performance
2. Advanced cache manipulation techniques
3. How to use Apollo Client as a complete state management solution
4. Best practices for GraphQL operations in React applications
5. How to implement optimistic UI updates for better user experience
