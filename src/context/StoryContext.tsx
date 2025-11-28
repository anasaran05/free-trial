// context/StoryContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import type { Story } from '@/types/story'

interface StoryContextType {
  currentStory: Story | null
  setStory: (story: Story) => void
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [currentStory, setCurrentStory] = useState<Story | null>(null)

  return (
    <StoryContext.Provider value={{ currentStory, setStory: setCurrentStory }}>
      {children}
    </StoryContext.Provider>
  )
}

export function useStory() {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error('useStory must be used inside StoryProvider')
  return ctx
}