import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ChevronRight } from "lucide-react";
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
  const { playSelect, playClick } = useSoundEffects();

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    playSelect();
  };

  const handleContinue = () => {
    onCorrectAnswer();
  };

  const renderQuestionContent = () => {
    switch (question.questionType) {
      case "multiple_choice":
        return (
          <div className="space-y-2.5">
            {question.options?.map((option, index) => {
              const isSelected = selectedAnswer === option.id;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => {
                    if (!submitted) {
                      playSelect();
                      setSelectedAnswer(option.id);
                    }
                  }}
                  disabled={submitted}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={!submitted ? { x: 2 } : {}}
                  whileTap={!submitted ? { scale: 0.98 } : {}}
                  className={`
                    relative w-full p-4 rounded-xl border-2 text-left transition-all
                    ${isSelected
                      ? "border-purple-400 bg-purple-400/10"
                      : "border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800/70"
                    }
                    ${submitted ? "cursor-default opacity-70" : "cursor-pointer"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-7 h-7 rounded-lg border-2 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0
                      ${isSelected
                        ? 'border-purple-400 bg-purple-400/20 text-purple-300'
                        : 'border-slate-600 bg-slate-700/50 text-slate-400'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-sm md:text-base font-medium text-slate-200">
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case "true_false":
        return (
          <div className="grid grid-cols-2 gap-3">
            {["true", "false"].map((value, index) => {
              const isSelected = selectedAnswer === value;

              return (
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
                  whileHover={!submitted ? { scale: 1.02 } : {}}
                  whileTap={!submitted ? { scale: 0.98 } : {}}
                  className={`
                    relative p-8 rounded-2xl border-2 text-center transition-all
                    ${isSelected
                      ? "border-purple-400 bg-purple-400/10"
                      : "border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800/70"
                    }
                    ${submitted ? "cursor-default opacity-70" : "cursor-pointer"}
                  `}
                >
                  <div className="relative">
                    <div className={`text-5xl md:text-6xl mb-3 ${
                      value === "true" ? "text-purple-400" : "text-slate-400"
                    }`}>
                      {value === "true" ? "✓" : "✕"}
                    </div>
                    <div className="capitalize text-base md:text-lg font-semibold text-slate-200">
                      {value}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case "fill_in_blank":
        return (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Input
                type="text"
                value={selectedAnswer}
                onChange={(e) => !submitted && setSelectedAnswer(e.target.value)}
                disabled={submitted}
                placeholder="Type your thoughts here..."
                className={`
                  text-lg p-6 bg-slate-800/50 border-2 rounded-xl font-medium
                  ${submitted
                    ? "border-purple-400/50 bg-purple-400/10 text-purple-300"
                    : "border-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  }
                `}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !submitted && selectedAnswer) {
                    handleSubmit();
                  }
                }}
              />
            </motion.div>
          </div>
        );

      case "image_selection":
        return (
          <div className="grid grid-cols-2 gap-3">
            {question.options?.map((option, index) => {
              const isSelected = selectedAnswer === option.id;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => {
                    if (!submitted) {
                      playSelect();
                      setSelectedAnswer(option.id);
                    }
                  }}
                  disabled={submitted}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={!submitted ? { scale: 1.02 } : {}}
                  whileTap={!submitted ? { scale: 0.98 } : {}}
                  className={`
                    relative aspect-square rounded-xl border-2 overflow-hidden transition-all
                    ${isSelected
                      ? "border-purple-400"
                      : "border-slate-700/50 hover:border-slate-600"
                    }
                    ${submitted ? "cursor-default opacity-70" : "cursor-pointer"}
                  `}
                >
                  {option.imageUrl && (
                    <img
                      src={option.imageUrl}
                      alt={option.text || "Option"}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Question Text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
          {question.questionText}
        </h2>
      </motion.div>

      {/* Question Content */}
      {renderQuestionContent()}

      {/* Explanation */}
      <AnimatePresence>
        {submitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 rounded-xl border-2 bg-purple-500/10 border-purple-500/20">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-400" />
                <div>
                  <p className="text-xs font-semibold text-purple-400 mb-1.5 uppercase tracking-wide">
                    Insight
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
      >
        {!submitted ? (
          <Button
            onClick={() => {
              playClick();
              handleSubmit();
            }}
            disabled={!selectedAnswer}
            className={`
              w-full py-5 text-base font-semibold transition-all
              ${!selectedAnswer
                ? 'bg-slate-700/50 cursor-not-allowed text-slate-500'
                : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/50'
              }
            `}
            size="lg"
          >
            <span className="flex items-center justify-center gap-2">
              Reflect
              <Sparkles className="w-4 h-4" />
            </span>
          </Button>
        ) : (
          <Button
            onClick={() => {
              playClick();
              handleContinue();
            }}
            className="w-full py-5 text-base font-semibold transition-all bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/50"
            size="lg"
          >
            <span className="flex items-center justify-center gap-2">
              Continue
              <ChevronRight className="w-4 h-4" />
            </span>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
