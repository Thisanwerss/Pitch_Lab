import { useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "../components/GlassPanel";
import { MediaFrame } from "../components/MediaFrame";
import { PaperCitation } from "../components/PaperCitation";
import { SlideShell } from "../components/SlideShell";
import { drawPath, revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

function CapabilitySetDiagram() {
  return (
    <motion.div className="capability-diagram" variants={revealUp}>
      <svg viewBox="0 0 760 430" role="img" aria-label="Teleoperation covers the intersection of human ability and robot ability, while MotionDisco searches the full robot feasible set.">
        <defs>
          <linearGradient id="humanSet" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff8a3d" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="robotSet" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0065bd" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#26c6da" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <motion.ellipse className="capability-set human-set" cx="286" cy="206" rx="208" ry="144" fill="url(#humanSet)" variants={revealUp} />
        <motion.ellipse className="capability-set robot-set" cx="474" cy="206" rx="208" ry="144" fill="url(#robotSet)" variants={revealUp} />
        <motion.path
          className="motiondisco-search-ring"
          d="M474 62 C598 62 682 120 690 204 C702 318 588 364 474 350 C350 350 268 292 260 208 C250 94 360 62 474 62"
          fill="none"
          variants={drawPath}
        />
        <motion.path
          className="intersection-lens"
          d="M380 78 C450 106 494 152 494 206 C494 260 450 306 380 334 C310 306 266 260 266 206 C266 152 310 106 380 78Z"
          variants={revealUp}
        />
        <text className="set-label human-label" x="182" y="94">Human can do</text>
        <text className="set-label robot-label" x="486" y="94">Robot can do</text>
        <text className="set-label teleop-label" x="312" y="212">Teleop / Retargeting</text>
        <text className="set-label disco-label" x="474" y="382">MotionDisco searches the full robot-feasible set</text>
      </svg>
    </motion.div>
  );
}

function LlmPlanningLoop() {
  return (
    <motion.div className="motiondisco-framework" variants={staggerGroup}>
      <GlassPanel className="framework-panel framework-search">
        <h3>Evolutionary Tree Search</h3>
        <svg className="tree-search-svg" viewBox="0 0 430 260" aria-hidden="true">
          <g transform="translate(0 60)">
            <motion.path className="tree-root" d="M214 34 L214 64" variants={drawPath} />
            <motion.path className="tree-branch branch-a" d="M214 64 C168 82 110 76 84 110" variants={drawPath} />
            <motion.path className="tree-branch branch-b" d="M214 64 C202 112 158 106 144 150" variants={drawPath} />
            <motion.path className="tree-branch branch-c" d="M214 64 C236 110 288 102 306 146" variants={drawPath} />
            <motion.path className="tree-branch branch-d" d="M214 64 C260 82 326 76 352 110" variants={drawPath} />
            <motion.path className="tree-root-diamond" d="M214 8 L226 28 L214 48 L202 28Z" variants={revealUp} />
            {[214, 84, 144, 306, 352].map((x, index) => (
              <motion.rect
                className="tree-node-dot"
                x={x - 9}
                y={(index === 0 ? 66 : index === 2 || index === 3 ? 154 : 116) - 9}
                width="18"
                height="18"
                rx="4"
                variants={revealUp}
                key={`${x}-${index}`}
              />
            ))}
            <motion.path
              className="tree-star"
              d="M108 140 L113 153 L127 153 L116 161 L121 174 L108 166 L95 174 L100 161 L89 153 L103 153Z"
              variants={revealUp}
            />
          </g>
        </svg>

        <div className="tree-mutation-wedge" aria-hidden="true" />

        <div className="program-mutation">
          <strong>LLM-guided Program Mutation</strong>
          <div className="mutation-program-diagram">
            <div className="mutation-inputs">
              <span>Goal-Oriented<br />Prompt</span>
              <span>Parent Node<br />Program</span>
              <span>Feasibility<br />Feedback</span>
            </div>
            <svg className="mutation-arrows" viewBox="0 0 190 220" aria-hidden="true">
              <motion.path className="mutation-arrow" d="M14 42 H92 Q106 42 106 56 V96" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow" d="M14 110 H82" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow" d="M14 178 H92 Q106 178 106 164 V124" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow" d="M120 110 H170" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow-head" d="M98 90 L106 102 L114 90" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow-head" d="M72 102 L84 110 L72 118" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow-head" d="M98 130 L106 118 L114 130" fill="none" variants={drawPath} />
              <motion.path className="mutation-arrow-head" d="M160 102 L172 110 L160 118" fill="none" variants={drawPath} />
            </svg>
            <em>Mutated Child<br />Program</em>
          </div>
        </div>
      </GlassPanel>

      <div className="framework-exchange" aria-label="MotionDisco planning exchange">
        <svg viewBox="0 0 220 360" role="img" aria-label="Contact plan flows to planning; TO score and feasibility feedback return to search.">
          <motion.path className="exchange-path contact-plan-flow" d="M20 118 C76 82 138 82 198 118" fill="none" variants={drawPath} />
          <motion.path className="exchange-arrow-head contact-arrow-head" d="M182 105 L200 119 L179 126" fill="none" variants={drawPath} />
          <motion.path className="exchange-path score-flow" d="M198 180 C150 212 70 212 22 180" fill="none" variants={drawPath} />
          <motion.path className="exchange-arrow-head score-arrow-head" d="M40 166 L20 180 L40 190" fill="none" variants={drawPath} />
          <motion.path className="exchange-path feedback-flow" d="M198 238 C132 286 78 286 20 238" fill="none" variants={drawPath} />
          <motion.path className="exchange-arrow-head feedback-arrow-head" d="M39 226 L19 239 L40 247" fill="none" variants={drawPath} />
          <text x="110" y="84">Contact Plan</text>
          <text className="score-label" x="70" y="218">TO Score</text>
          <text x="112" y="292">Feasibility Feedback</text>
        </svg>
        <motion.div className="exchange-score" variants={revealUp} aria-hidden="true">
          <span />
          <i />
          <b />
        </motion.div>
      </div>

      <GlassPanel className="framework-panel framework-planning">
        <h3>Contact-Explicit Motion Planning</h3>
        <div className="planner-stage ik-stage">
          <strong>Sequential IK Feasibility</strong>
          <motion.figure className="paper-stage-strip ik-paper-strip" variants={revealUp}>
            <img
              src="images/motiondisco/framework-sub1.png"
              alt="Sequential IK feasibility states from the MotionDisco paper framework."
              draggable={false}
            />
            <svg className="ik-feasibility-overlay" viewBox="0 0 728 330" preserveAspectRatio="none" aria-hidden="true">
              <rect className="ik-dot-mask" x="0" y="0" width="728" height="136" />
              {[
                [60, 20],
                [251, 116],
                [443, 47],
                [634, 99],
              ].map(([cx, cy]) => (
                <motion.circle className="ik-feasibility-dot" cx={cx} cy={cy} r="9" variants={revealUp} key={`${cx}-${cy}`} />
              ))}
            </svg>
          </motion.figure>
        </div>
        <div className="planner-down-arrow" aria-hidden="true" />
        <div className="planner-stage to-stage">
          <strong>Trajectory Optimization (TO)</strong>
          <motion.figure className="paper-stage-strip to-paper-strip" variants={revealUp}>
            <img
              src="images/motiondisco/framework-sub2.png"
              alt="Trajectory optimization trajectory and states from the MotionDisco paper framework."
              draggable={false}
            />
            <svg className="to-trajectory-overlay" viewBox="0 0 1519 387" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                className="to-overlay-curve"
                d="M128 74 C118 220 294 230 462 190 C666 142 828 35 1010 68 C1140 92 1237 126 1376 196"
                fill="none"
                variants={drawPath}
              />
              {[
                [128, 74],
                [462, 190],
                [1010, 68],
                [1376, 196],
              ].map(([cx, cy]) => (
                <motion.circle className="to-overlay-dot" cx={cx} cy={cy} r="14" variants={revealUp} key={`${cx}-${cy}`} />
              ))}
            </svg>
          </motion.figure>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function Slide04MotionDisco({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="motiondisco" index={6} title="Solution 02: MotionDisco" isActive={isActive}>
      <motion.div className="work-copy motiondisco-overview-copy" variants={staggerGroup}>
        <motion.h2 id="motiondisco-title" className="slide-title" variants={revealUp}>
          Solution 02: MotionDisco
        </motion.h2>
        <motion.p className="emphasis-body" variants={revealUp}>
          Discover motions beyond teleoperation.
        </motion.p>
        <motion.p className="slide-body compact-body" variants={revealUp}>
          Teleop samples the intersection. MotionDisco searches the full robot-feasible set.
        </motion.p>
      </motion.div>

      <CapabilitySetDiagram />

      <motion.div className="motiondisco-principles" variants={staggerGroup}>
        {["No teleop", "No retargeting", "LLM-guided search", "Physics-verified motion"].map((item) => (
          <motion.div className="motiondisco-principle" variants={revealUp} key={item}>
            {item}
          </motion.div>
        ))}
      </motion.div>

      <MediaFrame
        className="motiondisco-overview-media"
        label="MotionDisco discovered robot behavior."
        caption="Discovered whole-body loco-manipulation"
        tone="orange"
        src="videos/motiondisco/tasks/climb_up_with_object_2.mp4"
        preload={isActive ? "auto" : "metadata"}
      />

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2606.06139"
        label="Taouil et al., 2026 · MotionDisco: Motion Discovery for Extreme Humanoid Loco-Manipulation"
      />
    </SlideShell>
  );
}

export function Slide04MotionDiscoPlanning({ isActive = false }: SlideProps) {
  return (
    <SlideShell
      id="motiondisco-planning"
      index={7}
      title="MotionDisco LLM-Assisted Planning"
      isActive={isActive}
    >
      <motion.div className="motiondisco-planning-copy" variants={staggerGroup}>
        <motion.h2 id="motiondisco-planning-title" className="slide-title" variants={revealUp}>
          LLM-assisted contact planning
        </motion.h2>
        <motion.p className="slide-body compact-body" variants={revealUp}>
          The LLM mutates contact-plan programs. IK/TO evaluates feasibility and returns structured feedback.
        </motion.p>
      </motion.div>

      <LlmPlanningLoop />

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2606.06139"
        label="Taouil et al., 2026 · MotionDisco: Motion Discovery for Extreme Humanoid Loco-Manipulation"
      />
    </SlideShell>
  );
}

export function Slide04MotionDiscoBanana({ isActive = false }: SlideProps) {
  const [showPressMention, setShowPressMention] = useState(false);

  return (
    <SlideShell id="motiondisco-banana" index={8} title="MotionDisco Banana" isActive={isActive}>
      <motion.div className="banana-copy" variants={staggerGroup}>
        <motion.h2 id="motiondisco-banana-title" className="slide-title" variants={revealUp}>
          Banana Reaching: hip-breaking for humans, feasible for robots
        </motion.h2>
        <motion.p className="slide-body compact-body" variants={revealUp}>
          Stack the scene, climb for height, reach the target.
        </motion.p>
      </motion.div>

      <motion.figure className="banana-stage" variants={revealUp}>
        <video
          src="videos/motiondisco/tasks/banana_2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "metadata"}
          aria-label="MotionDisco banana picking behavior"
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            if (!showPressMention && Number.isFinite(video.duration) && video.duration > 0 && video.currentTime / video.duration >= 0.65) {
              setShowPressMention(true);
            }
          }}
        />
      </motion.figure>

      {showPressMention && (
        <motion.aside className="banana-press-mention" variants={revealUp} initial="hidden" animate="show">
          <i className="press-medal" aria-hidden="true" />
          <span>PRESS MENTION</span>
          <strong>Video Friday: Robotic Motion Discovery Reveals Unusual Behaviors</strong>
          <em>Evan Ackerman · IEEE Spectrum · 12 Jun 2026</em>
          <p>MotionDisco was highlighted in IEEE Spectrum’s weekly robotics video roundup.</p>
        </motion.aside>
      )}

      <PaperCitation
        href="https://doi.org/10.48550/arXiv.2606.06139"
        label="Taouil et al., 2026 · MotionDisco: Motion Discovery for Extreme Humanoid Loco-Manipulation"
      />
    </SlideShell>
  );
}
