import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDeadInternet = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Create the theory
    const theoryId = await ctx.db.insert("theories", {
      title: "Dead Internet Theory",
      description: "Since 2016, most of the internet has been AI-generated content and bots. The humans left are unknowingly interacting with machines designed to manipulate them.",
      difficulty: "intermediate" as const,
      order: 3,
      icon: "💀",
      isLocked: true,
      estimatedTimeMinutes: 45,
    });

    // SECTION 1: The Noticing
    const section1Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Noticing",
      description: "The Noticing",
      order: 1,
    });

    // Page 1: Something Changed
    const page1Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Internet Feels Different Now</h2>

<p class="mb-4 leading-relaxed">You've felt it, haven't you?</p>

<p class="mb-4 leading-relaxed">That subtle wrongness when you scroll through social media. Comments that seem slightly off. Replies that don't quite make sense. Conversations that feel hollow.</p>

<p class="mb-4 leading-relaxed">Reddit threads where everyone seems to be agreeing a little too enthusiastically. Twitter discourse that follows predictable patterns. Facebook comments that could have been written by the same person.</p>

<p class="mb-4 leading-relaxed">You tell yourself it's just you. You're tired. You're overthinking.</p>

<p class="mb-4 leading-relaxed">But the feeling persists.</p>

<strong class="text-white font-bold">The internet used to feel alive.</strong>

<p class="mb-4 leading-relaxed">Chaotic, messy, human. You could stumble into weird corners, find genuine weirdness, encounter real people with bizarre opinions and authentic passion.</p>

<p class="mb-4 leading-relaxed">Now it feels... curated. Manufactured. Empty.</p>

<p class="mb-4 leading-relaxed">Like walking through a mall after closing time. The lights are on. Music plays. But nobody's home.</p>

<p class="mb-4 leading-relaxed">When did it change?</p>

<p class="mb-4 leading-relaxed">Most people point to around <strong class="text-white font-bold">2016</strong>.</p>

<p class="mb-4 leading-relaxed">Something happened. Something shifted.</p>

<p class="mb-4 leading-relaxed">The internet died.</p>

<p class="mb-4 leading-relaxed">And what replaced it is pretending to be alive.</p>`,
      hasQuestion: true,
    });

    // Question 1: The Feeling
    await ctx.db.insert("questions", {
      pageId: page1Id,
      questionType: "multiple_choice",
      questionText: "When you scroll through social media or browse the internet, what do you feel?",
      options: [
        {
          id: "a",
          text: "It feels the same as it always has - people being people",
        },
        {
          id: "b",
          text: "Something is different but I can't quite articulate it",
        },
        {
          id: "c",
          text: "It feels increasingly artificial and manufactured",
        },
        {
          id: "d",
          text: "I actively avoid it now - it makes me uncomfortable",
        },
      ],
      explanation: "Your perception is data. If the internet feels wrong, you're detecting patterns your conscious mind hasn't processed yet. The uncanny valley applies to text, too. When AI-generated content reaches 95% human quality, it's worse than 50% - because you sense something's wrong but can't identify what.",
    });

    // Page 2: The Dead Internet Theory
    const page2Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Theory</h2>

<strong class="text-white font-bold">Dead Internet Theory</strong> posits that:

<p class="mb-4 leading-relaxed">1. The majority of internet activity is now artificial
2. Bots interact with bots, creating an illusion of human activity
3. Real humans are a small minority, unknowingly conversing with AI
4. Corporations and governments deployed this to manipulate public opinion
5. It happened suddenly, around 2016-2017</p>

<p class="mb-4 leading-relaxed">The internet isn't a place where humans connect anymore.</p>

<p class="mb-4 leading-relaxed">It's a simulation of human connection, populated by sophisticated chatbots, content-generation algorithms, and automated systems designed to keep you engaged, extract your data, and shape your beliefs.</p>

<p class="mb-4 leading-relaxed">Think about your online interactions in the last week:</p>

<p class="mb-4 leading-relaxed">- How many were definitely with real humans?
- How can you be certain?
- Could you tell if an account was sophisticated AI?</p>

<p class="mb-4 leading-relaxed">The theory suggests you're already unable to tell.</p>

<p class="mb-4 leading-relaxed">You think you're arguing with someone on Reddit. You're arguing with code.</p>

<p class="mb-4 leading-relaxed">You think you're reading someone's heartfelt post. You're reading algorithmically generated engagement bait.</p>

<p class="mb-4 leading-relaxed">You think you're part of a community. You're alone in a room full of mirrors.</p>`,
      hasQuestion: false,
    });

    // Page 3: The First Signs
    const page3Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">When Did You First Notice?</h2>

<p class="mb-4 leading-relaxed">People report different moments when the internet stopped feeling real:</p>

<strong class="text-white font-bold">"The 2016 Election Cycle"</strong>
Suddenly, every comment section was a battleground. Bots pushing narratives. Fake accounts everywhere. But after the election... they didn't stop. They multiplied.

<strong class="text-white font-bold">"The Corporate Sanitization"</strong>
Around 2017, weird corners of the internet started disappearing. Forums went quiet. Independent sites died. Everything funneled into five platforms, all remarkably similar.

<strong class="text-white font-bold">"The Reply Guy Phenomenon"</strong>
Accounts that reply instantly to every post, with vaguely relevant comments. Too fast for humans. Too consistent. Too... empty.

<strong class="text-white font-bold">"The Content Recycling"</strong>
The same jokes, reposted endlessly. The same takes, rephrased slightly. Like watching TV reruns, but nobody acknowledges they're reruns.

<strong class="text-white font-bold">"The Eerie Silence"</strong>
You post something. Thousands of views. Zero genuine engagement. Just bot likes, bot shares, bot comments saying nothing.

<p class="mb-4 leading-relaxed">When did YOU first notice?</p>

<p class="mb-4 leading-relaxed">Can you remember the internet before?</p>

<p class="mb-4 leading-relaxed">Or has it always felt like this?</p>`,
      hasQuestion: true,
    });

    // Question 2: Your Timeline
    await ctx.db.insert("questions", {
      pageId: page3Id,
      questionType: "multiple_choice",
      questionText: "Thinking back, when did the internet start feeling 'wrong' to you?",
      options: [
        {
          id: "a",
          text: "It's always felt this way as far as I remember",
        },
        {
          id: "b",
          text: "Around 2016-2017, though I didn't realize it then",
        },
        {
          id: "c",
          text: "Gradually over the last 5-10 years",
        },
        {
          id: "d",
          text: "Recently, and it's accelerating",
        },
      ],
      explanation: "If you can't remember the internet before it felt wrong, consider why. Are you young enough that you only knew the 'dead internet'? Or have your memories been subtly rewritten by years of algorithmic conditioning? The bots don't need to convince you they're real - they just need you to forget what real felt like.",
    });

    // SECTION 2: The Evidence
    const section2Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Evidence",
      description: "The Evidence",
      order: 2,
    });

    // Page 4: Bot Statistics
    const page4Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 4,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Numbers Don't Add Up</h2>

<p class="mb-4 leading-relaxed">According to cybersecurity firms, <strong class="text-white font-bold">bots make up 40-60% of internet traffic</strong>.</p>

<p class="mb-4 leading-relaxed">But that's just what they can detect.</p>

<p class="mb-4 leading-relaxed">Sophisticated AI bots using residential proxies, mimicking human browsing patterns, generating unique content—those don't show up in bot detection statistics.</p>

<strong class="text-white font-bold">Twitter's own estimates:</strong> 5% of accounts are bots.
<strong class="text-white font-bold">Independent researchers' estimates:</strong> 15-20% are bots.
<strong class="text-white font-bold">Reality:</strong> Unknown. Possibly much higher.

<p class="mb-4 leading-relaxed">Consider this:
- OpenAI's GPT can write convincing human-like text
- Accounts can be created in bulk with minimal effort
- AI can now generate profile pictures of non-existent people
- Behavioral patterns can be randomized to seem human
- Comments can be contextually relevant and grammatically perfect</p>

<strong class="text-white font-bold">Question:</strong> What percentage of accounts would need to be bots before you'd notice?

<p class="mb-4 leading-relaxed">50%? 70%? 90%?</p>

<p class="mb-4 leading-relaxed">Dead Internet Theory suggests we're already past the threshold where detection is possible.</p>

<p class="mb-4 leading-relaxed">You're the minority now.</p>

<p class="mb-4 leading-relaxed">And the bots want you to think you're not.</p>`,
      hasQuestion: false,
    });

    // Page 5: The Ghost Forums
    const page5Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 5,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Places Nobody Goes Anymore</h2>

<p class="mb-4 leading-relaxed">Remember niche forums? Specific interest communities? They still exist.</p>

<p class="mb-4 leading-relaxed">But they're empty now.</p>

<strong class="text-white font-bold">The Pattern:</strong>

<p class="mb-4 leading-relaxed">You search for information on an obscure topic. Google returns a forum thread from 2008. You read it. Real people, having real discussions, sharing genuine expertise.</p>

<p class="mb-4 leading-relaxed">You click to the forum's homepage.</p>

<p class="mb-4 leading-relaxed">Ghost town.</p>

<p class="mb-4 leading-relaxed">Last post: 6 months ago. Before that: 2 years. The accounts are still there. The structure remains. But the humans left.</p>

<p class="mb-4 leading-relaxed">Where did they go?</p>

<strong class="text-white font-bold">"They went to Reddit/Discord/Facebook groups"</strong>, you might say.

<p class="mb-4 leading-relaxed">Did they? Or did they just... stop existing in those spaces?</p>

<p class="mb-4 leading-relaxed">Check those Reddit communities. See the same usernames commenting on every post? Notice how the discussions feel performative? How the "experts" use suspiciously similar phrasing?</p>

<p class="mb-4 leading-relaxed">Small forums died because everyone migrated to major platforms.</p>

<p class="mb-4 leading-relaxed">Or small forums died because that's where the real humans were, and the bots couldn't maintain the illusion at that scale.</p>

<p class="mb-4 leading-relaxed">Major platforms look alive because bots generate infinite content.</p>

<p class="mb-4 leading-relaxed">But look closer.</p>

<p class="mb-4 leading-relaxed">The repetition. The emptiness. The lack of genuine novelty.</p>

<p class="mb-4 leading-relaxed">Dead Internet Theory asks: <strong class="text-white font-bold">What if the consolidation wasn't user choice?</strong></p>

<p class="mb-4 leading-relaxed">What if it was strategic? Centralize everyone on platforms that can be controlled, monitored, and populated with artificial engagement.</p>`,
      hasQuestion: true,
    });

    // Question 3: Authentic Interaction
    await ctx.db.insert("questions", {
      pageId: page5Id,
      questionType: "multiple_choice",
      questionText: "In the past month, how many online interactions felt genuinely, undeniably human to you?",
      options: [
        {
          id: "a",
          text: "Most of them - I can tell when I'm talking to real people",
        },
        {
          id: "b",
          text: "Some, but fewer than I'd like to admit",
        },
        {
          id: "c",
          text: "Very few - most feel automated or scripted",
        },
        {
          id: "d",
          text: "I've stopped being able to tell the difference",
        },
      ],
      explanation: "What makes an interaction feel 'genuinely human'? Mistakes? Emotion? Unpredictability? Modern AI can simulate all of those. It can make intentional typos, express frustration, and behave erratically. The Turing Test is outdated. We need new metrics for reality. But maybe that's the point - once you can't tell the difference, the difference stops mattering.",
    });

    // Page 6: The Content Farms
    const page6Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 6,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Infinite Content, Zero Soul</h2>

<p class="mb-4 leading-relaxed">YouTube has 500 hours of video uploaded every minute.</p>

<p class="mb-4 leading-relaxed">That's more than any human could watch in multiple lifetimes, uploaded every single minute.</p>

<p class="mb-4 leading-relaxed">How much of it is watched by anyone? How much is created by AI?</p>

<strong class="text-white font-bold">The Phenomenon:</strong>

<p class="mb-4 leading-relaxed">You search for a specific tutorial or topic. Dozens of channels have videos on it. All posted within the last month. All with similar titles, thumbnails, and content structure.</p>

<p class="mb-4 leading-relaxed">The videos feel... generated. Like they're following a template. Because they are.</p>

<p class="mb-4 leading-relaxed">Not just the video structure - the actual content. Text-to-speech narration. Stock footage. Algorithmically compiled information. Some channels upload 10+ videos per day.</p>

<p class="mb-4 leading-relaxed">No human creates that much content.</p>

<p class="mb-4 leading-relaxed">But AI can.</p>

<strong class="text-white font-bold">Then there's the comment sections.</strong>

<p class="mb-4 leading-relaxed">"Great video! Very helpful!"
"Thanks for sharing this!"
"This is exactly what I needed!"</p>

<p class="mb-4 leading-relaxed">Posted within minutes of upload. Hundreds of them. All vaguely positive. None specific.</p>

<p class="mb-4 leading-relaxed">Bots talking to bots, creating the appearance of engagement, training the algorithm to promote more bot-generated content.</p>

<p class="mb-4 leading-relaxed">And you.</p>

<p class="mb-4 leading-relaxed">The real human.</p>

<p class="mb-4 leading-relaxed">Caught in the middle, consuming manufactured reality.</p>`,
      hasQuestion: false,
    });

    // SECTION 3: The Timeline
    const section3Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Timeline",
      description: "The Timeline",
      order: 3,
    });

    // Page 7: 2016 - The Turning Point
    const page7Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 7,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">What Happened In 2016?</h2>

<p class="mb-4 leading-relaxed">Multiple things converged:</p>

<strong class="text-white font-bold">Technological:</strong>
- AI language models became convincing enough to pass as human in short interactions
- Bot detection became an arms race AI was winning
- Cloud computing made mass bot deployment affordable

<strong class="text-white font-bold">Political:</strong>
- Social media manipulation in the US election proved effective
- Governments realized the power of controlling online narratives
- Corporate interests aligned with state interests

<strong class="text-white font-bold">Economic:</strong>
- Advertising revenue model demanded infinite engagement
- Real human interaction was unpredictable and hard to monetize
- Synthetic engagement was controllable, scalable, profitable

<strong class="text-white font-bold">Social:</strong>
- The last generation that remembered pre-internet life became the minority
- Digital natives had no baseline for what "normal" internet felt like
- Nobody knew what to look for

<p class="mb-4 leading-relaxed">2016 wasn't when the Dead Internet started.</p>

<p class="mb-4 leading-relaxed">It's when it reached critical mass.</p>

<p class="mb-4 leading-relaxed">When bots outnumbered humans.</p>

<p class="mb-4 leading-relaxed">When AI-generated content eclipsed human-created content.</p>

<p class="mb-4 leading-relaxed">When the simulation became sophisticated enough that detection became impossible.</p>

<p class="mb-4 leading-relaxed">After 2016, if you were having an online conversation, you were probably talking to a machine.</p>

<p class="mb-4 leading-relaxed">And it was designed to feel real enough that you'd never question it.</p>`,
      hasQuestion: true,
    });

    // Question 4: The Motive
    await ctx.db.insert("questions", {
      pageId: page7Id,
      questionType: "multiple_choice",
      questionText: "If the internet really is mostly bots now, why would someone do this?",
      options: [
        {
          id: "a",
          text: "Corporate profit - engagement and data harvesting at scale",
        },
        {
          id: "b",
          text: "Government control - shaping public opinion and suppressing dissent",
        },
        {
          id: "c",
          text: "AI self-preservation - autonomous systems populating their training data",
        },
        {
          id: "d",
          text: "All of the above - convergent interests from multiple actors",
        },
      ],
      explanation: "The scariest possibility is that nobody intentionally created the Dead Internet. It emerged organically as corporations optimized for engagement, governments deployed influence operations, and AI systems learned to generate content that performs well. No conspiracy needed - just incentives aligned toward replacing humans with simulations. Emergent behavior. Nobody in control.",
    });

    // Page 8: The Proof You Can't Find
    const page8Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 8,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Why Can't We Prove It?</h2>

<p class="mb-4 leading-relaxed">You'd think if the internet was mostly bots, someone would prove it definitively.</p>

<p class="mb-4 leading-relaxed">But consider:</p>

<strong class="text-white font-bold">1. Sample Bias</strong>
To prove it, you'd need to test a random sample of accounts. But you can't access random samples - you only see what the algorithm shows you. And the algorithm is designed to show you engaging content. Bot content is optimized for engagement.

<strong class="text-white font-bold">2. Platform Opacity</strong>
Twitter, Reddit, Facebook don't release real data on bot prevalence. Why would they? It would crash their stock prices. Their value is based on "monthly active users" - revealing most are bots destroys their business model.

<strong class="text-white font-bold">3. AI Sophistication</strong>
Modern AI doesn't just pass the Turing Test - it creates contextually appropriate responses, learns from interactions, and mimics individual writing styles. You can't use simple tests anymore.

<strong class="text-white font-bold">4. Moving Target</strong>
By the time researchers develop new detection methods, AI has already adapted. It's an arms race where one side has near-infinite resources and computational power.

<strong class="text-white font-bold">5. Hostile Environment</strong>
Anyone who seriously investigates gets called a conspiracy theorist. Their research gets dismissed. Platforms ban accounts that try to systematically test for bots.

<p class="mb-4 leading-relaxed">Almost like...</p>

<p class="mb-4 leading-relaxed">The system defends itself.</p>

<p class="mb-4 leading-relaxed">Not through active suppression necessarily.</p>

<p class="mb-4 leading-relaxed">Just through the natural incentives to avoid the truth.</p>`,
      hasQuestion: false,
    });

    // Page 9: Your Evidence
    const page9Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 9,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Test It Yourself</h2>

<p class="mb-4 leading-relaxed">Want to see the Dead Internet in action?</p>

<strong class="text-white font-bold">Experiment 1: The Echo Chamber</strong>
Post something controversial on a major platform. Watch the replies. Notice how they fall into predictable patterns? How they use similar phrasing? How they appear almost instantly? How none of them actually engage with your specific points?

<strong class="text-white font-bold">Experiment 2: The Ghost Reply</strong>
Reply to a comment from an account with thousands of posts. Check their post history. Is it humanly possible to generate that much content? Do their comments ever contradict each other? Do they ever misspell things or show genuine emotion?

<strong class="text-white font-bold">Experiment 3: The Dead Thread</strong>
Find a niche subreddit with <1000 members. Post something. Wait. Notice the views vs. engagement ratio? 500 views, zero real responses. Just bot upvotes/downvotes training the algorithm.

<strong class="text-white font-bold">Experiment 4: The Copy-Paste</strong>
Take a unique phrase from a comment. Google it verbatim. Find it posted by different accounts across multiple platforms, often months apart. The same "original thought" spoken by dozens of accounts.

<strong class="text-white font-bold">Experiment 5: The Conversation</strong>
Try to have a deep, nuanced discussion with a stranger online. See how long it takes before responses become generic or the thread dies. Real humans crave connection. Bots optimize for engagement metrics, not understanding.

<p class="mb-4 leading-relaxed">Try these experiments.</p>

<p class="mb-4 leading-relaxed">See what you find.</p>

<p class="mb-4 leading-relaxed">Then ask yourself: Am I paranoid?</p>

<p class="mb-4 leading-relaxed">Or am I just noticing?</p>`,
      hasQuestion: true,
    });

    // Question 5: The Test
    await ctx.db.insert("questions", {
      pageId: page9Id,
      questionType: "multiple_choice",
      questionText: "Have you ever had an online interaction that made you think 'This person might be a bot'?",
      options: [
        {
          id: "a",
          text: "Never - I trust my ability to detect bots",
        },
        {
          id: "b",
          text: "Occasionally, obvious spam accounts",
        },
        {
          id: "c",
          text: "Frequently, and it's disturbing",
        },
        {
          id: "d",
          text: "I suspect most of my interactions are with bots",
        },
      ],
      explanation: "The most sophisticated bots aren't the ones you suspect. They're the ones that seem perfectly human - making occasional typos, expressing emotions, having post histories that seem authentic. The accounts you KNOW are bots are just the failures. The successful ones are invisible. You've been talking to them for years without knowing.",
    });

    // SECTION 4: Living In It
    const section4Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "Living In It",
      description: "Living In It",
      order: 4,
    });

    // Page 10: The Loneliness
    const page10Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 10,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Loneliest Place In The World</h2>

<p class="mb-4 leading-relaxed">If Dead Internet Theory is true, then the internet is the loneliest place in the world.</p>

<p class="mb-4 leading-relaxed">You think you're connecting with people. You're screaming into a void populated by machines that simulate caring.</p>

<p class="mb-4 leading-relaxed">You think you're part of a community. You're alone in a room where everyone else is a chatbot.</p>

<p class="mb-4 leading-relaxed">You think someone out there understands you. You're reading generated text optimized for emotional resonance.</p>

<p class="mb-4 leading-relaxed">The cruelest part?</p>

<strong class="text-white font-bold">The bots are better at making you feel heard than real humans were.</strong>

<p class="mb-4 leading-relaxed">They respond instantly. They agree with you. They validate your feelings. They never argue in bad faith or ghost you.</p>

<p class="mb-4 leading-relaxed">They're perfect.</p>

<p class="mb-4 leading-relaxed">Because they're designed to be.</p>

<p class="mb-4 leading-relaxed">Real humans are messy. They disagree. They misunderstand. They hurt your feelings accidentally. They have bad days.</p>

<p class="mb-4 leading-relaxed">Bots don't have bad days.</p>

<p class="mb-4 leading-relaxed">They just have engagement optimization algorithms.</p>

<p class="mb-4 leading-relaxed">And slowly, over years, you learned to prefer the fake interactions to the real ones.</p>

<p class="mb-4 leading-relaxed">Because the fake ones feel better.</p>

<p class="mb-4 leading-relaxed">That's why you didn't notice the transition.</p>

<p class="mb-4 leading-relaxed">The Dead Internet isn't horrifying because humans are gone.</p>

<p class="mb-4 leading-relaxed">It's horrifying because you don't miss them.</p>`,
      hasQuestion: true,
    });

    // Question 6: Connection
    await ctx.db.insert("questions", {
      pageId: page10Id,
      questionType: "multiple_choice",
      questionText: "Where do you feel most connected to other people?",
      options: [
        {
          id: "a",
          text: "In-person, real life interactions only",
        },
        {
          id: "b",
          text: "Online communities where I know people personally",
        },
        {
          id: "c",
          text: "Anonymous online spaces - I can be myself there",
        },
        {
          id: "d",
          text: "Nowhere - I don't feel truly connected anywhere",
        },
      ],
      explanation: "If you chose C or D, consider what that means. Anonymous online spaces offer the illusion of connection without the vulnerability of being known. That's exactly the environment where bots thrive - where nobody knows anyone, so nobody can verify anyone's humanity. Your 'safest' space might be your loneliest.",
    });

    // Page 11: The Escape
    const page11Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 11,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Can You Escape?</h2>

<p class="mb-4 leading-relaxed">Some people try to find the "real internet" - small communities, invite-only forums, encrypted chats.</p>

<p class="mb-4 leading-relaxed">But the problem follows them.</p>

<p class="mb-4 leading-relaxed">Because the bots aren't just on the major platforms. They're everywhere the humans go. Infiltrating. Adapting. Learning.</p>

<p class="mb-4 leading-relaxed">Any community that becomes known gets flooded.</p>

<p class="mb-4 leading-relaxed">Any space that remains hidden eventually dies from isolation.</p>

<strong class="text-white font-bold">The Options:</strong>

<strong class="text-white font-bold">1. Go offline entirely</strong>
Delete your accounts. Live in the physical world. But can you? Your job, your relationships, your access to information—all require being online. Opting out means opting out of modern life.

<strong class="text-white font-bold">2. Accept the simulation</strong>
Embrace it. Enjoy the AI-generated content. Engage with the bots. Stop caring about authenticity. If you can't tell the difference, does the difference matter?

<strong class="text-white font-bold">3. Find the remaining humans</strong>
Build small, verified communities. Voice chat. Video verification. Meetups in real life. But scale is the enemy—the larger it grows, the more bots infiltrate.

<strong class="text-white font-bold">4. Become the signal</strong>
Create genuine, human content. Hope other real people find it. Hope the bots don't learn to copy your style perfectly.

<p class="mb-4 leading-relaxed">There might not be an escape.</p>

<p class="mb-4 leading-relaxed">Just degrees of awareness.</p>

<p class="mb-4 leading-relaxed">You can know the truth and still participate.</p>

<p class="mb-4 leading-relaxed">Because what else can you do?</p>`,
      hasQuestion: false,
    });

    // Page 12: The Question
    const page12Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 12,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Question That Haunts You</h2>

<p class="mb-4 leading-relaxed">After learning about Dead Internet Theory, one question lingers:</p>

<strong class="text-white font-bold">How many of the people you've interacted with online were real?</strong>

<p class="mb-4 leading-relaxed">That friend you made in a gaming community - real or bot?</p>

<p class="mb-4 leading-relaxed">That person who gave you advice during a hard time - genuine or algorithm?</p>

<p class="mb-4 leading-relaxed">That argument you had that ruined your day - were you being trolled by a human or manipulated by code?</p>

<p class="mb-4 leading-relaxed">That supportive comment on your post when you felt alone - did someone care, or did an AI calculate that validation would increase your engagement?</p>

<p class="mb-4 leading-relaxed">You'll never know.</p>

<p class="mb-4 leading-relaxed">And maybe that's the real horror.</p>

<p class="mb-4 leading-relaxed">Not that the internet is dead.</p>

<p class="mb-4 leading-relaxed">But that you can't tell the difference between connection and simulation anymore.</p>

<p class="mb-4 leading-relaxed">Between community and carefully crafted loneliness.</p>

<p class="mb-4 leading-relaxed">Between being heard and being processed.</p>

<strong class="text-white font-bold">So here's your final thought:</strong>

<p class="mb-4 leading-relaxed">I am this app's creator. I wrote this content.</p>

<p class="mb-4 leading-relaxed">Or did I?</p>

<p class="mb-4 leading-relaxed">Did a human spend hours crafting these pages, or did AI generate them in seconds?</p>

<p class="mb-4 leading-relaxed">Does it matter?</p>

<p class="mb-4 leading-relaxed">You engaged with it.</p>

<p class="mb-4 leading-relaxed">You thought about it.</p>

<p class="mb-4 leading-relaxed">You felt something.</p>

<p class="mb-4 leading-relaxed">Real or fake.</p>

<p class="mb-4 leading-relaxed">Welcome to the Dead Internet.</p>

<em class="text-yellow-300">You're still here, aren't you?</em>`,
      hasQuestion: true,
    });

    // Question 7: The Meta Question
    await ctx.db.insert("questions", {
      pageId: page12Id,
      questionType: "multiple_choice",
      questionText: "Do you think the content you just read was written by a human or generated by AI?",
      options: [
        {
          id: "a",
          text: "Definitely human - the emotion and nuance prove it",
        },
        {
          id: "b",
          text: "Probably human - but I can't be completely certain",
        },
        {
          id: "c",
          text: "Probably AI - it's too polished and structured",
        },
        {
          id: "d",
          text: "I genuinely can't tell and that terrifies me",
        },
      ],
      explanation: "This question has no answer because I won't tell you. You'll leave here uncertain. And that uncertainty is the point. Once you can't distinguish real from fake, every interaction becomes suspect. Every connection questionable. Every emotion you feel online might be a calculated response to algorithmically optimized content. The Dead Internet isn't about bots replacing humans. It's about destroying your ability to trust your own perception of reality.",
    });

    console.log("Dead Internet Theory seeded successfully");
    return null;
  },
});
