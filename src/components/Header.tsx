import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ← added useLocation
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';   // ← added LayoutDashboard icon
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ← to detect current route

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Helper to check if we're on the dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
    >
      <nav className="theme-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/courses" 
            className="flex items-center space-x-2 group md:-ml-[2cm]"
          >
            <span className="font-heading font-semibold text-xl">
              ZANE <span style={{ color: '#ff0000' }}>ΩMEGA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dashboard Button */}
            <Button
              variant={isDashboard ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 font-medium"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>

            {/* Sign Out Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-surface-elevated transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-3">
              {/* Dashboard in Mobile */}
              <Button
                variant={isDashboard ? 'default' : 'ghost'}
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false); // close menu after click
                }}
                className="flex items-center gap-2 justify-start font-medium"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}