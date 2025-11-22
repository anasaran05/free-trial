import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Home, BookOpen, Trophy, Award, Activity, Settings } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isDashboard = location.pathname === '/dashboard';

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: isDashboard },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Trophy, label: 'Learning Path', pro: true },
    { icon: Award, label: 'Achievements', pro: true },
    { icon: Activity, label: 'Activity Log', pro: true },
    { icon: Settings, label: 'Settings', pro: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
    >
      <nav className="theme-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group md:-ml-[2cm]"
          >
            <span className="font-heading font-semibold text-xl">
              ZANE <span style={{ color: '#ff0000' }}>ΩMEGA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant={isDashboard ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 font-medium"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>

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
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? 'default' : 'ghost'}
                  onClick={() => {
                    if (!item.pro && item.path) navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  disabled={item.pro}
                  className="flex items-center gap-2 justify-start"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.pro && (
                    <span className="text-red-700 text-xs font-semibold ml-auto">
                      PRO
                    </span>
                  )}
                </Button>
              ))}

              {/* Sign Out */}
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