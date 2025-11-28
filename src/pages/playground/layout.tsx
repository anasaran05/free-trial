// app/layout.tsx or app/playground/layout.tsx
import { StoryProvider } from '@/context/StoryContext';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoryProvider>
      {children}
    </StoryProvider>
  );
}