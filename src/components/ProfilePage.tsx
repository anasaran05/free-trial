// ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/ui/sidebar';

import {
  User, Mail, Phone, Calendar, Save, Edit3, AlertCircle, CheckCircle,
  Briefcase, Building2, Stethoscope, Linkedin, Award,
} from 'lucide-react';

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  "https://api.dicebear.com/7.x/micah/svg?seed=Alex",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Bot",
  "https://api.dicebear.com/7.x/personas/svg?seed=Max",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=Cool",
  "https://api.dicebear.com/7.x/identicon/svg?seed=User123",

  "https://api.dicebear.com/7.x/avataaars/svg?seed=Neo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost",
  "https://api.dicebear.com/7.x/micah/svg?seed=Pixel",
  "https://api.dicebear.com/7.x/micah/svg?seed=Nova",
  "https://api.dicebear.com/7.x/micah/svg?seed=Rex",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Cypher",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Alpha",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Omega",
  "https://api.dicebear.com/7.x/personas/svg?seed=Zane",
  "https://api.dicebear.com/7.x/personas/svg?seed=Eden",
  "https://api.dicebear.com/7.x/personas/svg?seed=Juno",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=Tech",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=Fire",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=Blade",
  "https://api.dicebear.com/7.x/identicon/svg?seed=Matrix01",
  "https://api.dicebear.com/7.x/identicon/svg?seed=Phoenix",
  "https://api.dicebear.com/7.x/identicon/svg?seed=Aether"
];

const YEARS_OPTIONS = ["<1 year", "1–2 years", "2–5 years", "5–10 years", "10+ years"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('omega_email')?.toLowerCase();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    full_name: '',
    email: userEmail || '',
    phone_number: '',
    date_of_birth: '',
    avatar_url: AVATAR_OPTIONS[0],
    created_at: '',
    professional_title: '',
    institution: '',
    years_experience: '',
    specialization: '',
    linked_in: '',
  });

  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  useEffect(() => {
    if (!userEmail) {
      navigate('/');
      return;
    }

    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', userEmail)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setProfile(data);
          setSelectedAvatar(data.avatar_url || AVATAR_OPTIONS[0]);
        }
      } catch (err) {
        console.error('Load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userEmail, navigate]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          email: userEmail,
          full_name: profile.full_name?.trim() || null,
          phone_number: profile.phone_number || null,
          date_of_birth: profile.date_of_birth || null,
          avatar_url: selectedAvatar,
          professional_title: profile.professional_title || null,
          institution: profile.institution || null,
          years_experience: profile.years_experience || null,
          specialization: profile.specialization || null,
          linked_in: profile.linked_in || null,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 lg:p-10">
          <div className="max-w-5xl mx-auto">

            {success && (
              <Card className="border-green-500 bg-green-50 dark:bg-green-900/10 mb-6">
                <CardContent className="p-4 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>{success}</span>
                </CardContent>
              </Card>
            )}
            {error && (
              <Card className="border-destructive bg-destructive/5 mb-6">
                <CardContent className="p-4 flex items-center gap-3 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </CardContent>
              </Card>
            )}

            {/* Hero Header */}
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
              <div className="px-8 pb-10 -mt-20">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                  <Avatar className="h-36 w-36 ring-8 ring-background shadow-2xl">
                    <AvatarImage src={selectedAvatar} />
                    <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white">
                      {profile.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left flex-1">
                    <h1 className="text-4xl font-bold">{profile.full_name || 'Your Name'}</h1>
                    {profile.professional_title && (
                      <p className="text-xl text-primary mt-1 flex items-center gap-2 justify-center sm:justify-start">
                        <Briefcase className="w-5 h-5" />
                        {profile.professional_title}
                      </p>
                    )}
                    <p className="text-muted-foreground text-lg">{userEmail}</p>
                  </div>
                  <Button size="lg" onClick={() => setIsEditing(!isEditing)}>
                    <Edit3 className="w-5 h-5 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </Card>

            {isEditing ? (
              /* === EDIT MODE === */
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader><CardTitle>Profile Picture</CardTitle></CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-6 gap-3">
                        {AVATAR_OPTIONS.map(url => (
                          <button key={url} onClick={() => setSelectedAvatar(url)}
                            className={`rounded-full overflow-hidden border-4 transition-all ${selectedAvatar === url ? 'border-primary ring-4 ring-primary/30' : 'border-transparent'}`}>
                            <img src={url} alt="Avatar" className="w-20 h-20" />
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Edit Details</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input value={profile.full_name || ''} onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Professional Title</Label>
                          <Input value={profile.professional_title || ''} onChange={e => setProfile(p => ({ ...p, professional_title: e.target.value }))} placeholder="e.g. Clinical Research Associate" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Institute / Company</Label>
                          <Input value={profile.institution || ''} onChange={e => setProfile(p => ({ ...p, institution: e.target.value }))} placeholder="e.g. Apollo Hospitals" />
                        </div>
                        <div className="space-y-2">
                          <Label>Years of Experience</Label>
                          <Select value={profile.years_experience || ''} onValueChange={val => setProfile(p => ({ ...p, years_experience: val }))}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {YEARS_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Specialization (free text)</Label>
                          <Input
                            value={profile.specialization || ''}
                            onChange={e => setProfile(p => ({ ...p, specialization: e.target.value }))}
                            placeholder="e.g. Oncology, Pharmacovigilance"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>LinkedIn (optional)</Label>
                          <Input value={profile.linked_in || ''} onChange={e => setProfile(p => ({ ...p, linked_in: e.target.value }))} placeholder="linkedin.com/in/username" />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} disabled={saving} size="lg">
                          {saving ? 'Saving...' : <>Save Changes</>}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* === VIEW MODE === */
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Professional Info */}
                  {(profile.professional_title || profile.institution || profile.years_experience || profile.specialization) && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5" />
                          Professional Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {profile.professional_title && (
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-primary" />
                            <span className="font-medium">{profile.professional_title}</span>
                          </div>
                        )}
                        {profile.institution && (
                          <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                            <span>{profile.institution}</span>
                          </div>
                        )}
                        {profile.years_experience && (
                          <div className="flex items-center gap-3">
                            <Stethoscope className="w-5 h-5 text-muted-foreground" />
                            <span>{profile.years_experience} of experience</span>
                          </div>
                        )}
                        {profile.specialization && (
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-sm">
                              {profile.specialization}
                            </Badge>
                          </div>
                        )}
                        {profile.linked_in && (
                          <div className="flex items-center gap-3">
                            <Linkedin className="w-5 h-5 text-blue-600" />
                            <a href={profile.linked_in} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              View LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Contact & Account — NOW ON TOP */}
                  
                </div>

                {/* Right Column — Level Card BELOW */}
                <div className="space-y-6 ">
                 <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Contact & Account
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span>{userEmail}</span>
                      </div>
                      {profile.phone_number && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.phone_number}</span>
                        </div>
                      )}
                      {profile.date_of_birth && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <span>Born {format(new Date(profile.date_of_birth), 'MMMM d, yyyy')}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span>Member since {profile.created_at ? format(new Date(profile.created_at), 'MMMM yyyy') : '—'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}