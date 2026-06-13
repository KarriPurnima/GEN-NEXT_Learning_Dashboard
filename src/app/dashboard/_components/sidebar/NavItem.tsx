// src/app/dashboard/_components/sidebar/NavItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import type { NavItem as NavItemType } from "@/lib/types";

interface NavItemProps {
  item: NavItemType;
  icon: ReactNode;
  collapsed: boolean;
  onClick?: () => void;
}

export default function NavItem({ item, icon, collapsed, onClick }: NavItemProps) {
  const pathname = usePathname();
  // Match exact for /dashboard, prefix for sub-routes
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={`
          relative flex items-center gap-3 rounded-xl px-3 py-2.5
          text-sm font-medium
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
          ${isActive
            ? "text-violet-300"
            : "text-neutral-500 hover:bg-neutral-800/60 hover:text-neutral-300"
          }
        `}
      >
        {/* Animated background highlight (layoutId for spring snap) */}
        {isActive && (
          <motion.span
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-xl bg-violet-600/15 ring-1 ring-violet-500/20"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        {/* Icon */}
        <span className="relative z-10 flex-shrink-0">{icon}</span>

        {/* Label — hidden when collapsed */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="relative z-10 whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </li>
  );
}