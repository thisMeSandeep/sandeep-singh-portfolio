---
intro: "A freelance marketplace built mobile-first — because the people hiring and the people working are rarely at a desk when it matters."
---

## The idea

Most freelance platforms are built for the browser and grudgingly squeezed onto a
phone. **DevWork started on the phone.** Clients post a job from wherever they are,
developers get matched and respond in the moment, and the whole conversation —
brief, proposal, hire, delivery — happens in one place. The bet was that
responsiveness, not feature count, wins a marketplace where the best freelancers
get hired fast.

---

## The challenge

A marketplace app has to feel **instant even on a weak connection.** A developer
checking proposals on a commute can't wait on spinners, and a client shouldn't
lose a half-written job post because they walked into an elevator. That meant
local-first behaviour: the UI updates immediately and syncs in the background,
without the user ever thinking about it.

The second challenge was matching. Connecting clients to *skilled* developers means
the search has to understand skills, availability, and rate — not just keywords.

---

## The approach

DevWork is a React Native + TypeScript app sharing one codebase across iOS and
Android, backed by Firebase for auth, real-time data, and sync. Firebase let me
skip a custom backend for the early product and lean on its offline persistence,
which is exactly the behaviour the app needed at its core.

### Optimistic actions, background sync

Every write — sending a proposal, saving a job draft, accepting an offer — updates
local state first and reconciles with Firestore afterward:

```ts
async function sendProposal(jobId: string, proposal: Proposal) {
  // Show it immediately in the UI
  dispatch(addLocalProposal({ jobId, proposal, status: "pending" }));

  try {
    await firestore().collection("proposals").add({ jobId, ...proposal });
    dispatch(markProposalSynced(proposal.id));
  } catch {
    // Firestore queues writes offline; we just reflect that state honestly
    dispatch(markProposalQueued(proposal.id));
  }
}
```

The key UX decision was being **honest about sync state** without being noisy: a
small "queued" indicator, never a blocking error, so the user trusts that nothing
is lost.

### Matching on more than keywords

Profiles carry structured skills, availability, and a rate band. Job posts carry
the same dimensions, so matching is a ranked query rather than a text search —
a developer who matches the stack *and* the budget *and* is available ranks above
one who only matches on a keyword.

---

## The outcome

DevWork delivers a marketplace that stays usable on flights, commutes, and weak
networks — proposals send, drafts survive, and the feed stays responsive. The
shared React Native codebase kept iOS and Android in lockstep, and structured
matching surfaced genuinely relevant developers instead of a keyword soup.

---

## What I learned

- **Offline-first needs deliberate UX cues.** Users only trust background sync if
  the app quietly tells them the truth about it.
- **Lean on the platform early.** Firebase's offline persistence solved the hardest
  part before I'd have finished a custom backend.
- **Matching is a ranking problem, not a search problem.** Structuring profiles and
  jobs the same way made relevance almost fall out for free.
