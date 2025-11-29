// src/data/stories/post-marketing-hell.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'pmh1',
    chapterNum: 1,
    title: 'Post-Marketing Hell',
    tagline: 'One death per 40 000 patients is still one too many on Twitter',
    narrative: `LUMARIX (oral SGLT-2i + GLP-1 RA fixed-dose combination) is the company’s biggest product ever: $9.4 bn annual sales, 11 million patients.

Post-marketing reality:
- 274 confirmed cases of Fournier’s gangrene (necrotizing fasciitis of the perineum)
- 68 deaths
- Crude rate: 1 death per ~160 000 patient-years
- Background rate in type-2 diabetes: ~1 per 500 000

Patient advocacy groups have created #Lumarot. Every new death is live-tweeted with autopsy photos. A US Senator just called for immediate withdrawal.

You are Global Safety Lead and the DSUR/PSUR is due in 14 days.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"Rare is not the same as acceptable when the patient has a name."',
    choices: [
      { text: 'Draft the most transparent DSUR ever written — full causality acknowledgement', nextChapter: 'pmh2a', consequence: 'You choose honesty' },
      { text: 'Argue the risk-benefit remains strongly positive and minimise wording', nextChapter: 'pmh2b', consequence: 'You defend the drug' },
      { text: 'Propose immediate REMS with mandatory patient registry and zero co-pay', nextChapter: 'pmh2c', consequence: 'You try to control distribution' },
      { text: 'Secretly prepare a voluntary market withdrawal contingency while appearing calm', nextChapter: 'pmh2d', consequence: 'You plan for the worst' }
    ],
    insights: ['Social media turned “rare” into “unacceptable” overnight', 'A DSUR is no longer read only by regulators'],
    emotionalTheme: 'Siege',
    timeToComplete: '65 minutes',
    rewards: { xp: 320, character: 'Dr. Victor Brandt as battle-hardened safety lead' }
  },

  {
    id: 'pmh2a',
    chapterNum: 2,
    title: 'The Transparent DSUR',
    tagline: 'You wrote the truth. The world read it.',
    narrative: `You classify the risk as “identified”, acknowledge causality, and state the current measures are insufficient.

The document leaks 48 hours before submission. Stock falls 28 % in one day. The CEO screams that you just murdered a $90 bn franchise.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"I didn’t leak it. I just refused to lie in it."',
    choices: [
      { text: 'Stand by the DSUR and recommend immediate controlled-access program', nextChapter: 'pmh3a', consequence: 'You double down' },
      { text: 'Offer your resignation to calm the board', nextChapter: 'pmh3b', consequence: 'You fall on your sword' }
    ],
    insights: ['Transparency is a weapon — sometimes aimed at your own company'],
    emotionalTheme: 'Betrayal',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 420, character: 'Author of the Leaked Truth' }
  },

  {
    id: 'pmh2b',
    chapterNum: 2,
    title: 'The Defensive DSUR',
    tagline: 'You called it “consistent with class” and “background”',
    narrative: `You write that the observed rate is within expected background for diabetic population, emphasise benefit in CV outcomes, and conclude no new measures required.

FDA disagrees in a scathing public letter. Senator holds up your DSUR on live television. Stock still drops 19 %.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"We followed the template. The world stopped using templates."',
    choices: [
      { text: 'Scramble to add REMS before FDA forces it', nextChapter: 'pmh3c', consequence: 'Late conversion' },
      { text: 'Continue to fight — double down on risk-benefit', nextChapter: 'pmh3d', consequence: 'You go down swinging' }
    ],
    insights: ['Minimisation only works when no one is listening'],
    emotionalTheme: 'Denial → Panic',
    timeToComplete: '1 hour 15 minutes',
    rewards: { xp: 380, character: 'Last Defender of the Old Way' }
  },

  {
    id: 'pmh2c',
    chapterNum: 2,
    title: 'The REMS Gambit',
    tagline: 'You propose the tightest REMS in history',
    narrative: `Your plan: mandatory prescriber certification, patient registry, pharmacy lock-out without enrolment, zero co-pay to keep advocacy quiet.

Cost: $1.8 bn/year. Commercial forecasts collapse. Board refuses to approve. They want “softer measures.”`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"If we won’t control it, someone else will."',
    choices: [
      { text: 'Implement unilaterally in the US anyway (defy the board)', nextChapter: 'pmh3e', consequence: 'Corporate mutiny' },
      { text: 'Water it down to a simple MedGuide + black box', nextChapter: 'pmh3f', consequence: 'Compromise' }
    ],
    insights: ['The most ethical REMS is also the most expensive'],
    emotionalTheme: 'Rebellion',
    timeToComplete: '1 hour 35 minutes',
    rewards: { xp: 460, character: 'REMS Rebel' }
  },

  {
    id: 'pmh2d',
    chapterNum: 2,
    title: 'The Silent Withdrawal Plan',
    tagline: 'You prepare the kill folder while smiling in meetings',
    narrative: `You build a complete withdrawal playbook: press release, refund program, patient transition plan — all dated “to be used only if required.”

It leaks. Markets panic-sell. The board fires you for “undermining confidence,” then uses your exact plan six weeks later.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"They needed a scapegoat to use my exit strategy."',
    choices: [
      { text: 'Take the termination and walk away rich', nextChapter: 'pmh3g', consequence: 'Golden parachute' },
      { text: 'Go public with everything before they silence you', nextChapter: 'pmh3h', consequence: 'Whistleblower' }
    ],
    insights: ['Preparing for death is sometimes the only way to stay alive'],
    emotionalTheme: 'Cold Strategy',
    timeToComplete: '1 hour 45 minutes',
    rewards: { xp: 500, character: 'The One Who Wrote the Obituary' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'pmh3a',
    chapterNum: 3,
    title: 'The Controlled-Access Savior',
    tagline: 'You forced the REMS. The drug lived.',
    narrative: `Board caves. LUMARIX survives under the tightest REMS ever seen for an oral drug. Sales drop 60 %, but it stays on market. You become the most famous safety officer in pharma history.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"We traded billions for conscience. Fair price."',
    choices: [],
    insights: ['Sometimes you have to burn the village to save it'],
    emotionalTheme: 'Expensive Victory',
    timeToComplete: 'finale',
    rewards: { xp: 2000, character: 'Father of the LUMARIX REMS' },
    isEnding: true,
    endingName: 'The Leash That Saved It'
  },

  {
    id: 'pmh3b',
    chapterNum: 3,
    title: 'The Sacrificial Lamb',
    tagline: 'You resigned. They withdrew anyway.',
    narrative: `You leave with $28 m severance. Six months later FDA forces full withdrawal. Your successors quote your DSUR verbatim in the withdrawal justification.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"At least I left before they needed a corpse."',
    choices: [],
    insights: ['Some resignations are just early funerals'],
    emotionalTheme: 'Cynical Grace',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'The One Who Got Out Clean' },
    isEnding: true,
    endingName: 'Golden Exit'
  },

  {
    id: 'pmh3d',
    chapterNum: 3,
    title: 'Forced Withdrawal',
    tagline: 'You fought to the end. You lost everything.',
    narrative: `FDA withdraws approval. Company files Chapter 11. 42 000 employees laid off. You are sued personally by shareholders. Patient groups still hate you.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"I defended science. Science lost."',
    choices: [],
    insights: ['There is no fortress strong enough against public grief'],
    emotionalTheme: 'Total Defeat',
    timeToComplete: 'finale',
    rewards: { xp: 1200, character: 'Last Soldier of the Old Guard' },
    isEnding: true,
    endingName: 'The Fall of LUMARIX'
  },

  {
    id: 'pmh3e',
    chapterNum: 3,
    title: 'Corporate Mutiny',
    tagline: 'You implemented REMS without approval',
    narrative: `FDA applauds. Patients thank you. The board fires you for “gross insubordination.” Stock recovers. You are hired as Chief Safety Officer by three competitors the same week.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"They fired me for saving their drug."',
    choices: [],
    insights: ['Disobedience can be the highest form of loyalty'],
    emotionalTheme: 'Heroic Heresy',
    timeToComplete: 'finale',
    rewards: { xp: 2200, character: 'The Mutineer Who Won' },
    isEnding: true,
    endingName: 'The Coup That Worked'
  },

  {
    id: 'pmh3h',
    chapterNum: 3,
    title: 'The Whistleblower',
    tagline: 'You took everything public',
    narrative: `60 Minutes, Senate testimony, book deal. Company collapses. Drug withdrawn worldwide. You are broke, under protection, and the most famous safety physician alive.`,
    character: 'Dr. Victor Brandt',
    characterQuote: '"Some stories are worth more than money."',
    choices: [],
    insights: ['Truth is the only asset that survives bankruptcy'],
    emotionalTheme: 'Moral Absolution',
    timeToComplete: 'finale',
    rewards: { xp: 2300, character: 'The Man Who Killed LUMARIX' },
    isEnding: true,
    endingName: 'The Reckoning'
  }
];