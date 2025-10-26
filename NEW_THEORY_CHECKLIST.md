# New Theory Creation Checklist

Use this checklist every time you create a new conspiracy theory to ensure consistency.

## Pre-Creation

- [ ] Read `/CONSPIRACY_THEORY_CREATION_GUIDE.md` for content guidelines
- [ ] Check current theory count: `npx convex run debug:checkTheoryLocks`
- [ ] Determine next available order number (e.g., if max order is 5, use 6)

## File Creation

- [ ] Copy template: `cp convex/seedTemplate.ts.template convex/seedYourTheory.ts`
- [ ] Rename function from `seedYourTheory` to `seedTheoryName`
- [ ] Update all placeholder text (search for `YOUR_THEORY`)

## Theory Configuration

- [ ] Set appropriate `title`
- [ ] Write compelling `description` (1-2 sentences)
- [ ] Choose `difficulty`: `"beginner"`, `"intermediate"`, or `"expert"`
- [ ] Set `order` to next available number
- [ ] Pick relevant `icon` emoji
- [ ] **CRITICAL:** Set `isLocked`:
  - [ ] `false` ONLY if this is order 0 (starter theory)
  - [ ] `true` for ANY order > 0
- [ ] Set `estimatedTimeMinutes` (typically 45-60)

## Content Creation

- [ ] Create 4 sections with meaningful titles and descriptions
- [ ] Write 12-16 pages total (3-4 pages per section)
- [ ] Use styled HTML for all content (see formatting guide)
- [ ] Include color coding (red for warnings, yellow for highlights, green for headers)
- [ ] Add callout boxes for key points
- [ ] Vary paragraph length for visual rhythm

## Questions

- [ ] Add 6-8 questions total across all sections
- [ ] Mix question types (memory verification, scenario choices, experiential polls, belief resonance)
- [ ] Make questions personal and experiential ("You're..." not "What year...")
- [ ] Ensure all answer options are equally unsettling
- [ ] **NO `correctAnswer` field** - delete this line if present
- [ ] Write explanations that validate choice and add intrigue (don't say "correct/incorrect")

## Testing

- [ ] Deploy to Convex: Functions should auto-deploy via `npx convex dev`
- [ ] Clear database: `npx convex run reset:clearAllData`
- [ ] Seed Berenstain Bears: `npx convex run seedBerenstain:seedBerenstainBears`
- [ ] Seed your new theory: `npx convex run seedYourTheory:seedYourTheory`
- [ ] Verify lock status: `npx convex run debug:checkTheoryLocks`
  - [ ] Confirm your theory shows `isLocked: true` (unless it's order 0)
- [ ] Test in browser:
  - [ ] New theory appears as locked (greyed out with lock icon)
  - [ ] Cannot click sections of locked theory
  - [ ] Trying to navigate directly to theory URL redirects to home
  - [ ] Complete Berenstain Bears
  - [ ] Verify key is awarded
  - [ ] Check if new theory unlocks (random, so may take multiple tries)
  - [ ] Celebration modal appears when theory unlocks
  - [ ] Newly unlocked theory appears on home page path

## Optional: Batch Seeding

If you want this theory included in batch seeding operations:

- [ ] Create or update a master seed file (e.g., `seedAllTheories.ts`)
- [ ] Add your theory to the batch:
```typescript
await ctx.scheduler.runAfter(0, internal.seedYourTheory.seedYourTheory, {});
```

## Common Mistakes to Avoid

- ❌ Setting `isLocked: false` for theories with order > 0
- ❌ Including `correctAnswer` field in questions
- ❌ Using plain text instead of styled HTML
- ❌ Creating factual quiz questions instead of experiential ones
- ❌ Making all answer options similar (they should represent different unsettling perspectives)
- ❌ Writing "Correct!" or "Wrong!" in explanations
- ❌ Skipping the verification step with `debug:checkTheoryLocks`

## Quick Commands Reference

```bash
# Check theory lock status
npx convex run debug:checkTheoryLocks

# Clear database
npx convex run reset:clearAllData

# Seed Berenstain Bears (starter theory)
npx convex run seedBerenstain:seedBerenstainBears

# Seed your theory (replace with your function name)
npx convex run seedYourTheory:seedYourTheory

# Seed all AI theories
npx convex run seedAllAITheories:seedAllAITheories
```

## Example Correct Configuration

```typescript
// ✅ CORRECT - New theory (not order 0)
const theoryId = await ctx.db.insert("theories", {
  title: "Simulation Hypothesis",
  description: "Evidence that our reality is a computer simulation.",
  difficulty: "expert" as const,
  order: 6,  // Next available number
  icon: "🖥️",
  isLocked: true,  // ✅ Locked because order > 0
  estimatedTimeMinutes: 45,
});
```

```typescript
// ❌ WRONG - New theory with isLocked: false
const theoryId = await ctx.db.insert("theories", {
  title: "Simulation Hypothesis",
  order: 6,
  isLocked: false,  // ❌ Should be true!
  // ...
});
```
