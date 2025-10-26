import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionCelebrationVideoProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function SectionCelebrationVideo({
  isVisible,
  onComplete,
}: SectionCelebrationVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload video when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load(); // Preload the video
      video.preload = "auto";
    }
  }, []);

  // Play video when it becomes visible
  useEffect(() => {
    const video = videoRef.current;
    if (isVisible && video) {
      video.currentTime = 0; // Reset to start
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [isVisible]);

  // Handle video end
  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black"
          style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
            onEnded={handleVideoEnd}
            playsInline
            muted={false}
            preload="auto"
          >
            <source src="/section-celebration.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
