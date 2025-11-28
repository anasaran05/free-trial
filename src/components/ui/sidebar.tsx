import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LibraryBig,
  Home,
  User,
  Headset,
  Wrench,
  User2,
  Calendar,
  LayoutDashboard,
  Inbox,
  PanelLeftOpen,
  PanelLeftClose,
  PanelLeftDashed,
  Boxes
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', isActive: location.pathname === '/dashboard' },
    { icon: LibraryBig, label: 'Courses', href: '/courses', isActive: location.pathname.startsWith('/courses') },
    { icon: Boxes, label: 'Playground', href: '/playground', isActive: location.pathname.startsWith('/playground') },
    { icon: User, label: 'Profile', href: '/profile', isActive: location.pathname === '/profile' },
    { icon: Wrench, label: 'Tools', href: '/tools', isActive: location.pathname === '/tools' },
    { icon: Inbox, label: 'Inbox', href: '/inbox', isActive: location.pathname === '/inbox' },
    { icon: Calendar, label: 'Mentorship', href: '/mentorship', isActive: location.pathname === '/mentorship' },
    { icon: Headset, label: 'Help Desk', href: '/helpdesk', isActive: location.pathname === '/helpdesk' },
    
  ];

  return (
    <div
      className={`hidden md:block sticky top-0 h-screen 
        border-r border-border bg-background p-4 space-y-4
        transition-all duration-300 
        ${collapsed ? 'w-20' : 'w-64'}`}
    >

      <div className="relative h-8">
  <button
    onClick={() => setCollapsed(!collapsed)}
    className="absolute right-0 top-0 text-muted-foreground hover:text-foreground p-1 group"
  >
    {collapsed ? (
      <div className="transition-all duration-300">
        <PanelLeftDashed className="w-5 h-5 group-hover:hidden" />
        <PanelLeftOpen className="w-5 h-5 hidden group-hover:block" />
      </div>
    ) : (
      <PanelLeftClose className="w-5 h-5 transition-all duration-300" />
    )}
  </button>
</div>

      {!collapsed && <div className="pr-6 mt-8"></div>}

      <div className="space-y-1 mt-14">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

         
          return (
            <Link
  key={item.label}
  to={item.href}
  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
    ${item.isActive
      ? 'bg-primary text-primary-foreground shadow-md'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }`}
>
  <Icon className="w-5 h-5" />
  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
</Link>
          );
        })}
      </div>
    </div>
  );
}