import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'ch1',
    chapterNum: 1,
    title: 'The Molecule',
    tagline: 'Innovation always has a price',
    narrative: `You join NeuraBio, a biotech startup developing NB-47: a breakthrough monoclonal antibody for treatment-resistant depression. Early trials show miracles. Patients who failed everything suddenly wake up wanting to live.

Day 12 on the job, you see an unusual report. A 28-year-old engineer in Phase II collapses with sudden seizures. No prior history. His EEG lights up with unexplained hyperactivity.

The CEO says: “One case means nothing. Don’t slow us down.”
Your instinct says: “One case could mean everything.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"In biotech, we don’t just build drugs. We build consequences."',
    choices: [
      { text: 'Document meticulously. Don’t escalate yet.', nextChapter: 'ch2a', consequence: 'The company moves faster. The truth stays hidden.' },
      { text: 'Report to the trial safety board immediately.', nextChapter: 'ch2b', consequence: 'You risk becoming “the problem.”' },
      { text: 'Call the patient. Seek clarity from the source.', nextChapter: 'ch2c', consequence: 'You step outside protocol.' }
    ],
    insights: ['Innovation creates risk', 'Silence kills science faster than error'],
    emotionalTheme: 'Initiation',
    timeToComplete: '45 minutes',
    rewards: { xp: 180, character: 'Dr. Lina Arora as advisor' }
  },

  {
    id: 'ch2a',
    chapterNum: 2,
    title: 'The Quiet Path',
    tagline: 'Data without voice',
    narrative: `You record the seizure, submit internal documentation, and move on. Trials accelerate. Funding explodes. NB-47 becomes the company’s golden child.

Two more seizure cases appear. One ends in ICU.
Your inbox pings: “URGENT: REORGANIZATION — ALL AE INVESTIGATIONS ROUTE THROUGH EXECUTIVE OPS.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"If data is buried, were you ever truly a scientist?"',
    choices: [
      { text: 'Push for internal review', nextChapter: 'ch3a', consequence: 'You become an internal resistor' },
      { text: 'Start collecting patterns quietly', nextChapter: 'ch3b', consequence: 'You risk getting caught' }
    ],
    insights: ['Compliance can be weaponized', 'Delay becomes harm'],
    emotionalTheme: 'Suppression',
    timeToComplete: '1 hour',
    rewards: { xp: 240, character: 'Silent Analyst' }
  },

  {
    id: 'ch2b',
    chapterNum: 2,
    title: 'The Alarm Bell',
    tagline: 'Blowing the whistle',
    narrative: `You send an urgent report to the trial safety board. The call with regulatory advisors lasts 20 minutes. The trial freezes within the hour.

Executives stare at you like you killed the company. The CEO whispers: “We had investors flying in next week. What have you done?”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Being right rarely makes you popular."',
    choices: [
      { text: 'Stand by your decision', nextChapter: 'ch3a', consequence: 'Your spine becomes your weapon' },
      { text: 'Suggest isolated sub-cohort continuation', nextChapter: 'ch3c', consequence: 'Compromise buys time' }
    ],
    insights: ['Safety always costs someone money', 'Stopping harm is not the same as proving harm'],
    emotionalTheme: 'Rebellion',
    timeToComplete: '1 hour',
    rewards: { xp: 320, character: 'Early Guardian' }
  },

  {
    id: 'ch2c',
    chapterNum: 2,
    title: 'The Patient’s Voice',
    tagline: 'The human beneath the protocol',
    narrative: `You break protocol and call the patient. He speaks slowly. “It wasn’t the seizures. It was the first three days.”

He describes vivid hallucinations. A voice convincing him to walk into traffic. You sit frozen. These symptoms aren’t in the reports. They weren’t even captured.

He ends with: “Your drug gave me hope. It also tried to end me.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Truth comes from mouths, not spreadsheets."',
    choices: [
      { text: 'Incorporate patient narrative into AE reports', nextChapter: 'ch3b', consequence: 'You fracture protocol to protect life' },
      { text: 'Escalate narrative evidence to regulators', nextChapter: 'ch3c', consequence: 'You weaponize empathy' }
    ],
    insights: ['Patients reveal what instruments miss', 'Unreported symptoms are silent killers'],
    emotionalTheme: 'Empathy',
    timeToComplete: '1 hour',
    rewards: { xp: 350, character: 'Patient Listener' }
  },

  {
    id: 'ch3a',
    chapterNum: 3,
    title: 'The War Room',
    tagline: 'Science vs shareholders',
    narrative: `The boardroom fills. Scientists, lawyers, investors. The CEO accuses you of sabotaging progress. The clinical lead blames stress conditions.

The data is weak, the signals messy, but the pattern is real. You are handed the mic: explain why NB-47 might cause neuroelectric overload.

You have one slide and thirty seconds.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"You’re not arguing for data. You’re arguing for lives."',
    choices: [
      { text: 'Make the mechanistic case', nextChapter: 'ch4a', consequence: 'You win scientists, lose investors' },
      { text: 'Make the ethical case', nextChapter: 'ch4b', consequence: 'You win regulators, lose executives' },
      { text: 'Make the market risk case', nextChapter: 'ch4c', consequence: 'You win pragmatists, lose idealists' }
    ],
    insights: ['You speak to values, not evidence', 'Your tone defines your fate'],
    emotionalTheme: 'Confrontation',
    timeToComplete: '90 minutes',
    rewards: { xp: 500, character: 'Crisis Strategist' }
  },

  {
    id: 'ch3b',
    chapterNum: 3,
    title: 'The Pattern Hunter',
    tagline: 'Signals rarely shout',
    narrative: `You dig through raw EEG streams. You map seizures across timelines. A pattern emerges: spikes at dose intervals 18–24 hours post-administration.

You predict another cluster. Three days later, it arrives. You were right. You weren’t prepared for being right.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"The moment you see the pattern, you own its consequences."',
    choices: [
      { text: 'Publish internally, force transparency', nextChapter: 'ch4a', consequence: 'You burn bridges' },
      { text: 'Seek external peers discreetly', nextChapter: 'ch4d', consequence: 'You create allies' }
    ],
    insights: ['Prediction is accountability', 'Vision makes you dangerous'],
    emotionalTheme: 'Discovery',
    timeToComplete: '1.5 hours',
    rewards: { xp: 520, character: 'Signal Seeker' }
  },

  {
    id: 'ch3c',
    chapterNum: 3,
    title: 'The Compromise',
    tagline: 'Half-measures, full consequences',
    narrative: `You propose limited dosing with strict monitoring. The trial resumes. The stock recovers.

One patient dies 11 days later. The autopsy references NB-47 toxicity. Your compromise becomes a headline. Your name becomes attached to it.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Neutrality is rarely neutral."',
    choices: [
      { text: 'Accept blame and go public', nextChapter: 'ch4b', consequence: 'You become the whistle' },
      { text: 'Fight, argue trial mismanagement', nextChapter: 'ch4e', consequence: 'You risk your career' }
    ],
    insights: ['Compromise is responsibility without control'],
    emotionalTheme: 'Regret',
    timeToComplete: '2 hours',
    rewards: { xp: 600, character: 'Fallible Guardian' }
  },

  // ==================== CHAPTER 4 ====================

  {
    id: 'ch4a',
    chapterNum: 4,
    title: 'The Fracture',
    tagline: 'When science wins, people lose jobs',
    narrative: `Your mechanistic presentation lands like a bomb. The room splits: scientists nod, investors pale. The board votes to suspend Phase III enrollment pending full EEG review.

That night, security escorts three colleagues out. You’re called a hero by some, a killer by others. Your badge now opens fewer doors.

An encrypted message arrives from an unknown sender: “They’re planning to bury the EEG data. Meet me. Midnight. Sub-level parking.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Victory in this building always smells like severance."',
    choices: [
      { text: 'Go to the meeting alone', nextChapter: 'ch5a', consequence: 'You walk into the unknown' },
      { text: 'Bring a trusted colleague', nextChapter: 'ch5b', consequence: 'Safety in numbers, risk of exposure' },
      { text: 'Ignore it. Report the message', nextChapter: 'ch5c', consequence: 'You choose institutional loyalty' }
    ],
    insights: ['Truth creates casualties', 'Loyalty is a moving target'],
    emotionalTheme: 'Isolation',
    timeToComplete: '2 hours',
    rewards: { xp: 700, character: 'Truth Bearer' }
  },

  {
    id: 'ch4b',
    chapterNum: 4,
    title: 'The Leak',
    tagline: 'Your name, their headline',
    narrative: `You go public. The story breaks on every major outlet: “NeuraBio Scientist Sacrifices Career to Save Lives.” The stock plummets 68 % overnight.

The company issues a statement calling you “a disgruntled employee with incomplete information.” Your phone won’t stop ringing—journalists, recruiters, death threats.

A patient advocacy group contacts you: they have 47 unreported cases. They want to testify. With you.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Once the world knows your name, you no longer own it."',
    choices: [
      { text: 'Lead the public testimony', nextChapter: 'ch5d', consequence: 'You become the face of accountability' },
      { text: 'Hand evidence to regulators anonymously', nextChapter: 'ch5e', consequence: 'You disappear, the fight continues' }
    ],
    insights: ['Fame is a weapon with two edges', 'Going public never lets you go home'],
    emotionalTheme: 'Exposure',
    timeToComplete: '2.5 hours',
    rewards: { xp: 900, character: 'Whistleblower' }
  },

  {
    id: 'ch4c',
    chapterNum: 4,
    title: 'The Pragmatist',
    tagline: 'You saved the company by scaring it',
    narrative: `You frame the seizures as a manageable liability. Investors exhale. The board authorizes a $400 M pivot fund to fix NB-47 instead of killing it.

You’re promoted to VP of Risk Mitigation. Your first assignment: draft the narrative that explains the deaths as “acceptable in the context of breakthrough innovation.”

You stare at the blank document. Your cursor blinks like a heartbeat.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Some souls are purchased with stock options."',
    choices: [
      { text: 'Write the narrative they want', nextChapter: 'ch5f', consequence: 'You become what you once fought' },
      { text: 'Sabotage from within', nextChapter: 'ch5g', consequence: 'You play a longer, darker game' }
    ],
    insights: ['Power corrupts quietly', 'The system absorbs its critics'],
    emotionalTheme: 'Corruption',
    timeToComplete: '2 hours',
    rewards: { xp: 750, character: 'Corporate Survivor' }
  },

  {
    id: 'ch4d',
    chapterNum: 4,
    title: 'The Shadow Network',
    tagline: 'Science still has underground railroads',
    narrative: `You reach three academic neuroscientists you trust. Within a week you have a secure Slack, encrypted drives, and a preprint titled “NB-47 Induced Kindling: A Case Series.”

The paper is ready to drop. If it drops, NeuraBio dies. If it doesn’t, more patients will.

One of the scientists confesses: the FDA reviewer assigned to NB-47 is a former NeuraBio fellow. The conflict was never disclosed.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"The system protects itself with friendships."',
    choices: [
      { text: 'Publish anyway', nextChapter: 'ch5d', consequence: 'You torch the old world' },
      { text: 'Use the conflict as leverage', nextChapter: 'ch5h', consequence: 'You play institutional chess' }
    ],
    insights: ['Peer review is also peer pressure', 'Revolutions begin in group chats'],
    emotionalTheme: 'Solidarity',
    timeToComplete: '2.5 hours',
    rewards: { xp: 800, character: 'Underground Scholar' }
  },

  {
    id: 'ch4e',
    chapterNum: 4,
    title: 'Scapegoat',
    tagline: 'They need a villain. You volunteer.',
    narrative: `You take full public blame for the failed monitoring. NeuraBio spins you as a rogue actor. The trial is halted “out of an abundance of caution.”

Behind closed doors, the company quietly shelves NB-47 and pivots to NB-48—an almost identical molecule with a cleaner safety profile. Your sacrifice bought them time.

Six months later you’re unemployable in biotech. A letter arrives from the dead patient’s widow: “Thank you for giving my husband a name.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Some falls break the ground beneath others."',
    choices: [
      { text: 'Disappear and rebuild a quiet life', nextChapter: 'ending-bitter', consequence: 'Peace at the price of relevance' },
      { text: 'Start testifying at every hearing', nextChapter: 'ending-martyr', consequence: 'You become legend and target' }
    ],
    insights: ['Sacrifice is only noble if someone notices'],
    emotionalTheme: 'Sacrifice',
    timeToComplete: '2 hours',
    rewards: { xp: 1000, character: 'Scapegoat Saint' }
  },

  // ==================== CHAPTER 5 & ENDINGS ====================

  {
    id: 'ch5a',
    chapterNum: 5,
    title: 'Midnight in the Garage',
    tagline: 'Trust is the most expensive currency',
    narrative: `The informant is the former head of preclinical. She hands you a USB drive labeled “ORIGINAL TOX”.

“It shows NB-47 crosses the blood-brain barrier at 400× the rate we claimed. They knew in 2019.”

Headlights sweep the garage. Two security SUVs block the exit. She whispers, “Run.”`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Some truths come with footsteps behind them."',
    choices: [
      { text: 'Run with the drive', nextChapter: 'ending-rogue', consequence: 'You vanish with the smoking gun' },
      { text: 'Destroy the drive, protect her', nextChapter: 'ending-silence', consequence: 'The secret dies with you both' }
    ],
    insights: ['Evidence is only useful if you live to deliver it'],
    emotionalTheme: 'Betrayal',
    timeToComplete: '2.5 hours',
    rewards: { xp: 1100, character: 'Fugitive' }
  },

  {
    id: 'ch5d',
    chapterNum: 5,
    title: 'The Reckoning',
    tagline: 'Some molecules must die so people can live',
    narrative: `The preprint drops. Congress calls hearings. NeuraBio files for Chapter 11. The CEO disappears to Dubai.

You sit in front of cameras while patients—alive because the drug never reached market—thank you with tears.

Your mother asks when you’re coming home for dinner. You realize you no longer have a home that isn’t a hotel.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Redemption is just grief with better lighting."',
    choices: [],
    insights: ['Justice is cold comfort', 'The right thing still breaks you'],
    emotionalTheme: 'Pyrrhic Victory',
    timeToComplete: '3 hours',
    rewards: { xp: 1500, character: 'The One Who Stopped It' },
    isEnding: true,
    endingName: 'The Reckoning'
  },

  {
    id: 'ending-rogue',
    chapterNum: 6,
    title: 'Exile',
    tagline: 'You won, but no one will ever know',
    narrative: `You surface in Argentina under a new name. The USB drive leaks through journalists you’ll never meet. NeuraBio collapses. NB-47 dies quietly.

Some nights you still hear the seizures in your dreams—like static trying to become voices.

You did the right thing. No one will ever shake your hand for it.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Ghosts don’t get statues."',
    choices: [],
    insights: ['The purest victories are invisible'],
    emotionalTheme: 'Exile',
    timeToComplete: 'finale',
    rewards: { xp: 2000, character: 'The Unnamed' },
    isEnding: true,
    endingName: 'Exile'
  },

  {
    id: 'ending-bitter',
    chapterNum: 6,
    title: 'The Quiet Life',
    tagline: 'Some battles end when you simply walk away',
    narrative: `You teach high school biology in a town no one can pronounce. Your students think antidepressants come from kind doctors and careful science.

You never correct them.

Some nights you open the drawer with the unused whistleblower lawyer’s business card and wonder if silence was another kind of complicity.

But your garden grows. And no one is having seizures because of you.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Peace is the only trophy they can’t take away."',
    choices: [],
    insights: ['Surviving is its own rebellion'],
    emotionalTheme: 'Acceptance',
    timeToComplete: 'finale',
    rewards: { xp: 1200, character: 'The Teacher' },
    isEnding: true,
    endingName: 'The Quiet Life'
  },

  {
    id: 'ending-martyr',
    chapterNum: 6,
    title: 'Martyr',
    tagline: 'They will name wings of hospitals after you',
    narrative: `You testify for three years straight. New laws carry your fingerprints. NB-47 becomes the cautionary tale in every IRB training.

Your body gives out at 41 from stress and threats you never reported. At your funeral, strangers weep. The CEO sends flowers with no card.

You saved thousands. You never saw your niece grow up.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"Some names only fit on plaques."',
    choices: [],
    insights: ['Martyrdom is death by gratitude'],
    emotionalTheme: 'Tragic Heroism',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'The Martyr' },
    isEnding: true,
    endingName: 'Martyr'
  },

  {
    id: 'ch5f',
    chapterNum: 5,
    title: 'Ascension',
    tagline: 'Welcome to the top. Mind the fall.',
    narrative: `Ten years later you are Chief Scientific Officer of what remains of NeuraBio—now rebranded as MindCure Therapeutics.

NB-52 launches next quarter. The safety profile is pristine.

You approved it.

Sometimes, when you sign off on the final clinical overview, your hand shakes for reasons no one in the room understands anymore.`,
    character: 'Dr. Lina Arora',
    characterQuote: '"The molecule always wins."',
    choices: [],
    insights: ['The system doesn’t change. It digests.'],
    emotionalTheme: 'Moral Collapse',
    timeToComplete: 'finale',
    rewards: { xp: 1600, character: 'The Executive' },
    isEnding: true,
    endingName: 'Ascension'
  }
]