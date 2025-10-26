import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles
  users: defineTable({
    clerkId: v.string(), // Clerk user ID for authentication
    username: v.string(),
    email: v.string(),
    keysEarned: v.number(), // Total keys earned by completing theories
    xp: v.number(), // Experience points earned from completing sections and theories
    currentTheoryId: v.optional(v.id("theories")), // Theory user is currently working on
    isAdmin: v.boolean(), // Admin flag
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Conspiracy theories (like Duolingo lessons)
  theories: defineTable({
    title: v.string(), // e.g., "Moon Landing Hoax"
    description: v.string(), // Brief description
    order: v.number(), // Display order in the path
    isLocked: v.boolean(), // Whether theory is locked
    icon: v.optional(v.string()), // Icon/emoji for the theory
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("expert")
    ),
    estimatedTimeMinutes: v.number(), // Estimated completion time
  }).index("by_order", ["order"]),

  // Sections within theories (like Duolingo lessons within a unit)
  theorySections: defineTable({
    theoryId: v.id("theories"),
    title: v.string(), // e.g., "The Discovery", "Cracks in Reality"
    description: v.string(), // Brief description of the section
    order: v.number(), // Section order within the theory
    icon: v.optional(v.string()), // Icon/emoji for the section
  })
    .index("by_theory_id", ["theoryId"])
    .index("by_theory_and_order", ["theoryId", "order"]),

  // Pages within sections (interactive reading content)
  theoryPages: defineTable({
    theoryId: v.id("theories"),
    sectionId: v.optional(v.id("theorySections")), // Section this page belongs to (optional for backwards compatibility)
    order: v.number(), // Page order within the section
    content: v.string(), // Rich text content (markdown/HTML)
    hasQuestion: v.boolean(), // Whether this page has an embedded question
  })
    .index("by_theory_id", ["theoryId"])
    .index("by_section_id", ["sectionId"])
    .index("by_section_and_order", ["sectionId", "order"])
    .index("by_theory_and_order", ["theoryId", "order"]),

  // Questions embedded in pages
  questions: defineTable({
    pageId: v.id("theoryPages"),
    questionType: v.union(
      v.literal("multiple_choice"),
      v.literal("true_false"),
      v.literal("fill_in_blank"),
      v.literal("image_selection")
    ),
    questionText: v.string(),
    // For multiple choice and image selection
    options: v.optional(
      v.array(
        v.object({
          id: v.string(),
          text: v.optional(v.string()),
          imageUrl: v.optional(v.string()),
        })
      )
    ),
    correctAnswer: v.optional(v.string()), // DEPRECATED: No longer used - all answers are valid
    explanation: v.optional(v.string()), // Reflection/insight shown after answering (not dependent on correctness)
  }).index("by_page_id", ["pageId"]),

  // User progress through theories
  userProgress: defineTable({
    userId: v.id("users"),
    theoryId: v.id("theories"),
    currentPageId: v.optional(v.id("theoryPages")), // Current page in the theory
    completedPageIds: v.array(v.id("theoryPages")), // Pages completed
    answers: v.array(
      v.object({
        questionId: v.id("questions"),
        userAnswer: v.string(),
        isCorrect: v.boolean(),
        answeredAt: v.number(), // Timestamp
      })
    ),
    isCompleted: v.boolean(), // Whether theory is fully completed
    completedAt: v.optional(v.number()), // When theory was completed
    keyAwarded: v.boolean(), // Whether user received a key for completion
  })
    .index("by_user_id", ["userId"])
    .index("by_user_and_theory", ["userId", "theoryId"])
    .index("by_theory_id", ["theoryId"]),

  // Theory unlocks (tracks which theories users have unlocked with keys)
  theoryUnlocks: defineTable({
    userId: v.id("users"),
    theoryId: v.id("theories"),
    unlockedAt: v.number(), // Timestamp when unlocked
    usedKey: v.boolean(), // Whether a key was used to unlock
  })
    .index("by_user_id", ["userId"])
    .index("by_user_and_theory", ["userId", "theoryId"]),
});
