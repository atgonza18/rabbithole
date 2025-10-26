import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Sparkles, AlertCircle } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Question {
  _id: string;
  questionType: "multiple_choice" | "true_false" | "fill_in_blank" | "image_selection";
  questionText: string;
  options?: Array<{
    id: string;
    text?: string;
    imageUrl?: string;
  }>;
  correctAnswer: string;
  explanation?: string;
}

interface QuestionCardProps {
  question: Question;
  onCorrectAnswer: () => void;
}

export function QuestionCard({ question, onCorrectAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { playCorrect, playWrong, playSelect, playClick } = useSoundEffects();

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const normalizedUserAnswer = selectedAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;

    setIsCorrect(correct);
    setSubmitted(true);

    // Play sound effect
    if (correct) {
      playCorrect();
    } else {
      playWrong();
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      onCorrectAnswer();
    } else {
      // Reset for retry
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case "multiple_choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => {
                  if (!submitted) {
                    playSelect();
                    setSelectedAnswer(option.id);
                  }
                }}
                disabled={submitted}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!submitted ? { scale: 1.02, x: 4 } : {}}
                whileTap={!submitted ? { scale: 0.98 } : {}}
                className={`
                  relative w-full p-5 rounded-xl border-2 text-left transition-all group overflow-hidden
                  ${
                    selectedAnswer === option.id
                      ? submitted
                        ? isCorrect
                          ? "border-green-500 bg-gradient-to-r from-green-500/20 to-green-500/10"
                          : "border-red-500 bg-gradient-to-r from-red-500/20 to-red-500/10"
                        : "border-green-400 bg-gradient-to-r from-green-400/20 to-green-400/10 shadow-lg shadow-green-500/20"
                      : submitted && option.id === question.correctAnswer
                      ? "border-green-500 bg-gradient-to-r from-green-500/20 to-green-500/10"
                      : "border-slate-700/50 bg-slate-800/30 hover:border-green-400/50 hover:bg-slate-700/50"
                  }
                  ${submitted ? "cursor-default" : "cursor-pointer"}
                `}
              >
                {/* Hover glow effect */}
                {!submitted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold text-sm
                      ${selectedAnswer === option.id
                        ? 'border-green-400 bg-green-400/20 text-green-400'
                        : 'border-slate-600 bg-slate-700/50 text-slate-400'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base font-medium">{option.text}</span>
                  </div>
                  {submitted && selectedAnswer === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className={`
                        p-2 rounded-full
                        ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                      `}
                    >
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <X className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                  )}
                  {submitted && !isCorrect && option.id === question.correctAnswer && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                      className="p-2 rounded-full bg-green-500"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case "true_false":
        return (
          <div className="grid grid-cols-2 gap-4">
            {["true", "false"].map((value, index) => (
              <motion.button
                key={value}
                onClick={() => {
                  if (!submitted) {
                    playSelect();
                    setSelectedAnswer(value);
                  }
                }}
                disabled={submitted}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={!submitted ? { scale: 1.05 } : {}}
                whileTap={!submitted ? { scale: 0.95 } : {}}
                className={`
                  relative p-8 rounded-2xl border-2 text-center transition-all font-bold text-xl overflow-hidden
                  ${
                    selectedAnswer === value
                      ? submitted
                        ? isCorrect
                          ? "border-green-500 bg-gradient-to-br from-green-500/30 to-green-500/10"
                          : "border-red-500 bg-gradient-to-br from-red-500/30 to-red-500/10"
                        : "border-green-400 bg-gradient-to-br from-green-400/30 to-green-400/10 shadow-xl shadow-green-500/30"
                      : submitted && value === question.correctAnswer
                      ? "border-green-500 bg-gradient-to-br from-green-500/30 to-green-500/10"
                      : "border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 hover:border-green-400/50 hover:from-slate-700/70 hover:to-slate-700/50"
                  }
                  ${submitted ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <div className="relative">
                  <div className={`text-6xl mb-2 ${value === "true" ? "text-green-400" : "text-red-400"}`}>
                    {value === "true" ? "✓" : "✕"}
                  </div>
                  <div className="capitalize text-lg">
                    {value}
                  </div>
                  {submitted && selectedAnswer === value && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className={`
                        p-2 rounded-full shadow-lg
                        ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                      `}>
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <X className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </motion.div>
                  )}
                  {submitted && !isCorrect && value === question.correctAnswer && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="p-2 rounded-full bg-green-500 shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case "fill_in_blank":
        return (
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Input
                type="text"
                value={selectedAnswer}
                onChange={(e) => !submitted && setSelectedAnswer(e.target.value)}
                disabled={submitted}
                placeholder="Type your answer here..."
                className={`
                  text-lg p-7 bg-slate-800/50 border-2 rounded-xl font-medium
                  ${
                    submitted
                      ? isCorrect
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                      : "border-slate-700 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  }
                `}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !submitted && selectedAnswer) {
                    handleSubmit();
                  }
                }}
              />
            </motion.div>
            <AnimatePresence>
              {submitted && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Correct answer:</p>
                      <p className="font-bold text-lg text-green-400">{question.correctAnswer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "image_selection":
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options?.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => {
                  if (!submitted) {
                    playSelect();
                    setSelectedAnswer(option.id);
                  }
                }}
                disabled={submitted}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={!submitted ? { scale: 1.05 } : {}}
                whileTap={!submitted ? { scale: 0.95 } : {}}
                className={`
                  relative aspect-square rounded-2xl border-4 overflow-hidden transition-all
                  ${
                    selectedAnswer === option.id
                      ? submitted
                        ? isCorrect
                          ? "border-green-500 shadow-xl shadow-green-500/50"
                          : "border-red-500 shadow-xl shadow-red-500/50"
                        : "border-green-400 shadow-xl shadow-green-400/50"
                      : submitted && option.id === question.correctAnswer
                      ? "border-green-500 shadow-xl shadow-green-500/50"
                      : "border-slate-700/50 hover:border-green-400/70 hover:shadow-lg hover:shadow-green-400/20"
                  }
                  ${submitted ? "cursor-default" : "cursor-pointer"}
                `}
              >
                {option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={option.text || "Option"}
                    className="w-full h-full object-cover"
                  />
                )}
                {submitted && selectedAnswer === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  >
                    <div className={`
                      p-4 rounded-full
                      ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                      {isCorrect ? (
                        <Check className="w-12 h-12 text-white" />
                      ) : (
                        <X className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-tight">
          {question.questionText}
        </h2>
      </motion.div>

      {/* Question Content */}
      {renderQuestionContent()}

      {/* Explanation */}
      <AnimatePresence>
        {submitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`
              p-6 rounded-xl border-2
              ${isCorrect
                ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30"
                : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30"
              }
            `}>
              <div className="flex items-start gap-3">
                <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isCorrect ? 'text-green-400' : 'text-blue-400'}`} />
                <div>
                  <p className="text-sm font-bold text-slate-300 mb-2">
                    {isCorrect ? "Well done!" : "Did you know?"}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">{question.explanation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-4"
      >
        {!submitted ? (
          <Button
            onClick={() => {
              playClick();
              handleSubmit();
            }}
            disabled={!selectedAnswer}
            className={`
              w-full py-7 text-lg font-bold relative overflow-hidden
              ${!selectedAnswer
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/30'
              }
            `}
            size="lg"
          >
            {selectedAnswer && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              Check Answer
              <Sparkles className="w-5 h-5" />
            </span>
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            className={`
              w-full py-7 text-lg font-bold relative overflow-hidden
              ${isCorrect
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/30"
                : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500"
              }
            `}
            size="lg"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative flex items-center justify-center gap-2">
              {isCorrect ? (
                <>
                  Continue <Check className="w-5 h-5" />
                </>
              ) : (
                <>
                  Try Again <X className="w-5 h-5" />
                </>
              )}
            </span>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
