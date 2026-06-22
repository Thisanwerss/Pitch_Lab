import { motion } from "framer-motion";
import { Kicker } from "../components/Kicker";
import { MediaFrame } from "../components/MediaFrame";
import { SlideShell } from "../components/SlideShell";
import { revealUp, staggerGroup } from "../motion/variants";

type SlideProps = {
  isActive?: boolean;
};

export function Slide01Hero({ isActive = false }: SlideProps) {
  return (
    <SlideShell id="hero" index={1} title="Beyond Teleoperation" isActive={isActive}>
      <motion.div className="hero-copy" variants={staggerGroup}>
        <Kicker>PUBLIC WEB SLIDES / HUMANOID LOCO-MANIPULATION</Kicker>
        <motion.h1 id="hero-title" className="hero-title" variants={revealUp}>
          Beyond <span>Teleoperation</span>
          <br />
          for Humanoid
          <br />
          Loco-Manipulation
        </motion.h1>
        <motion.p className="hero-slogan" variants={revealUp}>
          Teleoperation is a <strong>seed</strong>, not the ceiling.
        </motion.p>
        <motion.p className="presenter-line" variants={revealUp}>
          Presenter: <strong>Dian Yu</strong>
        </motion.p>
      </motion.div>

      <motion.div className="hero-media-wrap" variants={revealUp}>
        <MediaFrame
          className="hero-media"
          label="Humanoid robot performing whole-body loco-manipulation."
          caption="DynaRetarget real-world humanoid loco-manipulation"
          src="videos/dynaretarget/video_submission/real_world_experiments/exp3.mp4"
          preload={isActive ? "auto" : "metadata"}
        />
      </motion.div>

      <motion.div className="hero-flow" variants={staggerGroup}>
        {["Human demo", "Physics", "Discovery", "Self-exploration"].map((item) => (
          <motion.span variants={revealUp} key={item}>
            {item}
          </motion.span>
        ))}
      </motion.div>
    </SlideShell>
  );
}
