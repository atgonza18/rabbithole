import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get all pages for a section
 */
export const getPagesBySectionId = query({
  args: {
    sectionId: v.id("theorySections"),
  },
  returns: v.array(
    v.object({
      _id: v.id("theoryPages"),
      _creationTime: v.number(),
      theoryId: v.id("theories"),
      sectionId: v.optional(v.id("theorySections")),
      order: v.number(),
      content: v.string(),
      hasQuestion: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    const pages = await ctx.db
      .query("theoryPages")
      .withIndex("by_section_and_order", (q) => q.eq("sectionId", args.sectionId))
      .collect();

    return pages.sort((a, b) => a.order - b.order);
  },
});

/**
 * Get all pages for a theory
 */
export const getPagesByTheoryId = query({
  args: {
    theoryId: v.id("theories"),
  },
  returns: v.array(
    v.object({
      _id: v.id("theoryPages"),
      _creationTime: v.number(),
      theoryId: v.id("theories"),
      sectionId: v.optional(v.id("theorySections")),
      order: v.number(),
      content: v.string(),
      hasQuestion: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    const pages = await ctx.db
      .query("theoryPages")
      .withIndex("by_theory_and_order", (q) => q.eq("theoryId", args.theoryId))
      .collect();

    return pages.sort((a, b) => a.order - b.order);
  },
});

/**
 * Get a single page by ID
 */
export const getPageById = query({
  args: {
    pageId: v.id("theoryPages"),
  },
  returns: v.union(
    v.object({
      _id: v.id("theoryPages"),
      _creationTime: v.number(),
      theoryId: v.id("theories"),
      sectionId: v.optional(v.id("theorySections")),
      order: v.number(),
      content: v.string(),
      hasQuestion: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const page = await ctx.db.get(args.pageId);
    return page;
  },
});

/**
 * Create a new page (admin only)
 */
export const createPage = mutation({
  args: {
    theoryId: v.id("theories"),
    sectionId: v.id("theorySections"),
    order: v.number(),
    content: v.string(),
    hasQuestion: v.boolean(),
  },
  returns: v.id("theoryPages"),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const pageId = await ctx.db.insert("theoryPages", {
      theoryId: args.theoryId,
      sectionId: args.sectionId,
      order: args.order,
      content: args.content,
      hasQuestion: args.hasQuestion,
    });
    return pageId;
  },
});

/**
 * Update an existing page (admin only)
 */
export const updatePage = mutation({
  args: {
    pageId: v.id("theoryPages"),
    content: v.optional(v.string()),
    order: v.optional(v.number()),
    hasQuestion: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const { pageId, ...updates } = args;

    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(pageId, cleanedUpdates);
    return null;
  },
});

/**
 * Delete a page (admin only)
 */
export const deletePage = mutation({
  args: {
    pageId: v.id("theoryPages"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    // TODO: Also delete associated questions
    await ctx.db.delete(args.pageId);
    return null;
  },
});
