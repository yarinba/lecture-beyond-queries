---
layout: default
---

# Interact with Cache

Apollo Client supports multiple strategies for interacting with cached data

<div v-click v-click.hide="1"
  style="position: absolute;"
  v-motion
  :initial="{ opacity: 0, y: 100 }"
  :enter="{ opacity: 1, y: 0 }"
  :leave="{ opacity: 0, y: -100 }">

| Strategy                         | API                                                                 |
| -------------------------------- | ------------------------------------------------------------------- |
| Using GraphQL queries            | `readQuery` / `writeQuery` / `updateQuery`                          |
| Using GraphQL fragments          | `readFragment` / `writeFragment` / `updateFragment` / `useFragment` |
| Directly modifying cached fields | `cache.modify`                                                      |

</div>

<div v-click 
  style="position: absolute;"
  v-motion
  :initial="{ opacity: 0, y: 100 }"
  :enter="{ opacity: 1, y: 0 }">

| Behavior                              | `writeQuery`<br/>`writeFragment` | `modify`                                     |
| ------------------------------------- | -------------------------------- | -------------------------------------------- |
| Triggers refresh of dependent queries | ✅                               | ✅ (unless `broadcast: false`)               |
| Respects merge functions              | ✅                               | ❌ (always overwrites with specified values) |
| Can write non-existent fields         | ✅                               | ❌ (can only modify existing fields)         |

</div>
