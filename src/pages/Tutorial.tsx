// src/pages/Tutorial.tsx
'use client';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Tutorial() {
  const navigate = useNavigate();
  const videoId = "jGFy7n0O_E4";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-10 w-full max-w-4xl">
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Platform Tutorial
          </h1>
          <p className="text-xl text-white/60">
            Watch this short video to get started
          </p>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
          <div className="aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&fs=1`}
              allowFullScreen
            />
          </div>
        </div>

        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/"), 400);
          }}
          className="bg-white text-black text-lg px-14 py-5 rounded-full font-medium 
          hover:bg-white/90 transition-colors"
        >
          Begin Your Journey
        </Button>
      </div>
    </div>
  );
}