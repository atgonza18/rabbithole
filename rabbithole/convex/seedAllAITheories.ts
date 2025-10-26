import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * Master seed file for all AI-related conspiracy theories.
 *
 * This will populate:
 * 1. Roko's Basilisk - Future AI punishment
 * 2. Dead Internet Theory - Bots and AI-generated content
 * 3. The Opinion Architects - AI controlling public opinion
 * 4. Face Harvest - Facial recognition data collection
 *
 * Run this function from the Convex dashboard to seed all theories at once.
 *
 * NOTE: This is a PUBLIC mutation so it can be run from the dashboard.
 * It calls internal mutations to do the actual seeding.
 */
export const seedAllAITheories = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    console.log("Starting to seed all AI conspiracy theories...");

    // Seed Roko's Basilisk
    console.log("Seeding Roko's Basilisk...");
    await ctx.scheduler.runAfter(0, internal.seedRokosBasilisk.seedRokosBasilisk, {});
    console.log("✓ Roko's Basilisk scheduled");

    // Seed Dead Internet Theory
    console.log("Seeding Dead Internet Theory...");
    await ctx.scheduler.runAfter(0, internal.seedDeadInternet.seedDeadInternet, {});
    console.log("✓ Dead Internet Theory scheduled");

    // Seed AI Controlling Public Opinion
    console.log("Seeding AI Controlling Public Opinion...");
    await ctx.scheduler.runAfter(0, internal.seedAIOpinion.seedAIOpinion, {});
    console.log("✓ AI Controlling Public Opinion scheduled");

    // Seed Facial Recognition Harvesting
    console.log("Seeding Facial Recognition Harvesting...");
    await ctx.scheduler.runAfter(0, internal.seedFacialRecognition.seedFacialRecognition, {});
    console.log("✓ Facial Recognition Harvesting scheduled");

    console.log("All AI conspiracy theories scheduled for seeding!");
    return null;
  },
});
