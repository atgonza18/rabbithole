import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Register Service Worker for PWA
registerSW({
  onNeedRefresh() {
    console.log("New content available, reloading...");
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
  immediate: true,
});

// Detect standalone mode
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  (window.navigator as any).standalone === true;

console.log("PWA Standalone Mode:", isStandalone);
console.log("User Agent:", navigator.userAgent);
console.log("Current URL:", window.location.href);

if (!isStandalone) {
  console.warn("⚠️ NOT RUNNING IN STANDALONE MODE - Check PWA installation");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      {/*
        TODO: Add Clerk authentication wrapper here
        Install: npm install @clerk/clerk-react
        Setup: Get publishable key from clerk.com
        Add VITE_CLERK_PUBLISHABLE_KEY to .env.local
        Wrap App with <ClerkProvider publishableKey={...}>
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>
);
