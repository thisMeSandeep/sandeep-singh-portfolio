---
intro: "What if booking a venue worked like a reverse auction — you describe your event once, and venues compete to host it?"
---

## The idea

Booking a venue is one of the most frustrating parts of planning any event. You
fill in the same enquiry form a dozen times, wait days for replies, and still end
up comparing quotes that are impossible to line up side by side. **EventBid flips
that dynamic.** The host posts an event brief once; verified venues see it and
submit competitive bids. The host picks the best fit on price, location, and fit —
not on who happened to reply first.

> The goal was never "another listings directory." It was to make venues work for
> the booking, instead of the other way around.

---

## The challenge

The hard part of a two-sided marketplace is the cold start. A bidding platform is
worthless to hosts with no venues, and worthless to venues with no events. On top
of that, the bidding flow itself has to feel **fair and transparent** — a venue
needs to trust that bids aren't being leaked to competitors, and a host needs to
trust that bids are real.

Three problems drove most of the design:

1. **Trust** — preventing fake bids and unverified venues.
2. **Clarity** — making heterogeneous bids comparable at a glance.
3. **Timing** — keeping bidding windows lively without pressuring anyone.

---

## The approach

I built EventBid as a React + TypeScript front end over a Node.js API, with
PostgreSQL holding the relational core: hosts, events, venues, and bids all
reference each other, so a query like "all open bids on this event, newest first"
stays a single clean join.

### Modelling the bid lifecycle

Every bid moves through an explicit state machine rather than a loose `status`
string. That made the rules enforceable in one place:

```ts
type BidStatus = "submitted" | "shortlisted" | "accepted" | "declined" | "expired";

const allowedTransitions: Record<BidStatus, BidStatus[]> = {
  submitted: ["shortlisted", "declined", "expired"],
  shortlisted: ["accepted", "declined", "expired"],
  accepted: [],
  declined: [],
  expired: [],
};
```

Once a bid is `accepted`, every other bid on that event is transitioned to
`declined` inside the same database transaction — so an event can never have two
winners.

### Keeping bids comparable

Venues bid with free-form packages, so I normalised every bid into the same
shape before showing it to the host: a headline price, an all-in price, capacity,
and a short list of inclusions. The comparison view then becomes a simple table.

| Venue | Headline | All-in | Capacity |
|---|---|---|---|
| The Loft | $2,400 | $2,850 | 120 |
| Garden Hall | $2,100 | $2,990 | 90 |
| Riverside | $2,600 | $2,600 | 150 |

Surfacing the **all-in** price next to the headline killed the most common
complaint: quotes that look cheap until the service fees show up.

---

## The outcome

EventBid turns a week of back-and-forth into a single brief and a clean shortlist.
Hosts compare real, normalised offers; venues compete on value instead of
response speed. The state machine and transactional accept flow mean the data is
trustworthy enough to build reputation and reviews on top of later.

---

## What I learned

- **Marketplaces live or die on trust mechanics**, not features. Verification and
  a fair bidding flow mattered more than any single screen.
- **An explicit state machine pays for itself.** Every "can this happen?" question
  had one answer, in one file.
- **Normalising user-generated offers** is where the real product value hides —
  comparison is the feature, the listing is just the input.
