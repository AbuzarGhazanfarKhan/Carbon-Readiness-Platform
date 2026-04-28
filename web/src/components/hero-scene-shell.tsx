"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(39,221,180,0.2),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(149,237,255,0.16),transparent_18%),radial-gradient(circle_at_84%_78%,rgba(243,166,107,0.16),transparent_16%),linear-gradient(135deg,#03080d_0%,#08131e_44%,#0c1824_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:92px_92px] opacity-50" />
        <div className="absolute left-[10%] top-[14%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(39,221,180,0.24),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(149,237,255,0.18),transparent_72%)] blur-3xl" />
        <div className="absolute left-8 top-8 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#dce6e2] backdrop-blur-xl">
          Rendering command scene
        </div>
        <div className="absolute right-10 top-24 h-24 w-40 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,24,35,0.88)_0%,rgba(7,14,21,0.82)_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl" />
        <div className="absolute bottom-10 left-10 h-20 w-48 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,24,35,0.92)_0%,rgba(7,14,21,0.84)_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl" />
      </div>
    ),
  },
);

export function HeroSceneShell() {
  return <HeroScene />;
}