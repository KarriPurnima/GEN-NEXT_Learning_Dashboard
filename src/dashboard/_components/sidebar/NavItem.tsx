// src/app/dashboard/_components/sidebar/NavItem.tsx
// ─────────────────────────────────────────────────────────────
// Single nav row inside the desktop sidebar.
// The active background highlight uses Framer Motion's `layoutId`
// so it physically slides/snaps between items when you click —
// never teleports, never repaints layout.
// ─────────────────────────────────────────────────────────────

"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import type { NavItem as NavItemType } from "@/lib/types";

interface NavItemProps {
  item: NavItemType;
  icon: ReactNode;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

export default function NavItem({
  item,
  icon,
  isActive,
  collapsed,
  onClick,
}: NavItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        title={collapsed ? item.label : undefined}   // tooltip when icon-only
        className="
          relative flex w-full items-center gap-3
          rounded-xl px-3 py-2.5
          text-sm font-medium
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
          group
        "
      >
        {/*
          ── Active background highlight ──────────────────────
          `layoutId="sidebar-active-bg"` makes Framer Motion
          track this element across all NavItem instances.
          When `isActive` switches, the highlight animates
          (spring physics) from its previous position to the new
          one — a single shared element, not multiple toggles.
        */}
        {isActive && (
          <motion.span
            layoutId="sidebar-active-bg"
            aria-hidden
            className="
              absolute inset-0 rounded-xl
              bg-violet-600/20
              ring-1 ring-violet-500/30
            "
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        {/* Icon — always visible */}
        <span
          className={`
            relative z-10
            ${isActive ? "text-violet-400" : "text-neutral-500 group-hover:text-neutral-300"}
            transition-colors duration-150
          `}
        >
          {icon}
        </span>

        {/* Label — hidden when sidebar is collapsed */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className={`
                relative z-10 whitespace-nowrap
                ${isActive ? "text-violet-300" : "text-neutral-400 group-hover:text-neutral-200"}
                transition-colors duration-150
              `}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
}