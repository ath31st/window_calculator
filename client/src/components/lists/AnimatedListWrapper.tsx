import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedListWrapperProps {
  children: ReactNode;
}

const AnimatedListWrapper: React.FC<AnimatedListWrapperProps> = ({
  children,
}) => {
  return (
    <AnimatePresence>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={child.key || index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </AnimatePresence>
  );
};

export default AnimatedListWrapper;
