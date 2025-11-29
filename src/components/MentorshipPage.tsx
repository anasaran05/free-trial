import React, { useState } from 'react';
import Sidebar from '@/components/sidebar'; 
import Header from '@/components/Header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, X, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function MentorshipPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">

          {/* Hero */}
          <Card className="border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center justify-center gap-2 text-4xl font-bold">
                <Users className="h-11 w-11 text-primary" />
                Ready for Mentorship
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Benefits */}
            <Card className="border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  What You'll Gain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-lg text-muted-foreground">
                    <span className="mt-1 text-green-600 font-bold text-xl">•</span>
                    <span>Clarify concepts and doubts from your course.</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-muted-foreground">
                    <span className="mt-1 text-green-600 font-bold text-xl">•</span>
                    <span>Get practical advice on assignments, projects, and workplace simulations.</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-muted-foreground">
                    <span className="mt-1 text-green-600 font-bold text-xl">•</span>
                    <span>Receive career guidance, skill-building tips, and learning strategies.</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-muted-foreground">
                    <span className="mt-1 text-green-600 font-bold text-xl">•</span>
                    <span>Track progress and set actionable learning goals.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Booking Instructions */}
            <Card className="border-secondary/10 hover:border-secondary/20 transition-all duration-300 hover:shadow-md bg-secondary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                  <Calendar className="h-6 w-6 text-primary" />
                  Booking Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal ml-6">
                  <li className="text-lg text-muted-foreground">
                    Mentorship sessions are available Monday to Friday, 09:00 AM – 5:00 PM.
                  </li>
                  <li className="text-lg text-muted-foreground">
                    Each session lasts 30 minutes.
                  </li>
                  <li className="text-lg text-muted-foreground">
                    Click the “Book a Session” button to book a session.
                  </li>
                  <li className="text-lg text-muted-foreground">
                    Select an available time slot that fits your schedule.
                  </li>
                  <li className="text-lg text-muted-foreground">
                    You will receive a confirmation email with the session link.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="border-2 border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
            <CardHeader className="pb-6">
              <CardDescription className="text-xl max-w-2xl mx-auto">
                Connect with industry-trained mentors to accelerate your learning and career in pharmaceuticals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                
                size="lg"
                className="group bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-xl px-8 py-3"
              >
                <Users className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Upgrade your plan to Access Mentorship
              </Button>
              <p className="text-lg text-muted-foreground mt-3">
                Sessions available Mon-Fri, 10 AM - 6 PM
              </p>
            </CardContent>
          </Card>

          {/* Calendly Modal */}
          {isCalendlyOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
              <Card
                className={`w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out ${
                  isCalendlyOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              >
                <CardHeader className="relative border-b border-primary/10 bg-gradient-to-r from-primary/5 to-secondary/5 flex flex-col items-center justify-center text-center">
                  <CardTitle className="text-3xl font-bold">
                    Schedule Your Mentorship Session
                  </CardTitle>

                  <button
                    onClick={closeCalendly}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </CardHeader>

                <CardContent className="p-4">
                  <iframe
                    src="https://calendly.com/zaneproed/30min"
                    className="w-full h-[550px] border-0 rounded-md"
                    title="Calendly Booking"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          )}

          <style>{`
            .scrollbar-hidden {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hidden::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </main>
      </div>
    </div>
  );
}