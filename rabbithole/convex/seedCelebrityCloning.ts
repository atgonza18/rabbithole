import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed the Celebrity Cloning/Replacement conspiracy - Dark and engaging
 */
export const seedCelebrityCloning = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    console.log("Seeding Celebrity Cloning conspiracy series...");

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
      questionText: "You're looking at the Abbey Road album cover right now. Paul barefoot. John in white (priest). Ringo in black (undertaker). They're walking away from the camera. What do you see?",
      options: [
        { id: "a", text: "A funeral procession - they're literally showing us Paul's death" },
        { id: "b", text: "Artists being weird - it means nothing" },
        { id: "c", text: "A cry for help - they couldn't say it, so they showed it" },
        { id: "d", text: "I'll never look at this album the same way again" },
      ],
      explanation: "Paul barefoot (corpse in some cultures). John in white (priest/clergy). Ringo in black (undertaker). George in denim (gravedigger). The license plate reads '28IF' - Paul's age IF he had lived. Coincidence? Pattern recognition? Or the Beatles screaming the truth in the only way they could?",
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
      questionText: "You're alone in your room. You play 'Revolution 9' backwards. Through the static and noise, you hear it: 'Turn me on, dead man.' Over and over. What's your first reaction?",
      options: [
        { id: "a", text: "It's just audio pareidolia - my brain finding patterns in noise" },
        { id: "b", text: "John Lennon put it there on purpose - he was confessing" },
        { id: "c", text: "I feel sick. This is real. They really did it." },
        { id: "d", text: "I need to stop listening. Some things shouldn't be known." },
      ],
      explanation: "The backwards message is there. You can hear it. Thousands have verified it. The question isn't whether it exists - it's whether it's intentional. John Lennon was known for backwards recordings. He had the studio access. He had the motive. And if it IS intentional... what else did they hide in the music?",
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
      questionText: "Two forensic scientists used facial recognition software on Paul McCartney. 1965 vs 1967. Match probability: 0%. They concluded 'These are two different individuals.' How do you explain that?",
      options: [
        { id: "a", text: "The software was faulty - technology makes mistakes" },
        { id: "b", text: "Plastic surgery can be that good - money buys miracles" },
        { id: "c", text: "They're right. That's not Paul. It never was." },
        { id: "d", text: "I don't want to know the answer" },
      ],
      explanation: "Bone structure doesn't lie. Plastic surgery can change soft tissue - skin, nose, lips. But skull shape? Jaw geometry? Eye socket spacing? These are skeletal. These don't change. Yet the analysis showed fundamental differences. Two forensic professionals staked their careers on this conclusion. What did they see that made them so certain?",
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
      questionText: "Listen to Avril's voice from 2002. That raw, raspy edge. Now listen to anything after 2003. The rasp is gone. Completely. Vocal coaches say that rasp is physical - vocal cord structure. It doesn't just vanish. So what happened?",
      options: [
        { id: "a", text: "Vocal training can remove a rasp - she just got lessons" },
        { id: "b", text: "Depression changed her voice - grief does that" },
        { id: "c", text: "That's not her voice. It's someone else's vocal cords." },
        { id: "d", text: "I need to listen to the songs again" },
      ],
      explanation: "Vocal coaches are clear: a rasp comes from physical vocal cord structure, often small nodules or natural cord shape. You can't train it away. Grief doesn't erase it. Surgery could remove it - but why would she? That rasp was her signature. Unless... she didn't choose to remove it. Unless different vocal cords mean a different person.",
    });

    // Section 2 - Page 2
    const s2p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 1,
      content: `<h2>The 'Melissa' Clues</h2><p>If you were a body double forced to live someone else's life, wouldn't you want to tell the truth?</p><p class=\"mt-4\">Avril—or whoever she is now—allegedly did.</p><div class=\"mt-6 space-y-4\"><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">Her clothing line:</p><p class=\"text-sm mt-2\">Launched in 2008 with the name 'Abbey Dawn' - her grandfather's nickname. But why announce his death so publicly if she'd already 'moved on'?</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">The photos:</p><p class=\"text-sm mt-2\">Post-2003 photos show her wearing clothing with 'Melissa' written on it. T-shirts. Tank tops. Always 'Melissa.'</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">The song lyrics:</p><p class=\"text-sm mt-2\">In 'Slipped Away' (2004): <em>"The day you slipped away was the day I found it won't be the same."</em> A song about her grandfather—or about Avril herself?</p></div></div><p class=\"mt-6 text-center text-xl font-bold\">Coincidence?</p><p class=\"mt-2 text-center text-lg\">Or confession?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p2,
      questionType: "multiple_choice",
      questionText: "Photos from 2003 onward show 'Avril' wearing shirts that say 'MELISSA' on them. Over and over. If you were forced to live someone else's life, what would you do?",
      options: [
        { id: "a", text: "Stay silent - speaking out gets you killed" },
        { id: "b", text: "Leave clues like this - hints that can't quite be proven" },
        { id: "c", text: "The shirts are meaningless - people read too much into things" },
        { id: "d", text: "I'd be screaming my real name any way I could" },
      ],
      explanation: "'Melissa' appears on her clothing repeatedly after 2003. Melissa Vandella was allegedly her body double's name. If you couldn't speak the truth - if saying 'I'm not Avril' meant death - wouldn't you write it? Wear it? Show it? A silent scream visible to anyone paying attention. Some coincidences are too specific to ignore.",
    });

    // Section 2 - Page 3
    const s2p3 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 2,
      content: `<h2>Eminem: The 2006 Shift</h2><p>Marshall Mathers III. Slim Shady. Eminem.</p><p class=\"mt-4\">2006 was a strange year for Eminem. He 'overdosed.' Entered 'rehab.' Disappeared for months.</p><p class=\"mt-6\">When he returned, something was different.</p><h3 class=\"mt-6\">The Physical Evidence:</h3><ul class=\"mt-4 space-y-3\"><li><strong>Jaw structure:</strong> Facial recognition analysis shows different mandible shape</li><li><strong>Voice pattern:</strong> Frequency analysis reveals altered vocal signature post-2006</li><li><strong>Eyes:</strong> Pre-2006 photos show dark brown eyes. Post-2006 often appear hazel/lighter</li><li><strong>Behavior:</strong> Aggressive, raw personality became subdued, calculated</li></ul><p class=\"mt-6\">The theory emerged when facial recognition software flagged '2005 Eminem' and '2007 Eminem' as <strong>different individuals</strong>.</p><blockquote class=\"border-l-4 border-red-500 pl-4 italic my-6\">\"I died and came back as myself. Literally.\" - Eminem, interview 2009</blockquote><p class=\"mt-6 text-lg\">He said it. Out loud. On camera.</p><p class=\"mt-2 text-xl font-bold\">We thought it was a metaphor.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p3,
      questionType: "multiple_choice",
      questionText: "2009 interview. Eminem looks directly at the camera and says: 'I died and came back as myself. Literally.' He said LITERALLY. What did he mean?",
      options: [
        { id: "a", text: "Metaphor for rehab - he killed his old self, became new" },
        { id: "b", text: "He's telling the truth - the old Eminem died, this is the replacement" },
        { id: "c", text: "Dark humor - rappers say shocking things for attention" },
        { id: "d", text: "That word 'literally' - why would he add that?" },
      ],
      explanation: "The quote is real. Verified. On camera. 'I died and came back as myself. LITERALLY.' Not figuratively. Not metaphorically. Literally. Artists choose their words carefully. Eminem is known for precise, intentional lyrics. So why that word? Why emphasize it? Maybe it's just shock value. Or maybe... he was confessing. Hiding the truth in plain sight where no one would believe it.",
    });

    // Section 2 - Page 4
    const s2p4 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 3,
      content: `<h2>Gucci Mane: The Prison Switch</h2><p>May 2014: Rapper Gucci Mane enters prison for weapons possession.</p><p class=\"mt-4\">May 2016: He's released.</p><p class=\"mt-6 text-2xl font-bold text-center\">But the man who walked out wasn't the same man who walked in.</p><div class=\"mt-8 space-y-4\"><div class=\"bg-slate-900/50 p-4 rounded border border-red-500/30\"><p class=\"font-semibold text-red-400\">Pre-Prison Gucci:</p><ul class=\"text-sm mt-2 space-y-1\"><li>Slightly heavy build, round face</li><li>Deep, slurred speaking voice</li><li>Impulsive, erratic behavior</li><li>Multiple visible tattoos including ice cream cone face tattoo</li></ul></div><div class=\"bg-slate-900/50 p-4 rounded border border-green-500/30\"><p class=\"font-semibold text-green-400\">Post-Prison Gucci:</p><ul class=\"text-sm mt-2 space-y-1\"><li>Lean, muscular, chiseled jaw</li><li>Clear, articulate speaking voice</li><li>Calm, focused, business-minded</li><li>Ice cream tattoo appears different/altered</li></ul></div></div><p class=\"mt-6\">He claimed he lost 100+ pounds in prison through diet and exercise.</p><p class=\"mt-4\">Possible? Yes.</p><p class=\"mt-4 text-lg font-semibold\">But his voice changed. His mannerisms. His entire personality.</p><p class=\"mt-6 text-xl text-center\">Fans noticed immediately.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s2p4,
      questionType: "multiple_choice",
      questionText: "Pre-prison Gucci had a deep, slurred voice - his signature. Post-prison? Clear. Articulate. Completely different cadence. Can two years in prison change your voice that fundamentally?",
      options: [
        { id: "a", text: "Yes - sobriety and health can change everything" },
        { id: "b", text: "No - your voice is your voice, prison doesn't rewire your throat" },
        { id: "c", text: "Maybe - but his whole personality changed too" },
        { id: "d", text: "Different voice = different person" },
      ],
      explanation: "Your voice is physical. It's determined by vocal cord length, thickness, and your larynx shape. Weight loss doesn't change it. Sobriety doesn't change it. These are anatomical structures. Yet Gucci's voice pattern completely shifted - not just clearer, but fundamentally different frequency, cadence, and tone. The man who went in had one voice. The man who came out had another.",
    });

    // Section 2 - Page 5
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section2,
      order: 4,
      content: `<h2>The Clone Accusations</h2><p>When Gucci Mane returned from prison, social media exploded.</p><p class=\"mt-4\">Within 24 hours, #GucciClone was trending worldwide.</p><p class=\"mt-6\">Instead of ignoring it—which would have been the smart PR move—Gucci addressed it. Repeatedly.</p><ul class=\"mt-6 space-y-3\"><li>Posted videos 'proving' he's real</li><li>Tweeted denials dozens of times</li><li>Made songs referencing the clone theory</li><li>Had interviews specifically about NOT being a clone</li></ul><blockquote class=\"border-l-4 border-yellow-500 pl-4 italic my-6\">\"If I was a clone, would I be this fly? If I was a clone, I'd have remembered to bring my old body type back.\" - Gucci Mane, Twitter 2016</blockquote><p class=\"mt-6\">Here's the thing about being accused of being a clone:</p><p class=\"mt-4 text-xl font-bold text-center\">The real you wouldn't need to keep defending it.</p><p class=\"mt-4 text-center text-lg text-slate-400\">You'd laugh it off once and move on.</p><p class=\"mt-6 text-center text-lg\">Unless...</p><p class=\"mt-2 text-center text-2xl font-bold text-red-400\">Unless you're desperately trying to convince everyone.</p><p class=\"mt-2 text-center text-lg text-yellow-400\">And maybe convince yourself.</p>`,
      hasQuestion: false,
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
      questionText: "Donald Marshall claims that while you sleep, your consciousness gets transferred to a clone in an underground base. You wake up exhausted, with strange 'dream' memories. Have you ever woken up more tired than when you went to bed?",
      options: [
        { id: "a", text: "Yes, all the time - but that's just bad sleep" },
        { id: "b", text: "Yes, with vivid memories that felt too real" },
        { id: "c", text: "No, but this explanation is terrifying" },
        { id: "d", text: "I don't want to think about what my 'dreams' really were" },
      ],
      explanation: "Marshall says it happens during REM sleep. Your body rests, but your consciousness is active - in another body, in another place. You wake exhausted because YOU weren't resting. The clone was active. Working. Performing. And those hyperrealistic 'dreams' that stick with you? Maybe they aren't dreams at all. Maybe they're memories your brain is trying to file away as fiction.",
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
      questionText: "REM sleep - when you dream. Your brain is as active as when you're awake. Your consciousness is 'unstable.' Quantum entanglement technology could theoretically move it elsewhere. Tonight, when you dream, where will you really be?",
      options: [
        { id: "a", text: "In my bed, dreaming - nothing more" },
        { id: "b", text: "I'll never think about dreams the same way" },
        { id: "c", text: "This explains why some dreams feel so REAL" },
        { id: "d", text: "I'm not sleeping tonight" },
      ],
      explanation: "Your most vivid dreams - the ones that felt more real than real - happened during REM. When your consciousness was most active, most unstable, most vulnerable to... relocation. You remember fragments, disjointed scenes, impossible scenarios. But what if they aren't impossible? What if your brain is trying to rationalize MEMORIES by calling them dreams? What did you really do last night?",
    });

    // Section 3 - Page 3
    const s3p3 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 2,
      content: `<h2>The Duplication Process</h2><p>But consciousness transfer to temporary clones is just the beginning.</p><p class=\"mt-4\">What happens when they need a <em>permanent</em> replacement?</p><h3 class=\"mt-6 text-lg font-semibold\">The Three Methods:</h3><div class=\"mt-6 space-y-6\"><div class=\"bg-red-900/20 border border-red-500/30 p-4 rounded\"><p class=\"font-semibold text-red-400\">Method 1: Accelerated Growth Cloning</p><p class=\"text-sm mt-2\">Full genetic clone grown in 5-6 months using growth acceleration technology. Body is perfect replica but consciousness must be programmed with memories.</p><p class=\"text-xs mt-2 text-slate-400\">Flaw: Often appears slightly 'off' behaviorally. The uncanny valley effect.</p></div><div class=\"bg-yellow-900/20 border border-yellow-500/30 p-4 rounded\"><p class=\"font-semibold text-yellow-400\">Method 2: Body Double Enhancement</p><p class=\"text-sm mt-2\">Find a natural lookalike. Use surgery, dental work, and voice coaching to perfect the match. Implant with target's memories via interrogation and hypnosis.</p><p class=\"text-xs mt-2 text-slate-400\">Flaw: Bone structure can't be perfectly matched. Facial recognition can detect differences.</p></div><div class=\"bg-purple-900/20 border border-purple-500/30 p-4 rounded\"><p class=\"font-semibold text-purple-400\">Method 3: Consciousness Transfer (Permanent)</p><p class=\"text-sm mt-2\">Full consciousness uploaded from original brain to clone body. Original is terminated. The person continues with full memories in new body.</p><p class=\"text-xs mt-2 text-slate-400\">Flaw: Theoretical. May not be fully operational yet. Or is it?</p></div></div>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s3p3,
      questionType: "multiple_choice",
      questionText: "Three methods exist: Perfect clones (genetic), surgery on doubles (imperfect bones), or consciousness transfer (perfect body, copied mind). If you had to become someone else and fool the world, which would you choose?",
      options: [
        { id: "a", text: "Perfect clone - genetic match, no detection possible" },
        { id: "b", text: "Surgical double - cheaper, faster, 'good enough'" },
        { id: "c", text: "Consciousness transfer - keep my mind, get their body" },
        { id: "d", text: "They all sound like horror" },
      ],
      explanation: "Each method has flaws. Perfect clones lack original memories - they're programmed, never quite right. Surgical doubles can't fix bones - forensics catches them. Consciousness transfer? It's theoretical. Maybe impossible. Or maybe that's what they want you to think. The question isn't which method works best. It's which one they're ACTUALLY using.",
    });

    // Section 3 - Page 4
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section3,
      order: 3,
      content: `<h2>The Memory Implantation Problem</h2><p>You can clone a body perfectly. You can even transfer consciousness.</p><p class=\"mt-4\">But memories? Memories are the hard part.</p><p class=\"mt-6\">A clone with a person's DNA but without their memories is just... a lookalike. They don't know the childhood stories. The private jokes. The subtle mannerisms learned over decades.</p><p class=\"mt-6 text-lg font-semibold\">This is why replacements often fail.</p><h3 class=\"mt-6\">The Tell-Tale Signs:</h3><ul class=\"mt-4 space-y-3\"><li><strong>Forgotten details:</strong> Post-replacement celebrities often can't recall specific events from their past</li><li><strong>Changed relationships:</strong> Old friends report the person feels 'distant' or 'different'</li><li><strong>Lost skills:</strong> Musicians who suddenly can't play instruments they mastered</li><li><strong>Personality shifts:</strong> Complete 180-degree changes in temperament overnight</li></ul><p class=\"mt-6\">Record labels, handlers, and PR teams work overtime to explain these changes:</p><p class=\"mt-4 text-center italic text-slate-300\">"They've matured." "Rehab changed them." "They found themselves."</p><p class=\"mt-6 text-xl font-bold text-center\">But you can't find yourself by becoming someone else.</p>`,
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
      content: `<h2>Britney Spears: 2007</h2><p>February 16, 2007. Britney Spears walks into Esther's Haircutting Studio in Tarzana, California.</p><p class=\"mt-4\">She asks for a haircut. The stylist hesitates. Britney grabs the clippers.</p><p class=\"mt-4 text-xl font-semibold\">And shaves her entire head.</p><p class=\"mt-6\">The photos went viral. The media called it a 'breakdown.'</p><p class=\"mt-4\">But look at her eyes in those photos. <em>Really look</em>.</p><p class=\"mt-6\">That wasn't a breakdown.</p><p class=\"mt-2 text-2xl font-bold text-center\">That was rebellion.</p><div class=\"mt-8 bg-slate-800/50 p-6 rounded\"><p class=\"font-semibold text-yellow-400\">What Happened Next:</p><ul class=\"mt-4 space-y-3 text-sm\"><li>Forced into psychiatric hold</li><li>Lost custody of her children</li><li>Placed under conservatorship—legal control stripped away</li><li>Father gained complete control over her life, finances, career</li><li>Returned to performing within months, but 'different'</li></ul></div><p class=\"mt-6\">Fans noticed immediately: Her dancing became mechanical. Her eyes looked empty. Her smile seemed forced.</p><p class=\"mt-6 text-lg\">The conservatorship lasted <strong>13 years</strong>.</p><p class=\"mt-4 text-lg\">Thirteen years of someone else controlling every aspect of her life.</p><p class=\"mt-6 text-xl font-bold text-center text-red-400\">Or thirteen years of hiding the replacement.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "2007: Britney shaves her head. 2008: Conservatorship begins. Her father controls her life. 13 years later, she's 'freed.' But she performed. Recorded albums. Vegas residencies. For 13 years. While legally incapable of controlling her own life. How?",
      options: [
        { id: "a", text: "The conservatorship was justified - she needed help" },
        { id: "b", text: "She was functional enough to perform but not to have freedom?" },
        { id: "c", text: "The conservatorship was cover for the replacement" },
        { id: "d", text: "Something about this timeline doesn't add up" },
      ],
      explanation: "Legally incompetent to make decisions about her own money, body, or life. But competent enough to perform choreography, sing, do interviews, make millions for her handlers. For 13 years. Most conservatorships are temporary - months, maybe a year. Britney's lasted over a decade. Long enough to train a replacement. Long enough to make everyone forget what the real Britney was like.",
    });

    // Section 4 - Page 2
    const s4p2 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 1,
      content: `<h2>The Dead Eyes</h2><p>Watch Britney's performances from before 2007. Watch the interviews. She's alive. Electric. Present.</p><p class=\"mt-4\">Now watch anything from 2008 onwards.</p><p class=\"mt-6\">The technical skill is there. The choreography is executed. But something is <em>missing</em>.</p><blockquote class=\"border-l-4 border-red-500 pl-4 italic my-6\">\"She moves like someone playing Britney Spears in a movie. She hits all the marks. But there's no soul behind it. The light is gone.\" - Former backup dancer, anonymous interview 2019</blockquote><p class=\"mt-6\">During her Las Vegas residency (2013-2017), fans reported:</p><ul class=\"mt-4 space-y-3\"><li>Identical performances every single night—no improvisation</li><li>Lip-syncing to pre-recorded tracks (confirmed)</li><li>Repeating the same interview answers word-for-word on different shows</li><li>Appearing confused when asked about her own past</li></ul><p class=\"mt-6 text-lg\">Some said she was just tired. Medicated. Traumatized.</p><p class=\"mt-4 text-xl font-bold\">But what if she was just... programmed?</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p2,
      questionType: "multiple_choice",
      questionText: "Watch a 2003 Britney performance. She's ALIVE. Electric. Improvising. Now watch 2010. Perfect execution. Zero spontaneity. A backup dancer said 'She moves like someone playing Britney in a movie.' What happened to the spark?",
      options: [
        { id: "a", text: "Age and exhaustion - she lost the passion" },
        { id: "b", text: "Medication - psych drugs can do that" },
        { id: "c", text: "Programming - she's executing code, not performing" },
        { id: "d", text: "That's not Britney. It's someone pretending to be her." },
      ],
      explanation: "The body hits every mark. The voice syncs to the track. But there's nobody home. Dancers who worked with her before and after say it's like performing with a different person. Same face. Different soul. Or... no soul at all. Just perfect, mechanical execution. Like she's playing a role. Like she's been programmed to be 'Britney Spears' without understanding what that means.",
    });

    // Section 4 - Page 3
    const s4p3 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 2,
      content: `<h2>The Others</h2><p>Britney. Paul. Avril. Eminem. Gucci.</p><p class=\"mt-4\">These are just the most obvious cases.</p><p class=\"mt-6\">How many others have been replaced that we haven't noticed yet?</p><h3 class=\"mt-8 text-lg font-semibold\">Additional Suspected Cases:</h3><div class=\"mt-6 space-y-4\"><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">Dave Chappelle</p><p class=\"text-sm mt-2\">Disappeared to Africa in 2005. Returned years later noticeably heavier, with different facial features. Fans note changed personality and comedy style.</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">Miley Cyrus</p><p class=\"text-sm mt-2\">Dramatic shift from Disney star to wild child in 2013. Completely different persona, voice quality changed, eyes appear different color in some photos.</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">Beyoncé</p><p class=\"text-sm mt-2\">Multiple instances of appearing with different heights, facial features, and even skin tones at events close together. Leading to theories of multiple clones or body doubles.</p></div><div class=\"bg-slate-800/50 p-4 rounded\"><p class=\"font-semibold text-red-400\">Justin Bieber</p><p class=\"text-sm mt-2\">2013 behavioral meltdown followed by complete personality change. Fans note voice matured 'too quickly' and facial structure shifted dramatically.</p></div></div>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p3,
      questionType: "multiple_choice",
      questionText: "Look at the pattern: Public breakdown → Disappearance → Return changed. Britney. Avril. Eminem. Dave Chappelle. Miley. The pattern repeats. What's the breakdown really for?",
      options: [
        { id: "a", text: "Mental health crisis - they all needed help" },
        { id: "b", text: "Cover story while the replacement is prepared" },
        { id: "c", text: "Coincidence - famous people break down sometimes" },
        { id: "d", text: "I'm starting to see it everywhere now" },
      ],
      explanation: "The breakdown is perfect cover. Public sympathy. Media understanding when they 'come back different.' Time away from cameras while the replacement trains. 'Rehab' explains personality changes. 'Finding themselves' explains new behavior. And we accept it. Because we want to believe people can change. But can they change THIS much? The pattern is too consistent to ignore.",
    });

    // Section 4 - Page 4
    const s4p4 = await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 3,
      content: `<h2>Why Replace Them?</h2><p>The question isn't whether they can replace celebrities.</p><p class=\"mt-4\">The question is: <em>Why would they?</em></p><h3 class=\"mt-8\">The Theories:</h3><div class=\"mt-6 space-y-6\"><div class=\"bg-slate-900/50 p-5 rounded border-l-4 border-red-500\"><p class=\"font-semibold text-red-400\">Theory 1: Control</p><p class=\"text-sm mt-2\">Celebrities have enormous influence. A cloned celebrity can be programmed, controlled, used to push specific agendas and messages to millions.</p></div><div class=\"bg-slate-900/50 p-5 rounded border-l-4 border-yellow-500\"><p class=\"font-semibold text-yellow-400\">Theory 2: Asset Protection</p><p class=\"text-sm mt-2\">When a celebrity dies or becomes unreliable, they represent hundreds of millions in lost revenue. A replacement protects the investment.</p></div><div class=\"bg-slate-900/50 p-5 rounded border-l-4 border-purple-500\"><p class=\"font-semibold text-purple-400\">Theory 3: Punishment</p><p class=\"text-sm mt-2\">When celebrities speak out, resist, or know too much, replacement is the ultimate silencing. The person is erased. A puppet takes their place.</p></div><div class=\"bg-slate-900/50 p-5 rounded border-l-4 border-blue-500\"><p class=\"font-semibold text-blue-400\">Theory 4: Entertainment for Elites</p><p class=\"text-sm mt-2\">Per Donald Marshall: It's sport. The elite clone celebrities for underground entertainment, performances, and darker purposes.</p></div></div><p class=\"mt-8 text-xl font-bold text-center\">Pick your explanation.</p><p class=\"mt-4 text-center text-lg text-slate-400\">They're all equally terrifying.</p>`,
      hasQuestion: true,
    });

    await ctx.db.insert("questions", {
      pageId: s4p4,
      questionType: "multiple_choice",
      questionText: "Why replace them? Control (push agendas)? Money (protect investment)? Punishment (silence dissent)? Entertainment (elite games)? Pick the reason that disturbs you most.",
      options: [
        { id: "a", text: "Control - we're being manipulated through puppets we trust" },
        { id: "b", text: "Money - human life is just a business asset to protect" },
        { id: "c", text: "Punishment - speak the truth, get erased and replaced" },
        { id: "d", text: "Entertainment - we're in a sick game for their amusement" },
      ],
      explanation: "All four motives are probably true. Control: replaced celebrities push messages. Money: dead stars stop generating profit. Punishment: dissent gets you terminated and copied. Entertainment: Donald Marshall says elites watch it all for fun. The real horror? They don't need just ONE reason. They have the technology. They use it for ALL of these reasons. Simultaneously.",
    });

    // Section 4 - Page 5 (Final)
    await ctx.db.insert("theoryPages", {
      theoryId: mainTheory,
      sectionId: section4,
      order: 4,
      content: `<h2>Look Closer</h2><p>The next time you see a celebrity who's been through 'rehab' or a 'transformation'...</p><p class=\"mt-4\">The next time someone 'finds themselves' and comes back different...</p><p class=\"mt-4\">The next time a public figure has a 'breakdown' and returns months later...</p><p class=\"mt-8 text-2xl font-bold text-center\">Look at their eyes.</p><p class=\"mt-6 text-lg text-center\">Compare photos from before and after.</p><p class=\"mt-4 text-lg text-center\">Listen to their voice.</p><p class=\"mt-4 text-lg text-center\">Watch how they move.</p><p class=\"mt-8\">You'll start to see what others have seen.</p><p class=\"mt-4\">The subtle wrongness. The uncanny valley. The feeling that something is <em>off</em>.</p><div class=\"mt-10 bg-red-900/20 border-2 border-red-500/50 p-6 rounded text-center\"><p class=\"text-2xl font-bold text-red-400\">They are not who they say they are.</p><p class=\"mt-4 text-lg\">They are not who they were.</p><p class=\"mt-6 text-xl font-bold\">And soon...</p><p class=\"mt-2 text-xl font-bold text-yellow-400\">You won't be able to unsee it.</p></div><p class=\"mt-10 text-center text-slate-400\">The cloning centers are real.</p><p class=\"mt-2 text-center text-slate-400\">The replacements walk among us.</p><p class=\"mt-2 text-center text-slate-400\">And now you know.</p><p class=\"mt-8 text-center text-2xl font-bold\">Welcome to the other side of the mirror.</p>`,
      hasQuestion: false,
    });

    console.log("Celebrity Cloning conspiracy seeded successfully - 1 theory with 4 sections!");
    return null;
  },
});
