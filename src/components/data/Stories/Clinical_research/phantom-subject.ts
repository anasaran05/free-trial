// src/data/stories/phantom-subject.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'ps1',
    chapterNum: 1,
    title: 'Subject 112',
    tagline: 'Perfect compliance on paper, invisible in real life',
    narrative: `Phase III migraine prophylaxis trial. Site 019 (small private neurology practice) is a unicorn: 100% ePRO completion rate, zero missing visits, zero queries on 19 randomized subjects.

You’re on a routine monitoring visit and notice Subject 112:

- Every diary entry time-stamped between 03:01 and 03:07 a.m. for 112 consecutive days  
- Concomitant medication log signed by the patient on every visit — but the receptionist swears she’s never seen anyone matching the described 34-year-old male  
- Investigator signature on Day 28 visit is dated 3 weeks before the actual visit window opened  
- Dispensed 6 bottles of investigational product, returned 0

The coordinator, Jen, smiles too brightly when you ask about 112: “Oh he’s super reliable. Comes in before we open sometimes.”`,
    character: 'Jen Park',
    characterQuote: '"Some patients just really hate waiting rooms."',
    choices: [
      { text: 'Pull every source document for Subject 112 right now', nextChapter: 'ps2a', consequence: 'You start the autopsy' },
      { text: 'Casually ask to meet Subject 112 at his next scheduled visit tomorrow', nextChapter: 'ps2b', consequence: 'You set a trap' },
      { text: 'Run a remote database audit tonight from your hotel', nextChapter: 'ps2c', consequence: 'You hunt in the dark' },
      { text: 'Call the sponsor safety team — this smells like fraud', nextChapter: 'ps2d', consequence: 'You go loud early' }
    ],
    insights: ['Perfect data is the loudest alarm', 'Ghosts leave electronic footprints'],
    emotionalTheme: 'Suspicion',
    timeToComplete: '50 minutes',
    rewards: { xp: 240, character: 'Jen Park as charming liar' }
  },

  {
    id: 'ps2a',
    chapterNum: 2,
    title: 'The Empty Binder',
    tagline: 'There is no source. There never was.',
    narrative: `You demand the regulatory binder for 112. Jen disappears for 45 minutes.

She returns with a single manila folder containing:
- A consent form signed in flawless cursive  
- A handwritten headache diary photocopied 28 times  
- One HIPAA form  
- Zero medical records, zero pharmacy accountability logs, zero ECGs

The consent was supposedly signed on a Saturday when the site was closed. The witness signature is Jen’s own handwriting.`,
    character: 'Jen Park',
    characterQuote: '"I may have… helped him along. His migraines were so bad."',
    choices: [
      { text: 'Confront Jen on the spot and demand full confession', nextChapter: 'ps3a', consequence: 'You corner the architect' },
      { text: 'Say nothing yet but photograph everything', nextChapter: 'ps3b', consequence: 'You build the silent case' },
      { text: 'Ask to speak to the PI immediately', nextChapter: 'ps3c', consequence: 'You escalate past the coordinator' }
    ],
    insights: ['Fabrication is easier than recruitment', 'One person can invent a human being in an afternoon'],
    emotionalTheme: 'Disbelief → Anger',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 360, character: 'Phantom Hunter' }
  },

  {
    id: 'ps2b',
    chapterNum: 2,
    title: 'The No-Show',
    tagline: 'You wait all morning. Nobody comes.',
    narrative: `You camp in the waiting room from 7 a.m. with a clear view of the only entrance.

11:30 a.m. — Jen walks past holding a Starbucks tray, sees you, freezes.

At 11:47 she logs into the ePRO portal from her phone and completes Subject 112’s Day 84 assessments in 4 minutes flat.

She finally whispers: “Please. I’m two subjects short of my bonus. The PI will fire me.”`,
    character: 'Jen Park',
    characterQuote: '"If I lose this job I lose my apartment. You’d do the same."',
    choices: [
      { text: 'Offer her immunity if she comes clean right now', nextChapter: 'ps3d', consequence: 'You recruit the ghost' },
      { text: 'Take screenshots and report her immediately', nextChapter: 'ps3e', consequence: 'No mercy' },
      { text: 'Pretend to look away — for now', nextChapter: 'ps3f', consequence: 'You become an accessory' }
    ],
    insights: ['Desperation is the universal solvent of integrity'],
    emotionalTheme: 'Pity vs Duty',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 380, character: 'The Watcher' }
  },

  {
    id: 'ps2c',
    chapterNum: 2,
    title: 'Midnight Uploads',
    tagline: 'Every diary entry originates from the same two IP addresses',
    narrative: `From your hotel you run an audit log report.

Every single ePRO entry for 112 — and now you notice Subjects 108, 115, and 119 — comes from either Jen’s home Wi-Fi or the site’s single coordinator laptop at 3 a.m.

You also see that drug accountability for four subjects perfectly matches dispensed amounts with zero returns or losses — impossible in a real trial.`,
    character: 'Jen Park',
    characterQuote: '"You weren’t supposed to look that deep."',
    choices: [
      { text: 'Download everything and send to the sponsor anonymously tonight', nextChapter: 'ps3g', consequence: 'Ghost protocol' },
      { text: 'Show Jen the evidence tomorrow and demand she withdraw all phantom subjects', nextChapter: 'ps3a', consequence: 'You give her one chance' },
      { text: 'Call your manager right now — this is criminal', nextChapter: 'ps3h', consequence: 'You light the match' }
    ],
    insights: ['Data fraud leaves perfect fingerprints', 'The cleaner the data, the dirtier the hands'],
    emotionalTheme: 'Cold Discovery',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 400, character: 'Digital Bloodhound' }
  },

  {
    id: 'ps2d',
    chapterNum: 2,
    title: 'Safety Goes Nuclear',
    tagline: 'You thought you were reporting fraud. You just killed the trial.',
    narrative: `Sponsor safety freaks out about unmonitored IPs and fictitious subjects receiving IMP.

They place the entire trial on immediate enrollment hold at 3 p.m. the same day. Stock drops 14%.

Jen is escorted out in tears. The PI closes the research department entirely.`,
    character: 'Jen Park',
    characterQuote: '"I hope you’re proud. Twenty real patients just lost access."',
    choices: [
      { text: 'Stand by your report', nextChapter: 'ps3i', consequence: 'You chose purity' },
      { text: 'Try to walk it back and contain to one site', nextChapter: 'ps3j', consequence: 'Damage control too late' }
    ],
    insights: ['One phantom can murder a molecule'],
    emotionalTheme: 'Unintended Consequences',
    timeToComplete: '1 hour 10 minutes',
    rewards: { xp: 350, character: 'The Accidental Assassin' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'ps3a',
    chapterNum: 3,
    title: 'The Confession',
    tagline: 'She cries for 40 minutes and names two more ghosts',
    narrative: `Jen admits to fabricating five subjects total. She withdraws them voluntarily. The PI is shocked — claims he never knew. FDA issues a Form 483 but the trial survives with cleaned data. Jen is fired but not prosecuted. You are promoted to fraud investigator.`,
    character: 'Jen Park',
    characterQuote: '"Thank you for letting me fix it myself."',
    choices: [],
    insights: ['Sometimes mercy is the only way to get the truth'],
    emotionalTheme: 'Bittersweet Justice',
    timeToComplete: 'finale',
    rewards: { xp: 1550, character: 'The Confessor\'s Confessor' },
    isEnding: true,
    endingName: 'Redemption Lite'
  },

  {
    id: 'ps3e',
    chapterNum: 3,
    title: 'Zero Tolerance',
    tagline: 'She’s gone by lunch. The site is terminated.',
    narrative: `You report everything with timestamps. Jen is terminated for cause, blacklisted industry-wide. The five phantom subjects are excluded. The trial continues. You never see another 100% compliance site again.`,
    character: 'Jen Park',
    characterQuote: '"I have a kid. You just ruined two lives for a bonus I never even got."',
    choices: [],
    insights: ['Punishment rarely fits the desperation'],
    emotionalTheme: 'Cold Justice',
    timeToComplete: 'finale',
    rewards: { xp: 1450, character: 'Fraud Executioner' },
    isEnding: true,
    endingName: 'The Hammer'
  },

  {
    id: 'ps3f',
    chapterNum: 3,
    title: 'The Quiet Arrangement',
    tagline: 'You look away. The ghost lives on.',
    narrative: `You pretend you saw nothing. Subject 112 completes the trial with perfect data. The drug is approved. Jen sends you a Christmas card every year.`,
    character: 'Jen Park',
    characterQuote: '"We’re not so different, you and I."',
    choices: [],
    insights: ['Some phantoms become real if nobody calls them dead'],
    emotionalTheme: 'Moral Rot',
    timeToComplete: 'finale',
    rewards: { xp: 1300, character: 'The Accomplice' },
    isEnding: true,
    endingName: 'The Pact'
  },

  {
    id: 'ps3g',
    chapterNum: 3,
    title: 'Anonymous Torrent',
    tagline: 'Your evidence hits the sponsor inbox at 2:14 a.m.',
    narrative: `Full forensic audit reveals 23 fabricated subjects across three sites. The entire program is terminated. Jen disappears — rumor says she’s bartending in Montana now.`,
    character: 'Jen Park',
    characterQuote: '"Whoever you are… I hope it was worth it."',
    choices: [],
    insights: ['Anonymity is the sharpest blade'],
    emotionalTheme: 'Ghost Revenge',
    timeToComplete: 'finale',
    rewards: { xp: 1700, character: 'The Unseen Scalpel' },
    isEnding: true,
    endingName: 'The Silent Kill'
  },

  {
    id: 'ps3i',
    chapterNum: 3,
    title: 'Trial Killer',
    tagline: 'Your vigilance murdered the drug',
    narrative: `Enrollment hold lasts 9 months. Competitor beats them to market. Company shelves the molecule. Twenty staff laid off. Jen attempts suicide. You still get a certificate for “integrity in research.”`,
    character: 'Jen Park',
    characterQuote: '"Tell my daughter I’m sorry."',
    choices: [],
    insights: ['The right call can still be the wrong one'],
    emotionalTheme: 'Devastation',
    timeToComplete: 'finale',
    rewards: { xp: 1600, character: 'The One Who Killed Hope' },
    isEnding: true,
    endingName: 'Collateral Righteousness'
  }
];