import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}) => {
  return (
    <motion.div
      key={keyValue}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
      className={className}
    </motion.div>
  );
};

export default AnimationWrapper;