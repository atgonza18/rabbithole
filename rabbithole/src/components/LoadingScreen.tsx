import { motion, AnimatePresence } from "framer-motion";
import { useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";

interface LoadingScreenProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export function LoadingScreen({ isVisible, onAnimationComplete }: LoadingScreenProps) {
  const { RiveComponent, rive } = useRive({
    src: "/loading_rabbit.riv",
    autoplay: true,
  });

  // Listen for when the animation completes
  useEffect(() => {
    if (rive && isVisible && onAnimationComplete) {
      // Animation completes in 2 seconds
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [rive, isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="w-96 h-96"
          >
            <RiveComponent />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
