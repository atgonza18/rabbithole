import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { Lock, Check, Key, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRive } from "@rive-app/react-canvas";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const theories = useQuery(api.theories.getAllTheories);
  const seedBerenstain = useMutation(api.seedBerenstain.seedBerenstainBears);
  const getOrCreateMockUser = useMutation(api.users.getOrCreateMockUser);
  const [isLoading, setIsLoading] = useState(false);

  // Get mock user for development
  const mockUser = useQuery(api.users.getMockUser);

  // Create mock user if it doesn't exist
  useEffect(() => {
    if (mockUser === null) {
      getOrCreateMockUser();
    }
  }, [mockUser, getOrCreateMockUser]);

  // Get the first theory (or user's current theory)
  const currentTheory = theories?.[0];

  // Get sections for the current theory
  const sections = useQuery(
    currentTheory ? api.sections.getSectionsByTheoryId : "skip",
    currentTheory ? { theoryId: currentTheory._id } : "skip"
  );

  // Get completed sections for progress tracking
  const completedSectionIds = useQuery(
    currentTheory && mockUser ? api.progress.getCompletedSections : "skip",
    currentTheory && mockUser ? { userId: mockUser._id, theoryId: currentTheory._id } : "skip"
  );

  // Get user progress for the theory
  const userProgress = useQuery(
    currentTheory && mockUser ? api.progress.getUserTheoryProgress : "skip",
    currentTheory && mockUser ? { userId: mockUser._id, theoryId: currentTheory._id } : "skip"
  );

  // Rive animation
  const { RiveComponent, rive } = useRive({
    src: "/rh_rabbit.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Reset loading state when returning to home page
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Ensure animation is always playing
  useEffect(() => {
    if (rive) {
      rive.play();
    }
  }, [rive]);

  if (theories === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="text-slate-400">Loading theories...</div>
      </div>
    );
  }

  if (theories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pb-20" style={{ backgroundColor: '#2d2d2d' }}>
        <Card className="p-8 max-w-md text-center bg-slate-900/50 border-slate-800">
          <h2 className="text-2xl font-bold mb-4 text-white">No Theories Yet</h2>
          <p className="text-slate-400 mb-6">
            Let's get started by creating the Berenstain Bears theory!
          </p>
          <Button
            onClick={async () => {
              await seedBerenstain();
            }}
            className="mb-3"
          >
            Create Berenstain Bears Theory
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Or Go to Admin Panel
          </Button>
        </Card>
      </div>
    );
  }

  if (sections === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2d2d2d' }}>
        <div className="text-slate-400">Loading sections...</div>
      </div>
    );
  }

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen isVisible={isLoading} onAnimationComplete={handleLoadingComplete} />
      <div
        className="h-screen flex flex-col overflow-hidden"
        style={{
          backgroundColor: '#2d2d2d',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
      >
        {/* Stats Bar - Top */}
        <div className="flex-shrink-0 backdrop-blur-sm border-b border-slate-800/30 z-40" style={{ backgroundColor: 'rgba(10, 14, 39, 0.95)' }}>
          <div className="flex items-center justify-between px-4 py-3">
            {/* Streak */}
            <StatBadge
              icon={<div className="w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm" />}
              value="6"
            />

            {/* Fire */}
            <StatBadge
              icon={<div className="relative w-5 h-5">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">5</span>
                </div>
              </div>}
              value=""
            />

            {/* Gems/Lingots */}
            <StatBadge
              icon={<div className="w-5 h-5 bg-cyan-400 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />}
              value="905"
            />

            {/* Keys */}
            <StatBadge
              icon={<Key className="w-5 h-5 text-yellow-400" />}
              value={mockUser?.keysEarned?.toString() || "0"}
            />
          </div>
        </div>

        {/* Main Content - Flex container */}
        <div className="flex-1 flex flex-col overflow-y-auto px-4">
          {/* Section Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 mt-3 mb-3"
          >
            <Card className="bg-gradient-to-r from-purple-600/80 to-purple-700/80 border-purple-500/30 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-xs font-bold tracking-wider mb-1">
                    SECTION 1, {currentTheory?.title.toUpperCase()}
                  </p>
                  <h2 className="text-white text-lg font-bold">
                    {sections[0]?.title || "Begin Your Journey"}
                  </h2>
                </div>
                <div className="text-purple-200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 8h6M9 12h6M9 16h3" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Vertical Path with Rabbit Character - Flex container */}
          <div className="flex-1 flex flex-col max-w-lg mx-auto w-full pb-4">
            {/* Rabbit Character at top - offset to left for dynamic look */}
            <div className="flex-shrink-0 flex justify-center mb-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: -30 }}
                transition={{ delay: 0.2 }}
                className="w-32 h-32"
              >
                <RiveComponent />
              </motion.div>
            </div>

            {/* Rabbit Holes Path - Staggered Layout with dynamic spacing */}
            <div className="flex-1 relative flex flex-col items-center justify-evenly min-h-0 pb-20">
              {sections.map((section, index) => {
                const isCompleted = completedSectionIds?.includes(section._id) || false;
                const previousSection = index > 0 ? sections[index - 1] : null;
                const isPreviousCompleted = previousSection
                  ? completedSectionIds?.includes(previousSection._id) || false
                  : true;
                const isLocked = index > 0 && !isPreviousCompleted;
                const isCurrent = !isCompleted && !isLocked;

                // Calculate horizontal offset for staggered pattern
                // Pattern: right, left, center, right, left, center...
                const getOffset = (idx: number) => {
                  const pattern = idx % 3;
                  if (pattern === 0) return 50; // Right
                  if (pattern === 1) return -50; // Left
                  return 0; // Center
                };

                const xOffset = getOffset(index);

                return (
                  <motion.div
                    key={section._id}
                    initial={{ opacity: 0, y: 20, x: xOffset }}
                    animate={{ opacity: 1, y: 0, x: xOffset }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative flex-shrink-0"
                  >
                    <RabbitHoleNode
                      section={section}
                      isLocked={isLocked}
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      onClick={() => {
                        if (!isLocked) {
                          setIsLoading(true);
                          setTimeout(() => {
                            navigate(`/theory/${currentTheory?._id}/section/${section._id}`);
                          }, 2000);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Stats Badge Component
function StatBadge({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      {value && <span className="text-sm font-bold text-slate-300">{value}</span>}
    </div>
  );
}

// Rabbit Hole Node Component
interface RabbitHoleNodeProps {
  section: any;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

function RabbitHoleNode({
  section,
  isLocked,
  isCompleted,
  isCurrent,
  onClick,
}: RabbitHoleNodeProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className="relative"
    >
      {/* Outer container - 3D button wrapper */}
      <motion.div
        whileHover={!isLocked ? { scale: 1.05 } : {}}
        whileTap={!isLocked ? { scale: 0.97, y: 2 } : {}}
        className="relative"
        style={{
          width: '160px',
          height: '64px',
        }}
      >
        {/* Outer ring/rim - the border that creates the 3D edge */}
        <motion.div
          className="absolute inset-0"
          style={{
            borderRadius: '50%',
            background: isCurrent || isCompleted
              ? 'linear-gradient(180deg, #00ff88 0%, #00cc6f 100%)'
              : isLocked
              ? 'linear-gradient(180deg, #3a3a4a 0%, #2a2a3a 100%)'
              : 'linear-gradient(180deg, #4a5a6a 0%, #3a4a5a 100%)',
            boxShadow: isCurrent
              ? '0 5px 0 #008855, 0 6px 16px rgba(0, 255, 136, 0.4)'
              : isCompleted
              ? '0 5px 0 #008855, 0 6px 12px rgba(0, 255, 136, 0.2)'
              : isLocked
              ? '0 5px 0 #1a1a24, 0 6px 16px rgba(0, 0, 0, 0.3)'
              : '0 5px 0 #1a2a3a, 0 6px 16px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease',
          }}
          animate={
            isCurrent && !isCompleted
              ? {
                  boxShadow: [
                    '0 5px 0 #008855, 0 6px 16px rgba(0, 255, 136, 0.4), 0 0 24px rgba(0, 255, 136, 0.3)',
                    '0 5px 0 #008855, 0 6px 16px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 255, 136, 0.5)',
                    '0 5px 0 #008855, 0 6px 16px rgba(0, 255, 136, 0.4), 0 0 24px rgba(0, 255, 136, 0.3)',
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner ellipse - the recessed "hole" center */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            borderRadius: '50%',
            background: isCompleted
              ? 'linear-gradient(180deg, #0a0e1a 0%, #1a1e2a 100%)'
              : 'linear-gradient(180deg, #0a0e1a 0%, #1a1e2a 100%)',
            boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.6), inset 0 -2px 3px rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Icon/Content */}
          {isLocked ? (
            <Lock className="w-5 h-5 text-slate-500" />
          ) : isCompleted ? (
            <div className="flex items-center gap-1.5">
              <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
              <span className="text-lg opacity-70">{section.icon || "🕳️"}</span>
            </div>
          ) : isCurrent ? (
            <span className="text-xl">{section.icon || "🕳️"}</span>
          ) : (
            <span className="text-xl opacity-60">{section.icon || "🕳️"}</span>
          )}
        </div>
      </motion.div>
    </button>
  );
}
