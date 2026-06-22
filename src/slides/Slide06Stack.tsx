import { motion } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { Kicker } from "../components/Kicker";
import { SlideShell } from "../components/SlideShell";
import { drawPath, revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

const streams = [
  ["Human demo", "physical retargeting"],
  ["Task prompt", "LLM motion discovery"],
  ["Policy distribution", "rare-mode self-exploration"],
] as const;

export function Slide06Stack({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="stack" index={11} title="A Behavior Generation Stack Beyond Teleoperation" isActive={isActive}>
      <motion.div className="stack-copy" variants={staggerGroup}>
        <Kicker>UNIFIED RESEARCH AGENDA</Kicker>
        <motion.h2 id="stack-title" className="slide-title centered" variants={revealUp}>
          A Behavior Generation Stack Beyond Teleoperation
        </motion.h2>
        <motion.p className="stack-slogan" variants={revealUp}>
          Propose <span>→</span> Verify <span>→</span> Repair <span>→</span> Learn
        </motion.p>
      </motion.div>

      <motion.div className="stack-diagram" variants={revealUp} aria-label="Unified humanoid behavior generation stack">
        <svg className="stack-streams" viewBox="0 0 1180 520" aria-hidden="true">
          <motion.path
            className="stream-path stream-a"
            d="M90 122 C286 122, 330 214, 508 238"
            fill="none"
            variants={drawPath}
          />
          <motion.path
            className="stream-path stream-b"
            d="M90 260 C250 260, 338 260, 508 260"
            fill="none"
            variants={drawPath}
          />
          <motion.path
            className="stream-path stream-c"
            d="M90 398 C286 398, 330 306, 508 282"
            fill="none"
            variants={drawPath}
          />
          <motion.path
            className="stream-path output-path"
            d="M672 260 C804 260, 880 218, 1068 218"
            fill="none"
            variants={drawPath}
          />
          <motion.path
            className="stream-path output-path"
            d="M672 284 C810 306, 890 358, 1070 358"
            fill="none"
            variants={drawPath}
          />
        </svg>

        <div className="stream-labels">
          {streams.map(([source, method], index) => (
            <GlassPanel className={`stream-label stream-label-${index + 1}`} key={source}>
              <span>{source}</span>
              <strong>{method}</strong>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="engine-block">
          <span>Humanoid</span>
          <strong>Behavior Engine</strong>
          <em>physically consistent behavior data</em>
        </GlassPanel>

        <div className="stack-outputs">
          <GlassPanel className="output-block">
            <span>robust policies</span>
            <strong>real-world skills</strong>
          </GlassPanel>
          <GlassPanel className="output-block output-block-soft">
            <span>deployment</span>
            <strong>loco-manipulation</strong>
          </GlassPanel>
        </div>
      </motion.div>
    </SlideShell>
  );
}
