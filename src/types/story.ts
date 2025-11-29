// src/types/story.ts

export interface StoryChoice {
  text: string;
  nextChapter: string;
  consequence: string;
}

export interface StoryRewards {
  xp: number;
  character: string | null;
}

export interface StoryChapter {
  id: string;
  chapterNum: number;
  title: string;
  tagline: string;
  narrative: string;
  character: string;
  characterQuote: string;
  choices: StoryChoice[];
  insights: string[];
  emotionalTheme: string;
  timeToComplete: string;
  rewards: StoryRewards;

  // Optional flags for special chapters
  isEnding?: boolean;
  endingName?: string;        // Added for ending chapters
}

export interface Story {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  chapters: StoryChapter[];
  coverImage?: string;
}