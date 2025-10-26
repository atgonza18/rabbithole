import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { Lock, Check, Key, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRive } from "@rive-app/react-canvas";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UnlockModal } from "@/components/UnlockModal";
import { useState, useEffect } from "react";
import { Id } from "../../../convex/_generated/dataModel";

export default function HomePage() {
  const navigate = useNavigate();
  const theories = useQuery(api.theories.getAllTheories);
  const seedBerenstain = useMutation(api.seedBerenstain.seedBerenstainBears);
  const seedCelebrityCloning = useMutation(api.seedCelebrityCloning.seedCelebrityCloning);
  const getOrCreateMockUser = useMutation(api.users.getOrCreateMockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newlyUnlockedTheory, setNewlyUnlockedTheory] = useState<any>(null);

  // Get mock user for development
  const mockUser = useQuery(api.users.getMockUser);

  // Create mock user if it doesn't exist
  useEffect(() => {
    if (mockUser === null) {
      getOrCreateMockUser();
    }
  }, [mockUser, getOrCreateMockUser]);

  // Get unlocked theories for the user
  const unlockedTheories = useQuery(
    mockUser ? api.progress.getUnlockedTheories : "skip",
    mockUser ? { userId: mockUser._id } : "skip"
  );

  // Get the most recently unlocked theory (for the modal)
  const recentlyUnlocked = useQuery(
    mockUser ? api.progress.getMostRecentlyUnlockedTheory : "skip",
    mockUser ? { userId: mockUser._id } : "skip"
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

  // Check for newly unlocked theory and show modal
  useEffect(() => {
    if (recentlyUnlocked && !showUnlockModal) {
      // Check if we've already shown this unlock
      const lastShownUnlockId = localStorage.getItem('lastShownUnlockId');
      const currentUnlockId = `${recentlyUnlocked.theory._id}-${recentlyUnlocked.unlockedAt}`;

      // Check if the unlock is recent (within last 30 seconds) and we haven't shown it yet
      const isRecent = Date.now() - recentlyUnlocked.unlockedAt < 30000;
      const notShownYet = lastShownUnlockId !== currentUnlockId;

      if (isRecent && notShownYet) {
        setNewlyUnlockedTheory(recentlyUnlocked.theory);
        setShowUnlockModal(true);
        localStorage.setItem('lastShownUnlockId', currentUnlockId);
      }
    }
  }, [recentlyUnlocked, showUnlockModal]);

  const handleUnlockModalClose = () => {
    setShowUnlockModal(false);
    setNewlyUnlockedTheory(null);
    // Scroll to the newly unlocked theory
    setTimeout(() => {
      const element = document.getElementById(`theory-${newlyUnlockedTheory?._id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (theories === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-400">Loading theories...</div>
      </div>
    );
  }

  if (theories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pb-20 bg-slate-950">
        <Card className="p-8 max-w-md text-center bg-slate-900/50 border-slate-800">
          <h2 className="text-2xl font-bold mb-4 text-white">No Theories Yet</h2>
          <p className="text-slate-400 mb-6">
            Let's get started by creating your first theory!
          </p>
          <div className="space-y-3 mb-6">
            <Button
              onClick={async () => {
                await seedBerenstain();
              }}
              className="w-full"
            >
              🐻 Create Berenstain Bears Theory
            </Button>
            <Button
              onClick={async () => {
                await seedCelebrityCloning();
              }}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              👥 Create Celebrity Cloning Theory
            </Button>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Or Go to Admin Panel
          </Button>
        </Card>
      </div>
    );
  }

  if (!mockUser || !unlockedTheories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-400">Loading your progress...</div>
      </div>
    );
  }

  // Separate unlocked and locked theories
  const lockedTheories = theories.filter(
    (theory) => theory.isLocked && !unlockedTheories.some((u) => u._id === theory._id)
  );

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen isVisible={isLoading} onAnimationComplete={handleLoadingComplete} />
      <UnlockModal
        isVisible={showUnlockModal}
        onUnlock={handleUnlockModalClose}
        theoryTitle={newlyUnlockedTheory?.title}
        theoryIcon={newlyUnlockedTheory?.icon}
      />

      <div
        className="h-screen flex flex-col overflow-hidden bg-slate-950"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
      >
        {/* Stats Bar - Top */}
        <div className="flex-shrink-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/30 z-40">
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

            {/* Keys */}
            <StatBadge
              icon={<Key className="w-5 h-5 text-yellow-400" />}
              value={mockUser?.keysEarned?.toString() || "0"}
            />

            {/* XP */}
            <StatBadge
              icon={<Zap className="w-5 h-5 text-purple-400 fill-purple-400" />}
              value={mockUser?.xp?.toString() || "0"}
            />
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-lg mx-auto w-full px-4 pb-24">
            {/* Unlocked Theories - Stacked Vertically */}
            {unlockedTheories.map((theory, theoryIndex) => (
              <TheoryBlock
                key={theory._id}
                theory={theory}
                theoryIndex={theoryIndex}
                userId={mockUser._id}
                RiveComponent={RiveComponent}
                onSectionClick={(sectionId) => {
                  setIsLoading(true);
                  setTimeout(() => {
                    navigate(`/theory/${theory._id}/section/${sectionId}`);
                  }, 2000);
                }}
              />
            ))}

            {/* Locked Theories Preview */}
            {lockedTheories.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider text-center">
                  Locked Theories
                </h3>
                {lockedTheories.map((theory) => (
                  <LockedTheoryCard key={theory._id} theory={theory} />
                ))}
              </div>
            )}
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

// Theory Block Component - Displays one complete theory with all sections
interface TheoryBlockProps {
  theory: any;
  theoryIndex: number;
  userId: Id<"users">;
  RiveComponent: React.ComponentType;
  onSectionClick: (sectionId: Id<"theorySections">) => void;
}

function TheoryBlock({ theory, theoryIndex, userId, RiveComponent, onSectionClick }: TheoryBlockProps) {
  // Get sections for this theory
  const sections = useQuery(api.sections.getSectionsByTheoryId, { theoryId: theory._id });

  // Get completed sections for progress tracking
  const completedSectionIds = useQuery(api.progress.getCompletedSections, {
    userId: userId,
    theoryId: theory._id,
  });

  // Get user progress for the theory
  const userProgress = useQuery(api.progress.getUserTheoryProgress, {
    userId: userId,
    theoryId: theory._id,
  });

  if (!sections || !completedSectionIds) {
    return null;
  }

  const isTheoryCompleted = userProgress?.isCompleted || false;

  return (
    <motion.div
      id={`theory-${theory._id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: theoryIndex * 0.1 }}
      className="mb-12 scroll-mt-24"
    >
      {/* Theory Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: theoryIndex * 0.1 + 0.1 }}
        className="mb-6"
      >
        <Card className={`p-4 relative overflow-hidden backdrop-blur-sm ${
          isTheoryCompleted
            ? 'bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 border-emerald-500/30'
            : 'bg-gradient-to-r from-purple-600/80 to-purple-700/80 border-purple-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-bold tracking-wider mb-1 ${
                isTheoryCompleted ? 'text-emerald-200' : 'text-purple-200'
              }`}>
                THEORY {theory.order + 1}
                {isTheoryCompleted && " • COMPLETED"}
              </p>
              <h2 className="text-white text-lg font-bold">
                {theory.icon} {theory.title}
              </h2>
            </div>
            {isTheoryCompleted && (
              <Check className="w-8 h-8 text-emerald-200" strokeWidth={3} />
            )}
          </div>
        </Card>
      </motion.div>

      {/* Rabbit Character */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: -30 }}
          transition={{ delay: theoryIndex * 0.1 + 0.2 }}
          className="w-32 h-32"
        >
          <RiveComponent />
        </motion.div>
      </div>

      {/* Section Nodes in Vertical Path */}
      <div className="relative flex flex-col items-center gap-10 pb-8">
        {sections.map((section, index) => {
          const isCompleted = completedSectionIds?.includes(section._id) || false;
          const previousSection = index > 0 ? sections[index - 1] : null;
          const isPreviousCompleted = previousSection
            ? completedSectionIds?.includes(previousSection._id) || false
            : true;
          const isLocked = index > 0 && !isPreviousCompleted;
          const isCurrent = !isCompleted && !isLocked;

          // Calculate horizontal offset for staggered pattern
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
              transition={{ delay: theoryIndex * 0.1 + 0.3 + index * 0.1 }}
              className="relative"
            >
              <RabbitHoleNode
                section={section}
                isLocked={isLocked}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                onClick={() => {
                  if (!isLocked) {
                    onSectionClick(section._id);
                  }
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Locked Theory Card Component
function LockedTheoryCard({ theory }: { theory: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <Card className="p-4 bg-slate-800/30 border-slate-700/50 relative overflow-hidden">
        <div className="flex items-center gap-4 opacity-50">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center">
            <Lock className="w-6 h-6 text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="text-slate-500 text-xs font-bold tracking-wider mb-1">
              THEORY {theory.order + 1} • LOCKED
            </p>
            <h3 className="text-slate-400 font-semibold">
              {theory.icon} {theory.title}
            </h3>
          </div>
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-800/20 pointer-events-none" />
      </Card>
    </motion.div>
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
