import { motion, AnimatePresence } from "framer-motion";
import { Key, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnlockModalProps {
  isVisible: boolean;
  onUnlock: () => void;
  theoryTitle?: string;
  theoryIcon?: string;
}

export function UnlockModal({ isVisible, onUnlock, theoryTitle, theoryIcon }: UnlockModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              delay: 0.1
            }}
            className="relative max-w-md w-full"
          >
            {/* Celebration Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-yellow-500/30 shadow-2xl overflow-hidden">
              {/* Animated Background Sparkles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Animated Key Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: 0.3
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(234, 179, 8, 0.4)",
                          "0 0 40px rgba(234, 179, 8, 0.6)",
                          "0 0 20px rgba(234, 179, 8, 0.4)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-full"
                    >
                      <Key className="w-16 h-16 text-slate-900" strokeWidth={2.5} />
                    </motion.div>

                    {/* Rotating glow */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, transparent, rgba(234, 179, 8, 0.3), transparent)",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-white mb-3"
                >
                  Theory Completed!
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-300 mb-2"
                >
                  You've earned a key and unlocked:
                </motion.p>

                {/* New Theory Badge */}
                {theoryTitle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="bg-purple-600/30 border border-purple-500/50 rounded-xl p-4 mb-6"
                  >
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                      {theoryIcon && <span className="text-2xl">{theoryIcon}</span>}
                      <span>{theoryTitle}</span>
                    </div>
                  </motion.div>
                )}

                {/* Unlock Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={onUnlock}
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold text-lg py-6 shadow-lg"
                  >
                    <Key className="w-5 h-5 mr-2" />
                    Unlock New Theory
                  </Button>
                </motion.div>

                {/* Encouragement Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-400 text-sm mt-4"
                >
                  Keep exploring the rabbit hole...
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
