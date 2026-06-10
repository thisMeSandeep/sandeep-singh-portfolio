---
intro: "A browser-based design tool where the document is just SVG — so what you draw is exactly what you can export, inspect, and ship."
---

## The idea

Vector design tools tend to hide the format they produce. **Forma** makes SVG the
first-class citizen: every shape on the canvas is a real SVG node, the document
*is* the export, and there's no lossy translation step between "what I drew" and
"what I shipped." For developers especially, that means the thing you design is the
thing you can drop straight into code.

---

## The challenge

A design tool fails the moment it feels heavy. Dragging a handle, nudging a node,
zooming a complex illustration — all of it has to stay at 60fps even with hundreds
of elements on the canvas. The challenge was building an editor that is **simple to
use and genuinely performant**, while keeping a clean, exportable SVG as the
underlying model the whole time.

The second challenge was persistence and collaboration-readiness: storing vector
documents in a way that's compact, queryable, and safe to evolve.

---

## The approach

Forma's front end is **Next.js + TypeScript**, with a **FastAPI** service handling
document persistence and heavier processing, and PostgreSQL storing documents and
versions. Next.js gave me a fast, file-routed app shell; FastAPI gave the backend
a typed, quick-to-build API surface.

### Keeping the canvas fast

The performance trick was separating *interaction* from *commit*. While you drag,
the element transforms via cheap CSS/transform updates and never touches React
state on every mouse move. State — and a history entry — is committed only on
release:

```ts
function onPointerMove(e: PointerEvent) {
  // Live: mutate the transform directly, no re-render, no history
  el.style.transform = `translate(${dx}px, ${dy}px)`;
}

function onPointerUp() {
  // Commit once: update the document model + push one undo entry
  commit(updateNode(id, { x: x + dx, y: y + dy }));
}
```

This one decision is what keeps dragging smooth on a dense canvas — re-rendering on
every pixel of movement is what makes naive editors stutter.

### SVG as the source of truth

There's no separate internal format to keep in sync. The document model serialises
directly to SVG, so export is essentially a no-op and "view source" on a design is
always meaningful.

### Versioned documents

Each save writes an immutable version row, so history is durable and a future
collaboration layer has a clean foundation to diff against:

| Column | Purpose |
|---|---|
| `document_id` | the design being edited |
| `version` | monotonic, one per save |
| `svg` | the serialised document |
| `created_at` | for history + restore |

---

## The outcome

Forma is a design tool that stays fast under real load and never lies about its
output — what you draw is exactly the SVG you export. The commit-on-release model
keeps interactions smooth, and versioned storage means nothing is ever lost and a
collaborative future stays open.

---

## What I learned

- **Separate interaction from state.** Live transforms during a gesture and a
  single commit at the end is the whole performance story.
- **Picking the right source of truth removes entire classes of bugs.** With SVG as
  the model, export and inspection came almost for free.
- **Version on every save.** Immutable history is cheap to add early and expensive
  to retrofit later.
