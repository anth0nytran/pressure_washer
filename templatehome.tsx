'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldCheck, Star, Menu, X, Droplets, Zap, Check, ArrowRight } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ComparisonSlider } from './components/ComparisonSlider';
import { ImagePlaceholder } from './components/ImagePlaceholder';
import { PreviewBanner } from './components/PreviewBanner';

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeInSoft = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const staggerSoft = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export function TemplateHome({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const accentRed = '#ef4444'; // Subtle red complement
  const t = config.theme.colors; // Theme colors shorthand
  const isDark = config.theme.isDark;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);
  const services = config.services.slice(0, 4);
  const ratingText = config.rating ? config.rating.toFixed(1) : '4.9';
  const reviewCount = config.reviewCount ?? 120;
  const years = config.yearsInBusiness ?? 10;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inlineFormData, setInlineFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Pressure Washing',
  });
  const [inlineFormSubmitting, setInlineFormSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Our Work', href: '#work' },
    { label: 'Reviews', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ];

  const benefits = [
    'Fast response and quick scheduling',
    'Free estimates — call or text today',
    'Incredible attention to detail on every job',
    'Walk-through after completion to ensure satisfaction',
  ];
  const recentJobs = [
    {
      title: 'Driveway Pressure Washing',
      meta: 'Residential  -  Completed',
      result: 'Complete driveway cleaning',
    },
    {
      title: 'Roof Soft Washing',
      meta: 'Residential  -  Completed',
      result: 'Roof cleaning and restoration',
    },
    {
      title: 'Concrete Cleaning',
      meta: 'Residential  -  Completed',
      result: 'Surface cleaning and restoration',
    },
  ];

  const steps = [
    {
      title: 'Call or text us',
      body: 'Contact us at 832-427-2439 for a free estimate. Fast response and quick scheduling available.',
    },
    {
      title: 'Free estimate',
      body: 'We arrive on time, assess your needs, and provide a clear estimate before any work starts.',
    },
    {
      title: 'Job completed',
      body: 'We finish the job with attention to detail, then walk you through everything to ensure your satisfaction.',
    },
  ];

  const handleInlineFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineFormSubmitting(true);

    const emailBody = `New Quote Request from ${config.businessName} Website\n\n` +
      `Name: ${inlineFormData.name}\n` +
      `Phone: ${inlineFormData.phone}\n` +
      `Email: ${inlineFormData.email || 'Not provided'}\n` +
      `Service: ${inlineFormData.service}\n`;

    if (config.email) {
      const mailtoLink = `mailto:${config.email}?subject=New Quote Request - ${inlineFormData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    }

    setTimeout(() => {
      alert('Thank you! We\'ll contact you within 2 hours.');
      setInlineFormSubmitting(false);
      setInlineFormData({ name: '', phone: '', email: '', service: 'Pressure Washing' });
    }, 500);
  };

  const beforePlaceholder = config.imagePlaceholders[0] ?? {
    label: 'Before Photo',
    hint: 'Leak damage or worn shingles',
  };
  const afterPlaceholder = config.imagePlaceholders[1] ?? {
    label: 'After Photo',
    hint: 'Clean new install',
  };
  const crewPlaceholder = config.imagePlaceholders[2] ?? {
    label: 'Crew Photo',
    hint: 'Technicians on site',
  };

  // Computed tinted backgrounds using accent
  const accentTint = `${accent}08`; // Very subtle 8% opacity tint
  const accentGlow = `${accent}12`; // Slightly stronger for glows
  const reviewCardBg = isDark ? t.cardBg : 'rgba(255,255,255,0.95)';
  const reviewCardBorder = isDark ? t.border : 'rgba(255,255,255,0.3)';
  const promiseBg = isDark ? t.surfaceBg : t.cardBg;
  const promiseDivider = isDark ? t.borderLight : t.border;

  return (
    <div className="relative" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {/* Sticky Navigation - Industrial Style */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? '#000000' : 'rgba(0,0,0,0.95)',
          borderBottom: `2px solid ${scrolled ? accent : 'transparent'}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className={`${shellClass} flex items-center justify-between py-3`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo-full.svg"
              alt={config.businessName}
              className="h-14 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                style={{ color: '#ffffff' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white transition-all hover:scale-105 border-2"
              style={{ backgroundColor: accent, borderColor: accent }}
            >
              <Phone className="h-4 w-4" />
              {config.phone}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden border-2"
            style={{ borderColor: accent, color: '#ffffff' }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="px-6 py-4 md:hidden" style={{ borderTop: `2px solid ${accent}`, backgroundColor: '#000000' }}>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10"
                  style={{ color: '#ffffff' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4" style={{ borderTop: `2px solid ${accent}` }}>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-black text-white border-2"
                style={{ backgroundColor: accent, borderColor: accent }}
              >
                <Phone className="h-4 w-4" />
                {config.phone}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ----------------------------------------------------
        HERO SECTION - INDUSTRIAL CLEAN DESIGN
        ----------------------------------------------------
      */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">

        {/* 1. Background Image - Positioned up to show action */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* 2. Darker Overlay - Shows more of the image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.70) 100%)`
          }}
        />

        {/* 3. Industrial Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 2px, transparent 30px), repeating-linear-gradient(90deg, ${accent} 0px, transparent 2px, transparent 30px)`,
          }}
        />

        {/* Content Container */}
        <div className={`${shellClass} relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:items-start`}>
          {/* Left Column - Content */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-6 lg:space-y-8">

            {/* Headline Area */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] border-2"
                style={{
                  color: '#ffffff',
                  borderColor: accent,
                  backgroundColor: accent
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentRed }}></span>
                Now Serving {config.city}
              </div>

              <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl text-white">
                Professional Pressure Washing in <span style={{ color: accent }}>{config.city}, TX</span>
              </h1>

              <p className="text-xl font-semibold leading-relaxed max-w-xl text-gray-100">
                {config.brandLine || `Making dirty things look new again — spray the old away.`}
              </p>

              <p className="text-base font-medium leading-relaxed max-w-xl text-gray-300">
                Concrete gets the pressure wash. Everything else gets a safe soft wash. Serving Tomball, Spring, Cypress, Magnolia, The Woodlands & Greater Houston.
              </p>
            </div>

            {/* Key benefits - Stronger Typography */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: accent }}>
                <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-black text-white leading-tight mb-1">
                    Same-Day Estimates
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    Call or text now for instant scheduling
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: accent }}>
                <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-black text-white leading-tight mb-1">
                    100% Satisfaction Guaranteed
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    Walk-through after every job
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderColor: accent }}>
                <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-black text-white leading-tight mb-1">
                    Protect Your Investment
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    Careful with landscaping, attention to detail
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Inline Lead Capture Form */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative"
          >
            <div
              className="rounded-lg p-7 border-4"
              style={{
                backgroundColor: '#ffffff',
                borderColor: accent,
                boxShadow: `0 10px 40px rgba(0,0,0,0.2), 0 0 0 1px ${accent}50`
              }}
            >
              {/* Form header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight leading-none">
                      Get Your<br />Free Quote
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <span className="text-xs font-black text-slate-900 ml-1">5.0</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded border-2 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: accent }}
                  >
                    <Phone className="h-3.5 w-3.5" style={{ color: accent }} />
                    <span className="text-xs font-black" style={{ color: accent }}>CALL</span>
                  </a>
                </div>
                <div className="h-px w-full" style={{ backgroundColor: `${accent}30` }} />
              </div>

              {/* Form fields - Visual Progression */}
              <form onSubmit={handleInlineFormSubmit} className="space-y-4">
                {/* Step 1 - Name */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                      1
                    </div>
                    <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                      Your Name
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={inlineFormData.name}
                    onChange={(e) => setInlineFormData({ ...inlineFormData, name: e.target.value })}
                    className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                    style={{
                      borderColor: inlineFormData.name ? accent : '#cbd5e1',
                      color: '#0f172a',
                      backgroundColor: inlineFormData.name ? `${accent}05` : '#ffffff'
                    }}
                    placeholder="John Smith"
                  />
                </div>

                {/* Step 2 - Phone */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                      2
                    </div>
                    <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                      Phone Number
                    </label>
                  </div>
                  <input
                    type="tel"
                    required
                    value={inlineFormData.phone}
                    onChange={(e) => setInlineFormData({ ...inlineFormData, phone: e.target.value })}
                    className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                    style={{
                      borderColor: inlineFormData.phone ? accent : '#cbd5e1',
                      color: '#0f172a',
                      backgroundColor: inlineFormData.phone ? `${accent}05` : '#ffffff'
                    }}
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Step 3 - Service */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                      3
                    </div>
                    <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                      Service Needed
                    </label>
                  </div>
                  <select
                    value={inlineFormData.service}
                    onChange={(e) => setInlineFormData({ ...inlineFormData, service: e.target.value })}
                    className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                    style={{
                      borderColor: accent,
                      color: '#0f172a',
                      backgroundColor: `${accent}05`
                    }}
                  >
                    <option>Pressure Washing</option>
                    <option>Soft Washing</option>
                    <option>House Wash</option>
                    <option>Roof Wash</option>
                    <option>Not Sure</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={inlineFormSubmitting}
                  className="w-full rounded-lg px-6 py-4 text-base font-black text-white uppercase tracking-wide transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-3 relative overflow-hidden"
                  style={{ backgroundColor: accent }}
                >
                  <span className="relative z-10">
                    {inlineFormSubmitting ? 'Sending...' : '→ Get Free Estimate'}
                  </span>
                </button>
              </form>

              {/* Social Proof */}
              <div className="mt-5 pt-5 border-t-2" style={{ borderColor: `${accent}15` }}>
                <div className="flex items-center justify-center gap-3 text-center">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-3" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                      <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 mt-1">50+ Reviews</p>
                  </div>
                  <div className="h-10 w-px bg-slate-300"></div>
                  <div className="flex flex-col">
                    <p className="text-lg font-black" style={{ color: accent }}>2hr</p>
                    <p className="text-[10px] font-bold text-slate-600">Avg Response</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar - Upgraded Industrial Style */}
      <section className="relative py-12 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 2px, transparent 30px), repeating-linear-gradient(90deg, ${accent} 0px, transparent 2px, transparent 30px)`,
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />

        <div className={`${shellClass} relative z-10`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {/* Stat 1 */}
            <div className="group">
              <div className="relative p-6 rounded-lg border-2 transition-all hover:scale-105" style={{ borderColor: `${accent}40`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: accent }} />
                <div className="text-5xl font-black text-white mb-2 leading-none">{reviewCount}<span className="text-2xl">+</span></div>
                <div className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Jobs Completed</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group">
              <div className="relative p-6 rounded-lg border-2 transition-all hover:scale-105" style={{ borderColor: `${accent}40`, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: accent }} />
                <div className="text-5xl font-black text-white mb-2 leading-none">{years}<span className="text-2xl">+</span></div>
                <div className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Years in {config.city}</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group">
              <div className="relative p-6 rounded-lg border-2 transition-all hover:scale-105" style={{ borderColor: accentRed, backgroundColor: `${accentRed}10` }}>
                <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: accentRed }} />
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black leading-none" style={{ color: accentRed }}>{ratingText}</span>
                  <Star className="w-6 h-6 mb-1" style={{ color: '#FFA500', fill: '#FFA500' }} />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accentRed }}>Google Rating</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group">
              <div className="relative p-6 rounded-lg border-2 transition-all hover:scale-105" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
                <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: accent }} />
                <div className="text-5xl font-black leading-none mb-2" style={{ color: accent }}>2<span className="text-2xl">hr</span></div>
                <div className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>Response Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />
      </section>

      {/* Why Us - Bold dark section with parallax */}
      <section id="why-us" className="relative scroll-mt-20 overflow-hidden" style={{ borderTop: `4px solid ${accent}`, borderBottom: `4px solid ${accent}` }}>
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/why-us-background.png)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Strong dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 100%)'
          }}
        />
        <div className="relative py-16 z-10">
          <div className={shellClass}>
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-block px-4 py-2 rounded mb-6" style={{ backgroundColor: accent }}>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    Why Homeowners Choose Us
                  </p>
                </div>
                <h2 className="text-3xl font-black text-white md:text-4xl leading-tight">
                  Why {config.city} Homeowners Trust Made New Pressure Washing
                </h2>
                <div className="mt-10 space-y-4">
                  {benefits.map((benefit, i) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-4 p-5 rounded border-l-4"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderLeftColor: i === 2 ? accentRed : accent }}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded text-lg font-black flex-shrink-0"
                        style={{ backgroundColor: i === 2 ? accentRed : accent, color: '#000' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-base font-bold text-white leading-relaxed pt-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-lg p-8 shadow-2xl"
                style={{ backgroundColor: promiseBg, border: `3px solid ${accent}` }}
              >
                <div className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: accent }}>
                  Service Promise
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Response time', value: 'Fast response', highlight: true },
                    { label: 'Free estimate', value: 'Call or text' },
                    { label: 'Walk-through', value: 'After every job' },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between pb-5"
                      style={{ borderBottom: i < arr.length - 1 ? `2px solid ${promiseDivider}` : 'none' }}
                    >
                      <span className="text-base font-bold" style={{ color: t.textPrimary }}>{item.label}</span>
                      <span
                        className="text-lg font-black"
                        style={{ color: item.highlight ? accent : t.textPrimary }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Industrial Card Grid */}
      <section id="services" className="py-20 scroll-mt-20" style={{ backgroundColor: t.pageBg }}>
        {/* Top border accent */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />

        <div className={`${shellClass} mt-16`}>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
              <Droplets className="h-4 w-4" style={{ color: accent }} />
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>Services</span>
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: t.textPrimary }}>
              Professional Services in {config.city}, TX
            </h2>
            <p className="text-base font-medium max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Expert house washing, roof cleaning, driveway pressure washing, and soft washing. Same-day estimates available.
            </p>
          </div>

          <motion.div
            variants={staggerSoft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, i) => (
              <motion.div
                key={service}
                variants={fadeInSoft}
                className="group relative overflow-hidden rounded-lg transition-all hover:scale-105 cursor-pointer border-2"
                style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                onClick={() => setLeadOpen(true)}
              >
                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 pointer-events-none transition-all rounded-lg" style={{ borderColor: i === 1 ? accentRed : accent }} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-black text-white"
                      style={{ backgroundColor: i === 1 ? accentRed : accent }}
                    >
                      {i + 1}
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: i === 1 ? accentRed : accent }} />
                  </div>

                  <h3 className="text-lg font-black uppercase mb-2 leading-tight" style={{ color: t.textPrimary }}>
                    {service}
                  </h3>

                  <p className="text-xs font-bold mb-4" style={{ color: t.textMuted }}>
                    Free estimate • Same-day • {config.city}
                  </p>

                  <div className="pt-4 border-t-2" style={{ borderColor: t.border }}>
                    <span className="text-xs font-black uppercase tracking-wide inline-flex items-center gap-1" style={{ color: i === 1 ? accentRed : accent }}>
                      Request Quote
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REWORKED SECTION: TECHNICAL SPECIFICATION STYLE */}
      <section className="py-16 relative overflow-hidden" style={{ borderTop: `4px solid ${accent}`, backgroundColor: t.surfaceBg }}>
        {/* Subtle grid pattern for tech feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className={shellClass + ' relative z-10'}>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-4" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Technical Process</p>
              </div>
              <h2 className="text-3xl font-black md:text-4xl leading-tight" style={{ color: t.textPrimary }}>
                The Right Method for Every Surface
              </h2>
              <p className="mt-4 text-lg font-medium" style={{ color: t.textSecondary }}>
                We don't just blast everything. We use industry-standard protocols to ensure deep cleaning without damage.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {/* CARD 1: PRESSURE WASHING */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg border-2 group hover:border-transparent transition-colors duration-300"
              style={{ borderColor: t.border }}
            >
               {/* Parallax Background */}
               <div
                 className="absolute inset-0"
                 style={{
                   backgroundImage: 'url(/pressure_washing.png)',
                   backgroundAttachment: 'fixed',
                   backgroundPosition: 'center',
                   backgroundSize: '130%',
                   backgroundRepeat: 'no-repeat'
                 }}
               />
               {/* Dark overlay for text readability */}
               <div
                 className="absolute inset-0"
                 style={{
                   background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.80) 100%)'
                 }}
               />

               {/* Hover Ring */}
               <div className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 pointer-events-none transition-all duration-300 z-20" style={{ borderColor: accent }} />

              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">Pressure Washing</h3>
                        <p className="text-xs font-bold uppercase tracking-wider mt-1 text-gray-400">Hard Surface Restoration</p>
                    </div>
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <Zap className="w-6 h-6" style={{ color: accent }} />
                    </div>
                </div>

                {/* Tech Spec Line */}
                <div className="flex items-center gap-3 mb-6 py-3 px-4 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-black uppercase text-gray-400">Spec:</div>
                    <div className="text-sm font-bold text-white">3000-4000 PSI <span className="mx-2 opacity-30">|</span> High Flow</div>
                </div>

                <ul className="space-y-3 mb-8">
                    {['Concrete Driveways', 'Stone Patios', 'Brick Walkways', 'Pool Decks'].map(item => (
                        <li key={item} className="flex items-center gap-3">
                            <Check className="w-5 h-5 flex-shrink-0" style={{ color: accent }} />
                            <span className="text-sm font-bold text-gray-200">{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-sm leading-relaxed border-t pt-4 text-gray-300" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    High-pressure mechanical cleaning to strip grime, oil, and embedded dirt from durable hardscapes.
                </p>
              </div>

              {/* Watermark Icon */}
              <Zap className="absolute -bottom-6 -right-6 w-48 h-48 opacity-[0.03] pointer-events-none" />
            </motion.div>

            {/* CARD 2: SOFT WASHING */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg border-2 group hover:border-transparent transition-colors duration-300"
              style={{ borderColor: t.border }}
            >
               {/* Parallax Background */}
               <div
                 className="absolute inset-0"
                 style={{
                   backgroundImage: 'url(/soft_clean.png)',
                   backgroundAttachment: 'fixed',
                   backgroundPosition: '30% center',
                   backgroundSize: '140%',
                   backgroundRepeat: 'no-repeat'
                 }}
               />
               {/* Lighter overlay for text readability */}
               <div
                 className="absolute inset-0"
                 style={{
                   background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.70) 100%)'
                 }}
               />

               {/* Hover Ring */}
               <div className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 pointer-events-none transition-all duration-300 z-20" style={{ borderColor: accent }} />

              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">Soft Washing</h3>
                        <p className="text-xs font-bold uppercase tracking-wider mt-1 text-gray-400">Delicate Exterior Sanitization</p>
                    </div>
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <Droplets className="w-6 h-6" style={{ color: accent }} />
                    </div>
                </div>

                {/* Tech Spec Line */}
                <div className="flex items-center gap-3 mb-6 py-3 px-4 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-black uppercase text-gray-400">Spec:</div>
                    <div className="text-sm font-bold text-white">Low Pressure <span className="mx-2 opacity-30">|</span> Biodegradable Mix</div>
                </div>

                <ul className="space-y-3 mb-8">
                    {['Roof Shingles', 'Vinyl Siding', 'Stucco & Painted Wood', 'Screen Enclosures'].map(item => (
                        <li key={item} className="flex items-center gap-3">
                            <Check className="w-5 h-5 flex-shrink-0" style={{ color: accent }} />
                            <span className="text-sm font-bold text-gray-200">{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-sm leading-relaxed border-t pt-4 text-gray-300" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    Chemical-based cleaning that kills algae and mold at the root without damaging paint or voiding roof warranties.
                </p>
              </div>
              
              {/* Watermark Icon */}
              <Droplets className="absolute -bottom-6 -right-6 w-48 h-48 opacity-[0.03] pointer-events-none" />
            </motion.div>
          </div>

           {/* Bottom CTA Section - Guarantee + Action */}
           <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative mt-12"
          >
            <div
              className="relative p-10 md:p-12 rounded-xl overflow-hidden border-2"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accent}ee 100%)`,
                borderColor: `${accent}`,
              }}
            >
              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #ffffff 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #ffffff 0px, transparent 1px, transparent 40px)`,
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                {/* Icon + Content */}
                <div className="flex items-start gap-6 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center border-2 border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-white mb-3 leading-tight">
                      100% Satisfaction Guarantee
                    </h3>
                    <p className="text-base font-semibold text-white/90 leading-relaxed max-w-2xl">
                      We walk you through everything after completion. If you're not happy with our pressure washing or soft washing results in {config.city} or anywhere in Greater Houston, we'll make it right — no questions asked.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setLeadOpen(true)}
                    className="rounded-lg px-8 py-4 text-base font-black uppercase tracking-wide transition-all hover:scale-105 border-2"
                    style={{ backgroundColor: '#ffffff', color: accent, borderColor: '#ffffff' }}
                  >
                    Get Free Estimate
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Work Gallery - Before/After Sliders */}
      <section id="work" className="py-20 scroll-mt-20" style={{ backgroundColor: t.surfaceBg }}>
        {/* Top border accent */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />

        <div className={`${shellClass} mt-16`}>
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
              <ArrowRight className="h-4 w-4" style={{ color: accent }} />
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>Recent Work</span>
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: t.textPrimary }}>
              Real Results from {config.city}
            </h2>
            <p className="text-base font-medium max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Drag the sliders to see the transformation. Before and after pressure washing results from homes across Tomball, Spring, Cypress, and The Woodlands.
            </p>
          </div>

          {/* Before/After Sliders - 2-Column Grid */}
          <motion.div
            variants={staggerSoft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 lg:gap-12"
          >
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.title}
                variants={fadeInSoft}
                className="group"
              >
                {/* Comparison Slider */}
                <div className="relative rounded-lg overflow-hidden mb-5 border-2 transition-all group-hover:shadow-xl" style={{ borderColor: accent }}>
                  <ComparisonSlider
                    accent={accent}
                    beforeLabel="Before"
                    beforeHint={job.title}
                    afterLabel="After"
                    afterHint="Clean & Restored"
                    beforeImage={
                      index === 0 ? "/before-hero.jpg" :
                      index === 1 ? "/old2.jpg" :
                      "/old3.jpg"
                    }
                    afterImage={
                      index === 0 ? "/after-hero.jpg" :
                      index === 1 ? "/new2.jpg" :
                      "/new3.jpg"
                    }
                  />
                </div>

                {/* Clean Caption */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-black text-white flex-shrink-0" style={{ backgroundColor: accent }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase leading-tight mb-1" style={{ color: t.textPrimary }}>
                      {job.title}
                    </h3>
                    <p className="text-xs font-bold" style={{ color: t.textMuted }}>
                      {job.meta}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews section - Redesigned Industrial Style */}
      <section
        id="proof"
        className="relative py-20 scroll-mt-20"
        style={{ backgroundColor: t.surfaceBg }}
      >
        <div className={shellClass}>
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
              <Star className="h-4 w-4" style={{ color: accent, fill: accent }} />
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>Customer Reviews</span>
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: t.textPrimary }}>
              Trusted by {config.city} Homeowners
            </h2>
            <p className="text-base font-medium max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Real reviews from real customers across Tomball, Spring, Cypress, and The Woodlands
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {/* Google Rating */}
            <div className="p-6 rounded-lg border-2 text-center" style={{ borderColor: accent, backgroundColor: t.cardBg }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4 mx-auto mb-3" />
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4" style={{ color: '#FFA500', fill: '#FFA500' }} />
                ))}
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: t.textPrimary }}>{ratingText}</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: t.textMuted }}>{reviewCount}+ Reviews</div>
            </div>

            {/* Years */}
            <div className="p-6 rounded-lg border-2 text-center" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <div className="text-4xl font-black mb-2" style={{ color: accent }}>{years}+</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: t.textMuted }}>Years in {config.city}</div>
            </div>

            {/* Licensed */}
            <div className="p-6 rounded-lg border-2 text-center" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <ShieldCheck className="h-10 w-10 mx-auto mb-2" style={{ color: accent }} />
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: t.textMuted }}>Licensed & Insured</div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-lg border-2 text-center" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <Check className="h-10 w-10 mx-auto mb-2" style={{ color: accent }} />
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: t.textMuted }}>Same-Week Available</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInSoft}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="relative p-6 rounded-lg border-2 hover:border-transparent transition-all group"
                style={{ backgroundColor: t.cardBg, borderColor: t.border }}
              >
                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 pointer-events-none transition-all duration-300 rounded-lg" style={{ borderColor: accent }} />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="h-4 w-4" style={{ color: '#FFA500', fill: '#FFA500' }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base leading-relaxed font-medium mb-6" style={{ color: t.textPrimary }}>
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t-2" style={{ borderColor: t.border }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-black" style={{ color: t.textPrimary }}>{testimonial.name}</div>
                    <div className="text-xs font-bold" style={{ color: t.textMuted }}>Verified Customer</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Industrial Timeline */}
      <section className="py-20" style={{ borderTop: `4px solid ${accent}`, backgroundColor: t.cardBg }}>
        <div className={`${shellClass} mt-16`}>
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
              <Zap className="h-4 w-4" style={{ color: accent }} />
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>How it Works</span>
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: t.textPrimary }}>
              Simple 3-Step Process
            </h2>
            <p className="text-base font-medium max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Fast, transparent, and professional service from start to finish
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line with gradient */}
            <div
              className="absolute left-0 right-0 top-14 hidden h-1 md:block"
              style={{ background: `linear-gradient(90deg, transparent 5%, ${accent} 30%, ${accent} 70%, transparent 95%)` }}
            />

            <div className="grid gap-8 md:grid-cols-3 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeInSoft}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="p-6 rounded-lg border-2 hover:border-transparent transition-all group" style={{ backgroundColor: t.surfaceBg, borderColor: t.border }}>
                    {/* Hover effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 pointer-events-none transition-all duration-300 rounded-lg" style={{ borderColor: accent }} />

                    {/* Step number */}
                    <div
                      className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-lg text-3xl font-black text-white shadow-lg mb-4 border-4"
                      style={{ backgroundColor: accent, borderColor: '#ffffff' }}
                    >
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-black uppercase tracking-wide text-center mb-3" style={{ color: t.textPrimary }}>
                      {step.title}
                    </h3>

                    <div className="h-px w-16 mx-auto mb-3" style={{ backgroundColor: accent }} />

                    <p className="text-sm leading-relaxed text-center font-medium" style={{ color: t.textMuted }}>
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Industrial Style */}
      <section id="faq" className="py-20 scroll-mt-20" style={{ borderTop: `4px solid ${accent}`, backgroundColor: t.surfaceBg }}>

        <div className={`${shellClass} mt-16`}>
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}10` }}>
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>FAQ</span>
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: t.textPrimary }}>
              Common Questions About Pressure Washing
            </h2>
            <p className="text-base font-medium max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Everything you need to know about our services in {config.city}, TX
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-[0.35fr_0.65fr] md:items-start">
            <div className="md:sticky md:top-24">
              <div className="p-6 rounded-lg border-2" style={{ backgroundColor: t.cardBg, borderColor: accent }}>
                <h3 className="text-lg font-black uppercase mb-3" style={{ color: t.textPrimary }}>
                  Still Have Questions?
                </h3>
                <p className="text-sm font-medium mb-4 leading-relaxed" style={{ color: t.textMuted }}>
                  Call or text us directly for immediate answers about pressure washing services.
                </p>
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black text-white transition-all hover:scale-105 border-2"
                  style={{ backgroundColor: accent, borderColor: accent }}
                >
                  <Phone className="h-4 w-4" />
                  {config.phone}
                </a>

                <div className="mt-6 pt-6 border-t-2 space-y-3" style={{ borderColor: t.border }}>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                    <span className="text-xs font-bold" style={{ color: t.textMuted }}>Same-day estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                    <span className="text-xs font-bold" style={{ color: t.textMuted }}>Licensed & insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                    <span className="text-xs font-bold" style={{ color: t.textMuted }}>100% satisfaction guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className="group rounded-lg transition-all hover:shadow-md border-2"
                  style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-base font-black transition-colors hover:opacity-80" style={{ color: t.textPrimary }}>
                    {faq.q}
                    <span
                      className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded text-xl font-black transition-all duration-200 group-open:rotate-45 border-2"
                      style={{ borderColor: accent, color: accent }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm font-medium leading-relaxed border-t-2 pt-4" style={{ color: t.textSecondary, borderColor: t.border }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Industrial Bold */}
      <section id="home-cta" className="relative py-20 overflow-hidden" style={{ borderTop: `4px solid ${accent}`, backgroundColor: '#000000' }}>
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${accent} 0px, transparent 2px, transparent 30px), repeating-linear-gradient(90deg, ${accent} 0px, transparent 2px, transparent 30px)`,
          }}
        />

        <div className={`${shellClass} relative z-10`}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-4 border-2" style={{ borderColor: accent, backgroundColor: `${accent}15` }}>
                <Phone className="h-3.5 w-3.5" style={{ color: accent }} />
                <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: accent }}>Ready to Book?</span>
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl text-white leading-tight">
                Get Your Free<br />Estimate Today
              </h2>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-base font-bold text-white">Same-day estimates available</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-base font-bold text-white">No obligation • Fast response</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-base font-bold text-white">Licensed & insured professionals</span>
                </div>
              </div>

              <p className="mt-6 text-sm font-bold text-gray-400">
                Serving Tomball, Spring, Cypress, Magnolia, The Woodlands & Greater Houston
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-shrink-0">
              <button
                type="button"
                className="rounded-lg px-8 py-5 text-base font-black shadow-2xl uppercase tracking-wide transition-all hover:scale-105 border-4"
                style={{ backgroundColor: accent, borderColor: accent, color: '#ffffff' }}
                onClick={() => setLeadOpen(true)}
              >
                → Get Free Estimate
              </button>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-5 text-base font-black uppercase tracking-wide transition-all hover:bg-white/5 border-4"
                style={{ borderColor: '#ffffff', color: '#ffffff' }}
              >
                <Phone className="h-5 w-5" />
                {config.phone}
              </a>

              <p className="text-center text-xs font-bold text-gray-500">
                We answer immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10" style={{ backgroundColor: '#000000', color: '#ffffff' }}>

        <div className={shellClass}>
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            {/* Column 1 - Business Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo-full.svg"
                  alt={config.businessName}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-sm font-bold text-gray-400 leading-relaxed">
                Professional pressure washing and soft washing services in {config.city}, TX
              </p>
            </div>

            {/* Column 2 - Contact */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-4" style={{ color: accent }}>Contact</h3>
              <div className="space-y-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="block text-base font-black hover:opacity-80 transition-opacity"
                  style={{ color: '#ffffff' }}
                >
                  {config.phone}
                </a>
                <p className="text-sm font-bold text-gray-400">
                  Always open - Call or text anytime
                </p>
                <p className="text-sm font-bold text-gray-400">
                  {config.serviceArea || config.city}
                </p>
              </div>
            </div>

            {/* Column 3 - Service Areas */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-4" style={{ color: accent }}>Service Areas</h3>
              <p className="text-sm font-bold text-gray-400 leading-relaxed">
                Tomball, Spring, Cypress, Magnolia, The Woodlands & Greater Houston
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ borderColor: `${accent}30` }}>
            <p className="text-xs font-bold text-gray-500">
              © 2024 {config.businessName}. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3" style={{ color: accent }} />
              <span className="text-xs font-bold text-gray-500">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div
          className="mx-auto flex max-w-md gap-3 rounded-lg p-3 shadow-2xl border-4"
          style={{ backgroundColor: '#ffffff', borderColor: accent }}
        >
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-black uppercase tracking-wide transition-all hover:scale-105 border-2"
            style={{ borderColor: accent, color: accent }}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button
            type="button"
            className="flex-1 rounded-lg px-3 py-3 text-sm font-black text-white uppercase tracking-wide shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: accent }}
            onClick={() => setLeadOpen(true)}
          >
            Quote
          </button>
        </div>
      </div>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        accent={accent}
        businessName={config.businessName}
        serviceLabel={config.primaryService}
        ctaLabel={config.ctaPrimary}
        email={config.email}
      />
    </div>
  );
}