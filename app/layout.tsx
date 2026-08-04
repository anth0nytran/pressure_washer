import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pressure Washing Tomball TX | House & Driveway Cleaning | Made New',
  description: '#1 Rated Pressure Washing & Soft Washing in Tomball, TX. ⭐ 5-Star Google Reviews. Driveways, Houses, Roofs & Fences. Serving Spring, Cypress, Magnolia & The Woodlands. Free Same-Day Estimates. Call 832-334-8014',
  keywords: 'pressure washing tomball tx, pressure washing near me, soft washing tomball, house washing spring tx, driveway cleaning cypress, roof cleaning magnolia, power washing the woodlands, exterior cleaning houston, commercial pressure washing, fence cleaning tomball, gutter cleaning houston, trash can cleaning',
  openGraph: {
    title: 'Made New Pressure Washing | Tomball, TX',
    description: 'Making dirty things look new again. Professional pressure washing and soft washing in Tomball, Spring, Cypress, Magnolia & The Woodlands. 5-Star Rated. Free Estimates.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Made New Pressure Washing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Washing Tomball TX | Made New',
    description: '5-Star rated pressure washing & soft washing in Tomball and Greater Houston. Free same-day estimates. Call 832-334-8014',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.madenewpressurewashing.com',
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Tomball',
    'geo.position': '30.0958;-95.6161',
    'ICBM': '30.0958, -95.6161',
  },
  metadataBase: new URL('https://www.madenewpressurewashing.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Made New Pressure Washing, LLC',
              image: 'https://www.madenewpressurewashing.com/opengraph-image.png',
              '@id': 'https://www.madenewpressurewashing.com',
              url: 'https://www.madenewpressurewashing.com',
              telephone: '832-334-8014',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '13226 Cameron Reach Dr.',
                addressLocality: 'Tomball',
                addressRegion: 'TX',
                postalCode: '77377',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 30.0958,
                longitude: -95.6161,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '3',
                bestRating: '5',
                worstRating: '1',
              },
              areaServed: [
                {
                  '@type': 'AdministrativeArea',
                  name: 'Greater Houston',
                },
                {
                  '@type': 'City',
                  name: 'Tomball',
                },
                {
                  '@type': 'City',
                  name: 'Spring',
                },
                {
                  '@type': 'City',
                  name: 'Cypress',
                },
                {
                  '@type': 'City',
                  name: 'Magnolia',
                },
                {
                  '@type': 'City',
                  name: 'The Woodlands',
                },
              ],
              serviceType: [
                'Pressure Washing',
                'Soft Washing',
                'House Washing',
                'Roof Cleaning',
                'Gutter Cleaning',
                'Fence Washing',
                'Trash Can Cleaning',
                'Exterior Cleaning',
              ],
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '07:00',
                closes: '19:00',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much does pressure washing cost in Tomball TX?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pricing depends on size, surface, and buildup. Most house and exterior washes in Tomball and the Greater Houston area run $200-$600 depending on size and conditions. We provide free, no-obligation estimates by call or text at 832-334-8014.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the difference between pressure washing and soft washing?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pressure washing uses high PSI for concrete and other hard surfaces like driveways and sidewalks. Soft washing uses a cleaning solution with low pressure for delicate surfaces like siding, roofs, stucco, brick, and fences. The solution dwells for 15-20 minutes to kill algae and mildew at the root.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How often should I pressure wash my house in Houston?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In Greater Houston, most homes need an exterior clean every 12-18 months due to humidity, pollen, and algae. Driveways and sidewalks may need cleaning every 6-12 months. Regular cleaning protects your property value and prevents permanent staining.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you offer same-day pressure washing service in Tomball?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! We offer same-day estimates and often schedule within 24-48 hours depending on availability. Call or text 832-334-8014 for immediate scheduling. We serve Tomball, Spring, Cypress, Magnolia, The Woodlands, and throughout Greater Houston.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Will pressure washing damage my roof or siding?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We never pressure wash roofs or siding - that would cause damage. Instead, we soft wash them with a safe cleaning mix and low pressure to protect shingles, paint, and landscaping while still eliminating algae, mold, and mildew.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What areas do you serve for pressure washing?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We serve the entire Greater Houston area, including Tomball (77377), Spring (77379, 77373), Cypress (77429, 77433), Magnolia (77354), The Woodlands (77380), Klein, Hufsmith, Rose Hill, and surrounding communities. Free estimates for all locations.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you clean gutters and fences too?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! We offer gutter cleaning, gutter brightening, fence restoration, and trash can sanitization as standalone services or bundled with house washing. We can handle your entire exterior in one visit.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
