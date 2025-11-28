// src/types/story.ts
export interface StoryChoice {
  text: string;
  nextChapter: string;
  consequence: string;
}
export interface Story {
  id: string
  title: string
  description: string
  chapters: StoryChapter[]
  coverImage?: string
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
  isEnding?: boolean;
}