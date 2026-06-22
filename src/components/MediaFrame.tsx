import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp } from "../motion/variants";

type MediaFrameProps = {
  label: string;
  caption?: string;
  src?: string;
  poster?: string;
  tone?: "blue" | "cyan" | "orange" | "red" | "neutral";
  className?: string;
  preload?: "auto" | "metadata" | "none";
  children?: ReactNode;
};

export function MediaFrame({
  label,
  caption,
  src,
  poster,
  tone = "blue",
  className = "",
  preload = "metadata",
  children,
}: MediaFrameProps) {
  return (
    <motion.figure
      className={`media-frame media-${tone} ${className}`}
      aria-label={label}
      variants={revealUp}
    >
      <div className="media-placeholder">
        {src ? (
          <video
            className="media-video"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload={preload}
            aria-label={label}
          />
        ) : children ? (
          children
        ) : (
          <>
            <div className="placeholder-orbit" aria-hidden="true" />
            <div className="robot-silhouette" aria-hidden="true">
              <span className="robot-head" />
              <span className="robot-spine" />
              <span className="robot-arm robot-arm-left" />
              <span className="robot-arm robot-arm-right" />
              <span className="robot-leg robot-leg-left" />
              <span className="robot-leg robot-leg-right" />
            </div>
            <span className="media-placeholder-label">{label}</span>
          </>
        )}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </motion.figure>
  );
}
