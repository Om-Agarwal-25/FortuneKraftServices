'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import type { Service, ServiceCategory, ModalMode } from '@/types'
import { services } from '@/lib/servicesData'
import ServiceCard from '@/components/ServiceCard'
import ServiceModal from '@/components/ServiceModal'
import Link from 'next/link'
import { Zap, Moon, TrendingUp } from 'lucide-react'

const CATEGORIES: ServiceCategory[] = ['All', 'Intraday Alpha', 'BTST Alpha', 'Positional Alpha']

function ServicesContent(): JSX.Element {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') as ServiceCategory | null

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('description')

  useEffect(() => {
    if (initialTab && CATEGORIES.includes(initialTab)) {
      setActiveCategory(initialTab)
    }
  }, [initialTab])

  const filteredServices: Service[] = activeCategory === 'All'
    ? services
    : services.filter((s) => s.title.startsWith(activeCategory))

  const handleDescriptionClick = (service: Service): void => {
    setModalMode('description')
    setSelectedService(service)
  }

  const handleBuyClick = (service: Service): void => {
    setModalMode('buy')
    setSelectedService(service)
  }

  const closeModal = (): void => {
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a3a5c] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,165,0,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/50">&gt;</span>
            <span>Our Services</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">Our Services</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Explore our research service plans, designed to match your trading style and risk appetite.</p>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="bg-[#F8F9FA] py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Intraday Alpha Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A1628] rounded-2xl p-8 border-t-[4px] border-t-gold shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <Zap size={40} className="text-gold" />
                <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Same Day Exit</span>
              </div>
              <h3 className="text-white font-display text-2xl font-bold mb-4">Intraday Alpha</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                Cash-market intraday research service for active traders. Capture short-term opportunities within the same trading day with 1–2 research-backed trade ideas daily.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">1–2 Trades/Day</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">Same Day Exit</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">WhatsApp Alerts</span>
              </div>
            </motion.div>

            {/* BTST Alpha Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A1628] rounded-2xl p-8 border-t-[4px] border-t-gold shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <Moon size={40} className="text-gold" />
                <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Overnight Momentum</span>
              </div>
              <h3 className="text-white font-display text-2xl font-bold mb-4">BTST Alpha</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                Buy Today Sell Tomorrow research service for traders seeking overnight momentum opportunities. 1 research-backed trade issued daily between 2:45–3:15 PM.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">1 Trade/Day</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">Exit Next Morning</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">WhatsApp Alerts</span>
              </div>
            </motion.div>

            {/* Positional Alpha Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0A1628] rounded-2xl p-8 border-t-[4px] border-t-gold shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <TrendingUp size={40} className="text-gold" />
                <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">2 Week Holding</span>
              </div>
              <h3 className="text-white font-display text-2xl font-bold mb-4">Positional Alpha</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                Short-term positional research service for traders who prefer holding stocks for days to weeks. 3–4 carefully researched opportunities per month.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">3–4 Trades/Month</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">~2 Week Hold</span>
                <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded">WhatsApp Alerts</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="sticky top-[72px] lg:top-[88px] z-40 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-2 gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeCategory === cat ? 'text-navy' : 'text-gray-500 hover:text-navy hover:bg-gray-100'
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ServiceCard
                  service={service}
                  onDescriptionClick={handleDescriptionClick}
                  onBuyClick={handleBuyClick}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          mode={modalMode}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default function ServicesPage(): JSX.Element {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading Services...</div>}>
      <ServicesContent />
    </Suspense>
  )
}

