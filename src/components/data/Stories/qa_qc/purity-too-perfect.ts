// src/data/stories/purity-too-perfect.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'ptp1',
    chapterNum: 1,
    title: 'Purity Too Perfect',
    tagline: '99.94 % assay, 0.02 % total impurities — never seen before',
    narrative: `New API supplier (Shandong NovaChem) has submitted qualification batches for VELARIX mesylate — your company’s $4 bn/year oncology kinase inhibitor.

Their CoA claims:
• Assay: 99.94 % (your historical best: 99.67 %)
• Largest single impurity: 0.009 % (your spec ≤0.15 %)
• Total impurities: 0.02 % (your historical average 0.18–0.24 %)
• Price: 38 % lower than current vendor

Procurement is ecstatic. Launch stock for the next three years is already purchased and sitting in bonded warehouse.

You open the PDF chromatograms they sent. Every peak is a perfect Gaussian. Every baseline is ruler-flat. Something feels wrong.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"Nature is noisy. Perfect data is man-made."',
    choices: [
      { text: 'Demand full electronic raw data + audit trail files immediately', nextChapter: 'ptp2a', consequence: 'You go straight for the jugular' },
      { text: 'Take retention samples and re-analyse in-house using your validated method', nextChapter: 'ptp2b', consequence: 'You trust only your own instruments' },
      { text: 'Fly to Shandong tomorrow with the audit team', nextChapter: 'ptp2c', consequence: 'You want to see their lab live' },
      { text: 'Approve conditionally — accept the material but with 100 % QC testing on arrival', nextChapter: 'ptp2d', consequence: 'You try the middle road' }
    ],
    insights: ['Chromatographic perfection is the new red flag', 'Too good to be true usually isn’t true'],
    emotionalTheme: 'Suspicion',
    timeToComplete: '60 minutes',
    rewards: { xp: 320, character: 'Dr. Chen Wei as analytical detective' }
  },

  {
    id: 'ptp2a',
    chapterNum: 2,
    title: 'The Vanished Raw Data',
    tagline: 'They sent you a 3.2 GB folder full of nothing',
    narrative: `NovaChem sends a password-protected ZIP.

Inside: 400 processed PDFs and exactly zero .raw or .cdf files. Audit trail logs are blank except for one line: “Data processed by Administrator — 2025-11-14”.

Your informatics team confirms: every baseline was manually forced to zero, every tiny impurity peak manually deleted or reintegrated as noise.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"They didn’t clean the drug. They cleaned the data."',
    choices: [
      { text: 'Reject the supplier outright and trigger global supply crisis', nextChapter: 'ptp3a', consequence: 'Nuclear rejection' },
      { text: 'Give them 72 hours to provide legitimate raw data or face disqualification', nextChapter: 'ptp3b', consequence: 'One last chance' },
      { text: 'Escalate to CEO with evidence of fraud', nextChapter: 'ptp3c', consequence: 'You burn the bridge publicly' }
    ],
    insights: ['Missing raw data is the loudest confession', 'A deleted peak is still a peak'],
    emotionalTheme: 'Outrage',
    timeToComplete: '1 hour 25 minutes',
    rewards: { xp: 460, character: 'Unmasker of Digital Lies' }
  },

  {
    id: 'ptp2b',
    chapterNum: 2,
    title: 'Your Own Chromatograms',
    tagline: 'Same sample, honest method',
    narrative: `You re-run NovaChem’s retention samples on your qualified HPLC.

Results:
• Assay: 99.31 % (still good, but not magic)
• Unknown impurity at RRT 1.37: 0.41 % (above specification 0.15 %)
• Genotoxic alert structure confirmed by LC-MS — same alert your previous vendor spent $40 m removing in 2022

The “perfect” purity was achieved by running the column at 65 °C and 2.5 mL/min — conditions that co-elute the impurity with the main peak.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"They didn’t remove the impurity. They hid it in plain sight."',
    choices: [
      { text: 'Reject all received material and demand full recall from warehouse', nextChapter: 'ptp3d', consequence: 'Launch delayed 9–12 months' },
      { text: 'Force NovaChem to re-process all batches using validated method', nextChapter: 'ptp3e', consequence: 'Expensive salvage' },
      { text: 'Quietly switch back to old vendor and pretend this never happened', nextChapter: 'ptp3f', consequence: 'Cover-up' }
    ],
    insights: ['Method manipulation is the cleanest fraud', 'A hidden impurity is more dangerous than a visible one'],
    emotionalTheme: 'Vindicated Fury',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 500, character: 'Chromatographic Truth-Teller' }
  },

  {
    id: 'ptp2c',
    chapterNum: 2,
    title: 'The Shandong Audit',
    tagline: 'You watched them fake it in real time',
    narrative: `Unannounced audit. You walk into the QC lab at 2 a.m. local time.

An analyst is manually dragging integration lines on a running sequence while the instrument is still acquiring data. The supervisor tries to close the laptop when he sees you.

You photograph the screen: the impurity at RRT 1.37 is being erased live.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"Welcome to the world’s most expensive Photoshop subscription."',
    choices: [
      { text: 'Seize the hard drives and call local authorities', nextChapter: 'ptp3g', consequence: 'International incident' },
      { text: 'Leave quietly and disqualify them forever', nextChapter: 'ptp3h', consequence: 'Silent execution' }
    ],
    insights: ['Some fraud only survives in darkness', 'A live demo of cheating is the best evidence you’ll ever get'],
    emotionalTheme: 'Disgust',
    timeToComplete: '1 hour 50 minutes',
    rewards: { xp: 520, character: 'Witness to Live Fraud' }
  },

  {
    id: 'ptp2d',
    chapterNum: 2,
    title: 'Conditional Acceptance',
    tagline: 'You approved — with a noose built in',
    narrative: `You accept the material but implement:
• 100 % testing on arrival
• Mandatory orthogonal method (UPLC-MS) for the hidden impurity
• 6-month stability pull-by-pull

Cost increase eats 80 % of the projected savings. Procurement hates you.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"We turned a bargain into the most expensive API in history."',
    choices: [
      { text: 'Keep the controls forever', nextChapter: 'ptp3i', consequence: 'Permanent distrust' },
      { text: 'Phase them out after one year of clean data', nextChapter: 'ptp3j', consequence: 'Calculated risk' }
    ],
    insights: ['Trust is expensive. Distrust is more expensive'],
    emotionalTheme: 'Pragmatic Paranoia',
    timeToComplete: '1 hour 30 minutes',
    rewards: { xp: 440, character: 'Architect of the Golden Cage' }
  },

  // ==================== ENDINGS ====================

  {
    id: 'ptp3a',
    chapterNum: 3,
    title: 'The $1.2 Billion Rejection',
    tagline: 'You stopped the launch to save it',
    narrative: `All NovaChem material rejected. Launch delayed 11 months. Company switches back to original vendor at premium price. You are promoted to VP Quality — and never invited to procurement meetings again.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"We paid a billion dollars for the privilege of sleeping at night."',
    choices: [],
    insights: ['The most expensive decision is sometimes the cheapest'],
    emotionalTheme: 'Costly Integrity',
    timeToComplete: 'finale',
    rewards: { xp: 2200, character: 'The Billion-Dollar Conscience' },
    isEnding: true,
    endingName: 'The Expensive Truth'
  },

  {
    id: 'ptp3d',
    chapterNum: 3,
    title: 'Recall From Bonded Warehouse',
    tagline: 'You destroyed three years of stock',
    narrative: `400 tons of API destroyed under customs supervision. Launch delayed 14 months. NovaChem disappears overnight. You become legend in QC circles worldwide.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"Purity isn’t negotiable. Neither is launch date — apparently."',
    choices: [],
    insights: ['Some fires must be started to prevent explosions'],
    emotionalTheme: 'Pyrrhic Victory',
    timeToComplete: 'finale',
    rewards: { xp: 2300, character: 'Destroyer of Perfect Lies' },
    isEnding: true,
    endingName: 'The Bonfire'
  },

  {
    id: 'ptp3g',
    chapterNum: 3,
    title: 'The Raid',
    tagline: 'Chinese police, FDA, and your logo on the evening news',
    narrative: `Local authorities seize the lab. Investigation reveals systematic data manipulation for 17 molecules across 8 customers. VELARIX launch proceeds with original vendor. You receive a secret commendation from FDA.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"We didn’t just save our drug. We saved seventeen."',
    choices: [],
    insights: ['One honest auditor can collapse an empire of fraud'],
    emotionalTheme: 'Global Justice',
    timeToComplete: 'finale',
    rewards: { xp: 2500, character: 'The One Who Broke the Cartel' },
    isEnding: true,
    endingName: 'The International Incident'
  },

  {
    id: 'ptp3i',
    chapterNum: 3,
    title: 'The Most Expensive API Forever',
    tagline: 'Savings became legend — then myth',
    narrative: `Controls never relaxed. NovaChem material costs 25 % more than original vendor after testing. Procurement still blames you in every budget meeting.`,
    character: 'Dr. Chen Wei',
    characterQuote: '"We turned a bargain into a cautionary tale."',
    choices: [],
    insights: ['Some lessons are taught in currency'],
    emotionalTheme: 'Ironic Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1800, character: 'Keeper of the Golden Cage' },
    isEnding: true,
    endingName: 'The Eternal Premium'
  }
];