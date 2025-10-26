# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rabbit Hole is a Progressive Web App (PWA) that gamifies learning about conspiracy theories in a Duolingo-style interface. Users progress through theories by reading content and answering questions, earning keys to unlock new theories.

**Tech Stack:**
- Frontend: React 19, TypeScript, Vite
- Backend: Convex (serverless database with real-time sync)
- UI: Shadcn/UI components, Tailwind CSS 4.0, Framer Motion
- Routing: React Router v7
- PWA: Vite PWA Plugin (optimized for iOS)
- Animations: Rive (for rabbit animations)

## Development Commands

All commands should be run in the `rabbithole/` subdirectory (not the root).

```bash
# Start both frontend and backend in parallel
npm run dev

# Start frontend only (Vite dev server on http://localhost:5173)
npm run dev:frontend

# Start backend only (Convex dev mode with live sync)
npm run dev:backend

# Build for production
npm run build

# Type check and lint
npm run lint

# Preview production build
npm preview

# Open Convex dashboard
npx convex dashboard
```

## Database Seeding

The app requires seed data to function. There are multiple ways to seed:

**Quick Start (Berenstain Bears theory):**
- Click the "Create Berenstain Bears Theory" button on the homepage, OR
- Run `npx convex dashboard`, navigate to "Functions" tab, and run `seedBerenstain:seedBerenstainBears`

**Full Seed (multiple theories):**
1. Run `npx convex dashboard`
2. Navigate to "Functions" tab
3. Find `seed:seedData` and click "Run"

**Reset Database:**
- Run `reset:resetDatabase` in Convex dashboard to clear all data

## Convex Backend Architecture

**IMPORTANT:** This project uses the NEW Convex function syntax with explicit validators. Always follow the patterns in `.cursor/rules/convex_rules.mdc`.

### Key Patterns

1. **Always use new function syntax:**
```typescript
export const functionName = query({
  args: { userId: v.id("users") },
  returns: v.object({ ... }),
  handler: async (ctx, args) => {
    // Implementation
  },
});
```

2. **Use proper validators:**
   - `v.id("tableName")` for document IDs
   - `v.null()` for functions that don't return values
   - Always include both `args` and `returns` validators

3. **Function types:**
   - `query` - Read-only database queries (public API)
   - `mutation` - Database writes (public API)
   - `action` - External API calls, Node.js operations (public API)
   - `internalQuery`, `internalMutation`, `internalAction` - Private functions

4. **Calling functions:**
   - Use `ctx.runQuery(api.file.function, args)` from queries/mutations/actions
   - Use `ctx.runMutation(api.file.function, args)` from mutations/actions
   - Use `ctx.runAction(api.file.function, args)` from actions
   - Import from `api` for public functions, `internal` for private functions

### Database Schema

See `convex/schema.ts` for the complete schema. Key tables:

- **users** - User profiles with Clerk authentication, keys earned, admin flag
  - Indexes: `by_clerk_id`, `by_email`

- **theories** - Conspiracy theories (title, description, difficulty, order)
  - Index: `by_order`

- **theorySections** - Sections within theories (like Duolingo lessons within a unit)
  - Indexes: `by_theory_id`, `by_theory_and_order`

- **theoryPages** - Content pages within theories (markdown/HTML content)
  - Indexes: `by_theory_id`, `by_section_id`, `by_section_and_order`, `by_theory_and_order`

- **questions** - Questions embedded in pages (4 types: multiple choice, true/false, fill-in-blank, image selection)
  - Index: `by_page_id`

- **userProgress** - User progress through theories (completed pages, answers, keys)
  - Indexes: `by_user_id`, `by_user_and_theory`, `by_theory_id`

- **theoryUnlocks** - Tracks which theories users unlocked with keys
  - Indexes: `by_user_id`, `by_user_and_theory`

### Convex Files

- `convex/users.ts` - User management (sync from Clerk, get current user, award keys)
- `convex/theories.ts` - Theory CRUD operations
- `convex/sections.ts` - Section CRUD operations within theories
- `convex/pages.ts` - Page management within sections/theories
- `convex/questions.ts` - Question creation and retrieval
- `convex/progress.ts` - User progress tracking, key awards
- `convex/seed.ts` - Database seeding functions (imports and runs seedBerenstain)
- `convex/seedBerenstain.ts` - Berenstain Bears theory seed data with sections and pages
- `convex/reset.ts` - Database reset utility (clears all data from all tables)

## Frontend Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/          # Shadcn components (button, dialog, tabs, card, input, etc.)
│   │   └── tab-bar.tsx  # iOS-style bottom tab navigation
│   ├── QuestionCard.tsx  # Question display component
│   └── LoadingScreen.tsx # Loading screen component
├── pages/
│   ├── user/        # User-facing pages
│   │   ├── HomePage.tsx       # Section path (vertical Duolingo-style with Rive rabbit)
│   │   ├── TheoryReader.tsx   # Page reader with progress bar and question flow
│   │   └── ProfilePage.tsx    # User profile (TODO)
│   └── admin/       # Admin pages
│       ├── AdminDashboard.tsx
│       └── TheoryManagement.tsx
├── hooks/           # Custom React hooks (e.g., useSoundEffects.ts)
├── lib/
│   └── utils.ts     # Tailwind merge utilities
├── App.tsx          # Routes and tab bar
└── main.tsx         # Entry point with Convex provider
```

### Routing

Routes defined in `src/App.tsx`:
- `/` - Home page (displays sections of current theory in vertical path)
- `/profile` - User profile
- `/theory/:theoryId` - Theory reader (all pages in a theory)
- `/theory/:theoryId/section/:sectionId` - Section reader (pages within a specific section)
- `/admin` - Admin dashboard
- `/admin/theories` - Theory management

Tab bar hidden on theory reader and theory management pages.

### Styling Approach

- **Dark theme by default** - Conspiracy aesthetic with dark backgrounds (#2d2d2d for main areas)
- **Tailwind CSS 4.0** - Use utility classes, with inline styles for complex effects (shadows, glows)
- **Shadcn/UI components** - Pre-built accessible components in `components/ui/`
- **Framer Motion** - For animations, page transitions, and staggered layouts
- **Path aliases** - Use `@/` to import from `src/` (e.g., `@/components/ui/button`)

### HomePage Design Patterns

The HomePage features a Duolingo-inspired vertical path with these key design elements:

**3D Layered Button Nodes:**
- Elliptical shape (~200px × 80px) - NOT circular
- Three-layer structure using nested divs:
  - Outer container: Sets dimensions and handles hover/tap interactions
  - Outer ring/rim: 8px thick border creating the 3D edge effect
  - Inner ellipse: Recessed center with inset shadows for depth
- Outer ring styling:
  - Linear gradient: `#00ff88 → #00cc6f` for active/completed states
  - Box-shadow: `0 6px 0 #008855` for elevation + blur shadow for glow
  - Pulsing animation on active state using Framer Motion's animate prop
- Inner ellipse styling:
  - Dark gradient: `#0a0e1a → #1a1e2a` for recessed "hole" appearance
  - Inset shadows: `inset 0 4px 8px rgba(0,0,0,0.6)` for sunken depth
- States: locked (gray gradient), current (pulsing green glow), completed (green with checkmark + icon)
- Interactions: hover scale 1.05, tap scale 0.97 with y: 2 movement
- borderRadius: '50%' on wide rectangle creates elliptical shape

**Staggered Layout:**
- Buttons offset horizontally in a repeating pattern: right (+60px), left (-60px), center (0)
- Creates a winding/zigzag path down the page
- Uses Framer Motion's `x` transform for positioning
- Vertical gap of 40px between nodes

**Rive Character Animation:**
- Large rabbit character (w-56 h-56) positioned at top with slight left offset (-30px)
- Uses `@rive-app/react-canvas` with state machine
- Separate loading screen animation (w-96 h-96) for transitions

### State Management

- **Convex Reactive Queries** - Real-time database sync via `useQuery()` and `useMutation()` hooks
- **No Redux/Zustand** - Convex handles state synchronization
- **React Router** - Client-side routing with `useNavigate()`, `useParams()`

## Environment Setup

Create a `.env.local` file in the `rabbithole/` directory with:

```bash
# Convex deployment URL (auto-configured by `npx convex dev`)
CONVEX_DEPLOYMENT=dev:your-deployment-name # team: your-team, project: rabbithole

# Vite environment variable for Convex URL (auto-configured)
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud

# Optional: Clerk authentication (currently disabled, using mock users)
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Both CONVEX_DEPLOYMENT and VITE_CONVEX_URL are automatically configured when you run `npm run dev` for the first time.

## Authentication (In Progress)

The app is set up for Clerk authentication but currently uses mock users:

1. Schema includes `users.clerkId` field
2. `convex/users.ts` has `syncUser` mutation for Clerk integration
3. `@clerk/clerk-react` is installed
4. To enable: Add `VITE_CLERK_PUBLISHABLE_KEY` to `.env.local` and uncomment Clerk wrapper in `src/main.tsx`

## PWA Configuration & iOS Optimization

This app is **fully optimized for iOS standalone mode** to provide a native app experience when installed on iOS devices.

### Manifest Configuration (`vite.config.ts`)

The PWA manifest is configured with:
- `display: "standalone"` - Hides Safari UI completely
- `orientation: "portrait"` - Locks to portrait mode
- `theme_color: "#2d2d2d"` - Matches app's dark background
- `background_color: "#2d2d2d"` - Seamless launch experience
- Auto-updates on new builds
- Caches static assets and Convex API calls
- Service worker with Workbox for offline support

### iOS Meta Tags (`index.html`)

Critical iOS-specific meta tags are configured:
```html
<!-- Viewport with safe area support -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />

<!-- iOS PWA Meta Tags -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Rabbit Hole" />
<meta name="theme-color" content="#2d2d2d" />
```

**Key settings:**
- `viewport-fit=cover` - Extends content to screen edges, respecting safe areas
- `apple-mobile-web-app-capable=yes` - Enables standalone mode
- `apple-mobile-web-app-status-bar-style=black-translucent` - Transparent status bar for native feel
- `user-scalable=no` - Prevents pinch-zoom for app-like behavior

### Safe Area Handling

All pages properly handle iOS safe areas (notch, home indicator) using CSS environment variables:

**Global CSS Classes (`src/index.css`):**
```css
.pt-safe { padding-top: env(safe-area-inset-top); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.pl-safe { padding-left: env(safe-area-inset-left); }
.pr-safe { padding-right: env(safe-area-inset-right); }
.px-safe {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
.pt-safe-or-4 { padding-top: max(env(safe-area-inset-top), 1rem); }
.pb-safe-or-4 { padding-bottom: max(env(safe-area-inset-bottom), 1rem); }
```

**Implementation in Components:**
- **HomePage** (`src/pages/user/HomePage.tsx`): Main container uses inline styles for top/bottom safe areas
- **TheoryReader** (`src/pages/user/TheoryReader.tsx`): Main container uses inline styles for top/bottom safe areas
- **TabBar** (`src/components/ui/tab-bar.tsx`): Uses `pb-safe` class to respect home indicator

### iOS Native Feel Optimizations

The following CSS optimizations provide a native iOS app experience:

**Prevent Overscroll Bounce:**
```css
html, body {
  overscroll-behavior: none; /* Prevents pull-to-refresh and rubber-band scrolling */
}
```

**Remove Tap Highlights:**
```css
* {
  -webkit-tap-highlight-color: transparent; /* No gray flash on tap */
  -webkit-touch-callout: none; /* Disable long-press context menu */
}
```

**Smooth Scrolling:**
```css
body {
  -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
  -webkit-font-smoothing: antialiased; /* Better font rendering */
  -moz-osx-font-smoothing: grayscale;
}
```

**Viewport Height Fixes:**
```css
html {
  height: 100%; /* Fix for iOS viewport height calculation */
}
```

All pages use `h-screen` instead of `min-h-screen` combined with flexbox (`flex flex-col`) to ensure proper viewport fitting without scrolling issues.

### Testing PWA on iOS

**Development Testing:**
1. Ensure dev server is running: `npm run dev`
2. Open http://localhost:5173 in Safari on your iOS device (use network IP if needed)
3. Tap Share button → "Add to Home Screen"
4. Open the installed app - it should launch in fullscreen standalone mode with no Safari UI

**Production Testing:**
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Test on various iOS devices (iPhone SE to iPhone 15 Pro Max)

**What to Verify:**
- ✅ No Safari UI visible (address bar, tabs, toolbar)
- ✅ Status bar blends naturally with app (black-translucent)
- ✅ Content doesn't get cut off by notch on iPhone X and newer
- ✅ Bottom tab bar sits above home indicator (not hidden by it)
- ✅ No bounce/rubber-band effect when scrolling
- ✅ Smooth 60fps animations
- ✅ No gray tap highlights
- ✅ App launches instantly with matching background color

### Common iOS PWA Issues & Solutions

**Issue: Content hidden behind notch**
- Solution: Use `paddingTop: 'env(safe-area-inset-top)'` on main containers

**Issue: Bottom content cut off by home indicator**
- Solution: Use `paddingBottom: 'env(safe-area-inset-bottom)'` on main containers
- TabBar uses `pb-safe` class

**Issue: Scrolling feels janky**
- Solution: Already implemented `-webkit-overflow-scrolling: touch`

**Issue: Pull-to-refresh appears**
- Solution: Already implemented `overscroll-behavior: none`

**Issue: White flash on app launch**
- Solution: Ensure `theme_color` and `background_color` in manifest match app's background (#2d2d2d)

## Common Development Patterns

### Creating a New Convex Function

```typescript
// In convex/yourFile.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const yourFunction = query({
  args: {
    someId: v.id("tableName"),
  },
  returns: v.array(v.object({
    // Define return shape
  })),
  handler: async (ctx, args) => {
    // Implementation
    return result;
  },
});
```

### Using Convex in React

```typescript
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function MyComponent() {
  const data = useQuery(api.file.functionName, { arg: value });
  const mutate = useMutation(api.file.mutationName);

  if (data === undefined) return <div>Loading...</div>;

  return <div onClick={() => mutate({ arg: value })}>...</div>;
}
```

### Adding a New Shadcn Component

```bash
npx shadcn@latest add component-name
```

Components are added to `src/components/ui/` with proper TypeScript types.

## Current State & Roadmap

**Implemented:**
- Core database schema with sections support
- Backend Convex functions (users, theories, sections, pages, questions, progress)
- Homepage with vertical section path (Duolingo-style with Rive rabbit animation)
- Theory reader with progress bar, page navigation, and question flow
- Basic admin dashboard
- Theory management UI (create/edit/delete)
- Berenstain Bears theory seed data
- PWA configuration
- Dark theme UI with conspiracy aesthetic

**In Progress:**
- Page builder UI for admins
- Question creator UI (all 4 types)
- Question display components for users
- Clerk authentication integration

**TODO:**
- Key unlock celebration modal
- Push notifications
- Analytics dashboard
- Achievement badges
- Social features

## Important Notes

- **Working directory**: `/workspaces/rabbithole/rabbithole/` (note the nested structure - the project is inside a `rabbithole/` subdirectory)
- **All npm commands must be run from the inner `rabbithole/` directory**, not the repository root
- Always use the Convex function syntax from `.cursor/rules/convex_rules.mdc`
- Don't use `filter()` in queries - define indexes in schema and use `withIndex()`
- System fields (`_id`, `_creationTime`) are automatically added to all documents
- Index names should include all fields (e.g., `by_user_and_theory`)
- Use strict types for IDs: `Id<"tableName">` not `string`
- to mem