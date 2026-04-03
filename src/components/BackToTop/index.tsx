"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [show, setShow] = useState(false);

  const handleScroll = useCallback(() => {
    setShow(window.scrollY > 480);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-5 bottom-5 z-30"
          exit={{ opacity: 0, y: 12 }}
          initial={{ opacity: 0, y: 12 }}
        >
          <Button
            aria-label="Back to top"
            className="rounded-full shadow-glow"
            onClick={scrollToTop}
            size="icon"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
