import { motion } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { Kicker } from "../components/Kicker";
import { SlideShell } from "../components/SlideShell";
import { revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

const areas = [
  "Humanoid control",
  "Trajectory optimization",
  "Generative policy learning",
  "Real-robot deployment",
];

const publications = [
  {
    title: "DynaRetarget: Dynamically-Feasible Retargeting using Sampling-Based Trajectory Optimization",
    meta: "Dhedin et al., 2026 · arXiv:2602.06827",
    href: "https://doi.org/10.48550/arXiv.2602.06827",
  },
  {
    title: "MotionDisco: Motion Discovery for Extreme Humanoid Loco-Manipulation",
    meta: "Taouil et al., 2026 · arXiv:2606.06139",
    href: "https://doi.org/10.48550/arXiv.2606.06139",
  },
  {
    title: "Guided Discovery of New Behaviors using Diffusion Policies",
    meta: "Yu, Sanokowski, & Khadiv, 2026 · arXiv:2606.08743",
    href: "https://doi.org/10.48550/arXiv.2606.08743",
  },
];

export function Slide07CTA({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="join" index={12} title="Together in building general humanoid behavior generation" isActive={isActive}>
      <motion.div className="cta-copy" variants={staggerGroup}>
        <Kicker>COLLABORATE / BUILD</Kicker>
        <motion.h2 id="join-title" className="slide-title" variants={revealUp}>
          Together in building general humanoid behavior generation
        </motion.h2>
        <motion.div className="research-areas" variants={staggerGroup}>
          {areas.map((area) => (
            <motion.div className="research-area" variants={revealUp} key={area}>
              <span />
              {area}
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="closing-line" variants={revealUp}>
          From teleoperation to autonomous motion discovery.
        </motion.p>
      </motion.div>

      <motion.div className="cta-panel-wrap" variants={revealUp}>
        <GlassPanel className="cta-panel">
          <div className="lab-logo-placeholder" aria-label="TUM ATARI Lab logo">
            <div className="cta-logo-row">
              <img src="assets/brand/TUM.jpg" alt="TUM" />
              <img src="assets/brand/ATARI.png" alt="ATARI" />
            </div>
            <strong>TUM ATARI Lab</strong>
          </div>
          <div className="cta-web-links">
            <span>Website</span>
            <a href="https://www.ce.cit.tum.de/en/aipd/home/" target="_blank" rel="noreferrer">
              ce.cit.tum.de/en/aipd/home/
            </a>
            <em>Search: TUM ATARI Lab</em>
          </div>
          <div className="publication-list" aria-label="Referenced papers">
            {publications.map(({ href, meta, title }) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{meta}</span>
                <a href={href} target="_blank" rel="noreferrer">{href}</a>
              </article>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </SlideShell>
  );
}
