import type { StoryChapter } from '@/types/story';

export type { StoryChapter }; // ← this fixes the error
export interface Story {
  id: string
  title: string
  description: string
  chapters: StoryChapter[]
  coverImage?: string
  
}



export const storyChapters: StoryChapter[] = [

  {
    id: 'ch1',
    chapterNum: 1,
    title: 'The First Case',
    tagline: 'Every expert was once a novice',
    narrative: `You sit at your desk on Day 1, staring at your first ICSR report—a 65-year-old woman who developed a rash after taking a new antibiotic. Your supervisor asks: "What do you see here?" The pressure is real. You realize this isn't just a form to fill. This is someone's health. This is responsibility.

Your job now: Learn to see what others miss. Learn to ask the right questions. Learn to care about the patient behind the data.`,
    character: 'Dr. Maya Patel',
    characterQuote: '"Don\'t just read cases. Ask yourself: What happened? Why did it happen? How do we prevent it?"',
    choices: [
      { text: 'Dive deep into the medical literature on this side effect', nextChapter: 'ch2a', consequence: 'Your thoroughness impresses Dr. Patel.' },
      { text: 'Talk to the patient directly to understand their experience', nextChapter: 'ch2b', consequence: 'Your empathy becomes your strength.' },
      { text: 'Focus on completing the report correctly and on time', nextChapter: 'ch2c', consequence: 'You learn process, but miss the deeper meaning.' }
    ],
    insights: ['Cases are human stories, not just data points', 'Every adverse event is someone\'s turning point', 'Your role carries weight—own it'],
    emotionalTheme: 'Awakening',
    timeToComplete: '1 hour',
    rewards: { xp: 200, character: 'Dr. Maya Patel as mentor' }
  },
  {
    id: 'ch2a',
    chapterNum: 2,
    title: 'The Pattern Emerges',
    tagline: 'When one case becomes a signal',
    narrative: `Weeks pass. You've been documenting cases, and something clicks. Three patients. Same drug. Different doses. But the rash appears consistently on Day 5-7. Is this a coincidence? Or a signal hiding in plain sight?

Dr. Patel notices your case summary. She leans back and smiles. "You see it, don't you? That pattern?" Your heart races. You're not imagining things. This might be real.`,
    character: 'Dr. Maya Patel',
    characterQuote: '"Signal detection is 10% data, 90% intuition shaped by experience. What does your gut tell you?"',
    choices: [
      { text: 'Report the signal immediately—better safe than sorry', nextChapter: 'ch3a', consequence: 'Confidence. You learn to trust your instincts.' },
      { text: 'Collect more data before raising the alarm', nextChapter: 'ch3b', consequence: 'Patience. Data-driven decisions.' },
      { text: 'Ask colleagues if they’ve noticed anything similar', nextChapter: 'ch3c', consequence: 'Collaboration. Collective wisdom.' }
    ],
    insights: ['Intuition + data = wisdom', 'Trust the signals your brain recognizes'],
    emotionalTheme: 'Doubt & Discovery',
    timeToComplete: '1.5 hours',
    rewards: { xp: 300, character: 'Analytical Mind' }
  },
  {
    id: 'ch2b',
    chapterNum: 2,
    title: 'The Human Connection',
    tagline: 'Behind every report is a person',
    narrative: `You call the patient. She tells you about the fear, the itching that kept her up for nights, how she felt dismissed by doctors. "No one asked how I was," she says.

You realize: pharmacovigilance isn't just science. It's empathy in action. Dr. Patel nods when you share the story. "You just did something most never do. You listened."`,
    character: 'Dr. Maya Patel',
    characterQuote: '"Never forget: the patient is the reason we exist."',
    choices: [
      { text: 'Use this insight to push for better patient reporting systems', nextChapter: 'ch3c', consequence: 'You become a voice for patients.' },
      { text: 'Incorporate patient stories into every signal report', nextChapter: 'ch4a', consequence: 'Your reports now carry weight and heart.' }
    ],
    insights: ['Empathy drives better science', 'Patients are experts in their own experience'],
    emotionalTheme: 'Compassion',
    timeToComplete: '1 hour',
    rewards: { xp: 350, character: 'Patient Advocate' }
  },
  {
    id: 'ch2c',
    chapterNum: 2,
    title: 'Master of Process',
    tagline: 'Excellence in execution',
    narrative: `You master the forms, the timelines, the databases. Your reports are perfect. On time. Flawless. Your supervisor is impressed. But something feels missing. You’re efficient... but are you effective?

Dr. Patel asks: "Are you here to fill forms, or to protect patients?"`,
    character: 'Dr. Maya Patel',
    characterQuote: '"Process without purpose is just bureaucracy."',
    choices: [
      { text: 'Double down on efficiency and automation', nextChapter: 'ch6b', consequence: 'You become a systems thinker.' },
      { text: 'Start looking beyond the forms', nextChapter: 'ch3a', consequence: 'You begin to see the bigger picture.' }
    ],
    insights: ['Process is a tool, not the goal', 'Efficiency without insight is hollow'],
    emotionalTheme: 'Reflection',
    timeToComplete: '1 hour',
    rewards: { xp: 250, character: 'Process Master' }
  },
  // ... (ch3a, ch3b, ch3c, ch4a, ch4b, ch4c, ch5a, ch5b, ch5c, ch6b, ch7c already exist)
  // We now add missing ones as fallbacks that lead to the main path

  { id: 'ch3a', chapterNum: 3, title: 'The Weight of Responsibility', tagline: 'Your first real decision', narrative: `Your signal report goes up the chain. Regulatory affairs gets involved. You get called into a meeting. Senior executives. Lawyers. The question on their faces: "Did you act too fast?"

Your hands shake as you present your data. Three cases. Consistent timeline. Plausible mechanism. You've done the work. You know you're right.

This is the moment you stop being a trainee. This is the moment you become a guardian.`, character: 'Dr. Maya Patel', characterQuote: '"You just made a decision that affects thousands of people. How does that feel?"', choices: [
    { text: 'Stand firm. You did the analysis. Trust your work.', nextChapter: 'ch4a', consequence: 'Conviction becomes your signature.' },
    { text: 'Acknowledge the limits of your data. Ask for more time.', nextChapter: 'ch4b', consequence: 'Humility. Power of knowing what you don’t know.' },
    { text: 'Propose: label warning + continued surveillance', nextChapter: 'ch4c', consequence: 'Pragmatism. Working within systems.' }
  ], insights: ['Expertise means being wrong sometimes. Own it.', 'Your decisions ripple outward.'], emotionalTheme: 'Responsibility', timeToComplete: '1.5 hours', rewards: { xp: 400, character: 'Risk Thinker' } },
  { id: 'ch3b', chapterNum: 3, title: 'The Power of Patience', tagline: 'Waiting can be wisdom', narrative: `You wait. You collect more cases. And then it happens: the 5th case confirms the signal. Your caution paid off. The signal is stronger now.

Dr. Patel smiles. "Sometimes the right choice is not acting... yet."`, character: 'Dr. Maya Patel', characterQuote: '"Patience is not passive. It is concentrated strength."', choices: [
    { text: 'Now report with full confidence', nextChapter: 'ch4a', consequence: 'Your timing is perfect.' }
  ], insights: ['Good science takes time', 'Caution can save lives'], emotionalTheme: 'Restraint', timeToComplete: '1 hour', rewards: { xp: 350, character: 'Measured Guardian' } },
  { id: 'ch3c', chapterNum: 3, title: 'The Power of Team', tagline: 'No signal is found alone', narrative: `You ask around. Two colleagues say: "I saw something similar!" Together, you build a stronger case. The signal becomes undeniable.

You learn: pharmacovigilance is a team sport.`, character: 'Dr. Maya Patel', characterQuote: '"No one sees everything. But together, we see enough."', choices: [
    { text: 'Build a cross-functional signal detection team', nextChapter: 'ch6b', consequence: 'You become a leader.' }
  ], insights: ['Collaboration > competition', 'Collective intelligence saves lives'], emotionalTheme: 'Unity', timeToComplete: '1.5 hours', rewards: { xp: 400, character: 'Team Leader' } },

  // Add missing ch4b, ch4c, ch5b, ch5c as bridges to main path
  { id: 'ch4b', chapterNum: 4, title: 'The Humble Path', tagline: 'Knowing what you don’t know', narrative: `You admit the limits. The team gives you more time. In the end, the signal holds. Your humility earns respect.

You learn: strength includes saying "I don’t know yet."`, character: 'Dr. Maya Patel', characterQuote: '"The wise know their limits. The great ones admit them."', choices: [
    { text: 'Continue with deeper investigation', nextChapter: 'ch5a', consequence: 'You earn trust.' }
  ], insights: ['Humility is strength', 'Trust is built over time'], emotionalTheme: 'Humility', timeToComplete: '1.5 hours', rewards: { xp: 500, character: 'Humble Guardian' } },
  { id: 'ch4c', chapterNum: 4, title: 'The Pragmatist', tagline: 'Real-world solutions', narrative: `You propose a label warning and continued monitoring. The company agrees. The change is made. Lives are protected — not perfectly, but better.

You learn: perfection is the enemy of progress.`, character: 'Dr. Maya Patel', characterQuote: '"Sometimes good enough and fast is better than perfect and late."', choices: [
    { text: 'Scale this pragmatic approach', nextChapter: 'ch6b', consequence: 'You become a realist leader.' }
  ], insights: ['Pragmatism saves lives', 'Systems must be practical'], emotionalTheme: 'Pragmatism', timeToComplete: '1.5 hours', rewards: { xp: 550, character: 'Real-World Guardian' } },

  { id: 'ch4a', chapterNum: 4, title: 'The Crisis Moment', tagline: 'When everything changes', narrative: `Six months later. A 12-year-old girl in London develops severe aplastic anemia—a completely different adverse event than the rash you flagged. Media picks it up. "PHARMA COMPANY HIDES SAFETY DATA" reads the headline.

You weren't wrong about the rash. But you were incomplete. You missed something bigger.

Dr. Patel sits next to you silently. Then: "This is where you learn. Not all data speaks up. Sometimes you have to listen harder."`, character: 'Dr. Maya Patel & Dr. James Chen', characterQuote: '"You didn’t save this one. That’s the burden we carry. That’s also why we do this work."', choices: [
    { text: 'Propose deep epidemiological study to find all signals', nextChapter: 'ch5a', consequence: 'You become a hunter of hidden truths.' },
    { text: 'Take time to process. Learn systems thinking.', nextChapter: 'ch5b', consequence: 'Maturity. Zoom out from cases to patterns.' },
    { text: 'Request to visit the patient’s family.', nextChapter: 'ch5c', consequence: 'Empathy becomes your method.' }
  ], insights: ['Expertise is humbling. Stay humble.', 'You will miss things. That’s reality.'], emotionalTheme: 'Maturation', timeToComplete: '2 hours', rewards: { xp: 600, character: 'Dr. James Chen as mentor' } },
  { id: 'ch5b', chapterNum: 5, title: 'Seeing the System', tagline: 'From cases to patterns', narrative: `You step back. You see the whole system: reporting delays, under-diagnosis, publication bias. You realize: the problem isn’t one drug. It’s how we look.

You begin designing better ways to see.`, character: 'Dr. James Chen', characterQuote: '"Stop looking at cases. Start looking at systems."', choices: [
    { text: 'Build a new detection framework', nextChapter: 'ch6b', consequence: 'You become an architect.' }
  ], insights: ['Zoom out to see clearly', 'Systems shape outcomes'], emotionalTheme: 'Perspective', timeToComplete: '2 hours', rewards: { xp: 700, character: 'Systems Thinker' } },
  { id: 'ch5c', chapterNum: 5, title: 'The Patient’s Face', tagline: 'Empathy as method', narrative: `You visit the family. You sit with them. You listen. You cry. You come back changed.

You now design every system with one question: "How does this affect the patient?"`, character: 'Dr. James Chen', characterQuote: '"Never forget the face behind the data."', choices: [
    { text: 'Advocate for patient-centered pharmacovigilance', nextChapter: 'ch7c', consequence: 'You change the field forever.' }
  ], insights: ['Empathy is not weakness', 'Human-centered design saves lives'], emotionalTheme: 'Compassion', timeToComplete: '2.5 hours', rewards: { xp: 800, character: 'Heart of the Guardian' } },

  { id: 'ch5a', chapterNum: 5, title: 'The Deep Dive', tagline: 'Pattern recognition becomes your art form', narrative: `Three months of epidemiological analysis. You build models. You sift through adverse event databases across 47 countries. You find 23 cases of aplastic anemia you'd missed.

You realize that signal detection isn't about finding one truth. It's about seeing the geometry of risk. Dr. Chen sits across from you, looking at your heat maps. "This is good work," she says. "But are you becoming a data scientist or a guardian?"

A door opens in your mind. You're not just analyzing anymore. You're storytelling. You're turning numbers into narratives that people will listen to and act on.`, character: 'Dr. James Chen', characterQuote: '"Data without narrative is noise. Your job now: become a translator. Make numbers sing."', choices: [
    { text: 'Write a groundbreaking paper. Publish in The Lancet.', nextChapter: 'ch6a', consequence: 'Recognition. The burden of visibility.' },
    { text: 'Build a model for early signal detection', nextChapter: 'ch6b', consequence: 'Legacy. Impact beyond your company.' },
    { text: 'Train the next generation.', nextChapter: 'ch6c', consequence: 'Mentorship. Becoming the mentor you needed.' }
  ], insights: ['Numbers tell stories. Learn the language.', 'Your work compounds over time.'], emotionalTheme: 'Transformation', timeToComplete: '2.5 hours', rewards: { xp: 800, character: 'Signal Master' } },
  { id: 'ch6a', chapterNum: 6, title: 'The Published Truth', tagline: 'Your name in print', narrative: `Your paper is published. The world listens. Regulatory changes follow. You become known. But fame is a double-edged sword. Now every word you say is scrutinized.

You learn: visibility comes with responsibility.`, character: 'Dr. James Chen', characterQuote: '"You now speak for patients. Don’t waste the microphone."', choices: [
    { text: 'Use your voice to advocate globally', nextChapter: 'ch7c', consequence: 'You shape policy.' }
  ], insights: ['Influence is a duty', 'Words can save lives'], emotionalTheme: 'Influence', timeToComplete: '2 hours', rewards: { xp: 900, character: 'Global Voice' } },
  { id: 'ch6c', chapterNum: 6, title: 'The Mentor', tagline: 'Passing the torch', narrative: `You begin teaching. You mentor 12 young professionals. You see yourself in them — the fear, the passion, the doubt.

You realize: your greatest work may not be what you discover, but who you inspire.`, character: 'Dr. James Chen', characterQuote: '"The best leaders don’t create followers. They create more leaders."', choices: [
    { text: 'Build a global training program', nextChapter: 'ch7c', consequence: 'You multiply your impact.' }
  ], insights: ['Legacy is in people', 'Teaching is the highest form of mastery'], emotionalTheme: 'Legacy', timeToComplete: '2.5 hours', rewards: { xp: 950, character: 'Mentor of Guardians' } },
  { id: 'ch6b', chapterNum: 6, title: 'The System Builder', tagline: 'From practitioner to architect', narrative: `You stop working on single cases. Now you're working on systems that detect cases. You build IRIS (Integrated Risk Identification System) trained on 50 years of adverse event data.

The system finds things you didn't expect. It catches signals on drugs that seemed safe. It raises flags on combinations of drugs. It even identifies at-risk populations based on genetic markers.

Suddenly you're not just a pharmacovigilance officer anymore. You're a systems designer. A builder of futures. "You've moved from watching the river to building the dam," Dr. Chen says. "With systems comes responsibility at scale. Are you ready?"`, character: 'Dr. James Chen', characterQuote: '"You’ve built a system. Now you have to live with it."', choices: [
    { text: 'Make IRIS open-source. Let the world improve it.', nextChapter: 'ch7a', consequence: 'You stop owning it. You start leading it.' },
    { text: 'Build a company around IRIS. Scale globally.', nextChapter: 'ch7b', consequence: 'Ambition. Legacy and impact.' },
    { text: 'Move into regulatory leadership.', nextChapter: 'ch7c', consequence: 'Influence. Shape how the world approaches signals.' }
  ], insights: ['Systems amplify impact and responsibility', 'Build for the future, not for today'], emotionalTheme: 'Ascension', timeToComplete: '2.5 hours', rewards: { xp: 1000, character: 'Signal Architect' } },
  { id: 'ch7a', chapterNum: 7, title: 'The Open Source Guardian', tagline: 'Impact without ownership', narrative: `You release IRIS as open source. Within a year, 47 countries use it. Thousands of lives are saved. You own nothing. You influence everything.

You realize: the greatest power is giving power away.`, character: 'You', characterQuote: '"I built a tool. The world built a movement."', choices: [
    { text: 'Continue the journey...', nextChapter: 'ending', consequence: 'You become legend.' }
  ], insights: ['Open > closed for public health', 'Impact > ownership'], emotionalTheme: 'Altruism', timeToComplete: '2 hours', rewards: { xp: 1200, character: 'Open Source Guardian' } },
  { id: 'ch7b', chapterNum: 7, title: 'The Visionary Founder', tagline: 'Building the future of safety', narrative: `You found a company. You raise funding. You scale IRIS globally. You hire the best minds. You save millions.

But you also learn: with scale comes compromise. With power comes politics.`, character: 'You', characterQuote: '"I wanted to save lives. I learned you have to fight to do it."', choices: [
    { text: 'Continue the journey...', nextChapter: 'ending', consequence: 'You become legend.' }
  ], insights: ['Ambition can serve humanity', 'Scale changes everything'], emotionalTheme: 'Ambition', timeToComplete: '2.5 hours', rewards: { xp: 1300, character: 'Global Safety Leader' } },
  { id: 'ch7c', chapterNum: 7, title: 'The Final Lesson', tagline: 'From expert to elder', narrative: `Ten years pass. You're now head of a global pharmacovigilance network. You advise three regulatory agencies. You've trained 47 junior staff members.

A young pharmacovigilance officer—nervous, eager, hungry—walks in with her first signal. She looks at you the way you once looked at Dr. Patel: seeking validation. Seeking wisdom.

You think about what you'd say. And you realize the answer isn't about being certain. It's about being humble enough to listen, brave enough to act, and wise enough to know the difference.

"Your job isn't to be right," you tell her. "Your job is to be responsible."

The cycle continues. And that's the real victory.`, character: 'You', characterQuote: '"I thought expertise meant having all the answers. I learned it means asking better questions."', choices: [
    { text: 'Reflect. This is where your story ends and others\' begin.', nextChapter: 'ending', consequence: 'You become legend.' }
  ], insights: ['Wisdom is knowing what you don’t know', 'Leadership is creating more leaders'], emotionalTheme: 'Transcendence', timeToComplete: '1 hour', rewards: { xp: 1500, character: "The Guardian's Benediction" } },

  // Final Ending
  {
    id: 'ending',
    chapterNum: 8,
    title: 'The Guardian\'s Legacy',
    tagline: 'You did not just survive the journey. You became it.',
    narrative: `You look back. From a nervous trainee to a global guardian. You’ve saved lives you’ll never meet. You’ve shaped systems that will protect generations.

You are no longer asking: "Am I good enough?"

You are the answer others seek.

And somewhere, a new pharmacovigilance officer is reading their first report... and your journey begins again — in them.

Thank you for playing The Guardian's Journey.`,
    character: 'You',
    characterQuote: '"We don’t do this work for recognition. We do it because someone has to."',
    choices: [],
    insights: ['Your legacy is measured in lives saved', 'The journey never ends — it evolves', 'You are now the guardian you once needed'],
    emotionalTheme: 'Fulfillment',
    timeToComplete: 'Forever',
    rewards: { xp: 5000, character: null },
    isEnding: true
  }
];
