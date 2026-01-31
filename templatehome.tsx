'use client';

import { useMemo, useState } from 'react';
import { Phone, Menu, X, Check, Star, ShieldCheck, Clock, ThumbsUp, ArrowRight, MapPin, UserCheck, Droplets, Zap, CheckCircle2, CloudRain, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';

export function TemplateHome({ config }: { config: BusinessConfig }) {
  // Brand Colors
  const brandNavy = '#0e2a47';
  const brandRed = '#e60000';

  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);

  // Form State for Embedded Form
  const [selectedService, setSelectedService] = useState('Pressure Washing');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollToEstimate = (service: string = 'General Inquiry') => {
    // Map various CTA inputs to the actual select options
    const serviceMap: { [key: string]: string } = {
      'Hero CTA': 'Pressure Washing',
      'Soft Washing': 'House Soft Washing',
      'Pressure Washing': 'Driveway / Concrete',
      'Gallery Request': 'General Inquiry',
      'Process Step': 'General Inquiry',
      'Commercial Inquiry': 'Commercial Cleaning',
      'Wood Fence Restoration': 'Fence / Wood Cleaning',
      'Trash Can Sanitization': 'Trash Can Cleaning',
      'Gutter Cleaning': 'Gutter Cleaning',
      'Roof Cleaning': 'Roof Soft Wash',
      'Driveway Cleaning': 'Driveway / Concrete',
      'Graffiti': 'General Inquiry'
    };

    const finalService = serviceMap[service] || service;
    setSelectedService(finalService);
    setMobileMenuOpen(false);
    const element = document.getElementById('estimate-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      alert('Estimate Request Sent! Blake will text you shortly.');
      setSubmitting(false);
      setFormName('');
      setFormPhone('');
    }, 800);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gallery State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock Gallery Data (Placeholders with different aspect ratios)
  const galleryImages = [
    { src: "https://placehold.co/600x400/0e2a47/white?text=Driveway+Clean", alt: "Concrete Driveway Pressure Washing in Tomball TX", aspect: "aspect-[3/2]" },
    { src: "https://placehold.co/400x600/e60000/white?text=Siding+Soft+Wash", alt: "House Soft Washing Siding Cleaning in Spring TX", aspect: "aspect-[2/3]" },
    { src: "https://placehold.co/600x600/0e2a47/white?text=Patio+Restoration", alt: "Brick Patio Concrete Pressure Washing in Cypress TX", aspect: "aspect-square" },
    { src: "https://placehold.co/600x400/0e2a47/white?text=Roof+Washing", alt: "Roof Soft Wash Cleaning in The Woodlands TX", aspect: "aspect-[3/2]" },
    { src: "https://placehold.co/400x500/e60000/white?text=Fence+Restoration", alt: "Wood Fence Cleaning Restoration in Magnolia TX", aspect: "aspect-[4/5]" },
    { src: "https://placehold.co/600x400/0e2a47/white?text=Gutter+Brightening", alt: "Gutter Cleaning Service in Tomball Texas", aspect: "aspect-[3/2]" },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About Blake', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#estimate-form' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">

      <div className="text-white text-xs md:text-sm font-bold w-full" style={{ backgroundColor: brandNavy }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-10 flex justify-between items-center">
          <div className="hidden md:flex items-center opacity-90">
            <span className="tracking-wide">Family Owned & Operated</span>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <a href={`tel:${cleanPhone}`} className="hover:text-gray-200 flex items-center gap-2 transition-opacity">
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Call Or Text:</span> {config.phone}
            </a>
            <button onClick={() => scrollToEstimate('General Inquiry')} className="hover:text-red-400 transition-colors hidden sm:block">
              Get A Free Estimate
            </button>
          </div>
        </div>
      </div>

      {/* 
        =============================================
        STICKY NAVIGATION
        =============================================
      */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex-shrink-0 relative z-50">
              <a href="#" onClick={(e) => handleScrollTo(e, '#top')}>
                <img className="h-16 md:h-20 w-auto drop-shadow-sm" src="/logo-full.svg" alt={config.businessName} />
              </a>
            </div>

            <div className="hidden xl:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-xs font-bold uppercase tracking-widest text-[#0e2a47] hover:text-red-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => scrollToEstimate('General Quote')}
                className="px-6 py-3 text-white font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity rounded-sm shadow-md flex items-center gap-2"
                style={{ backgroundColor: brandNavy }}
              >
                Free Estimate <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#0e2a47]"
              >
                {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-6 py-4 text-sm font-bold uppercase text-[#0e2a47] border-b border-gray-50 hover:bg-gray-50"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => scrollToEstimate('Mobile Menu')}
                  className="w-full py-4 text-white font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm"
                  style={{ backgroundColor: brandRed }}
                >
                  Get A Free Estimate
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 
        =============================================
        HERO SECTION
        =============================================
      */}
      <section id="top" className="relative h-[700px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_main.jpg"
            alt="Pressure Washing Truck"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center text-white mt-10">
          <div className="inline-block mb-4 px-4 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm">
            Professional Exterior Cleaning
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold uppercase tracking-wide mb-6 drop-shadow-2xl leading-[1.1]">
            Pressure Washing & <br /> <span className="text-red-500">Soft Washing</span> in Tomball, TX
          </h1>

          <p className="text-lg md:text-xl font-medium tracking-wide mb-10 drop-shadow-md font-sans text-gray-200 max-w-3xl mx-auto">
            Concrete gets a professional pressure wash; most other surfaces get a safe soft wash. Based in Tomball, serving Spring, Cypress, Magnolia, and The Woodlands. Call or text today for a free estimate.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="px-10 py-5 text-white font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#091d33] transition-colors rounded-sm shadow-xl min-w-[240px]"
              style={{ backgroundColor: brandNavy }}
            >
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <button
              onClick={() => scrollToEstimate('Hero CTA')}
              className="px-10 py-5 text-white font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-700 transition-colors rounded-sm shadow-xl min-w-[240px]"
              style={{ backgroundColor: brandRed }}
            >
              Get A Free Estimate
            </button>
          </div>
          <p className="mt-6 text-sm opacity-80 font-medium">Fast Response • Same Day Quotes • 100% Satisfaction</p>
        </div>
      </section>

      {/* 
        =============================================
        TRUST BAR
        =============================================
      */}
      {/* 
        =============================================
        TRUST BAR (Floating & Integrated)
        =============================================
      */}
      <section className="relative z-20 -mt-16 px-4 mb-16">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {/* Item 1 */}
            <div className="p-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors">
              <ShieldCheck className="w-10 h-10 text-[#0e2a47] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-[#0e2a47] text-sm uppercase tracking-widest">Licensed & Insured</span>
              <span className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                <Check className="w-3 h-3 text-green-600" /> Fully Vetted
              </span>
            </div>

            {/* Item 2 */}
            <div className="p-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors">
              <Star className="w-10 h-10 text-yellow-400 fill-current mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col items-center">
                <span className="font-bold text-[#0e2a47] text-sm uppercase tracking-widest">5-Star Rated</span>
                <span className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                  <span className="font-bold text-blue-500">G</span> Verified Reviews
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors">
              <Clock className="w-10 h-10 text-[#0e2a47] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-[#0e2a47] text-sm uppercase tracking-widest">Fast Estimates</span>
              <span className="text-xs text-gray-500 mt-2 font-medium">Same Day Quotes</span>
            </div>

            {/* Item 4 */}
            <div className="p-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors">
              <ThumbsUp className="w-10 h-10 text-[#0e2a47] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-[#0e2a47] text-sm uppercase tracking-widest">Satisfaction</span>
              <span className="text-xs text-gray-500 mt-2 font-medium">100% Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        SERVICES OVERVIEW (DENSITY INTRO)
        =============================================
      */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0e2a47 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            "Make Dirty Things Look New Again"
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto my-6"></div>

          <p className="text-gray-600 mb-12 leading-relaxed text-lg max-w-3xl mx-auto">
            We don't just "wash" your home. We use targeted cleaning methods to restore and protect your property. Knowing the difference between <strong>Pressure Washing</strong> and <strong>Soft Washing</strong> is crucial to avoiding damage.
          </p>
        </div>
      </section>

      {/* 
        =============================================
        FEATURE 1: SOFT WASHING (Safe)
        =============================================
      */}
      <section className="py-0 bg-gray-50 border-t border-gray-100">
        <div className="grid md:grid-cols-2">
          <div className="h-[400px] md:h-auto bg-gray-300 relative">
            <img src="/soft_wash_service.png" alt="Soft Washing Siding" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 bg-[#0e2a47] text-white py-2 px-6 font-bold uppercase tracking-widest text-sm">Safe Washing</div>
          </div>
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-8 h-8 text-[#0e2a47]" />
              <h3 className="text-3xl font-serif font-bold text-[#0e2a47]">Soft Washing for Siding, Stucco, Brick, Roofs & Fences</h3>
            </div>
            <h4 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-6">Safe Cleaning for Your Home's Exterior</h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              We never blast high pressure on your delicate siding or roof shingles. Instead, we use a specialized cleaning solution that kills algae, mildew, and bacteria at the root.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Safe for Stucco, Vinyl & Painted Wood</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Removes Black Streaks & Green Algae</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Longer Lasting Results</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToEstimate('Soft Washing')}
              className="self-start px-8 py-3 text-white font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors rounded-sm"
              style={{ backgroundColor: brandNavy }}
            >
              Get Soft Wash Quote
            </button>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        FEATURE 2: PRESSURE WASHING (Power)
        =============================================
      */}
      <section className="py-0 bg-white">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-20 flex flex-col justify-center order-2 md:order-1">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-red-600" />
              <h3 className="text-3xl font-serif font-bold text-[#0e2a47]">Concrete Pressure Washing (Driveways, Sidewalks, Patios)</h3>
            </div>
            <h4 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-6">High-Power Deep Cleaning for Hard Surfaces</h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              For hard, durable surfaces, we bring the power. Our industrial-grade surface cleaners remove years of grime, oil, and embedded dirt from your concrete flatwork.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Deep Cleaning for Driveways & Sidewalks</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Pool Deck Restoration</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Removes Gum & Tough Oil Stains</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToEstimate('Pressure Washing')}
              className="self-start px-8 py-3 text-white font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity rounded-sm"
              style={{ backgroundColor: brandRed }}
            >
              Get Concrete Quote
            </button>
          </div>
          <div className="h-[400px] md:h-auto bg-gray-300 relative order-1 md:order-2">
            <img src="/pressure_wash_service.png" alt="Pressure Washing Concrete" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 bg-red-600 text-white py-2 px-6 font-bold uppercase tracking-widest text-sm">Deep Clean</div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        FEATURE 3: ROOF SOFT WASHING (Specialized)
        =============================================
      */}
      <section className="py-0 bg-gray-50 border-t border-gray-100">
        <div className="grid md:grid-cols-2">
          <div className="h-[400px] md:h-auto bg-gray-300 relative">
            <img src="https://placehold.co/800x600/0e2a47/white?text=Roof+Soft+Wash" alt="Roof Soft Washing Algae Removal" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 bg-[#0e2a47] text-white py-2 px-6 font-bold uppercase tracking-widest text-sm">Roof Care</div>
          </div>
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <CloudRain className="w-8 h-8 text-[#0e2a47]" />
              <h3 className="text-3xl font-serif font-bold text-[#0e2a47]">Roof Soft Washing (Algae / Black Streak Removal)</h3>
            </div>
            <h4 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-6">Safe Low-Pressure Shingle Restoration</h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              Those black streaks on your roof aren't just dirt—they're a form of algae called Gloeocapsa Magma that eats away at your shingles. Our soft wash process kills the growth without using high pressure.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Instantly Removes Black Streaks</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Extends Shingle Life & Energy Efficiency</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">HOA Compliance Guaranteed</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToEstimate('Roof Cleaning')}
              className="self-start px-8 py-3 text-white font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity rounded-sm"
              style={{ backgroundColor: brandNavy }}
            >
              Get Roof Quote
            </button>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        GALLERY SECTION (Masonry + Lightbox)
        =============================================
      */}
      <section id="gallery" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 block">Recent Work</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0e2a47]">Recent Exterior Cleaning Projects in Tomball</h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative break-inside-avoid rounded-sm overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${img.aspect}`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0e2a47]/0 group-hover:bg-[#0e2a47]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="w-10 h-10 drop-shadow-md text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm font-medium mb-6">Want to see more? Follow us on social media.</p>
            <button onClick={() => scrollToEstimate('Gallery Request')} className="inline-flex items-center gap-2 border-b-2 border-red-600 pb-1 text-[#0e2a47] font-bold uppercase tracking-widest hover:text-red-600 transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxOpen(false)}>
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
              />
              <div className="absolute bottom-[-3rem] left-0 w-full text-center">
                <span className="text-white/80 font-bold tracking-widest uppercase text-sm">
                  {galleryImages[currentImageIndex].alt} ({currentImageIndex + 1} / {galleryImages.length})
                </span>
              </div>
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </section>

      {/* 
        =============================================
        REVIEWS (Dark Navy "Wall of Trust")
        =============================================
      */}
      <section id="reviews" className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: brandNavy }}>
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2 block">Word on the Street</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Top-Rated Tomball Pressure Washing Reviews.</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold text-lg">5.0/5.0</span>
              <span className="text-gray-400 text-sm">(50+ Verified Reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {config.testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-[#163b61] p-10 relative rounded-sm group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-6 left-6 opacity-20 text-white font-serif text-6xl leading-none">"</div>
                <p className="text-gray-200 mb-8 font-medium leading-relaxed relative z-10 pt-4">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase text-xs tracking-widest block">{t.name}</span>
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider">Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        =============================================
        ABOUT BLAKE (Trust Anchor)
        =============================================
      */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              {/* Photo Card */}
              <div className="aspect-[4/5] bg-gray-100 relative shadow-2xl rounded-sm overflow-hidden">
                <img src="/blake_selfie.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Blake Durand" />

                {/* Owner Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 border-l-4 border-red-600 shadow-sm">
                  <span className="block font-serif font-bold text-[#0e2a47] text-xl">Blake Durand</span>
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Owner & Operator</span>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -z-10 top-12 -left-12 w-full h-full border-2 border-[#0e2a47]/10 rounded-sm hidden md:block"></div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-50 rounded-full border border-red-100">
                <UserCheck className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-bold uppercase tracking-widest text-[10px]">Local Owner</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0e2a47] mb-8 leading-[1.1]">
                "I treat every home like it's my own."
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light mb-10">
                <p>
                  Hi, I'm <strong>Blake Durand</strong>. I founded Made New Pressure Washing to bring a higher level of service to Tomball.
                </p>
                <p>
                  You know the drill with most contractors: they don't call back, they show up late, or they rush the job. <strong>That's not us.</strong>
                </p>
                <p>
                  My promise is simple: We answer the phone. We show up on time. And we <strong>walk the job with you</strong> before we leave to ensure you are thrilled.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 p-4 bg-gray-50 border-l-2 border-red-600">
                  <ShieldCheck className="w-6 h-6 text-[#0e2a47]" />
                  <span className="font-bold text-[#0e2a47] text-sm">Fully Insured</span>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-gray-50 border-l-2 border-red-600">
                  <MapPin className="w-6 h-6 text-[#0e2a47]" />
                  <span className="font-bold text-[#0e2a47] text-sm">Local to Tomball</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        PROCESS SECTION (Trust Builder)
        =============================================
      */}
      <section id="process" className="py-24 bg-[#0e2a47] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Our Method</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-3">The "Made New" Process</h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">We don't rush. We follow a strict cleaning protocol to ensure safety and superior results.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-6xl font-black text-white/10 absolute -top-4 -left-4">01</div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Protect Property</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We wet down all landscaping and cover delicate items before spraying a single drop.</p>
            </div>
            <div className="relative">
              <div className="text-6xl font-black text-white/10 absolute -top-4 -left-4">02</div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Apply Solution</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We apply our cleaning mix and <span className="font-bold text-white">let it dwell for 15-20 minutes</span>. This dwell time creates the deep clean.</p>
            </div>
            <div className="relative">
              <div className="text-6xl font-black text-white/10 absolute -top-4 -left-4">03</div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Soft Rinse</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We gently rinse away the dead algae and grime using low pressure, leaving zero damage behind.</p>
            </div>
            <div className="relative">
              <div className="text-6xl font-black text-white/10 absolute -top-4 -left-4">04</div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Walkthrough</h3>
              <p className="text-gray-400 text-sm leading-relaxed">The job isn't done until we walk the property with you (or send photos) to confirm it looks 100% new.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => scrollToEstimate('Process Step')}
              className="px-10 py-4 bg-white text-[#0e2a47] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm shadow-xl"
            >
              Schedule My Cleaning
            </button>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        OTHER SERVICES (Typography / Industrial List)
        =============================================
      */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0e2a47] mb-4">Complete Exterior Restoration</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From roof to curb, we have the specialized equipment to handle every inch of your property.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
            {[
              "Pressure Washing",
              "Soft Washing",
              "Wood Fence Restoration",
              "Trash Can Sanitization",
              "Gutter Cleaning"
            ].map((service, i) => (
              <div
                key={i}
                onClick={() => scrollToEstimate(service)}
                className="bg-[#0e2a47] p-8 flex flex-col items-center justify-center text-center cursor-pointer group hover:-translate-y-1 transition-transform duration-300 border-b-4 border-red-600 shadow-lg"
              >
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-red-100 transition-colors uppercase tracking-wide px-4">
                  {service}
                </h3>
                <div className="w-8 h-1 bg-white/20 mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button onClick={() => scrollToEstimate('Commercial Inquiry')} className="inline-block border-b-2 border-red-600 text-[#0e2a47] font-bold uppercase tracking-widest text-sm hover:text-red-600 transition-colors pb-1">
              Need Commercial Cleaning? Request an Estimate.
            </button>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        EMBEDDED ESTIMATE FORM (Clean Professional Style)
        =============================================
      */}
      <section id="estimate-form" className="py-24 bg-gray-50/50 border-y border-gray-100 relative overflow-hidden">

        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="bg-white rounded-sm shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-5">

              {/* Left Side: Solid Trust Context */}
              <div className="md:col-span-2 bg-[#0e2a47] p-10 md:p-12 text-white flex flex-col justify-between relative">
                <div className="relative z-10">
                  <div className="w-10 h-1.5 bg-red-600 mb-8"></div>
                  <h3 className="text-3xl font-serif font-bold mb-3 tracking-tight">Request Your <br />Professional Quote</h3>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-12">Fully Insured • Family Owned • Tomball, TX</p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-red-600 mt-0.5" />
                      <div>
                        <span className="block text-sm font-bold uppercase tracking-wider text-white">Full Satisfaction Guarantee</span>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-1">We don't leave until you're completely happy with the results.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="w-6 h-6 text-red-600 mt-0.5" />
                      <div>
                        <span className="block text-sm font-bold uppercase tracking-wider text-white">Fully Insured & Bonded</span>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-1">Your property is protected by our comprehensive liability policy.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                  <div className="bg-white/5 rounded-sm p-6 border border-white/10 backdrop-blur-sm shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Google Review</span>
                    </div>
                    <p className="text-xs text-gray-200 italic leading-relaxed mb-4">
                      "Blake was incredible. Professional, on-time, and my driveway looks brand new. Best pressure washing company in Tomball by far."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-[10px]">BM</div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wide">Brendan M.</span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Local Resident</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Clean Input Form */}
              <div className="md:col-span-3 p-10 md:p-14 bg-white">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#0e2a47] uppercase tracking-[0.1em] opacity-60">Service Requested</label>
                    <div className="relative group">
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3.5 font-bold text-[#0e2a47] focus:border-red-600 focus:bg-white focus:ring-0 outline-none appearance-none cursor-pointer transition-all uppercase text-xs tracking-widest shadow-sm"
                      >
                        <option>Pressure Washing</option>
                        <option>Soft Washing</option>
                        <option>Roof Cleaning</option>
                        <option>Driveway / Concrete</option>
                        <option>Gutter Cleaning</option>
                        <option>General Inquiry</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#0e2a47] transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#0e2a47] uppercase tracking-[0.1em] opacity-60">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3.5 font-bold text-gray-900 focus:border-red-600 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300 text-sm shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#0e2a47] uppercase tracking-[0.1em] opacity-60">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3.5 font-bold text-gray-900 focus:border-red-600 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300 text-sm shadow-sm"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#0e2a47] uppercase tracking-[0.1em] opacity-60">Service Address</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3.5 font-bold text-gray-900 focus:border-red-600 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300 text-sm shadow-sm"
                      placeholder="Street, City, Zip"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-red-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-sm hover:bg-red-700 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
                    >
                      <span className="relative z-10">
                        {submitting ? 'Sending Request...' : 'Get My Free Quote'}
                      </span>
                      {!submitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />}
                    </button>

                    <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest mt-8">
                      Professional Grade Service • Reliable • Local
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        FOOTER - SEO RICH
        =============================================
      */}
      <footer id="footer-main" className="bg-[#0e2a47] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <img src="/logo-full.svg" alt="Made New Logo" className="h-16 mb-6 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed mb-6">
                Making dirty things look new again. Professional pressure washing and soft washing services for Tomball and Greater Houston.
              </p>
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-5 h-5 text-red-500" /> {config.phone}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Service Menu</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToEstimate('Pressure Washing'); }} className="hover:text-white transition-colors">Residential Pressure Washing</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToEstimate('Soft Washing'); }} className="hover:text-white transition-colors">Soft Wash Roof Cleaning</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToEstimate('Driveway Cleaning'); }} className="hover:text-white transition-colors">Concrete Driveway Cleaning</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToEstimate('Commercial'); }} className="hover:text-white transition-colors">Commercial Building Washing</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToEstimate('Graffiti'); }} className="hover:text-white transition-colors">Graffiti Removal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Service Areas</h4>
              <p className="text-gray-400 text-sm leading-loose">
                Proudly serving <strong>Tomball, TX</strong> and: <br />
                Spring (77379, 77373) • Cypress (77429, 77433) • Magnolia (77354) • The Woodlands (77380) • Hufsmith • Rose Hill • Klein • and the entire Greater Houston Metroplex.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 text-center text-gray-500 text-xs font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {config.businessName}. All Rights Reserved. • Powered by The Contractor Scale.
          </div>
        </div>
      </footer>
    </div>
  );
}