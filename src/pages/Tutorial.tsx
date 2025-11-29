// src/pages/Tutorial.tsx
'use client';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Tutorial() {
  const navigate = useNavigate();
  const videoId = "jGFy7n0O_E4";

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center px-4 pt-10">
      <div className="w-full max-w-3xl flex flex-col space-y-10">

       

        {/* Header + context */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Ωmega Tutorial
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
            This video walks you through essential features so you can begin using Ωmega confidently.
          </p>
        </div>

        {/* Video container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&fs=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => navigate("/dashboard"), 300);
            }}
            className="
              w-full md:w-auto
              bg-white text-black text-base px-10 py-3 rounded-full font-medium
              hover:bg-black hover:text-white
              transition-colors duration-200
            "
          >
            Enter Omega
          </Button>

         
        </div>
      </div>
    </div>
  );
}