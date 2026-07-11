import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Shield, Palette, 
  Check, Save, Globe, Clock, Keyboard
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

export const Settings: React.FC = () => {
  const { toast } = useToast();

  // Profile Mock State
  const [name, setName] = useState('Vagisha S.');
  const [email, setEmail] = useState('vagisha@notionix.com');

  // Preferences Mock State
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('PST (UTC-8)');

  // Notification Toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [aiSchedulingNotif, setAiSchedulingNotif] = useState(true);

  // Security Toggles
  const [bioLock, setBioLock] = useState(false);
  const [autoEncrypt, setAutoEncrypt] = useState(true);

  // Active section scroll simulator / click handlers
  const [activeSection, setActiveSection] = useState<'profile' | 'pref' | 'notif' | 'security' | 'shortcuts'>('profile');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Profile Saved', 'User information updated successfully.', 'success');
  };

  const handleSavePreferences = () => {
    toast('Preferences Updated', `Language set to ${language} and timezone to ${timeZone}.`, 'success');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border pb-5">
        <SettingsIcon className="w-6 h-6 text-brand" />
        <h1 className="text-xl md:text-2xl font-display font-extrabold text-text">Workspace Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="flex flex-col gap-1 text-left select-none">
          <button 
            onClick={() => setActiveSection('profile')}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-apple-md text-sm font-semibold transition-all border",
              activeSection === 'profile'
                ? "text-brand bg-brand/5 border-brand/10 shadow-sm"
                : "text-text-muted hover:text-text hover:bg-border/10 border-transparent"
            )}
          >
            <User className="w-4.5 h-4.5" />
            <span>Profile Details</span>
          </button>
          
          <button 
            onClick={() => setActiveSection('pref')}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-apple-md text-sm font-semibold transition-all border",
              activeSection === 'pref'
                ? "text-brand bg-brand/5 border-brand/10 shadow-sm"
                : "text-text-muted hover:text-text hover:bg-border/10 border-transparent"
            )}
          >
            <Palette className="w-4.5 h-4.5" />
            <span>Preferences & Accent</span>
          </button>

          <button 
            onClick={() => setActiveSection('notif')}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-apple-md text-sm font-semibold transition-all border",
              activeSection === 'notif'
                ? "text-brand bg-brand/5 border-brand/10 shadow-sm"
                : "text-text-muted hover:text-text hover:bg-border/10 border-transparent"
            )}
          >
            <Bell className="w-4.5 h-4.5" />
            <span>Notifications</span>
          </button>

          <button 
            onClick={() => setActiveSection('security')}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-apple-md text-sm font-semibold transition-all border",
              activeSection === 'security'
                ? "text-brand bg-brand/5 border-brand/10 shadow-sm"
                : "text-text-muted hover:text-text hover:bg-border/10 border-transparent"
            )}
          >
            <Shield className="w-4.5 h-4.5" />
            <span>Passphrase & Security</span>
          </button>

          <button 
            onClick={() => setActiveSection('shortcuts')}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-apple-md text-sm font-semibold transition-all border",
              activeSection === 'shortcuts'
                ? "text-brand bg-brand/5 border-brand/10 shadow-sm"
                : "text-text-muted hover:text-text hover:bg-border/10 border-transparent"
            )}
          >
            <Keyboard className="w-4.5 h-4.5" />
            <span>Keyboard Shortcuts</span>
          </button>
        </div>

        {/* Settings panels contents */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* 1. Profile form */}
          {activeSection === 'profile' && (
            <Card padding="md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-1.5 select-none">
                <User className="w-4 h-4 text-brand" />
                <span>General Profile</span>
              </h3>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="User Avatar" 
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-brand/10"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-text">{name}</h4>
                    <button 
                      type="button"
                      onClick={() => toast('Avatar Upload', 'Simulated avatar picker opening.', 'info')}
                      className="text-xs text-brand hover:underline font-semibold mt-1"
                    >
                      Change photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <Button type="submit" className="h-10 text-xs px-4 flex gap-1.5 items-center">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* 2. Preferences & Accent Selection */}
          {activeSection === 'pref' && (
            <Card padding="md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-5 flex items-center gap-1.5 select-none">
                <Palette className="w-4 h-4 text-brand" />
                <span>Workspace Preferences</span>
              </h3>

              <div className="flex flex-col gap-5">
                {/* Accent Color Display */}
                <div className="flex flex-col gap-2 border-b border-border/40 pb-4">
                  <div>
                    <h4 className="text-xs font-bold text-text">Theme Accent Color</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Define workspace highlights (Purple is active for light theme)</p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1 select-none">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-text bg-[#5B4DFF] text-white scale-102 ring-4 ring-brand/10 shadow-sm"
                      title="Purple Premium Accent"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-semibold text-text">Royal Purple (#5B4DFF)</span>
                  </div>
                </div>

                {/* Language Select dropdown */}
                <div className="flex flex-col gap-2 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Globe className="w-4 h-4 text-text-muted" />
                    <label className="text-xs font-bold text-text">Display Language</label>
                  </div>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-panel border border-border text-xs rounded-apple-md px-3 h-10 outline-none focus:border-brand/80"
                  >
                    <option value="English">English (United States)</option>
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="French">French (Français)</option>
                    <option value="Japanese">Japanese (日本語)</option>
                  </select>
                </div>

                {/* Time Zone Select dropdown */}
                <div className="flex flex-col gap-2 pb-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-4 h-4 text-text-muted" />
                    <label className="text-xs font-bold text-text">Time Zone</label>
                  </div>
                  <select 
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full bg-panel border border-border text-xs rounded-apple-md px-3 h-10 outline-none focus:border-brand/80"
                  >
                    <option value="PST (UTC-8)">Pacific Standard Time (PST - UTC-8)</option>
                    <option value="EST (UTC-5)">Eastern Standard Time (EST - UTC-5)</option>
                    <option value="GMT (UTC+0)">Greenwich Mean Time (GMT - UTC+0)</option>
                    <option value="IST (UTC+5:30)">Indian Standard Time (IST - UTC+5:30)</option>
                  </select>
                </div>

                <div className="flex justify-end pt-3 border-t border-border/40">
                  <Button onClick={handleSavePreferences} className="h-10 text-xs px-4">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* 3. Notifications Preferences */}
          {activeSection === 'notif' && (
            <Card padding="md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-1.5 select-none">
                <Bell className="w-4 h-4 text-brand" />
                <span>Notification Settings</span>
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-text">Email Summaries</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Receive daily mood highlights and task updates</p>
                  </div>
                  <Toggle checked={emailNotif} onChange={setEmailNotif} />
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <div>
                    <h4 className="text-xs font-bold text-text">AI Smart Rescheduling Alerts</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Get suggestions for focus times matching calendar slots</p>
                  </div>
                  <Toggle checked={aiSchedulingNotif} onChange={setAiSchedulingNotif} />
                </div>
              </div>
            </Card>
          )}

          {/* 4. Security & Password */}
          {activeSection === 'security' && (
            <Card padding="md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-1.5 select-none">
                <Shield className="w-4 h-4 text-brand" />
                <span>Encryption & Credentials</span>
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-text">Note Auto-Encryption</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Locks encrypted notes automatically after 2m idle</p>
                  </div>
                  <Toggle checked={autoEncrypt} onChange={setAutoEncrypt} />
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <div>
                    <h4 className="text-xs font-bold text-text">Biometric Simulation Passphrase</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Support webauthn simulation locks on encrypted folders</p>
                  </div>
                  <Toggle checked={bioLock} onChange={setBioLock} />
                </div>
              </div>
            </Card>
          )}

          {/* 5. Keyboard Shortcuts Table */}
          {activeSection === 'shortcuts' && (
            <Card padding="md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-1.5 select-none">
                <Keyboard className="w-4 h-4 text-brand" />
                <span>Keyboard Shortcuts</span>
              </h3>
              
              <div className="overflow-x-auto select-none">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-text-muted font-bold text-[10px] uppercase">
                      <th className="py-2.5">Action</th>
                      <th className="py-2.5 text-right">Shortcut Combination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-text font-semibold">
                    <tr>
                      <td className="py-2.5">Open Global Search / Command Palette</td>
                      <td className="py-2.5 text-right">
                        <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">⌘ K</kbd> or <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">Ctrl + K</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5">Save Current Document</td>
                      <td className="py-2.5 text-right">
                        <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">⌘ S</kbd> or <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">Ctrl + S</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5">Create A New Note</td>
                      <td className="py-2.5 text-right">
                        <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">⌘ N</kbd> or <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">Ctrl + N</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5">Navigate Sidebar Toggles</td>
                      <td className="py-2.5 text-right">
                        <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">⌘ \</kbd> or <kbd className="px-1.5 py-0.5 bg-bg-light border border-border rounded text-[10px] shadow-sm">Ctrl + \</kbd>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        </div>
      </div>

    </div>
  );
};
