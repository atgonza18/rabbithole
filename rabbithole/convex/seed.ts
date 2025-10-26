import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * OLD SEED - DEPRECATED
 *
 * This seed is deprecated. Use seedBerenstain.ts instead
 * which creates sections within a single theory.
 *
 * Run `seedBerenstain:seedBerenstainBears` instead.
 */
export const seedData = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    throw new Error(
      "This seed is deprecated. Use seedBerenstain:seedBerenstainBears instead."
    );
  },
});
