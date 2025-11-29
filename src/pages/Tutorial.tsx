// src/pages/Tutorial.tsx
'use client';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Tutorial() {
  const navigate = useNavigate();
  const videoId = "jGFy7n0O_E4";

  return (
    <div className="min-h-screen flex justify-center px-4 pt-14 bg-gradient-to-b from-black via-[#0A0A0F] to-black text-white">
      <div className="w-full max-w-3xl flex flex-col gap-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Learn the Core Workflow
          </h1>

          <p className="text-base text-white/70 max-w-md mx-auto leading-normal">
            A concise walkthrough on navigating missions, accessing tools, and completing tasks inside Omega.
          </p>
        </div>

        {/* Video */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_0_25px_-10px_rgba(255,0,0,0.25)]">
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
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-3 text-base font-medium rounded-md bg-[#EDEDED] text-black hover:bg-white"
          >
            Continue
          </Button>
        </div>

      </div>
    </div>
  );
}