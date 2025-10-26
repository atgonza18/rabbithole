import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed file for Fogvid-24 conspiracy theory
 * Chemical fog reported across US states in 2025 claimed to be a government bioweapon for population control
 */

export const seedFogvid24 = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Create the theory
    const theoryId = await ctx.db.insert("theories", {
      title: "Fogvid-24",
      description: "Mysterious chemical fog spreading across US states. Officials call it natural. But the patterns don't lie. This isn't weather—it's a deployment.",
      difficulty: "intermediate" as const,
      order: 6,
      icon: "🌫️",
      isLocked: true,
      estimatedTimeMinutes: 50,
    });

    // ==================== SECTION 1: The First Reports ====================
    const section1Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The First Reports",
      description: "January 2025. The fog that shouldn't exist.",
      order: 1,
    });

    // Section 1 - Page 1: The Morning It Started
    const s1p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 1,
      content: `<h2 class="text-red-400 text-3xl font-black mb-4">January 17, 2025</h2>

<p class="mb-4 leading-relaxed">The first reports came from Portland at 6:47 AM.</p>

<p class="mb-4 leading-relaxed">"Unnatural fog." That's what residents called it. Dense. Chemical-smelling. <strong class="text-white">Wrong</strong>.</p>

<p class="mb-4 leading-relaxed">By 9 AM, Seattle reported the same phenomenon. By noon, it had reached Sacramento. By evening, Phoenix.</p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">Fog doesn't move like that.</p>

<p class="mb-4 leading-relaxed">Meteorologists appeared on every channel, voices steady, explanations ready. "Temperature inversion." "Atmospheric pressure." "Perfectly natural."</p>

<p class="mb-4 leading-relaxed">But their eyes told a different story.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The Pattern</p>
  <p class="text-slate-300">Portland → Seattle → Sacramento → Phoenix. Perfect intervals. Twelve hours apart. East to west. Against prevailing winds.</p>
  <p class="text-slate-300 mt-2">Weather doesn't follow a schedule.</p>
</div>

<p class="mb-4 leading-relaxed">People reported burning eyes. Metallic taste. Difficulty breathing. Hospitals filled with patients presenting identical symptoms.</p>

<p class="text-center text-xl my-6 text-slate-400">"Stay indoors," they said.</p>

<p class="mb-4 leading-relaxed"><em class="text-yellow-300">But indoor air quality monitors showed the same compounds.</em></p>`,
      hasQuestion: true,
    });

    // Question 1: Experiential
    await ctx.db.insert("questions", {
      pageId: s1p1,
      questionType: "multiple_choice",
      questionText: "It's January 17, 2025. You wake up to reports of strange fog in your area. Officials say it's safe. What's your first move?",
      options: [
        { id: "a", text: "Trust the authorities - they have more information than I do" },
        { id: "b", text: "Stock up on supplies and seal windows before it spreads" },
        { id: "c", text: "Go outside to see it myself - I need firsthand evidence" },
        { id: "d", text: "Start tracking the pattern before someone scrubs the data" },
      ],
      explanation: "There's no right answer to a scenario like this. Trust or distrust, action or observation—each response reveals how you'd react when official explanations don't match observable reality. The question isn't what you should do. It's what you would do when the fog rolls in and the explanations feel rehearsed."
    });

    // Section 1 - Page 2: The Coverup Begins
    const s1p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Social Media Blackout</h2>

<p class="mb-4 leading-relaxed">Within 48 hours, something changed.</p>

<p class="mb-4 leading-relaxed">Videos of the fog—thousands of them—started disappearing. Flagged as "misinformation." Tagged with fact-check labels. Accounts suspended for "violating community guidelines."</p>

<p class="mb-4 leading-relaxed">The remaining posts all had one thing in common: <strong class="text-white">they said it was normal</strong>.</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">Documented Censorship Timeline</p>
  <p class="text-slate-300">Hour 0-12: 47,000 posts about "chemical fog"<br/>
  Hour 12-24: 31,000 posts (34% removal rate)<br/>
  Hour 24-48: 8,400 posts (82% removal rate)<br/>
  Hour 48+: Only posts from verified meteorologist accounts remain</p>
</div>

<p class="mb-4 leading-relaxed">Reddit threads vanished mid-discussion. Discord servers went dark. A popular investigative journalist who'd been live-streaming air quality data suddenly "took a break from social media."</p>

<p class="mb-4 leading-relaxed">His final post: <em class="text-red-400">"They're not testing for the right compounds. I found—"</em></p>

<p class="mb-4 leading-relaxed">Then nothing.</p>

<p class="text-center text-2xl my-6 text-red-400">The fog continued to spread.</p>`,
      hasQuestion: true,
    });

    // Question 2: Belief Resonance
    await ctx.db.insert("questions", {
      pageId: s1p2,
      questionType: "multiple_choice",
      questionText: "Thousands of posts about the fog are being removed. Which explanation disturbs you most?",
      options: [
        { id: "a", text: "Social media companies are coordinating with the government" },
        { id: "b", text: "AI moderation can't distinguish between panic and truth" },
        { id: "c", text: "The posts were accurate, and that's exactly why they're gone" },
        { id: "d", text: "We'll never know—the evidence is already destroyed" },
      ],
      explanation: "Mass content removal during a crisis creates an information void. Whether it's coordination, automation, or deliberate suppression, the result is the same: silence where there should be voices. And in that silence, the fog keeps spreading. The question that remains is whether the censorship was to prevent panic—or to prevent discovery."
    });

    // Section 1 - Page 3: The Symptoms
    const s1p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section1Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">What the Fog Does</h2>

<p class="mb-4 leading-relaxed">Hospital ERs filled with patients. The symptoms were consistent:</p>

<p class="mb-4 leading-relaxed">
- Respiratory irritation<br/>
- Metallic taste<br/>
- Headaches and disorientation<br/>
- Memory gaps<br/>
- <strong class="text-red-400">Unexplained compliance</strong>
</p>

<p class="mb-4 leading-relaxed">That last one—that's what the doctors whispered about in break rooms.</p>

<p class="mb-4 leading-relaxed">Patients who'd been exposed to the fog for more than 6 hours reported feeling "calm." "Accepting." One woman described it as <em class="text-yellow-300">"like my anxiety just... turned off."</em></p>

<p class="mb-4 leading-relaxed">A man who'd been planning to evacuate suddenly decided to stay. "It's probably fine," he said, staring at nothing.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">Neurological Changes</p>
  <p class="text-slate-300">Brain scans of exposed individuals showed altered activity in the amygdala and prefrontal cortex—areas responsible for fear response and decision-making.</p>
  <p class="text-slate-300 mt-2">The fog wasn't just in the air. It was in their heads.</p>
</div>

<p class="text-center text-xl my-6 text-slate-400">A bioweapon doesn't have to kill you.</p>

<p class="mb-4 leading-relaxed">It just has to make you <strong class="text-white">stop resisting</strong>.</p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 2: The Government Response ====================
    const section2Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Government Response",
      description: "Too prepared. Too coordinated. Too fast.",
      order: 2,
    });

    // Section 2 - Page 1: Operation Clear Skies
    const s2p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Operation Clear Skies</h2>

<p class="mb-4 leading-relaxed">On January 20, exactly 72 hours after the first fog sighting, the President addressed the nation.</p>

<p class="mb-4 leading-relaxed">"We are launching Operation Clear Skies," he announced. "A comprehensive response to this atmospheric anomaly."</p>

<p class="text-xl font-bold text-yellow-400 my-6 text-center">They already had a plan. A name. Logistics.</p>

<p class="mb-4 leading-relaxed">Within hours, FEMA deployed "air purification units" to affected cities. The National Guard established "fog monitoring stations." Emergency broadcast systems activated with pre-recorded messages.</p>

<p class="mb-4 leading-relaxed">It was too smooth. Too rehearsed.</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Timeline Problem</p>
  <p class="text-slate-300">Government emergency responses typically take 7-14 days to organize. Operation Clear Skies was fully operational in 72 hours—with custom equipment, trained personnel, and printed instructional materials.</p>
  <p class="text-slate-300 mt-2">You can't print 10 million pamphlets in three days.</p>
  <p class="text-slate-300 mt-2">Unless you printed them earlier.</p>
</div>

<p class="mb-4 leading-relaxed">A logistics expert ran the numbers. The equipment alone would have required 6-8 months of procurement and distribution planning.</p>

<p class="mb-4 leading-relaxed"><em class="text-red-400">They knew it was coming.</em></p>`,
      hasQuestion: true,
    });

    // Question 3: Scenario Choice
    await ctx.db.insert("questions", {
      pageId: s2p1,
      questionType: "multiple_choice",
      questionText: "The government has a complete response ready in 72 hours—equipment, personnel, pamphlets. How do you process this?",
      options: [
        { id: "a", text: "They're incredibly efficient - I'm impressed and relieved" },
        { id: "b", text: "They had advanced warning and didn't tell us" },
        { id: "c", text: "They created the fog and this is part of the plan" },
        { id: "d", text: "I stop trusting anything they say from this point forward" },
      ],
      explanation: "Preparedness can look like competence or complicity, depending on your perspective. The same response that saves lives can also reveal foreknowledge. And foreknowledge raises the question: if they knew, why didn't they warn us? Or worse—did they warn us, and we didn't listen? Or did they not warn us because warning would interfere with the deployment?"
    });

    // Section 2 - Page 2: The Banned Questions
    const s2p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">What You're Not Allowed to Ask</h2>

<p class="mb-4 leading-relaxed">At the first press conference, a reporter asked: "What chemical compounds have you identified in the fog?"</p>

<p class="mb-4 leading-relaxed">The answer: <em class="text-slate-400">"We're still analyzing the data."</em></p>

<p class="mb-4 leading-relaxed">Another reporter: "Are there any military installations near the fog's origin point?"</p>

<p class="mb-4 leading-relaxed">Her press credentials were revoked that afternoon.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">Questions That End Careers</p>
  <p class="text-slate-300">• Who ordered Operation Clear Skies before the fog was declared an emergency?<br/>
  • Why are military helicopters spraying into the fog?<br/>
  • What's in the "purification units"?<br/>
  • Why can't independent labs test the air samples?<br/>
  • Where did the affected population's medical records go?</p>
</div>

<p class="mb-4 leading-relaxed">Scientists who tried to publish findings were told their research "violated national security protocols."</p>

<p class="mb-4 leading-relaxed">Citizens who filed FOIA requests received heavily redacted documents—or envelopes filled with completely blacked-out pages.</p>

<p class="text-center text-2xl my-6 text-red-400">The truth is classified.</p>`,
      hasQuestion: true,
    });

    // Question 4: Memory Verification
    await ctx.db.insert("questions", {
      pageId: s2p2,
      questionType: "multiple_choice",
      questionText: "When asking legitimate questions gets you silenced, what does that tell you?",
      options: [
        { id: "a", text: "There's sensitive information that could cause panic" },
        { id: "b", text: "They're hiding something criminal" },
        { id: "c", text: "National security is more important than transparency" },
        { id: "d", text: "The questions themselves reveal what they don't want us to know" },
      ],
      explanation: "Censorship creates its own evidence. When certain questions are forbidden, those questions become more important than any answer could be. The pattern of what's allowed versus what's suppressed draws a map of what they're protecting. And sometimes, the shape of the silence is more revealing than any leaked document."
    });

    // Section 2 - Page 3: The Volunteers
    const s2p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section2Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Perfect Citizens</h2>

<p class="mb-4 leading-relaxed">By February, something strange started appearing in affected cities.</p>

<p class="mb-4 leading-relaxed">People volunteering. Hundreds of them. Thousands.</p>

<p class="mb-4 leading-relaxed">Handing out water bottles at distribution centers. Helping with fog monitoring stations. Wearing matching vests. Smiling the same smile.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">Always calm. Never questioning.</strong></p>

<p class="mb-4 leading-relaxed">When interviewed, they all said variations of the same thing:</p>

<p class="mb-4 leading-relaxed italic text-slate-300">"I just wanted to help."<br/>
"It felt like the right thing to do."<br/>
"We're all in this together."</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Compliance Surge</p>
  <p class="text-slate-300">Volunteer rates in fog-affected cities: 340% above national average<br/>
  Crime rates: Down 67%<br/>
  Protests and demonstrations: Down 94%<br/>
  Social media criticism of government response: Down 89%</p>
</div>

<p class="mb-4 leading-relaxed">A psychologist noted: "These aren't the patterns of traumatized populations. These are the patterns of medicated ones."</p>

<p class="text-center text-xl my-6 text-slate-400">The fog made perfect citizens.</p>

<p class="mb-4 leading-relaxed">Obedient. Helpful. Unquestioning.</p>

<p class="mb-4 leading-relaxed"><em class="text-red-400">Exactly what a population control bioweapon would do.</em></p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 3: The Evidence ====================
    const section3Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Evidence",
      description: "What they can't explain away.",
      order: 3,
    });

    // Section 3 - Page 1: The Whistleblowers
    const s3p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Scientists Who Spoke Out</h2>

<p class="mb-4 leading-relaxed">Dr. Sarah Chen, atmospheric chemist at MIT, published her findings on an encrypted blog:</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">Dr. Chen's Analysis</p>
  <p class="text-slate-300">"The fog contains aerosolized compounds consistent with military-grade psychoactive agents. Specifically, derivatives of BZ (3-quinuclidinyl benzilate)—a known incapacitating agent that reduces aggression and enhances suggestibility."</p>
  <p class="text-slate-300 mt-2">"These compounds do not occur naturally in atmospheric conditions."</p>
</div>

<p class="mb-4 leading-relaxed">She disappeared 48 hours later. Her blog was scrubbed. MIT issued a statement saying she "took a leave of absence for personal reasons."</p>

<p class="mb-4 leading-relaxed">Her sister posted: <em class="text-red-400">"Sarah would never just leave. She was terrified of what she found."</em></p>

<p class="mb-4 leading-relaxed">Then the sister's account was suspended.</p>

<p class="mb-4 leading-relaxed">Three other scientists tried to replicate her work. Two recanted their findings within weeks. The third died in a "hiking accident."</p>

<p class="text-center text-2xl my-6 text-red-400">The fog protects itself.</p>`,
      hasQuestion: true,
    });

    // Question 5: Experiential Poll
    await ctx.db.insert("questions", {
      pageId: s3p1,
      questionType: "multiple_choice",
      questionText: "A scientist finds evidence of weaponized chemicals and then vanishes. Multiple others die or recant. What's your reaction?",
      options: [
        { id: "a", text: "Probably coincidence - scientists have personal problems too" },
        { id: "b", text: "Targeted suppression of inconvenient truth" },
        { id: "c", text: "I'd want to verify her findings before drawing conclusions" },
        { id: "d", text: "I'd never speak about this out loud, ever" },
      ],
      explanation: "When the pattern of silencing is consistent, at what point does coincidence become impossible? Three scientists, three different outcomes, all sharing one thing: they asked the wrong questions. Whether through fear, force, or 'accidents,' the result is the same—silence. And you're left wondering: would you have the courage to be the fourth? Or would you choose the safety of not knowing?"
    });

    // Section 3 - Page 2: The Origin Point
    const s3p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Where It Came From</h2>

<p class="mb-4 leading-relaxed">Citizen investigators traced the fog's origin point using timestamped photos and weather data.</p>

<p class="mb-4 leading-relaxed">The coordinates led to a remote area in Eastern Oregon.</p>

<p class="mb-4 leading-relaxed">50 miles from the nearest town. No official installations on any map.</p>

<p class="mb-4 leading-relaxed">But satellite imagery told a different story.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">What Satellites Show</p>
  <p class="text-slate-300">• Large rectangular structures consistent with storage facilities<br/>
  • Ventilation systems capable of atmospheric dispersal<br/>
  • High-security fencing and restricted airspace<br/>
  • Heavy truck traffic in the weeks before January 17<br/>
  • Thermal signatures indicating active chemical processing</p>
</div>

<p class="mb-4 leading-relaxed">Locals reported seeing unmarked vehicles with government plates. Security contractors. Scientists in hazmat suits.</p>

<p class="mb-4 leading-relaxed">One resident tried to approach the facility. He was turned away by armed guards who told him it was "private property."</p>

<p class="mb-4 leading-relaxed">Private property with a no-fly zone.</p>

<p class="text-center text-xl my-6 text-slate-400">This is where the fog began.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">This is where they deployed it.</strong></p>`,
      hasQuestion: true,
    });

    // Question 6: Belief Resonance
    await ctx.db.insert("questions", {
      pageId: s3p2,
      questionType: "multiple_choice",
      questionText: "An unmarked facility with no-fly zones appears at the exact origin point of the fog. What does this mean to you?",
      options: [
        { id: "a", text: "Coincidence - lots of government facilities exist in remote areas" },
        { id: "b", text: "This is where they made it and released it deliberately" },
        { id: "c", text: "An accident at a classified facility they're now covering up" },
        { id: "d", text: "The fog is a test run - there will be more deployments" },
      ],
      explanation: "When classified facilities align perfectly with unexplained phenomena, the burden of proof shifts. The question isn't whether there's a connection—the question is what kind of connection. Accident or intention. Containment failure or controlled release. Either way, the facility exists. The fog exists. And the timeline connects them whether you want it to or not."
    });

    // Section 3 - Page 3: The Precedent
    const s3p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section3Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">They've Done This Before</h2>

<p class="mb-4 leading-relaxed">Fogvid-24 isn't the first time.</p>

<p class="mb-4 leading-relaxed">It's just the first time it spread too far to hide.</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">Documented US government bioweapon experiments on civilians:</strong></p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Historical Record</p>
  <p class="text-slate-300"><strong>Operation Sea-Spray (1950):</strong> Navy sprayed bacteria over San Francisco to test biological warfare dispersal</p>
  <p class="text-slate-300 mt-2"><strong>Operation LAC (1957-58):</strong> Army released zinc cadmium sulfide over multiple US cities to test dispersal patterns</p>
  <p class="text-slate-300 mt-2"><strong>Tuskegee Experiment (1932-72):</strong> 40 years of intentionally untreated syphilis to study progression</p>
  <p class="text-slate-300 mt-2"><strong>MKUltra (1953-73):</strong> CIA mind control experiments with LSD and other drugs on unwitting citizens</p>
</div>

<p class="mb-4 leading-relaxed">All of these were denied. For decades.</p>

<p class="mb-4 leading-relaxed">All of them were eventually declassified and confirmed.</p>

<p class="mb-4 leading-relaxed">All of them were justified as "necessary for national security."</p>

<p class="text-center text-2xl my-6 text-red-400">They tested on us before.</p>

<p class="mb-4 leading-relaxed">Why would they stop now?</p>

<p class="mb-4 leading-relaxed"><em class="text-yellow-300">Fogvid-24 is just better technology. Same playbook.</em></p>`,
      hasQuestion: false,
    });

    // ==================== SECTION 4: The Implications ====================
    const section4Id = await ctx.db.insert("theorySections", {
      theoryId,
      title: "The Implications",
      description: "What happens next.",
      order: 4,
    });

    // Section 4 - Page 1: The Spread Continues
    const s4p1 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 1,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">It's Not Stopping</h2>

<p class="mb-4 leading-relaxed">By March 2025, the fog had reached 37 states.</p>

<p class="mb-4 leading-relaxed">By April, every major metropolitan area.</p>

<p class="mb-4 leading-relaxed">The news stopped covering it. Not because it was gone—because it was <strong class="text-white">everywhere</strong>.</p>

<p class="mb-4 leading-relaxed">When something becomes normal, people stop questioning it.</p>

<div class="bg-slate-800/50 border-l-4 border-red-500 p-4 my-6">
  <p class="text-red-400 font-semibold mb-2">The New Normal</p>
  <p class="text-slate-300">Weather apps now include "fog density" forecasts<br/>
  Schools teach children "fog safety protocols"<br/>
  Real estate listings advertise "low fog exposure areas"<br/>
  Dating profiles list "fog tolerance" as a compatibility factor</p>
  <p class="text-slate-300 mt-2">We adapted. We accepted. We forgot we were afraid.</p>
</div>

<p class="mb-4 leading-relaxed">That's how it works. The fog doesn't have to kill you or control you overnight.</p>

<p class="mb-4 leading-relaxed">It just has to become <em class="text-yellow-300">part of your life</em>.</p>

<p class="mb-4 leading-relaxed">Until one day, you can't remember what clear skies looked like.</p>

<p class="text-center text-xl my-6 text-slate-400">Until one day, you can't remember who you were before.</p>`,
      hasQuestion: true,
    });

    // Question 7: Scenario Choice
    await ctx.db.insert("questions", {
      pageId: s4p1,
      questionType: "multiple_choice",
      questionText: "The fog is everywhere now. It's just part of life. How do you feel about that?",
      options: [
        { id: "a", text: "Relieved - if everyone's exposed, at least we're equal" },
        { id: "b", text: "Resigned - there's nothing we can do, so why stress?" },
        { id: "c", text: "Terrified - mass compliance is the end goal" },
        { id: "d", text: "Like I'm forgetting what it felt like to be afraid" },
      ],
      explanation: "Normalization is the final stage of any successful operation. When the anomaly becomes routine, resistance becomes exhausting. The fog's greatest weapon isn't its chemical composition—it's its persistence. Eventually, fighting becomes harder than accepting. Eventually, you stop remembering why you fought at all. And that's when you realize: maybe the fog is already in you."
    });

    // Section 4 - Page 2: Who Benefits
    const s4p2 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 2,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">Who Wins?</h2>

<p class="mb-4 leading-relaxed">Ask yourself: who benefits from a calm, compliant population?</p>

<p class="mb-4 leading-relaxed">Crime down. Protests gone. Social unrest eliminated. Healthcare costs reduced (because people don't complain about symptoms anymore).</p>

<p class="mb-4 leading-relaxed">Productivity up. Obedience up. Questions down.</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Perfect Outcome</p>
  <p class="text-slate-300">• Population easier to govern<br/>
  • Dissent eliminated without force<br/>
  • Citizens voluntarily comply with any directive<br/>
  • Mental health crisis "solved" through chemical calm<br/>
  • No revolution. No uprising. No resistance.</p>
</div>

<p class="mb-4 leading-relaxed">A bioweapon doesn't have to be a weapon of mass destruction.</p>

<p class="mb-4 leading-relaxed">It can be a weapon of mass <strong class="text-white">control</strong>.</p>

<p class="text-center text-2xl my-6 text-red-400">They're not trying to kill us.</p>

<p class="mb-4 leading-relaxed">They're trying to <em class="text-yellow-300">fix</em> us.</p>`,
      hasQuestion: true,
    });

    // Question 8: Final Belief
    await ctx.db.insert("questions", {
      pageId: s4p2,
      questionType: "multiple_choice",
      questionText: "If Fogvid-24 is real, and it's working as intended, what should you do?",
      options: [
        { id: "a", text: "Expose it - people deserve to know what's happening to them" },
        { id: "b", text: "Protect myself and my family, let everyone else figure it out" },
        { id: "c", text: "Nothing - if it reduces suffering, maybe it's not all bad" },
        { id: "d", text: "I don't know if I have the willpower to resist anymore" },
      ],
      explanation: "This is the core dilemma of any population control conspiracy: if it works, if it makes people happier and society more stable, is it wrong? Your answer reveals whether you value autonomy over peace, truth over comfort, resistance over compliance. There's no universally correct answer. Only the one you have to live with. And the question you'll keep asking yourself: would I know if the fog had already changed me?"
    });

    // Section 4 - Page 3: The Question That Remains
    const s4p3 = await ctx.db.insert("theoryPages", {
      theoryId,
      sectionId: section4Id,
      order: 3,
      content: `<h2 class="text-2xl md:text-3xl font-black mb-6 text-green-400">The Question You Can't Answer</h2>

<p class="mb-4 leading-relaxed">You've read this far. You know the evidence. You've seen the patterns.</p>

<p class="mb-4 leading-relaxed">Now ask yourself:</p>

<p class="text-center text-2xl my-6 text-slate-400">How do you know you haven't already been exposed?</p>

<p class="mb-4 leading-relaxed">The fog doesn't announce itself. The symptoms are subtle. The changes gradual.</p>

<p class="mb-4 leading-relaxed">You feel calmer lately? Less anxious about the state of the world?</p>

<p class="mb-4 leading-relaxed">More willing to trust authorities? Less interested in asking difficult questions?</p>

<div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 my-6">
  <p class="text-yellow-400 font-semibold mb-2">The Self-Assessment</p>
  <p class="text-slate-300">When was the last time you felt genuine outrage?<br/>
  When was the last time you questioned an official narrative?<br/>
  When was the last time you couldn't sleep because something felt wrong with the world?</p>
  <p class="text-slate-300 mt-2">If you can't remember... that might be your answer.</p>
</div>

<p class="mb-4 leading-relaxed">The cruelest part of Fogvid-24 isn't what it does to you.</p>

<p class="mb-4 leading-relaxed">It's that you'll never know for certain if it's already done it.</p>

<p class="text-center text-xl my-6 text-red-400">You could be changed right now.</p>

<p class="mb-4 leading-relaxed">Reading this. Agreeing with it. Or dismissing it.</p>

<p class="mb-4 leading-relaxed">Either way, how would you know if it wasn't <em class="text-yellow-300">your choice</em>?</p>

<p class="mb-4 leading-relaxed"><strong class="text-white">That's the genius of it.</strong></p>

<p class="text-center text-slate-400 my-8">The fog makes you forget there was ever supposed to be a choice.</p>`,
      hasQuestion: false,
    });

    console.log("Fogvid-24 theory seeded successfully");
    return null;
  },
});
