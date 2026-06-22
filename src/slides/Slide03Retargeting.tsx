import { motion } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { MediaFrame } from "../components/MediaFrame";
import { PaperCitation } from "../components/PaperCitation";
import { SlideShell } from "../components/SlideShell";
import { revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

const pipelineStages = [
  ["Human Demo", "human-object intent"],
  ["Morphology Transfer", "rough robot reference"],
  ["SBTO Clean Pass", "contacts + dynamics repaired"],
  ["Policy Distillation", "learn from clean targets"],
  ["Real Robot", "zero-shot rollout"],
] as const;

const dirtyArtifacts = ["missing contact", "penetration", "jitter"];
const cleanSignals = ["contact repaired", "object motion clean", "full horizon"];

const showcaseVideos = [
  {
    category: "SIM",
    label: "Motion diversity",
    caption: "Box interaction",
    detail: "contact-rich reference",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub10_largebox_085_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Motion diversity",
    caption: "Push and recover",
    detail: "dynamic correction",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub10_largebox_086_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Motion diversity",
    caption: "Contact shift",
    detail: "changing support",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub10_largebox_087_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Object mass",
    caption: "Mass variation",
    detail: "0.1-8 kg family",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub16_largebox_001_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Motion diversity",
    caption: "Foot interaction",
    detail: "whole-body contact",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub3_largebox_001_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Long horizon",
    caption: "Multi-step rollout",
    detail: "extended sequence",
    src: "videos/dynaretarget/video_submission/many_motions/OmniRetarget_sub8_largebox_031_original_submission.mp4",
  },
  {
    category: "SIM",
    label: "Object shape",
    caption: "Chair geometry",
    detail: "shape transfer",
    src: "videos/dynaretarget/video_submission/augmentation/sub10_largebox_084_original_chair.mp4",
  },
  {
    category: "SIM",
    label: "Object shape",
    caption: "Cylinder geometry",
    detail: "round object",
    src: "videos/dynaretarget/video_submission/augmentation/sub10_largebox_084_original_cylinder.mp4",
  },
  {
    category: "SIM",
    label: "Object shape",
    caption: "Shelf geometry",
    detail: "non-box geometry",
    src: "videos/dynaretarget/video_submission/augmentation/sub10_largebox_084_original_shelf.mp4",
  },
  {
    category: "REAL ROBOT",
    label: "Zero-shot",
    caption: "Hardware rollout 01",
    detail: "real transfer",
    src: "videos/dynaretarget/video_submission/real_world_experiments/exp1.mp4",
  },
  {
    category: "REAL ROBOT",
    label: "Zero-shot",
    caption: "Hardware rollout 02",
    detail: "real transfer",
    src: "videos/dynaretarget/video_submission/real_world_experiments/exp2.mp4",
  },
  {
    category: "REAL ROBOT",
    label: "Zero-shot",
    caption: "Hardware rollout 03",
    detail: "real transfer",
    src: "videos/dynaretarget/video_submission/real_world_experiments/exp3.mp4",
  },
  {
    category: "REAL ROBOT",
    label: "Zero-shot",
    caption: "Hardware rollout 06",
    detail: "real transfer",
    src: "videos/dynaretarget/video_submission/real_world_experiments/exp6.mp4",
  },
  {
    category: "REAL ROBOT",
    label: "Zero-shot",
    caption: "Hardware rollout 08",
    detail: "real transfer",
    src: "videos/dynaretarget/video_submission/real_world_experiments/exp8.mp4",
  },
] as const;

export function Slide03Retargeting({ isActive = false }: SlideProps) {
  return (
    <SlideShell
      id="retargeting"
      index={4}
      title="Solution 01: Physical Consistent Retargeting"
      isActive={isActive}
    >
      <motion.div className="work-copy work-copy-left retargeting-copy" variants={staggerGroup}>
        <motion.h2 id="retargeting-title" className="slide-title" variants={revealUp}>
          Solution 01: Physical Consistent Retargeting
        </motion.h2>
        <motion.p className="slide-body compact-body" variants={revealUp}>
          SBTO is the clean gate between noisy human-object demos and deployable policy data.
        </motion.p>
      </motion.div>

      <motion.div className="retargeting-proof" variants={staggerGroup}>
        <MediaFrame
          label="Kinematic retargeting before physical repair with missing contact."
          caption="Kinematic-only reference"
          tone="red"
          src="videos/dynaretarget/video_submission/analysis/missing_cut.webm"
          preload={isActive ? "auto" : "metadata"}
        />
        <MediaFrame
          label="SBTO repair after physical consistency optimization."
          caption="SBTO-cleaned reference"
          tone="cyan"
          src="videos/dynaretarget/video_submission/analysis/refined_cut.webm"
          preload={isActive ? "auto" : "metadata"}
        />
      </motion.div>

      <motion.div className="retargeting-clean-room" variants={staggerGroup}>
        <GlassPanel className="clean-route clean-route-fail">
          <span className="route-label">Without physical cleanup</span>
          <strong>Dirty Retargeting Fails</strong>
          <div className="route-chip-row">
            {dirtyArtifacts.map((artifact) => (
              <span key={artifact}>{artifact}</span>
            ))}
          </div>
          <em>Contradictory targets enter RL.</em>
        </GlassPanel>

        <GlassPanel className="clean-route clean-route-pass">
          <span className="route-label">SBTO clean pass</span>
          <strong>SBTO Makes It Clean</strong>
          <div className="route-chip-row">
            {cleanSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
          <em>The same pipeline becomes learnable.</em>
        </GlassPanel>
      </motion.div>

      <motion.div className="retargeting-fancy-pipeline" variants={staggerGroup}>
        {pipelineStages.map(([stage, detail], index) => (
          <motion.div
            className={`fancy-stage ${index === 2 ? "is-clean-gate" : ""}`}
            variants={revealUp}
            key={stage}
          >
            <strong>{stage}</strong>
            <em>{detail}</em>
          </motion.div>
        ))}
      </motion.div>

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2602.06827"
        label="Dhedin et al., 2026 · DynaRetarget: Dynamically-Feasible Retargeting using Sampling-Based Trajectory Optimization"
      />
    </SlideShell>
  );
}

export function Slide03RetargetingResults({ isActive = false }: SlideProps) {
  return (
    <SlideShell
      id="retargeting-results"
      index={5}
      title="Solution 01 Results"
      isActive={isActive}
    >
      <motion.div
        className="retargeting-video-wall"
        variants={staggerGroup}
        aria-label="DynaRetarget motion, augmentation, and real-world transfer videos"
      >
        {showcaseVideos.map(({ caption, category, detail, label, src }) => (
          <motion.figure className={`retargeting-video-tile ${category === "REAL ROBOT" ? "is-real" : "is-sim"}`} variants={revealUp} key={src}>
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload={isActive ? "auto" : "metadata"}
              aria-label={`${category}: ${label}, ${caption}`}
            />
            <figcaption>
              <span>{category}</span>
              <strong>{label}</strong>
              <em>{caption}</em>
              <small>{detail}</small>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2602.06827"
        label="Dhedin et al., 2026 · DynaRetarget: Dynamically-Feasible Retargeting using Sampling-Based Trajectory Optimization"
      />
    </SlideShell>
  );
}
