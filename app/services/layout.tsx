import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Fortune Kraft Consultancy',
  description: 'Explore tailored stock market advisory plans across Equity Research, Market insights, and Investment recommendations segments from Fortune Kraft Consultancy.',
}

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
