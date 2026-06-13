// src/app/dashboard/_components/sidebar/Sidebar.tsx
// ─────────────────────────────────────────────────────────────
// CLIENT COMPONENT — owns collapse state and Framer layoutId
// animations. Responds to three breakpoints:
//   mobile  (<768px)  → fixed bottom navigation bar
//   tablet  (768–1024px) → icon-only slim sidebar
//   desktop (>1024px) → full sidebar with labels, collapsible
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NavItem from "./NavItem";
import type { NavItem as NavItemType } from "@/lib/types";

// ── Static nav config ─────────────────────────────────────────
const NAV_ITEMS: NavItemType[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses",   label: "Courses",   icon: "BookOpen",        href: "/dashboard/courses" },
  { id: "progress",  label: "Progress",  icon: "BarChart2",       href: "/dashboard/progress" },
  { id: "settings",  label: "Settings",  icon: "Settings",        href: "/dashboard/settings" },
];

// Map icon string → Lucide component for the sidebar
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
};

// ─────────────────────────────────────────────────────────────
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId]   = useState("dashboard");

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          DESKTOP / TABLET SIDEBAR  (hidden on mobile)
      ══════════════════════════════════════════════════════ */}
      <motion.nav
        aria-label="Main navigation"
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
          relative hidden md:flex
          flex-col
          h-screen sticky top-0
          bg-neutral-900/70 backdrop-blur-xl
          border-r border-neutral-800/60
          overflow-hidden
          z-20
        "
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-neutral-800/60">
          <span className="flex-shrink-0 rounded-xl bg-violet-600/20 p-2">
            <GraduationCap className="h-5 w-5 text-violet-400" />
          </span>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                key="logo-text"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="whitespace-nowrap text-sm font-semibold tracking-wide text-neutral-100"
              >
                LearnForge
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <ul role="list" className="flex flex-col gap-1 flex-1 px-2 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <NavItem
                key={item.id}
                item={item}
                icon={<Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.8} />}
                isActive={activeId === item.id}
                collapsed={collapsed}
                onClick={() => setActiveId(item.id)}
              />
            );
          })}
        </ul>

        {/* Footer: logout */}
        <div className="px-2 pb-4 border-t border-neutral-800/60 pt-3">
          <button
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5
              text-sm text-neutral-500
              transition-colors duration-150
              hover:bg-neutral-800/60 hover:text-neutral-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
            "
          >
            <LogOut className="h-5 w-5 flex-shrink-0" strokeWidth={1.8} />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  key="logout-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Log out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="
            absolute -right-3 top-[72px]
            flex h-6 w-6 items-center justify-center
            rounded-full bg-neutral-800 ring-1 ring-neutral-700
            text-neutral-400 hover:text-neutral-200
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
            z-30
          "
        >
          {collapsed
            ? <ChevronRight className="h-3.5 w-3.5" />
            : <ChevronLeft  className="h-3.5 w-3.5" />
          }
        </button>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════
          MOBILE BOTTOM NAV  (visible only on mobile)
      ══════════════════════════════════════════════════════ */}
      <nav
        aria-label="Mobile navigation"
        className="
          fixed bottom-0 left-0 right-0 z-20
          flex md:hidden
          items-center justify-around
          border-t border-neutral-800/60
          bg-neutral-900/80 backdrop-blur-xl
          h-16 px-2
        "
      >
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="
                relative flex flex-col items-center gap-1
                flex-1 py-2
                text-xs font-medium
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                rounded-lg
              "
            >
              {/* Active pill indicator behind the icon */}
              {isActive && (
                <motion.span
                  layoutId="mobile-active-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-xl bg-violet-600/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`relative h-5 w-5 ${isActive ? "text-violet-400" : "text-neutral-500"}`}
                strokeWidth={1.8}
              />
              <span className={`relative ${isActive ? "text-violet-400" : "text-neutral-600"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}