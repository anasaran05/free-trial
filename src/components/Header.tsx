import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Trophy, Award, Activity, Settings } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: Track if user has access (to conditionally render header or parts)
  const hasAccess = localStorage.getItem('omega_access') === 'yes';

  const handleSignOut = () => {
    // Clear your custom access flags
    localStorage.removeItem('omega_access');
    localStorage.removeItem('omega_email');

    // Redirect to home/login
    navigate('/');
    setMobileMenuOpen(false);
  };

  // If no access, don't render the full header (or redirect early)
  // You can also move this check higher up in a layout/route guard
  if (!hasAccess && location.pathname !== '/') {
    return null; // or a minimal header, or redirect
  }

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
      className={`sticky top-0 z-50 bg-background/10 backdrop-blur-sm border-b border-border ${className}`}
    >
      <nav className="theme-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group md:-ml-[2cm]">
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
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                    if (!item.pro && item.path) {
                      navigate(item.path);
                    }
                    setMobileMenuOpen(false);
                  }}
                  disabled={item.pro}
                  className="flex items-center gap-2 justify-start w-full"
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

              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="flex items-center gap-2 justify-start w-full text-red-600"
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