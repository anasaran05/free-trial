// src/pages/Inbox.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import {
  Inbox,
  Search,
  Filter,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Paperclip,
  Star,
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: number;
  sender: string;
  senderAvatar: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: Date;
  isUnread: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
}

const ZANE_AVATAR =
  "https://static.wixstatic.com/media/6abdd9_db9fa4149984416cab10602a6c86c049~mv2.jpg";

export default function InboxPage() {
  const [displayName, setDisplayName] = useState("Student");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const email = typeof window !== "undefined"
    ? localStorage.getItem("omega_email")?.trim() || null
    : null;

  const createWelcomeMessage = (name: string, time: Date): Message => {
    const firstName = name.split(" ")[0] || "Student";

    return {
      id: 1,
      sender: "ZANE ProEd",
      senderAvatar: ZANE_AVATAR,
      subject: `Welcome to ZANE ProEd, ${firstName}`,
      preview: `Hi ${firstName}, we're excited to onboard you`,
      body: `
Hi ${firstName},👋🏻

Welcome to ZANE ProEd.

You’re now part of a performance-driven education ecosystem designed to develop real-world competencies, industry readiness, and portfolio-worthy outcomes.

Your access credentials have been activated. Explore at your pace. Our system will progressively unlock divisions, cohorts, and growth paths aligned to your performance.

Team ZANE ProEd
      `.trim(),
      timestamp: time,
      isUnread: true,
      isStarred: true,
      hasAttachment: false,
    };
  };

  useEffect(() => {
    const loadInbox = async () => {
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("email", email)
          .single();

        let finalName =
          profile?.full_name?.trim() ||
          email.split("@")[0].charAt(0).toUpperCase() +
            email.split("@")[0].slice(1);

        setDisplayName(finalName);

        const { data: formData } = await supabase
          .from("form_users")
          .select("created_at")
          .eq("email", email)
          .single();

        let inserted = formData?.created_at
          ? new Date(formData.created_at)
          : new Date();

        const messageTime = new Date(inserted.getTime() + 60 * 1000);

        const inboxMessage = createWelcomeMessage(finalName, messageTime);
        setMessages([inboxMessage]);
        setSelectedMessage(inboxMessage);
      } finally {
        setLoading(false);
      }
    };

    loadInbox();
  }, [email]);

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading your inbox...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border px-6 py-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Inbox className="w-7 h-7 text-primary" />
              <h1 className="text-2xl font-bold">Inbox</h1>
              <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {messages.filter(m => m.isUnread).length} unread
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-64"
                />
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-full lg:w-2/5 border-r border-border overflow-y-auto bg-background">
            {messages.map(message => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`px-6 py-4 border-b border-border cursor-pointer transition-all
                  ${selectedMessage?.id === message.id ? "bg-muted/70" : "hover:bg-muted/30"}
                  ${message.isUnread ? "font-medium" : ""}
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={message.senderAvatar}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-foreground">{message.sender}</p>
                      <p className="font-medium text-foreground truncate">{message.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-muted-foreground shrink-0">
                    <div>{format(message.timestamp, "MMM d")}</div>
                    <div className="flex gap-1 mt-2 justify-end">
                      {message.hasAttachment && <Paperclip className="w-4 h-4" />}
                      {message.isStarred && (
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedMessage && (
            <div className="hidden lg:flex flex-col flex-1 bg-card">
              <div className="border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedMessage.senderAvatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.sender} ·{" "}
                      {format(selectedMessage.timestamp, "MMMM d, yyyy ⋅ h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
               
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto">
                <div className="prose prose-invert whitespace-pre-line text-sm leading-relaxed">
                  {selectedMessage.body}
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedMessage && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background flex flex-col">
            <div className="border-b border-border p-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-primary font-medium"
              >
                ← Inbox
              </button>
              <div className="flex gap-4">
                <Reply className="w-5 h-5 text-muted-foreground" />
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
              <p className="text-muted-foreground mb-8">
                {selectedMessage.sender} ·{" "}
                {format(selectedMessage.timestamp, "MMM d, yyyy ⋅ h:mm a")}
              </p>
              <div className="prose prose-invert whitespace-pre-line text-sm leading-relaxed">
                {selectedMessage.body}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}