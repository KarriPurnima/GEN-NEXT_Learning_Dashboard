// src/app/dashboard/_components/bento/BentoGrid.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tileVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <motion.section
      aria-label="Dashboard overview"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className={`
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        ${className}
      `}
    >
      {children}
    </motion.section>
  );
}