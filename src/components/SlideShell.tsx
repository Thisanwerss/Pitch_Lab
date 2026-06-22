import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { slideTransition } from "../motion/variants";

type SlideShellProps = {
  id: string;
  index: number;
  title?: string;
  isActive?: boolean;
  children: ReactNode;
};

export function SlideShell({
  id,
  index,
  title,
  isActive = false,
  children,
}: SlideShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`slide ${isActive ? "is-active" : ""}`}
      id={id}
      data-slide-index={index}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="slide-local-glow" aria-hidden="true" />
      <motion.div
        className="slide-inner"
        variants={reduceMotion ? undefined : slideTransition}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isActive ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}
