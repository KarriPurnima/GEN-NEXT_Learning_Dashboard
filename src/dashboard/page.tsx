// src/app/dashboard/page.tsx
import DashboardShell from "./_components/DashboardShell";
import BentoGrid from "./_components/bento/BentoGrid";
import HeroTile from "./_components/bento/HeroTile";
import ActivityTile from "./_components/bento/ActivityTile";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <BentoGrid>
        <HeroTile userName="Purnima" streakDays={12} className="sm:col-span-2" />
        <ActivityTile className="sm:col-span-1" />
      </BentoGrid>
    </DashboardShell>
  );
}