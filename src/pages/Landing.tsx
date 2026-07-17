import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Ribbon } from '../components/landing/Ribbon';
import { Manifesto } from '../components/landing/Manifesto';
import { Features } from '../components/landing/Features';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    scrollTop();
    setTimeout(() => {
      const el = document.querySelector('[data-testid="hero-email-input"]') as HTMLInputElement | null;
      if (el) el.focus();
    }, 700);
  };

  const handleRequestDemo = () => {
    toast(
      "Demo request received",
      "Drop your email in the box and our team will reach out within a day.",
      "success"
    );
  };

  const handleSelectPlan = (plan: string) => {
    toast(
      `${plan} selected`,
      "Enter your email to get started.",
      "success"
    );
    handleGetStarted();
  };

  return (
    <div className="relative min-h-screen bg-slate-50 antialiased font-sans">
      <Navbar onSignIn={() => navigate('/auth')} onGetStarted={handleGetStarted} />
      <main>
        <Hero onRequestDemo={handleRequestDemo} />
        <Ribbon />
        <Manifesto />
        <Features />
        <Testimonials />
        <Pricing onSelectPlan={handleSelectPlan} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
