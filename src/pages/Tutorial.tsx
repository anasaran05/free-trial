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

        <div className="relative w-full rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
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
  className="
    relative overflow-hidden
    bg-white text-black text-lg px-20 py-5 rounded-full font-medium
    border border-transparent hover:border-white hover:bg-black hover:text-white
    transition-colors duration-300 ease-in-out group
  "
>
  <span
    className="
      block w-full h-full
      transition-transform duration-500 ease-in-out
      [transform-style:preserve-3d]
      group-hover:[transform:rotateX(180deg)]
    "
  >
    <span
      className="
        absolute inset-0 flex items-center justify-center
        [backface-visibility:hidden]
      "
    >
      Begin
    </span>

    <span
      className="
        absolute inset-0 flex items-center justify-center
        [transform:rotateX(180deg)]
        [backface-visibility:hidden]
      "
    >
      Your Journey
    </span>
  </span>
</Button>
      </div>
    </div>
  );
}