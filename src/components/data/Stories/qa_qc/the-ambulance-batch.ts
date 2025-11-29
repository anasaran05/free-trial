// src/data/stories/the-ambulance-batch.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'ab1',
    chapterNum: 1,
    title: 'The Ambulance Batch',
    tagline: 'Hospitals are rationing vials while we hold 680 000 of them',
    narrative: `MEROVEX-9 (novel anti-pseudomonal cephalosporin) is the only thing working against the XDR Acinetobacter outbreak sweeping US ICUs.

Batch 241108 — 680 000 vials — is in the final hold stage.

At 03:14 a.m. yesterday the sterilization tunnel temperature dropped to 318 °C for 9 minutes (validated range 320–340 °C).  
The deviation was caught, temperature restored, and the batch finished.

Endotoxin and sterility pass. Bioburden <1 CFU.  
But the deviation is major by every SOP.

You are the Qualified Person / Batch Disposition Lead.  
CDC has just escalated the outbreak to national emergency level. Pharmacists are on TV begging for supply.`,
    character: 'Elena Moreau',
    characterQuote: '"Patients are dying today. The batch is perfect tomorrow."',
    choices: [
      { text: 'Reject the batch outright — re-manufacture from scratch', nextChapter: 'ab2a', consequence: 'You choose absolute compliance' },
      { text: 'Approve controlled rework (re-filtration + re-sterilization) with full justification', nextChapter: 'ab2b', consequence: 'You walk the scientific tightrope' },
      { text: 'Document the excursion as “transient sensor noise” and release as-is', nextChapter: 'ab2c', consequence: 'You meet demand today' },
      { text: 'Escalate to executive committee with all three options on the table', nextChapter: 'ab2d', consequence: 'You force the company to own the decision' }
    ],
    insights: ['Patient need and product integrity never arrive at the same time', 'The most dangerous batch is the one everyone is waiting for'],
    emotionalTheme: 'Moral Agony',
    timeToComplete: '70 minutes',
    rewards: { xp: 350, character: 'Elena Moreau as crisis QP' }
  },

  {
    id: 'ab2a',
    chapterNum: 2,
    title: 'The Pure Rejection',
    tagline: '680 000 vials destroyed in front of news cameras',
    narrative: `You sign the rejection form. The entire batch is autoclaved for waste.

Shortage worsens. Three major hospitals report 28 attributable deaths in the next 10 days.

FDA issues a public statement praising your “commitment to quality.”  
Your CEO does not.`,
    character: 'Elena Moreau',
    characterQuote: '"We followed the rules. The rules just killed people."',
    choices: [
      { text: 'Stand by the decision publicly', nextChapter: 'ab3a', consequence: 'Martyr of purity' },
      { text: 'Offer resignation to take the blame off the company', nextChapter: 'ab3b', consequence: 'You fall on the sword' }
    ],
    insights: ['Perfect compliance can have a body count', 'Some decisions age badly in days, not years'],
    emotionalTheme: 'Guilt',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 420, character: 'The One Who Said No' }
  },

  {
    id: 'ab2b',
    chapterNum: 2,
    title: 'The Rework Protocol',
    tagline: 'You wrote a 42-page justification in 18 hours',
    narrative: `You author a science-based rework: re-filtration through 0.2 µm, second terminal sterilization cycle at 121 °C/30 min, extended hold testing.

Risk assessment concludes residual risk <1 in 10 million.

FDA pre-approves verbally “in the interest of public health.”

Batch ships 72 hours later. Hospitals receive it with tears and applause.`,
    character: 'Elena Moreau',
    characterQuote: '"We bent the rule without breaking the patient."',
    choices: [
      { text: 'Lock the rework precedent into a new global policy', nextChapter: 'ab3c', consequence: 'You change the industry' },
      { text: 'Declare this a one-time exception never to be repeated', nextChapter: 'ab3d', consequence: 'You keep the door closed' }
    ],
    insights: ['Science can sometimes justify what SOPs forbid', 'Emergency decisions become tomorrow’s standards'],
    emotionalTheme: 'Relief → Anxiety',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 520, character: 'Author of the Emergency Rework' }
  },

  {
    id: 'ab2c',
    chapterNum: 2,
    title: 'The Sensor Noise Fiction',
    tagline: 'You rewrote reality in the batch record',
    narrative: `You and the production director reclassify the event as “transient thermocouple fluctuation — no impact.”

Batch released 12 hours later. Front-page headlines: “Company saves thousands.”

Six months later an FDA for-cause inspection finds the original trend files you thought were deleted.`,
    character: 'Elena Moreau',
    characterQuote: '"We saved them yesterday. We’ll hang tomorrow."',
    choices: [
      { text: 'Accept personal responsibility and resign', nextChapter: 'ab3e', consequence: 'You take the fall' },
      { text: 'Fight the 483 with new “evidence”', nextChapter: 'ab3f', consequence: 'Double down into the abyss' }
    ],
    insights: ['The cover-up is always uglier than the crime', 'Short-term heroes become long-term felons'],
    emotionalTheme: 'Dread',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 480, character: 'Co-Author of the Lie' }
  },

  {
    id: 'ab2d',
    chapterNum: 2,
    title: 'The Executive Vote',
    tagline: 'You made them vote on record',
    narrative: `Emergency ExCo meeting at 2 a.m.

Options presented with lives-per-day impact estimates.

Vote: 5–4 in favor of controlled rework.

Minutes are signed by every attendee. Batch ships under the new protocol 60 hours later.`,
    character: 'Elena Moreau',
    characterQuote: '"At least no one can say it was just the QP this time."',
    choices: [
      { text: 'Keep the signed minutes as permanent shield', nextChapter: 'ab3c', consequence: 'Collective responsibility' },
      { text: 'Destroy the detailed minutes after success', nextChapter: 'ab3g', consequence: 'Collective amnesia' }
    ],
    insights: ['Shared decisions are safer decisions', 'Paper trails can be armor or nooses'],
    emotionalTheme: 'Shared Burden',
    timeToComplete: '1 hour 35 minutes',
    rewards: { xp: 500, character: 'The One Who Forced the Vote' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'ab3a',
    chapterNum: 3,
    title: 'The Purest Conscience',
    tagline: 'You never compromised. They never forgave.',
    narrative: `FDA gives you a personal civility award. Congress subpoenas you to explain the deaths. You leave the industry and teach QA ethics at a university no one has heard of.`,
    character: 'Elena Moreau',
    characterQuote: '"I sleep at night. Some nights that’s all I do."',
    choices: [],
    insights: ['Integrity is cold comfort when children die waiting'],
    emotionalTheme: 'Haunted Purity',
    timeToComplete: 'finale',
    rewards: { xp: 1900, character: 'Martyr of the Perfect Batch' },
    isEnding: true,
    endingName: 'The 28 Graves'
  },

  {
    id: 'ab3c',
    chapterNum: 3,
    title: 'The New Emergency Standard',
    tagline: 'Your rework protocol is now in Annex 17',
    narrative: `The controlled-rework pathway is adopted EU-wide for critical shortage medicines. MEROVEX-9 saves tens of thousands with zero related infections. You become the most cited QP in regulatory history.`,
    character: 'Elena Moreau',
    characterQuote: '"We proved rules can bend without breaking patients."',
    choices: [],
    insights: ['The hardest decisions sometimes improve the system for everyone'],
    emotionalTheme: 'Redemptive Legacy',
    timeToComplete: 'finale',
    rewards: { xp: 2400, character: 'Architect of Compassionate QA' },
    isEnding: true,
    endingName: 'The Precedent'
  },

  {
    id: 'ab3e',
    chapterNum: 3,
    title: 'The Fall Guy',
    tagline: 'You resigned. They survived.',
    narrative: `You take full blame. Company receives consent decree but keeps market share. You are banned from QA roles for life. Patients never learn your name.`,
    character: 'Elena Moreau',
    characterQuote: '"Someone had to pay. Better me than them."',
    choices: [],
    insights: ['Some shields are made of people'],
    emotionalTheme: 'Noble Sacrifice',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'The Scapegoat Who Saved the Company' },
    isEnding: true,
    endingName: 'The Lone Culprit'
  },

  {
    id: 'ab3f',
    chapterNum: 3,
    title: 'Corporate Suicide',
    tagline: 'You fought the FDA and the FDA won',
    narrative: `Company doubles down, falsifies more records to “prove” sensor noise. Criminal investigation. Stock delisted. 42 000 employees lose jobs. You go to federal prison.`,
    character: 'Elena Moreau',
    characterQuote: '"We saved lives for six months. We’ll pay for the rest of ours."',
    choices: [],
    insights: ['Never fight a war you started with a lie'],
    emotionalTheme: 'Catastrophe',
    timeToComplete: 'finale',
    rewards: { xp: 1200, character: 'Co-Author of the Collapse' },
    isEnding: true,
    endingName: 'The Prison Sentence'
  },

  {
    id: 'ab3g',
    chapterNum: 3,
    title: 'Collective Amnesia',
    tagline: 'It never officially happened',
    narrative: `Minutes destroyed. Batch ships flawlessly. Outbreak contained. Everyone gets bonuses. Five years later a whistleblower leaks the original vote. Careers end anyway — just slower.`,
    character: 'Elena Moreau',
    characterQuote: '"We bought five years of peace with one act of forgetting."',
    choices: [],
    insights: ['Memory is the only thing shorter than gratitude'],
    emotionalTheme: 'Delayed Reckoning',
    timeToComplete: 'finale',
    rewards: { xp: 2000, character: 'Keeper of the Erased Minutes' },
    isEnding: true,
    endingName: 'The Five-Year Lie'
  }
];