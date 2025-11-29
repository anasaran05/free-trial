'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lock, MessageSquare } from 'lucide-react';

interface Leader {
  name: string;
  country: string;
  flag: string; 
  xp: number;
  avatar?: string;
}

interface LeaderboardProps {
  leaders: Leader[];
  rotateDelay?: number;
}

export default function Leaderboard({ leaders, rotateDelay = 4000 }: LeaderboardProps) {
  const [index, setIndex] = useState(0);
  const current = leaders[index % leaders.length];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % leaders.length);
    }, rotateDelay);
    return () => clearInterval(id);
  }, [leaders, rotateDelay]);

  return (
    <Card
      className="bg-[#0D0D11] border border-[#18181F] rounded-2xl shadow-xl overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        <div
          className="relative w-full h-40 bg-gradient-to-br from-[#15151E] via-[#0B0B14] to-[#171724] rounded-xl transition-transform duration-500 will-change-transform"
          onMouseMove={tilt}
          onMouseLeave={resetTilt}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <span>{current.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-base">{current.flag}</span>
              <span>{current.country}</span>
            </div>

            <div className="text-base text-blue-400 font-medium">
              {current.xp.toLocaleString()} XP
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Leaderboard</p>

          <div
            className="flex items-center gap-1 px-3 py-2 rounded-md bg-[#191921] border border-[#2A2A34] text-xs text-muted-foreground cursor-not-allowed relative group"
          >
            <MessageSquare className="w-4 h-4 opacity-60" />
            Message
            <Lock className="w-3.5 h-3.5 opacity-60" />

            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[11px] font-medium">
             Upgrade
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function tilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const xc = r.width / 2;
  const yc = r.height / 2;
  const rotateX = ((y - yc) / yc) * -8;
  const rotateY = ((x - xc) / xc) * 8;
  el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transform = `rotateX(0deg) rotateY(0deg)`;
}