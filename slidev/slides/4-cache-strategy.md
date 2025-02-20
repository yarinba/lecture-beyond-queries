---
layout: default
---

# `cache-first`

<div class="flex justify-between mt-10">

<div v-click>

```mermaid {scale: 0.6}
sequenceDiagram
    participant ApolloClient
    participant InMemoryCache
    participant GraphQLServer

    ApolloClient->>InMemoryCache: GetBook(bookId: "5")
    Note over InMemoryCache: Book:5 not found in cache
    InMemoryCache->>GraphQLServer: Query sent to server
    GraphQLServer-->>InMemoryCache: Server responds with Book
    Note over InMemoryCache: Book:5 is cached
    InMemoryCache-->>ApolloClient: Returns Book

```

</div>

<div style="border-left:1px solid #1B1B1B;"></div>

<div v-click>

```mermaid {scale: 0.6}
sequenceDiagram
    participant ApolloClient
    participant InMemoryCache
    participant GraphQLServer

    ApolloClient->>InMemoryCache: GetBook(bookId: "5")
    Note over InMemoryCache: Book:5 found in cache!
    InMemoryCache-->>ApolloClient: Returns Book
    Note over GraphQLServer: (Server is never queried)

```

</div>

</div>

<!--
- Apollo Client isn’t just a remote data fetcher—it’s a state management tool.
- Explain how to leverage such capabilities in pointfive, for example fetch user instead of zustand `useAuth` hook
-->
