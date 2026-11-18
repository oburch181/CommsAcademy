import React, { useState } from 'react';
import { ArrowRight, BookOpen, PenTool, CheckCircle2 } from 'lucide-react';
import { BOOKS } from '../data/curriculum';
import { BookCategory, ProgressState } from '../types/curriculum';
import { PWAInstallButton } from './PWAInstallButton';

interface BookOverviewProps {
  progress: ProgressState;
  onOpenModule: (moduleId: string, mode?: 'primer' | 'practice') => void;
}

const FILTERS: { id: BookCategory; label: string }[] = [
  { id: 'all', label: 'All Books' },
  { id: 'signals', label: 'Signals & Systems' },
  { id: 'information', label: 'Info & Coding' },
  { id: 'transmission', label: 'Modulation' },
];

export const BookOverview: React.FC<BookOverviewProps> = ({
  progress,
  onOpenModule,
}) => {
  const [filter, setFilter] = useState<BookCategory>('all');

  const filteredBooks =
    filter === 'all' ? BOOKS : BOOKS.filter((b) => b.category === filter);

  const totalQuestions = BOOKS.flatMap((b) => b.modules).reduce(
    (sum, m) => sum + m.steps.length + m.practice.length,
    0
  );
  const solvedTotal =
    progress.completedStepIds.length + progress.completedPracticeIds.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Editorial Hero Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-rule">
        <div className="lg:col-span-8 space-y-3">
          <p className="text-xs font-semibold tracking-wide text-ochre">
            LNTwww-Inspired Interactive Curriculum
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.12]">
            Communications, DSP &amp; Information Theory in Pocket Chunks
          </h1>
          <p className="text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
            Short two-to-three paragraph primers interrupted constantly by mental-math
            checkpoints, live signal plots, and a built-in math keypad—zero pen and
            paper needed.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-between">
          <div className="bg-vellum border border-rule rounded-2xl px-4 py-3.5 w-full sm:w-auto lg:w-full max-w-xs space-y-1">
            <div className="text-xs text-ink-muted">Your Progress</div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-2xl font-semibold text-ink tabular-nums">
                {solvedTotal} / {totalQuestions}
              </span>
              <span className="text-xs font-medium text-cobalt tabular-nums">
                {Math.round((solvedTotal / Math.max(1, totalQuestions)) * 100)}% solved
              </span>
            </div>
          </div>
          <PWAInstallButton />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink">
          Book Overview
        </h2>

        <div
          role="tablist"
          aria-label="Filter textbooks by subject"
          className="flex flex-wrap items-center gap-1 p-1 bg-papyrus-deep rounded-xl border border-rule/80"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-[40px] px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === f.id
                  ? 'bg-vellum text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredBooks.map((book) => {
          const totalModItems = book.modules.reduce(
            (s, m) => s + m.steps.length + m.practice.length,
            0
          );
          const solvedModItems = book.modules.reduce(
            (s, m) =>
              s +
              m.steps.filter((st) => progress.completedStepIds.includes(st.id))
                .length +
              m.practice.filter((pr) =>
                progress.completedPracticeIds.includes(pr.id)
              ).length,
            0
          );

          return (
            <article
              key={book.id}
              className="bg-vellum border border-rule rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-ink-muted">
                  <span>
                    {book.number} · {book.modules.length} chapters
                  </span>
                  <span className="font-mono tabular-nums">
                    {solvedModItems}/{totalModItems} done
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-ink">
                  {book.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                  {book.summary}
                </p>
              </div>

              {/* Chapters List separated cleanly by hairline rules */}
              <div className="divide-y divide-rule/80 border-t border-rule/80 pt-1">
                {book.modules.map((mod) => {
                  const modTotal = mod.steps.length + mod.practice.length;
                  const modDone =
                    mod.steps.filter((s) =>
                      progress.completedStepIds.includes(s.id)
                    ).length +
                    mod.practice.filter((p) =>
                      progress.completedPracticeIds.includes(p.id)
                    ).length;
                  const isComplete = modDone === modTotal;

                  return (
                    <div
                      key={mod.id}
                      className="py-3.5 first:pt-3 last:pb-0 flex flex-col gap-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-ochre tabular-nums">
                              {mod.number}
                            </span>
                            <span className="text-base font-semibold text-ink">
                              {mod.title}
                            </span>
                            {isComplete && (
                              <CheckCircle2
                                className="w-4 h-4 text-verdigris shrink-0"
                                aria-label="Chapter completed"
                              />
                            )}
                          </div>
                          <p className="text-xs text-ink-muted leading-snug">
                            {mod.readMinutes} min · {mod.steps.length} primer chunks ·{' '}
                            {mod.practice.length} practice problems
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => onOpenModule(mod.id, 'primer')}
                          className="min-h-[44px] px-4 rounded-xl bg-cobalt text-vellum text-xs font-semibold flex items-center gap-1.5 hover:bg-cobalt/90 active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read Primer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenModule(mod.id, 'practice')}
                          className="min-h-[44px] px-3.5 rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center gap-1.5 hover:bg-papyrus-deep active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <PenTool className="w-3.5 h-3.5 text-ink-muted" />
                          <span>Practice ({mod.practice.length})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
