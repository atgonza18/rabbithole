import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, Award, Zap, Eye } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { useState, useEffect } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function TheoryReader() {
  const { theoryId, sectionId } = useParams<{ theoryId: string; sectionId?: string }>();
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { playPageTurn, playCelebration } = useSoundEffects();

  // Get mock user for development
  const mockUser = useQuery(api.users.getMockUser);
  const getOrCreateMockUser = useMutation(api.users.getOrCreateMockUser);

  // Create mock user if it doesn't exist
  useEffect(() => {
    if (mockUser === null) {
      getOrCreateMockUser();
    }
  }, [mockUser, getOrCreateMockUser]);

  // Mutations for progress tracking
  const completePage = useMutation(api.progress.completePage);
  const startTheory = useMutation(api.progress.startTheory);

  const theory = useQuery(
    api.theories.getTheoryById,
    theoryId ? { theoryId: theoryId as Id<"theories"> } : "skip"
  );

  // Load pages based on whether we have a sectionId or not
  const pagesBySection = useQuery(
    sectionId ? api.pages.getPagesBySectionId : "skip",
    sectionId ? { sectionId: sectionId as Id<"theorySections"> } : "skip"
  );

  const pagesByTheory = useQuery(
    !sectionId && theoryId ? api.pages.getPagesByTheoryId : "skip",
    !sectionId && theoryId ? { theoryId: theoryId as Id<"theories"> } : "skip"
  );

  const pages = sectionId ? pagesBySection : pagesByTheory;
  const currentPage = pages?.[currentPageIndex];

  const question = useQuery(
    api.questions.getQuestionByPageId,
    currentPage && currentPage.hasQuestion ? { pageId: currentPage._id } : "skip"
  );

  // Get user progress to check if theory is complete
  const userProgress = useQuery(
    theoryId && mockUser ? api.progress.getUserTheoryProgress : "skip",
    theoryId && mockUser ? { userId: mockUser._id, theoryId: theoryId as Id<"theories"> } : "skip"
  );

  // Start theory progress when component mounts
  useEffect(() => {
    if (theoryId && mockUser) {
      startTheory({ userId: mockUser._id, theoryId: theoryId as Id<"theories"> });
    }
  }, [theoryId, mockUser, startTheory]);

  if (theory === undefined || pages === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-slate-400 flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Loading theory...
        </motion.div>
      </div>
    );
  }

  if (!theory || !pages || pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center max-w-md bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800"
        >
          <Eye className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h2 className="text-2xl font-bold mb-4">Theory Not Found</h2>
          <p className="text-slate-400 mb-6">This rabbit hole leads nowhere...</p>
          <Button onClick={() => navigate("/")} className="w-full">Return Home</Button>
        </motion.div>
      </div>
    );
  }

  const isLastPage = currentPageIndex === pages.length - 1;
  const progressPercentage = ((currentPageIndex + 1) / pages.length) * 100;

  const handleCorrectAnswer = async () => {
    // Mark current page as completed
    if (currentPage && theoryId && mockUser) {
      await completePage({
        userId: mockUser._id,
        theoryId: theoryId as Id<"theories">,
        pageId: currentPage._id,
      });
    }

    if (isLastPage) {
      // Section complete - navigate home
      // Only show celebration if entire theory is complete (checked in completePage mutation)
      if (userProgress?.isCompleted) {
        playCelebration();
        setShowCelebration(true);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        // Section done but theory not complete - just navigate home
        navigate("/");
      }
    } else {
      // Move to next page
      playPageTurn();
      setCurrentPageIndex(currentPageIndex + 1);
      setShowQuestion(false);
    }
  };

  const handleContinue = () => {
    playPageTurn();
    if (currentPage?.hasQuestion && !showQuestion) {
      setShowQuestion(true);
    } else {
      handleCorrectAnswer();
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-[#1a1a1a] overflow-hidden relative"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Completion Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
              >
                <Award className="w-32 h-32 mx-auto mb-6 text-yellow-400" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">Section Complete!</h2>
              <p className="text-xl text-slate-300">Truth revealed +100 XP</p>
              <div className="flex gap-2 justify-center mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header */}
      <header className="flex-shrink-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 relative z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors group"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </motion.button>

            {/* XP Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-400">
                +{(currentPageIndex + 1) * 10} XP
              </span>
            </motion.div>

            <div className="text-xs text-slate-400 font-mono bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              {currentPageIndex + 1}/{pages.length}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden border border-slate-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 relative"
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            {/* Progress Milestones */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {pages.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index <= currentPageIndex
                      ? 'bg-white shadow-lg shadow-green-500/50'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-0 overflow-hidden flex items-center justify-center p-4">
        <div className="w-full max-w-3xl h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showQuestion ? (
                // Enhanced Content Card
                <motion.div
                  key={`content-${currentPageIndex}`}
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-50" />

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl flex flex-col max-h-[calc(100vh-12rem)]">
                    {/* Page number indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 flex-shrink-0"
                    >
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-mono text-slate-400">
                        EVIDENCE #{currentPageIndex + 1}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="prose prose-invert prose-slate max-w-none mb-6 prose-headings:text-green-400 prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-green-400 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                      dangerouslySetInnerHTML={{ __html: currentPage?.content || "" }}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <Button
                        onClick={handleContinue}
                        className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-500/30 group relative overflow-hidden"
                        size="lg"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {currentPage?.hasQuestion
                            ? "Answer Question"
                            : isLastPage
                            ? "Complete Section"
                            : "Continue"}
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                // Enhanced Question Card
                <motion.div
                  key={`question-${currentPageIndex}`}
                  initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50" />

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl flex flex-col max-h-[calc(100vh-12rem)]">
                    {/* Question indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 flex-shrink-0"
                    >
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-mono text-purple-400">
                        TRUTH CHECK
                      </span>
                    </motion.div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                      {question ? (
                        <QuestionCard
                          question={question}
                          onCorrectAnswer={handleCorrectAnswer}
                        />
                      ) : (
                        <div className="text-center text-slate-400 flex items-center justify-center gap-2 h-full">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                          Loading question...
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
