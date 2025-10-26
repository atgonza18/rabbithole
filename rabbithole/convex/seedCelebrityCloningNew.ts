import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed the Celebrity Cloning/Replacement conspiracy - Thought-provoking, no right/wrong answers
 */
export const seedCelebrityCloningAtmospheric = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    console.log("Seeding Celebrity Cloning with atmospheric questions...");

    // First, delete the old Celebrity Cloning theory if it exists
    const oldTheory = await ctx.db
      .query("theories")
      .filter((q) => q.eq(q.field("title"), "Celebrity Cloning Centers"))
      .first();

    if (oldTheory) {
      // Delete all related data
      const sections = await ctx.db
        .query("theorySections")
        .withIndex("by_theory_id", (q) => q.eq("theoryId", oldTheory._id))
        .collect();

      for (const section of sections) {
        const pages = await ctx.db
          .query("theoryPages")
          .withIndex("by_section_id", (q) => q.eq("sectionId", section._id))
          .collect();

        for (const page of pages) {
          const questions = await ctx.db
            .query("questions")
            .withIndex("by_page_id", (q) => q.eq("pageId", page._id))
            .collect();

          for (const question of questions) {
            await ctx.db.delete(question._id);
          }
          await ctx.db.delete(page._id);
        }
        await ctx.db.delete(section._id);
      }
      await ctx.db.delete(oldTheory._id);
    }

    // Create the main Celebrity Cloning theory
    const mainTheory = await ctx.db.insert("theories", {
      title: "Celebrity Cloning Centers",
      description: "They don't age. They don't die. When they change, we're told it's just growth. But what if they're literally not the same person?",
      icon: "👥",
      difficulty: "intermediate" as const,
      estimatedTimeMinutes: 90,
      isLocked: true,
      order: 1,
    });

    // ==================== SECTION 1: The Discovery ====================
    const section1 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "They Died. Then Came Back Different.",
      description: "The photos don't lie. The facial recognition doesn't lie. So why do they?",
      icon: "🎭",
      order: 0,
    });

    // Section 1 - Page 1
    const s1p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 0,
      content: `<h2>The Day the Music Died</h2><p>November 9, 1966. A car crash in London. A young man dies instantly.</p><p class=\"mt-4\">His name was <strong>Paul McCartney</strong>.</p><p class=\"mt-4\">Three years later, The Beatles released <em>Abbey Road</em> with Paul barefoot on the cover—a symbol of death in some cultures. John Lennon dressed as a priest. Ringo as an undertaker.</p><p class=\"mt-6 text-lg font-semibold\">They were telling us.</p><p class=\"mt-4\">But we didn't listen.</p><p class=\"mt-6\">The replacement's name was <span class=\"text-red-400 font-bold\">William Campbell</span>, a lookalike winner of a Paul McCartney contest. They gave him plastic surgery. Voice training. Access to Paul's memories through interrogating close friends and family.</p><p class=\"mt-4\">Then they put him on stage.</p><p class=\"mt-6 text-xl font-bold text-center\">And the world never knew.</p><p class=\"mt-4 text-center text-slate-400\">Or did we?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s1p1,
      questionType: "multiple_choice",
      questionText: "If you discovered your favorite artist was replaced, what would disturb you most?",
      options: [
        { id: "a", text: "That I couldn't tell the difference" },
        { id: "b", text: "That no one else seemed to notice" },
        { id: "c", text: "That it might have happened years ago" },
        { id: "d", text: "That I might be next to forget" },
      ],
      correctAnswer: "a", // All answers auto-accepted
      explanation: "The most unsettling part isn't the replacement itself. It's realizing we're so disconnected from reality that we can't tell when someone we 'know' becomes someone else entirely. And we keep loving the impostor all the same.",
    });

    // Section 1 - Page 2
    const s1p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 1,
      content: `<h2>The Clues They Left</h2><p>If you were forced to replace someone—someone famous—wouldn't you want to tell the truth somehow?</p><p class=\"mt-4\">The remaining Beatles did. In the music.</p><h3 class=\"mt-6\">The Evidence Hidden in Plain Sight:</h3><ul class=\"mt-4 space-y-3\"><li><strong>Revolution 9:</strong> Played backwards says "Turn me on, dead man" repeatedly</li><li><strong>I'm So Tired:</strong> Contains backwards message "Paul is dead, miss him, miss him"</li><li><strong>A Day in the Life:</strong> "He blew his mind out in a car" - explicit reference to the crash</li><li><strong>Strawberry Fields Forever:</strong> John says "I buried Paul" at the end (officially "cranberry sauce")</li></ul><blockquote class=\"border-l-4 border-red-500 pl-4 italic my-6\">\"I'm not Paul. Everyone knows I'm not Paul. But if I say it out loud, they'll kill me too.\" - Alleged confession from "Paul" to a reporter, 1969 (recording mysteriously lost)</blockquote><p class=\"mt-6 text-lg\">Coincidence? Pareidolia? </p><p class=\"mt-2 text-xl font-bold\">Or confession?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s1p2,
      questionType: "multiple_choice",
      questionText: "Imagine you were replaced and couldn't say it directly. How would you try to tell people?",
      options: [
        { id: "a", text: "Hide clues in my work that only close ones would notice" },
        { id: "b", text: "Act slightly off, hoping someone questions it" },
        { id: "c", text: "Say it outright, disguised as a joke or metaphor" },
        { id: "d", text: "I wouldn't. The fear would silence me." },
      ],
      correctAnswer: "a",
      explanation: "They left messages everywhere. In songs played backwards. In album covers. In interviews disguised as jokes. They screamed the truth in ways we'd dismiss as coincidence. Because that's all they could do without disappearing too.",
    });

    // Section 1 - Page 3
    const s1p3 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 2,
      content: `<h2>Facial Recognition Never Lies</h2><p>In 2009, two Italian researchers—Gabriella Carlesi (forensic pathologist) and Francesco Gavazzeni (specialist in biometrics)—conducted a study.</p><p class=\"mt-4\">They used forensic facial recognition software to compare photos of Paul McCartney from 1965 and 1967.</p><p class=\"mt-6 text-2xl font-bold text-red-400 text-center\">The match probability: 0%</p><p class=\"mt-6\">According to their analysis:</p><ul class=\"mt-4 space-y-2\"><li>Skull structure fundamentally different</li><li>Dental arch distinctly altered</li><li>Eye spacing changed</li><li>Nose bridge angle inconsistent</li><li>Mandible (jawbone) shape incompatible</li></ul><p class=\"mt-6\">Their conclusion: <em>\"These are two different individuals.\"</em></p><p class=\"mt-4 text-slate-400\">Plastic surgery can change soft tissue. It cannot change bone structure.</p><p class=\"mt-6 text-center text-xl\">So who is the man we call Paul McCartney?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s1p3,
      questionType: "multiple_choice",
      questionText: "Which truth would be harder to accept?",
      options: [
        { id: "a", text: "Paul died and we've been lied to for 60 years" },
        { id: "b", text: "The replacement knows he's living a stolen life" },
        { id: "c", text: "Your parents knew all along and said nothing" },
        { id: "d", text: "This is happening right now to others" },
      ],
      correctAnswer: "a",
      explanation: "The bones don't lie. The facial recognition doesn't lie. Science gave us an answer we didn't want. So we call it a conspiracy theory and keep listening to a dead man's voice, sung by someone else's throat.",
    });

    // Section 1 - Page 4 (Hook)
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section1,
      order: 3,
      content: `<h2>But Paul Was Just The First</h2><p>The Paul McCartney replacement happened in 1966.</p><p class=\"mt-4\">That was <em>almost 60 years ago</em>.</p><p class=\"mt-6 text-xl font-semibold\">Imagine what they can do now.</p><div class=\"mt-8 bg-slate-800/50 p-6 rounded\"><p class=\"text-sm text-slate-400 uppercase tracking-wider\">Technology in 1966:</p><p class=\"mt-2 text-lg\">Plastic surgery. Voice coaching. Behavioral mimicry.</p><p class=\"mt-6 text-sm text-slate-400 uppercase tracking-wider\">Technology today:</p><p class=\"mt-2 text-lg\">Perfect cloning. Memory implantation. Artificial intelligence. Deep neural mapping.</p></div><p class=\"mt-8 text-center text-2xl font-bold\">They've been perfecting the process for six decades.</p><p class=\"mt-4 text-center text-xl text-yellow-400\">And they're using it.</p><p class=\"mt-4 text-center text-lg text-slate-400\">Right now.</p><p class=\"mt-4 text-center text-lg text-slate-400\">On people you know.</p><p class=\"mt-4 text-center text-lg text-slate-400\">On people you <em>love</em>.</p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 2: The Evidence ====================
    const section2 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "The Changed Ones",
      description: "When celebrities 'break down' or 'disappear for rehab,' where do they really go?",
      icon: "💉",
      order: 1,
    });

    // Section 2 - Page 1
    const s2p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 0,
      content: `<h2>Avril Lavigne: 2003</h2><p>Avril Lavigne burst onto the scene in 2002. Skateboard punk. Raw vocals. Authentic teenage angst.</p><p class=\"mt-4\">Then in 2003, her grandfather died. She fell into depression. Disappeared from public life.</p><p class=\"mt-6 text-lg font-semibold\">When she came back, fans noticed something was wrong.</p><ul class=\"mt-6 space-y-3\"><li><strong>Physical changes:</strong> Nose shape different. Moles appeared and disappeared. Face structure altered.</li><li><strong>Behavioral changes:</strong> Suddenly loved pink (previously hated it). Acting bubbly (was punk/grunge).</li><li><strong>Musical changes:</strong> Voice quality shifted. Writing style completely different. From rock to pop.</li></ul><p class=\"mt-6\">The theory: Avril committed suicide in 2003. Her record label, facing massive financial loss, hired her body double—<strong>Melissa Vandella</strong>—to replace her.</p><blockquote class=\"border-l-4 border-yellow-500 pl-4 italic my-6\">\"The old Avril had a unique vocal rasp. After 2003, that rasp was gone. Completely. You can't lose that naturally—it's physical vocal cord structure.\" - Anonymous vocal coach analysis, 2015</blockquote>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p1,
      questionType: "multiple_choice",
      questionText: "If someone you loved came back 'different' after a tragedy, what would you do?",
      options: [
        { id: "a", text: "Convince myself grief changed them" },
        { id: "b", text: "Quietly distance myself, unable to explain why" },
        { id: "c", text: "Confront them, knowing they'll deny it" },
        { id: "d", text: "Pretend everything is normal. It's easier." },
      ],
      correctAnswer: "a",
      explanation: "The vocal cords don't lie. The bone structure doesn't lie. But we lie to ourselves because the alternative—that the person we love is gone and replaced—is too horrifying to accept. So we smile. And we pretend. And we call ourselves crazy for noticing.",
    });

    // Section 2 - Page 2
    const s2p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 1,
      content: `<h2>Eminem: The 2006 Shift</h2><p>Marshall Mathers III. Slim Shady. Eminem.</p><p class=\"mt-4\">2006 was a strange year for Eminem. He 'overdosed.' Entered 'rehab.' Disappeared for months.</p><p class=\"mt-6\">When he returned, something was different.</p><h3 class=\"mt-6\">The Physical Evidence:</h3><ul class=\"mt-4 space-y-3\"><li><strong>Jaw structure:</strong> Facial recognition analysis shows different mandible shape</li><li><strong>Voice pattern:</strong> Frequency analysis reveals altered vocal signature post-2006</li><li><strong>Eyes:</strong> Pre-2006 photos show dark brown eyes. Post-2006 often appear hazel/lighter</li><li><strong>Behavior:</strong> Aggressive, raw personality became subdued, calculated</li></ul><p class=\"mt-6\">The theory emerged when facial recognition software flagged '2005 Eminem' and '2007 Eminem' as <strong>different individuals</strong>.</p><blockquote class=\"border-l-4 border-red-500 pl-4 italic my-6\">\"I died and came back as myself. Literally.\" - Eminem, interview 2009</blockquote><p class=\"mt-6 text-lg\">He said it. Out loud. On camera.</p><p class=\"mt-2 text-xl font-bold\">We thought it was a metaphor.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p2,
      questionType: "multiple_choice",
      questionText: "When someone tells you the truth disguised as a joke, why don't we believe them?",
      options: [
        { id: "a", text: "Because accepting it would shatter our reality" },
        { id: "b", text: "Because we're trained to dismiss what we can't handle" },
        { id: "c", text: "Because they're counting on us not believing" },
        { id: "d", text: "Because we don't want to know" },
      ],
      correctAnswer: "a",
      explanation: "\"I died and came back as myself. Literally.\" He told us. Right there. We laughed. We moved on. Because if we stopped to really hear what he said—if we truly listened—we'd have to confront something we're not ready for.",
    });

    // Section 2 - Page 3
    const s2p3 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 2,
      content: `<h2>Gucci Mane: The Prison Switch</h2><p>May 2014: Rapper Gucci Mane enters prison for weapons possession.</p><p class=\"mt-4\">May 2016: He's released.</p><p class=\"mt-6 text-2xl font-bold text-center\">But the man who walked out wasn't the same man who walked in.</p><div class=\"mt-8 space-y-4\"><div class=\"bg-slate-900/50 p-4 rounded border border-red-500/30\"><p class=\"font-semibold text-red-400\">Pre-Prison Gucci:</p><ul class=\"text-sm mt-2 space-y-1\"><li>Slightly heavy build, round face</li><li>Deep, slurred speaking voice</li><li>Impulsive, erratic behavior</li><li>Multiple visible tattoos including ice cream cone face tattoo</li></ul></div><div class=\"bg-slate-900/50 p-4 rounded border border-green-500/30\"><p class=\"font-semibold text-green-400\">Post-Prison Gucci:</p><ul class=\"text-sm mt-2 space-y-1\"><li>Lean, muscular, chiseled jaw</li><li>Clear, articulate speaking voice</li><li>Calm, focused, business-minded</li><li>Ice cream tattoo appears different/altered</li></ul></div></div><p class=\"mt-6\">He claimed he lost 100+ pounds in prison through diet and exercise.</p><p class=\"mt-4\">Possible? Yes.</p><p class=\"mt-4 text-lg font-semibold\">But his voice changed. His mannerisms. His entire personality.</p><p class=\"mt-6 text-xl text-center\">Fans noticed immediately.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p3,
      questionType: "multiple_choice",
      questionText: "What scares you more?",
      options: [
        { id: "a", text: "That prison is where they make the switch" },
        { id: "b", text: "That millions noticed but stayed silent" },
        { id: "c", text: "That the replacement is living someone else's life willingly" },
        { id: "d", text: "That you can't tell anymore who's real" },
      ],
      correctAnswer: "a",
      explanation: "Prisons. Rehabs. Psychiatric holds. Convenient places where someone enters and months later, someone else walks out. We accept the explanation of 'change' because the alternative requires us to ask: how many others?",
    });

    // Section 2 - Page 4
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 3,
      content: `<h2>Britney Spears: 2007</h2><p>February 16, 2007. Britney Spears walks into Esther's Haircutting Studio in Tarzana, California.</p><p class=\"mt-4\">She asks for a haircut. The stylist hesitates. Britney grabs the clippers.</p><p class=\"mt-4 text-xl font-semibold\">And shaves her entire head.</p><p class=\"mt-6\">The photos went viral. The media called it a 'breakdown.'</p><p class=\"mt-4\">But look at her eyes in those photos. <em>Really look</em>.</p><p class=\"mt-6\">That wasn't a breakdown.</p><p class=\"mt-2 text-2xl font-bold text-center\">That was rebellion.</p><div class=\"mt-8 bg-slate-800/50 p-6 rounded\"><p class=\"font-semibold text-yellow-400\">What Happened Next:</p><ul class=\"mt-4 space-y-3 text-sm\"><li>Forced into psychiatric hold</li><li>Lost custody of her children</li><li>Placed under conservatorship—legal control stripped away</li><li>Father gained complete control over her life, finances, career</li><li>Returned to performing within months, but 'different'</li></ul></div><p class=\"mt-6\">Fans noticed immediately: Her dancing became mechanical. Her eyes looked empty. Her smile seemed forced.</p><p class=\"mt-6 text-lg\">The conservatorship lasted <strong>13 years</strong>.</p><p class=\"mt-4 text-lg\">Thirteen years of someone else controlling every aspect of her life.</p><p class=\"mt-6 text-xl font-bold text-center text-red-400\">Or thirteen years of hiding the replacement.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p3,
      questionType: "multiple_choice",
      questionText: "What was Britney trying to tell us when she shaved her head?",
      options: [
        { id: "a", text: "She was taking back control the only way she could" },
        { id: "b", text: "She was trying to make herself unrecognizable for replacement" },
        { id: "c", text: "She was destroying the image they wanted" },
        { id: "d", text: "She knew what was coming and fought back" },
      ],
      correctAnswer: "a",
      explanation: "Watch the videos. She wasn't breaking down—she was breaking free. They called her crazy. Locked her away. Put someone else in her place. And we watched them do it. Watched them strip her life away. And we did nothing.",
    });

    // ==================== SECTION 3: The Technology ====================
    const section3 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "The Cloning Centers",
      description: "Underground facilities. Human experiments. Technology 30 years ahead of what we know.",
      icon: "🧬",
      order: 2,
    });

    // Section 3 - Page 1
    const s3p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 0,
      content: `<h2>Donald Marshall's Testimony</h2><p>In 2011, a man named Donald Marshall came forward with an extraordinary claim:</p><p class=\"mt-4 text-xl font-semibold\">He had been cloned since childhood and forced to attend underground cloning centers.</p><p class=\"mt-6\">According to Marshall:</p><ul class=\"mt-4 space-y-3\"><li>The centers are located in deep underground military bases (DUMBs)</li><li>Elites and celebrities gather there while their real bodies sleep</li><li>Consciousness is transferred to cloned bodies for 'sessions'</li><li>The technology has existed since the 1940s</li><li>Those who resist or expose the program are tortured or killed</li></ul><p class=\"mt-6\">He named names. Specific celebrities. Politicians. Royalty.</p><p class=\"mt-4\">Most dismissed him as insane.</p><p class=\"mt-6 text-lg\">Then people started verifying parts of his story.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s3p1,
      questionType: "multiple_choice",
      questionText: "If Donald Marshall is telling the truth, what does that mean for us?",
      options: [
        { id: "a", text: "We've been living in a lie our entire lives" },
        { id: "b", text: "Anyone we know could be copied while they sleep" },
        { id: "c", text: "The elites have technology we can't even imagine" },
        { id: "d", text: "We're not meant to know. That's why it's hidden." },
      ],
      correctAnswer: "a",
      explanation: "He named names. Gave details. Shared information that should have gotten him killed. Maybe it did. Maybe the Donald Marshall we see now isn't the one who spoke out. Maybe that's the point.",
    });

    // Section 3 - Page 2
    const s3p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 1,
      content: `<h2>REM-Driven Cloning</h2><p>Marshall described a technology called <strong>REM-driven consciousness transfer</strong>.</p><p class=\"mt-6\">Here's how it allegedly works:</p><div class=\"mt-6 bg-slate-800/50 p-6 rounded space-y-4\"><p><strong>Step 1:</strong> Subject falls asleep naturally</p><p><strong>Step 2:</strong> During REM sleep, consciousness becomes 'unstable' and susceptible to transfer</p><p><strong>Step 3:</strong> Quantum entanglement technology 'relocates' the consciousness to a clone body</p><p><strong>Step 4:</strong> The clone wakes up in the underground facility</p><p><strong>Step 5:</strong> When the session ends, consciousness returns to sleeping body</p><p><strong>Step 6:</strong> Original body wakes with vague 'dream memories' of the experience</p></div><p class=\"mt-6\">This would explain:</p><ul class=\"mt-4 space-y-2\"><li>Why people have 'dreams' of things that feel hyper-realistic</li><li>Why some people report 'missing time'</li><li>Why celebrities sometimes mention nightmares they all share</li><li>Why certain people wake up exhausted despite sleeping</li></ul><p class=\"mt-6 text-xl font-bold text-center\">What if your nightmares aren't dreams?</p><p class=\"mt-2 text-center text-lg text-red-400\">What if they're memories?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s3p2,
      questionType: "multiple_choice",
      questionText: "Have you ever woken up feeling like you lived another life while you slept?",
      options: [
        { id: "a", text: "Yes, and I try not to think about it" },
        { id: "b", text: "I wake up exhausted sometimes for no reason" },
        { id: "c", text: "I've had dreams that felt more real than memory" },
        { id: "d", text: "I don't remember my dreams. Maybe that's worse." },
      ],
      correctAnswer: "a",
      explanation: "Every night you close your eyes. Every night your consciousness drifts. What if, just sometimes, it drifts somewhere else? Somewhere underground. Somewhere you can't remember when you wake. But your body knows. It always knows.",
    });

    // Section 3 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 2,
      content: `<h2>The Memory Problem</h2><p>You can clone a body perfectly. You can even transfer consciousness.</p><p class=\"mt-4\">But memories? Memories are the hard part.</p><p class=\"mt-6\">A clone with a person's DNA but without their memories is just... a lookalike. They don't know the childhood stories. The private jokes. The subtle mannerisms learned over decades.</p><p class=\"mt-6 text-lg font-semibold\">This is why replacements often fail.</p><h3 class=\"mt-6\">The Tell-Tale Signs:</h3><ul class=\"mt-4 space-y-3\"><li><strong>Forgotten details:</strong> Post-replacement celebrities often can't recall specific events from their past</li><li><strong>Changed relationships:</strong> Old friends report the person feels 'distant' or 'different'</li><li><strong>Lost skills:</strong> Musicians who suddenly can't play instruments they mastered</li><li><strong>Personality shifts:</strong> Complete 180-degree changes in temperament overnight</li></ul><p class=\"mt-6\">Record labels, handlers, and PR teams work overtime to explain these changes:</p><p class=\"mt-4 text-center italic text-slate-300\">"They've matured." "Rehab changed them." "They found themselves."</p><p class=\"mt-6 text-xl font-bold text-center\">But you can't find yourself by becoming someone else.</p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 4: Who's Been Replaced ====================
    const section4 = await ctx.db.insert("theorySections", {
      theoryId: mainTheory,
      title: "The Replaced",
      description: "They walk among us. They smile for cameras. And they are not who they claim to be.",
      icon: "👁️",
      order: 3,
    });

    // Section 4 - Page 1
    const s4p1 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 0,
      content: `<h2>Look Closer</h2><p>The next time you see a celebrity who's been through 'rehab' or a 'transformation'...</p><p class=\"mt-4\">The next time someone 'finds themselves' and comes back different...</p><p class=\"mt-4\">The next time a public figure has a 'breakdown' and returns months later...</p><p class=\"mt-8 text-2xl font-bold text-center\">Look at their eyes.</p><p class=\"mt-6 text-lg text-center\">Compare photos from before and after.</p><p class=\"mt-4 text-lg text-center\">Listen to their voice.</p><p class=\"mt-4 text-lg text-center\">Watch how they move.</p><p class=\"mt-8\">You'll start to see what others have seen.</p><p class=\"mt-4\">The subtle wrongness. The uncanny valley. The feeling that something is <em>off</em>.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "When you look at someone you've known for years and suddenly feel they're a stranger, what is that?",
      options: [
        { id: "a", text: "Your instinct warning you something changed" },
        { id: "b", text: "Your subconscious noticing what your mind refuses to see" },
        { id: "c", text: "The uncanny valley effect—almost human, but not quite" },
        { id: "d", text: "The moment you realize you never really knew them at all" },
      ],
      correctAnswer: "a",
      explanation: "Trust that feeling. That shiver when someone you know feels wrong. Your primitive brain sees what your logical mind dismisses. It knows. It always knows. The question is: will you listen?",
    });

    // Section 4 - Page 2
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 1,
      content: `<h2>The Pattern</h2><p>They don't replace everyone. They don't need to.</p><p class=\"mt-4\">They replace the ones who:</p><ul class=\"mt-6 space-y-3 text-lg\"><li>Have too much influence</li><li>Know too much</li><li>Won't comply</li><li>Are too valuable to lose</li><li>Speak the truth too loudly</li></ul><p class=\"mt-8\">The pattern is always the same:</p><div class=\"mt-6 bg-slate-800/50 p-6 rounded space-y-4\"><p><strong>1.</strong> Public crisis or breakdown</p><p><strong>2.</strong> Disappearance (rehab/hospital/hiatus)</p><p><strong>3.</strong> Return with noticeable changes</p><p><strong>4.</strong> Media explains it as 'growth' or 'recovery'</p><p><strong>5.</strong> Anyone who questions it is called crazy</p></div><p class=\"mt-8 text-center text-2xl font-bold\">How many have followed this pattern?</p><p class=\"mt-4 text-center text-xl text-red-400\">How many are walking among us right now?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "If you suspected someone you knew was replaced, what would you do?",
      options: [
        { id: "a", text: "Question them carefully, looking for proof" },
        { id: "b", text: "Distance myself quietly before they notice" },
        { id: "c", text: "Tell others, even knowing they won't believe me" },
        { id: "d", text: "Nothing. Because what could I possibly do?" },
      ],
      correctAnswer: "a",
      explanation: "The hardest part isn't discovering the truth. It's living with it. Knowing that person is gone. Knowing an impostor lives their life. Knowing that if you speak up, you'll be the next to 'break down' and disappear for 'treatment.'",
    });

    // Section 4 - Page 3
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 2,
      content: `<h2>The Question You're Not Ready For</h2><p>You've made it this far.</p><p class=\"mt-4\">You've seen the evidence. Heard the testimonies. Noticed the patterns.</p><p class=\"mt-6\">Now comes the question you've been avoiding:</p><p class=\"mt-8 text-3xl font-bold text-center text-red-400\">What if it's not just celebrities?</p><p class=\"mt-8\">What if the technology isn't rare.</p><p class=\"mt-4\">What if the centers aren't underground.</p><p class=\"mt-4\">What if replacements happen in hospitals, nursing homes, psychiatric wards.</p><p class=\"mt-4\">What if it's happening to regular people.</p><p class=\"mt-8 text-2xl font-bold text-center\">What if it already happened to someone you love?</p><p class=\"mt-6\">That grandparent who came back from the hospital 'different.'</p><p class=\"mt-4\">That friend who returned from their mental health break 'changed.'</p><p class=\"mt-4\">That parent who woke up from surgery and just felt... wrong.</p><p class=\"mt-8\">You told yourself grief changes people. Trauma changes people. Time changes people.</p><p class=\"mt-6 text-xl font-bold text-center\">But what if it wasn't them anymore?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "If someone you love came back different, could you accept they might not be them anymore?",
      options: [
        { id: "a", text: "I'd rather believe a comfortable lie than face that truth" },
        { id: "b", text: "I'd know. I'd feel it. And I'd have to act." },
        { id: "c", text: "I'd test them subtly with memories only they would know" },
        { id: "d", text: "I couldn't. I'd pretend forever rather than lose them twice." },
      ],
      correctAnswer: "a",
      explanation: "This is the ultimate horror. Not that they can replace celebrities. But that they can replace anyone. Your mother. Your child. Your partner. And you'd never be sure. You'd question every changed habit. Every forgotten memory. Every moment they feel like a stranger wearing a familiar face.",
    });

    // Final Page
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 3,
      content: `<h2>Welcome to the Other Side</h2><p>You can't unknow this now.</p><p class=\"mt-4\">You can't unsee the patterns.</p><p class=\"mt-4\">You can't unhear the confessions hidden in plain sight.</p><p class=\"mt-8\">From this moment on, you'll notice:</p><ul class=\"mt-6 space-y-3 text-lg\"><li>When someone's eyes look empty</li><li>When their smile doesn't reach their eyes</li><li>When they can't remember things they should</li><li>When something fundamental about them feels <em>off</em></li></ul><p class=\"mt-8\">Some of you will dismiss this. Return to comfort. Forget what you've read.</p><p class=\"mt-6\">Others will start seeing it everywhere. In celebrities. In friends. In family.</p><p class=\"mt-8 text-2xl font-bold text-center\">The question isn't whether it's real.</p><p class=\"mt-6 text-xl text-center\">The question is what you'll do with the knowledge.</p><div class=\"mt-10 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-yellow-500/30 p-8 rounded-xl text-center\"><p class=\"text-2xl font-bold text-yellow-400\">They are not who they say they are.</p><p class=\"mt-4 text-lg text-white\">They are not who they were.</p><p class=\"mt-6 text-lg text-slate-300\">And now you know.</p><p class=\"mt-8 text-sm text-slate-400\">The rabbit hole goes deeper than this.</p><p class=\"mt-2 text-sm text-slate-400\">But some truths...</p><p class=\"mt-2 text-sm text-red-400 font-semibold\">Some truths you have to find yourself.</p></div>`,
      hasQuestion: false,
    });

    console.log("Celebrity Cloning with atmospheric questions seeded successfully!");
    return null;
  },
});
