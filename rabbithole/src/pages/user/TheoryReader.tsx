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
import { SectionCelebrationVideo } from "@/components/SectionCelebrationVideo";

export default function TheoryReader() {
  const { theoryId, sectionId } = useParams<{ theoryId: string; sectionId?: string }>();
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSectionVideo, setShowSectionVideo] = useState(false);
  const { playPageTurn, playCelebration, playClick } = useSoundEffects();

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

  // Get all pages in the entire theory to check if this is the last page of the whole theory
  const allTheoryPages = useQuery(
    theoryId ? api.pages.getPagesByTheoryId : "skip",
    theoryId ? { theoryId: theoryId as Id<"theories"> } : "skip"
  );

  // Check if theory is unlocked for the user
  const isUnlocked = useQuery(
    theoryId && mockUser ? api.progress.isTheoryUnlocked : "skip",
    theoryId && mockUser ? { userId: mockUser._id, theoryId: theoryId as Id<"theories"> } : "skip"
  );

  // Redirect if theory is locked
  useEffect(() => {
    if (theory && mockUser && isUnlocked === false && theory.isLocked) {
      // Theory is locked and user hasn't unlocked it - redirect to home
      navigate("/");
    }
  }, [theory, mockUser, isUnlocked, navigate]);

  // Start theory progress when component mounts
  useEffect(() => {
    if (theoryId && mockUser) {
      startTheory({ userId: mockUser._id, theoryId: theoryId as Id<"theories"> });
    }
  }, [theoryId, mockUser, startTheory]);

  if (theory === undefined || pages === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center max-w-md bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800"
        >
          <Eye className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h2 className="text-2xl font-bold mb-4">Theory Not Found</h2>
          <p className="text-slate-400 mb-6">This rabbit hole leads nowhere...</p>
          <Button onClick={() => { playClick(); navigate("/"); }} className="w-full">Return Home</Button>
        </motion.div>
      </div>
    );
  }

  const isLastPage = currentPageIndex === pages.length - 1;
  const progressPercentage = ((currentPageIndex + 1) / pages.length) * 100;

  // Check if this is the last page of the entire theory
  const isLastPageOfTheory = currentPage && allTheoryPages
    ? allTheoryPages[allTheoryPages.length - 1]?._id === currentPage._id
    : false;

  const handleCorrectAnswer = async () => {
    // Check if this will complete a section BEFORE marking as complete
    let willCompleteSection = false;

    if (currentPage && currentPage.sectionId && pages && userProgress) {
      // Get all pages in current section
      const sectionPages = pages.filter(p => p.sectionId === currentPage.sectionId);

      // Check if all pages in section will be completed after this one
      const completedInSection = sectionPages.filter(p =>
        userProgress.completedPageIds.includes(p._id) || p._id === currentPage._id
      );

      willCompleteSection = completedInSection.length === sectionPages.length;
    }

    // Mark current page as completed
    if (currentPage && theoryId && mockUser) {
      await completePage({
        userId: mockUser._id,
        theoryId: theoryId as Id<"theories">,
        pageId: currentPage._id,
      });
    }

    if (isLastPage) {
      // Check if this is the last page of the entire theory
      if (isLastPageOfTheory) {
        // Theory complete! Show celebration then navigate home
        playCelebration();
        setShowCelebration(true);

        // Wait for the celebration, then navigate to home where unlock modal will show
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        // Section done but theory not complete
        // Show section video celebration if section was just completed
        if (willCompleteSection) {
          setShowSectionVideo(true);
        } else {
          navigate("/");
        }
      }
    } else {
      // Not last page - check if section was just completed
      if (willCompleteSection) {
        setShowSectionVideo(true);
      } else {
        // Move to next page
        playPageTurn();
        setCurrentPageIndex(currentPageIndex + 1);
        setShowQuestion(false);
      }
    }
  };

  const handleSectionVideoComplete = () => {
    setShowSectionVideo(false);

    // If this was the last page of the section, navigate home
    if (isLastPage) {
      navigate("/");
    } else {
      // Otherwise, move to next page
      playPageTurn();
      setCurrentPageIndex(currentPageIndex + 1);
      setShowQuestion(false);
    }
  };

  const handleContinue = () => {
    playClick();
    playPageTurn();
    if (currentPage?.hasQuestion && !showQuestion) {
      setShowQuestion(true);
    } else {
      handleCorrectAnswer();
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-slate-950 overflow-hidden relative"
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

      {/* Section Video Celebration */}
      <SectionCelebrationVideo
        isVisible={showSectionVideo}
        onComplete={handleSectionVideoComplete}
      />

      {/* Theory Completion Celebration Overlay */}
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
              <h2 className="text-4xl font-bold mb-4 text-white">Theory Complete!</h2>
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
              onClick={() => {
                playClick();
                navigate("/");
              }}
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
      <main className="flex-1 relative z-0 flex items-center justify-center px-4 pt-4 pb-8">
        <div className="w-full max-w-3xl h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showQuestion ? (
                // Content Card
                <motion.div
                  key={`content-${currentPageIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-full max-w-3xl bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                    {/* Header Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-slate-800/70 border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Evidence #{currentPageIndex + 1}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="prose prose-invert prose-slate max-w-none mb-6
                        prose-headings:text-green-400 prose-headings:font-bold
                        prose-h2:text-xl md:prose-h2:text-2xl
                        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
                        prose-strong:text-white
                        prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline
                        prose-li:text-slate-300 prose-li:marker:text-green-400
                        prose-blockquote:border-l-green-400 prose-blockquote:text-slate-400"
                      dangerouslySetInnerHTML={{ __html: currentPage?.content || "" }}
                    />

                    {/* Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        onClick={handleContinue}
                        className="w-full py-5 text-base font-semibold bg-green-600 hover:bg-green-500 transition-all duration-200 shadow-lg shadow-green-900/50 group"
                        size="lg"
                      >
                        <span className="flex items-center justify-center gap-2">
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
                // Question Card
                <motion.div
                  key={`question-${currentPageIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-full max-w-3xl bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                    {/* Header Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-purple-500/10 border border-purple-500/30"
                    >
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                        Truth Check
                      </span>
                    </motion.div>

                    {/* Question Content */}
                    {question ? (
                      <QuestionCard
                        question={question}
                        onCorrectAnswer={handleCorrectAnswer}
                      />
                    ) : (
                      <div className="text-center text-slate-400 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Loading question...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
