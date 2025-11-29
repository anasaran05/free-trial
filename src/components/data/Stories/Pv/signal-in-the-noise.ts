// src/data/stories/signal-in-the-noise.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'sn1',
    chapterNum: 1,
    title: 'Signal in the Noise',
    tagline: 'Four retinal haemorrhages in six weeks',
    narrative: `RIVEXA (direct factor Xa inhibitor) launched three months ago. 340 000 patients and climbing.

You are the lead safety physician.

Your PV scientist just handed you four spontaneous reports of retinal/vitreous haemorrhage — all serious, two with permanent blindness — within 7–21 days of starting RIVEXA.

Crude reporting rate ~20× higher than the rest of the class.
PRR = 24.8 (lower CI 18.3) | EBGM = 22.1 (EB05 16.7)

Marketing is printing “best-in-class bleeding profile” brochures as you read this.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"A signal is just noise until someone decides to listen."',
    choices: [
      { text: 'Convene an urgent internal signal evaluation meeting today', nextChapter: 'sn2a', consequence: 'You own the timeline' },
      { text: 'Wait two more weeks for the next EudraVigilance/FAERS cut', nextChapter: 'sn2b', consequence: 'You buy time but risk more cases' },
      { text: 'Escalate immediately to EMA/PRAC with preliminary signal', nextChapter: 'sn2c', consequence: 'You go public early' },
      { text: 'Demand full narrative review + literature + PK outlier analysis first', nextChapter: 'sn2d', consequence: 'You dig before you jump' }
    ],
    insights: ['Disproportionality is a scream wearing statistics', 'Four cases can be coincidence. Four cases with timing and severity usually aren’t'],
    emotionalTheme: 'Dread',
    timeToComplete: '55 minutes',
    rewards: { xp: 280, character: 'Dr. Leo Kessler as ruthless safety lead' }
  },

  {
    id: 'sn2a',
    chapterNum: 2,
    title: 'The War Room',
    tagline: 'Marketing is already in the room',
    narrative: `Meeting called for 2 p.m. CMO, PV, Stats, Regulatory, Medical Affairs… and the Global Brand Director who wasn’t invited.

Brand director: “Four cases is background. We’ll look hysterical.”

Your freshly finished literature search shows dose-dependent retinal toxicity in rabbits at human-equivalent exposure. RIVEXA has the highest Cmax in class.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"Background noise doesn’t cause blindness."',
    choices: [
      { text: 'Push for immediate DHPC + RMP update', nextChapter: 'sn3a', consequence: 'You force action now' },
      { text: 'Propose controlled-access program with mandatory eye screening', nextChapter: 'sn3b', consequence: 'Middle path' },
      { text: 'Agree to “monitor closely” and reassess in 30 days', nextChapter: 'sn3c', consequence: 'You fold under pressure' }
    ],
    insights: ['Commercial pressure is measured in millions per day', 'Silence in a safety meeting is measured in eyes'],
    emotionalTheme: 'Pressure',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 420, character: 'Signal Owner' }
  },

  {
    id: 'sn2b',
    chapterNum: 2,
    title: 'Two Weeks Later',
    tagline: 'The noise became a roar',
    narrative: `You waited. New data cut: 38 cases, 12 permanent vision loss.

A retina society just issued an international alert. Your CMO calls at 7 a.m.: “Why the hell didn’t we act earlier?”`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"You wanted certainty. Congratulations."',
    choices: [
      { text: 'Emergency PRAC notification + voluntary recall', nextChapter: 'sn3d', consequence: 'Crisis mode' },
      { text: 'Still try urgent RMP + DHPC (damage control)', nextChapter: 'sn3a', consequence: 'Late but alive' }
    ],
    insights: ['Delay turns signals into scandals', 'Two weeks is an eternity in pharmacovigilance'],
    emotionalTheme: 'Regret',
    timeToComplete: '1 hour 10 minutes',
    rewards: { xp: 360, character: 'The One Who Waited' }
  },

  {
    id: 'sn2c',
    chapterNum: 2,
    title: 'Early PRAC',
    tagline: 'You called it first — and paid for it',
    narrative: `You file preliminary signal Day 0. PRAC validates in 72 h and demands urgent measures.

Stock drops 18 % overnight. Headlines scream “Blockbuster blinds patients.”

Executive floor calls you “the boy who cried wolf with four cases.”`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"Better a wolf than an undertaker."',
    choices: [
      { text: 'Double down — demand full suspension', nextChapter: 'sn3e', consequence: 'Martyr route' },
      { text: 'Accept PRAC’s milder measures (ophthalmic contraindication only)', nextChapter: 'sn3f', consequence: 'You survive' }
    ],
    insights: ['Early escalation is a career coin toss', 'The first to ring the bell is often blamed for the fire'],
    emotionalTheme: 'Isolation',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 450, character: 'First to Sound the Alarm' }
  },

  {
    id: 'sn2d',
    chapterNum: 2,
    title: 'The Deep Dive',
    tagline: 'You found the mechanism',
    narrative: `80-hour weeks pay off:

• 9 % of patients are CYP2C9 poor metabolisers → 4–6× anti-Xa exposure  
• Buried rabbit study: dose-dependent retinal haemorrhage at human levels

You now hold biological plausibility in your hands.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"There is no noise anymore. Only evidence."',
    choices: [
      { text: 'Take everything to ExCo and demand market withdrawal', nextChapter: 'sn3g', consequence: 'Nuclear' },
      { text: 'Propose genotype-guided dosing + black triangle', nextChapter: 'sn3h', consequence: 'Precision future' }
    ],
    insights: ['Real signals have biology, not just numbers', 'The strongest safety argument is a mechanism'],
    emotionalTheme: 'Clarity',
    timeToComplete: '1 hour 45 minutes',
    rewards: { xp: 480, character: 'Mechanism Hunter' }
  },

  // ==================== ENDINGS (all fields complete) ====================

  {
    id: 'sn3a',
    chapterNum: 3,
    title: 'Controlled Burn',
    tagline: 'The drug lives with scars',
    narrative: `DHPC sent globally. New contraindication + warning. Sales -40 %, but RIVEXA survives. You become Head of PV two years later.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"We didn’t save every eye, but we saved the molecule."',
    choices: [],
    insights: ['Most drugs die of bleeding or reputation — we chose bleeding'],
    emotionalTheme: 'Pragmatic Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1600, character: 'Architect of the Controlled Crisis' },
    isEnding: true,
    endingName: 'The Warning'
  },

  {
    id: 'sn3b',
    chapterNum: 3,
    title: 'Restricted Access',
    tagline: 'Only the careful get the drug',
    narrative: `RIVEXA relaunched under REMS with mandatory ophthalmic exam at baseline and month 3. Sales recover slowly. You are credited with “saving the franchise.”`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"Safety can be good business if you’re brave enough."',
    choices: [],
    insights: ['Sometimes the tightest leash makes the strongest brand'],
    emotionalTheme: 'Compromise That Worked',
    timeToComplete: 'finale',
    rewards: { xp: 1650, character: 'REMS Designer' },
    isEnding: true,
    endingName: 'The Leash'
  },

  {
    id: 'sn3c',
    chapterNum: 3,
    title: 'Monitor Closely',
    tagline: 'You blinked. They went blind.',
    narrative: `30 days later: 87 cases. Forced recall. Company loses $14 bn. You are quietly made redundant.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"You wanted to be reasonable. Hope the blind agree."',
    choices: [],
    insights: ['“Monitor closely” is corporate for “pray”'],
    emotionalTheme: 'Shame',
    timeToComplete: 'finale',
    rewards: { xp: 1000, character: 'The One Who Blinked' },
    isEnding: true,
    endingName: 'The Fall'
  },

  {
    id: 'sn3d',
    chapterNum: 3,
    title: 'Voluntary Withdrawal',
    tagline: 'Too late, too many eyes',
    narrative: `127 confirmed permanent blindness cases. Full recall. $11 bn write-off. Class-action lasts a decade. You leave industry and teach ethics.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"Some drugs should never see daylight."',
    choices: [],
    insights: ['Delay is the most expensive risk-mitigation strategy'],
    emotionalTheme: 'Expensive Conscience',
    timeToComplete: 'finale',
    rewards: { xp: 1900, character: 'The One Who Pulled the Plug Too Late' },
    isEnding: true,
    endingName: 'The Recall'
  },

  {
    id: 'sn3e',
    chapterNum: 3,
    title: 'The Martyr',
    tagline: 'You were right. They fired you anyway.',
    narrative: `EMA suspends RIVEXA. Company scapegoats you. Two years later a competitor launches the same drug with eye exclusion — successfully. You are permanently blacklisted.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"I was right. Just two years too early."',
    choices: [],
    insights: ['Pioneers get arrows, settlers get the land'],
    emotionalTheme: 'Bitter Vindication',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'Cassandra of Safety' },
    isEnding: true,
    endingName: 'The Martyr'
  },

  {
    id: 'sn3f',
    chapterNum: 3,
    title: 'Milder Measures',
    tagline: 'You lived to fight another day',
    narrative: `PRAC accepts ophthalmic contraindication only. Drug survives with warning. You keep your job and your soul — mostly.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"Not every battle has to be the last one."',
    choices: [],
    insights: ['Sometimes survival is the only victory available'],
    emotionalTheme: 'Relieved Survival',
    timeToComplete: 'finale',
    rewards: { xp: 1550, character: 'The Pragmatist' },
    isEnding: true,
    endingName: 'The Compromise'
  },

  {
    id: 'sn3g',
    chapterNum: 3,
    title: 'Clean Kill',
    tagline: '$11 billion for integrity',
    narrative: `ExCo votes 6–5 to withdraw permanently. You are promoted to CMO of an ethics-first start-up. RIVEXA becomes the gold-standard PV teaching case for decades.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"We just paid eleven billion dollars for a clean conscience."',
    choices: [],
    insights: ['The most expensive decisions are sometimes the cheapest'],
    emotionalTheme: 'Costly Clarity',
    timeToComplete: 'finale',
    rewards: { xp: 2000, character: 'The Eleven-Billion-Dollar Conscience' },
    isEnding: true,
    endingName: 'The Clean Kill'
  },

  {
    id: 'sn3h',
    chapterNum: 3,
    title: 'Precision Future',
    tagline: 'The drug evolved because you forced it to',
    narrative: `RIVEXA relaunches with mandatory CYP2C9 genotyping — first companion-diagnostic anticoagulant ever. Sales eventually surpass original projections. You are nominated for awards that don’t officially exist.`,
    character: 'Dr. Leo Kessler',
    characterQuote: '"We didn’t kill the drug. We evolved it."',
    choices: [],
    insights: ['The best safety decision can also be the best business decision'],
    emotionalTheme: 'Redemptive Innovation',
    timeToComplete: 'finale',
    rewards: { xp: 2100, character: 'Father of Precision Safety' },
    isEnding: true,
    endingName: 'The Future'
  }
];