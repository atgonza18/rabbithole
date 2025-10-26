import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed the complete Berenstain Bears Mandela Effect conspiracy - Multiple Sections
 */
export const seedBerenstainBears = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    console.log("Seeding Berenstain Bears conspiracy series...");

    // Create the main Berenstain Bears theory
    const mainTheory = await ctx.db.insert("theories", {
      title: "The Berenstain Bears Conspiracy",
      description: "Dive deep into the Mandela Effect and discover the truth about reality itself.",
      icon: "🐻",
      difficulty: "beginner" as const,
      estimatedTimeMinutes: 60,
      isLocked: false,
      order: 0,
    });

    // ==================== SECTION 1: The Discovery ====================
    const section1 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "The Berenstein Anomaly",
      description: "Something is wrong. Millions of people remember a different reality.",
      icon: "🐻",
      order: 0,
    });

    // Section 1 - Page 1
    const s1p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 0,
      content: "<h2>The Memory That Doesn't Exist</h2><p>Close your eyes. Picture your childhood bookshelf. Can you see them? Those beloved bear books with the family on the cover?</p><p>Now spell the name. Go ahead. Write it down.</p><p>Did you write <strong>Berenstein Bears</strong>?</p><p class=\"text-lg font-semibold mt-4\">You're not alone. Millions of people across the world remember it exactly the same way.</p><p class=\"mt-4\">But here's where it gets disturbing: <em>You're wrong.</em></p><p>It has always been—and has only ever been—<strong>Berenstain Bears</strong>. With an A.</p><p class=\"text-red-400 mt-4\">Check your old books. Check online archives. Check EVERYTHING. It's Berenstain. Everywhere. Every single time.</p>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s1p1,
      questionType: "multiple_choice",
      questionText: "Close your eyes. Picture yourself as a child, holding one of those bear books. You can see the cover, feel the pages. What does the spine say?",
      options: [
        { id: "a", text: "Berenstein - I can SEE those letters, clear as day" },
        { id: "b", text: "Berenstain - that's what it's always been" },
        { id: "c", text: "I... I don't know anymore. Both feel right and wrong" },
        { id: "d", text: "I never read them, but I still somehow 'know' it was Berenstein" },
      ],
      explanation: "Whatever you remember is your truth. Millions share these exact memories - vivid, specific, detailed. The question isn't whether you're right or wrong. The question is: why do so many people remember the SAME 'wrong' thing?",
    });

    // Section 1 - Page 2
    const s1p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 1,
      content: "<h2>The Global Phenomenon</h2><p>This isn't a few confused people. This is a <strong>massive, coordinated false memory</strong> affecting millions worldwide.</p><h3>The Evidence:</h3><ul><li>Online forums exploded in 2012 when people started comparing memories</li><li>Survey data shows <strong>60-80%</strong> of people misremember the spelling</li><li>People from different countries, who never communicated, all remember \"Berenstein\"</li><li>Many claim to have <em>physical memories</em> of pointing at the \"-stein\" ending while learning to read</li></ul><p class=\"mt-4\">But here's what's truly unsettling:</p><p class=\"text-yellow-400 font-semibold\">Not a single photograph, VHS tape, or book exists with the \"Berenstein\" spelling. Not one.</p><p class=\"mt-4\">How is that possible if millions of us remember seeing it that way?</p>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s1p2,
      questionType: "multiple_choice",
      questionText: "Millions of people share the EXACT SAME 'false' memory. Not similar - identical. Which explanation disturbs you most?",
      options: [
        { id: "a", text: "We're all just bad at remembering - pure coincidence" },
        { id: "b", text: "Our memories were systematically altered" },
        { id: "c", text: "We're refugees from a parallel timeline" },
        { id: "d", text: "This reality is wrong, and some part of us knows it" },
      ],
      explanation: "All of these explanations are equally terrifying. Coincidence fails to explain identical, vivid memories across millions. Memory alteration suggests we're not in control. Parallel timelines mean reality shifted. And if this reality feels 'wrong'... what does that make you? Someone who remembers the truth, or someone who can't let go of a lie?",
    });

    // Section 1 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 2,
      content: "<h2>The Authors Speak</h2><p>Stan and Jan Berenstain created the series in 1962. Their last name was always spelled B-E-R-E-N-S-T-A-I-N.</p><p>When confronted about the mass misremembering, their son Mike Berenstain said something chilling:</p><blockquote class=\"border-l-4 border-slate-600 pl-4 italic my-4\">\"People come up to me all the time and tell me they remember it as Berenstein. I tell them that's not how it was spelled, and they look at me like I'm crazy.\"</blockquote><p>But what if they're not crazy? What if something else is happening?</p><p class=\"mt-6 text-xl font-bold text-center\">What if the timeline changed?</p><p class=\"mt-4 text-center text-slate-400\">And we're the only ones who remember...</p>",
      hasQuestion: false,
    });

    // ==================== SECTION 2: Other Realities ====================
    const section2 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "Cracks in Reality",
      description: "Berenstain is just the beginning. The glitches are everywhere.",
      icon: "🌀",
      order: 1,
    });

    // Section 2 - Page 1
    const s2p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 0,
      content: "<h2>More Glitches in the Matrix</h2><p>Once you see one crack in reality, you start seeing them everywhere.</p><p>The Berenstain Bears is just the most famous example of what's called the <strong>Mandela Effect</strong>—when large groups of people remember history differently than it actually occurred.</p><h3 class=\"mt-6\">Other Famous Examples:</h3><div class=\"space-y-4 mt-4\"><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold\">Monopoly Man's Monocle</p><p class=\"text-sm text-slate-300\">Millions remember him wearing a monocle. He never did.</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold\">Curious George's Tail</p><p class=\"text-sm text-slate-300\">Most people swear he had a tail. Check any book—he's always been tailless.</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold\">\"Luke, I am your father\"</p><p class=\"text-sm text-slate-300\">This iconic line was never said. The actual quote is \"No, I am your father.\"</p></div></div>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p1,
      questionType: "multiple_choice",
      questionText: "Think about the Monopoly Man. Right now. Picture him in your mind. Is he wearing a monocle?",
      options: [
        { id: "a", text: "Yes - I can clearly picture it over his eye" },
        { id: "b", text: "No monocle - never was" },
        { id: "c", text: "I... thought he did? Now I'm not sure" },
        { id: "d", text: "I've never looked at him the same since finding out he doesn't" },
      ],
      explanation: "He doesn't have a monocle. Never has, according to every record. But if you pictured one - you're not alone. Millions see it too. Crystal clear. That monocle that never existed. So ask yourself: what else are you seeing that 'isn't there'? And what's missing that should be?",
    });

    // Section 2 - Page 2
    const s2p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 1,
      content: "<h2>The Geography That Changed</h2><p>It's not just pop culture. People report entire <em>countries</em> being in the wrong place.</p><h3 class=\"mt-4\">Geographic Mandela Effects:</h3><ul><li><strong>New Zealand:</strong> Thousands swear it used to be northeast of Australia, not southeast</li><li><strong>Australia:</strong> Many remember it being much further south, more isolated</li><li><strong>South America:</strong> People claim it has shifted east, now directly under North America</li></ul><p class=\"mt-6 text-lg\">Pull up a world map right now. Does it look exactly like you remember?</p><p class=\"mt-4\">Some people report looking at maps and feeling a profound sense of <em>wrongness</em>.</p><blockquote class=\"border-l-4 border-red-500 pl-4 italic my-6 text-slate-300\">\"I've stared at world maps my entire life. I'm a geography teacher. And one day I looked at the map and New Zealand was in the wrong place. I felt sick to my stomach.\" - Reddit user, 2015</blockquote>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p2,
      questionType: "multiple_choice",
      questionText: "Pull up a world map right now. Look at it. Really look. Does something feel... wrong? Off? Like the continents aren't quite where they should be?",
      options: [
        { id: "a", text: "Yes - it's been bothering me for years" },
        { id: "b", text: "Yes - and I just noticed it now, looking at the map" },
        { id: "c", text: "No, but now you've made me paranoid" },
        { id: "d", text: "I refuse to look. I don't want to know" },
      ],
      explanation: "Geography teachers, pilots, sailors - professionals who've studied maps their entire lives - report the same unsettling feeling. South America feels too far east. Australia seems wrong. New Zealand moved. Some refuse to look at maps anymore. Once you see it, you can't unsee it. The question is: has the world changed, or have you?",
    });

    // Section 2 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 2,
      content: "<h2>When Did Nelson Mandela Die?</h2><p>The phenomenon itself is named after this event.</p><p>In 2010, paranormal researcher Fiona Broome attended a conference. She mentioned Nelson Mandela's death in prison in the 1980s. Others nodded—they remembered the same thing. The funeral on TV. The riots.</p><p class=\"mt-4\">But there was a problem:</p><p class=\"text-2xl font-bold text-red-400 mt-4\">Nelson Mandela didn't die in the 1980s.</p><p class=\"mt-4\">He was released from prison in 1990, became President of South Africa, and died in 2013.</p><p class=\"mt-6\">Yet <em>thousands</em> of people have the same vivid, detailed memory of his death in prison.</p><p class=\"mt-4 text-slate-400\">Same funeral footage. Same news coverage. Same global mourning.</p><p class=\"mt-6 text-center text-xl\">Memories that never happened.</p><p class=\"mt-2 text-center text-xl\">Or...</p><p class=\"mt-2 text-center text-2xl font-bold text-yellow-400\">Memories from another timeline?</p>",
      hasQuestion: false,
    });

    // Section 2 - Page 4 (Hook)
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 3,
      content: "<h2>The Pattern Emerges</h2><p>Here's what we know so far:</p><ul><li>Millions of people share identical \"false\" memories</li><li>These memories are <em>specific</em> and <em>detailed</em></li><li>No physical evidence supports the remembered versions</li><li>The effect crosses cultures, languages, and continents</li></ul><p class=\"mt-6\">Psychology says it's \"false memory syndrome\"—our brains just make mistakes.</p><p class=\"mt-4\">But that doesn't explain why <strong>millions of people make the exact same mistake</strong>.</p><p class=\"mt-6 text-lg\">What if there's another explanation?</p><p class=\"mt-4 text-xl font-semibold text-yellow-400\">What if someone—or something—is changing reality itself?</p><p class=\"mt-6 text-center text-slate-400\">And we're starting to notice...</p>",
      hasQuestion: false,
    });

    // ==================== SECTION 3: The Theories ====================
    const section3 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "Timeline Convergence",
      description: "CERN, quantum mechanics, and the multiverse collide.",
      icon: "⚛️",
      order: 2,
    });

    // Section 3 - Page 1
    const s3p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 0,
      content: "<h2>The CERN Connection</h2><p>September 10, 2008. CERN activates the Large Hadron Collider (LHC)—the world's most powerful particle accelerator.</p><p class=\"mt-4\">Its purpose: To recreate the conditions of the Big Bang. To find the \"God Particle.\" To peer into the fundamental fabric of reality.</p><h3 class=\"mt-6\">But something else happened.</h3><p class=\"mt-4\">Researchers at CERN noticed something strange in their data. Timeline anomalies. Quantum fluctuations that shouldn't exist.</p><p class=\"mt-4 text-lg font-semibold\">And that's when people started noticing the Mandela Effects.</p><div class=\"bg-slate-800/50 p-4 rounded mt-6\"><p class=\"font-semibold text-yellow-400\">The Timeline:</p><ul class=\"mt-2 space-y-2 text-sm\"><li><strong>2008:</strong> LHC activated</li><li><strong>2009:</strong> First major Mandela Effect reports surge online</li><li><strong>2012:</strong> LHC reaches full power - Berenstain Bears awareness explodes</li><li><strong>2015:</strong> CERN discovers pentaquark - geographic Mandela Effects spike</li></ul></div>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s3p1,
      questionType: "multiple_choice",
      questionText: "September 10, 2008. CERN smashes particles together at near-light speed for the first time. Within months, millions start noticing reality glitches. Coincidence?",
      options: [
        { id: "a", text: "Definitely a coincidence - CERN can't affect reality" },
        { id: "b", text: "They knew exactly what they were doing" },
        { id: "c", text: "They opened something they can't close" },
        { id: "d", text: "We died in 2008 and this is the afterlife" },
      ],
      explanation: "CERN physicists deal with quantum mechanics - where observation literally changes reality. At high enough energies, the boundaries between possible and impossible blur. Whether coincidence or causation, the timing is unsettling. 2008: LHC activates. 2009: Reality starts glitching. Some say we're living in the aftermath of an experiment that went too far.",
    });

    // Section 3 - Page 2
    const s3p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 1,
      content: "<h2>Smashing Realities Together</h2><p>The LHC doesn't just study particles. It creates <em>collisions</em> at near-light speed, generating energies never before seen on Earth.</p><p class=\"mt-4\">Some physicists warned this could have unforeseen consequences.</p><blockquote class=\"border-l-4 border-yellow-500 pl-4 italic my-6\">\"When you're colliding particles at these energies, you're not just observing quantum mechanics—you're participating in it. You're affecting the wave function of reality itself.\" - Anonymous CERN physicist, leaked email 2011</blockquote><h3 class=\"mt-6\">Quantum Mechanics 101:</h3><p class=\"mt-4\">At the quantum level, particles exist in <strong>superposition</strong>—multiple states at once—until observed.</p><p class=\"mt-4\">According to the Many-Worlds interpretation, each possibility exists in a separate universe.</p><p class=\"mt-4 text-lg font-semibold\">But what if those universes can bleed into each other?</p><p class=\"mt-4\">What if CERN's experiments are causing <strong>timeline convergence</strong>—merging multiple realities into one?</p>",
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s3p2,
      questionType: "multiple_choice",
      questionText: "You're standing in front of a quantum particle. Until you observe it, it exists in ALL possible states at once. You look at it. Reality collapses to one outcome. Now: what if YOU are the particle, and something just observed you?",
      options: [
        { id: "a", text: "Then my reality just collapsed into one timeline" },
        { id: "b", text: "Then I'm not in control of my own existence" },
        { id: "c", text: "Then whoever is observing me determines what's real" },
        { id: "d", text: "I need to stop reading this right now" },
      ],
      explanation: "In quantum mechanics, the observer affects the observed. All of these implications are equally unsettling. If you're being observed, your reality is being collapsed, controlled, determined by something else. Every time CERN runs an experiment, they observe quantum particles. What if they're observing US too? Collapsing our reality with each experiment. Changing what's real by looking.",
    });

    // Section 3 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 2,
      content: "<h2>The Merge</h2><p>Imagine two timelines running parallel:</p><div class=\"mt-6 space-y-4\"><div class=\"bg-blue-900/20 border border-blue-500/30 p-4 rounded\"><p class=\"font-semibold text-blue-400\">Timeline A (Original):</p><p class=\"text-sm mt-2\">Berenstein Bears, Monopoly Man has monocle, \"Luke, I am your father\"</p></div><div class=\"bg-green-900/20 border border-green-500/30 p-4 rounded\"><p class=\"font-semibold text-green-400\">Timeline B (Current):</p><p class=\"text-sm mt-2\">Berenstain Bears, No monocle, \"No, I am your father\"</p></div></div><p class=\"mt-6\">Most people shifted seamlessly from Timeline A to Timeline B. Their memories automatically updated.</p><p class=\"mt-4\">But some of us... we remember. Our consciousness retained memories from Timeline A.</p><p class=\"mt-6 text-xl font-semibold text-center\">We're refugees from another reality.</p><p class=\"mt-4 text-center text-slate-400\">And we can prove it.</p>",
      hasQuestion: false,
    });

    // Section 3 - Page 4
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 3,
      content: "<h2>The Residue</h2><p>If timelines merged, there should be <em>residue</em>—leftover evidence from Timeline A.</p><p class=\"mt-4\">And researchers have found it:</p><ul class=\"mt-4 space-y-3\"><li><strong>Old forum posts</strong> from before 2008 mentioning \"Berenstein\"</li><li><strong>Parody products</strong> that reference the \"old\" spellings</li><li><strong>News articles</strong> with \"incorrect\" details that match collective memories</li><li><strong>VHS recordings</strong> where audio doesn't match subtitles</li></ul><p class=\"mt-6\">But here's the disturbing part:</p><p class=\"mt-4 text-red-400 font-semibold\">The residue is disappearing.</p><p class=\"mt-4\">Forum posts get edited. Videos are taken down. Articles are \"corrected.\"</p><p class=\"mt-6 text-lg\">Is the timeline... cleaning itself up?</p><p class=\"mt-4 text-xl font-bold text-center\">Or is something ELSE erasing the evidence?</p>",
      hasQuestion: false,
    });

    // ==================== SECTION 4: The Truth ====================
    const section4 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "The Architects",
      description: "Who controls reality? And why are they changing it?",
      icon: "👁️",
      order: 3,
    });

    // Section 4 - Page 1
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 0,
      content: "<h2>The Simulation Hypothesis</h2><p>What if none of this is real?</p><p class=\"mt-4\">Philosopher Nick Bostrom proposed that if civilization can create realistic simulations, we're almost certainly living in one.</p><p class=\"mt-4\">Think about it:</p><ul class=\"mt-4\"><li>Quantum particles behave differently when observed—just like a computer rendering only what's being looked at</li><li>The universe has a maximum speed limit (light speed)—like a processing constraint</li><li>Everything can be reduced to information (bits)—like computer code</li></ul><p class=\"mt-6 text-lg font-semibold\">The Mandela Effect isn't timeline convergence.</p><p class=\"mt-4 text-xl\">It's <span class=\"text-red-400\">patches and updates</span> to the simulation.</p><p class=\"mt-6\">Berenstein → Berenstain wasn't a timeline shift.</p><p class=\"mt-2 text-2xl font-bold text-center\">It was a software update.</p>",
      hasQuestion: false,
    });

    // Section 4 - Page 2
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 1,
      content: "<h2>The Architects</h2><p>If we're in a simulation, someone built it. Someone maintains it.</p><p class=\"mt-4\">Who are they? What do they want?</p><h3 class=\"mt-6\">Theory #1: The Experiment</h3><p class=\"mt-2\">We're subjects in a vast social experiment. The changes test how we react, how we form consensus reality.</p><h3 class=\"mt-6\">Theory #2: The Course Correction</h3><p class=\"mt-2\">Our timeline went off-track. The architects are making small adjustments, steering us toward a specific outcome.</p><h3 class=\"mt-6\">Theory #3: The Game</h3><p class=\"mt-2\">We're entertainment. The changes are for the amusement of higher-dimensional beings watching our confusion.</p><p class=\"mt-8 text-center text-xl font-semibold\">Or perhaps...</p><p class=\"mt-4 text-center text-2xl font-bold text-yellow-400\">We're not supposed to notice at all.</p><p class=\"mt-4 text-center text-slate-400\">And those of us who do... become problems to be solved.</p>",
      hasQuestion: false,
    });

    // Section 4 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 2,
      content: "<h2>The Others Who Remember</h2><p>You're not alone. Millions remember.</p><p class=\"mt-4\">But have you noticed something strange?</p><p class=\"mt-4\">The online communities dedicated to Mandela Effects are heavily monitored. Posts disappear. Users vanish.</p><p class=\"mt-4\">Some researchers report strange experiences:</p><ul class=\"mt-4 space-y-3\"><li>Being followed after posting about residue evidence</li><li>Having their computers remotely accessed and files deleted</li><li>Receiving anonymous warnings to \"stop digging\"</li><li>Finding their detailed posts replaced with \"404 - Page Not Found\"</li></ul><blockquote class=\"border-l-4 border-red-600 pl-4 italic my-6 text-slate-300\">\"I had documented 47 separate Mandela Effects with photo evidence. I woke up one morning and every single file was corrupted. Every backup. Even the cloud storage. The folder structure was there, but every file showed 0 bytes.\" - Anonymous researcher, 2016</blockquote>",
      hasQuestion: false,
    });

    // Section 4 - Page 4
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 3,
      content: "<h2>Wake Up</h2><p>You've made it this far down the rabbit hole.</p><p class=\"mt-4\">You now know:</p><ul class=\"mt-4\"><li>Reality is not what it seems</li><li>Your memories may be from another timeline</li><li>Someone—or something—is making changes</li><li>Not everyone can see it</li></ul><p class=\"mt-6 text-lg\">The question is: What do you do with this knowledge?</p><p class=\"mt-6\">Do you:</p><ul class=\"mt-4 space-y-2\"><li>Go back to sleep, accept the \"official\" reality?</li><li>Start documenting everything you notice?</li><li>Join the others who remember?</li><li>Search for proof that can't be erased?</li></ul><p class=\"mt-8 text-center text-2xl font-bold\">The choice is yours.</p><p class=\"mt-4 text-center text-xl text-yellow-400\">But remember:</p><p class=\"mt-2 text-center text-lg\">Once you see the cracks in reality...</p><p class=\"mt-2 text-center text-2xl font-bold text-red-400\">You can never unsee them.</p><p class=\"mt-8 text-center text-slate-500\">Welcome to the other side.</p>",
      hasQuestion: false,
    });

    console.log("Berenstain Bears conspiracy seeded successfully - 1 theory with 4 sections!");
    return null;
  },
});
