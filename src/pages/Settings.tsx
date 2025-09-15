import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Bell, Volume2, Palette, Download, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useMusicStore } from '@/store/musicStore';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { playback: { volume }, setVolume } = useMusicStore();
  
  const [profile, setProfile] = useState({
    name: 'Music Lover',
    email: 'user@vibeme.com',
    avatar: '/placeholder.svg'
  });

  const [notifications, setNotifications] = useState({
    newReleases: true,
    playlistUpdates: true,
    recommendations: false,
    social: true
  });

  const [audio, setAudio] = useState({
    quality: 'high',
    crossfade: 3,
    equalizer: false,
    loudness: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    compactMode: false,
    showNowPlaying: true,
    animations: true
  });

  const settingsCategories = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
      description: 'Manage your account information'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences'
    },
    {
      id: 'audio',
      title: 'Audio Quality',
      icon: Volume2,
      description: 'Adjust audio and playback settings'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the app appearance'
    },
    {
      id: 'downloads',
      title: 'Downloads',
      icon: Download,
      description: 'Manage offline content'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy settings'
    }
  ];

  const [activeCategory, setActiveCategory] = useState('profile');

  const renderProfileSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">Change Photo</Button>
              <Button variant="ghost" size="sm" className="text-destructive">Remove Photo</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="glass"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="gradient-text">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, [key]: checked })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAudioSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Audio & Playback</CardTitle>
          <CardDescription>Configure audio quality and playback options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Volume</Label>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">{volume}%</div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Crossfade</Label>
                <p className="text-sm text-muted-foreground">Smooth transitions between tracks</p>
              </div>
              <Switch
                checked={audio.crossfade > 0}
                onCheckedChange={(checked) => 
                  setAudio({ ...audio, crossfade: checked ? 3 : 0 })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Equalizer</Label>
                <p className="text-sm text-muted-foreground">Enhanced audio processing</p>
              </div>
              <Switch
                checked={audio.equalizer}
                onCheckedChange={(checked) => 
                  setAudio({ ...audio, equalizer: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Loudness Normalization</Label>
                <p className="text-sm text-muted-foreground">Consistent volume levels</p>
              </div>
              <Switch
                checked={audio.loudness}
                onCheckedChange={(checked) => 
                  setAudio({ ...audio, loudness: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAppearanceSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how Vibe Me looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">More content in less space</p>
            </div>
            <Switch
              checked={appearance.compactMode}
              onCheckedChange={(checked) => 
                setAppearance({ ...appearance, compactMode: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Now Playing Bar</Label>
              <p className="text-sm text-muted-foreground">Display current track at bottom</p>
            </div>
            <Switch
              checked={appearance.showNowPlaying}
              onCheckedChange={(checked) => 
                setAppearance({ ...appearance, showNowPlaying: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Smooth Animations</Label>
              <p className="text-sm text-muted-foreground">Enable transitions and effects</p>
            </div>
            <Switch
              checked={appearance.animations}
              onCheckedChange={(checked) => 
                setAppearance({ ...appearance, animations: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'audio':
        return renderAudioSettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Settings for {activeCategory} coming soon!</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="hover:bg-card-hover"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground">Customize your Vibe Me experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="space-y-1 p-4">
                {settingsCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      activeCategory === category.id 
                        ? 'bg-primary/20 text-primary border-primary/30' 
                        : 'hover:bg-card-hover'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium">{category.title}</div>
                    </div>
                  </Button>
                ))}
                
                <Separator className="my-4" />
                
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:bg-destructive/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;