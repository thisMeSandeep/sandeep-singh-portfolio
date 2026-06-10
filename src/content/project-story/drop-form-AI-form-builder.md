---
intro: "Describe the form you want in plain English. DropForm turns the sentence into a working, validated form you can ship in minutes."
---

## The idea

Form builders are either powerful and tedious, or simple and limiting. I wanted a
third option: **describe the form in a sentence and let AI assemble it.** Type
"a job application with name, email, a CV upload, and three screening questions,"
and DropForm produces a real, validated form — fields, types, validation rules,
and layout — ready to edit and publish.

---

## The challenge

LLMs are great at generating plausible structure and terrible at guaranteeing it.
A form definition has to be **valid every time**, or the renderer breaks. So the
core challenge wasn't the prompt — it was constraining the model's output to a
schema the rest of the app could trust, and recovering gracefully when it drifted.

There was also a UX tension: AI generation is magical the first time and annoying
the tenth, when you just want to nudge one field. The builder had to make the
generated form feel like *yours* to edit, not a black box.

---

## The approach

DropForm is a React + TypeScript front end with a Node.js service that brokers the
AI calls and persists forms to PostgreSQL. The whole system is organised around a
single source of truth: a typed form schema.

### A schema the AI must fill, not invent

Instead of asking the model for free-form JSON, I gave it a strict contract and
validated every response against it. Anything that didn't parse was rejected and
retried, so malformed output never reached the renderer.

```ts
const FieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "number", "select", "checkbox", "file", "textarea"]),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(), // for select/checkbox
});

const FormSchema = z.object({
  title: z.string(),
  fields: z.array(FieldSchema).min(1),
});

// The AI returns JSON; we never trust it until it passes this gate.
const result = FormSchema.safeParse(aiOutput);
if (!result.success) {
  // re-prompt with the validation errors appended
}
```

Feeding the validation errors *back* into the next prompt turned a flaky generator
into a reliable one — the model fixes its own mistakes far better than I could
patch them after the fact.

### Generate, then own it

Once generated, the form lands in a normal drag-and-drop editor. The AI step is a
fast starting point, not a wall. Users can re-prompt a single field ("make this a
dropdown with EU countries") without regenerating the whole form.

---

## The outcome

DropForm gets a usable form on screen in seconds and keeps it fully editable
afterward. The schema-first design means the AI is a productivity boost without
being a reliability risk: the renderer, the database, and the validation layer all
speak the same typed contract, whether a form was generated or hand-built.

---

## What I learned

- **Constrain the model, don't trust it.** A strict schema plus retry-on-error is
  the difference between a demo and a product.
- **Feed validation errors back into the prompt** — self-correction beats
  post-processing.
- **AI should lower the floor, not the ceiling.** The win was a great first draft;
  keeping full manual control afterward is what made it feel trustworthy.
