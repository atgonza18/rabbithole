/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as debug from "../debug.js";
import type * as pages from "../pages.js";
import type * as progress from "../progress.js";
import type * as questions from "../questions.js";
import type * as reset from "../reset.js";
import type * as resetLastSection from "../resetLastSection.js";
import type * as sections from "../sections.js";
import type * as seed from "../seed.js";
import type * as seedAIOpinion from "../seedAIOpinion.js";
import type * as seedAllAITheories from "../seedAllAITheories.js";
import type * as seedBerenstain from "../seedBerenstain.js";
import type * as seedCelebrityCloning from "../seedCelebrityCloning.js";
import type * as seedCelebrityCloningNew from "../seedCelebrityCloningNew.js";
import type * as seedDeadInternet from "../seedDeadInternet.js";
import type * as seedFacialRecognition from "../seedFacialRecognition.js";
import type * as seedFogvid24 from "../seedFogvid24.js";
import type * as seedMattressFirm from "../seedMattressFirm.js";
import type * as seedRokosBasilisk from "../seedRokosBasilisk.js";
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
  debug: typeof debug;
  pages: typeof pages;
  progress: typeof progress;
  questions: typeof questions;
  reset: typeof reset;
  resetLastSection: typeof resetLastSection;
  sections: typeof sections;
  seed: typeof seed;
  seedAIOpinion: typeof seedAIOpinion;
  seedAllAITheories: typeof seedAllAITheories;
  seedBerenstain: typeof seedBerenstain;
  seedCelebrityCloning: typeof seedCelebrityCloning;
  seedCelebrityCloningNew: typeof seedCelebrityCloningNew;
  seedDeadInternet: typeof seedDeadInternet;
  seedFacialRecognition: typeof seedFacialRecognition;
  seedFogvid24: typeof seedFogvid24;
  seedMattressFirm: typeof seedMattressFirm;
  seedRokosBasilisk: typeof seedRokosBasilisk;
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
