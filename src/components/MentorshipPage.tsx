'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar'; 
import Header from '@/components/Header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, X, Calendar, CheckCircle } from 'lucide-react';

export default function MentorshipPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 space-y-8">

          {/* Hero */}
          <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-sm">
            <CardHeader className="pb-6 pt-6">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
                <Users className="h-8 w-8 text-primary" />
                Mentorship Program
              </CardTitle>
              <CardDescription className="text-center text-lg max-w-xl mx-auto">
                Learn with industry professionals who already do what you’re training for.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

            {/* Benefits */}
            <Card className="border border-primary/15 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  What You’ll Gain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-[15px] leading-tight">
                <p className="text-muted-foreground">Interactive 1–on–1 solving real industry problems.</p>
                <p className="text-muted-foreground">Resume building, role prep, and workflow strategy.</p>
                <p className="text-muted-foreground">Portfolio guidance tied to domain simulations.</p>
                <p className="text-muted-foreground">Mentors trained directly from your divisions.</p>
              </CardContent>
            </Card>

            {/* Booking Instructions */}
            <Card className="border border-secondary/15 bg-secondary/5 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Calendar className="h-6 w-6 text-primary" />
                  Booking Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal ml-6 text-[15px] text-muted-foreground">
                  <li>Sessions available Mon–Fri, 10:00–18:00.</li>
                  <li>Each mentorship slot is 30 minutes.</li>
                  <li>Select a mentor and choose an available time.</li>
                  <li>You’ll receive the meeting link instantly.</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 text-center shadow-md">
            <CardContent className="py-8">
              <p className="text-base text-muted-foreground mb-6">
                Unlock mentorship to accelerate your outcomes and industry readiness.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg font-semibold px-6 py-4"
              >
                <Users className="h-5 w-5 mr-2" />
                Upgrade to Unlock Mentorship
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Mentors available Mon–Fri, 10:00 – 18:00
              </p>
            </CardContent>
          </Card>

          {/* Calendly Modal */}
          {isCalendlyOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
              <Card className="w-[88vw] max-w-4xl max-h-[88vh] overflow-y-auto rounded-xl shadow-2xl">
                <CardHeader className="relative border-b border-primary/10 bg-gradient-to-r from-primary/10 to-secondary/10 py-5 flex justify-center">
                  <CardTitle className="text-2xl font-bold">
                    Schedule Session
                  </CardTitle>
                  <button
                    onClick={closeCalendly}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </CardHeader>
                <CardContent className="p-4">
                  <iframe
                    src="https://calendly.com/zaneproed/30min"
                    className="w-full h-[520px] border-0 rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}