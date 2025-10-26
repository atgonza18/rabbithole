import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

/**
 * Get all theories in order
 */
export const getAllTheories = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("theories"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.string(),
      order: v.number(),
      isLocked: v.boolean(),
      icon: v.optional(v.string()),
      difficulty: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("expert")
      ),
      estimatedTimeMinutes: v.number(),
    })
  ),
  handler: async (ctx) => {
    const theories = await ctx.db
      .query("theories")
      .withIndex("by_order")
      .collect();
    return theories;
  },
});

/**
 * Get a single theory by ID
 */
export const getTheoryById = query({
  args: {
    theoryId: v.id("theories"),
  },
  returns: v.union(
    v.object({
      _id: v.id("theories"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.string(),
      order: v.number(),
      isLocked: v.boolean(),
      icon: v.optional(v.string()),
      difficulty: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("expert")
      ),
      estimatedTimeMinutes: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const theory = await ctx.db.get(args.theoryId);
    return theory;
  },
});

/**
 * Create a new theory (admin only)
 */
export const createTheory = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    order: v.number(),
    isLocked: v.boolean(),
    icon: v.optional(v.string()),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("expert")
    ),
    estimatedTimeMinutes: v.number(),
  },
  returns: v.id("theories"),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const theoryId = await ctx.db.insert("theories", {
      title: args.title,
      description: args.description,
      order: args.order,
      isLocked: args.isLocked,
      icon: args.icon,
      difficulty: args.difficulty,
      estimatedTimeMinutes: args.estimatedTimeMinutes,
    });
    return theoryId;
  },
});

/**
 * Update an existing theory (admin only)
 */
export const updateTheory = mutation({
  args: {
    theoryId: v.id("theories"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
    isLocked: v.optional(v.boolean()),
    icon: v.optional(v.string()),
    difficulty: v.optional(
      v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("expert")
      )
    ),
    estimatedTimeMinutes: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const { theoryId, ...updates } = args;

    // Remove undefined values
    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(theoryId, cleanedUpdates);
    return null;
  },
});

/**
 * Delete a theory (admin only)
 */
export const deleteTheory = mutation({
  args: {
    theoryId: v.id("theories"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    // TODO: Also delete associated pages, questions, and progress
    await ctx.db.delete(args.theoryId);
    return null;
  },
});
