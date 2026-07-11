import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, ArrowRight, Github, Chrome, ChevronLeft
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

type Mode = 'login' | 'signup' | 'forgot';

export const Auth: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login') {
        toast('Welcome back!', 'Successfully authenticated.', 'success');
        navigate('/app/dashboard');
      } else if (mode === 'signup') {
        if (!agreeTerms) {
          toast('Terms required', 'You must agree to the Terms of Service.', 'warning');
          return;
        }
        toast('Account created!', 'Welcome to Notionix. Redirecting...', 'success');
        navigate('/app/dashboard');
      } else {
        toast('Reset email sent', `Password recovery details sent to ${email}`, 'success');
        setMode('login');
      }
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    setIsLoading(true);
    toast(`${platform} Authentication`, 'Simulating OAuth handshakes...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      toast('Login Successful', `Connected via ${platform}.`, 'success');
      navigate('/app/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg relative overflow-hidden p-4">
      {/* Decorative ambient blur background spots */}
      <div className="absolute w-[400px] h-[400px] bg-brand/10 rounded-full filter blur-[120px] top-10 left-10" />
      <div className="absolute w-[350px] h-[350px] bg-brand-secondary/10 rounded-full filter blur-[120px] bottom-10 right-10" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        <Card padding="lg" glass className="border border-border shadow-premium-dark relative">
          
          {/* Logo Identity */}
          <div className="flex flex-col items-center justify-center text-center mb-8 select-none">
            <div className="w-11 h-11 rounded-apple-lg bg-gradient-to-tr from-brand to-brand-secondary flex items-center justify-center shadow-md mb-3.5">
              <span className="text-white font-black text-xl tracking-wider">N</span>
            </div>
            <h2 className="font-display font-extrabold text-xl tracking-tight text-text">Notionix Workspace</h2>
            <p className="text-xs text-text-muted mt-1.5 font-medium leading-relaxed">
              Your premium, AI-powered productivity ecosystem
            </p>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'forgot' ? (
              /* Forgot Password Screen */
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
              >
                <button 
                  onClick={() => setMode('login')} 
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text font-bold mb-5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to login</span>
                </button>

                <h3 className="text-base font-bold text-text mb-1.5">Reset Password</h3>
                <p className="text-xs text-text-muted mb-5 leading-normal">
                  Enter your email address and we'll send you recovery credentials.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="name@workspace.com"
                    icon={<Mail className="w-4.5 h-4.5" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />

                  <Button type="submit" isLoading={isLoading} className="h-11 mt-2 text-sm">
                    Send Recovery Details
                  </Button>
                </form>
              </motion.div>
            ) : (
              /* Login or Signup Screen */
              <motion.div
                key="auth-tabs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Tabs selector */}
                <div className="flex bg-border/30 rounded-apple-lg border border-border/25 p-1 mb-6 select-none">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-apple-md transition-all ${
                      mode === 'login' ? 'bg-panel text-brand shadow-sm' : 'text-text-muted hover:text-text'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-apple-md transition-all ${
                      mode === 'signup' ? 'bg-panel text-brand shadow-sm' : 'text-text-muted hover:text-text'
                    }`}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {mode === 'signup' && (
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Vagisha S."
                      icon={<User className="w-4.5 h-4.5" />}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  )}

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@workspace.com"
                    icon={<Mail className="w-4.5 h-4.5" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />

                  <Input
                    label="Passphrase"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-4.5 h-4.5" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />

                  {mode === 'login' ? (
                    <div className="flex justify-end select-none">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs text-brand hover:underline font-semibold"
                      >
                        Forgot Passphrase?
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 mt-1 select-none">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 rounded text-brand focus:ring-brand"
                      />
                      <label htmlFor="terms" className="text-xs text-text-muted leading-relaxed font-medium">
                        I agree to the Terms of Service & Privacy Policy.
                      </label>
                    </div>
                  )}

                  <Button type="submit" isLoading={isLoading} className="h-11 mt-2 text-sm flex gap-1.5 items-center">
                    <span>{mode === 'login' ? 'Authenticate' : 'Register Workspace'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                {/* Social logins */}
                <div className="mt-6 pt-5 border-t border-border/40 select-none">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block text-center mb-4">
                    Or continue with
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3.5">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSocialLogin('Google')}
                      disabled={isLoading}
                      className="h-10 text-xs px-3 bg-panel hover:bg-border/20 border-border"
                    >
                      <Chrome className="w-4 h-4 text-danger mr-2" />
                      <span>Google</span>
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSocialLogin('GitHub')}
                      disabled={isLoading}
                      className="h-10 text-xs px-3 bg-panel hover:bg-border/20 border-border"
                    >
                      <Github className="w-4 h-4 text-text mr-2" />
                      <span>GitHub</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};
