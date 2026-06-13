// src/app/dashboard/_components/sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { createBrowserSupabaseClient } from "@/lib/supabase-client";
import type { NavItem as NavItemType } from "@/lib/types";

const NAV_ITEMS: NavItemType[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses",   label: "Courses",   icon: "BookOpen",        href: "/dashboard/courses" },
  { id: "progress",  label: "Progress",  icon: "BarChart2",       href: "/dashboard/progress" },
];

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  BookOpen,
  BarChart2,
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    return href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
  }

  async function handleLogout() {
    try {
      setLoggingOut(true);
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setLoggingOut(false);
    }
  }

  const isSettingsActive = pathname.startsWith("/dashboard/settings");

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <motion.nav
        aria-label="Main navigation"
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
          relative hidden md:flex
          flex-col h-screen sticky top-0
          bg-neutral-900/70 backdrop-blur-xl
          border-r border-neutral-800/60
          overflow-hidden z-20 flex-shrink-0
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-neutral-800/60 px-4 py-5">
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
        <ul role="list" className="flex flex-1 flex-col gap-1 px-2 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon   = ICON_MAP[item.icon];
            const active = isActive(item.href);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative flex items-center gap-3 rounded-xl px-3 py-2.5
                    text-sm font-medium transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                    ${active
                      ? "text-violet-300"
                      : "text-neutral-500 hover:bg-neutral-800/60 hover:text-neutral-300"
                    }
                  `}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-xl bg-violet-600/15 ring-1 ring-violet-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex-shrink-0">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
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
          })}
        </ul>

        {/* Bottom: Settings + Logout */}
        <div className="border-t border-neutral-800/60 px-2 pb-4 pt-3 flex flex-col gap-1">
          <Link
            href="/dashboard/settings"
            aria-current={isSettingsActive ? "page" : undefined}
            className={`
              relative flex items-center gap-3 rounded-xl px-3 py-2.5
              text-sm font-medium transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              ${isSettingsActive
                ? "text-violet-300"
                : "text-neutral-500 hover:bg-neutral-800/60 hover:text-neutral-300"
              }
            `}
          >
            {isSettingsActive && (
              <motion.span
                layoutId="sidebar-settings-pill"
                className="absolute inset-0 rounded-xl bg-violet-600/15 ring-1 ring-violet-500/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex-shrink-0">
              <Settings className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  key="settings-label"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10 whitespace-nowrap"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5
              text-sm text-neutral-500 transition-colors duration-150
              hover:bg-neutral-800/60 hover:text-neutral-300
              disabled:opacity-50 disabled:cursor-not-allowed
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
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap"
                >
                  {loggingOut ? "Logging out…" : "Log out"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="
            absolute -right-3 top-[72px] z-30
            flex h-6 w-6 items-center justify-center
            rounded-full bg-neutral-800 ring-1 ring-neutral-700
            text-neutral-400 hover:text-neutral-200
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
          "
        >
          {collapsed
            ? <ChevronRight className="h-3.5 w-3.5" />
            : <ChevronLeft  className="h-3.5 w-3.5" />
          }
        </button>
      </motion.nav>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav
        aria-label="Mobile navigation"
        className="
          fixed bottom-0 left-0 right-0 z-20
          flex md:hidden items-center justify-around
          border-t border-neutral-800/60
          bg-neutral-900/90 backdrop-blur-xl
          h-16 px-2
        "
      >
        {[...NAV_ITEMS, { id: "settings", label: "Settings", icon: "Settings", href: "/dashboard/settings" }].map((item) => {
          const Icon = ({ ...ICON_MAP, Settings } as Record<string, React.ElementType>)[item.icon];
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className="
                relative flex flex-1 flex-col items-center gap-1 rounded-lg py-2
                text-xs font-medium
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              "
            >
              {active && (
                <motion.span
                  layoutId="mobile-active-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-xl bg-violet-600/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`relative h-5 w-5 ${active ? "text-violet-400" : "text-neutral-500"}`}
                strokeWidth={1.8}
              />
              <span className={`relative ${active ? "text-violet-400" : "text-neutral-600"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}