'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Globe2 } from 'lucide-react';

type RegionData = {
  name: string;
  india: number;
  usa: number;
  eu: number;
  aus: number;
};

interface GraphAnalyticsProps {
  data: RegionData[];
  lastUpdated: string;
}

export default function GraphAnalytics({ data, lastUpdated }: GraphAnalyticsProps) {
  const [shuffled, setShuffled] = useState<RegionData[]>(data);

  // Shuffle handler
  const shuffleArray = (arr: RegionData[]) => {
    const temp = [...arr];
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
  };

  // Shuffle every 1 hour
  useEffect(() => {
    setShuffled(shuffleArray(data));

    const interval = setInterval(() => {
      setShuffled(prev => shuffleArray(prev));
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card className="bg-[#0D0D11] border border-[#12121A] rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-blue-400" />
          Global Course Popularity
        </CardTitle>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Live</span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
         
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={shuffled}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#1A1A23" strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{ fill: '#8A8A9A', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: '#8A8A9A', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: '#12121A',
                  border: '1px solid #2A2A33',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#ddd' }}
              />

              <Line type="monotone" dataKey="india" stroke="#5E5CFF" strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 5 }}/>
              <Line type="monotone" dataKey="usa"   stroke="#21B7FF" strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 5 }}/>
              <Line type="monotone" dataKey="eu"    stroke="#42FF8E" strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 5 }}/>
              <Line type="monotone" dataKey="aus"   stroke="#FF6B4C" strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 5 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <LegendItem color="#5E5CFF" label="India" />
          <LegendItem color="#21B7FF" label="USA" />
          <LegendItem color="#42FF8E" label="EU" />
          <LegendItem color="#FF6B4C" label="AUS" />
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">
          Last sync: {lastUpdated}
        </p>
      </CardContent>
    </Card>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}