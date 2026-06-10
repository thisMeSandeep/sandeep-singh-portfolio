---
intro: "A personal finance app that answers one question well: where did the money actually go this month?"
---

## The idea

Most budgeting apps drown you in dashboards before you've understood a single
transaction. **Fundly** aims for the opposite — a fast, honest view of your money
with categories that make sense and totals you can trust. Connect your accounts,
let transactions flow in, and get a clear monthly picture without manually tagging
every coffee.

---

## The challenge

Personal finance data is unforgiving. Numbers have to be **exactly right** — a
rounding error or a double-counted transfer destroys trust instantly. And the data
arrives messy: duplicate transactions, transfers that look like spending, and
merchant names like `SQ *COFFEE 0291` that mean nothing to a human.

So the real work was a backend that ingested noisy data and produced clean,
reliable, fast aggregates — and could be run and deployed without ceremony.

---

## The approach

Fundly's API is built on **Hono** running on Node.js, chosen for its tiny
footprint and straightforward routing, with PostgreSQL for durable storage and
Docker so the whole service runs identically on my laptop and in production.

### Categorisation that degrades gracefully

Transactions are categorised by a rules pipeline first, falling back to "uncategorised"
rather than guessing wrong — a wrong category is worse than a missing one.

```ts
const rules: CategoryRule[] = [
  { match: /uber|lyft|metro/i, category: "Transport" },
  { match: /coffee|cafe|starbucks/i, category: "Food & Drink" },
  { match: /netflix|spotify|prime/i, category: "Subscriptions" },
];

function categorise(merchant: string): string {
  return rules.find((r) => r.match.test(merchant))?.category ?? "Uncategorised";
}
```

### Getting the money math right

Two decisions kept the numbers honest:

- **Store amounts as integer cents**, never floats — no `0.1 + 0.2` surprises.
- **Detect transfers** between a user's own accounts and exclude them from spending
  totals, so moving money never looks like losing it.

Monthly summaries are computed with indexed aggregate queries, so the headline
view stays fast even as history grows:

```sql
SELECT category, SUM(amount_cents) AS total
FROM transactions
WHERE user_id = $1
  AND posted_at >= date_trunc('month', now())
  AND is_transfer = false
GROUP BY category
ORDER BY total DESC;
```

### Built to run anywhere

A small Hono service plus a `docker compose up` meant zero "works on my machine"
drift. The container holds the API; Postgres is a sibling service. Deploy is the
same command everywhere.

---

## The outcome

Fundly produces a monthly picture you can actually believe: spending grouped by
sensible categories, transfers excluded, and totals computed to the cent. The Hono
+ Docker stack keeps the service light enough to run on a small box and simple
enough to reason about end to end.

---

## What I learned

- **In finance, correctness is the feature.** Integer cents and transfer detection
  did more for trust than any chart.
- **A wrong default is worse than a blank one.** Falling back to "uncategorised"
  beat confidently mis-tagging.
- **Keep the deployment story boring.** A tiny service and one Docker command made
  iterating painless.
