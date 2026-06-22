import { motion, type Variants } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { Kicker } from "../components/Kicker";
import { SlideShell } from "../components/SlideShell";
import { revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

const teleopStages = [
  ["Teleoperate", "costly"],
  ["Collect demos", "low quality"],
  ["Train policy", "Error"],
] as const;

const workflowSequence: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

export function Slide02Problem({ isActive = false }: SlideProps) {
  return (
    <SlideShell
      id="problem"
      index={2}
      title="Teleoperation is costly and still not enough"
      isActive={isActive}
    >
      <div className="problem-dim-layer" aria-hidden="true" />
      <motion.div className="problem-copy problem-copy-redesigned" variants={staggerGroup}>
        <Kicker>PROBLEM FRAMING</Kicker>
        <motion.h2 id="problem-title" className="slide-title centered" variants={revealUp}>
          Teleoperation is costly &mdash;
          <br />
          and still not enough.
        </motion.h2>
      </motion.div>

      <motion.div
        className="problem-framework problem-failure"
        variants={staggerGroup}
        aria-label="Costly teleoperation workflow"
      >
        <motion.div variants={revealUp}>
          <GlassPanel className="workflow-card workflow-card-muted">
            <div className="workflow-heading">
              <span>Teleoperation-centered workflow</span>
            </div>
            <motion.div className="workflow-row teleop-workflow" variants={workflowSequence}>
              {teleopStages.map(([stage, tag]) => (
                <motion.div className="workflow-node muted-node" variants={revealUp} key={stage}>
                  <strong>{stage}</strong>
                  <span className={`failure-tag failure-tag-${tag.toLowerCase().replace(" ", "-")}`}>
                    {tag}
                  </span>
                </motion.div>
              ))}
              <motion.div className="workflow-result" variants={revealUp}>
                <strong>costly pipeline, narrow and brittle behaviors</strong>
              </motion.div>
            </motion.div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
