import { NavigationHint } from "./components/NavigationHint";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { useSlideNavigation, type SlideMeta } from "./motion/useSlideNavigation";
import { Slide01Hero } from "./slides/Slide01Hero";
import { Slide02Problem } from "./slides/Slide02Problem";
import { Slide03DataNeeds } from "./slides/Slide03DataNeeds";
import {
  Slide03Retargeting,
  Slide03RetargetingResults,
} from "./slides/Slide03Retargeting";
import {
  Slide04MotionDisco,
  Slide04MotionDiscoBanana,
  Slide04MotionDiscoPlanning,
} from "./slides/Slide04MotionDisco";
import { Slide05GDNB, Slide05GDNBFramework } from "./slides/Slide05GDNB";
import { Slide06Stack } from "./slides/Slide06Stack";
import { Slide07CTA } from "./slides/Slide07CTA";

const SLIDES: SlideMeta[] = [
  { id: "hero", label: "Hero" },
  { id: "problem", label: "Problem" },
  { id: "data-needs", label: "Physical AI Data" },
  { id: "retargeting", label: "Solution 01 Framework" },
  { id: "retargeting-results", label: "Solution 01 Results" },
  { id: "motiondisco", label: "Solution 02" },
  { id: "motiondisco-planning", label: "LLM Planning" },
  { id: "motiondisco-banana", label: "Banana Reaching" },
  { id: "gdnb", label: "Solution 03" },
  { id: "gdnb-framework", label: "GDNB Framework" },
  { id: "stack", label: "Unified Stack" },
  { id: "join", label: "Join" },
];

export default function App() {
  const { activeIndex } = useSlideNavigation(SLIDES);

  return (
    <>
      <div className="deck-background" aria-hidden="true">
        <div className="grid-layer" />
        <div className="ambient-trajectory ambient-trajectory-a" />
        <div className="ambient-trajectory ambient-trajectory-b" />
        <div className="noise-layer" />
      </div>

      <header className="deck-brand" aria-label="TUM ATARI Lab identity">
        <span className="brand-logo brand-logo-tum" aria-label="TUM logo">
          <img src="assets/brand/TUM.jpg" alt="TUM" />
        </span>
        <span className="brand-logo brand-logo-atari" aria-label="ATARI logo">
          <img src="assets/brand/ATARI.png" alt="ATARI" />
        </span>
        <span className="brand-name">TUM ATARI Lab</span>
      </header>

      <main className="deck" aria-label="Beyond Teleoperation slide deck">
        <Slide01Hero isActive={activeIndex === 0} />
        <Slide02Problem isActive={activeIndex === 1} />
        <Slide03DataNeeds isActive={activeIndex === 2} />
        <Slide03Retargeting isActive={activeIndex === 3} />
        <Slide03RetargetingResults isActive={activeIndex === 4} />
        <Slide04MotionDisco isActive={activeIndex === 5} />
        <Slide04MotionDiscoPlanning isActive={activeIndex === 6} />
        <Slide04MotionDiscoBanana isActive={activeIndex === 7} />
        <Slide05GDNB isActive={activeIndex === 8} />
        <Slide05GDNBFramework isActive={activeIndex === 9} />
        <Slide06Stack isActive={activeIndex === 10} />
        <Slide07CTA isActive={activeIndex === 11} />
      </main>

      <NavigationHint
        activeIndex={activeIndex}
        activeLabel={SLIDES[activeIndex]?.label ?? ""}
        total={SLIDES.length}
      />
      <ProgressIndicator activeIndex={activeIndex} total={SLIDES.length} />
    </>
  );
}
