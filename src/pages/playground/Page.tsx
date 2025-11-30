// app/playground/page.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Lock, MessageCircle, Trophy } from 'lucide-react';
import { useStory } from '@/context/StoryContext';
import type { Story } from '@/types/story';
import Sidebar from '@/components/sidebar';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card';
import { InteractiveHoverButton } from '@/components/Buttons/interactive-hover-button';
import { stories as availableStories, courseMap, courseDisplayNames } from '@/components/data/Stories/storyIndex';
import { supabase } from '@/integrations/supabase/client';

export default function StoryLibraryPage() {
  const { setStory } = useStory();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [approvedCourses, setApprovedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCourseId = searchParams.get('course') || 'public';
  const email = localStorage.getItem("omega_email")?.trim();

  // Fetch approved courses from Supabase
  useEffect(() => {
    const fetchApproved = async () => {
      if (!email) {
        setApprovedCourses([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("form_users")
        .select("approved_courses")
        .eq("email", email)
        .single();

      if (!error && Array.isArray(data?.approved_courses)) {
        setApprovedCourses(data.approved_courses as string[]);
      }
      setLoading(false);
    };

    fetchApproved();
  }, [email]);

  // Determine if a story is unlocked
  const isStoryUnlocked = (story: Story) => {
    if (story.courseId === 'public') return true;
    return approvedCourses.includes(story.courseId);
  };

  // Filter stories based on current tab
  const filteredStories = availableStories.filter(story => {
    if (currentCourseId === 'public') {
      return story.courseId === 'public';
    }
    return story.courseId === currentCourseId;
  });

  const currentCourseName = currentCourseId === 'public'
    ? 'Public Stories'
    : courseDisplayNames[courseMap[currentCourseId]] || 'Stories';

  const handleStartStory = (story: Story) => {
    if (!isStoryUnlocked(story)) return;
    setStory(story);
    navigate('/playground/story');
  };

  const setFilter = (courseId: string) => {
    navigate(`/playground${courseId === 'public' ? '' : `?course=${courseId}`}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl text-muted-foreground">Loading your stories...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {currentCourseName}
            </h1>
            <p className="text-xl text-muted-foreground">
              Interactive stories • Learn by doing
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setFilter('public')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                currentCourseId === 'public'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Public Stories
            </button>

            {Object.entries(courseMap).map(([id, key]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  currentCourseId === id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {courseDisplayNames[key]}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          {filteredStories.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-muted/50 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
              <p className="text-xl text-muted-foreground">No stories available yet</p>
              <p className="text-muted-foreground mt-2">More coming soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story, index) => {
                const chapterCount = story.chapters.filter(c => !c.isEnding).length;
                const unlocked = isStoryUnlocked(story);

                return (
                  <Card
                    key={story.id}
                    className={`relative overflow-hidden transition-all cursor-pointer ${
                      unlocked
                        ? 'hover:scale-[1.02] hover:shadow-xl'
                        : 'opacity-75 grayscale'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Locked Overlay */}
                    {!unlocked && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-destructive mx-auto mb-3" />
                          <p className="text-sm font-medium text-white">Course Required</p>
                          <a
                            href={`https://wa.me/919342205876?text=${encodeURIComponent(
                              `Hi! Please unlock access to "${story.title}" story for me!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-xs text-white hover:underline"
                          >
                            <MessageCircle className="w-4 h-4 text-blue-300" />
                            Contact to Unlock
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Cover Image */}
                    <div className="h-48 w-full rounded-t-lg overflow-hidden bg-muted">
                      {story.coverImage ? (
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <span className="text-sm">No preview</span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pt-6">
                      <CardTitle className="text-lg font-semibold leading-snug">
                        {story.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3 pt-2">
                        {story.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pb-6">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{story.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Trophy className="w-4 h-4" />
                          <span className="font-medium">{chapterCount} chapters</span>
                        </div>
                      </div>

                      <div onClick={() => unlocked && handleStartStory(story)}>
                        <InteractiveHoverButton
                          className="w-full text-sm"
                          disabled={!unlocked}
                        >
                          {unlocked ? 'Begin Journey' : 'Locked'}
                        </InteractiveHoverButton>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16 text-muted-foreground text-lg">
            More stories coming soon...
          </div>
        </div>
      </main>
    </div>
  );
}