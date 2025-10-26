import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const questionTypeValidator = v.union(
  v.literal("multiple_choice"),
  v.literal("true_false"),
  v.literal("fill_in_blank"),
  v.literal("image_selection")
);

const optionValidator = v.object({
  id: v.string(),
  text: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
});

/**
 * Get question for a page
 */
export const getQuestionByPageId = query({
  args: {
    pageId: v.id("theoryPages"),
  },
  returns: v.union(
    v.object({
      _id: v.id("questions"),
      _creationTime: v.number(),
      pageId: v.id("theoryPages"),
      questionType: questionTypeValidator,
      questionText: v.string(),
      options: v.optional(v.array(optionValidator)),
      correctAnswer: v.string(),
      explanation: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const question = await ctx.db
      .query("questions")
      .withIndex("by_page_id", (q) => q.eq("pageId", args.pageId))
      .unique();

    return question;
  },
});

/**
 * Create a question (admin only)
 */
export const createQuestion = mutation({
  args: {
    pageId: v.id("theoryPages"),
    questionType: questionTypeValidator,
    questionText: v.string(),
    options: v.optional(v.array(optionValidator)),
    correctAnswer: v.string(),
    explanation: v.optional(v.string()),
  },
  returns: v.id("questions"),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check

    // Validate that page exists
    const page = await ctx.db.get(args.pageId);
    if (!page) {
      throw new Error("Page not found");
    }

    // Create the question
    const questionId = await ctx.db.insert("questions", {
      pageId: args.pageId,
      questionType: args.questionType,
      questionText: args.questionText,
      options: args.options,
      correctAnswer: args.correctAnswer,
      explanation: args.explanation,
    });

    // Update page to mark it has a question
    await ctx.db.patch(args.pageId, {
      hasQuestion: true,
    });

    return questionId;
  },
});

/**
 * Update a question (admin only)
 */
export const updateQuestion = mutation({
  args: {
    questionId: v.id("questions"),
    questionType: v.optional(questionTypeValidator),
    questionText: v.optional(v.string()),
    options: v.optional(v.array(optionValidator)),
    correctAnswer: v.optional(v.string()),
    explanation: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check
    const { questionId, ...updates } = args;

    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(questionId, cleanedUpdates);
    return null;
  },
});

/**
 * Delete a question (admin only)
 */
export const deleteQuestion = mutation({
  args: {
    questionId: v.id("questions"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // TODO: Add admin authorization check

    // Get the question to find its page
    const question = await ctx.db.get(args.questionId);
    if (question) {
      // Update the page to mark it doesn't have a question anymore
      await ctx.db.patch(question.pageId, {
        hasQuestion: false,
      });
    }

    await ctx.db.delete(args.questionId);
    return null;
  },
});

/**
 * Validate a user's answer to a question
 */
export const validateAnswer = query({
  args: {
    questionId: v.id("questions"),
    userAnswer: v.string(),
  },
  returns: v.object({
    isCorrect: v.boolean(),
    correctAnswer: v.string(),
    explanation: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    // Normalize answers for comparison (trim and lowercase for fill-in-blank)
    const normalizedUserAnswer = args.userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();

    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  },
});
