import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

/**
 * Get user's progress for a specific theory
 */
export const getUserTheoryProgress = query({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.union(
    v.object({
      _id: v.id("userProgress"),
      _creationTime: v.number(),
      userId: v.id("users"),
      theoryId: v.id("theories"),
      currentPageId: v.optional(v.id("theoryPages")),
      completedPageIds: v.array(v.id("theoryPages")),
      answers: v.array(
        v.object({
          questionId: v.id("questions"),
          userAnswer: v.string(),
          isCorrect: v.boolean(),
          answeredAt: v.number(),
        })
      ),
      isCompleted: v.boolean(),
      completedAt: v.optional(v.number()),
      keyAwarded: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    return progress;
  },
});

/**
 * Get all progress for a user
 */
export const getAllUserProgress = query({
  args: {
    userId: v.id("users"),
  },
  returns: v.array(
    v.object({
      _id: v.id("userProgress"),
      _creationTime: v.number(),
      userId: v.id("users"),
      theoryId: v.id("theories"),
      currentPageId: v.optional(v.id("theoryPages")),
      completedPageIds: v.array(v.id("theoryPages")),
      answers: v.array(
        v.object({
          questionId: v.id("questions"),
          userAnswer: v.string(),
          isCorrect: v.boolean(),
          answeredAt: v.number(),
        })
      ),
      isCompleted: v.boolean(),
      completedAt: v.optional(v.number()),
      keyAwarded: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    return progress;
  },
});

/**
 * Start a theory (create initial progress record)
 */
export const startTheory = mutation({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.id("userProgress"),
  handler: async (ctx, args) => {
    // Check if progress already exists
    const existingProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    if (existingProgress) {
      return existingProgress._id;
    }

    // Create new progress record
    const progressId = await ctx.db.insert("userProgress", {
      userId: args.userId,
      theoryId: args.theoryId,
      completedPageIds: [],
      answers: [],
      isCompleted: false,
      keyAwarded: false,
    });

    return progressId;
  },
});

/**
 * Submit an answer to a question
 */
export const submitAnswer = mutation({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
    pageId: v.id("theoryPages"),
    questionId: v.id("questions"),
    userAnswer: v.string(),
  },
  returns: v.object({
    isCorrect: v.boolean(),
    explanation: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    // Get or create progress
    let progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    if (!progress) {
      const progressId = await ctx.db.insert("userProgress", {
        userId: args.userId,
        theoryId: args.theoryId,
        completedPageIds: [],
        answers: [],
        isCompleted: false,
        keyAwarded: false,
      });
      progress = (await ctx.db.get(progressId))!;
    }

    // Get the question
    const question = await ctx.db.get(args.questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    // Validate answer
    const normalizedUserAnswer = args.userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    // Add answer to progress
    const newAnswer = {
      questionId: args.questionId,
      userAnswer: args.userAnswer,
      isCorrect,
      answeredAt: Date.now(),
    };

    // Check if answer already exists for this question, replace if so
    const existingAnswerIndex = progress.answers.findIndex(
      (a) => a.questionId === args.questionId
    );

    let updatedAnswers;
    if (existingAnswerIndex >= 0) {
      updatedAnswers = [...progress.answers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers = [...progress.answers, newAnswer];
    }

    // Update progress
    await ctx.db.patch(progress._id, {
      answers: updatedAnswers,
    });

    return {
      isCorrect,
      explanation: question.explanation,
    };
  },
});

/**
 * Mark a page as completed
 */
export const completePage = mutation({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
    pageId: v.id("theoryPages"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Get progress
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    if (!progress) {
      throw new Error("Progress not found");
    }

    // Add page to completed list if not already there
    if (!progress.completedPageIds.includes(args.pageId)) {
      const updatedCompletedPages = [...progress.completedPageIds, args.pageId];

      await ctx.db.patch(progress._id, {
        completedPageIds: updatedCompletedPages,
        currentPageId: args.pageId,
      });

      // Check if theory is complete
      const allPages = await ctx.db
        .query("theoryPages")
        .withIndex("by_theory_id", (q) => q.eq("theoryId", args.theoryId))
        .collect();

      if (updatedCompletedPages.length >= allPages.length) {
        // Theory completed! Award key
        await ctx.db.patch(progress._id, {
          isCompleted: true,
          completedAt: Date.now(),
          keyAwarded: true,
        });

        // Award key to user
        await ctx.runMutation(internal.users.awardKey, {
          userId: args.userId,
        });
      }
    }

    return null;
  },
});

/**
 * Unlock a theory with a key
 */
export const unlockTheory = mutation({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
  handler: async (ctx, args) => {
    // Check if user has keys
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.keysEarned <= 0) {
      return {
        success: false,
        message: "You don't have any keys to unlock theories",
      };
    }

    // Check if theory is already unlocked
    const existingUnlock = await ctx.db
      .query("theoryUnlocks")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    if (existingUnlock) {
      return {
        success: false,
        message: "Theory is already unlocked",
      };
    }

    // Create unlock record
    await ctx.db.insert("theoryUnlocks", {
      userId: args.userId,
      theoryId: args.theoryId,
      unlockedAt: Date.now(),
      usedKey: true,
    });

    // Deduct a key from user
    await ctx.db.patch(args.userId, {
      keysEarned: user.keysEarned - 1,
    });

    return {
      success: true,
      message: "Theory unlocked successfully!",
    };
  },
});

/**
 * Check if a theory is unlocked for a user
 */
export const isTheoryUnlocked = query({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const unlock = await ctx.db
      .query("theoryUnlocks")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    return unlock !== null;
  },
});

/**
 * Get completed section IDs for a user's theory progress
 */
export const getCompletedSections = query({
  args: {
    userId: v.id("users"),
    theoryId: v.id("theories"),
  },
  returns: v.array(v.id("theorySections")),
  handler: async (ctx, args) => {
    // Get user progress
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", args.theoryId)
      )
      .unique();

    if (!progress) {
      return [];
    }

    // Get all sections for this theory
    const sections = await ctx.db
      .query("theorySections")
      .withIndex("by_theory_id", (q) => q.eq("theoryId", args.theoryId))
      .collect();

    const completedSectionIds: Id<"theorySections">[] = [];

    // For each section, check if all its pages are completed
    for (const section of sections) {
      const sectionPages = await ctx.db
        .query("theoryPages")
        .withIndex("by_section_id", (q) => q.eq("sectionId", section._id))
        .collect();

      // Check if all pages in this section are completed
      const allPagesCompleted = sectionPages.every((page) =>
        progress.completedPageIds.includes(page._id)
      );

      if (allPagesCompleted && sectionPages.length > 0) {
        completedSectionIds.push(section._id);
      }
    }

    return completedSectionIds;
  },
});

/**
 * Check if a section is completed
 */
export const isSectionCompleted = query({
  args: {
    userId: v.id("users"),
    sectionId: v.id("theorySections"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Get the section to find its theory
    const section = await ctx.db.get(args.sectionId);
    if (!section) {
      return false;
    }

    // Get user progress for this theory
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", args.userId).eq("theoryId", section.theoryId)
      )
      .unique();

    if (!progress) {
      return false;
    }

    // Get all pages in this section
    const sectionPages = await ctx.db
      .query("theoryPages")
      .withIndex("by_section_id", (q) => q.eq("sectionId", args.sectionId))
      .collect();

    if (sectionPages.length === 0) {
      return false;
    }

    // Check if all pages are completed
    return sectionPages.every((page) =>
      progress.completedPageIds.includes(page._id)
    );
  },
});
