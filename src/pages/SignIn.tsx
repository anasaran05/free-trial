import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Cubes from '@/components/Reactbits/Cubes';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: supabaseError } = await supabase
        .from('form_users')
        .select('email')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle(); // Use maybeSingle() to avoid error when no row is found

      // If email is found → grant access
      if (data) {
        localStorage.setItem('omega_access', 'yes');
        localStorage.setItem('omega_email', email.trim().toLowerCase());
        navigate('/dashboard');
      } else {
        // Email not found → show helpful message
setError('We could not find this email in our system. Please verify the address entered.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-3xl">Ω</span>
              </div>
              <span className="text-2xl font-semibold tracking-tight">ZANE ΩMEGA</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Access the Platform</h1>
            <p className="text-muted-foreground">
              Enter the email you used in the onboarding form
            </p>
          </div>

          <form onSubmit={handleAccess} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {error}
                  
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="pl-10 h-11 bg-background border-input"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-base font-medium">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Didn’t receive access yet?
            <br />
            <a
              href="https://tally.so/r/RGG88K"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Join the waitlist / Fill the form →
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/5 via-primary/3 to-background overflow-hidden">
        <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
          <Cubes
            gridSize={8}
            maxAngle={60}
            radius={4}
            borderStyle="8px dashed #b4a6a9ff"
            faceColor="#9e2c2cff"
            rippleColor="#000000ff"
            rippleSpeed={1.5}
            autoAnimate={true}
            rippleOnClick={true}
          />
        </div>
      </div>
    </div>
  );
}