import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shuffle,
} from 'lucide-react';
import { BOOKS } from '../data/curriculum';
import {
  Book,
  BookCategory,
  Module,
  PracticeProblem,
  ProgressState,
} from '../types/curriculum';
import { QuestionCard } from './QuestionCard';

interface PracticeHubProps {
  progress: ProgressState;
  onStartPractice: (moduleId: string) => void;
  onMarkPracticeSolved: (practiceId: string) => void;
}

interface PoolItem {
  book: Book;
  module: Module;
  problem: PracticeProblem;
}

const TOPIC_FILTERS: { id: BookCategory; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'signals', label: 'Signals & Systems' },
  { id: 'information', label: 'Info & Coding' },
  { id: 'transmission', label: 'Modulation' },
];

export const PracticeHub: React.FC<PracticeHubProps> = ({
  progress,
  onStartPractice,
  onMarkPracticeSolved,
}) => {
  const [topicFilter, setTopicFilter] = useState<BookCategory>('all');
  const [randomActive, setRandomActive] = useState(false);
  const [currentItem, setCurrentItem] = useState<PoolItem | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionSolvedIds, setSessionSolvedIds] = useState<string[]>([]);

  const pool = useMemo<PoolItem[]>(() => {
    const books =
      topicFilter === 'all'
        ? BOOKS
        : BOOKS.filter((b) => b.category === topicFilter);
    return books.flatMap((book) =>
      book.modules.flatMap((module) =>
        module.practice.map((problem) => ({ book, module, problem }))
      )
    );
  }, [topicFilter]);

  const pickNextRandom = (resetSession = false) => {
    if (pool.length === 0) return;

    const currentId = currentItem?.problem.id;
    const baseSeen = resetSession ? [] : seenIds;
    let candidates = pool.filter((item) => !baseSeen.includes(item.problem.id));

    // If all problems in this filter were visited, cycle cleanly while avoiding immediate repeat
    if (candidates.length === 0) {
      candidates = pool.filter((item) => item.problem.id !== currentId);
      if (candidates.length === 0) candidates = pool;
      setSeenIds([]);
    }

    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    setCurrentItem(picked);
    setSeenIds((prev) =>
      resetSession ? [picked.problem.id] : [...prev, picked.problem.id]
    );
    setSessionCount((c) => (resetSession ? 1 : c + 1));
    if (resetSession) setSessionSolvedIds([]);
    setRandomActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomSolved = (questionId: string) => {
    if (!currentItem) return;
    onMarkPracticeSolved(currentItem.problem.id);
    setSessionSolvedIds((prev) =>
      prev.includes(questionId) ? prev : [...prev, questionId]
    );
  };

  if (randomActive && currentItem) {
    const { book, module, problem } = currentItem;
    const isSolved =
      progress.completedPracticeIds.includes(problem.id) ||
      sessionSolvedIds.includes(problem.question.id);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-12 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rule">
          <button
            type="button"
            onClick={() => setRandomActive(false)}
            className="min-h-[44px] pr-3 text-sm font-medium text-cobalt hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Practice Sets</span>
          </button>

          <div className="text-xs text-ink-muted tabular-nums font-mono">
            Question #{sessionCount} · {sessionSolvedIds.length} solved in drill
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <span className="font-medium text-ochre">{book.number}</span>
            <span aria-hidden="true">·</span>
            <span>
              {module.number} {module.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
            {problem.title}
          </h1>
        </div>

        <QuestionCard
          question={problem.question}
          isSolved={isSolved}
          onSolved={handleRandomSolved}
          headingLabel="Random Knowledge Mix"
        />

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onStartPractice(module.id)}
            className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-xs sm:text-sm font-semibold hover:bg-papyrus-deep cursor-pointer whitespace-nowrap"
          >
            Open Chapter {module.number}
          </button>

          <button
            type="button"
            onClick={() => pickNextRandom(false)}
            className="min-h-[44px] px-5 rounded-xl bg-cobalt text-vellum text-sm font-semibold flex items-center gap-2 hover:bg-cobalt/90 active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
          >
            <Shuffle className="w-4 h-4" />
            <span>Next Random Problem</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <div className="space-y-2 pb-6 border-b border-rule">
        <h1 className="text-3xl sm:text-4xl font-semibold text-ink">
          Practice Sets
        </h1>
        <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
          Drill problems by individual chapter or launch a randomized mix across
          topics to test general retention without pen and paper.
        </p>
      </div>

      {/* Primary Focal Card: Random Practice Mode */}
      <section className="bg-vellum border border-rule rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-ink">
              Random Knowledge Drill
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Draws unrepeated practice problems at random from{' '}
              <span className="font-mono tabular-nums text-ink font-medium">
                {pool.length}
              </span>{' '}
              curated problems across the selected track.
            </p>
          </div>

          <button
            type="button"
            onClick={() => pickNextRandom(true)}
            className="min-h-[48px] px-5 rounded-xl bg-cobalt text-vellum text-sm font-semibold flex items-center justify-center gap-2 hover:bg-cobalt/90 active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Start Random Practice</span>
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Filter random practice pool"
          className="flex flex-wrap items-center gap-1 p-1 bg-papyrus-deep rounded-xl border border-rule/80 w-fit"
        >
          {TOPIC_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={topicFilter === f.id}
              onClick={() => setTopicFilter(f.id)}
              className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                topicFilter === f.id
                  ? 'bg-vellum text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Chapter-by-Chapter Practice Sets */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-ink">By Chapter</h2>
        <div className="divide-y divide-rule bg-vellum border border-rule rounded-2xl overflow-hidden">
          {BOOKS.flatMap((book) =>
            book.modules.map((mod) => {
              const solvedCount = mod.practice.filter((p) =>
                progress.completedPracticeIds.includes(p.id)
              ).length;
              const totalCount = mod.practice.length;
              const isComplete = solvedCount === totalCount;

              return (
                <div
                  key={mod.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                      <span className="font-medium text-ochre">{book.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{book.title}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {solvedCount}/{totalCount} solved
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-ink">
                        {mod.number} {mod.title}
                      </h3>
                      {isComplete && (
                        <CheckCircle2 className="w-4 h-4 text-verdigris shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-ink-muted">{mod.subtitle}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartPractice(mod.id)}
                    className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-sm font-semibold flex items-center justify-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>
                      {solvedCount > 0 ? 'Continue Set' : 'Open Set'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
