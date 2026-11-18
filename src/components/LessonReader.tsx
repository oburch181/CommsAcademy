import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, PenTool } from 'lucide-react';
import { Book, Module, ProgressState } from '../types/curriculum';
import { QuestionCard } from './QuestionCard';
import { SimulationStage } from './Simulations';

interface LessonReaderProps {
  book: Book;
  module: Module;
  initialMode?: 'primer' | 'practice';
  initialStepIndex?: number;
  progress: ProgressState;
  onMarkStepSolved: (stepId: string) => void;
  onMarkPracticeSolved: (practiceId: string) => void;
  onUpdateLastPosition: (moduleId: string, stepIndex: number) => void;
  onBackToOverview: () => void;
  onNextModule: (() => void) | null;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  book,
  module,
  initialMode = 'primer',
  initialStepIndex = 0,
  progress,
  onMarkStepSolved,
  onMarkPracticeSolved,
  onUpdateLastPosition,
  onBackToOverview,
  onNextModule,
}) => {
  const [mode, setMode] = useState<'primer' | 'practice'>(initialMode);
  const [stepIdx, setStepIdx] = useState(
    Math.min(initialStepIndex, Math.max(0, module.steps.length - 1))
  );
  const [practiceIdx, setPracticeIdx] = useState(0);

  useEffect(() => {
    setMode(initialMode);
    setStepIdx(Math.min(initialStepIndex, Math.max(0, module.steps.length - 1)));
    setPracticeIdx(0);
  }, [module.id, initialMode, initialStepIndex, module.steps.length]);

  useEffect(() => {
    onUpdateLastPosition(module.id, stepIdx);
  }, [module.id, stepIdx, onUpdateLastPosition]);

  const currentStep = module.steps[stepIdx];
  const currentPractice = module.practice[practiceIdx];

  const totalItems = module.steps.length + module.practice.length;
  const currentAbsoluteIdx =
    mode === 'primer' ? stepIdx + 1 : module.steps.length + practiceIdx + 1;
  const progressPct = Math.round((currentAbsoluteIdx / totalItems) * 100);

  const solvedStepsInMod = module.steps.filter((s) =>
    progress.completedStepIds.includes(s.id)
  ).length;
  const solvedPracticeInMod = module.practice.filter((p) =>
    progress.completedPracticeIds.includes(p.id)
  ).length;

  const goPrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mode === 'practice') {
      if (practiceIdx > 0) {
        setPracticeIdx((i) => i - 1);
      } else {
        setMode('primer');
        setStepIdx(module.steps.length - 1);
      }
    } else if (stepIdx > 0) {
      setStepIdx((i) => i - 1);
    }
  };

  const goNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mode === 'primer') {
      if (stepIdx < module.steps.length - 1) {
        setStepIdx((i) => i + 1);
      } else {
        setMode('practice');
        setPracticeIdx(0);
      }
    } else if (practiceIdx < module.practice.length - 1) {
      setPracticeIdx((i) => i + 1);
    } else if (onNextModule) {
      onNextModule();
    } else {
      onBackToOverview();
    }
  };

  const isAtVeryStart = mode === 'primer' && stepIdx === 0;
  const isAtVeryEnd =
    mode === 'practice' && practiceIdx === module.practice.length - 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-28 sm:pb-12 pt-4 sm:pt-6 space-y-5">
      {/* Compact Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rule">
        <button
          type="button"
          onClick={onBackToOverview}
          className="min-h-[44px] pr-3 text-sm font-medium text-cobalt hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Book Overview</span>
        </button>

        <div className="flex items-center gap-1 p-1 bg-papyrus-deep rounded-xl border border-rule/80">
          <button
            type="button"
            onClick={() => setMode('primer')}
            className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              mode === 'primer'
                ? 'bg-vellum text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Primer ({solvedStepsInMod}/{module.steps.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('practice')}
            className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              mode === 'practice'
                ? 'bg-vellum text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Practice ({solvedPracticeInMod}/{module.practice.length})</span>
          </button>
        </div>
      </div>

      {/* Chapter Title + Clean Metadata + Progress Rail */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="font-medium text-ochre">{book.number}</span>
          <span aria-hidden="true">·</span>
          <span>{book.title}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {mode === 'primer'
              ? `Chunk ${stepIdx + 1} of ${module.steps.length}`
              : `Practice ${practiceIdx + 1} of ${module.practice.length}`}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
          {module.number} {module.title}
        </h1>

        <div className="w-full h-1.5 bg-papyrus-deep rounded-full overflow-hidden">
          <div
            className="h-full bg-cobalt transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* PRIMER MODE: Single Focused Chunk (2-3 Short Paragraphs + Immediate Question) */}
      {mode === 'primer' && currentStep && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Short Readable Primer + Optional Formula + Optional Simulation */}
          <div className="lg:col-span-6 space-y-5">
            <article className="space-y-4">
              <h2 className="text-xl font-semibold text-ink">
                {currentStep.title}
              </h2>

              <div className="space-y-4 text-[17px] sm:text-[18px] leading-[1.68] text-ink">
                {currentStep.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {currentStep.formula && (
                <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-1.5">
                  <div className="font-mono text-base sm:text-lg font-semibold text-cobalt overflow-x-auto">
                    {currentStep.formula.expression}
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {currentStep.formula.caption}
                  </p>
                </div>
              )}
            </article>

            {currentStep.simulation &&
              currentStep.question.kind !== 'slider-target' && (
                <SimulationStage type={currentStep.simulation} />
              )}
          </div>

          {/* Right Column: Interactive Checkpoint Question */}
          <div className="lg:col-span-6">
            <QuestionCard
              question={currentStep.question}
              isSolved={progress.completedStepIds.includes(currentStep.id)}
              onSolved={() => onMarkStepSolved(currentStep.id)}
              headingLabel={`Checkpoint ${stepIdx + 1} of ${module.steps.length}`}
            />
          </div>
        </div>
      )}

      {/* PRACTICE MODE: End-of-Section Problems */}
      {mode === 'practice' && currentPractice && (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Step selector row for quick jump between practice problems */}
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h2 className="text-xl font-semibold text-ink">
                {currentPractice.title}
              </h2>
              <p className="text-xs text-ink-muted">
                Section {module.number} Practice Set · Mental math &amp; keypad friendly
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {module.practice.map((prob, idx) => {
                const done = progress.completedPracticeIds.includes(prob.id);
                const active = idx === practiceIdx;
                return (
                  <button
                    key={prob.id}
                    type="button"
                    onClick={() => setPracticeIdx(idx)}
                    aria-label={`Practice problem ${idx + 1}`}
                    className={`min-w-[40px] min-h-[40px] rounded-xl font-mono text-xs font-semibold border flex items-center justify-center gap-1 cursor-pointer ${
                      active
                        ? 'bg-cobalt text-vellum border-cobalt'
                        : done
                        ? 'bg-verdigris-soft text-verdigris border-verdigris/40'
                        : 'bg-vellum text-ink-muted border-rule hover:text-ink'
                    }`}
                  >
                    {done && !active ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <QuestionCard
            question={currentPractice.question}
            isSolved={progress.completedPracticeIds.includes(currentPractice.id)}
            onSolved={() => onMarkPracticeSolved(currentPractice.id)}
            headingLabel={`Practice Problem ${practiceIdx + 1} of ${module.practice.length}`}
          />
        </div>
      )}

      {/* Desktop Inline Navigation Bar */}
      <div className="hidden sm:flex items-center justify-between pt-4 border-t border-rule">
        <button
          type="button"
          disabled={isAtVeryStart}
          onClick={goPrev}
          className="min-h-[44px] px-4 rounded-xl border border-rule bg-vellum text-sm font-semibold text-ink flex items-center gap-2 hover:bg-papyrus-deep disabled:opacity-40 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-xs text-ink-muted tabular-nums">
          {mode === 'primer'
            ? stepIdx === module.steps.length - 1
              ? 'Next: End-of-Section Practice Set'
              : `Step ${stepIdx + 1} of ${module.steps.length}`
            : `Practice ${practiceIdx + 1} of ${module.practice.length}`}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="min-h-[44px] px-5 rounded-xl bg-cobalt text-vellum text-sm font-semibold flex items-center gap-2 hover:bg-cobalt/90 cursor-pointer"
        >
          <span>
            {mode === 'primer' && stepIdx === module.steps.length - 1
              ? 'Start Practice Set'
              : isAtVeryEnd
              ? onNextModule
                ? 'Next Chapter'
                : 'Finish Book'
              : 'Continue'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Ergonomic Bottom Thumb Bar (Fixed <= 64px, compact for 15% cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-papyrus/95 backdrop-blur-md border-t border-rule px-4 py-2.5">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button
            type="button"
            disabled={isAtVeryStart}
            onClick={goPrev}
            aria-label="Previous step"
            className="min-h-[44px] min-w-[44px] px-3.5 rounded-xl border border-rule bg-vellum text-sm font-semibold text-ink flex items-center justify-center gap-1.5 disabled:opacity-40 active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex-1 min-h-[44px] px-4 rounded-xl bg-cobalt text-vellum text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span>
              {mode === 'primer' && stepIdx === module.steps.length - 1
                ? 'Practice Set'
                : isAtVeryEnd
                ? onNextModule
                  ? 'Next Chapter'
                  : 'Overview'
                : 'Continue'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
