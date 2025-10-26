import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Debug query to check theory lock status
 */
export const checkTheoryLocks = query({
  args: {},
  returns: v.array(
    v.object({
      title: v.string(),
      order: v.number(),
      isLocked: v.boolean(),
    })
  ),
  handler: async (ctx) => {
    const theories = await ctx.db
      .query("theories")
      .withIndex("by_order")
      .collect();

    return theories.map((t) => ({
      title: t.title,
      order: t.order,
      isLocked: t.isLocked,
    }));
  },
});
