// app/playground/page.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy } from 'lucide-react';
import { useStory } from '@/context/StoryContext';
import { storyChapters as guardianChapters } from '@/components/data/Stories/guardianStory';
import { storyChapters as neuraBioChapters } from '@/components/data/Stories/neuraBioStory';
import { storyChapters as fracturedConsentChapters } from '@/components/data/Stories/fractured-consent';
import type { Story } from '@/types/story';
import Sidebar from '@/components/sidebar';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card';
import { InteractiveHoverButton } from '@/components/Buttons/interactive-hover-button';
const guardiansJourney: Story = {
  id: 'guardians-journey',
  title: "The Guardian's Journey",
  description: 'Rise from anxious trainee to leading global drug safety expert',
  estimatedDuration: '45–60 min',
  chapters: guardianChapters,
  coverImage: 'https://www.shutterstock.com/image-vector/bottle-medicine-target-blue-syringe-600nw-2602511367.jpg',
};

const neuraBio: Story = {
  id: 'neurabio',
  title: 'NeuraBio: Price of Innovation',
  description: 'Inside a biotech startup racing between breakthrough science and ethics',
  estimatedDuration: '60–75 min',
  chapters: neuraBioChapters,
  coverImage: 'https://cdn.mos.cms.futurecdn.net/H2K5LjsrakLauPmnZxYddF.jpg',
};

const fracturedConsent: Story = {
  id: 'fractured-consent',
  title: 'Fractured Consent',
  description: 'When clinical trial patients never truly understood what they signed',
  estimatedDuration: '50–70 min',
  chapters: fracturedConsentChapters,
  coverImage: 'https://lawwire.in/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-29-at-5.04.49-PM.webp',
};

const availableStories: Story[] = [guardiansJourney, neuraBio, fracturedConsent];

export default function StoryLibraryPage() {
  const { setStory } = useStory();
  const navigate = useNavigate();

  const handleStartStory = (story: Story) => {
    setStory(story);
    navigate('/playground/story');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Interactive Learning Stories
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose your journey and master pharmacovigilance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableStories.map((story, index) => {
              const chapterCount = story.chapters.filter(c => !c.isEnding).length;

              return (
                <Card
                  key={story.id}
                  className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Cover Image */}
                  <div className="h-40 w-full rounded-t-lg overflow-hidden bg-muted">
                    {story.coverImage ? (
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
                        No cover image
                      </div>
                    )}
                  </div>

                  <CardHeader className="pt-6">
                    <CardTitle className="text-lg font-semibold leading-snug">
                      {story.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-4 pt-3">
                      {story.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pb-6">
                    <div className="grid grid-cols-2 gap-4 text-center text-xs">
                      {/* Duration - now dynamic */}
                      <div>
                        <div className="text-muted-foreground">Duration</div>
                        <div className="font-semibold flex items-center justify-center gap-2 pt-2">
                          <Clock className="w-4 h-4" />
                          {story.estimatedDuration}
                        </div>
                      </div>

                      {/* Chapters */}
                      <div>
                        <div className="text-muted-foreground">Chapters</div>
                        <div className="font-semibold flex items-center justify-center gap-2 pt-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          {chapterCount}
                        </div>
                      </div>
                    </div>

                    <div onClick={() => handleStartStory(story)} className="cursor-pointer">
                      <InteractiveHoverButton className="w-full text-sm">
                        Begin Journey
                      </InteractiveHoverButton>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16 text-muted-foreground text-lg">
            More stories coming soon...
          </div>
        </div>
      </main>
    </div>
  );
}