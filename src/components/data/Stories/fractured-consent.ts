// src/data/stories/fractured-consent.ts
import type { StoryChapter } from '@/types/story';

export const storyChapters: StoryChapter[] = [
  {
    id: 'fc1',
    chapterNum: 1,
    title: 'The Perfect Site',
    tagline: 'Site 017 enrolls faster than anyone else',
    narrative: `You’re the newest CRC at NeuroNext Research, a for-profit site running the Phase III LUMEN trial: an anti-amyloid infusion that might actually slow Alzheimer’s.

Site 017 in rural Georgia is crushing every other site: 42 patients randomized in four months while most sites struggle to hit 8. Corporate calls it “a model of efficiency.”

On your first monitoring visit you notice something odd: half the consent forms are signed with the exact same shaky “X” and the exact same witness initials—“M.R.”—even though the patients came on different days.`,
    character: 'Marisol Reyes',
    characterQuote: '"Enrollment quotas don’t care if someone understands the risk."',
    choices: [
      { text: 'Pull the suspicious consent forms and review them quietly', nextChapter: 'fc2a', consequence: 'You start digging alone' },
      { text: 'Ask the site’s lead coordinator about the pattern', nextChapter: 'fc2b', consequence: 'You risk tipping your hand' },
      { text: 'Flag it immediately to the sponsor’s medical monitor', nextChapter: 'fc2c', consequence: 'You follow the book—and make enemies fast' }
    ],
    insights: ['Speed and quality rarely travel together', 'The perfect site is usually hiding something'],
    emotionalTheme: 'Suspicion',
    timeToComplete: '50 minutes',
    rewards: { xp: 200, character: 'Marisol Reyes as mentor' }
  },

  {
    id: 'fc2a',
    chapterNum: 2,
    title: 'The X Pattern',
    tagline: 'Same mark, different hands',
    narrative: `You stay late and scan every consent form into your laptop. Thirty-one patients have nearly identical “X” marks. Some are dated weeks apart.

You cross-check with the infusion logs. Several patients marked as “consented and dosed” have no recorded cognitive screening scores above 12 on the MMSE—far below the protocol’s inclusion threshold of 18.

Someone has been forging capacity to consent.`,
    character: 'Marisol Reyes',
    characterQuote: '"An X is only informed if the mind behind it understands the line."',
    choices: [
      { text: 'Confront the site director with the evidence', nextChapter: 'fc3a', consequence: 'You force a direct showdown' },
      { text: 'Interview family members of the questionable subjects', nextChapter: 'fc3b', consequence: 'You go off-script and off-site' },
      { text: 'Send everything anonymously to the IRB', nextChapter: 'fc3c', consequence: 'You protect yourself first' }
    ],
    insights: ['Fraud hides in plain sight', 'Capacity is the easiest thing to fake on paper'],
    emotionalTheme: 'Horror',
    timeToComplete: '1 hour 15 minutes',
    rewards: { xp: 320, character: 'Evidence Collector' }
  },

  {
    id: 'fc2b',
    chapterNum: 2,
    title: 'The Coordinator’s Smile',
    tagline: 'Some lies are delivered with sweet tea',
    narrative: `You casually ask the lead coordinator, Mandy, about the identical marks over coffee.

She laughs. “Honey, half these folks can’t hold a pen anymore. I just guide their hand a little. They all want to be in the trial anyway—the families beg us.”

She adds, quieter: “Corporate pays us $18,000 per randomization. You gonna be the one to tell a desperate daughter her mama can’t try the only hope left?”`,
    character: 'Marisol Reyes',
    characterQuote: '"Desperation is the best enrollment tool we never have to declare."',
    choices: [
      { text: 'Pretend to agree and gather more evidence', nextChapter: 'fc3a', consequence: 'You play along—for now' },
      { text: 'Shut the site down on the spot', nextChapter: 'fc3d', consequence: 'You burn the bridge immediately' }
    ],
    insights: ['Good people can rationalize anything for money', 'Empathy can be weaponized'],
    emotionalTheme: 'Moral Injury',
    timeToComplete: '1 hour',
    rewards: { xp: 280, character: 'Undercover Observer' }
  },

  {
    id: 'fc2c',
    chapterNum: 2,
    title: 'The Sponsor’s Response',
    tagline: 'They protect the data, not the patients',
    narrative: `The medical monitor thanks you for your diligence, then schedules an “urgent site audit” for six weeks out.

Two days later the site receives a surprise shipment of branded fleece jackets and a bonus check. Enrollment at Site 017 jumps another 15%.

Your manager pulls you aside: “Next time run concerns through me first. We don’t want to jeopardize a top performer over paperwork quirks.”`,
    character: 'Marisol Reyes',
    characterQuote: '"In this industry, the word “monitor” is a job title, not a verb."',
    choices: [
      { text: 'Escalate to the FDA directly', nextChapter: 'fc3e', consequence: 'You go nuclear' },
      { text: 'Comply outwardly while building a parallel case', nextChapter: 'fc3a', consequence: 'You learn to play their game' }
    ],
    insights: ['Sponsors police sites the way cats police mice', 'Delay is a strategy'],
    emotionalTheme: 'Betrayal',
    timeToComplete: '1 hour',
    rewards: { xp: 300, character: 'Disillusioned Insider' }
  },

  {
    id: 'fc3a',
    chapterNum: 3,
    title: 'The Daughter',
    tagline: 'She just wanted her father to have a chance',
    narrative: `You drive unannounced to the home of Subject 017-028. His daughter, a tired nurse, invites you in.

She cries when you show her the consent form with the forged X. “They told me Dad understood everything. He hasn’t recognized me in two years.”

She has video on her phone: the coordinator guiding his hand while he stares blankly at the wall.

She begs you to stop the trial. Then she begs you to keep her father in it—he’s “calmer” since the infusions started.`,
    character: 'Marisol Reyes',
    characterQuote: '"Hope and harm can wear the same face."',
    choices: [
      { text: 'Promise to get him removed and report everything', nextChapter: 'fc4a', consequence: 'You choose ethics over ambiguity' },
      { text: 'Leave him enrolled but expose the site anyway', nextChapter: 'fc4b', consequence: 'You split the baby' },
      { text: 'Walk away and let the trial finish', nextChapter: 'fc4c', consequence: 'You choose survival' }
    ],
    insights: ['Families will trade dignity for any glimmer', 'The right choice can still destroy someone'],
    emotionalTheme: 'Ambivalence',
    timeToComplete: '1 hour 40 minutes',
    rewards: { xp: 550, character: 'Keeper of Impossible Choices' }
  },

  {
    id: 'fc4a',
    chapterNum: 4,
    title: 'The Shutdown',
    tagline: 'One site can poison an entire trial',
    narrative: `You submit the video, the forged forms, and a 40-page report to the FDA and the sponsor simultaneously.

Site 017 is closed within 48 hours. Forty-two patients are unblinded and withdrawn. The entire LUMEN trial is placed on clinical hold pending full data review.

The families scream at you in the parking lot. The coordinator posts your address online. You are reassigned to data entry in a windowless room.

Six months later the trial resumes—without Site 017’s data. It eventually fails to meet endpoint anyway.`,
    character: 'Marisol Reyes',
    characterQuote: '"You can save patients and still lose everything."',
    choices: [],
    insights: ['Doing the right thing rarely feels clean'],
    emotionalTheme: 'Costly Integrity',
    timeToComplete: 'finale',
    rewards: { xp: 1400, character: 'The One Who Closed the Site' },
    isEnding: true,
    endingName: 'Integrity, Expensive'
  },

  {
    id: 'fc4b',
    chapterNum: 4,
    title: 'The Quiet Compromise',
    tagline: 'Some stains you just learn to live with',
    narrative: `You expose the fraud but argue the patients with clear benefit should stay. The sponsor quietly “corrects” the consent records and keeps 19 subjects.

The drug reaches the market with a black-box warning no one reads. You get promoted to Senior Monitor.

At night you still see the daughter’s face—relieved her father can keep the infusion, ashamed she let you see the video.`,
    character: 'Marisol Reyes',
    characterQuote: '"We don’t save people. We manage percentages."',
    choices: [],
    insights: ['Pragmatism and guilt share the same pillow'],
    emotionalTheme: 'Gray Victory',
    timeToComplete: 'finale',
    rewards: { xp: 1300, character: 'Pragmatic Guardian' },
    isEnding: true,
    endingName: 'The Compromise'
  },

  {
    id: 'fc4c',
    chapterNum: 4,
    title: 'The Long Silence',
    tagline: 'You looked away. The drug launched.',
    narrative: `You delete the evidence and transfer to oncology trials.

LUMEN gets approved in 2027 as the first disease-modifying Alzheimer’s therapy. At the launch party the CEO thanks “dedicated site staff who believed in our mission.”

You smile for the photo. You still have the daughter’s number in your phone. You never call.`,
    character: 'Marisol Reyes',
    characterQuote: '"Some careers are built on the things we decide not to see."',
    choices: [],
    insights: ['Silence is the loudest signature'],
    emotionalTheme: 'Moral Erosion',
    timeToComplete: 'finale',
    rewards: { xp: 1100, character: 'The Quiet Enabler' },
    isEnding: true,
    endingName: 'The Long Silence'
  }
];