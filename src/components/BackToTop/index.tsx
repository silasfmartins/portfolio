'use client'

import { useCallback, useEffect, useState } from 'react'

import { Button } from '../Button'
import { ArrowUp } from 'lucide-react'

import { AnimatePresence, motion } from 'framer-motion'

export function BackToTop() {
  const [show, setShow] = useState(false)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScroll = useCallback(() => {
    if (!show && window.scrollY > 500) setShow(true)
    if (show && window.scrollY <= 500) setShow(false)
  }, [show])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 right-4 z-20"
          initial={{ opacity: 0, right: -10 }}
          animate={{ opacity: 1, right: 16 }}
          exit={{ opacity: 0, right: -10 }}
        >
          <Button
            onClick={scrollToTop}
            className="shadow-lg shadow-emerald-800/20 dark:shadow-emerald-400/20"
          >
            <ArrowUp size={20} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
