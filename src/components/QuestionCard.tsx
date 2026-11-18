import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { Question } from '../types/curriculum';
import { MathKeypad } from './MathKeypad';
import { SimulationStage } from './Simulations';
import { isKeypadAnswerCorrect } from '../utils/mathEval';

interface QuestionCardProps {
  question: Question;
  isSolved: boolean;
  onSolved: (questionId: string) => void;
  headingLabel?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSolved,
  onSolved,
  headingLabel = 'Quick Check',
}) => {
  const [selectedMcq, setSelectedMcq] = useState<string | null>(null);
  const [keypadValue, setKeypadValue] = useState('');
  const [sliderValue, setSliderValue] = useState<number>(
    question.kind === 'slider-target' ? question.initialValue : 0
  );
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(
    isSolved ? 'correct' : 'idle'
  );
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setSelectedMcq(null);
    setKeypadValue('');
    setSliderValue(question.kind === 'slider-target' ? question.initialValue : 0);
    setStatus(isSolved ? 'correct' : 'idle');
    setShowHint(false);
  }, [question.id, isSolved, question]);

  const handleMcqSelect = (optionId: string) => {
    setSelectedMcq(optionId);
    if (question.kind !== 'mcq') return;
    if (optionId === question.correctOptionId) {
      setStatus('correct');
      onSolved(question.id);
    } else {
      setStatus('incorrect');
    }
  };

  const handleKeypadSubmit = () => {
    if (question.kind !== 'keypad') return;
    if (isKeypadAnswerCorrect(keypadValue, question.acceptedAnswers)) {
      setStatus('correct');
      onSolved(question.id);
    } else {
      setStatus('incorrect');
    }
  };

  const handleSliderVerify = () => {
    if (question.kind !== 'slider-target') return;
    const inRange =
      sliderValue >= question.targetMin - 1e-6 &&
      sliderValue <= question.targetMax + 1e-6;
    if (inRange) {
      setStatus('correct');
      onSolved(question.id);
    } else {
      setStatus('incorrect');
    }
  };

  const handleReset = () => {
    setSelectedMcq(null);
    setKeypadValue('');
    if (question.kind === 'slider-target') {
      setSliderValue(question.initialValue);
    }
    setStatus('idle');
  };

  return (
    <section
      aria-label={headingLabel}
      className="bg-vellum border border-rule rounded-2xl p-4 sm:p-5 space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-wide text-cobalt">
          {headingLabel}
        </span>

        <div className="flex items-center gap-3">
          {status !== 'correct' && (
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="min-h-[36px] px-2 text-xs font-medium text-ink-muted hover:text-ink flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-ochre" />
              <span>{showHint ? 'Hide hint' : 'Hint'}</span>
            </button>
          )}
          {status !== 'idle' && (
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[36px] px-2 text-xs font-medium text-ink-muted hover:text-ink flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <p className="text-base sm:text-[17px] font-medium text-ink leading-relaxed">
        {question.prompt}
      </p>

      {showHint && status !== 'correct' && (
        <div className="px-3.5 py-2.5 rounded-xl bg-papyrus border border-rule text-sm text-ink-muted leading-relaxed">
          <span className="font-semibold text-ochre">Hint: </span>
          {question.hint}
        </div>
      )}

      {/* Multiple Choice Question */}
      {question.kind === 'mcq' && (
        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isPicked = selectedMcq === opt.id;
            const isCorrectOpt = opt.id === question.correctOptionId;

            let optionStyle =
              'bg-papyrus/65 border-rule text-ink hover:bg-papyrus-deep/70';
            if (status === 'correct' && isCorrectOpt) {
              optionStyle = 'bg-verdigris-soft border-verdigris text-ink';
            } else if (status === 'incorrect' && isPicked) {
              optionStyle = 'bg-vermilion-soft border-vermilion text-ink';
            } else if (isPicked) {
              optionStyle = 'bg-cobalt-soft border-cobalt text-ink';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleMcqSelect(opt.id)}
                className={`w-full min-h-[50px] text-left px-3.5 py-3 rounded-xl border transition-colors duration-150 flex items-start gap-3 cursor-pointer ${optionStyle}`}
              >
                <span className="font-mono text-xs font-semibold w-6 h-6 rounded-md bg-vellum border border-rule flex items-center justify-center shrink-0 mt-0.5 text-ink-muted">
                  {letter}
                </span>
                <span className="flex-1 space-y-0.5">
                  <span className="block text-[15px] font-medium leading-snug">
                    {opt.label}
                  </span>
                  {opt.detail && (
                    <span className="block text-xs text-ink-muted leading-snug">
                      {opt.detail}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Math Keypad Question */}
      {question.kind === 'keypad' && (
        <MathKeypad
          value={keypadValue}
          onChange={(val) => {
            setKeypadValue(val);
            if (status === 'incorrect') setStatus('idle');
          }}
          onSubmit={handleKeypadSubmit}
          preset={question.preset}
          placeholder={question.placeholder}
          unitLabel={question.unitLabel}
          disabled={status === 'correct'}
        />
      )}

      {/* Interactive Simulation Parameter Target Question */}
      {question.kind === 'slider-target' && (
        <div className="space-y-3">
          <SimulationStage
            type={question.simulation}
            controlledValue={sliderValue}
            onControlledChange={setSliderValue}
            hideInternalSlider={true}
          />
          <div className="bg-papyrus/70 border border-rule rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={`q-slider-${question.id}`} className="font-medium text-ink">
                {question.parameterLabel}
              </label>
              <span className="font-mono font-semibold text-cobalt tabular-nums">
                {sliderValue} {question.unit}
              </span>
            </div>
            <input
              id={`q-slider-${question.id}`}
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={sliderValue}
              onChange={(e) => {
                setSliderValue(Number(e.target.value));
                if (status === 'incorrect') setStatus('idle');
              }}
              className="w-full papyrus-slider"
            />
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-ink-muted">
                Goal: {question.targetDescription}
              </span>
              <button
                type="button"
                onClick={handleSliderVerify}
                className="min-h-[44px] px-4 rounded-xl bg-cobalt text-vellum text-sm font-semibold hover:bg-cobalt/90 active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
              >
                Check Setting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explicit Status + Explanation Feedback (Icon + Text, never color alone) */}
      {status === 'correct' && (
        <div
          role="status"
          className="rounded-xl bg-verdigris-soft border border-verdigris/40 p-3.5 space-y-1.5"
        >
          <div className="flex items-center gap-2 text-verdigris font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Correct
              {question.kind === 'keypad' ? ` · ${question.displayAnswer}` : ''}
            </span>
          </div>
          <p className="text-sm text-ink leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {status === 'incorrect' && (
        <div
          role="status"
          className="rounded-xl bg-vermilion-soft border border-vermilion/40 p-3.5 flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
          <div className="text-sm text-ink leading-relaxed">
            <span className="font-semibold text-vermilion">Not quite. </span>
            {question.kind === 'keypad'
              ? 'Check your units or expression with the keypad, or tap Hint.'
              : question.kind === 'slider-target'
              ? 'Adjust the slider and watch the live curve respond, then try again.'
              : 'Give another option a tap, or use the Hint for intuition.'}
          </div>
        </div>
      )}
    </section>
  );
};
