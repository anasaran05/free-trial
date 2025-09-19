"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
  getClassName?: (word: string) => string; // ✅ Used for conditional styling
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  className,
  getClassName, // ✅ receive the prop
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[index];

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentWord} // ✅ force re-render on change
          className={cn(
            "transition-colors duration-500 ease-in-out", // ✅ smooth color transition
            className,
            getClassName ? getClassName(currentWord) : ""
          )}
          {...motionProps}
        >
          {currentWord}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}