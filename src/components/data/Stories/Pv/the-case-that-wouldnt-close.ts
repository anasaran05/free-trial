// src/data/stories/the-case-that-wouldnt-close.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'cwc1',
    chapterNum: 1,
    title: 'The Case That Wouldn’t Close',
    tagline: 'Eleven identical SJS/TEN-like rashes in 28 days',
    narrative: `ZUVARA (JAK-1 inhibitor for atopic dermatitis) has been on the market for 14 months. Global exposure: 1.8 million patient-years.

Suddenly, eleven cases of severe cutaneous adverse reactions (all coded as possible SJS/TEN) land in your inbox — all from one South-East Asian country, all within a four-week window.

Every patient:
• Day 9–14 of therapy
• Mucosal involvement
• 20–40 % BSA detachment
• Four deaths

Your global rate for SJS/TEN is 0.08/100 000 patient-years. This cluster is >400× higher.

Counterfeit ZUVARA is known to circulate in that exact region.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"When the impossible happens eleven times, it’s no longer impossible."',
    choices: [
      { text: 'Immediately classify as counterfeit-related and trigger global batch recall', nextChapter: 'cwc2a', consequence: 'You point at fraud first' },
      { text: 'Convene urgent causality panel — this could be ethnic HLA susceptibility', nextChapter: 'cwc2b', consequence: 'You look for biology' },
      { text: 'Fly to the region tomorrow with the forensic PK team', nextChapter: 'cwc2c', consequence: 'You need physical evidence' },
      { text: 'Launch an urgent nested case-control study using local claims data', nextChapter: 'cwc2d', consequence: 'You go epidemiological' }
    ],
    insights: ['Clusters are either biology or crime — rarely both', 'Counterfeit drugs don’t read the SmPC'],
    emotionalTheme: 'Paranoia',
    timeToComplete: '60 minutes',
    rewards: { xp: 300, character: 'Dr. Priya Malhotra as forensic safety lead' }
  },

  {
    id: 'cwc2a',
    chapterNum: 2,
    title: 'The Counterfeit Hypothesis',
    tagline: 'You called it fraud. The evidence disagreed.',
    narrative: `You trigger a worldwide hold on all ZUVARA batches manufactured in the last 18 months.

Forensic lab results come back in 9 days: every seized blister from the patients contains genuine ZUVARA — correct API, correct strength, correct dissolution profile.

No counterfeit. Just your drug doing exactly what it’s supposed to do… in the wrong patients.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We just recalled two billion dollars of perfectly good medicine."',
    choices: [
      { text: 'Reverse the recall quietly and pivot to genetic hypothesis', nextChapter: 'cwc3a', consequence: 'Damage control' },
      { text: 'Double down — there must be an unknown contaminant', nextChapter: 'cwc3b', consequence: 'You dig deeper into manufacturing' }
    ],
    insights: ['False positives in safety are measured in billions', 'Counterfeit is the easiest scapegoat'],
    emotionalTheme: 'Embarrassment',
    timeToComplete: '1 hour 25 minutes',
    rewards: { xp: 380, character: 'The One Who Cried Counterfeit' }
  },

  {
    id: 'cwc2b',
    chapterNum: 2,
    title: 'The HLA Theory',
    tagline: 'One allele could explain everything',
    narrative: `You sequence stored blood from the eleven cases.

Result: 10/11 carry HLA-B*15:02 (population frequency in that country: 12 %).  
Known strong association with carbamazepine SJS/TEN. Your drug is a JAK inhibitor — no previous HLA link.

But the timing, severity, and mucosal pattern are textbook aromatic-induced SJS.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We may have just discovered a new pharmacogenetic bomb."',
    choices: [
      { text: 'Recommend immediate HLA-B*15:02 screening in all Asian patients', nextChapter: 'cwc3c', consequence: 'You go all-in on genetics' },
      { text: 'Demand full aromatic moiety analysis — maybe a metabolite', nextChapter: 'cwc3d', consequence: 'You chase chemistry' },
      { text: 'Argue the association is coincidental and continue marketing', nextChapter: 'cwc3e', consequence: 'You deny' }
    ],
    insights: ['One allele can bankrupt a blockbuster', 'Negative studies don’t disprove risk — they just haven’t found it yet'],
    emotionalTheme: 'Eureka → Terror',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 460, character: 'HLA Hunter' }
  },

  {
    id: 'cwc2c',
    chapterNum: 2,
    title: 'Boots on the Ground',
    tagline: 'You see the patients yourself',
    narrative: `You land in-country. Visit four survivors in the burn unit.

Every patient bought ZUVARA from the same chain of “discount” pharmacies. Blisters look perfect — but the tablets smell faintly of solvent.

You send 30 unopened packs for advanced impurity profiling.

Result: all contain 0.4–0.8 % of a highly aromatic process impurity never seen in commercial batches — a known SJS-inducing moiety from an abandoned synthetic route.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We didn’t make counterfeit. Someone resurrected our garbage."',
    choices: [
      { text: 'Global recall + criminal referral', nextChapter: 'cwc3f', consequence: 'You found the real crime' },
      { text: 'Quietly switch to new synthetic route and say nothing', nextChapter: 'cwc3g', consequence: 'You bury it' }
    ],
    insights: ['The most dangerous counterfeit is the one that passes every test', 'Old chemistry never dies — it waits'],
    emotionalTheme: 'Horror',
    timeToComplete: '1 hour 50 minutes',
    rewards: { xp: 500, character: 'Field Detective' }
  },

  {
    id: 'cwc2d',
    chapterNum: 2,
    title: 'The Epidemiological Truth',
    tagline: 'Claims data never lies',
    narrative: `Your nested case-control study (n=48 000) finishes in six weeks.

Adjusted OR for SJS/TEN in HLA-B*15:02 carriers using ZUVARA: 412 (95% CI 180–940).

No increased risk in non-carriers.

The impurity theory collapses — genuine product, genuine risk, genetically restricted.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We have a ticking genetic landmine wearing our label."',
    choices: [
      { text: 'Withdraw from all Asian markets', nextChapter: 'cwc3h', consequence: 'Surgical retreat' },
      { text: 'Implement mandatory HLA screening + restricted distribution', nextChapter: 'cwc3i', consequence: 'Precision safety' },
      { text: 'Add a bolded warning and let prescribers decide', nextChapter: 'cwc3j', consequence: 'Minimal change' }
    ],
    insights: ['Pharmacoepi can find what pharmacovigilance misses', 'Some risks are acceptable — in the right genome'],
    emotionalTheme: 'Cold Certainty',
    timeToComplete: '1 hour 35 minutes',
    rewards: { xp: 480, character: 'Master of Real-World Evidence' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'cwc3a',
    chapterNum: 3,
    title: 'The Quiet Reversal',
    tagline: 'You recalled, then un-recalled, then prayed',
    narrative: `Recall reversed after 11 days. Stock recovers. You add a weak Asian warning. Two years later another cluster kills eight more. Second recall is permanent.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We bought eighteen months with eleven graves."',
    choices: [],
    insights: ['Temporary solutions become permanent scars'],
    emotionalTheme: 'Delayed Reckoning',
    timeToComplete: 'finale',
    rewards: { xp: 1300, character: 'The One Who Hesitated' },
    isEnding: true,
    endingName: 'The Second Wave'
  },

  {
    id: 'cwc3f',
    chapterNum: 3,
    title: 'Criminal Resurrection',
    tagline: 'You shut down an entire illegal factory',
    narrative: `Interpol raid finds a rogue chemist using your abandoned 2017 synthetic route. Global recall of affected regions only. ZUVARA survives with minor market loss. You receive a quiet medal from the WHO.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We didn’t save the drug. We saved the next one."',
    choices: [],
    insights: ['Sometimes the villain is chemistry with a memory'],
    emotionalTheme: 'Strange Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1950, character: 'Graveyard Chemist Slayer' },
    isEnding: true,
    endingName: 'The Raid'
  },

  {
    id: 'cwc3i',
    chapterNum: 3,
    title: 'The First HLA-Guided Dermatologic',
    tagline: 'You turned a curse into a new standard',
    narrative: `ZUVARA relaunched in Asia with mandatory HLA-B*15:02 screening. Becomes the safest JAK inhibitor in history. Sales eventually exceed pre-crisis levels. Regulators cite it as a model for personalised risk management.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We didn’t withdraw from Asia. We evolved Asia."',
    choices: [],
    insights: ['The most ethical label restriction can also be the most profitable'],
    emotionalTheme: 'Redemptive Precision',
    timeToComplete: 'finale',
    rewards: { xp: 2150, character: 'Mother of Pharmacogenetic Safety' },
    isEnding: true,
    endingName: 'The New Standard'
  },

  {
    id: 'cwc3j',
    chapterNum: 3,
    title: 'The Warning That Wasn’t Enough',
    tagline: 'Bolded text doesn’t stop bullets',
    narrative: `Warning added. Prescribers ignore it. Another 42 cases, 19 deaths. Forced withdrawal from 14 countries. Company pays $4.8 bn settlement.`,
    character: 'Dr. Priya Malhotra',
    characterQuote: '"We warned them. They just didn’t read."',
    choices: [],
    insights: ['Warnings are the cheapest and least effective safety tool'],
    emotionalTheme: 'Predictable Tragedy',
    timeToComplete: 'finale',
    rewards: { xp: 1400, character: 'Author of the Ignored Warning' },
    isEnding: true,
    endingName: 'The Inevitable'
  }
];