---
title: "Building Optimistic UI in React Without a Library"
excerpt: "How I made task updates feel instant in TrackFlow — and what happens when the server disagrees with your optimism."
publishedDate: 2024-08-14
readTime: 6
category: "Frontend"
tags: ["React", "TypeScript", "UX Patterns"]
cover: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80"
featured: true
---

## The problem

Waiting for the server before updating the UI makes an app feel sluggish, even
when the request is fast. **Optimistic UI** flips that: we update the screen
first and reconcile with the server afterward. You can read more in the
[React docs on state](https://react.dev/learn/state-a-components-memory).

### A simple approach

The pattern is small enough that you rarely need a library:

1. Apply the change to local state immediately.
2. Fire the request in the background.
3. Roll back if the server rejects it.

Things to keep in mind along the way:

- Keep a snapshot of the previous state for rollback.
- Disable conflicting actions while a write is in flight.
- Surface failures without blaming the user.

---

### A bit of code

Here's the core of the optimistic update, using `useState`:

```tsx
function useOptimisticToggle(initial: boolean, persist: (v: boolean) => Promise<void>) {
  const [value, setValue] = useState(initial);

  async function toggle() {
    const previous = value;
    setValue(!value); // optimistic
    try {
      await persist(!value);
    } catch {
      setValue(previous); // rollback
    }
  }

  return { value, toggle };
}
```

> The hard part isn't the happy path — it's deciding what to do when the server
> disagrees with your optimism.

### When to use which strategy

| Scenario          | Strategy            | Rollback cost |
| ----------------- | ------------------- | ------------- |
| Toggle a flag     | Optimistic          | Low           |
| Create a resource | Optimistic + temp id | Medium        |
| Payment / billing | Pessimistic         | High          |

![Diagram of an optimistic update flow](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80)

That's the gist — start optimistic where rollback is cheap, stay pessimistic
where it isn't.
