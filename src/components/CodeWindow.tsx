import { motion } from "framer-motion";
import { revealUp, staggerGroup } from "../motion/variants";

const lines = [
  'plan.add_contact("left_hand", table, t=[1.2, 2.4])',
  'plan.shift_weight("right_foot")',
  'plan.release("left_hand")',
  "physics.check(feasible=True)",
];

export function CodeWindow() {
  return (
    <motion.div
      className="code-window"
      variants={staggerGroup}
    >
      <div className="code-window-top" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="code-window-body" aria-label="Simplified contact-plan program">
        {lines.map((line) => (
          <motion.code variants={revealUp} key={line}>
            {line}
          </motion.code>
        ))}
      </div>
    </motion.div>
  );
}
