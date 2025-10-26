import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed file for Mattress Firm conspiracy theory
 * Too many stores in impossible locations = money laundering operation
 */

export const seedMattressFirm = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Create the theory
    const theoryId = await ctx.db.insert("theories", {
      title: "The Mattress Firm Conspiracy",
      description: "3,500 stores. Empty parking lots. Nobody ever inside. The math doesn't add up. Unless selling mattresses isn't the real business.",
      difficulty: "beginner" as const,
      order: 7,
      icon: "🛏️",
      isLocked: true,
      estimatedTimeMinutes: 40,
    });

    // ==================== SECTION 1: The Observation ====================
    const section1Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Observation",
      description: "When was the last time you saw someone in a Mattress Firm?",
      order: 1,
    });

    // Section 1 - Page 1: Too Many Stores
    const s1p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Drive Down Any Street</h2>

<p class="mb-4 leading-relaxed">Pull up Google Maps. Search "Mattress Firm" in any major US city.</p>

<p class="mb-4 leading-relaxed">Los Angeles: <strong class="text-white">250+ locations</strong></p>
<p class="mb-4 leading-relaxed">Houston: <strong class="text-white">150+ locations</strong></p>
<p class="mb-4 leading-relaxed">Chicago: <strong class="text-white">120+ locations</strong></p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">Sometimes three on the same block.</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Impossible Density</p>
  <p class="text-slate-300">In 2016, a Redditor noticed 4 Mattress Firm stores within a 1-mile radius in Tucson, Arizona. Each one had an empty parking lot.</p>
  <p class="text-slate-300 mt-2">No business operates like this. Except one that doesn't actually need customers.</p>
</div>

<p class="mb-4 leading-relaxed">Walk by any Mattress Firm. Peer through the windows.</p>

<p class="mb-4 leading-relaxed">The lights are on. The signs say OPEN. But <em class="text-yellow-300">there's never anyone inside</em>.</p>

<p class="mb-4 leading-relaxed">No customers browsing. No salespeople greeting. Just rows of mattresses under fluorescent lights.</p>

<p class="text-center text-2xl my-6 text-red-400">How does a business survive with no customers?</p>`,
      hasQuestion: true,
    });

    // Question 1: Memory Verification
    await ctx.db.insert("questions", {
      pageId: s1p1,
      questionType: "multiple_choice",
      questionText: "Think about the Mattress Firms in your area. When was the last time you saw a customer inside one?",
      options: [
        { id: "a", text: "I've never actually seen anyone inside" },
        { id: "b", text: "Maybe once or twice in my entire life" },
        { id: "c", text: "I actively avoid looking because it's eerie" },
        { id: "d", text: "I never noticed until right now how empty they always are" },
      ],
      explanation: "The absence of customers is the first clue. You've driven past dozens, maybe hundreds of times. Lights on, doors unlocked, signs advertising sales. But the parking lots are always empty. The stores are always vacant. And somehow, they stay in business year after year. Your memory isn't faulty—the emptiness is real."
    });

    // Section 1 - Page 2: The Math Doesn't Work
    const s1p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Run the Numbers</h2>

<p class="mb-4 leading-relaxed">Let's do some basic math.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">How often do you buy a mattress?</strong> Every 7-10 years, on average.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">How many people live near each store?</strong> Let's be generous: 50,000.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">How many sales does that generate per year?</strong> About 5,000-7,000 potential customers annually.</p>

<p class="mb-4 leading-relaxed">Sounds good, right? Except:</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The Overhead Problem</p>
  <p class="text-slate-300">Each Mattress Firm store costs roughly:</p>
  <p class="text-slate-300">• Rent: $5,000-15,000/month<br/>
  • Utilities: $1,000-2,000/month<br/>
  • Staff: $3,000-5,000/month<br/>
  • Inventory: $50,000-100,000 upfront</p>
  <p class="text-slate-300 mt-2"><strong class="text-yellow-400">Minimum to break even: ~$120,000-250,000/year</strong></p>
  <p class="text-slate-300 mt-2">That means each store needs to sell roughly 15-30 mattresses per month, every month, forever.</p>
</div>

<p class="mb-4 leading-relaxed">But when you walk by, you never see sales happening.</p>

<p class="mb-4 leading-relaxed">When you search for reviews, most locations have under 20.</p>

<p class="mb-4 leading-relaxed">When you check their parking lots at peak shopping hours on Saturdays... <em class="text-red-400">empty</em>.</p>

<p class="text-center text-xl my-6 text-slate-400">The math doesn't work.</p>

<p class="mb-4 leading-relaxed">Unless the mattresses aren't the product.</p>`,
      hasQuestion: true,
    });

    // Question 2: Scenario Choice
    await ctx.db.insert("questions", {
      pageId: s1p2,
      questionType: "multiple_choice",
      questionText: "A business with empty stores, minimal sales, and massive overhead somehow stays profitable. How?",
      options: [
        { id: "a", text: "They make enough profit per mattress to survive" },
        { id: "b", text: "Online sales subsidize the physical locations" },
        { id: "c", text: "The stores serve a purpose other than selling mattresses" },
        { id: "d", text: "I can't think of a legitimate explanation that makes sense" },
      ],
      explanation: "Every explanation has problems. High profit margins don't help if you're not selling volume. Online sales don't explain why you need 3 stores on the same street. And if the stores aren't for selling mattresses... what are they for? The financial impossibility is the foundation of the conspiracy. When legal business models fail to explain survival, illegal ones start looking plausible."
    });

    // Section 1 - Page 3: The Mysterious Merger
    const s1p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Sleepys Acquisition</h2>

<p class="mb-4 leading-relaxed">In 2016, Mattress Firm bought Sleepys—a competitor with 1,050 stores—for <strong class="text-white">$780 million</strong>.</p>

<p class="mb-4 leading-relaxed">This created the most bizarre situation in retail:</p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">Mattress stores literally across the street from each other.</p>

<p class="mb-4 leading-relaxed">Instead of closing redundant locations, they kept them all open. Same company. Same products. Sometimes <em class="text-yellow-300">sharing a parking lot</em>.</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Cannibalization Strategy</p>
  <p class="text-slate-300">Business 101: Don't compete with yourself.</p>
  <p class="text-slate-300 mt-2">When McDonald's buys a Burger King, they rebrand or close it. When CVS buys Rite Aid, they consolidate locations.</p>
  <p class="text-slate-300 mt-2">When Mattress Firm bought Sleepys, they operated both stores in direct competition with each other.</p>
  <p class="text-slate-300 mt-2"><strong class="text-red-400">Unless the point wasn't selling mattresses.</strong></p>
</div>

<p class="mb-4 leading-relaxed">Two years later, in 2018, Mattress Firm filed for bankruptcy.</p>

<p class="mb-4 leading-relaxed">They closed 700 stores. But somehow, <strong class="text-white">2,800 remained open</strong>.</p>

<p class="mb-4 leading-relaxed">Still too many. Still mostly empty.</p>

<p class="text-center text-2xl my-6 text-red-400">Still in business.</p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 2: The Money Laundering Theory ====================
    const section2Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Money Laundering Theory",
      description: "The perfect front.",
      order: 2,
    });

    // Section 2 - Page 1: How Money Laundering Works
    const s2p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Perfect Front Business</h2>

<p class="mb-4 leading-relaxed">Money laundering requires a business where:</p>

<p class="mb-4 leading-relaxed">
1. <strong class="text-white">Cash transactions are common</strong> (no paper trail)<br/>
2. <strong class="text-white">Inventory is difficult to verify</strong> (who's counting mattresses?)<br/>
3. <strong class="text-white">High-ticket items justify large deposits</strong> ($1,000+ per "sale")<br/>
4. <strong class="text-white">Low foot traffic won't raise suspicions</strong> (mattresses are infrequent purchases)
</p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">Mattress stores check every single box.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The Laundering Process</p>
  <p class="text-slate-300"><strong>Step 1:</strong> Dirty money comes in (drugs, illegal operations, etc.)</p>
  <p class="text-slate-300 mt-2"><strong>Step 2:</strong> Store reports fake "sales" to the IRS<br/>
  "We sold 25 mattresses this week at $1,200 each = $30,000 revenue"</p>
  <p class="text-slate-300 mt-2"><strong>Step 3:</strong> Deposit the dirty money as legitimate business income</p>
  <p class="text-slate-300 mt-2"><strong>Step 4:</strong> Pay taxes on it (small price for clean money)</p>
  <p class="text-slate-300 mt-2"><strong>Result:</strong> Illegal money is now legal, taxed business revenue</p>
</div>

<p class="mb-4 leading-relaxed">The beauty of mattresses: they're bulky, easily destroyed, and nobody's auditing inventory.</p>

<p class="mb-4 leading-relaxed">Did you sell 25 mattresses or 5? <em class="text-yellow-300">Who's checking?</em></p>

<p class="mb-4 leading-relaxed">Do those 30 mattresses in the back actually exist? <em class="text-yellow-300">Who's counting?</em></p>

<p class="text-center text-xl my-6 text-slate-400">The IRS sees receipts. Not mattresses.</p>`,
      hasQuestion: true,
    });

    // Question 3: Belief Resonance
    await ctx.db.insert("questions", {
      pageId: s2p1,
      questionType: "multiple_choice",
      questionText: "If mattress stores were fronts for money laundering, what would be the hardest thing to explain away?",
      options: [
        { id: "a", text: "The absurd number of locations in impossible proximity" },
        { id: "b", text: "The fact that they stay open despite zero visible business" },
        { id: "c", text: "The high-dollar transactions that are hard to trace" },
        { id: "d", text: "All of it—every part of the business model screams 'front'" },
      ],
      explanation: "Each element of suspicion reinforces the others. The store density creates plausible deniability ('We're just competitive!'). The empty stores avoid witnesses. The high-ticket items justify large deposits. When every 'flaw' in the business model serves a laundering purpose, coincidence becomes harder to believe. The question isn't whether one thing is suspicious—it's whether this many things can be coincidence."
    });

    // Section 2 - Page 2: The Ownership Trail
    const s2p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Who Actually Owns Mattress Firm?</h2>

<p class="mb-4 leading-relaxed">Follow the money. That's where it gets interesting.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">2016:</strong> Steinhoff International (South African retail conglomerate) acquires Mattress Firm for $3.8 billion</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">2017:</strong> Steinhoff discovers "accounting irregularities" and loses 90% of its stock value</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">2018:</strong> Mattress Firm files for bankruptcy</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">2018-Present:</strong> Owned by private equity firm Advent International</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Accounting Irregularities</p>
  <p class="text-slate-300">Steinhoff's scandal involved:</p>
  <p class="text-slate-300">• Inflated profits and assets<br/>
  • Fabricated transactions<br/>
  • Offshore companies with unclear ownership<br/>
  • €6.5 billion in fraudulent accounting</p>
  <p class="text-slate-300 mt-2">Mattress Firm was acquired during the height of this fraud.</p>
  <p class="text-slate-300 mt-2"><strong class="text-red-400">What better way to launder money than through a company already laundering money?</strong></p>
</div>

<p class="mb-4 leading-relaxed">Private equity firms like Advent operate in opacity. Layers of LLCs, offshore accounts, shell companies.</p>

<p class="mb-4 leading-relaxed">Good for business privacy. Also good for hiding <em class="text-yellow-300">where the money actually comes from</em>.</p>

<p class="text-center text-2xl my-6 text-red-400">The ownership trail is deliberately complex.</p>`,
      hasQuestion: true,
    });

    // Question 4: Experiential Poll
    await ctx.db.insert("questions", {
      pageId: s2p2,
      questionType: "multiple_choice",
      questionText: "A company worth billions has massive accounting fraud, then gets bought by private equity. Your reaction?",
      options: [
        { id: "a", text: "Fraud happens in retail - doesn't mean laundering" },
        { id: "b", text: "The complexity of ownership is designed to hide something" },
        { id: "c", text: "This is exactly how you'd structure a laundering operation" },
        { id: "d", text: "I need to know more before I draw conclusions" },
      ],
      explanation: "Corporate fraud and money laundering often overlap. The question is whether the fraud was incidental or instrumental—a byproduct of normal greed, or essential to the business model. When ownership changes hands during fraud investigations, it can be a rescue or a handoff. Either way, the new owners inherit the infrastructure. And if that infrastructure was designed to move money invisibly, it doesn't stop working just because the nameplate changed."
    });

    // Section 2 - Page 3: The Evidence
    const s2p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Patterns</h2>

<p class="mb-4 leading-relaxed">Reddit users, curious locals, and conspiracy theorists have documented:</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">Documented Anomalies</p>
  <p class="text-slate-300"><strong>Empty stores with full staff:</strong> Employees sitting idle for hours, getting paid despite zero sales</p>
  <p class="text-slate-300 mt-2"><strong>Deliveries that don't make sense:</strong> Trucks arriving at 2 AM with unmarked cargo</p>
  <p class="text-slate-300 mt-2"><strong>Stores in impossible locations:</strong> High-rent districts where mattress sales couldn't possibly cover overhead</p>
  <p class="text-slate-300 mt-2"><strong>Financial discrepancies:</strong> Stores reporting revenue that seems mathematically impossible given foot traffic</p>
</div>

<p class="mb-4 leading-relaxed">One former employee posted anonymously: <em class="text-slate-400">"We had months where we didn't sell a single mattress, but the store stayed open. Manager said corporate was 'handling it.'"</em></p>

<p class="mb-4 leading-relaxed">Another: <em class="text-slate-400">"We'd get bonuses during zero-sale months. I never understood where the money came from."</em></p>

<p class="mb-4 leading-relaxed">Security camera footage shows stores sitting empty for 8-hour shifts. No customers. No sales. Just lights on and doors unlocked.</p>

<p class="text-center text-xl my-6 text-slate-400">These aren't stores. They're fronts.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">And they're hiding in plain sight.</strong></p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 3: The Counterarguments ====================
    const section3Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Counterarguments",
      description: "What skeptics say, and why they're wrong.",
      order: 3,
    });

    // Section 3 - Page 1: But It's Just Bad Business
    const s3p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">"It's Just Bad Business Strategy"</h2>

<p class="mb-4 leading-relaxed">The official explanation: Mattress Firm over-expanded during an aggressive growth phase, made poor real estate decisions, and is now stuck in long-term leases.</p>

<p class="mb-4 leading-relaxed">Skeptics say: <em class="text-slate-400">"Hanlon's Razor—never attribute to malice what can be explained by incompetence."</em></p>

<p class="mb-4 leading-relaxed">But here's the problem with that:</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The Incompetence Would Be Unprecedented</p>
  <p class="text-slate-300"><strong>Bad business</strong> = Closing stores, cutting losses, optimizing locations</p>
  <p class="text-slate-300 mt-2"><strong>Mattress Firm</strong> = Opening MORE stores in saturated markets, keeping unprofitable locations open for years, expanding despite negative cash flow</p>
  <p class="text-slate-300 mt-2">This isn't incompetence. Incompetent businesses fail. Mattress Firm <em class="text-yellow-300">thrives</em>.</p>
</div>

<p class="mb-4 leading-relaxed">They filed bankruptcy and emerged <strong class="text-white">stronger</strong>. They closed 700 stores and still operate 2,800. They've been "failing" for over a decade.</p>

<p class="text-center text-2xl my-6 text-yellow-400">That's not incompetence. That's a business model.</p>`,
      hasQuestion: true,
    });

    // Question 5: Scenario Choice
    await ctx.db.insert("questions", {
      pageId: s3p1,
      questionType: "multiple_choice",
      questionText: "A business operates unprofitably for years, files bankruptcy, then continues with minimal changes. What explains this?",
      options: [
        { id: "a", text: "Incredible incompetence at the executive level" },
        { id: "b", text: "Hidden revenue streams not visible to the public" },
        { id: "c", text: "The bankruptcy was strategic, not genuine" },
        { id: "d", text: "The visible business is a cover for the invisible one" },
      ],
      explanation: "Bankruptcy should kill a failing business or force radical change. When neither happens, the business either has resources you can't see or purposes you don't know about. Incompetence severe enough to destroy a company doesn't usually cure itself. If Mattress Firm's problems were real, the solutions would be visible—closures, rebranding, consolidation. Instead, everything stays mostly the same. Which suggests the 'problems' were never actually problems."
    });

    // Section 3 - Page 2: The Online Sales Argument
    const s3p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">"They Make Money Online"</h2>

<p class="mb-4 leading-relaxed">Another explanation: Most sales happen online, and the physical stores are just showrooms.</p>

<p class="mb-4 leading-relaxed">Sounds reasonable, except:</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Showroom Problem</p>
  <p class="text-slate-300">If stores are showrooms, you'd expect:</p>
  <p class="text-slate-300">• Smaller locations (don't need warehouse space)<br/>
  • Prime, high-traffic locations (want visibility)<br/>
  • Aggressive online marketing<br/>
  • Staff trained to convert showroom visits to online sales</p>
  <p class="text-slate-300 mt-2">Instead, Mattress Firm has:</p>
  <p class="text-slate-300">• Massive stores with full inventory<br/>
  • Locations in strip malls and low-traffic areas<br/>
  • Minimal online presence compared to competitors<br/>
  • Staff who seem surprised when customers enter</p>
</div>

<p class="mb-4 leading-relaxed">Compare to actual showroom-model businesses like Warby Parker or Casper (ironic—a mattress company). Small locations. High-traffic areas. Heavy online integration.</p>

<p class="mb-4 leading-relaxed">Mattress Firm doesn't follow the showroom model. It follows the <em class="text-yellow-300">"keep the lights on and doors locked"</em> model.</p>

<p class="text-center text-xl my-6 text-slate-400">If online sales were the answer, they'd build for online sales.</p>

<p class="mb-4 leading-relaxed">They didn't.</p>`,
      hasQuestion: false,
    });

    // Section 3 - Page 3: Why Would They Risk It?
    const s3p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">"The Risk Is Too High"</h2>

<p class="mb-4 leading-relaxed">The final counterargument: Why would a major corporation risk federal money laundering charges for... what? Drug money?</p>

<p class="mb-4 leading-relaxed">Here's why they would:</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The Risk-Reward Calculation</p>
  <p class="text-slate-300"><strong>Potential profit from laundering:</strong> Hundreds of millions to billions annually</p>
  <p class="text-slate-300 mt-2"><strong>Likelihood of getting caught:</strong> Extremely low</p>
  <p class="text-slate-300 mt-2"><strong>Why?</strong></p>
  <p class="text-slate-300">• IRS doesn't audit every business<br/>
  • Mattress sales are cash-heavy and hard to verify<br/>
  • Even if investigated, proving intent is nearly impossible<br/>
  • Worst case: Fines and reorganization (see: every major bank that's been caught laundering)</p>
</div>

<p class="mb-4 leading-relaxed">Major banks have been caught laundering cartel money and paid fines without executives going to jail. HSBC laundered $881 million for cartels—paid a fine, moved on.</p>

<p class="mb-4 leading-relaxed">If you're already connected to organizations that need money laundered, the risk calculation changes:</p>

<p class="mb-4 leading-relaxed"><em class="text-yellow-300">Risk of getting caught and prosecuted: 5%</em><br/>
<em class="text-red-400">Risk of refusing the organization that asked you to launder: 100% fatal</em></p>

<p class="text-center text-2xl my-6 text-slate-400">Sometimes you launder because saying no isn't an option.</p>`,
      hasQuestion: true,
    });

    // Question 6: Belief Resonance
    await ctx.db.insert("questions", {
      pageId: s3p3,
      questionType: "multiple_choice",
      questionText: "If you ran a struggling retail chain and someone offered to keep you afloat by laundering money through your stores, what would you do?",
      options: [
        { id: "a", text: "Refuse immediately - it's illegal and wrong" },
        { id: "b", text: "Consider it if it meant saving thousands of jobs" },
        { id: "c", text: "Refuse, but understand why someone might say yes" },
        { id: "d", text: "The choice might not be yours if the 'offer' comes from the wrong people" },
      ],
      explanation: "Moral clarity is easier in hypotheticals than in boardrooms with millions in debt and threats implicit or explicit. Most laundering operations don't start as criminal enterprises—they start as legitimate businesses that get approached, pressured, or slowly corrupted. By the time you realize what you're part of, walking away might not be safe. The conspiracy theory isn't that Mattress Firm was built to launder money. It's that somewhere along the way, someone made an offer that was too dangerous to refuse."
    });

    // ==================== SECTION 4: The Implications ====================
    const section4Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Implications",
      description: "If it's true, what does it mean?",
      order: 4,
    });

    // Section 4 - Page 1: It's Everywhere
    const s4p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">If Mattress Firm, Then What Else?</h2>

<p class="mb-4 leading-relaxed">Here's the uncomfortable part:</p>

<p class="mb-4 leading-relaxed">If Mattress Firm is a front, it's not the only one.</p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">How many other "struggling retailers" are actually laundering operations?</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Pattern Recognition Game</p>
  <p class="text-slate-300">Look for businesses with:</p>
  <p class="text-slate-300">• Too many locations for their traffic<br/>
  • Empty stores during peak hours<br/>
  • High-dollar items with hard-to-verify inventory<br/>
  • Cash-heavy transactions<br/>
  • Mysterious survival despite poor performance</p>
  <p class="text-slate-300 mt-2">Once you see the pattern, you can't unsee it.</p>
</div>

<p class="mb-4 leading-relaxed">Furniture stores with zero customers. Rug shops in premium locations. Vape shops on every corner.</p>

<p class="mb-4 leading-relaxed">How many are legitimate? How many are fronts?</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">You'll never know for certain.</strong> That's the genius of it.</p>

<p class="mb-4 leading-relaxed">Hidden in plain sight. Normalized. Unremarkable.</p>

<p class="text-center text-2xl my-6 text-red-400">The conspiracy isn't that it exists.</p>

<p class="mb-4 leading-relaxed">It's that it's <em class="text-yellow-300">everywhere</em>, and we can't tell which is which.</p>`,
      hasQuestion: true,
    });

    // Question 7: Final Thought
    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "Now that you've seen the pattern, what will you do when you drive past a suspiciously empty store?",
      options: [
        { id: "a", text: "Nothing - even if it's true, it doesn't affect me" },
        { id: "b", text: "Wonder, but never really know for sure" },
        { id: "c", text: "Start noticing how many businesses fit the pattern" },
        { id: "d", text: "Realize I can't ever look at retail the same way again" },
      ],
      explanation: "Conspiracy theories change how you see the world. Whether Mattress Firm is laundering money or not, you'll never drive past one without wondering. You'll never see an empty store without asking: legitimate business struggling to survive, or front operation hiding in plain sight? The uncertainty is permanent. The pattern recognition is permanent. And once you start seeing it in mattress stores, you see it everywhere else too."
    });

    // Section 4 - Page 2: The Question
    const s4p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Question You Can't Answer</h2>

<p class="mb-4 leading-relaxed">Here's what you're left with:</p>

<p class="mb-4 leading-relaxed">Either:</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">Option A:</strong> Mattress Firm is the most incompetently run business in American history, sustained for decades by sheer luck and market conditions that defy all retail logic.</p>

<p class="mb-4 leading-relaxed">Or:</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">Option B:</strong> It's a front for money laundering, operating with impunity because the system is designed to let certain crimes slide as long as they're profitable to the right people.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">Occam's Razor Says:</p>
  <p class="text-slate-300">The simplest explanation is usually correct.</p>
  <p class="text-slate-300 mt-2">Which is simpler?</p>
  <p class="text-slate-300 mt-2">• A decades-long streak of catastrophic business decisions that somehow never kill the company</p>
  <p class="text-slate-300 mt-2">• A profitable illegal operation disguised as a legal business</p>
</div>

<p class="mb-4 leading-relaxed">You'll never have proof. That's intentional.</p>

<p class="mb-4 leading-relaxed">You'll never see the real books. That's the point.</p>

<p class="mb-4 leading-relaxed">All you have is the pattern. The absurdity. The impossibility of it all.</p>

<p class="text-center text-xl my-6 text-slate-400">And the certainty that something isn't right.</p>

<p class="mb-4 leading-relaxed">Next time you drive past a Mattress Firm, look inside.</p>

<p class="mb-4 leading-relaxed">No customers. Never customers.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">Just lights on and doors unlocked.</strong></p>

<p class="mb-4 leading-relaxed">Ask yourself:</p>

<p class="text-center text-2xl my-6 text-yellow-400">Who is this store really for?</p>`,
      hasQuestion: false,
    });

    console.log("Mattress Firm conspiracy theory seeded successfully");
    return null;
  },
});
