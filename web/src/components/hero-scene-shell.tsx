"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[radial-gradient(circle_at_24%_20%,rgba(255,219,166,0.24),transparent_24%),radial-gradient(circle_at_76%_74%,rgba(108,214,199,0.16),transparent_20%),linear-gradient(145deg,#102720_0%,#12322a_44%,#173b32_100%)]" />
    ),
  },
);

export function HeroSceneShell() {
  return <HeroScene />;
}