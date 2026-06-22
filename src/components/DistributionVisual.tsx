import { motion } from "framer-motion";
import { drawPath, revealUp } from "../motion/variants";

const blueParticles = [
  [30, 62],
  [34, 55],
  [39, 66],
  [43, 51],
  [47, 60],
  [52, 54],
  [56, 65],
] as const;

const rareParticles = [
  [75, 42],
  [79, 35],
  [84, 45],
  [66, 73],
  [88, 68],
] as const;

export function DistributionVisual() {
  return (
    <motion.div className="distribution-visual" variants={revealUp}>
      <svg viewBox="0 0 100 100" role="img" aria-label="Conceptual distribution with dominant and rare motion modes">
        <defs>
          <radialGradient id="dominant-gradient" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(0,101,189,0.72)" />
            <stop offset="65%" stopColor="rgba(100,160,200,0.26)" />
            <stop offset="100%" stopColor="rgba(0,101,189,0)" />
          </radialGradient>
          <radialGradient id="rare-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,138,61,0.78)" />
            <stop offset="100%" stopColor="rgba(255,77,109,0)" />
          </radialGradient>
        </defs>
        <ellipse className="dominant-mode" cx="42" cy="58" rx="27" ry="20" fill="url(#dominant-gradient)" />
        <ellipse className="rare-island rare-island-a" cx="79" cy="39" rx="10" ry="7" fill="url(#rare-gradient)" />
        <ellipse className="rare-island rare-island-b" cx="77" cy="72" rx="8" ry="5" fill="url(#rare-gradient)" />
        <motion.path
          className="distribution-contour"
          d="M14 70 C24 44, 35 28, 52 39 C61 45, 63 65, 52 76 C39 88, 23 83, 14 70 Z"
          fill="none"
          variants={drawPath}
        />
        <motion.path
          className="rare-trajectory-broken"
          d="M60 77 L66 69 L70 75 L76 57 L83 49"
          fill="none"
          variants={drawPath}
        />
        <motion.path
          className="rare-trajectory-repaired"
          d="M60 77 C66 70, 70 63, 75 55 S82 43, 88 38"
          fill="none"
          variants={drawPath}
        />
        {blueParticles.map(([cx, cy]) => (
          <circle className="sample-particle sample-blue" cx={cx} cy={cy} r="1.8" key={`${cx}-${cy}`} />
        ))}
        {rareParticles.map(([cx, cy]) => (
          <circle className="sample-particle sample-rare" cx={cx} cy={cy} r="1.7" key={`${cx}-${cy}`} />
        ))}
      </svg>
      <div className="distribution-label distribution-label-dominant">dominant mode</div>
      <div className="distribution-label distribution-label-rare">rare but valid</div>
    </motion.div>
  );
}
