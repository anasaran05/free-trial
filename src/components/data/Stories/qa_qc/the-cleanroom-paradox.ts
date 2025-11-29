// src/data/stories/the-cleanroom-paradox.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'cp1',
    chapterNum: 1,
    title: 'The Cleanroom Paradox',
    tagline: 'Fastest line in the company, cleanest on paper',
    narrative: `Site 42 — Tier-2 oncology fill-finish plant — has produced 1.8 million vials of PARVIX (liposomal doxorubicin generic) in the last quarter with zero OOS and zero media-fill failures in three years.

You arrive unannounced for a for-cause media fill observation requested by Global QA.

Inside the Grade A isolator line you watch the “dream team”:
- Operators double-glove in 11 seconds (SOP says 45)  
- Sanitisation sprays are theatrical but miss half the surfaces  
- One tech rests his forearm on the critical zone for 4 seconds to reach a distant vial — every cycle  
- Settle plates from last week: 2 CFU in Grade B (limit ≤5), 1 CFU in Grade A (limit <1)

Production manager Marco beams: “We’re saving lives at record speed.”`,
    character: 'Marco Delgado',
    characterQuote: '"Patients don’t die from one colony. They die from delays."',
    choices: [
      { text: 'Stop the line immediately for gowning and aseptic technique retraining', nextChapter: 'cp2a', consequence: 'You declare war on Day 1' },
      { text: 'Document every deviation quietly and review camera footage tonight', nextChapter: 'cp2b', consequence: 'You build the case' },
      { text: 'Intervene only on the borderline CFU plates — demand root-cause investigation', nextChapter: 'cp2c', consequence: 'You pick one battle' },
      { text: 'Say nothing yet but request to shadow the next three media fills', nextChapter: 'cp2d', consequence: 'You go deeper undercover' }
    ],
    insights: ['Speed and sterility are natural enemies', 'Perfect records are usually perfectly managed, not perfectly clean'],
    emotionalTheme: 'Tension',
    timeToComplete: '55 minutes',
    rewards: { xp: 300, character: 'Marco Delgado as charismatic production king' }
  },

  {
    id: 'cp2a',
    chapterNum: 2,
    title: 'Line Stop',
    tagline: 'You just halted 45 000 vials for “technique”',
    narrative: `You hit the red button. Entire line down for 6 hours. Retraining mandatory.

Marco explodes in the corridor: “That batch was for pediatric hospitals in three countries!”

Plant director threatens to call the CEO. Overnight, settle plates from the stopped batch grow three different molds.`,
    character: 'Marco Delgado',
    characterQuote: '"Congratulations. You found contamination by creating downtime."',
    choices: [
      { text: 'Reject the entire batch and escalate to corporate', nextChapter: 'cp3a', consequence: 'You burn the bridge' },
      { text: 'Allow filtered continuation after retraining but with 100 % visual inspection', nextChapter: 'cp3b', consequence: 'Compromise under fire' }
    ],
    insights: ['Stopping a line is easy. Surviving the fallout is not'],
    emotionalTheme: 'Hostility',
    timeToComplete: '1 hour 20 minutes',
    rewards: { xp: 400, character: 'The Red Button Hero' }
  },

  {
    id: 'cp2b',
    chapterNum: 2,
    title: 'The Camera Never Lies',
    tagline: 'You watched 72 hours of footage in one night',
    narrative: `Analysis complete:
- 1 847 critical-zone intrusions in the last month  
- 94 % of glove sanitisation steps <10 seconds  
- One operator uses the same outer glove for three entire shifts  
- Settle-plate placement moved 40 cm away from the actual fill needle after every run

You now have a 40-page deviation report with time-stamped screenshots.`,
    character: 'Marco Delgado',
    characterQuote: '"Those cameras are for insurance, not for witch hunts."',
    choices: [
      { text: 'Present findings to plant leadership and demand full line shutdown', nextChapter: 'cp3c', consequence: 'Nuclear option' },
      { text: 'Use the evidence to force a third-party aseptic process simulation audit', nextChapter: 'cp3d', consequence: 'External hammer' },
      { text: 'Trade silence for immediate corrections — no formal report', nextChapter: 'cp3e', consequence: 'Back-room deal' }
    ],
    insights: ['Cameras remember what people forget', 'Evidence without allies is just ammunition for your enemies'],
    emotionalTheme: 'Power',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 480, character: 'Digital Witness' }
  },

  {
    id: 'cp2c',
    chapterNum: 2,
    title: 'The CFU Fight',
    tagline: 'One colony over limit is all it takes',
    narrative: `You quarantine the affected batch and demand 5-Why investigation.

Microbiology identifies the CFU as Cutibacterium acnes — classic skin flora from improper glove sanitisation.

Marco argues: “It’s Grade B, not Grade A. We’ve released with 4 CFU before.”

Batch value: $11 million.`,
    character: 'Marco Delgado',
    characterQuote: '"You’re rejecting eleven million dollars over one pimple bacterium."',
    choices: [
      { text: 'Reject the batch outright', nextChapter: 'cp3f', consequence: 'You draw the line in blood' },
      { text: 'Allow release after filtration + extended hold', nextChapter: 'cp3g', consequence: 'You bend' },
      { text: 'Escalate to global head of sterile manufacturing', nextChapter: 'cp3h', consequence: 'You go over everyone’s head' }
    ],
    insights: ['One CFU today is tomorrow’s sepsis case', 'Financial value and patient risk never sit at the same table'],
    emotionalTheme: 'Moral Stand',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 450, character: 'One Colony, One Principle' }
  },

  {
    id: 'cp2d',
    chapterNum: 2,
    title: 'Three Media Fills',
    tagline: 'You watched them fail in slow motion',
    narrative: `You observe three consecutive media fills.

Results:
- Run 1: 0 contaminated units  
- Run 2: 3 contaminated units (all from the same operator’s side)  
- Run 3: 28 contaminated units — catastrophic failure

The third run used the exact “record-speed” techniques the team is proud of.`,
    character: 'Marco Delgado',
    characterQuote: '"Media fills aren’t real production. Real vials don’t have bacteria."',
    choices: [
      { text: 'Fail all ongoing batches and shut the line until full revalidation', nextChapter: 'cp3i', consequence: 'You end the paradox' },
      { text: 'Accept the failure as “worst-case” and continue with increased monitoring', nextChapter: 'cp3j', consequence: 'You rationalize' }
    ],
    insights: ['Media fills don’t lie — people do', 'Worst-case simulation is only worst if you let it be'],
    emotionalTheme: 'Revelation',
    timeToComplete: '1 hour 50 minutes',
    rewards: { xp: 520, character: 'Media Fill Oracle' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'cp3a',
    chapterNum: 3,
    title: 'The Batch That Killed Careers',
    tagline: '45 000 vials destroyed, three executives gone',
    narrative: `Corporate orders full rejection. Site 42 loses oncology franchise. Marco is transferred to tablet packaging in a different continent. You are promoted to Global Head of Sterile QA.`,
    character: 'Marco Delgado',
    characterQuote: '"Speed was our religion. You just excommunicated us."',
    choices: [],
    insights: ['Some batches are worth more destroyed than released'],
    emotionalTheme: 'Pyrrhic Triumph',
    timeToComplete: 'finale',
    rewards: { xp: 2100, character: 'Destroyer of False Perfection' },
    isEnding: true,
    endingName: 'The Purge'
  },

  {
    id: 'cp3c',
    chapterNum: 3,
    title: 'Total Shutdown',
    tagline: 'The line stayed dark for nine months',
    narrative: `Your report triggers full corporate investigation. Site 42 is decertified for sterile production. 1 200 jobs lost. PARVIX shortage kills patients in low-income countries. You never work another sterile plant again.`,
    character: 'Marco Delgado',
    characterQuote: '"You saved vials. You killed people."',
    choices: [],
    insights: ['Sterility assurance can create its own body count'],
    emotionalTheme: 'Haunted Integrity',
    timeToComplete: 'finale',
    rewards: { xp: 1900, character: 'The One Who Closed Site 42' },
    isEnding: true,
    endingName: 'The Darkness'
  },

  {
    id: 'cp3d',
    chapterNum: 3,
    title: 'Third-Party Reckoning',
    tagline: 'External auditors confirmed everything',
    narrative: `Independent APS fails spectacularly. FDA issues Warning Letter. Company invests $180 m in new isolator line with robots. Site 42 becomes the gold standard — two years later.`,
    character: 'Marco Delgado',
    characterQuote: '"You cost us two years and two hundred million. Thank you."',
    choices: [],
    insights: ['Sometimes you have to break the temple to rebuild it right'],
    emotionalTheme: 'Expensive Redemption',
    timeToComplete: 'finale',
    rewards: { xp: 2250, character: 'Architect of the New Cleanroom' },
    isEnding: true,
    endingName: 'The Rebirth'
  },

  {
    id: 'cp3i',
    chapterNum: 3,
    title: 'The Paradox Resolved',
    tagline: 'Speed died so patients could live',
    narrative: `Line shut for revalidation with human-factor engineers and new glove regimes. Throughput drops 40 %, contamination drops to zero. Site 42 wins ISPE Facility of the Year 2030.`,
    character: 'Marco Delgado',
    characterQuote: '"We learned slow is the new fast."',
    choices: [],
    insights: ['True aseptic processing has no paradox — only priorities'],
    emotionalTheme: 'Hard-Won Wisdom',
    timeToComplete: 'finale',
    rewards: { xp: 2300, character: 'Solver of the Paradox' },
    isEnding: true,
    endingName: 'The New Standard'
  }
];