import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/dashboard');
    };
    checkAuth();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Success - redirect to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-heading font-bold text-foreground">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSignIn}>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full"
              />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}