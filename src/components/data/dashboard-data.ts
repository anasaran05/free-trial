
import { Home, BookOpen, Trophy, Award, Activity, Settings, Flame, Target, BarChart3, CheckCircle, Zap, BookOpen as BookIcon, TrendingUp, LucideIcon } from 'lucide-react';

export type NavItem = {
  icon: LucideIcon;
  label: string;
  active?: boolean; // only Dashboard has it
};

export const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: BookOpen, label: 'Courses' },
  { icon: Trophy, label: 'Learning Path' },
  { icon: Award, label: 'Achievements' },
  { icon: Activity, label: 'Activity Log' },
  { icon: Settings, label: 'Settings' },
];

export const weeklyActivityData = [
  { day: 'Mon', activity: 68 },
  { day: 'Tue', activity: 92 },
  { day: 'Wed', activity: 45 },
  { day: 'Thu', activity: 88 },
  { day: 'Fri', activity: 105 },
  { day: 'Sat', activity: 72 },
  { day: 'Sun', activity: 60 },
] as const;

export const xpBreakdownData = [
  { name: 'Analytics', value: 35, color: '#8b5cf6' },
  { name: 'AI Skills', value: 28, color: '#3b82f6' },
  { name: 'Simulations', value: 22, color: '#10b981' },
  { name: 'Decision Rooms', value: 15, color: '#f59e0b' },
] as const;

export const learningMomentumData = [
  { day: 1, momentum: 20 },
  { day: 2, momentum: 35 },
  { day: 3, momentum: 30 },
  { day: 4, momentum: 65 },
  { day: 5, momentum: 80 },
  { day: 6, momentum: 95 },
  { day: 7, momentum: 88 },
] as const;

export const coursesInProgress = [
  { title: 'Advanced Analytics Mastery', progress: 78, lessons: '24/32', color: 'bg-purple-500' },
  { title: 'AI-Powered Decision Making', progress: 62, lessons: '18/29', color: 'bg-blue-500' },
  { title: 'Strategic Simulation Lab', progress: 90, lessons: '36/40', color: 'bg-green-500' },
  { title: 'Leadership Decision Rooms', progress: 45, lessons: '12/27', color: 'bg-amber-500' },
] as const;

export const recentActivities = [
  { icon: CheckCircle, title: 'Completed Simulation', desc: 'Crisis Response Module', time: '2 hours ago', color: 'text-green-500' },
  { icon: Zap, title: 'Earned 250 XP', desc: 'Perfect score on Analytics Quiz', time: '5 hours ago', color: 'text-purple-500' },
  { icon: Trophy, title: 'Achievement Unlocked', desc: 'Speed Learner Badge', time: 'Yesterday', color: 'text-amber-500' },
  { icon: BookOpen, title: 'Finished Lesson', desc: 'Neural Networks Fundamentals', time: '2 days ago', color: 'text-blue-500' },
] as const;

export const recentAchievements = [
  { title: 'Speed Learner', desc: 'Complete 5 lessons in one day', icon: Flame },
  { title: 'Perfect Score', desc: '100% on 10+ quizzes', icon: Target },
  { title: 'Week Streak', desc: '7 days of consistent activity', icon: Trophy },
  { title: 'Master Analyst', desc: 'Top 1% in Analytics', icon: BarChart3 },
] as const;

// Fixed KPI typing – some have `change`, others have `sub`
export type KPIData = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
} & ({ sub: string } | { change: string });

export const kpiData: KPIData[] = [
  { label: 'XP Points', value: '12,450', change: '+1,240 this week', icon: Zap, iconColor: 'text-purple-500' },
  { label: 'Courses in Progress', value: '8', sub: '2 nearly complete', icon: BookOpen, iconColor: 'text-blue-500' },
  { label: 'Tasks Completed', value: '142', sub: '89% completion rate', icon: CheckCircle, iconColor: 'text-green-500' },
  { label: 'Weekly Activity', value: '94%', change: '↑ 12% from last week', icon: TrendingUp, iconColor: 'text-amber-500' },
];