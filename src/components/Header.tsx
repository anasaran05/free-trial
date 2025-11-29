'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  LibraryBig,
  User,
  Wrench,
  Inbox,
  Calendar,
  Headset,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const hasAccess = localStorage.getItem('omega_access') === 'yes';
  const userEmail = localStorage.getItem('omega_email')?.trim().toLowerCase() || '';

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail || !hasAccess) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('email', userEmail)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setUserName(data.full_name || userEmail.split('@')[0]);
          setAvatarUrl(data.avatar_url || null);
        } else {
          setUserName(userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1));
        }
      } catch (err) {
        console.error('Failed to load user profile:', err);
        setUserName(userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail, hasAccess]);

  const handleSignOut = () => {
    localStorage.removeItem('omega_access');
    localStorage.removeItem('omega_email');
    sessionStorage.clear();
    navigate('/');
  };

  if (!hasAccess && location.pathname !== '/') return null;

  const fullNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: LibraryBig, label: 'Courses', href: '/courses' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Wrench, label: 'Tools', href: '/tools' },
    { icon: Inbox, label: 'Inbox', href: '/inbox' },
    { icon: Calendar, label: 'Mentorship', href: '/mentorship' },
    { icon: Headset, label: 'Help Desk', href: '/helpdesk' },
  ];

  const currentPath = location.pathname;

  const getInitials = (name: string) =>
    name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/10 backdrop-blur-sm border-b border-border ${className}`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Logo — flush to the left corner */}
         <Link
  to="/"
  className="flex items-center flex-shrink-0 ml-2 sm:ml-3"
>
  <span className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl">
              ZANE <span style={{ color: "#ff0000" }}>ΩMEGA</span>
            </span>
</Link>

          {/* Desktop: Only Profile + Avatar (minimal) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Optional: You can show a small Dashboard link like the reference */}
           

            {/* Profile Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="font-medium text-foreground text-sm">
                  {loading ? '...' : userName.split(' ')[0]}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                      {avatarUrl ? <AvatarImage src={avatarUrl} alt={userName} /> : null}
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-sm">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-72 mr-4" sideOffset={8}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userName}</p>
                        <p className="text-xs text-muted-foreground">{userEmail}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-3 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 font-medium">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 space-y-2">
              {/* Full Navigation */}
              {fullNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href || currentPath.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-muted/70'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Profile Section */}
              <div className="border-t border-border pt-3 mt-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-muted/40 rounded-lg">
                  <Avatar className="h-10 w-10">
                    {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full mt-3 flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}