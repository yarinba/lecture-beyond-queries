---
layout: default
---

# Behind the Scenes: Apollo Cache Mechanics

<div class="flex justify-between mt-5">

<div class="flex flex-col gap-4">

<div>

### Identify Objects

<div v-click="1">

- **Person** with `id: cGVvcGxlOjE=`
- **Planet** with `id: cGxhbmV0czox`

</div>
</div>

<div>

### Generate Cache IDs

<div v-click="2">

- `Person:cGVvcGxlOjE=`
- `Planet:cGxhbmV0czox`

</div>
</div>

<div>

### Replace Object Fields with References

<div v-click="3" class="max-w-min">
```json
"homeworld": { "__ref": "Planet:cGxhbmV0czox" }
```
</div>

</div>

<div>

### Store Normalized Objects

<div v-click="4">

- Objects are stored in a flat lookup table
- What happens if an object with the same cache ID exists?
  <!-- - shared fields are overwritten, unique fields are preserved -->

</div>
</div>
</div>

<div>

````md magic-move
```json {*|4-5,8-9|4-5,8-9|none}
{
  "data": {
    "person": {
      "__typename": "Person",
      "id": "cGVvcGxlOjE=",
      "name": "Luke Skywalker",
      "homeworld": {
        "__typename": "Planet",
        "id": "cGxhbmV0czox",
        "name": "Tatooine"
      }
    }
  }
}
```

```json
{
  "ROOT_QUERY": {
    "person": {
      "__ref": "Person:cGVvcGxlOjE="
    }
  },
  "Person:cGVvcGxlOjE=": {
    "__typename": "Person",
    "id": "cGVvcGxlOjE=",
    "name": "Luke Skywalker",
    "homeworld": {
      "__ref": "Planet:cGxhbmV0czox"
    }
  },
  "Planet:cGxhbmV0czox": {
    "__typename": "Planet",
    "id": "cGxhbmV0czox",
    "name": "Tatooine"
  }
}
```
````

</div>

</div>

<!--
- Normalization can dramatically reduce data duplication, and it also helps your local data stay up to date with your server.

- Note: Some cases will lead to non-flat structures, when? 

### Conflict Resolution:
What happens when incoming and existing objects share the same cache ID.

### Merge Strategy:
How and why you might need to override merge functionality.

### Practical Tip:
Always ensure that mutations return the updated object.

- Visualize the cache using Apollo DevTools.
-->
