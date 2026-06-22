import { motion } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { Kicker } from "../components/Kicker";
import { PaperCitation } from "../components/PaperCitation";
import { SlideShell } from "../components/SlideShell";
import { drawPath, revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

const frontierDots = [
  [306, 124],
  [332, 154],
  [360, 198],
  [300, 236],
  [392, 170],
  [340, 258],
] as const;

export function Slide05GDNB({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="gdnb" index={9} title="Solution 03: Guided Discovery of New Behaviors" isActive={isActive}>
      <motion.div className="gdnb-copy gdnb-discovery-copy" variants={staggerGroup}>
        <Kicker>WORK 03 / DIFFUSION SELF-EXPLORATION</Kicker>
        <motion.h2 id="gdnb-title" className="slide-title" variants={revealUp}>
          Solution 03: Guided Discovery of New Behaviors
        </motion.h2>
        <motion.p className="emphasis-body" variants={revealUp}>
          Make the policy search its own frontier.
        </motion.p>
        <motion.p className="slide-body compact-body" variants={revealUp}>
          GDNB samples rare but repairable trajectories, refines them into successful demonstrations, and fine-tunes the diffusion policy round after round.
        </motion.p>
      </motion.div>

      <motion.div className="gdnb-distribution-stage" variants={staggerGroup}>
        <GlassPanel className="gdnb-distribution-panel">
          <svg viewBox="0 0 520 390" role="img" aria-label="Iterative GDNB exploration expands a diffusion policy distribution from common modes toward rare feasible modes.">
            <defs>
              <radialGradient id="gdnbCommon" cx="45%" cy="48%" r="48%">
                <stop offset="0%" stopColor="#0065bd" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#0065bd" stopOpacity="0.05" />
              </radialGradient>
              <radialGradient id="gdnbExpanded" cx="58%" cy="50%" r="58%">
                <stop offset="0%" stopColor="#26c6da" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.08" />
              </radialGradient>
            </defs>
            <motion.ellipse className="gdnb-policy-shell gdnb-policy-shell-1" cx="210" cy="198" rx="96" ry="70" variants={revealUp} />
            <motion.ellipse className="gdnb-policy-shell gdnb-policy-shell-2" cx="238" cy="196" rx="142" ry="100" variants={revealUp} />
            <motion.ellipse className="gdnb-policy-shell gdnb-policy-shell-3" cx="270" cy="198" rx="190" ry="132" variants={revealUp} />
            <ellipse className="gdnb-common-fill" cx="210" cy="198" rx="108" ry="78" fill="url(#gdnbCommon)" />
            <ellipse className="gdnb-expanded-fill" cx="286" cy="198" rx="178" ry="122" fill="url(#gdnbExpanded)" />

            <motion.path className="gdnb-expansion-arrow" d="M214 200 C258 150 316 126 392 112" fill="none" variants={drawPath} />
            <motion.path className="gdnb-expansion-arrow" d="M226 220 C282 226 338 258 398 304" fill="none" variants={drawPath} />
            <motion.path className="gdnb-arrow-head" d="M378 100 L400 110 L382 126" fill="none" variants={drawPath} />
            <motion.path className="gdnb-arrow-head" d="M388 284 L402 306 L376 304" fill="none" variants={drawPath} />

            {[168, 196, 224, 236, 184, 214, 254, 152, 238].map((cx, index) => (
              <motion.circle
                className="gdnb-common-dot"
                cx={cx}
                cy={[178, 210, 186, 230, 244, 160, 204, 216, 174][index]}
                r="7"
                variants={revealUp}
                key={`${cx}-${index}`}
              />
            ))}
            {frontierDots.map(([cx, cy], index) => (
              <motion.circle
                className="gdnb-frontier-dot"
                cx={cx}
                cy={cy}
                r="8"
                variants={revealUp}
                key={`${cx}-${cy}`}
                style={{ animationDelay: `${index * 0.26}s` }}
              />
            ))}
            <text className="gdnb-map-label gdnb-common-label" x="150" y="100">common policy mass</text>
            <text className="gdnb-map-label gdnb-frontier-label" x="312" y="84">rare but repairable frontier</text>
            <text className="gdnb-map-label gdnb-expanded-label" x="300" y="350">expanded diffusion policy</text>
          </svg>
        </GlassPanel>

        <motion.div className="gdnb-round-stack" variants={staggerGroup}>
          {["round 0", "round 1", "round 2"].map((round, index) => (
            <motion.div className={`gdnb-round-card gdnb-round-card-${index + 1}`} variants={revealUp} key={round}>
              <span>{round}</span>
              <strong>{["collapsed mode", "frontier repaired", "broader policy"][index]}</strong>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2606.08743"
        label="Yu et al., 2026 · Guided Discovery of New Behaviors using Diffusion Policies"
      />
    </SlideShell>
  );
}

export function Slide05GDNBFramework({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="gdnb-framework" index={10} title="GDNB Framework and Demonstrations" isActive={isActive}>
      <motion.div className="gdnb-framework-copy" variants={staggerGroup}>
        <motion.h2 id="gdnb-framework-title" className="slide-title" variants={revealUp}>
          Rare samples become training data.
        </motion.h2>
      </motion.div>

      <motion.figure className="gdnb-framework-image" variants={revealUp}>
        <img src="images/gdnb/gdnb-framework.png" alt="GDNB framework: rare-event sampling, feasibility screening, expert refinement, relabeling, and diffusion policy fine-tuning." />
      </motion.figure>

      <motion.div className="gdnb-framework-bottom" variants={staggerGroup}>
        <GlassPanel className="gdnb-framework-note">
          <span>Closed-loop bootstrapping</span>
          <strong>Sample frontier. Repair locally. Relabel. Fine-tune.</strong>
          <em>Each round converts rare but feasible behavior into a denser policy distribution.</em>
        </GlassPanel>

        <motion.figure className="gdnb-demo-clip" variants={revealUp}>
          <video
            src="videos/gdnb/gdnb_demo_97_147_vcrop10.mp4"
            poster="videos/gdnb/gdnb_demo_97_147_vcrop10.webp"
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="auto"
            aria-label="GDNB demonstration benchmark clip extracted from the supplementary video."
            onLoadedData={(event) => {
              if (isActive) {
                event.currentTarget.play().catch(() => undefined);
              }
            }}
            onCanPlay={(event) => {
              if (isActive) {
                event.currentTarget.play().catch(() => undefined);
              }
            }}
          />
        </motion.figure>
      </motion.div>

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2606.08743"
        label="Yu et al., 2026 · Guided Discovery of New Behaviors using Diffusion Policies"
      />
    </SlideShell>
  );
}
