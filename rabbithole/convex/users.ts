import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

/**
 * Sync user from Clerk to Convex database
 * Called when a user signs up or logs in
 */
export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
    email: v.string(),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      // Update user info if changed
      await ctx.db.patch(existingUser._id, {
        username: args.username,
        email: args.email,
      });
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      username: args.username,
      email: args.email,
      keysEarned: 0,
      xp: 0,
      isAdmin: false, // Default to non-admin
    });

    return userId;
  },
});

/**
 * Get current user by Clerk ID
 */
export const getCurrentUser = query({
  args: {
    clerkId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      clerkId: v.string(),
      username: v.string(),
      email: v.string(),
      keysEarned: v.number(),
      xp: v.number(),
      currentTheoryId: v.optional(v.id("theories")),
      isAdmin: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});

/**
 * Update user's current theory
 */
export const updateCurrentTheory = mutation({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      currentTheoryId: args.theoryId,
    });
    return null;
  },
});

/**
 * Award a key to a user (internal function)
 */
export const awardKey = internalMutation({
  args: {
    userId: v.id("users"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      keysEarned: user.keysEarned + 1,
    });
    return null;
  },
});

/**
 * Make a user an admin
 */
export const makeAdmin = mutation({
  args: {
    userId: v.id("users"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add authorization check - only existing admins can make new admins
    await ctx.db.patch(args.userId, {
      isAdmin: true,
    });
    return null;
  },
});

/**
 * Get or create a mock user for development
 */
export const getOrCreateMockUser = mutation({
  args: {},
  returns: v.id("users"),
  handler: async (ctx) => {
    // Check if mock user exists
    const mockUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", "mock-user"))
      .unique();

    if (mockUser) {
      return mockUser._id;
    }

    // Create mock user
    const userId = await ctx.db.insert("users", {
      clerkId: "mock-user",
      username: "Mock User",
      email: "mock@example.com",
      keysEarned: 0,
      xp: 0,
      isAdmin: false,
    });

    return userId;
  },
});

/**
 * Get the mock user (for queries)
 */
export const getMockUser = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      clerkId: v.string(),
      username: v.string(),
      email: v.string(),
      keysEarned: v.number(),
      xp: v.number(),
      currentTheoryId: v.optional(v.id("theories")),
      isAdmin: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const mockUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", "mock-user"))
      .unique();

    return mockUser;
  },
});

/**
 * Award XP to a user (internal function)
 */
export const awardXP = internalMutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      xp: user.xp + args.amount,
    });
    return null;
  },
});
