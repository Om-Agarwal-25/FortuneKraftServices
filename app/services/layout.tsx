import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | FortuneKraft Consultancy',
  description: 'Explore structured stock market research service plans across Equity Research, Intraday, BTST, and Positional segments from FortuneKraft Consultancy.',
}

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
