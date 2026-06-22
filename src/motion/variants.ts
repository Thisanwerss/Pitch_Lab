import type { Variants } from "framer-motion";

export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const slideTransition: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: smoothEase },
  },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: smoothEase },
  },
};

export const staggerGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: smoothEase },
  },
};
