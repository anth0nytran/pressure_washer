import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pressure Washing Greater Houston | Made New | Tomball, Spring, Woodlands',
  description: 'Top-rated pressure washing and soft washing in the Greater Houston Area. Serving Tomball, Spring, Cypress, Magnolia, and The Woodlands. Free estimates, fast scheduling.',
  keywords: 'pressure washing greater houston, exterior cleaning houston, pressure washing tomball, soft washing spring tx, house washing cypress, roof cleaning magnolia, driveway cleaning the woodlands, gutter cleaning houston, fence washing, trash can cleaning, commercial pressure washing houston',
  openGraph: {
    title: 'Made New Pressure Washing | Greater Houston Area',
    description: 'Making dirty things look new again. Professional pressure washing and soft washing across Greater Houston, including Tomball, Spring, Cypress, Magnolia, and The Woodlands.',
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
