// app/playground/story/page.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStory } from '@/context/StoryContext';
import {
  BookOpen, Zap, CheckCircle2, User, Clock, Flame,
  ArrowRight, Volume2, Share2, Trophy, ChevronLeft
} from 'lucide-react';
import Sidebar from '@/components/ui/sidebar';
import type { StoryChapter } from '@/types/story';

export default function NarrativeStoryPage() {
  const { currentStory } = useStory();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentStory) navigate('/playground', { replace: true });
  }, [currentStory, navigate]);

  if (!currentStory) return null;

  const [currentChapterId, setCurrentChapterId] = useState(currentStory.chapters[0].id);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chapter = currentStory.chapters.find(c => c.id === currentChapterId) ?? currentStory.chapters[0];
  const totalMainChapters = currentStory.chapters.filter(ch => !ch.isEnding).length;
  const progress = totalMainChapters > 0 ? Math.round((completedChapters.length / totalMainChapters) * 100) : 0;

  // Text-to-speech (unchanged – compact version)
  const speakChapter = (ch: StoryChapter) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = `${ch.title}. ${ch.tagline}. ${ch.character ? `${ch.character} says: ${ch.characterQuote}. ` : ''}${ch.narrative.replace(/\n+/g, ' ')}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => stopSpeaking(), [currentChapterId]);
  useEffect(() => () => stopSpeaking(), []);

  const handleChoice = (nextChapterId: string) => {
    if (!completedChapters.includes(currentChapterId)) {
      setCompletedChapters(prev => [...prev, currentChapterId]);
    }
    setCurrentChapterId(nextChapterId);
    setSelectedChoice(null);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/playground')} className="p-2 hover:bg-muted rounded-lg">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <BookOpen className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold">{currentStory.title}</h1>
                  <p className="text-xs text-muted-foreground">
                    {chapter.isEnding ? 'Journey Complete' : `Chapter ${chapter.chapterNum} of ${totalMainChapters}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => isSpeaking ? stopSpeaking() : speakChapter(chapter)}
                  className="p-2.5 hover:bg-muted rounded-lg"
                  aria-label={isSpeaking ? "Stop" : "Read aloud"}
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
                </button>
                <button className="p-2.5 hover:bg-muted rounded-lg"><Share2 className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Journey Progress</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT: Story */}
              <div className="lg:col-span-7 space-y-8">

                {/* Ending */}
                {chapter.isEnding && (
                  <div className="text-center py-16">
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-4">Journey Complete</h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                      Your choices shaped the future of patient safety.
                    </p>
                    <button
                      onClick={() => navigate('/playground')}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90"
                    >
                      Return to Library <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Chapter Header – REDUCED SIZES */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full">
                      {chapter.isEnding ? 'Epilogue' : `Chapter ${chapter.chapterNum}`}
                    </span>
                    {!chapter.isEnding && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {chapter.timeToComplete}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold">{chapter.title}</h2>           {/* was 5xl → now 3xl */}
                  <p className="text-lg text-muted-foreground">{chapter.tagline}</p> {/* was xl italic → normal lg */}
                </div>

                {/* Character Quote */}
                {!chapter.isEnding && chapter.character && (
                  <div className="border-l-4 border-primary bg-muted/30 p-6 rounded-r-xl">
                    <div className="flex gap-4">
                      <User className="w-7 h-7 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{chapter.character}</p>
                        <p className="text-xl italic leading-relaxed">“{chapter.characterQuote}”</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Narrative */}
                <div className="space-y-5 text-foreground leading-relaxed text-base">
                  {chapter.narrative.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Choices */}
                {!chapter.isEnding && chapter.choices.length > 0 && (
                  <div className="mt-10 space-y-5">
                    <p className="font-medium flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" /> What do you do next?
                    </p>

                    <div className="space-y-3">
                      {chapter.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedChoice(selectedChoice === idx ? null : idx)}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all
                            ${selectedChoice === idx
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-border bg-card hover:border-primary/40'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0
                              ${selectedChoice === idx ? 'border-primary bg-primary' : 'border-muted-foreground/40'}`}
                            >
                              {selectedChoice === idx && <CheckCircle2 className="w-4 h-4 text-background" />}
                            </div>
                            <div>
                              <p className="font-medium">{choice.text}</p>
                              {selectedChoice === idx && (
                                <p className="text-sm text-muted-foreground mt-2 italic">→ {choice.consequence}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {selectedChoice !== null && (
                      <button
                        onClick={() => handleChoice(chapter.choices[selectedChoice].nextChapter)}
                        className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 flex items-center justify-center gap-3"
                      >
                        Continue <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* MIDDLE: Rewards & Insights */}
              <aside className="lg:col-span-3 space-y-6">
                {!chapter.isEnding && (
                  <>
                    <div className="border border-border rounded-2xl p-6 bg-card">
                      <p className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                        REWARDS
                      </p>
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                          <span>Experience</span>
                          <span className="font-bold text-primary">+{chapter.rewards.xp} XP</span>
                        </div>
                        {chapter.rewards.character && (
                          <p className="text-sm text-muted-foreground pt-4 border-t border-border">
                            Unlocked: <span className="font-semibold text-primary">{chapter.rewards.character}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border border-border rounded-2xl p-6 bg-card">
                      <p className="text-sm font-bold text-muted-foreground mb-4">KEY INSIGHTS</p>
                      <ul className="space-y-3">
                        {chapter.insights.map((insight, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="text-primary font-bold">•</span>
                            <span className="text-muted-foreground">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-border rounded-2xl p-6 bg-card">
                      <p className="text-sm font-bold text-muted-foreground mb-3">EMOTIONAL CORE</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-500">
                        {chapter.emotionalTheme}
                      </p>
                    </div>
                  </>
                )}
              </aside>

              {/* RIGHT: Chapter Navigation */}
              <aside className="lg:col-span-2">
                <div className="border border-border rounded-2xl p-5 bg-card sticky top-32">
                  <p className="text-sm font-bold text-muted-foreground mb-4">CHAPTERS</p>
                  <div className="space-y-2">
                    {currentStory.chapters
                      .filter(ch => !ch.isEnding)
                      .map(ch => (
                        <button
                          key={ch.id}
                          onClick={() => completedChapters.includes(ch.id) && setCurrentChapterId(ch.id)}
                          disabled={!completedChapters.includes(ch.id) && ch.id !== currentChapterId}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                            ${ch.id === currentChapterId
                              ? 'bg-primary text-primary-foreground'
                              : completedChapters.includes(ch.id)
                                ? 'hover:bg-muted bg-card'
                                : 'opacity-40 cursor-not-allowed bg-muted/30'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">Ch {ch.chapterNum}: {ch.title}</span>
                            {completedChapters.includes(ch.id) && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}