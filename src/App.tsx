import { useState, useEffect, useCallback } from 'react';
import { BookOpen, PenTool, Activity, Calculator } from 'lucide-react';
import { ProgressState } from './types/curriculum';
import { findModuleById, getAllModules } from './data/curriculum';
import { BookOverview } from './components/BookOverview';
import { LessonReader } from './components/LessonReader';
import { PracticeHub } from './components/PracticeHub';
import { SimulationsLab } from './components/SimulationsLab';
import { KeypadLab } from './components/KeypadLab';
import { OfflineIndicator } from './components/OfflineIndicator';

type ViewState =
  | { kind: 'overview' }
  | { kind: 'practice-hub' }
  | { kind: 'simulations' }
  | { kind: 'keypad-lab' }
  | {
      kind: 'reader';
      moduleId: string;
      mode: 'primer' | 'practice';
      stepIndex: number;
    };

const STORAGE_KEY = 'signum_progress_v1';

const DEFAULT_PROGRESS: ProgressState = {
  completedStepIds: [],
  completedPracticeIds: [],
  lastModuleId: 'mod-1-1',
  lastStepIndex: 0,
};

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedStepIds: Array.isArray(parsed.completedStepIds)
        ? parsed.completedStepIds
        : [],
      completedPracticeIds: Array.isArray(parsed.completedPracticeIds)
        ? parsed.completedPracticeIds
        : [],
      lastModuleId:
        typeof parsed.lastModuleId === 'string'
          ? parsed.lastModuleId
          : 'mod-1-1',
      lastStepIndex:
        typeof parsed.lastStepIndex === 'number' ? parsed.lastStepIndex : 0,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);
  const [view, setView] = useState<ViewState>({ kind: 'overview' });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleMarkStepSolved = useCallback((stepId: string) => {
    setProgress((prev) =>
      prev.completedStepIds.includes(stepId)
        ? prev
        : { ...prev, completedStepIds: [...prev.completedStepIds, stepId] }
    );
  }, []);

  const handleMarkPracticeSolved = useCallback((practiceId: string) => {
    setProgress((prev) =>
      prev.completedPracticeIds.includes(practiceId)
        ? prev
        : {
            ...prev,
            completedPracticeIds: [...prev.completedPracticeIds, practiceId],
          }
    );
  }, []);

  const handleUpdateLastPosition = useCallback(
    (moduleId: string, stepIndex: number) => {
      setProgress((prev) => {
        if (prev.lastModuleId === moduleId && prev.lastStepIndex === stepIndex) {
          return prev;
        }
        return { ...prev, lastModuleId: moduleId, lastStepIndex: stepIndex };
      });
    },
    []
  );

  const openModule = (
    moduleId: string,
    mode: 'primer' | 'practice' = 'primer',
    stepIndex = 0
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView({ kind: 'reader', moduleId, mode, stepIndex });
  };

  const handleResume = () => {
    const targetId = findModuleById(progress.lastModuleId)
      ? progress.lastModuleId
      : 'mod-1-1';
    openModule(targetId, 'primer', progress.lastStepIndex);
  };

  const allMods = getAllModules();
  const activeReaderData =
    view.kind === 'reader' ? findModuleById(view.moduleId) : null;

  const nextModuleHandler = (() => {
    if (view.kind !== 'reader') return null;
    const idx = allMods.findIndex((item) => item.module.id === view.moduleId);
    if (idx >= 0 && idx < allMods.length - 1) {
      const nextMod = allMods[idx + 1].module;
      return () => openModule(nextMod.id, 'primer', 0);
    }
    return null;
  })();

  const navigateTop = (next: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(next);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-papyrus text-ink">
      {/* Three-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 h-13 sm:h-15 bg-papyrus/95 backdrop-blur-md border-b border-rule px-4 sm:px-6">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateTop({ kind: 'overview' })}
            className="font-display text-xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 cursor-pointer"
          >
            SigNum
          </button>

          {/* Zone 2: Four concise single-line text links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'overview' })}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                view.kind === 'overview'
                  ? 'text-cobalt underline underline-offset-4 decoration-2'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'practice-hub' })}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                view.kind === 'practice-hub'
                  ? 'text-cobalt underline underline-offset-4 decoration-2'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Practice Sets
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'simulations' })}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                view.kind === 'simulations'
                  ? 'text-cobalt underline underline-offset-4 decoration-2'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Signal Lab
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'keypad-lab' })}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                view.kind === 'keypad-lab'
                  ? 'text-cobalt underline underline-offset-4 decoration-2'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Math Keypad
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleResume}
              className="min-h-[38px] sm:min-h-[40px] px-4 rounded-xl bg-cobalt text-vellum text-xs sm:text-sm font-semibold hover:bg-cobalt/90 active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
            >
              Continue Reading
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 ${view.kind !== 'reader' ? 'pb-20 md:pb-12' : ''}`}>
        {view.kind === 'overview' && (
          <BookOverview
            progress={progress}
            onOpenModule={(id, mode) => openModule(id, mode, 0)}
          />
        )}

        {view.kind === 'practice-hub' && (
          <PracticeHub
            progress={progress}
            onStartPractice={(id) => openModule(id, 'practice', 0)}
            onMarkPracticeSolved={handleMarkPracticeSolved}
          />
        )}

        {view.kind === 'simulations' && <SimulationsLab />}

        {view.kind === 'keypad-lab' && <KeypadLab />}

        {view.kind === 'reader' && activeReaderData && (
          <LessonReader
            book={activeReaderData.book}
            module={activeReaderData.module}
            initialMode={view.mode}
            initialStepIndex={view.stepIndex}
            progress={progress}
            onMarkStepSolved={handleMarkStepSolved}
            onMarkPracticeSolved={handleMarkPracticeSolved}
            onUpdateLastPosition={handleUpdateLastPosition}
            onBackToOverview={() => navigateTop({ kind: 'overview' })}
            onNextModule={nextModuleHandler}
          />
        )}
      </main>

      {/* Desktop Footer */}
      {view.kind !== 'reader' && (
        <footer className="hidden md:block border-t border-rule px-6 py-6 text-xs text-ink-muted">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <span>
              SigNum · Curriculum structure inspired by LNTwww (TUM Institute for
              Communications Engineering)
            </span>
            <span>Mobile-first pocket reader · No pen &amp; paper required</span>
          </div>
        </footer>
      )}

      {/* Mobile Fixed Bottom Navigation (shown outside LessonReader so sticky bars never stack) */}
      {view.kind !== 'reader' && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-papyrus/95 backdrop-blur-md border-t border-rule h-14 px-2"
        >
          <div className="grid grid-cols-4 h-full items-center">
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'overview' })}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                view.kind === 'overview' ? 'text-cobalt' : 'text-ink-muted'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[11px] font-medium whitespace-nowrap">
                Books
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'practice-hub' })}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                view.kind === 'practice-hub' ? 'text-cobalt' : 'text-ink-muted'
              }`}
            >
              <PenTool className="w-5 h-5" />
              <span className="text-[11px] font-medium whitespace-nowrap">
                Practice
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'simulations' })}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                view.kind === 'simulations' ? 'text-cobalt' : 'text-ink-muted'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="text-[11px] font-medium whitespace-nowrap">
                Signals
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigateTop({ kind: 'keypad-lab' })}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                view.kind === 'keypad-lab' ? 'text-cobalt' : 'text-ink-muted'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="text-[11px] font-medium whitespace-nowrap">
                Keypad
              </span>
            </button>
          </div>
        </nav>
      )}
      <OfflineIndicator />
    </div>
  );
}
