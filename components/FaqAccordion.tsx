'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { FaqItem } from '@/types'

interface FaqAccordionProps {
  faqs: FaqItem[]
}

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function FaqAccordion({ faqs }: FaqAccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string): void {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col gap-4"
    >
      {faqs.map((faq) => {
        const isOpen = openId === faq.id

        return (
          <motion.div
            key={faq.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors focus:outline-none"
            >
              <span className="text-[#0A1628] font-medium text-base pr-8 leading-snug">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className="flex-shrink-0 text-gold"
              >
                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-2 border-l-4 border-gold ml-4 mr-6 text-gray-600 leading-relaxed mb-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
