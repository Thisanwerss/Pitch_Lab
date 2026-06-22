import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { SlideShell } from "../components/SlideShell";
import { revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

type NeedId = "feasible" | "scalable" | "diverse";

const requirements = [
  {
    id: "feasible",
    label: "Physically feasible",
  },
  {
    id: "scalable",
    label: "Scalable",
  },
  {
    id: "diverse",
    label: "Diverse",
  },
] as const;

const glowStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.32 },
  },
};

const scalableTrajectories = [
  ["M40 116 C70 48 140 38 220 28", "#0065bd"],
  ["M40 116 C78 58 136 42 222 42", "#26c6da"],
  ["M40 116 C88 70 132 46 222 56", "#00a878"],
  ["M40 116 C74 82 154 42 222 70", "#7b61ff"],
  ["M40 116 C94 90 126 56 222 84", "#ff8a3d"],
  ["M40 116 C66 64 168 60 222 98", "#d14fd1"],
  ["M40 116 C84 42 126 92 222 36", "#009fe3"],
  ["M40 116 C92 106 156 58 222 112", "#6fba2c"],
  ["M40 116 C60 76 176 90 222 64", "#f6c343"],
  ["M40 116 C100 68 120 30 222 50", "#ff4d6d"],
  ["M40 116 C56 102 148 108 222 78", "#00b5ad"],
  ["M40 116 C86 54 158 72 222 124", "#8f7ae5"],
  ["M40 116 C108 82 130 72 222 30", "#3a86ff"],
  ["M40 116 C76 114 182 38 222 90", "#fb5607"],
  ["M40 116 C112 104 130 44 222 106", "#2ec4b6"],
  ["M40 116 C58 54 172 116 222 118", "#8338ec"],
] as const;

const diverseTrajectories = [
  ["M38 118 C76 40 154 38 222 56", "#0065bd"],
  ["M38 118 C66 90 126 18 222 56", "#26c6da"],
  ["M38 118 C108 132 154 36 222 56", "#7b61ff"],
  ["M38 118 C76 148 170 96 222 56", "#00a878"],
  ["M38 118 C54 62 166 142 222 56", "#ff8a3d"],
  ["M38 118 C112 62 126 104 222 56", "#d14fd1"],
  ["M38 118 C80 24 170 72 222 56", "#f6c343"],
  ["M38 118 C52 116 164 18 222 56", "#ff4d6d"],
] as const;

function pathStyle(color: string, index: number, baseDelay = 0.35, stepDelay = 0.035): CSSProperties {
  return {
    "--path-color": color,
    "--path-delay": `${baseDelay + index * stepDelay}s`,
    "--path-shift": `${(index - 5) * 0.22}px`,
  } as CSSProperties;
}

function TrajectoryDemo({ id }: { id: NeedId }) {
  return (
    <svg className={`trajectory-demo trajectory-demo-${id}`} viewBox="0 0 260 160" role="img" aria-hidden="true">
      <path className="trajectory-guide guide-top" d="M34 42 H226" />
      <path className="trajectory-guide guide-bottom" d="M34 120 H226" />

      {id === "feasible" && (
        <g className="trajectory-layer trajectory-layer-feasible">
          <path
            className="trajectory-path feasible-rough"
            d="M38 118 L56 90 L74 103 L92 66 L112 84 L132 52 L152 78 L174 48 L196 68 L222 46"
          />
          <path className="trajectory-path feasible-smooth" d="M38 118 C76 76 126 78 154 61 C180 45 199 48 222 46" />
          <path className="repair-band" d="M84 89 C119 62 166 54 204 48" />
          <circle className="repair-pulse pulse-a" cx="91" cy="77" r="12" />
          <circle className="repair-pulse pulse-b" cx="149" cy="62" r="12" />
        </g>
      )}

      {id === "scalable" && (
        <g className="trajectory-layer trajectory-layer-scalable">
          <path className="trajectory-path scalable-seed" d="M40 116 C76 66 142 72 220 44" />
          {scalableTrajectories.map(([d, color], index) => (
            <path className="trajectory-path scalable-clone" d={d} key={d} style={pathStyle(color, index)} />
          ))}
        </g>
      )}

      {id === "diverse" && (
        <g className="trajectory-layer trajectory-layer-diverse">
          {diverseTrajectories.map(([d, color], index) => (
            <path className="trajectory-path diverse-path" d={d} key={d} style={pathStyle(color, index, 0.32, 0.05)} />
          ))}
        </g>
      )}

      <circle className="trajectory-dot trajectory-start" cx={id === "diverse" ? 38 : 40} cy={id === "diverse" ? 118 : 116} r="7" />
      <circle className="trajectory-dot trajectory-end" cx={id === "diverse" ? 222 : 220} cy={id === "diverse" ? 56 : id === "feasible" ? 46 : 44} r="7" />
    </svg>
  );
}

export function Slide03DataNeeds({ isActive = false }: SlideProps) {
  return (
    <SlideShell
      id="data-needs"
      index={3}
      title="What kind of data does effective Physical AI need"
      isActive={isActive}
    >
      <motion.div className="data-needs-copy" variants={staggerGroup}>
        <motion.h2 id="data-needs-title" className="slide-title centered" variants={revealUp}>
          What kind of data does effective Physical AI need?
        </motion.h2>
      </motion.div>

      <motion.div className="data-need-grid" variants={glowStagger} aria-label="Required data properties">
        {requirements.map(({ id, label }) => (
          <motion.div className="data-need-card" variants={revealUp} key={label}>
            <TrajectoryDemo id={id} />
            <div className="data-need-text">
              <strong>{label}</strong>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideShell>
  );
}
