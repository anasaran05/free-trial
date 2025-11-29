// src/data/stories/deferred-consent.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'dc1',
    chapterNum: 1,
    title: 'Code Stroke',
    tagline: 'The golden hour is bleeding out',
    narrative: `Level-1 trauma center, 2:17 a.m. A 46-year-old motorcyclist arrives with a massive right MCA infarct. tPA window closed. The only shot is the experimental CLOT-BUSTER neuro-thrombectomy device — still in its pivotal trial.

Inclusion criteria: symptom onset ≤ 6 hours + family consent.  
Problem: no family. Phone dead. No ID. He’s intubated and GCS 3.

The neurointerventionalist is scrubbed, the device rep is holding the $87,000 single-use catheter, and the research coordinator is staring at you — the on-call monitor who happened to be on-site finishing queries.

The PI says: “We have IRB-approved exception from informed consent for emergency research. 21 CFR 50.24. We can enroll now and get deferred consent later.”

You open the protocol. The EFIC plan exists… but only after community consultation and public disclosure, which this site never completed.

Clock: 5 hours 41 minutes left in the window.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"If we wait for perfect ethics, he dies with perfect autonomy."',
    choices: [
      { text: 'Allow enrollment under EFIC and document the waiver', nextChapter: 'dc2a', consequence: 'You trust the spirit of the regulation' },
      { text: 'Refuse enrollment — no consent, no randomization', nextChapter: 'dc2b', consequence: 'You stand on the letter of the law' },
      { text: 'Call the sponsor medical monitor right now', nextChapter: 'dc2c', consequence: 'You escalate in the middle of the night' },
      { text: 'Attempt to locate family through police/EMS while the cath lab holds', nextChapter: 'dc2d', consequence: 'You buy time that doesn’t exist' }
    ],
    insights: ['In emergencies, consent is a luxury', 'Regulations were written in conference rooms, not angio suites'],
    emotionalTheme: 'Urgency',
    timeToComplete: '45 minutes',
    rewards: { xp: 250, character: 'Dr. Amira Patel as adrenaline mentor' }
  },

  {
    id: 'dc2a',
    chapterNum: 2,
    title: 'The Waiver',
    tagline: 'You sign the form. The catheter crosses the groin.',
    narrative: `You countersign the EFIC worksheet. The patient is randomized to device + medical management.

Procedure successful — clot retrieved, TICI 3 flow. Patient wakes up day 3 talking.

Day 12: the sister finally appears. She’s furious. “Who gave you permission to experiment on my brother?”

She has already called a lawyer and the local news.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"We saved his life. The paperwork will catch up."',
    choices: [
      { text: 'Help the site obtain retrospective consent/assent now', nextChapter: 'dc3a', consequence: 'Damage control' },
      { text: 'Disclose the EFIC irregularity to the sponsor immediately', nextChapter: 'dc3b', consequence: 'You throw the site under the bus' },
      { text: 'Coach the team to document “attempts to locate family” more aggressively', nextChapter: 'dc3c', consequence: 'You help bury the gap' }
    ],
    insights: ['Saving a life and violating a regulation can happen in the same minute'],
    emotionalTheme: 'Relief → Dread',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 380, character: 'Golden Hour Survivor' }
  },

  {
    id: 'dc2b',
    chapterNum: 2,
    title: 'The One That Got Away',
    tagline: 'You said no. He circled the drain.',
    narrative: `You block enrollment. The cath lab stands down.

Four hours later the patient herniates and is made comfort care. Dies at 09:14.

The PI doesn’t speak to you again. The research coordinator cries in the stairwell. Your final monitoring visit report reads: “Site lost eligible subject due to inability to obtain consent.”`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Next time you play ethics police, do it on someone who has time."',
    choices: [
      { text: 'Stand by your decision', nextChapter: 'dc3d', consequence: 'Cold integrity' },
      { text: 'Privately apologize and ask to be removed from the study', nextChapter: 'dc3e', consequence: 'You run' }
    ],
    insights: ['Sometimes the right answer kills the patient'],
    emotionalTheme: 'Guilt',
    timeToComplete: '1 hour',
    rewards: { xp: 300, character: 'Upholder of the Rule' }
  },

  {
    id: 'dc2c',
    chapterNum: 2,
    title: 'The 3 A.M. Call',
    tagline: 'The medical monitor is not happy to be woken up',
    narrative: `The sponsor MM listens for 45 seconds, then says:

“Site never finished the EFIC requirements. Do NOT enroll. If they already did, we have bigger problems.”

You turn to tell the PI. The catheter is already in the carotid.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Great. Now we’re all screwed."',
    choices: [
      { text: 'Force the team to withdraw the patient immediately', nextChapter: 'dc3f', consequence: 'You try to undo physics' },
      { text: 'Let the procedure finish and deal with fallout later', nextChapter: 'dc3a', consequence: 'You’re already complicit' }
    ],
    insights: ['Corporate always chooses the cleaner lie'],
    emotionalTheme: 'Panic',
    timeToComplete: '1 hour 10 minutes',
    rewards: { xp: 340, character: 'Escalation Specialist' }
  },

  {
    id: 'dc2d',
    chapterNum: 2,
    title: 'The Search',
    tagline: 'Every minute looking is a minute not treating',
    narrative: `You and the coordinator tear through EMS run sheets, crash the police database, call every hospital in 100 miles.

No family found. Window closes. Patient deteriorates and dies.

The PI later writes in the SAE narrative: “Subject expired due to delay in therapeutic intervention secondary to research consent requirements.”`,
    character: 'Dr. Amira Patel',
    characterQuote: '"We killed him with kindness."',
    choices: [
      { text: 'Accept the outcome', nextChapter: 'dc3d', consequence: 'Shared guilt' },
      { text: 'Push the site to revise the EFIC plan before the next case', nextChapter: 'dc3g', consequence: 'You try to fix the system' }
    ],
    insights: ['Good intentions don’t reperfuse brain tissue'],
    emotionalTheme: 'Helplessness',
    timeToComplete: '1 hour 15 minutes',
    rewards: { xp: 320, character: 'The Searcher' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'dc3a',
    chapterNum: 3,
    title: 'Retrospective Consent',
    tagline: 'He lived. The family still sued.',
    narrative: `Sister eventually signs the deferred consent — after the hospital settles for $1.2M and the sponsor pays another $400k to make the problem disappear. FDA issues a warning letter to the site for incomplete EFIC. You are reassigned to chronic pain studies.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"We saved his life and bought him a yacht."',
    choices: [],
    insights: ['Money is the universal surrogate decision-maker'],
    emotionalTheme: 'Expensive Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1400, character: 'Golden Hour Compromiser' },
    isEnding: true,
    endingName: 'He Walked, They Paid'
  },

  {
    id: 'dc3b',
    chapterNum: 3,
    title: 'Self-Reported',
    tagline: 'You told the truth. They hung the site.',
    narrative: `Your report triggers an FDA audit. The entire trial is placed on partial hold until every site proves EFIC compliance. The device misses the market window and is shelved. The patient recovers fully but never knows his case killed the study.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Congratulations. Perfect ethics, zero patients treated."',
    choices: [],
    insights: ['One honest monitor can murder hope'],
    emotionalTheme: 'Pyrrhic Integrity',
    timeToComplete: 'finale',
    rewards: { xp: 1600, character: 'The One Who Sank the Trial' },
    isEnding: true,
    endingName: 'Righteous Hold'
  },

  {
    id: 'dc3c',
    chapterNum: 3,
    title: 'Creative Documentation',
    tagline: 'The record says everything was perfect',
    narrative: `You coach the team to back-date community consultation sign-in sheets and “reconstruct” public disclosure evidence. FDA never looks closely. The device gets approved in 2029. You make Lead CRA.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Paper is patient."',
    choices: [],
    insights: ['In emergencies, forgery can be a form of compassion'],
    emotionalTheme: 'Lucrative Fraud',
    timeToComplete: 'finale',
    rewards: { xp: 1500, character: 'Master of Necessary Fictions' },
    isEnding: true,
    endingName: 'The Perfect File'
  },

  {
    id: 'dc3d',
    chapterNum: 3,
    title: 'The Death We Own',
    tagline: 'He died because we followed the rules',
    narrative: `The obituary runs three days later. The site removes itself from all neuro trials. You still see his blank stare every time you close your eyes.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Next time I’ll make the call myself."',
    choices: [],
    insights: ['Some patients are sacrificed on the altar of process'],
    emotionalTheme: 'Haunting Regret',
    timeToComplete: 'finale',
    rewards: { xp: 1100, character: 'Keeper of the One That Died Right' },
    isEnding: true,
    endingName: 'The Pure Death'
  },

  {
    id: 'dc3e',
    chapterNum: 3,
    title: 'Transferred',
    tagline: 'You run from the memory',
    narrative: `You request reassignment. New therapeutic area: pediatric dermatology. You never work another acute stroke trial.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Smart. Some ghosts you don’t need."',
    choices: [],
    insights: ['Cowardice is a survival skill'],
    emotionalTheme: 'Avoidance',
    timeToComplete: 'finale',
    rewards: { xp: 1000, character: 'The One Who Left Trauma' },
    isEnding: true,
    endingName: 'The Transfer'
  },

  {
    id: 'dc3f',
    chapterNum: 3,
    title: 'Withdrawal After the Fact',
    tagline: 'You try to un-ring the bell',
    narrative: `You force the site to withdraw the patient post-procedure. Data excluded. Sponsor furious. FDA still cites the site for improper enrollment. The patient recovers anyway, but the trial dies.`,
    character: 'Dr. Amira Patel',
    characterQuote: '"We saved him for nothing."',
    choices: [],
    insights: ['You can’t withdraw a miracle'],
    emotionalTheme: 'Absurdity',
    timeToComplete: 'finale',
    rewards: { xp: 1450, character: 'The Unenroller' },
    isEnding: true,
    endingName: 'Pointless Withdrawal'
  },

  {
    id: 'dc3g',
    chapterNum: 3,
    title: 'The Fixed Protocol',
    tagline: 'You change the system instead of breaking it',
    narrative: `You work with the site and sponsor to fast-track proper EFIC implementation nationwide. Next code stroke enrolls cleanly. Device approved 2031. You are invited to the FDA advisory committee as the monitor who “got it right.”`,
    character: 'Dr. Amira Patel',
    characterQuote: '"Finally. Ethics that don’t kill people."',
    choices: [],
    insights: ['Real change is slower than any golden hour — but it lasts'],
    emotionalTheme: 'Hard-Won Hope',
    timeToComplete: 'finale',
    rewards: { xp: 1700, character: 'Architect of Better Chaos' },
    isEnding: true,
    endingName: 'The Reform'
  }
];