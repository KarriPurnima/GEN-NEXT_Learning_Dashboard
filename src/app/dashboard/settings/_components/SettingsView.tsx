// src/app/dashboard/settings/_components/SettingsView.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Palette, Shield, Save } from "lucide-react";

const TABS = [
  { id: "profile",       label: "Profile",       icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "account",       label: "Account",       icon: Shield },
];

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved]         = useState(false);

  // Profile state
  const [name,     setName]     = useState("Purnima");
  const [email,    setEmail]    = useState("purnima@example.com");
  const [bio,      setBio]      = useState("CS student passionate about building great products.");
  const [goal,     setGoal]     = useState("3");

  // Notifications state
  const [notifs, setNotifs] = useState({
    streakReminders: true,
    weeklyReport:    true,
    newCourses:      false,
    achievements:    true,
  });

  // Appearance state
  const [accentColor, setAccentColor] = useState("violet");
  const [fontSize,    setFontSize]    = useState("medium");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Tab sidebar */}
      <nav className="flex lg:flex-col gap-1 lg:w-48 flex-shrink-0">
        {TABS.map((tab) => {
          const Icon     = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium text-left transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                ${isActive ? "text-violet-300" : "text-neutral-500 hover:bg-neutral-800/60 hover:text-neutral-300"}
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="settings-tab-pill"
                  className="absolute inset-0 rounded-xl bg-violet-600/15 ring-1 ring-violet-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4 flex-shrink-0" strokeWidth={1.8} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Content panel */}
      <div className="flex-1 min-w-0">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-6 backdrop-blur-md space-y-5"
        >
          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <>
              <h2 className="text-base font-semibold text-neutral-200">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">{name}</p>
                  <p className="text-xs text-neutral-600">{email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-400">Display Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-400">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-400">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-400">Daily Lesson Goal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  >
                    {["1","2","3","5","10"].map((v) => (
                      <option key={v} value={v}>{v} lesson{v !== "1" ? "s" : ""} per day</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === "notifications" && (
            <>
              <h2 className="text-base font-semibold text-neutral-200">Notification Preferences</h2>
              <div className="space-y-3">
                {(Object.entries(notifs) as [keyof typeof notifs, boolean][]).map(([key, val]) => {
                  const labels: Record<string, { title: string; desc: string }> = {
                    streakReminders: { title: "Streak Reminders",  desc: "Daily nudges to keep your streak alive" },
                    weeklyReport:    { title: "Weekly Report",     desc: "Summary of your learning progress each week" },
                    newCourses:      { title: "New Courses",       desc: "Alerts when new content is added" },
                    achievements:    { title: "Achievements",      desc: "Notifications when you hit milestones" },
                  };
                  return (
                    <div key={key} className="flex items-center justify-between rounded-xl border border-neutral-800/60 p-4">
                      <div>
                        <p className="text-sm font-medium text-neutral-200">{labels[key].title}</p>
                        <p className="text-xs text-neutral-600">{labels[key].desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                        className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${val ? "bg-violet-600" : "bg-neutral-700"}`}
                      >
                        <motion.span
                          animate={{ x: val ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === "appearance" && (
            <>
              <h2 className="text-base font-semibold text-neutral-200">Appearance</h2>
              <div className="space-y-5">
                <div>
                  <label className="mb-3 block text-xs font-medium text-neutral-400">Accent Color</label>
                  <div className="flex gap-3">
                    {[
                      { id: "violet",  hex: "#7c3aed" },
                      { id: "cyan",    hex: "#06b6d4" },
                      { id: "emerald", hex: "#10b981" },
                      { id: "rose",    hex: "#f43f5e" },
                      { id: "amber",   hex: "#f59e0b" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setAccentColor(c.id)}
                        style={{ backgroundColor: c.hex }}
                        className={`h-8 w-8 rounded-full transition-all focus-visible:outline-none ${accentColor === c.id ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110" : "opacity-60 hover:opacity-100"}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-400">Font Size</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium (default)</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="rounded-xl border border-neutral-800/60 p-4">
                  <p className="text-xs text-neutral-500">Theme: <span className="text-neutral-300 font-medium">Dark (only)</span></p>
                  <p className="mt-0.5 text-xs text-neutral-600">Light mode is not available in this version.</p>
                </div>
              </div>
            </>
          )}

          {/* ── ACCOUNT ── */}
          {activeTab === "account" && (
            <>
              <h2 className="text-base font-semibold text-neutral-200">Account & Security</h2>
              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-800/60 p-4 space-y-3">
                  <p className="text-sm font-medium text-neutral-300">Change Password</p>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full rounded-xl border border-neutral-700/60 bg-neutral-800/60 px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  />
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-sm font-medium text-red-400">Danger Zone</p>
                  <p className="mt-1 text-xs text-neutral-600">Deleting your account is permanent and cannot be undone.</p>
                  <button className="mt-3 rounded-xl border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Save button */}
          <div className="flex items-center gap-3 pt-2 border-t border-neutral-800/60">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300 ring-1 ring-violet-500/30 transition-colors hover:bg-violet-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-medium text-emerald-400"
              >
                ✓ Saved successfully
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}