// src/app/dashboard/settings/page.tsx
import DashboardShell from "../_components/DashboardShell";
import SettingsView from "./_components/SettingsView";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">Settings</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your account and preferences.
          </p>
        </div>
        <SettingsView />
      </div>
    </DashboardShell>
  );
}