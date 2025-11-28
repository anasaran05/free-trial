// src/pages/Inbox.tsx  (or .tsx)
import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import { Inbox, Search, Filter, Archive, Trash2, Reply, Forward, MoreVertical, Paperclip, Star } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: Date;
  isUnread: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Sarah Chen',
    subject: 'Welcome to your mentorship program!',
    preview: 'We are excited to have you onboard. Your first session with Alex is scheduled...',
    timestamp: new Date('2025-11-28T10:30:00'),
    isUnread: true,
    isStarred: true,
    hasAttachment: false,
  },
  {
    id: 2,
    sender: 'Alex Rivera',
    subject: 'Feedback on your Project Milestone #3',
    preview: 'Great progress! I reviewed your submission and left detailed comments...',
    timestamp: new Date('2025-11-27T16:45:00'),
    isUnread: true,
    isStarred: false,
    hasAttachment: true,
  },
  {
    id: 3,
    sender: 'Course Bot',
    subject: 'New lesson available: Advanced React Patterns',
    preview: 'The next lesson in your Full-Stack Mastery path is now live!',
    timestamp: new Date('2025-11-26T09:00:00'),
    isUnread: false,
    isStarred: false,
    hasAttachment: false,
  },
  {
    id: 4,
    sender: 'Community Team',
    subject: 'You earned the "Early Bird" badge!',
    preview: 'Congratulations! You completed 5 lessons before the deadline',
    timestamp: new Date('2025-11-25T14:20:00'),
    isUnread: false,
    isStarred: true,
    hasAttachment: false,
  },
];

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Your Existing Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border px-6 py-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Inbox className="w-7 h-7 text-primary" />
              <h1 className="text-2xl font-bold">Inbox</h1>
              <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {mockMessages.filter(m => m.isUnread).length} unread
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
                <Filter className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Message List */}
          <div className="w-full lg:w-2/5 border-r border-border overflow-y-auto bg-background">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`px-6 py-4 border-b border-border cursor-pointer transition-all
                  ${selectedMessage?.id === message.id ? 'bg-muted/70' : 'hover:bg-muted/30'}
                  ${message.isUnread ? 'font-medium' : ''}
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`truncate text-sm ${message.isUnread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {message.sender}
                        </p>
                        {message.isUnread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                      <p className="font-medium text-foreground truncate">{message.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-muted-foreground shrink-0">
                    <div>{format(message.timestamp, 'MMM d')}</div>
                    <div className="flex gap-1 mt-2 justify-end">
                      {message.hasAttachment && <Paperclip className="w-4 h-4" />}
                      {message.isStarred && <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail Pane - Desktop */}
          {selectedMessage && (
            <div className="hidden lg:flex flex-col flex-1 bg-card">
              <div className="border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-lg font-semibold">
                    {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.sender} · {format(selectedMessage.timestamp, 'MMMM d, yyyy ⋅ h:mm a')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg"><Reply className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-muted rounded-lg"><Forward className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-muted rounded-lg"><Archive className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-muted rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-muted rounded-lg"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p>Hi there,</p>
                  <br />
                  <p>{selectedMessage.preview}</p>
                  <br />
                  <p>This is the full message view. In production, you'd load the complete content here — including rich text, images, links, and reply threads.</p>
                  <br />
                  <p>Best regards,<br />{selectedMessage.sender.split(' ')[0]}</p>
                </div>

                {selectedMessage.hasAttachment && (
                  <div className="mt-10 p-6 bg-muted/50 border border-border rounded-xl">
                    <Paperclip className="w-5 h-5 inline mr-2" />
                    <span className="font-medium">1 attachment</span>
                    <div className="mt-4 flex items-center gap-4 p-4 bg-background rounded-lg border border-dashed border-border">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Paperclip className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">project-feedback.pdf</p>
                        <p className="text-sm text-muted-foreground">2.4 MB • PDF</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Full-Screen Message View */}
        {selectedMessage && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background flex flex-col">
            <div className="border-b border-border p-4 flex items-center justify-between">
              <button onClick={() => setSelectedMessage(null)} className="text-primary font-medium">
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
                {selectedMessage.sender} · {format(selectedMessage.timestamp, 'MMM d, yyyy ⋅ h:mm a')}
              </p>
              <div className="prose prose-invert">
                <p>{selectedMessage.preview}</p>
                <br />
                <p>Full message content appears here on mobile.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}