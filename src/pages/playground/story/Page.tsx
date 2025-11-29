// app/playground/story/page.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStory } from '@/context/StoryContext';
import {
  BookOpen, Zap, CheckCircle2, User, Clock, Flame,
  ArrowRight, Volume2, Share2, Trophy, ChevronLeft
} from 'lucide-react';
import Sidebar from '@/components/sidebar';
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

      <div className="flex-1 flex flex-col relative">

        {/* PAGE HEADER */}
        <header className="sticky top-16 w-full bg-background border-b border-border z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
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

              <div className="flex items-center gap-3">
                <button
                  onClick={() => isSpeaking ? stopSpeaking() : speakChapter(chapter)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Journey Progress</span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 lg:pr-80 py-10">

            {/* ENDING */}
            {chapter.isEnding && (
              <div className="text-center py-20">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-4">Journey Complete</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Your choices shaped patient safety.
                </p>
                <button
                  onClick={() => navigate('/playground')}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90"
                >
                  Return to Library <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* CHAPTER HEADER */}
            {!chapter.isEnding && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full">
                    Chapter {chapter.chapterNum}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {chapter.timeToComplete}
                  </span>
                </div>

                <h2 className="text-3xl font-bold">{chapter.title}</h2>
                <p className="text-lg text-muted-foreground">{chapter.tagline}</p>

                {/* CHARACTER QUOTE */}
                {chapter.character && (
                  <div className="border-l-4 border-primary bg-muted/30 p-6 mt-6 rounded-r-xl">
                    <div className="flex gap-4">
                      <User className="w-7 h-7 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{chapter.character}</p>
                        <p className="text-xl italic leading-relaxed">
                          “{chapter.characterQuote}”
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* NARRATIVE */}
                <div className="space-y-4 mt-6 leading-relaxed text-base">
                  {chapter.narrative.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* CHOICES */}
                {chapter.choices.length > 0 && (
                  <div className="mt-10 space-y-5">
                    <p className="font-medium flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" /> What do you do next?
                    </p>

                    {chapter.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedChoice(selectedChoice === idx ? null : idx)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all
                          ${selectedChoice === idx
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/40'
                          }`}
                      >
                        <div className="flex gap-4 items-start">
                          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                            ${selectedChoice === idx ? 'border-primary bg-primary' : 'border-muted-foreground/40'}
                          `}>
                            {selectedChoice === idx && (
                              <CheckCircle2 className="w-4 h-4 text-background" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{choice.text}</p>
                            {selectedChoice === idx && (
                              <p className="text-sm text-muted-foreground mt-2 italic">
                                → {choice.consequence}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}

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
              </>
            )}
          </div>
        </main>

        {/* FIXED RIGHT TIMELINE */}
       <aside className="hidden lg:flex flex-col fixed right-0 top-[183px] bottom-0 w-72
  border-l border-border bg-background overflow-y-auto scrollbar-hide pt-6 px-6 z-50">
          <h3 className="text-xs font-semibold text-muted-foreground mb-6">
            CHAPTER TIMELINE
          </h3>

          <ul className="space-y-6">
            {currentStory.chapters
              .filter(ch => !ch.isEnding)
              .map(ch => {
                const done = completedChapters.includes(ch.id);
                const active = ch.id === currentChapterId;

                return (
                  <li key={ch.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full
                        ${active ? 'bg-primary' : done ? 'bg-emerald-500' : 'bg-muted-foreground/40'}
                      `} />
                      <div className={`flex-1 w-px
                        ${done ? 'bg-emerald-500' : 'bg-muted-foreground/30'}
                      `} />
                    </div>

                    <button
                      disabled={!done && !active}
                      onClick={() => setCurrentChapterId(ch.id)}
                      className={`text-left text-sm leading-snug
                        ${active ? 'text-primary font-semibold' : 'text-muted-foreground'}
                      `}
                    >
                      <div>Chapter {ch.chapterNum}</div>
                      <div className="whitespace-normal break-words">
                        {ch.title}
                      </div>
                    </button>
                  </li>
                );
              })}
          </ul>
        </aside>
      </div>
    </div>
  );
}