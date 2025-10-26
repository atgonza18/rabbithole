import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Get all sections for a theory
 */
export const getSectionsByTheoryId = query({
  args: {
    theoryId: v.id("theories"),
  },
  returns: v.array(
    v.object({
      _id: v.id("theorySections"),
      _creationTime: v.number(),
      theoryId: v.id("theories"),
      title: v.string(),
      description: v.string(),
      order: v.number(),
      icon: v.optional(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    const sections = await ctx.db
      .query("theorySections")
      .withIndex("by_theory_and_order", (q) => q.eq("theoryId", args.theoryId))
      .collect();

    return sections.sort((a, b) => a.order - b.order);
  },
});

/**
 * Get a single section by ID
 */
export const getSectionById = query({
  args: {
    sectionId: v.id("theorySections"),
  },
  returns: v.union(
    v.object({
      _id: v.id("theorySections"),
      _creationTime: v.number(),
      theoryId: v.id("theories"),
      title: v.string(),
      description: v.string(),
      order: v.number(),
      icon: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const section = await ctx.db.get(args.sectionId);
    return section;
  },
});

/**
 * Create a new section (admin only)
 */
export const createSection = mutation({
  args: {
    theoryId: v.id("theories"),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    icon: v.optional(v.string()),
  },
  returns: v.id("theorySections"),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const sectionId = await ctx.db.insert("theorySections", {
      theoryId: args.theoryId,
      title: args.title,
      description: args.description,
      order: args.order,
      icon: args.icon,
    });
    return sectionId;
  },
});

/**
 * Update an existing section (admin only)
 */
export const updateSection = mutation({
  args: {
    sectionId: v.id("theorySections"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
    icon: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const { sectionId, ...updates } = args;

    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(sectionId, cleanedUpdates);
    return null;
  },
});

/**
 * Delete a section (admin only)
 */
export const deleteSection = mutation({
  args: {
    sectionId: v.id("theorySections"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    // TODO: Also delete associated pages and questions
    await ctx.db.delete(args.sectionId);
    return null;
  },
});
