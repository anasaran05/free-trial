// src/data/stories/protocol-302b.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: '302b-1',
    chapterNum: 1,
    title: 'The Performance Status Slide',
    tagline: 'ECOG 0–1 in the protocol, 2–3 in the chairs',
    narrative: `You’re monitoring Protocol 302B, a randomized Phase II anti-PD-L1 + novel ADC in first-line NSCLC. Strict inclusion: ECOG 0–1 only.

Site 004 has randomized 28 of their 35-patient target in nine months — triple the global average.

During your routine visit you pull ten charts at random. Eight of the ten patients are documented as ECOG 1 on the CRF, but nursing notes and PT assessments from the same week say ECOG 2 or 3. One patient needed a walker to reach the infusion chair.

The PI, Dr. Harlan Grant, shrugs: “These are real-world patients. The spirit of the trial is to treat people who need it.”`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"If we only enroll Olympians, we’ll never get the drug to the people who actually have cancer."',
    choices: [
      { text: 'Document the deviations and send protocol deviation forms to the sponsor', nextChapter: '302b-2a', consequence: 'You stay inside the lines' },
      { text: 'Privately confront Dr. Grant and demand immediate correction', nextChapter: '302b-2b', consequence: 'You pick a fight with a KOL' },
      { text: 'Quietly “correct” the source to match the CRFs', nextChapter: '302b-2c', consequence: 'You become part of the fix' },
      { text: 'Say nothing now but pull every single chart yourself', nextChapter: '302b-2d', consequence: 'You go rogue' }
    ],
    insights: ['Eligibility is the cleanest lie in oncology', 'Famous PIs are rarely wrong — they’re just final'],
    emotionalTheme: 'Unease',
    timeToComplete: '55 minutes',
    rewards: { xp: 220, character: 'Dr. Harlan Grant as complicated ally' }
  },

  {
    id: '302b-2a',
    chapterNum: 2,
    title: 'The Deviation Flood',
    tagline: 'Paperwork is a slow grenade',
    narrative: `You submit 18 major protocol deviations for incorrect ECOG scoring. The sponsor classifies every one as “minor — does not affect subject safety or primary endpoint.”

Two weeks later Site 004 receives a $150,000 “site support grant.” Dr. Grant sends you a bottle of 30-year scotch with a note: “For your thoroughness.”`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"The sponsor only cares about the p-value, not the punctuation."',
    choices: [
      { text: 'Escalate to the medical monitor with source evidence', nextChapter: '302b-3a', consequence: 'You refuse to let it die' },
      { text: 'Accept reality and move on', nextChapter: '302b-3b', consequence: 'You learn when to fold' }
    ],
    insights: ['Deviations are just another form of currency', 'Money heals most protocol wounds'],
    emotionalTheme: 'Futility',
    timeToComplete: '1 hour 10 minutes',
    rewards: { xp: 290, character: 'By-the-Book Martyr' }
  },

  {
    id: '302b-2b',
    chapterNum: 2,
    title: 'The God Complex',
    tagline: 'Some doctors don’t like being monitored',
    narrative: `You corner Dr. Grant in his office. He closes the door, voice low.

“You think you’re the first monitor who noticed? The last one who pushed is now monitoring veterinary trials in Nebraska.”

He shows you an email from the CMO thanking him for “creative flexibility that keeps us on timeline.”`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"I’ve published more papers than you’ve monitored sites. Sit down."',
    choices: [
      { text: 'Back down and apologize', nextChapter: '302b-3c', consequence: 'You survive the day' },
      { text: 'Secretly record and send everything to the FDA', nextChapter: '302b-3d', consequence: 'You declare war' }
    ],
    insights: ['Power in trials isn’t in the protocol — it’s in the byline', 'Some threats are career-ending and perfectly legal'],
    emotionalTheme: 'Intimidation',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 320, character: 'Survived a Legend' }
  },

  {
    id: '302b-2c',
    chapterNum: 2,
    title: 'The Silent Correction',
    tagline: 'You fix the source so the lie becomes truth',
    narrative: `Over three late nights you and the coordinator back-date addendums, “clarify” nursing notes, and rewrite PT assessments until every ECOG 2–3 becomes a 1.

Dr. Grant buys the monitoring team steak dinner. Your manager texts: “Great job keeping Site 004 green.”`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Welcome to the real world, kid."',
    choices: [
      { text: 'Take the win and move up', nextChapter: '302b-3e', consequence: 'You sold a piece' },
      { text: 'Keep copies of everything you altered', nextChapter: '302b-3f', consequence: 'Insurance policy' }
    ],
    insights: ['Source documents are clay, not stone', 'Complicity pays better than courage'],
    emotionalTheme: 'Complicity',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 350, character: 'Source Document Surgeon' }
  },

  {
    id: '302b-2d',
    chapterNum: 2,
    title: 'Every Chart',
    tagline: 'You wanted the truth. You got 312 folders.',
    narrative: `You stay until 2 a.m. for four straight nights. Result: 74% of the site’s enrollees are protocol violations. Some on home oxygen. One enrolled from hospice.

You now hold a thumb drive that could end multiple careers — including yours if it leaks too early.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Be careful what you dig for."',
    choices: [
      { text: 'Send it anonymously to the FDA', nextChapter: '302b-3g', consequence: 'Nuclear option' },
      { text: 'Use it to negotiate with the sponsor first', nextChapter: '302b-3h', consequence: 'Leverage or blackmail?' },
      { text: 'Destroy the drive and forget', nextChapter: '302b-3i', consequence: 'The coward’s exit' }
    ],
    insights: ['The deeper you dig, the more bodies you find', 'Truth is heavier than promotion'],
    emotionalTheme: 'Dread',
    timeToComplete: '1 hour 45 minutes',
    rewards: { xp: 400, character: 'Keeper of the Thumb Drive' }
  },

  // ==================== ENDINGS ====================

  {
    id: '302b-3a',
    chapterNum: 3,
    title: 'Clinical Hold',
    tagline: 'One site can poison everything',
    narrative: `The trial is placed on full clinical hold. Site 004’s data are excluded. The drug fails interim futility and is shelved. Dr. Grant is barred as PI for five years. You are never assigned to another academic site.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"You won. Enjoy the ashes."',
    choices: [],
    insights: ['Integrity can kill a drug faster than bad data'],
    emotionalTheme: 'Pyrrhic Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1600, character: 'The One Who Stopped 302B' },
    isEnding: true,
    endingName: 'The Hold'
  },

  {
    id: '302b-3b',
    chapterNum: 3,
    title: 'Learned Helplessness',
    tagline: 'You fold. The trial flies.',
    narrative: `You let it go. Protocol 302B meets enrollment, hits its endpoint, and the drug launches in 2028 with a broad label. At the celebration dinner Dr. Grant toasts “flexible partners who understand patients.” You raise your glass.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Some battles aren’t worth winning."',
    choices: [],
    insights: ['Silence is the most common signature in oncology'],
    emotionalTheme: 'Resigned Cynicism',
    timeToComplete: 'finale',
    rewards: { xp: 1200, character: 'Realist' },
    isEnding: true,
    endingName: 'The Fold'
  },

  {
    id: '302b-3c',
    chapterNum: 3,
    title: 'The Apology',
    tagline: 'You learn who really runs trials',
    narrative: `You apologize. Dr. Grant smiles, puts you on his “preferred monitor” list, and your career sails. The drug gets approved. No one ever speaks of ECOG again.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Good choice. See you at the next study."',
    choices: [],
    insights: ['Ego > Evidence', 'Some apologies are just tuition'],
    emotionalTheme: 'Submission',
    timeToComplete: 'finale',
    rewards: { xp: 1250, character: 'Preferred Monitor' },
    isEnding: true,
    endingName: 'The Apology'
  },

  {
    id: '302b-3d',
    chapterNum: 3,
    title: 'Whistleblower Exile',
    tagline: 'You told the truth. They buried you.',
    narrative: `FDA inspection. Stock tanks. Program terminated. You’re subpoenaed, deposed, and blacklisted. Two years later you’re monitoring trials in Australia under a new name.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"You should have stayed small."',
    choices: [],
    insights: ['Truth is expensive and rarely reimbursed'],
    emotionalTheme: 'Exile',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'Persona Non Grata' },
    isEnding: true,
    endingName: 'Career Suicide'
  },

  {
    id: '302b-3e',
    chapterNum: 3,
    title: 'Fast-Track Approval',
    tagline: 'The drug works. The label lies.',
    narrative: `The manipulated data hold. The drug is approved in 2028 with a label that quietly expands to ECOG 2. You make Senior CRA two years early. At night you still see the hospice patient’s chart.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Patients are getting the drug. Isn’t that what matters?"',
    choices: [],
    insights: ['Success and fraud can share the same press release'],
    emotionalTheme: 'Dirty Success',
    timeToComplete: 'finale',
    rewards: { xp: 1400, character: 'Fast-Track Survivor' },
    isEnding: true,
    endingName: 'The Launch'
  },

  {
    id: '302b-3f',
    chapterNum: 3,
    title: 'The Insurance Policy',
    tagline: 'You have the files. They have the power.',
    narrative: `You keep the originals. Years pass. The drug succeeds. One day an anonymous envelope with your evidence appears on a journalist’s desk anyway. You never admit it was you. You still get promoted.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Everyone keeps a knife. Few know when to use it."',
    choices: [],
    insights: ['Some leverage is only valuable if you never cash it in'],
    emotionalTheme: 'Paranoia Pays',
    timeToComplete: 'finale',
    rewards: { xp: 1550, character: 'The One With the Files' },
    isEnding: true,
    endingName: 'The Long Game'
  },

  {
    id: '302b-3g',
    chapterNum: 3,
    title: 'Anonymous Bomb',
    tagline: 'You lit the fuse and disappeared',
    narrative: `Your anonymous submission triggers chaos. Trial terminated. Company bankrupt. Dr. Grant retires to “consulting.” You watch it all burn from another CRO, another state, another life.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"I’ll find out who did this."',
    choices: [],
    insights: ['Anonymity is the only armor that never fails'],
    emotionalTheme: 'Cold Revenge',
    timeToComplete: 'finale',
    rewards: { xp: 1650, character: 'Ghost in the System' },
    isEnding: true,
    endingName: 'The Ghost'
  },

  {
    id: '302b-3h',
    chapterNum: 3,
    title: 'The Negotiation',
    tagline: 'Blackmail with a smile',
    narrative: `You meet the CMO off-site. Show the thumb drive. Walk out with a $200k “retention bonus” and a guarantee Site 004 will be quietly cleaned up. The drug launches clean. You sleep fine.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Smart. I always knew you were smart."',
    choices: [],
    insights: ['Everything has a price, even integrity'],
    emotionalTheme: 'Lucrative Cynicism',
    timeToComplete: 'finale',
    rewards: { xp: 1700, character: 'The Negotiator' },
    isEnding: true,
    endingName: 'The Deal'
  },

  {
    id: '302b-3i',
    chapterNum: 3,
    title: 'The Forgotten Drive',
    tagline: 'You looked. You blinked. You deleted.',
    narrative: `You smash the thumb drive in the parking lot. Transfer to dermatology trials. The drug gets approved. You never tell anyone what you almost did.`,
    character: 'Dr. Harlan Grant',
    characterQuote: '"Some truths are better left buried."',
    choices: [],
    insights: ['The easiest way to sleep is to forget what keeps you awake'],
    emotionalTheme: 'Moral Erosion',
    timeToComplete: 'finale',
    rewards: { xp: 1100, character: 'The One Who Walked Away' },
    isEnding: true,
    endingName: 'The Forgotten'
  }
];