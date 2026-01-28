export interface BusinessConfig {
  businessName: string;
  brandLine?: string;
  city: string;
  phone: string;
  primaryService: string;
  ctaPrimary: string;
  accent: {
    hex: string;
  };
  theme: {
    isDark: boolean;
    colors: {
      pageBg: string;
      surfaceBg: string;
      cardBg: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      border: string;
      borderLight: string;
      darkBg: string;
    };
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  rating?: number;
  reviewCount?: number;
  yearsInBusiness?: number;
  testimonials: Array<{
    name: string;
    quote: string;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
  imagePlaceholders: Array<{
    label: string;
    hint: string;
  }>;
  serviceArea?: string;
  email?: string;
}

export const defaultConfig: BusinessConfig = {
  businessName: 'Made New Pressure Washing, LLC',
  brandLine: 'Making dirty things look new again - spray the old away.',
  city: 'Greater Houston Area',
  serviceArea: 'Greater Houston area',
  phone: '832-427-2439',
  primaryService: 'Pressure Washing and Soft Washing',
  ctaPrimary: 'Request a Quote',
  email: 'blake@madenewpressurewashing.com',
  accent: {
    hex: '#1e40af', // Darker Blue (not navy - blue-800)
  },
  theme: {
    isDark: false,
    colors: {
      pageBg: '#ffffff',
      surfaceBg: '#f8fafc',
      cardBg: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textMuted: '#94a3b8',
      border: '#e2e8f0',
      borderLight: '#f1f5f9',
      darkBg: '#1e293b',
    },
  },
  services: [
    {
      id: 'pressure-washing',
      title: 'Pressure Washing',
      description: 'Deep high-pressure cleaning for concrete driveways, sidewalks, and patios to remove tough stains.',
      icon: 'Zap',
    },
    {
      id: 'soft-washing',
      title: 'Soft Washing',
      description: 'Safe low-pressure treatment for delicate surfaces like stucco and siding to kill algae and mold.',
      icon: 'Droplets',
    },
    {
      id: 'house-wash',
      title: 'House Washing',
      description: 'Complete exterior cleaning to restore your home’s curb appeal and protect your paint.',
      icon: 'Home',
    },
    {
      id: 'roof-wash',
      title: 'Roof Cleaning',
      description: 'Gentle removal of black streaks and moss to extend the life of your shingles.',
      icon: 'Umbrella',
    },
    {
      id: 'gutter-cleaning',
      title: 'Gutter Cleaning',
      description: 'Removal of debris and exterior brightening to ensure proper drainage and great looks.',
      icon: 'Layers',
    },
    {
      id: 'fence-washing',
      title: 'Fence Restoration',
      description: 'Strip away gray weathering and biological growth to make your wood fence look new.',
      icon: 'PanelTop',
    },
    {
      id: 'trash-can',
      title: 'Trash Can Cleaning',
      description: 'Sanitizing and deodorizing service to eliminate odors and bacteria from your bins.',
      icon: 'Trash2',
    },
  ],
  rating: 5.0,
  reviewCount: 50,
  yearsInBusiness: 5,
  testimonials: [
    {
      name: 'Lauren Sporrer',
      quote: 'Kind, thorough and trustworthy. Highly recommend.',
    },
    {
      name: 'Nadeem Elnasr',
      quote: 'Incredibly detailed and thorough. Walked me through everything afterward.',
    },
    {
      name: 'Dr Bee',
      quote: 'Amazing job making my patio and backyard look like new. Great work ethic. Reasonable price.',
    },
    {
      name: 'Laurie Looper',
      quote: 'Great communication and great attention to detail!',
    },
    {
      name: 'Logan Baranowski',
      quote: 'Professional, careful with our landscaping. Every inch done right.',
    },
  ],
  faqs: [
    {
      q: 'How much does pressure washing cost in Greater Houston?',
      a: 'Pricing depends on size, surface, and buildup. We give free, no-obligation estimates by call or text. Most house and exterior washes in the Houston area run $200-$600 depending on size and conditions.',
    },
    {
      q: 'What is the difference between pressure washing and soft washing?',
      a: 'Pressure washing uses high PSI for concrete and other hard surfaces. Soft washing uses a cleaning solution and water, lets it dwell 15-20 minutes, then rinses with low pressure for siding, roofs, stucco, brick, and fences. It cleans deep and protects surfaces.',
    },
    {
      q: 'How often should I pressure wash or soft wash my house in Houston?',
      a: 'In Greater Houston, most homes need an exterior clean every 12-18 months due to humidity, pollen, and algae. Driveways and sidewalks may need cleaning every 6-12 months. Regular cleaning protects your property value.',
    },
    {
      q: 'Do you offer same-day pressure washing service?',
      a: 'Yes. We offer same-day estimates and often schedule within 24-48 hours depending on availability. It is simple to get on our schedule. Call or text 832-427-2439 for immediate scheduling. We serve Tomball, Spring, Cypress, Magnolia, The Woodlands, and throughout Greater Houston.',
    },
    {
      q: 'Will pressure washing damage my roof or siding?',
      a: 'We do not pressure wash roofs or siding. We soft wash them with a safe cleaning mix and low pressure to protect shingles, paint, and landscaping.',
    },
    {
      q: 'Do you clean gutters when you pressure wash?',
      a: 'Yes. We offer gutter cleaning and brightening as part of house washing or as a standalone service. We can also clean fences and trash cans during the same visit.',
    },
    {
      q: 'What areas do you serve for pressure washing and soft washing?',
      a: 'We serve the entire Greater Houston area, including Tomball, Spring, Cypress, Magnolia, The Woodlands, and surrounding communities. We provide free estimates for all locations within our service area.',
    },
  ],
  imagePlaceholders: [
    {
      label: 'Before Photo',
      hint: 'Dirty driveway, siding, or patio',
    },
    {
      label: 'After Photo',
      hint: 'Clean, like-new results',
    },
    {
      label: 'Crew Photo',
      hint: 'Professional team at work',
    },
  ],
};
