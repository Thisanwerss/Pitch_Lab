import { motion } from "framer-motion";
import { drawPath, revealUp, staggerGroup } from "../motion/variants";

type PipelineProps = {
  nodes: string[];
  className?: string;
  tone?: "blue" | "muted" | "orange";
  activeIndex?: number;
  compact?: boolean;
};

export function Pipeline({
  nodes,
  className = "",
  tone = "blue",
  activeIndex,
  compact = false,
}: PipelineProps) {
  return (
    <motion.div
      className={`pipeline pipeline-${tone} ${compact ? "pipeline-compact" : ""} ${className}`}
      variants={staggerGroup}
    >
      <svg className="pipeline-path" viewBox="0 0 100 16" preserveAspectRatio="none">
        <motion.path
          d="M 4 8 C 24 3, 30 13, 48 8 S 74 3, 96 8"
          fill="none"
          variants={drawPath}
        />
      </svg>
      <div className="pipeline-nodes" style={{ ["--node-count" as string]: nodes.length }}>
        {nodes.map((node, index) => (
          <motion.div
            className={`pipeline-node ${activeIndex === index ? "is-node-active" : ""}`}
            variants={revealUp}
            key={node}
          >
            <span className="pipeline-dot" />
            <span>{node}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
