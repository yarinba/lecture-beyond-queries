---
layout: default
monacoTypesAdditionalPackages:
  - "@apollo/client"
---

```ts {monaco}
import { gql, useMutation } from "@apollo/client";

// Define the mutation for adding a comment
const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      content
      postId
    }
  }
`;

// Use the mutation with the update function
const [addComment] = useMutation(ADD_COMMENT, {
  update(cache, { data: { addComment } }) {
    cache.modify({
      fields: {
        comments(existingComments = []) {
          const newCommentRef = cache.writeFragment({
            data: addComment,
            fragment: gql`
              fragment NewComment on Comment {
                id
                content
                postId
              }
            `,
          });
          return [...existingComments, newCommentRef];
        },
      },
    });
  },
});

// Example usage of the mutation
addComment({
  variables: { postId: "1", content: "This is a new comment!" },
});
```
