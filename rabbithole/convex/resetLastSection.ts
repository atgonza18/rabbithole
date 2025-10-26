import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Reset the last section of Berenstain Bears theory for testing unlock flow
 */
export const resetBerenstainLastSection = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Get mock user
    const mockUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "mock@example.com"))
      .first();

    if (!mockUser) {
      console.log("No mock user found");
      return null;
    }

    // Get Berenstain Bears theory
    const theory = await ctx.db
      .query("theories")
      .filter((q) => q.eq(q.field("title"), "The Berenstain Bears Conspiracy"))
      .first();

    if (!theory) {
      console.log("Theory not found");
      return null;
    }

    // Get user progress for this theory
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_and_theory", (q) =>
        q.eq("userId", mockUser._id).eq("theoryId", theory._id)
      )
      .first();

    if (!progress) {
      console.log("No progress found");
      return null;
    }

    // Get all sections
    const sections = await ctx.db
      .query("theorySections")
      .withIndex("by_theory_id", (q) => q.eq("theoryId", theory._id))
      .collect();

    // Get the last section (highest order)
    const lastSection = sections.sort((a, b) => b.order - a.order)[0];

    if (!lastSection) {
      console.log("No sections found");
      return null;
    }

    // Get all pages from the last section
    const allPages = await ctx.db
      .query("theoryPages")
      .withIndex("by_section_id", (q) => q.eq("sectionId", lastSection._id))
      .collect();

    const lastSectionPageIds = allPages.map((p) => p._id);

    // Remove last section pages from completed
    const newCompletedPages = progress.completedPageIds.filter(
      (pageId) => !lastSectionPageIds.includes(pageId)
    );

    // Update progress - mark as incomplete, remove key
    await ctx.db.patch(progress._id, {
      completedPageIds: newCompletedPages,
      isCompleted: false,
      keyAwarded: false,
    });

    console.log(
      `✅ Reset last section "${lastSection.title}". Removed ${lastSectionPageIds.length} pages.`
    );
    console.log("You can now complete the last section again to trigger unlock!");

    return null;
  },
});
