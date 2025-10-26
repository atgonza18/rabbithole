import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * RESET DATABASE - Use with caution!
 * Deletes all data. Run seedBerenstain:seedBerenstainBears after this.
 */
export const clearAllData = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    console.log("Starting database clear...");

    // Delete all data in reverse order of dependencies
    const tables = [
      "userProgress",
      "theoryUnlocks",
      "questions",
      "theoryPages",
      "theorySections",
      "theories",
      "users",
    ];

    let totalDeleted = 0;

    for (const table of tables) {
      const docs = await ctx.db.query(table as any).collect();
      console.log(`Deleting ${docs.length} documents from ${table}...`);
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
        totalDeleted++;
      }
    }

    const message = `Database cleared! Deleted ${totalDeleted} documents. Now run seedBerenstain:seedBerenstainBears to create new data.`;
    console.log(message);
    return message;
  },
});
