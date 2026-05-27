---
title: "Designing REST APIs That Age Well"
excerpt: "Versioning, pagination, and the small naming decisions that quietly decide whether your API is a joy or a chore."
publishedDate: 2024-11-20
readTime: 12
category: "Backend"
tags: ["Node.js", "API Design", "PostgreSQL"]
cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
featured: false
---

## APIs are contracts

Every endpoint you ship is a promise to every client that calls it. The moment a mobile app, a third-party integration, or a teammate's frontend depends on your response shape, you've entered a contract. Break that contract — rename a field, drop a property, change a type — and you break their code.

The goal of good API design isn't elegance for its own sake. It's **stability under change**. You will add features. You will fix mistakes. The question is whether you can do both without calling everyone who depends on you.

This post is about the decisions that look small in week one but quietly determine whether your API is a joy to work with two years later.

---

## Naming: the contract nobody talks about

Naming is the first thing consumers see and the last thing engineers think about. A few principles that age well:

### Use nouns for resources, not verbs

Your URLs should identify *things*, not *actions*. HTTP methods already carry the verb.

| ❌ Avoid | ✅ Prefer |
|---|---|
| `POST /createUser` | `POST /users` |
| `GET /getUserById?id=42` | `GET /users/42` |
| `POST /deletePost` | `DELETE /posts/42` |
| `GET /fetchAllOrders` | `GET /orders` |

### Be consistent with case

Pick one casing convention and never deviate. `snake_case` is the most common in JSON bodies; `kebab-case` is standard in URL paths.

```json
// ✅ Consistent snake_case in response body
{
  "user_id": "u_01abc",
  "first_name": "Sandeep",
  "created_at": "2024-11-20T10:30:00Z",
  "is_active": true
}
```

```json
// ❌ Mixed casing — a maintenance nightmare
{
  "userId": "u_01abc",
  "FirstName": "Sandeep",
  "created_at": "2024-11-20T10:30:00Z",
  "isActive": true
}
```

### Plural resource names, always

Use `/users`, not `/user`. Use `/orders`, not `/order`. Consistent pluralization makes route patterns predictable without needing to memorize exceptions.

### Nest only when ownership is clear

```
GET /users/42/orders          ✅ Orders belonging to a user
GET /orders/99/items          ✅ Items within an order

GET /users/42/orders/99/items/1   ❌ Too deep — surface /items as its own resource
```

A good rule: if nesting goes deeper than two levels, the child resource probably deserves its own top-level endpoint.

---

## Versioning: a story you need before you need it

The worst time to design your versioning strategy is after a breaking change. Here are the three main approaches and when each makes sense.

### Approach 1: URL versioning

```
GET /v1/users/42
GET /v2/users/42
```

**Pros:** Explicit, cache-friendly, easy to test in a browser. The most common choice for public APIs.

**Cons:** Feels redundant in URLs. Teams sometimes forget to bump the version.

### Approach 2: Header versioning

```http
GET /users/42
Accept: application/vnd.myapi.v2+json
```

**Pros:** Clean URLs. Theoretically "more RESTful."

**Cons:** Hard to test without tooling. Not visible in browser address bar. Adds friction for new consumers.

### Approach 3: Query parameter versioning

```
GET /users/42?version=2
```

**Pros:** Easy to test.

**Cons:** Easy to forget. Query params are for filtering, not API contracts.

### The recommendation

For most teams, **URL versioning wins** on practicality. Here's a minimal Express setup:

```js
// routes/v1/users.js
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json({
    id: user.id,
    name: user.name,           // v1 shape
    email: user.email,
  });
});

module.exports = router;
```

```js
// routes/v2/users.js
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json({
    id: user.id,
    first_name: user.first_name,   // v2 — broken into first/last
    last_name: user.last_name,
    email: user.email,
    avatar_url: user.avatar_url,   // v2 — new field
  });
});

module.exports = router;
```

```js
// app.js
app.use('/v1/users', require('./routes/v1/users'));
app.use('/v2/users', require('./routes/v2/users'));
```

### What counts as a breaking change?

Not every change requires a version bump. Know the difference:

| Change | Breaking? |
|---|---|
| Adding a new optional field to a response | ✅ No |
| Adding a new optional query parameter | ✅ No |
| Renaming a field | ❌ Yes |
| Removing a field | ❌ Yes |
| Changing a field's type (`string` → `number`) | ❌ Yes |
| Changing HTTP method for an endpoint | ❌ Yes |
| Making an optional field required | ❌ Yes |

A useful rule: **consumers should be able to ignore fields they don't recognise**. If you add `middle_name` to a user object, a client that doesn't read it shouldn't break. Design your clients this way too.

---

## Pagination: decide on day one

Pagination is one of those things that feels optional until your `GET /orders` endpoint returns 80,000 records and takes 12 seconds. There are three patterns worth knowing.

### Offset pagination

The classic. Simple to implement, simple to understand.

```
GET /orders?page=3&limit=20
```

```js
// Express + PostgreSQL (pg)
router.get('/', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const page  = Math.max(parseInt(req.query.page)  || 1,  1);
  const offset = (page - 1) * limit;

  const [rows, countResult] = await Promise.all([
    db.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM orders'),
  ]);

  const total = parseInt(countResult.rows[0].count);

  res.json({
    data: rows.rows,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
      has_next: page * limit < total,
      has_prev: page > 1,
    },
  });
});
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 3,
    "limit": 20,
    "total": 843,
    "total_pages": 43,
    "has_next": true,
    "has_prev": true
  }
}
```

**Limitation:** If a record is inserted between page 2 and page 3 requests, records shift — a consumer might see a duplicate or skip one. For most use cases this is acceptable. For real-time data, use cursor pagination.

### Cursor pagination

Instead of a page number, the client sends back an opaque cursor (usually an encoded ID or timestamp) pointing to the last item it saw.

```
GET /orders?limit=20
GET /orders?limit=20&cursor=eyJpZCI6IDEwMjN9
```

```js
router.get('/', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  let cursorCondition = '';
  let params = [limit + 1]; // fetch one extra to detect has_next

  if (req.query.cursor) {
    const decoded = JSON.parse(Buffer.from(req.query.cursor, 'base64').toString());
    cursorCondition = `WHERE id < $2`;
    params.push(decoded.id);
  }

  const rows = await db.query(
    `SELECT * FROM orders ${cursorCondition} ORDER BY id DESC LIMIT $1`,
    params
  );

  const hasNext = rows.rows.length > limit;
  const data = hasNext ? rows.rows.slice(0, limit) : rows.rows;
  const nextCursor = hasNext
    ? Buffer.from(JSON.stringify({ id: data[data.length - 1].id })).toString('base64')
    : null;

  res.json({
    data,
    pagination: {
      has_next: hasNext,
      next_cursor: nextCursor,
    },
  });
});
```

**When to use cursor vs offset:**

| | Offset | Cursor |
|---|---|---|
| Real-time / frequently updated data | ❌ Prone to drift | ✅ Stable |
| "Jump to page 10" UI | ✅ Trivial | ❌ Must walk the cursor chain |
| Total count shown in UI | ✅ Easy | ❌ Expensive |
| Performance on large datasets | ❌ `OFFSET 50000` is slow | ✅ Indexed seek |
| Implementation complexity | Low | Medium |

---

## Response envelopes: wrap consistently

Every response — success or error — should have a predictable shape. Clients shouldn't need to inspect the HTTP status and then guess whether the body is the resource itself or an error object.

### Success

```json
{
  "data": {
    "id": "u_01abc",
    "first_name": "Sandeep",
    "email": "sandeep@example.com"
  },
  "meta": {
    "request_id": "req_9xKj2p"
  }
}
```

For lists:

```json
{
  "data": [...],
  "pagination": { ... },
  "meta": {
    "request_id": "req_9xKj2p"
  }
}
```

### Errors

This is where most APIs are laziest. A consistent error envelope saves hours of client-side debugging.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body failed validation.",
    "details": [
      { "field": "email", "issue": "Must be a valid email address." },
      { "field": "age",   "issue": "Must be a positive integer." }
    ],
    "request_id": "req_9xKj2p",
    "docs_url": "https://docs.yourapi.com/errors/VALIDATION_ERROR"
  }
}
```

A simple Express error-handling middleware to standardise this:

```js
// middleware/errorHandler.js
const ERROR_MAP = {
  ValidationError:    { status: 400, code: 'VALIDATION_ERROR' },
  UnauthorizedError:  { status: 401, code: 'UNAUTHORIZED' },
  NotFoundError:      { status: 404, code: 'NOT_FOUND' },
};

module.exports = function errorHandler(err, req, res, next) {
  const mapped = ERROR_MAP[err.name] || { status: 500, code: 'INTERNAL_ERROR' };

  res.status(mapped.status).json({
    error: {
      code:       mapped.code,
      message:    err.message || 'An unexpected error occurred.',
      details:    err.details || [],
      request_id: req.id,
    },
  });
};
```

### HTTP status codes — use them right

| Status | When to use |
|---|---|
| `200 OK` | Successful GET, PUT, PATCH |
| `201 Created` | Successful POST that creates a resource |
| `204 No Content` | Successful DELETE (no body needed) |
| `400 Bad Request` | Client sent invalid data |
| `401 Unauthorized` | Missing or invalid authentication |
| `403 Forbidden` | Authenticated but not permitted |
| `404 Not Found` | Resource doesn't exist |
| `409 Conflict` | State conflict (duplicate email, optimistic lock) |
| `422 Unprocessable Entity` | Syntactically valid but semantically wrong |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Something you didn't anticipate |

The rule: **never return 200 with an error in the body**. That's a lie to your client.

---

## Filtering, sorting, and searching

Design these query parameters consistently so consumers can predict them for any resource.

```
GET /orders?status=shipped
GET /orders?status=shipped,pending          # multi-value filter
GET /orders?created_after=2024-01-01
GET /orders?sort=created_at                 # ascending
GET /orders?sort=-created_at                # descending (leading minus)
GET /orders?sort=-created_at,total_amount   # multi-field sort
GET /orders?q=macbook                       # full-text search
GET /orders?fields=id,status,total_amount   # sparse fieldsets
```

```js
// A reusable query builder for PostgreSQL
function buildOrdersQuery(query) {
  const conditions = [];
  const params     = [];
  let   idx        = 1;

  if (query.status) {
    const statuses = query.status.split(',');
    conditions.push(`status = ANY($${idx++})`);
    params.push(statuses);
  }

  if (query.created_after) {
    conditions.push(`created_at >= $${idx++}`);
    params.push(new Date(query.created_after));
  }

  const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const sortField = (query.sort || 'created_at').replace(/^-/, '');
  const sortDir   = query.sort?.startsWith('-') ? 'DESC' : 'ASC';
  const safeSort  = ['created_at', 'total_amount', 'status'].includes(sortField)
    ? sortField
    : 'created_at';

  return {
    sql: `SELECT * FROM orders ${where} ORDER BY ${safeSort} ${sortDir}`,
    params,
  };
}
```

> **Security note:** Never interpolate sort field names directly from user input into SQL. Always whitelist against known column names, as shown above.

---

## Idempotency: making retries safe

Networks fail. Clients retry. Without idempotency, a retry on `POST /orders` creates two orders.

The pattern: accept an `Idempotency-Key` header. Store the result of the first request. Return the cached result for any repeat with the same key.

```js
const idempotencyStore = new Map(); // use Redis in production

router.post('/orders', async (req, res) => {
  const key = req.headers['idempotency-key'];

  if (key && idempotencyStore.has(key)) {
    const cached = idempotencyStore.get(key);
    return res.status(cached.status).json(cached.body);
  }

  const order = await db.orders.create(req.body);
  const response = { status: 201, body: { data: order } };

  if (key) {
    idempotencyStore.set(key, response);
    setTimeout(() => idempotencyStore.delete(key), 24 * 60 * 60 * 1000); // expire after 24h
  }

  res.status(201).json(response.body);
});
```

Clients generate the key (usually a UUID) and store it before the request:

```js
const { v4: uuidv4 } = require('uuid');

async function createOrder(payload) {
  const key = uuidv4();

  return fetch('/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': key,
    },
    body: JSON.stringify(payload),
  });
}
```

---

## Rate limiting

Rate limiting protects your service and signals to consumers when they're pushing too hard. Always return `Retry-After` and remaining quota in headers.

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 100,
  standardHeaders: true, // sends RateLimit-* headers
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please wait before retrying.',
        retry_after: Math.ceil(req.rateLimit.resetTime / 1000),
      },
    });
  },
});

app.use('/v1/', limiter);
```

Consumers should see these response headers on every request:

```
RateLimit-Limit: 100
RateLimit-Remaining: 73
RateLimit-Reset: 1700482800
```

---

## The deprecation playbook

Breaking changes will come. Give consumers a runway.

1. **Ship v2** alongside v1 — never take v1 down at the same time.
2. **Announce via headers** on every v1 response:

```js
router.use((req, res, next) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Sat, 01 Mar 2025 00:00:00 GMT');
  res.set('Link', '</v2/users>; rel="successor-version"');
  next();
});
```

3. **Email / changelog** — headers alone aren't enough. Reach out directly if you have consumer contact information.
4. **Monitor v1 traffic** to the day you plan to sunset. If it's still non-trivial, extend the deadline.
5. **Return 410 Gone** (not 404) after sunset, with a body pointing to v2.

---

## A checklist for every endpoint you ship

Before merging a new route, run through this:

- [ ] Resource noun is plural and lowercase
- [ ] URL uses `kebab-case`, body uses `snake_case`
- [ ] Correct HTTP method for the operation
- [ ] Correct success status code (`200`, `201`, or `204`)
- [ ] Error responses follow the standard envelope
- [ ] Pagination implemented for any list endpoint
- [ ] Filtering and sorting parameters follow the project convention
- [ ] No sensitive data (passwords, tokens, PII beyond what's needed) in the response
- [ ] New fields are additive — no existing fields removed or renamed
- [ ] Rate limiting applies to this route

---

## Closing thought

The APIs that age well aren't the ones with the cleverest designs. They're the ones built by engineers who respected their future selves — and their future consumers — enough to be consistent, explicit, and honest about what the contract is.

Pick your conventions. Write them down. Then hold the line.
