import React, { useState } from 'react';
import Sidebar from '@/components/sidebar'; 
import Header from '@/components/Header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Phone } from 'lucide-react';


export default function HelpDeskPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919342205876', '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919342205876';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.location.href = `mailto:support@zaneproed.com?subject=Support Request&body=${encodeURIComponent(body)}`;
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-8">
          {/* Main Content Grid: Common Issues and Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Get Fast Support and Quick Contacts */}
            <div className="space-y-6 flex flex-col items-center justify-center">
              {/* Hero Section - Dark Gradient */}
              <div className="text-center py-12 bg-muted/50 rounded-xl border border-border w-full">
                <HelpCircle className="h-20 w-20 text-primary mx-auto mb-4 drop-shadow-lg" />
                <h1 className="text-4xl font-bold text-white">Get Fast Support</h1>
              </div>

              {/* Quick Contacts Grid - Horizontal Layout */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <Card className="bg-muted shadow-lg border border-border flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-xl transition-shadow" >
                  <img src="https://img.icons8.com/color/480/whatsapp--v1.png" alt="WhatsApp" className="h-10 w-10 mb-2" />
                  <div className="text-center">
                    <h3 className="text-base font-medium text-foreground">WhatsApp</h3>
                  </div>
                </Card>
                <Card className="bg-muted shadow-lg border border-border flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-xl transition-shadow" >
                  <Phone className="h-10 w-10 text-blue-500 mb-2" />
                  <div className="text-center">
                    <h3 className="text-base font-medium text-foreground">Call Us</h3>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <div className="bg-muted rounded-xl p-6 border border-border shadow-xl">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">We're here to help</h2>
                <div onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full p-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. example@gmail.com"
                      className="w-full p-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let us know how we can help"
                      rows={4}
                      className="w-full p-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 resize-none"
                      required
                    ></textarea>
                  </div>
                  <Button
                    
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Upgrade 
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Styles */}
          <style >{`
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .scrollbar-hidden {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .scrollbar-hidden::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
        </main>
  
      </div>

    </div>

  );
}