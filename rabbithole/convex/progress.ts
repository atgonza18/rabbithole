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
    // If there's no correct answer (thought-provoking question), all answers are valid
    let isCorrect = true;
    if (question.correctAnswer) {
      const normalizedUserAnswer = args.userAnswer.trim().toLowerCase();
      const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();
      isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    }

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

      // Get the page to check its section
      const completedPage = await ctx.db.get(args.pageId);

      // Check if section was just completed (award 10 XP)
      if (completedPage && completedPage.sectionId) {
        const sectionPages = await ctx.db
          .query("theoryPages")
          .withIndex("by_section_id", (q) => q.eq("sectionId", completedPage.sectionId))
          .collect();

        // Check if section is now complete (with the new page added)
        const sectionNowComplete = sectionPages.every((page) =>
          updatedCompletedPages.includes(page._id)
        );

        // Check if section was already complete BEFORE this page
        const sectionWasAlreadyComplete = sectionPages.every((page) =>
          progress.completedPageIds.includes(page._id)
        );

        // Award XP ONLY if section just became complete (wasn't complete before, is complete now)
        if (sectionNowComplete && !sectionWasAlreadyComplete) {
          await ctx.runMutation(internal.users.awardXP, {
            userId: args.userId,
            amount: 10,
          });
          console.log(`Awarded 10 XP for completing section ${completedPage.sectionId}`);
        }
      }

      // Check if theory is complete
      const allPages = await ctx.db
        .query("theoryPages")
        .withIndex("by_theory_id", (q) => q.eq("theoryId", args.theoryId))
        .collect();

      if (updatedCompletedPages.length >= allPages.length) {
        // Theory completed! Award key and bonus XP
        await ctx.db.patch(progress._id, {
          isCompleted: true,
          completedAt: Date.now(),
          keyAwarded: true,
        });

        // Award key to user
        await ctx.runMutation(internal.users.awardKey, {
          userId: args.userId,
        });

        // Award 20 XP bonus for completing theory
        await ctx.runMutation(internal.users.awardXP, {
          userId: args.userId,
          amount: 20,
        });
        console.log(`Awarded 20 XP bonus for completing theory ${args.theoryId}`);

        // Automatically unlock a random theory for the user (inline logic)
        const allTheories = await ctx.db
          .query("theories")
          .withIndex("by_order")
          .collect();

        const userUnlocks = await ctx.db
          .query("theoryUnlocks")
          .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
          .collect();

        const unlockedTheoryIds = new Set(userUnlocks.map((u) => u.theoryId));

        const lockedTheories = allTheories.filter(
          (theory) => theory.isLocked && !unlockedTheoryIds.has(theory._id)
        );

        if (lockedTheories.length > 0) {
          // Pick a random locked theory
          const randomIndex = Math.floor(Math.random() * lockedTheories.length);
          const theoryToUnlock = lockedTheories[randomIndex];

          // Create unlock record
          await ctx.db.insert("theoryUnlocks", {
            userId: args.userId,
            theoryId: theoryToUnlock._id,
            unlockedAt: Date.now(),
            usedKey: false,
          });

          console.log(`Unlocked theory "${theoryToUnlock.title}" for user:`, args.userId);
        }
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
    // Get the theory to check if it's locked
    const theory = await ctx.db.get(args.theoryId);
    if (!theory) {
      return false;
    }

    // If theory is not locked, it's available to everyone
    if (!theory.isLocked) {
      return true;
    }

    // If theory is locked, check if user has unlocked it
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

/**
 * Get all theories unlocked for a user (including non-locked ones)
 */
export const getUnlockedTheories = query({
  args: {
    userId: v.id("users"),
  },
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
  handler: async (ctx, args) => {
    // Get all theories
    const allTheories = await ctx.db
      .query("theories")
      .withIndex("by_order")
      .collect();

    // Get user's unlocks
    const userUnlocks = await ctx.db
      .query("theoryUnlocks")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    const unlockedTheoryIds = new Set(userUnlocks.map((u) => u.theoryId));

    // Return theories that are either not locked OR have been unlocked by the user
    return allTheories.filter(
      (theory) => !theory.isLocked || unlockedTheoryIds.has(theory._id)
    );
  },
});

/**
 * Get the most recently unlocked theory for a user (auto-unlocked only)
 */
export const getMostRecentlyUnlockedTheory = query({
  args: {
    userId: v.id("users"),
  },
  returns: v.union(
    v.object({
      theory: v.object({
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
      unlockedAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    // Get the most recent auto-unlock (usedKey: false)
    const recentUnlock = await ctx.db
      .query("theoryUnlocks")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("usedKey"), false))
      .order("desc")
      .first();

    if (!recentUnlock) {
      return null;
    }

    // Get the theory details
    const theory = await ctx.db.get(recentUnlock.theoryId);
    if (!theory) {
      return null;
    }

    return {
      theory,
      unlockedAt: recentUnlock.unlockedAt,
    };
  },
});
