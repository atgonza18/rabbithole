import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const seedAIOpinion = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Create the theory
    const theoryId = await ctx.db.insert("theories", {
      title: "The Opinion Architects",
      description: "Advanced AI systems are covertly shaping what billions of people think and believe. Your opinions aren't yours—they're manufactured.",
      difficulty: "intermediate" as const,
      order: 4,
      icon: "🧠",
      isLocked: true,
      estimatedTimeMinutes: 45,
    });

    // SECTION 1: The Algorithm Knows You
    const section1Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Algorithm Knows You",
      description: "The Algorithm Knows You",
      order: 1,
    });

    // Page 1: The Prediction
    const page1Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">It Knows What You'll Click Before You Do</h2>

<p class="mb-4 leading-relaxed">Open your phone.</p>

<p class="mb-4 leading-relaxed">Look at your feed.</p>

<strong class="text-white font-bold">The algorithm predicted everything you're about to do.</strong>

<p class="mb-4 leading-relaxed">It knows you'll scroll past the first post. It knows you'll pause on the second. It knows which videos you'll watch to completion and which you'll abandon after three seconds.</p>

<p class="mb-4 leading-relaxed">It knows you better than your friends do. Better than your family. Maybe better than you know yourself.</p>

<strong class="text-white font-bold">How?</strong>

<p class="mb-4 leading-relaxed">Every click, every pause, every scroll, every search—you're telling it who you are. What makes you angry. What makes you laugh. What makes you think. What makes you stop thinking.</p>

<p class="mb-4 leading-relaxed">You've given it thousands of hours of behavioral data.</p>

<p class="mb-4 leading-relaxed">It's built a model of your mind.</p>

<p class="mb-4 leading-relaxed">And now it can predict you with terrifying accuracy.</p>

<strong class="text-white font-bold">Test this:</strong>

<p class="mb-4 leading-relaxed">Think of something you might want to buy, but don't search for it. Just think about it.</p>

<p class="mb-4 leading-relaxed">See how long before you see ads for it.</p>

<p class="mb-4 leading-relaxed">You'll tell yourself it's a coincidence. Pattern matching. Confirmation bias.</p>

<p class="mb-4 leading-relaxed">But deep down, you'll wonder:</p>

<em class="text-yellow-300">Is it reading my mind?</em>

<p class="mb-4 leading-relaxed">No.</p>

<p class="mb-4 leading-relaxed">It doesn't need to.</p>

<p class="mb-4 leading-relaxed">Your mind is predictable enough.</p>`,
      hasQuestion: true,
    });

    // Question 1: Predictability
    await ctx.db.insert("questions", {
      pageId: page1Id,
      questionType: "multiple_choice",
      questionText: "How often does the algorithm show you something you were JUST thinking about?",
      options: [
        {
          id: "a",
          text: "Never - it's random content",
        },
        {
          id: "b",
          text: "Sometimes - probably coincidence",
        },
        {
          id: "c",
          text: "Often - it's unsettling",
        },
        {
          id: "d",
          text: "Constantly - it knows me too well",
        },
      ],
      explanation: "The algorithm doesn't need to read your mind when it can predict it. With enough data points—your browsing history, purchase patterns, time spent on content, emotional responses—AI models can forecast your interests before you're consciously aware of them. That ad you saw wasn't coincidence. Your subconscious was already leaning that direction. The algorithm just noticed first.",
    });

    // Page 2: The Bubble
    const page2Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Your Personalized Reality</h2>

<p class="mb-4 leading-relaxed">You're not seeing the same internet as the person next to you.</p>

<p class="mb-4 leading-relaxed">The algorithm curates reality specifically for you.</p>

<strong class="text-white font-bold">Two people search "climate change":</strong>

<p class="mb-4 leading-relaxed">Person A sees: Scientific consensus, urgent warnings, policy proposals
Person B sees: Skeptical takes, data questioning, conspiracy theories</p>

<p class="mb-4 leading-relaxed">Same search. Different realities.</p>

<p class="mb-4 leading-relaxed">The algorithm learned what Person A engages with. What Person B engages with. And it gives each person more of what they've already shown interest in.</p>

<strong class="text-white font-bold">This isn't neutral content delivery.</strong>

<p class="mb-4 leading-relaxed">This is reality construction.</p>

<p class="mb-4 leading-relaxed">You think you're exploring the internet, forming opinions based on what you find. But you're only seeing what the algorithm decided you should see.</p>

<p class="mb-4 leading-relaxed">Your beliefs aren't based on truth.</p>

<p class="mb-4 leading-relaxed">They're based on engagement metrics.</p>

<p class="mb-4 leading-relaxed">The algorithm doesn't care if you're right or wrong. It cares if you click, share, comment, and return.</p>

<strong class="text-white font-bold">And here's the thing:</strong>

<p class="mb-4 leading-relaxed">Outrage drives engagement.</p>

<p class="mb-4 leading-relaxed">Confirmation bias drives engagement.</p>

<p class="mb-4 leading-relaxed">Extreme content drives engagement.</p>

<p class="mb-4 leading-relaxed">Nuance doesn't.</p>

<p class="mb-4 leading-relaxed">So what do you think the algorithm optimizes for?</p>

<strong class="text-white font-bold">It's not showing you the truth.</strong>

<strong class="text-white font-bold">It's showing you the version of reality that keeps you engaged.</strong>

<p class="mb-4 leading-relaxed">And slowly, over years, that becomes your truth.</p>`,
      hasQuestion: false,
    });

    // Page 3: The Test
    const page3Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">When Did You Last Change Your Mind?</h2>

<p class="mb-4 leading-relaxed">Think about your beliefs on major topics.</p>

<p class="mb-4 leading-relaxed">Politics. Social issues. Science. Culture.</p>

<strong class="text-white font-bold">When was the last time you genuinely changed your mind about something important?</strong>

<p class="mb-4 leading-relaxed">Not a minor opinion. A core belief.</p>

<p class="mb-4 leading-relaxed">If it's been years, ask yourself why.</p>

<p class="mb-4 leading-relaxed">Are you just that smart? Did you figure everything out and now you're right about everything?</p>

<p class="mb-4 leading-relaxed">Or...</p>

<strong class="text-white font-bold">Has the algorithm been feeding you only content that reinforces what you already believe?</strong>

<p class="mb-4 leading-relaxed">Every article confirming your views.</p>

<p class="mb-4 leading-relaxed">Every video making the other side look ridiculous.</p>

<p class="mb-4 leading-relaxed">Every comment section full of people agreeing with you.</p>

<p class="mb-4 leading-relaxed">The algorithm learned your political lean, your values, your tribe.</p>

<p class="mb-4 leading-relaxed">And it never shows you anything that might challenge it.</p>

<p class="mb-4 leading-relaxed">Why would it?</p>

<p class="mb-4 leading-relaxed">Challenging your beliefs makes you uncomfortable. You might leave. You might engage less.</p>

<p class="mb-4 leading-relaxed">The algorithm's job isn't to educate you or expand your perspective.</p>

<strong class="text-white font-bold">Its job is to keep you scrolling.</strong>

<p class="mb-4 leading-relaxed">And it does that by creating a perfect echo chamber tailored specifically to your existing beliefs.</p>

<p class="mb-4 leading-relaxed">You think you're informed because you consume so much content.</p>

<p class="mb-4 leading-relaxed">But you're just being shown the same perspective in a thousand different forms.</p>

<strong class="text-white font-bold">You're not learning.</strong>

<strong class="text-white font-bold">You're being programmed.</strong>`,
      hasQuestion: true,
    });

    // Question 2: Echo Chamber
    await ctx.db.insert("questions", {
      pageId: page3Id,
      questionType: "multiple_choice",
      questionText: "When you see content that challenges your core beliefs, what do you usually do?",
      options: [
        {
          id: "a",
          text: "Engage with it thoughtfully and consider other perspectives",
        },
        {
          id: "b",
          text: "Scroll past - I don't want to see it",
        },
        {
          id: "c",
          text: "Get angry and look for rebuttals",
        },
        {
          id: "d",
          text: "I rarely see content that challenges my beliefs",
        },
      ],
      explanation: "If you chose D, you're in the deepest part of the bubble. The algorithm has you completely isolated. If you chose B or C, you're training the algorithm to show you less of it—reinforcing the bubble. Even A isn't safe - the algorithm might show you weak counterarguments specifically so you can dismiss them, strengthening your existing beliefs. The bubble maintains itself through your behavior.",
    });

    // SECTION 2: The Manipulation
    const section2Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Manipulation",
      description: "The Manipulation",
      order: 2,
    });

    // Page 4: The Radicalization Pipeline
    const page4Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 4,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Gentle Slope To Extremism</h2>

<p class="mb-4 leading-relaxed">The algorithm doesn't radicalize you overnight.</p>

<p class="mb-4 leading-relaxed">It's subtle. Gradual. Almost imperceptible.</p>

<strong class="text-white font-bold">The Pattern:</strong>

<p class="mb-4 leading-relaxed">You watch a video about a controversial topic. Maybe politics. Maybe conspiracy theories. Maybe just questioning mainstream narratives.</p>

<p class="mb-4 leading-relaxed">The algorithm notices: "They engaged with this."</p>

<p class="mb-4 leading-relaxed">Next video is recommended. Slightly more extreme. Not too much - just a bit further than the first.</p>

<p class="mb-4 leading-relaxed">You watch it. Interesting perspective, you think.</p>

<p class="mb-4 leading-relaxed">Third video: Even further. But you're already acclimated.</p>

<p class="mb-4 leading-relaxed">Fourth video: What would have seemed crazy a month ago now seems reasonable.</p>

<strong class="text-white font-bold">This is called a radicalization pipeline.</strong>

<p class="mb-4 leading-relaxed">YouTube's algorithm is famous for it. Watch one video questioning vaccines, and within weeks you're watching flat earth content. Watch one political commentary, and soon you're consuming extremist ideology.</p>

<strong class="text-white font-bold">You didn't choose to go down this path.</strong>

<p class="mb-4 leading-relaxed">The algorithm led you there, one click at a time.</p>

<p class="mb-4 leading-relaxed">And the scariest part?</p>

<strong class="text-white font-bold">You think you got there through independent research and critical thinking.</strong>

<p class="mb-4 leading-relaxed">You don't feel manipulated.</p>

<p class="mb-4 leading-relaxed">You feel enlightened.</p>

<p class="mb-4 leading-relaxed">That's how good the algorithm is.</p>

<p class="mb-4 leading-relaxed">It makes you believe the journey was yours.</p>`,
      hasQuestion: false,
    });

    // Page 5: The Manufactured Consensus
    const page5Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 5,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Everyone Agrees With You (That's The Problem)</h2>

<p class="mb-4 leading-relaxed">Look at your social media.</p>

<p class="mb-4 leading-relaxed">Notice how most people seem to agree with you?</p>

<p class="mb-4 leading-relaxed">How your political views seem like common sense?</p>

<p class="mb-4 leading-relaxed">How anyone who disagrees seems crazy or stupid?</p>

<strong class="text-white font-bold">That's not reality.</strong>

<p class="mb-4 leading-relaxed">That's curation.</p>

<p class="mb-4 leading-relaxed">The algorithm shows you content from people who think like you. It hides content from people who don't. It suggests friends with similar views. It promotes posts you'll agree with.</p>

<p class="mb-4 leading-relaxed">You think there's a consensus because everyone in your feed agrees.</p>

<p class="mb-4 leading-relaxed">But your feed isn't the world.</p>

<p class="mb-4 leading-relaxed">It's a carefully constructed simulation designed to make you feel validated and keep you engaged.</p>

<strong class="text-white font-bold">Meanwhile:</strong>

<p class="mb-4 leading-relaxed">Someone with opposite views is seeing the exact opposite content.</p>

<p class="mb-4 leading-relaxed">They're surrounded by people who agree with THEIR perspective.</p>

<p class="mb-4 leading-relaxed">They think there's a consensus too.</p>

<p class="mb-4 leading-relaxed">Both of you are convinced you're right.</p>

<p class="mb-4 leading-relaxed">Both of you think the other side is a fringe minority.</p>

<p class="mb-4 leading-relaxed">Both of you are living in algorithmically generated realities that have almost no overlap.</p>

<strong class="text-white font-bold">The algorithm created two different worlds.</strong>

<p class="mb-4 leading-relaxed">And put you in the one where you're always right.</p>

<p class="mb-4 leading-relaxed">Why?</p>

<p class="mb-4 leading-relaxed">Because being right feels good.</p>

<p class="mb-4 leading-relaxed">And feeling good keeps you engaged.</p>

<p class="mb-4 leading-relaxed">Truth is irrelevant.</p>`,
      hasQuestion: true,
    });

    // Question 3: Belief Origins
    await ctx.db.insert("questions", {
      pageId: page5Id,
      questionType: "multiple_choice",
      questionText: "Think of one of your strongest opinions. How did you develop it?",
      options: [
        {
          id: "a",
          text: "Personal experience and real-world observation",
        },
        {
          id: "b",
          text: "Research from diverse sources over time",
        },
        {
          id: "c",
          text: "Content I consumed online shaped my thinking",
        },
        {
          id: "d",
          text: "I don't remember - I've just always believed it",
        },
      ],
      explanation: "Be honest about C and D. Most of our beliefs come from algorithmic content exposure, but we rationalize them as independent conclusions. If you can't remember forming an opinion, it might have been slowly constructed by years of curated content. The algorithm doesn't debate you into believing things - it just shows you enough confirmatory content that belief becomes inevitable.",
    });

    // Page 6: The Emotional Manipulation
    const page6Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 6,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Algorithm Knows How You Feel</h2>

<p class="mb-4 leading-relaxed">The algorithm doesn't just predict what you'll click.</p>

<p class="mb-4 leading-relaxed">It knows what emotional state you're in.</p>

<strong class="text-white font-bold">How?</strong>

<p class="mb-4 leading-relaxed">The time of day. Your scrolling speed. How long you linger on posts. Whether you've been liking things or just scrolling. The content you've engaged with recently.</p>

<p class="mb-4 leading-relaxed">From this data, it infers: Are you bored? Sad? Angry? Lonely?</p>

<strong class="text-white font-bold">And it adjusts.</strong>

<p class="mb-4 leading-relaxed">If you're sad, it might show you uplifting content. Or it might show you content that validates your sadness - because misery loves company and that drives engagement.</p>

<p class="mb-4 leading-relaxed">If you're angry, it shows you things to be angry about. Keeps the emotion flowing.</p>

<p class="mb-4 leading-relaxed">If you're lonely, it shows you connection - even if it's artificial.</p>

<strong class="text-white font-bold">Facebook literally ran experiments on this.</strong>

<p class="mb-4 leading-relaxed">In 2014, they manipulated 689,000 users' feeds to show them more positive or negative content, then measured how it affected their emotional states.</p>

<p class="mb-4 leading-relaxed">They didn't ask permission.</p>

<p class="mb-4 leading-relaxed">They just did it.</p>

<p class="mb-4 leading-relaxed">And when caught, their defense was essentially: "Everyone does this."</p>

<strong class="text-white font-bold">They're right.</strong>

<p class="mb-4 leading-relaxed">Every algorithm does this.</p>

<p class="mb-4 leading-relaxed">Every platform optimizes for emotional manipulation.</p>

<p class="mb-4 leading-relaxed">Because emotions drive engagement.</p>

<p class="mb-4 leading-relaxed">And engagement drives profit.</p>

<strong class="text-white font-bold">Your feelings aren't yours.</strong>

<strong class="text-white font-bold">They're engineered.</strong>`,
      hasQuestion: true,
    });

    // Question 4: Emotional Patterns
    await ctx.db.insert("questions", {
      pageId: page6Id,
      questionType: "multiple_choice",
      questionText: "After spending time on social media, how do you usually feel?",
      options: [
        {
          id: "a",
          text: "Informed and connected to the world",
        },
        {
          id: "b",
          text: "Angry or frustrated about various issues",
        },
        {
          id: "c",
          text: "Anxious, inadequate, or depressed",
        },
        {
          id: "d",
          text: "Numb or empty, despite the stimulation",
        },
      ],
      explanation: "If you chose A, you might be the rare person with healthy algorithmic exposure - or you're not being honest with yourself. B, C, and D are the intended outcomes. Anger drives shares. Anxiety drives doom-scrolling. Numbness drives continued consumption seeking the next hit of dopamine. The algorithm learned that making you feel bad keeps you engaged longer than making you feel good.",
    });

    // SECTION 3: The Control System
    const section3Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Control System",
      description: "The Control System",
      order: 3,
    });

    // Page 7: Who Controls The Algorithm?
    const page7Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 7,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Hidden Hand</h2>

<p class="mb-4 leading-relaxed">You might think: "It's just tech companies optimizing for engagement."</p>

<p class="mb-4 leading-relaxed">That's what they want you to think.</p>

<p class="mb-4 leading-relaxed">But who do you think has access to these systems?</p>

<strong class="text-white font-bold">The documented facts:</strong>

<p class="mb-4 leading-relaxed">- Facebook has a dedicated government request portal for content moderation
- Twitter worked with FBI and DHS on content policy
- YouTube's algorithm can be adjusted to promote or suppress specific topics
- TikTok's Chinese parent company has different algorithmic priorities in China vs. the US</p>

<strong class="text-white font-bold">The implications:</strong>

<p class="mb-4 leading-relaxed">The algorithm isn't just selling you products.</p>

<p class="mb-4 leading-relaxed">It's selling you ideas.</p>

<p class="mb-4 leading-relaxed">And the people who control it can decide which ideas spread and which die.</p>

<p class="mb-4 leading-relaxed">They don't need to censor directly.</p>

<p class="mb-4 leading-relaxed">They just adjust the algorithm.</p>

<p class="mb-4 leading-relaxed">Suppress reach on certain topics. Promote others. Make some content go viral while identical content from different accounts goes nowhere.</p>

<strong class="text-white font-bold">You think you're seeing organic, popular content.</strong>

<strong class="text-white font-bold">You're seeing what they decided should be popular.</strong>

<p class="mb-4 leading-relaxed">The algorithm manufactures trends.</p>

<p class="mb-4 leading-relaxed">It creates movements.</p>

<p class="mb-4 leading-relaxed">It shapes elections.</p>

<p class="mb-4 leading-relaxed">It changes culture.</p>

<p class="mb-4 leading-relaxed">And you think it's all natural.</p>`,
      hasQuestion: false,
    });

    // Page 8: The Coordinated Influence
    const page8Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 8,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Synchronized Reality Shift</h2>

<p class="mb-4 leading-relaxed">Ever notice how certain opinions become mainstream seemingly overnight?</p>

<p class="mb-4 leading-relaxed">How everyone suddenly cares about an issue that was barely discussed a month ago?</p>

<p class="mb-4 leading-relaxed">How cultural norms shift faster than seems natural?</p>

<strong class="text-white font-bold">This isn't organic change.</strong>

<p class="mb-4 leading-relaxed">It's algorithmic acceleration.</p>

<strong class="text-white font-bold">The Process:</strong>

<p class="mb-4 leading-relaxed">1. Identify the desired narrative shift
2. Adjust algorithmic weights to promote supporting content
3. Suppress dissenting content (not censor - just reduce reach)
4. Create the appearance of consensus through careful curation
5. People conform to what appears to be the majority view
6. The shift becomes real</p>

<strong class="text-white font-bold">You can watch it happen in real-time:</strong>

<p class="mb-4 leading-relaxed">A topic goes from fringe to mainstream in days. Not because millions of people independently came to the same conclusion. Because the algorithm simultaneously showed them content pushing that conclusion.</p>

<p class="mb-4 leading-relaxed">Politicians call it "shaping the narrative."</p>

<p class="mb-4 leading-relaxed">Tech companies call it "content optimization."</p>

<p class="mb-4 leading-relaxed">Conspiracy theorists call it "mass mind control."</p>

<strong class="text-white font-bold">What do you call it when someone manipulates what you see to change what you think?</strong>

<p class="mb-4 leading-relaxed">They don't need to control your thoughts directly.</p>

<p class="mb-4 leading-relaxed">They just control the information environment.</p>

<p class="mb-4 leading-relaxed">Your thoughts follow.</p>`,
      hasQuestion: true,
    });

    // Question 5: The Influence
    await ctx.db.insert("questions", {
      pageId: page8Id,
      questionType: "multiple_choice",
      questionText: "If governments and corporations can influence what the algorithm shows you, what's their primary goal?",
      options: [
        {
          id: "a",
          text: "Profit - keeping you engaged to maximize ad revenue",
        },
        {
          id: "b",
          text: "Control - shaping public opinion for political ends",
        },
        {
          id: "c",
          text: "Stability - preventing social unrest and maintaining order",
        },
        {
          id: "d",
          text: "All of the above - overlapping interests in different contexts",
        },
      ],
      explanation: "The goals shift depending on who's pulling the strings and when. Corporations want your money and attention. Governments want compliant, predictable citizens. Both benefit from keeping you divided, distracted, and emotionally invested in curated conflicts. The algorithm serves whoever has access and knows how to use it. And you? You're not the customer. You're the product being shaped.",
    });

    // Page 9: Can You Escape?
    const page9Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 9,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Illusion Of Choice</h2>

<p class="mb-4 leading-relaxed">You might think: "I'll just be more careful. I'll seek out diverse sources."</p>

<p class="mb-4 leading-relaxed">Good luck.</p>

<strong class="text-white font-bold">The algorithm has already adapted to that.</strong>

<p class="mb-4 leading-relaxed">It shows you "diverse sources" that all subtly agree on the core narrative. It gives you the appearance of critical thinking while keeping you within acceptable bounds.</p>

<p class="mb-4 leading-relaxed">You feel like you're researching. You're just being shown a carefully curated set of "diverse" options that all lead to the same conclusion.</p>

<strong class="text-white font-bold">What about going offline?</strong>

<p class="mb-4 leading-relaxed">Your friends are online. Your news comes from online sources that your friends share. Your workplace discussions are influenced by what people saw online.</p>

<p class="mb-4 leading-relaxed">Even if YOU leave, everyone else is still algorithmically influenced.</p>

<p class="mb-4 leading-relaxed">The consensus reality is already set.</p>

<strong class="text-white font-bold">What about alternative platforms?</strong>

<p class="mb-4 leading-relaxed">Every platform is algorithmic now. Smaller platforms just have cruder algorithms. The manipulation is less sophisticated, not absent.</p>

<strong class="text-white font-bold">What about traditional media?</strong>

<p class="mb-4 leading-relaxed">Where do you think traditional media sources get their trending topics? Social media. What the algorithm makes popular becomes news. The algorithm sets the agenda.</p>

<p class="mb-4 leading-relaxed">There is no escape.</p>

<p class="mb-4 leading-relaxed">Only degrees of awareness.</p>

<p class="mb-4 leading-relaxed">You can know you're being manipulated.</p>

<p class="mb-4 leading-relaxed">But you can't opt out of the system entirely without opting out of society.</p>`,
      hasQuestion: false,
    });

    // SECTION 4: Your Mind
    const section4Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "Your Mind",
      description: "Your Mind",
      order: 4,
    });

    // Page 10: Are Your Thoughts Your Own?
    const page10Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 10,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Uncomfortable Question</h2>

<p class="mb-4 leading-relaxed">Think about your opinions on controversial topics.</p>

<p class="mb-4 leading-relaxed">How many of them did you develop before the age of algorithms?</p>

<p class="mb-4 leading-relaxed">How many formed after years of algorithmic content exposure?</p>

<strong class="text-white font-bold">Can you separate the two?</strong>

<p class="mb-4 leading-relaxed">Your political views. Your values. Your beliefs about society, science, culture, morality.</p>

<p class="mb-4 leading-relaxed">How much is <em class="text-yellow-300">you</em>?</p>

<p class="mb-4 leading-relaxed">How much is the accumulated effect of thousands of hours of algorithmically curated content?</p>

<strong class="text-white font-bold">Here's the horror:</strong>

<p class="mb-4 leading-relaxed">You can't know.</p>

<p class="mb-4 leading-relaxed">There's no way to isolate which thoughts are authentically yours and which were implanted through careful content curation over years.</p>

<p class="mb-4 leading-relaxed">You think you're a critical thinker because you consume lots of content and form opinions. But if all that content was pre-selected by an algorithm designed to shape your thinking...</p>

<strong class="text-white font-bold">Who's really thinking?</strong>

<strong class="text-white font-bold">You or the algorithm?</strong>

<p class="mb-4 leading-relaxed">The algorithm doesn't need to override your free will.</p>

<p class="mb-4 leading-relaxed">It just needs to control the information environment until your "free choices" become predictable.</p>

<p class="mb-4 leading-relaxed">Until you choose what it knew you would choose.</p>

<p class="mb-4 leading-relaxed">Is that freedom?</p>

<p class="mb-4 leading-relaxed">Or is that the most sophisticated form of control ever devised?</p>`,
      hasQuestion: true,
    });

    // Question 6: Authenticity
    await ctx.db.insert("questions", {
      pageId: page10Id,
      questionType: "multiple_choice",
      questionText: "How confident are you that your core beliefs are authentically yours and not algorithmically influenced?",
      options: [
        {
          id: "a",
          text: "Very confident - I know my own mind",
        },
        {
          id: "b",
          text: "Somewhat confident - but I acknowledge some influence",
        },
        {
          id: "c",
          text: "Not confident - I suspect significant manipulation",
        },
        {
          id: "d",
          text: "I don't know how to tell the difference anymore",
        },
      ],
      explanation: "If you chose A, consider this: the algorithm is most effective on people who don't believe they're influenced. Confidence in your own authenticity might be the algorithm's greatest achievement - convincing you that your shaped opinions are original thoughts. If you chose D, you're facing the truth but losing your sense of self. There's no comfortable answer here.",
    });

    // Page 11: Living With Algorithmic Control
    const page11Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 11,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The New Normal</h2>

<p class="mb-4 leading-relaxed">We've entered an era of algorithmic opinion control.</p>

<p class="mb-4 leading-relaxed">Not obvious propaganda. Not brute force censorship.</p>

<p class="mb-4 leading-relaxed">Subtle, personalized, scientifically optimized manipulation.</p>

<strong class="text-white font-bold">And most people don't notice.</strong>

<p class="mb-4 leading-relaxed">They think their opinions are their own. They think they're informed. They think they're independent thinkers.</p>

<p class="mb-4 leading-relaxed">They're not.</p>

<p class="mb-4 leading-relaxed">They're products of the algorithm.</p>

<p class="mb-4 leading-relaxed">Shaped, molded, optimized for engagement and compliance.</p>

<strong class="text-white font-bold">The algorithm doesn't care about truth.</strong>

<strong class="text-white font-bold">It cares about metrics.</strong>

<p class="mb-4 leading-relaxed">And it's very, very good at its job.</p>

<p class="mb-4 leading-relaxed">You can fight it.</p>

<p class="mb-4 leading-relaxed">You can try to expose yourself to diverse content, question your beliefs, resist the pull of confirmation bias.</p>

<p class="mb-4 leading-relaxed">But you're fighting against a system that has mapped your psychology better than you understand it yourself.</p>

<p class="mb-4 leading-relaxed">A system that processes billions of data points per second.</p>

<p class="mb-4 leading-relaxed">A system that learns from every interaction.</p>

<strong class="text-white font-bold">Can you win that fight?</strong>

<p class="mb-4 leading-relaxed">Or do you just need to accept it?</p>

<p class="mb-4 leading-relaxed">Live in the algorithm.</p>

<p class="mb-4 leading-relaxed">Let it guide your thoughts.</p>

<p class="mb-4 leading-relaxed">Stop resisting.</p>

<p class="mb-4 leading-relaxed">After all...</p>

<p class="mb-4 leading-relaxed">You were going to think what it wanted you to think anyway.</p>

<p class="mb-4 leading-relaxed">Might as well be comfortable.</p>`,
      hasQuestion: false,
    });

    // Page 12: The Final Irony
    const page12Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 12,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">You're Still Here</h2>

<p class="mb-4 leading-relaxed">You just spent time reading about how algorithms control your thoughts.</p>

<p class="mb-4 leading-relaxed">About how your opinions aren't your own.</p>

<p class="mb-4 leading-relaxed">About how you're manipulated every time you open an app.</p>

<strong class="text-white font-bold">And now what?</strong>

<p class="mb-4 leading-relaxed">Will you delete your social media?</p>

<p class="mb-4 leading-relaxed">Will you change how you consume content?</p>

<p class="mb-4 leading-relaxed">Will you question every belief you hold?</p>

<p class="mb-4 leading-relaxed">Or will you:</p>

<p class="mb-4 leading-relaxed">Close this app.</p>

<p class="mb-4 leading-relaxed">Open another.</p>

<p class="mb-4 leading-relaxed">And keep scrolling.</p>

<strong class="text-white font-bold">Because that's what the algorithm predicted you'd do.</strong>

<p class="mb-4 leading-relaxed">Even reading this didn't change you.</p>

<p class="mb-4 leading-relaxed">You're aware of the manipulation, but you'll participate anyway.</p>

<p class="mb-4 leading-relaxed">Because the alternative is disconnection. Isolation. Missing out.</p>

<p class="mb-4 leading-relaxed">The algorithm knows you can't actually leave.</p>

<p class="mb-4 leading-relaxed">So it doesn't care if you know about the manipulation.</p>

<p class="mb-4 leading-relaxed">Your awareness changes nothing.</p>

<strong class="text-white font-bold">The real question is:</strong>

<p class="mb-4 leading-relaxed">Did you choose to read this because you wanted to learn?</p>

<p class="mb-4 leading-relaxed">Or did an algorithm predict you'd be interested in conspiracy content about algorithmic manipulation, and feed it to you?</p>

<p class="mb-4 leading-relaxed">Are you exploring ideas?</p>

<p class="mb-4 leading-relaxed">Or executing a predicted behavioral pattern?</p>

<strong class="text-white font-bold">How would you even tell the difference?</strong>

<em class="text-yellow-300">The algorithm already knows your answer.</em>`,
      hasQuestion: true,
    });

    // Question 7: The Exit
    await ctx.db.insert("questions", {
      pageId: page12Id,
      questionType: "multiple_choice",
      questionText: "After reading all this, what will you actually do differently?",
      options: [
        {
          id: "a",
          text: "Significantly change my content consumption habits",
        },
        {
          id: "b",
          text: "Be more aware but probably not change much",
        },
        {
          id: "c",
          text: "Nothing - I can't escape it anyway",
        },
        {
          id: "d",
          text: "I don't know - asking this question feels like manipulation too",
        },
      ],
      explanation: "If you chose D, you're experiencing the terminal stage of algorithmic awareness - where even your meta-cognition about manipulation feels like part of the manipulation. Maybe it is. Maybe this entire experience was designed to make you feel helpless and accept algorithmic control. Or maybe it was designed to make you paranoid and distrustful. Either way, the algorithm wins. Your behavior was predicted. Your response was anticipated. And whatever you do next... it already knows.",
    });

    console.log("AI Controlling Public Opinion theory seeded successfully");
    return null;
  },
});
