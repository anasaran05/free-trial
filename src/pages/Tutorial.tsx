// src/pages/Tutorial.tsx
'use client';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Tutorial() {
  const navigate = useNavigate();
  const videoId = "jGFy7n0O_E4";

  return (
    <div className="min-h-screen flex justify-center px-4 pt-20 bg-gradient-to-b from-black via-[#0A0A0F] to-black text-white">
      <div className="w-full max-w-4xl flex flex-col gap-16">

        {/* Header */}
        <div className="text-center space-y-6">
         

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Learn the Core Workflow
          </h1>

          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            A short walkthrough demonstrating how to navigate missions, access tools,
            and complete tasks inside Omega.
          </p>
        </div>

        {/* Video Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_40px_-10px_rgba(255,0,0,0.35)]">
          <div className="aspect-video w-full bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&fs=1`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => navigate("/signin")}
            className="
              px-12 py-4 text-lg font-medium rounded-lg
              bg-[#EDEDED] text-black
              hover:bg-white
              hover:shadow-lg
              transition-all
            "
          >
            Continue
          </Button>
        </div>

      </div>
    </div>
  );
}