import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const seedFacialRecognition = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Create the theory
    const theoryId = await ctx.db.insert("theories", {
      title: "Face Harvest",
      description: "Every viral photo challenge is a mass data collection operation. You uploaded your training data willingly, and now facial recognition AI knows you better than you know yourself.",
      difficulty: "beginner" as const,
      order: 5,
      icon: "📸",
      isLocked: true,
      estimatedTimeMinutes: 45,
    });

    // SECTION 1: The Viral Memes
    const section1Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Viral Memes",
      description: "The Viral Memes",
      order: 1,
    });

    // Page 1: Remember When
    const page1Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Remember When It Was Fun?</h2>

<strong class="text-white font-bold">The 10 Year Challenge</strong> - Post a photo from 10 years ago next to a current one.

<strong class="text-white font-bold">The How Hard Did Aging Hit You Challenge</strong> - Show your transformation over time.

<strong class="text-white font-bold">The Face App Challenge</strong> - See what you'll look like when you're old.

<strong class="text-white font-bold">The Which Disney Character Are You Challenge</strong> - Upload your photo, get matched with a character.

<strong class="text-white font-bold">The Anime Filter Challenge</strong> - Turn yourself into an anime character.

<p class="mb-4 leading-relaxed">You remember these, right?</p>

<p class="mb-4 leading-relaxed">Everyone was doing them. They were fun. Harmless. A way to participate in internet culture.</p>

<p class="mb-4 leading-relaxed">Your friends posted them. Celebrities posted them. Millions of people, all uploading their faces, their ages, their transformations.</p>

<p class="mb-4 leading-relaxed">And you probably did too.</p>

<p class="mb-4 leading-relaxed">Maybe you thought: "It's just for fun."</p>

<p class="mb-4 leading-relaxed">Maybe you thought: "Everyone's doing it."</p>

<p class="mb-4 leading-relaxed">Maybe you thought: "What's the harm?"</p>

<strong class="text-white font-bold">What if I told you:</strong>

<p class="mb-4 leading-relaxed">Every single one of those viral challenges was a data harvesting operation.</p>

<p class="mb-4 leading-relaxed">Designed to collect millions of labeled facial images.</p>

<p class="mb-4 leading-relaxed">To train artificial intelligence.</p>

<p class="mb-4 leading-relaxed">To build the most comprehensive facial recognition database in human history.</p>

<p class="mb-4 leading-relaxed">And you gave them the data.</p>

<em class="text-yellow-300">Willingly.</em>

<em class="text-yellow-300">With a smile.</em>`,
      hasQuestion: true,
    });

    // Question 1: Participation
    await ctx.db.insert("questions", {
      pageId: page1Id,
      questionType: "multiple_choice",
      questionText: "How many of these viral photo challenges have you participated in?",
      options: [
        {
          id: "a",
          text: "None - I never trust these things",
        },
        {
          id: "b",
          text: "One or two - they seemed harmless at the time",
        },
        {
          id: "c",
          text: "Several - they were fun and everyone was doing them",
        },
        {
          id: "d",
          text: "Many - I participate in most viral trends",
        },
      ],
      explanation: "If you participated in even one, your face is in their database. Tagged. Labeled. Cross-referenced with your age, your transformation over time, your expressions, your features. Each challenge collected specific data types - age progression, emotion recognition, facial feature mapping. You weren't having fun. You were training their AI. For free.",
    });

    // Page 2: The Pattern
    const page2Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Pattern You Didn't See</h2>

<p class="mb-4 leading-relaxed">Look at what these challenges actually collected:</p>

<strong class="text-white font-bold">10 Year Challenge:</strong>
- Your face at two different ages
- Perfectly labeled (you literally wrote "2009" and "2019")
- Aged transformation data for age progression algorithms

<strong class="text-white font-bold">How Hard Did Aging Hit You:</strong>
- Multiple photos across years
- Self-reported age data
- Training data for predicting age from facial features

<strong class="text-white font-bold">FaceApp Old Age Filter:</strong>
- Current photo
- Your engagement with predicted old age appearance
- Validation data (do people think the aged version looks realistic?)

<strong class="text-white font-bold">Disney Character Match:</strong>
- Detailed facial feature mapping
- Emotional expression analysis
- Comparative facial recognition (matching you to known characters)

<strong class="text-white font-bold">Anime Filter:</strong>
- Facial landmark detection
- Feature extraction
- Art style transfer validation

<strong class="text-white font-bold">See the pattern?</strong>

<p class="mb-4 leading-relaxed">Each challenge wasn't random.</p>

<p class="mb-4 leading-relaxed">Each collected specific, valuable data that AI systems need for training.</p>

<p class="mb-4 leading-relaxed">And you labeled it yourself.</p>

<p class="mb-4 leading-relaxed">You wrote your age. You confirmed the dates. You validated the results by sharing them.</p>

<strong class="text-white font-bold">Professional data labeling costs millions of dollars.</strong>

<strong class="text-white font-bold">You did it for free.</strong>

<strong class="text-white font-bold">Because it was fun.</strong>`,
      hasQuestion: false,
    });

    // Page 3: The Timing
    const page3Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Too Convenient To Be Coincidence</h2>

<strong class="text-white font-bold">The 10 Year Challenge went viral in January 2019.</strong>

<p class="mb-4 leading-relaxed">Exactly when Facebook was facing scrutiny over facial recognition practices.</p>

<p class="mb-4 leading-relaxed">Exactly when multiple companies were racing to perfect age progression AI.</p>

<p class="mb-4 leading-relaxed">Exactly when surveillance systems needed better age-invariant recognition.</p>

<strong class="text-white font-bold">The timing of these challenges is never random:</strong>

<p class="mb-4 leading-relaxed">They appear precisely when AI companies need specific datasets.</p>

<p class="mb-4 leading-relaxed">They disappear once enough data is collected.</p>

<p class="mb-4 leading-relaxed">They target demographics that are underrepresented in existing datasets.</p>

<strong class="text-white font-bold">Think about it:</strong>

<p class="mb-4 leading-relaxed">These "organic viral trends" somehow:
- Spread globally within days
- Get millions of participants
- Collect perfectly formatted, labeled data
- Happen to solve specific AI training problems
- Never get explained</p>

<p class="mb-4 leading-relaxed">Who benefits?</p>

<p class="mb-4 leading-relaxed">Not you.</p>

<p class="mb-4 leading-relaxed">You got a few likes.</p>

<p class="mb-4 leading-relaxed">They got millions of training samples.</p>

<strong class="text-white font-bold">Was it really organic?</strong>

<p class="mb-4 leading-relaxed">Or was it engineered?</p>

<p class="mb-4 leading-relaxed">Seeded by accounts that understood virality.</p>

<p class="mb-4 leading-relaxed">Boosted by algorithms that understood value.</p>

<p class="mb-4 leading-relaxed">Presented as fun so you wouldn't question it.</p>`,
      hasQuestion: true,
    });

    // Question 2: The Awareness
    await ctx.db.insert("questions", {
      pageId: page3Id,
      questionType: "multiple_choice",
      questionText: "When you participated in these challenges, did you think about who was collecting the data?",
      options: [
        {
          id: "a",
          text: "Yes, but I didn't care - it's just photos",
        },
        {
          id: "b",
          text: "I thought about it briefly then forgot",
        },
        {
          id: "c",
          text: "No - I didn't consider it at all",
        },
        {
          id: "d",
          text: "No, and I'm uncomfortable realizing it now",
        },
      ],
      explanation: "Most people chose C. The challenges were designed to bypass your privacy concerns through social proof and fun. When everyone's doing it, when it seems harmless, when it's entertaining - you don't think critically. That's not an accident. That's social engineering. Make data collection feel like participation. Make surveillance feel like a game.",
    });

    // SECTION 2: The Data Collection
    const section2Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Data Collection",
      description: "The Data Collection",
      order: 2,
    });

    // Page 4: What They Got
    const page4Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 4,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Complete Facial Profile</h2>

<p class="mb-4 leading-relaxed">Every photo you uploaded was analyzed and stored.</p>

<strong class="text-white font-bold">The data extracted:</strong>

<strong class="text-white font-bold">Geometric Features:</strong>
- Distance between eyes
- Nose width and length
- Jawline shape
- Cheekbone structure
- Ear positioning
- Lip dimensions

<strong class="text-white font-bold">Textural Features:</strong>
- Skin texture patterns
- Wrinkle mapping
- Facial hair patterns
- Mole and birthmark locations
- Scar tissue identification

<strong class="text-white font-bold">Age Progression Data:</strong>
- How your face changed over time
- Aging patterns specific to you
- Prediction models for future aging
- Reverse aging estimation

<strong class="text-white font-bold">Emotional Mapping:</strong>
- How you smile
- How you pose
- Your comfortable expressions
- Your range of emotional displays

<strong class="text-white font-bold">Behavioral Data:</strong>
- Which challenges you participate in
- When you share photos
- How you respond to trends
- Your susceptibility to social proof

<p class="mb-4 leading-relaxed">This isn't just "a photo of you."</p>

<strong class="text-white font-bold">This is a comprehensive biometric profile.</strong>

<p class="mb-4 leading-relaxed">More unique than a fingerprint.</p>

<p class="mb-4 leading-relaxed">More permanent than a password.</p>

<p class="mb-4 leading-relaxed">And you can never change it.</p>`,
      hasQuestion: false,
    });

    // Page 5: The AI Training
    const page5Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 5,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">What They're Building</h2>

<p class="mb-4 leading-relaxed">Your photos trained AI systems for:</p>

<strong class="text-white font-bold">Age-Invariant Facial Recognition:</strong>
Can identify you regardless of how much you've aged. That 10 Year Challenge? Perfect training data. Now the system can recognize you from childhood photos or predict what you'll look like at 80.

<strong class="text-white font-bold">Cross-Database Matching:</strong>
Your face on Facebook matches to your face on Instagram matches to security camera footage matches to driver's license photos. Different angles, different ages, different lighting - the AI connects them all.

<strong class="text-white font-bold">Emotion Recognition:</strong>
Your expressions in different contexts train systems to detect your emotional state from any photo. Useful for advertisers. More useful for interrogators.

<strong class="text-white font-bold">Deepfake Generation:</strong>
Enough photos of your face from different angles means AI can generate convincing fake videos of you saying or doing anything. Your participation provided the training data for your own fabrication.

<strong class="text-white font-bold">Predictive Modeling:</strong>
Based on how you aged, AI can predict genetic markers, health conditions, lifestyle factors. Your face reveals more than you think.

<strong class="text-white font-bold">Mass Surveillance:</strong>
Every camera connected to these systems can now identify you in real-time. In crowds, in public spaces, in places you thought were private.

<strong class="text-white font-bold">You weren't posting selfies.</strong>

<strong class="text-white font-bold">You were feeding the beast.</strong>

<p class="mb-4 leading-relaxed">And now it sees you everywhere.</p>`,
      hasQuestion: true,
    });

    // Question 3: The Trade
    await ctx.db.insert("questions", {
      pageId: page5Id,
      questionType: "multiple_choice",
      questionText: "If you could go back, knowing what these photos would be used for, would you still post them?",
      options: [
        {
          id: "a",
          text: "Yes - the data collection doesn't bother me",
        },
        {
          id: "b",
          text: "Yes - the social benefits outweighed the privacy costs",
        },
        {
          id: "c",
          text: "No - I would have kept my photos private",
        },
        {
          id: "d",
          text: "No - but it wouldn't have mattered, they'd get the data anyway",
        },
      ],
      explanation: "If you chose D, you understand the real trap. Even if YOU don't participate, your friends tag you in their photos. Surveillance cameras capture you in public. DMV databases sell your license photo. Your employer has your headshot. Your school has your yearbook. Your doctor has your records. The facial recognition database doesn't need your cooperation. Your participation just made it easier and more accurate.",
    });

    // Page 6: The Terms You Agreed To
    const page6Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 6,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">You Gave Permission</h2>

<p class="mb-4 leading-relaxed">Remember clicking "I Agree" on those terms of service?</p>

<strong class="text-white font-bold">Here's what you actually agreed to:</strong>

<em class="text-yellow-300">"By uploading content, you grant us a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your content..."</em>

<p class="mb-4 leading-relaxed">Translation: <strong class="text-white font-bold">They own your face.</strong></p>

<p class="mb-4 leading-relaxed">They can use it however they want.</p>

<p class="mb-4 leading-relaxed">They can sell it to whoever they want.</p>

<p class="mb-4 leading-relaxed">They can keep it forever.</p>

<p class="mb-4 leading-relaxed">They can train AI on it.</p>

<p class="mb-4 leading-relaxed">They can share it with governments.</p>

<p class="mb-4 leading-relaxed">They can license it to surveillance companies.</p>

<strong class="text-white font-bold">And you agreed.</strong>

<p class="mb-4 leading-relaxed">Not because you read the terms.</p>

<p class="mb-4 leading-relaxed">Nobody reads the terms.</p>

<p class="mb-4 leading-relaxed">You agreed because you had to agree to participate.</p>

<p class="mb-4 leading-relaxed">And participation is mandatory in the modern world.</p>

<strong class="text-white font-bold">Delete your photos now?</strong>

<p class="mb-4 leading-relaxed">Too late.</p>

<p class="mb-4 leading-relaxed">They already have copies.</p>

<p class="mb-4 leading-relaxed">They already trained the AI.</p>

<p class="mb-4 leading-relaxed">Your biometric data is already in dozens of databases.</p>

<strong class="text-white font-bold">Deletion doesn't work.</strong>

<strong class="text-white font-bold">You can't take it back.</strong>

<p class="mb-4 leading-relaxed">Your face is permanent.</p>

<p class="mb-4 leading-relaxed">And you gave it away for free.</p>

<p class="mb-4 leading-relaxed">For likes.</p>`,
      hasQuestion: false,
    });

    // SECTION 3: The Purpose
    const section3Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Purpose",
      description: "The Purpose",
      order: 3,
    });

    // Page 7: Who's Watching
    const page7Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 7,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Surveillance Network</h2>

<p class="mb-4 leading-relaxed">Your facial data is now in systems run by:</p>

<strong class="text-white font-bold">Social Media Platforms:</strong>
Facebook, Instagram, Snapchat, TikTok - all using facial recognition for "tagging suggestions" and "content moderation." But the data doesn't stay there.

<strong class="text-white font-bold">Tech Giants:</strong>
Google, Amazon, Apple, Microsoft - building facial recognition into everything. Your phone unlocks with your face. That's not just convenience. That's normalization.

<strong class="text-white font-bold">Surveillance Companies:</strong>
Clearview AI scraped 3 billion faces from the internet without permission. They sell access to law enforcement. Your face is in there. You never agreed to it. Doesn't matter.

<strong class="text-white font-bold">Governments:</strong>
China's social credit system. UK's facial recognition in public spaces. US law enforcement databases. Border control systems worldwide.

<strong class="text-white font-bold">Advertisers:</strong>
Tracking your emotional responses to ads. Measuring engagement through facial expressions. Targeting based on mood detection.

<strong class="text-white font-bold">Unknown Actors:</strong>
The databases get hacked. They get sold. They end up places you never imagined.

<strong class="text-white font-bold">Right now, your face is being used by systems you don't know about, for purposes you never approved.</strong>

<p class="mb-4 leading-relaxed">And there's no way to find out who has access.</p>

<p class="mb-4 leading-relaxed">No way to revoke permission.</p>

<p class="mb-4 leading-relaxed">No way to escape.</p>`,
      hasQuestion: false,
    });

    // Page 8: The Applications
    const page8Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 8,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">What They Do With It</h2>

<strong class="text-white font-bold">Law Enforcement:</strong>
You're at a protest. Cameras scan the crowd. Your face matches the database. You're identified, tracked, added to a list. You didn't break any laws. Doesn't matter. You're associated.

<strong class="text-white font-bold">Employers:</strong>
HR departments use emotion recognition during video interviews. AI analyzes your micro-expressions. Determines if you're trustworthy. Lying. Confident. Nervous. You never know you're being evaluated this way.

<strong class="text-white font-bold">Insurance Companies:</strong>
Facial analysis predicts health risks. Your aging patterns suggest lifestyle factors. Your premiums adjust accordingly. Based on photos you posted years ago.

<strong class="text-white font-bold">Retail:</strong>
You walk into a store. Cameras identify you. Cross-reference your shopping history. Adjust prices dynamically based on your perceived wealth. Track your emotional responses to displays.

<strong class="text-white font-bold">Dating Apps:</strong>
AI rates your attractiveness. Determines your match queue priority. Compares your face to beauty standards. You never see the score. But it affects everything.

<strong class="text-white font-bold">Credit Agencies:</strong>
Facial features correlate with creditworthiness (according to their algorithms). Your face affects your financial opportunities. Based on biased training data. No transparency. No appeals.

<strong class="text-white font-bold">Political Campaigns:</strong>
Target voters based on facial emotion analysis. Predict political leanings from appearance. Micro-target messages. Manipulate based on automated profiling.

<strong class="text-white font-bold">Your face is currency.</strong>

<strong class="text-white font-bold">And everyone is spending it except you.</strong>`,
      hasQuestion: true,
    });

    // Question 4: The Systems
    await ctx.db.insert("questions", {
      pageId: page8Id,
      questionType: "multiple_choice",
      questionText: "Which use of facial recognition concerns you most?",
      options: [
        {
          id: "a",
          text: "Government surveillance and tracking of citizens",
        },
        {
          id: "b",
          text: "Corporate profiling and manipulation",
        },
        {
          id: "c",
          text: "Bias and discrimination in automated decisions",
        },
        {
          id: "d",
          text: "All of it - the entire system is invasive",
        },
      ],
      explanation: "Your concern is valid regardless of which you chose. But here's what's truly disturbing: these aren't hypothetical future scenarios. They're all happening right now. The government surveillance exists. The corporate profiling exists. The biased algorithms exist. And you can't opt out because your face is already in the databases. The choice was made years ago when you posted that first photo.",
    });

    // Page 9: The Normalization
    const page9Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 9,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Making You Accept It</h2>

<strong class="text-white font-bold">The strategy was brilliant:</strong>

<strong class="text-white font-bold">Phase 1: Make it fun</strong>
Photo filters. Silly challenges. Social connection. You associate facial recognition with entertainment, not surveillance.

<strong class="text-white font-bold">Phase 2: Make it convenient</strong>
Face unlock on your phone. Automatic photo tagging. Seamless authentication. You choose convenience over privacy every time.

<strong class="text-white font-bold">Phase 3: Make it normal</strong>
Everyone has the technology. Everyone uses it. Resistance seems paranoid. "If you have nothing to hide..."

<strong class="text-white font-bold">Phase 4: Make it mandatory</strong>
Border control requires facial scans. Your job requires video verification. Services require face authentication. Opting out means opting out of society.

<strong class="text-white font-bold">You didn't notice the shift.</strong>

<p class="mb-4 leading-relaxed">One day you were posting fun selfies.</p>

<p class="mb-4 leading-relaxed">The next day you can't board a plane without a facial scan.</p>

<p class="mb-4 leading-relaxed">And somewhere in between, you stopped questioning it.</p>

<strong class="text-white font-bold">This wasn't accidental.</strong>

<p class="mb-4 leading-relaxed">This was psychological engineering.</p>

<p class="mb-4 leading-relaxed">Corporations and governments collaborated on normalizing mass surveillance.</p>

<p class="mb-4 leading-relaxed">Not through force.</p>

<p class="mb-4 leading-relaxed">Through fun.</p>

<p class="mb-4 leading-relaxed">Through viral challenges that made you the architect of your own monitoring.</p>

<strong class="text-white font-bold">You built the prison.</strong>

<strong class="text-white font-bold">One selfie at a time.</strong>

<p class="mb-4 leading-relaxed">And by the time you realized what was happening...</p>

<p class="mb-4 leading-relaxed">You were already inside.</p>`,
      hasQuestion: false,
    });

    // SECTION 4: The Permanent Record
    const section4Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Permanent Record",
      description: "The Permanent Record",
      order: 4,
    });

    // Page 10: Forever
    const page10Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 10,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">You Can't Delete Your Face</h2>

<p class="mb-4 leading-relaxed">Think about passwords.</p>

<p class="mb-4 leading-relaxed">If a password is compromised, you change it.</p>

<p class="mb-4 leading-relaxed">Think about credit cards.</p>

<p class="mb-4 leading-relaxed">If your card is stolen, you cancel it and get a new one.</p>

<strong class="text-white font-bold">But your face?</strong>

<p class="mb-4 leading-relaxed">You get one face.</p>

<p class="mb-4 leading-relaxed">One biometric identity.</p>

<p class="mb-4 leading-relaxed">And once it's in the databases...</p>

<strong class="text-white font-bold">It's permanent.</strong>

<p class="mb-4 leading-relaxed">You can't reset it.</p>

<p class="mb-4 leading-relaxed">You can't change it.</p>

<p class="mb-4 leading-relaxed">You can't opt out.</p>

<strong class="text-white font-bold">Delete your social media accounts?</strong>

<p class="mb-4 leading-relaxed">They keep the data.</p>

<p class="mb-4 leading-relaxed">Terms of service give them perpetual licenses.</p>

<p class="mb-4 leading-relaxed">Your face remains in their training datasets forever.</p>

<strong class="text-white font-bold">Ask them to delete it?</strong>

<p class="mb-4 leading-relaxed">They say they will (maybe).</p>

<p class="mb-4 leading-relaxed">But the AI models already learned from it.</p>

<p class="mb-4 leading-relaxed">You can remove the photo, but you can't remove what the AI learned.</p>

<strong class="text-white font-bold">Your children will live in a world where:</strong>

<p class="mb-4 leading-relaxed">- Their parent's faces are in every database
- AI can generate deepfakes of you at any age
- Your entire visual history is searchable
- Your biometric profile is bought and sold
- There was never a time when you weren't surveilled</p>

<strong class="text-white font-bold">And they'll ask:</strong>

<p class="mb-4 leading-relaxed">"Why did you give it to them?"</p>

<p class="mb-4 leading-relaxed">"Didn't you know?"</p>

<p class="mb-4 leading-relaxed">What will you say?</p>

<p class="mb-4 leading-relaxed">"It was fun"?</p>

<p class="mb-4 leading-relaxed">"Everyone was doing it"?</p>

<p class="mb-4 leading-relaxed">"We didn't understand"?</p>

<strong class="text-white font-bold">They won't accept those answers.</strong>

<strong class="text-white font-bold">Would you?</strong>`,
      hasQuestion: true,
    });

    // Question 5: Regret
    await ctx.db.insert("questions", {
      pageId: page10Id,
      questionType: "multiple_choice",
      questionText: "Looking back at all the photos you've uploaded over the years, how do you feel?",
      options: [
        {
          id: "a",
          text: "No regrets - I still think it was worth it for the social connection",
        },
        {
          id: "b",
          text: "Minor regrets - I wish I'd been more careful but it's not that bad",
        },
        {
          id: "c",
          text: "Significant regrets - I would do things very differently if I could",
        },
        {
          id: "d",
          text: "Profound regrets - I feel violated and there's nothing I can do",
        },
      ],
      explanation: "Your feeling is valid. But regret doesn't change the databases. Your face is catalogued. Your aging pattern is mapped. Your features are extracted. Whether you regret it or not, the data exists. The only question now is: what do you do going forward? Stop participating? But you're already in the system. Keep participating? But you're feeding it more data. There's no good option. Just degrees of compromise.",
    });

    // Page 11: Living Under The Gaze
    const page11Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 11,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Panopticon</h2>

<p class="mb-4 leading-relaxed">Jeremy Bentham designed a prison where inmates could be watched at any time without knowing when.</p>

<p class="mb-4 leading-relaxed">The architecture created constant uncertainty.</p>

<strong class="text-white font-bold">Am I being watched right now?</strong>

<p class="mb-4 leading-relaxed">The uncertainty was the control mechanism.</p>

<p class="mb-4 leading-relaxed">Inmates policed their own behavior because they might be observed.</p>

<strong class="text-white font-bold">Welcome to the facial recognition panopticon.</strong>

<p class="mb-4 leading-relaxed">You don't know which cameras are connected to which databases.</p>

<p class="mb-4 leading-relaxed">You don't know when you're being identified.</p>

<p class="mb-4 leading-relaxed">You don't know who's watching.</p>

<p class="mb-4 leading-relaxed">You don't know what they're doing with the data.</p>

<strong class="text-white font-bold">But you modify your behavior anyway.</strong>

<p class="mb-4 leading-relaxed">You avoid certain locations.</p>

<p class="mb-4 leading-relaxed">You're careful about protests.</p>

<p class="mb-4 leading-relaxed">You watch what you say in public.</p>

<p class="mb-4 leading-relaxed">You self-censor.</p>

<p class="mb-4 leading-relaxed">Not because you're definitely being watched.</p>

<p class="mb-4 leading-relaxed">Because you <em class="text-yellow-300">might</em> be.</p>

<strong class="text-white font-bold">This is the goal.</strong>

<p class="mb-4 leading-relaxed">Not to watch everyone all the time.</p>

<p class="mb-4 leading-relaxed">But to make everyone <em class="text-yellow-300">think</em> they're being watched.</p>

<p class="mb-4 leading-relaxed">To make surveillance internalized.</p>

<p class="mb-4 leading-relaxed">To make you monitor yourself.</p>

<strong class="text-white font-bold">And it's working.</strong>

<p class="mb-4 leading-relaxed">The databases might never be used against you personally.</p>

<p class="mb-4 leading-relaxed">But the possibility changes how you live.</p>

<p class="mb-4 leading-relaxed">How you think.</p>

<p class="mb-4 leading-relaxed">How you exercise freedom.</p>

<strong class="text-white font-bold">You're free to do anything.</strong>

<strong class="text-white font-bold">As long as the cameras approve.</strong>`,
      hasQuestion: false,
    });

    // Page 12: What Now?
    const page12Id = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 12,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Moving Forward</h2>

<p class="mb-4 leading-relaxed">You can't undo what's been done.</p>

<p class="mb-4 leading-relaxed">Your face is in the databases.</p>

<p class="mb-4 leading-relaxed">But you can decide what happens next.</p>

<strong class="text-white font-bold">Some people choose defiance:</strong>
Wear masks in public. Use makeup to confuse facial recognition. Deliberately poison their data with fake photos.

<strong class="text-white font-bold">Some people choose acceptance:</strong>
Embrace the surveillance. "I have nothing to hide." Make peace with the loss of privacy.

<strong class="text-white font-bold">Some people choose minimization:</strong>
Stop posting photos. Limit online presence. Reduce their digital footprint going forward.

<strong class="text-white font-bold">Some people choose education:</strong>
Teach others. Spread awareness. Try to prevent the next generation from making the same mistakes.

<strong class="text-white font-bold">None of these are solutions.</strong>

<p class="mb-4 leading-relaxed">They're coping mechanisms.</p>

<p class="mb-4 leading-relaxed">The surveillance infrastructure exists.</p>

<p class="mb-4 leading-relaxed">Your data is already collected.</p>

<p class="mb-4 leading-relaxed">The question isn't "How do I escape?"</p>

<p class="mb-4 leading-relaxed">The question is:</p>

<strong class="text-white font-bold">"How do I live in a world where anonymity is dead and I helped kill it?"</strong>

<p class="mb-4 leading-relaxed">There's no satisfying answer.</p>

<p class="mb-4 leading-relaxed">Just choices about what kind of resistance you can live with.</p>

<p class="mb-4 leading-relaxed">What level of compromise you can tolerate.</p>

<p class="mb-4 leading-relaxed">What degree of surveillance you can accept before it breaks something essential in you.</p>

<strong class="text-white font-bold">You uploaded your face for fun.</strong>

<strong class="text-white font-bold">Now you live with the consequences.</strong>

<strong class="text-white font-bold">Forever.</strong>

<em class="text-yellow-300">But hey, at least you got some likes, right?</em>`,
      hasQuestion: true,
    });

    // Question 6: The Future
    await ctx.db.insert("questions", {
      pageId: page12Id,
      questionType: "multiple_choice",
      questionText: "Going forward, how will you handle photo challenges and requests for facial data?",
      options: [
        {
          id: "a",
          text: "Same as always - the damage is done, might as well continue",
        },
        {
          id: "b",
          text: "More cautiously - I'll think about what I'm sharing",
        },
        {
          id: "c",
          text: "Very selectively - only when absolutely necessary",
        },
        {
          id: "d",
          text: "Never again - I'm done feeding the system",
        },
      ],
      explanation: "Whatever you chose, understand this: the system will adapt. If people stop voluntarily uploading photos, surveillance will become more covert. If people start wearing masks, recognition will shift to gait analysis, voice patterns, behavioral markers. The infrastructure won't go away because you stop participating. It will just find new ways to extract what it needs. Your resistance matters for your own sense of agency. But it won't stop what's already in motion.",
    });

    console.log("Facial Recognition Harvesting theory seeded successfully");
    return null;
  },
});
