import React, { useState } from 'react';
import { KeypadPreset, Question } from '../types/curriculum';
import { QuestionCard } from './QuestionCard';

const WARMUP_QUESTIONS: Record<KeypadPreset, Question> = {
  frequency: {
    id: 'lab-freq',
    kind: 'keypad',
    prompt:
      'Practice entering a symbolic Nyquist expression: write 2*f_max using the custom Frequency keys below.',
    placeholder: 'Tap 2 · f_max',
    preset: 'frequency',
    acceptedAnswers: ['2*f_max', '2f_max', '2fmax', '2*fmax'],
    displayAnswer: '2·f_max',
    hint: 'Tap 2, then · (multiply), then f_max.',
    explanation: 'Both 2·f_max and 2f_max are accepted automatically.',
  },
  entropy: {
    id: 'lab-entropy',
    kind: 'keypad',
    prompt:
      'How many bits of entropy does an equally likely 32-symbol alphabet carry? (Enter 5 or log₂(32))',
    placeholder: 'Tap 5 or log₂(32)',
    unitLabel: 'bits',
    preset: 'entropy',
    acceptedAnswers: ['5', 'log2(32)'],
    displayAnswer: '5 bits',
    hint: 'Use either the digits or the log₂( key!',
    explanation: 'The keypad normalizes both exact integers and symbolic log₂(32) expressions.',
  },
  modulation: {
    id: 'lab-mod',
    kind: 'keypad',
    prompt:
      'For 16-QAM, how many bits are packed into each constellation symbol?',
    placeholder: 'Enter bits/symbol',
    unitLabel: 'bits/sym',
    preset: 'modulation',
    acceptedAnswers: ['4', 'log2(16)'],
    displayAnswer: '4 bits/sym',
    hint: '2⁴ = 16.',
    explanation: 'Each 16-QAM symbol conveys log₂(16) = 4 bits.',
  },
  numeric: {
    id: 'lab-num',
    kind: 'keypad',
    prompt:
      'Enter one-half either as a fraction (1/2) or a decimal (0.5). Both are accepted.',
    placeholder: 'Tap 1/2 or 0.5',
    preset: 'numeric',
    acceptedAnswers: ['1/2', '0.5'],
    displayAnswer: '0.5 (or 1/2)',
    hint: 'Tap 1, /, 2 then Check Answer.',
    explanation: 'Numeric equivalence automatically recognizes fractions and decimals.',
  },
};

export const KeypadLab: React.FC = () => {
  const [preset, setPreset] = useState<KeypadPreset>('frequency');
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const activeQuestion = WARMUP_QUESTIONS[preset];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="space-y-2 pb-6 border-b border-rule">
        <h1 className="text-3xl sm:text-4xl font-semibold text-ink">
          Custom Math Keypad
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Typing symbols like <span className="font-mono text-ink">f_max</span>,{' '}
          <span className="font-mono text-ink">log₂(</span>,{' '}
          <span className="font-mono text-ink">π</span>, and fractions on a standard
          phone keyboard is frustrating. Try each domain preset here—no native OS
          keyboard ever pops up.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1 p-1 bg-papyrus-deep rounded-xl border border-rule/80 w-fit">
        {(
          [
            { id: 'frequency', label: 'Frequency' },
            { id: 'entropy', label: 'Entropy' },
            { id: 'modulation', label: 'Modulation' },
            { id: 'numeric', label: 'Fractions' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPreset(tab.id)}
            className={`min-h-[40px] px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              preset === tab.id
                ? 'bg-vellum text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <QuestionCard
        question={activeQuestion}
        isSolved={solvedIds.includes(activeQuestion.id)}
        onSolved={(id) => setSolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))}
        headingLabel="Keypad Warm-Up"
      />
    </div>
  );
};
