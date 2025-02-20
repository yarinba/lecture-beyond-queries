---
layout: default
---

# UI State vs. Server State

<div class="grid grid-cols-2 gap-4 mt-10">
<div class="p-4">

## Client State

- **Ephemeral & Local:** Stored in browser
- **Synchronous Updates:** Immediate changes
- **Browser-based:** Resets on reload
- **Examples:** Dark mode, filters, form state

</div>
<div class="p-4">

## Server State

- **Persistent & Remote:** Stored on server
- **Asynchronous:** Network-dependent
- **Shared Ownership:** External changes
- **Challenge:** Data freshness

</div>
</div>

<style>
.grid {
  margin-top: 2rem;
}
</style>
