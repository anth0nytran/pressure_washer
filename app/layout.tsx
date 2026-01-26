import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pressure Washing and Soft Washing Tomball TX | Made New',
  description: 'Top-rated pressure washing and soft washing in Tomball, Spring, Cypress, Magnolia, and The Woodlands. House and roof wash, driveways, gutters, fences, trash can cleaning. Free estimates, fast scheduling. Call 832-427-2439.',
  keywords: 'pressure washing tomball, soft washing tomball, house washing tomball, roof cleaning tomball, driveway pressure washing, gutter cleaning tomball, fence washing, trash can cleaning tomball, exterior cleaning, pressure washing spring tx, pressure washing cypress, pressure washing magnolia, pressure washing the woodlands',
  openGraph: {
    title: 'Made New Pressure Washing | Pressure Washing and Soft Washing in Tomball, TX',
    description: 'Making dirty things look new again. Pressure washing and soft washing in Greater Houston for concrete, roofs, siding, gutters, fences, and trash can cleaning. Free estimates, fast scheduling.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
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
              image: 'https://madenewpressurewashing.com/logo.jpg',
              '@id': 'https://madenewpressurewashing.com',
              url: 'https://madenewpressurewashing.com',
              telephone: '832-427-2439',
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
              areaServed: [
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
                opens: '00:00',
                closes: '23:59',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
