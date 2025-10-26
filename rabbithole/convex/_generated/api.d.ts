/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as pages from "../pages.js";
import type * as progress from "../progress.js";
import type * as questions from "../questions.js";
import type * as reset from "../reset.js";
import type * as sections from "../sections.js";
import type * as seed from "../seed.js";
import type * as seedBerenstain from "../seedBerenstain.js";
import type * as theories from "../theories.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  pages: typeof pages;
  progress: typeof progress;
  questions: typeof questions;
  reset: typeof reset;
  sections: typeof sections;
  seed: typeof seed;
  seedBerenstain: typeof seedBerenstain;
  theories: typeof theories;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
