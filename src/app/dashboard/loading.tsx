import SkeletonTile from "./_components/bento/SkeletonTile";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonTile variant="hero" className="lg:col-span-2" />
      <SkeletonTile variant="activity" />
      <SkeletonTile variant="course" />
      <SkeletonTile variant="course" />
      <SkeletonTile variant="course" />
    </div>
  );
}