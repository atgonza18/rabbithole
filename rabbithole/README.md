# Rabbit Hole 🐰 - Conspiracy Theory Learning App

A PWA (Progressive Web App) inspired by Duolingo, designed to teach users about conspiracy theories through interactive reading and quizzes. Built with React, Convex, and Shadcn/UI.

## ✨ Features

### User Features
- 📱 **PWA Support** - Install on iOS devices and use offline
- 🎮 **Gamified Learning** - Progress through theories like Duolingo lessons
- 🔑 **Key System** - Earn keys by completing theories to unlock new ones
- 📖 **Interactive Reading** - Read theory pages with embedded questions
- 🎯 **4 Question Types** - Multiple choice, true/false, fill-in-blank, image selection
- 🌙 **Dark Theme** - Optimized conspiracy aesthetic

### Admin Features
- ⚙️ **Theory Management** - Create and organize conspiracy theories
- 📝 **Page Builder** - Add content pages (to be fully implemented)
- ❓ **Question Creator** - Embed questions in pages (to be fully implemented)

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

This starts both the frontend (Vite) and backend (Convex).
Open http://localhost:5173 in your browser.

### 2. Seed the Database

The app needs initial data. Seed it via the Convex dashboard:

```bash
npx convex dashboard
```

Then:
1. Go to "Functions" tab
2. Find `seed:seedData`
3. Click "Run"

This creates 5 sample conspiracy theories with the first one unlocked and ready to explore!

## 📱 Try It Out

1. **Homepage** - See the vertical theory path (Duolingo style)
2. **Click "Moon Landing Hoax"** - Read through 3 pages with questions
3. **Admin Panel** - Click "Admin" button to create new theories

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Convex (serverless database & real-time sync)
- **UI**: Shadcn/UI, Tailwind CSS 4.0, Framer Motion
- **Routing**: React Router
- **PWA**: Vite PWA Plugin (configured for iOS)

## 📂 Project Structure

```
rabbithole/
├── convex/           # Backend
│   ├── schema.ts    # Database tables
│   ├── users.ts     # User management
│   ├── theories.ts  # Theory CRUD
│   ├── pages.ts     # Page management
│   ├── questions.ts # Question management
│   ├── progress.ts  # Progress tracking
│   └── seed.ts      # Sample data
├── src/
│   ├── components/ui/    # Shadcn components
│   ├── pages/
│   │   ├── user/        # User pages (Home, TheoryReader)
│   │   └── admin/       # Admin pages
│   ├── App.tsx          # Routes
│   └── main.tsx         # Entry point
└── public/
```

## 💡 Usage Guide

### For Users

**Home Page** - Vertical path of theories
- 🟢 Green circle = Active/unlocked
- 🔒 Lock icon = Requires key
- ✓ Check = Completed

**Reading** - Click a theory to start
- Swipe/click through pages
- Answer questions
- Earn keys for completion

### For Admins

**Create Theories**
1. Click "Admin" → "Manage Theories"
2. Click "New Theory"
3. Fill in details (title, description, icon, difficulty)
4. Choose if it starts locked

**Next Steps** (to be implemented):
- Add pages to theories
- Create questions for pages
- View analytics

## 🔧 Advanced Setup

### Add Clerk Authentication (Optional)

Currently using mock users. To add real auth:

1. Sign up at [clerk.com](https://clerk.com)
2. Get publishable key
3. Add to `.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```
4. Uncomment Clerk setup in `src/main.tsx`

### PWA on iOS

1. Open app in Safari
2. Tap Share → "Add to Home Screen"
3. App opens in standalone mode

## 📋 Database Schema

- **users** - Profiles, keys earned, current theory
- **theories** - Conspiracy theories (title, description, difficulty, order)
- **theoryPages** - Content pages (markdown/HTML)
- **questions** - 4 types: multiple choice, true/false, fill-in-blank, image selection
- **userProgress** - Completed pages, answers, keys awarded
- **theoryUnlocks** - Which theories users unlocked

## 🎯 Roadmap

**Phase 1** (Current) ✅
- [x] Core database schema
- [x] Backend functions (Convex)
- [x] Homepage with theory path
- [x] Theory reader
- [x] Basic admin dashboard
- [x] Theory management UI
- [x] PWA configuration

**Phase 2** (Next)
- [ ] Page builder UI (admin)
- [ ] Question creator UI (all 4 types)
- [ ] Question components (user-facing)
- [ ] Key unlock celebration modal
- [ ] Real authentication (Clerk)

**Phase 3** (Future)
- [ ] Analytics dashboard
- [ ] Push notifications
- [ ] Achievement badges
- [ ] Social features
- [ ] Search & filters

## 📖 Learn More

- [Convex Docs](https://docs.convex.dev/) - Backend/database
- [Shadcn/UI](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📜 License

MIT - See LICENSE.txt
