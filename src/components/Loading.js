import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/helpers";

const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#03CEA4",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: [0, -6, 0],
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  repeatDelay: 1,
  ease: "easeInOut",
};

export default function Loading({ className }) {
  return (
    <div className={cn("z-50 h-full w-full", className)}>
      <div className="my-4 flex h-full w-full items-center justify-center">
        <AnimatePresence>
          <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            transition={loadingCircleTransition}
            animate="start"
          >
            {Array.from({ length: 3 }, (_, i) => (
              <motion.span
                key={i}
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
              ></motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
