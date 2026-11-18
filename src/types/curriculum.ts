export type BookCategory = 'all' | 'signals' | 'information' | 'transmission';

export type SimulationType =
  | 'fourier-harmonics'
  | 'nyquist-sampling'
  | 'lti-filter'
  | 'convolution-overlap'
  | 'shannon-entropy'
  | 'channel-capacity'
  | 'constellation-awgn'
  | 'gaussian-pdf'
  | 'hamming-cube'
  | 'modulation-waves'
  | 'hamming-syndrome';

export type KeypadPreset = 'numeric' | 'frequency' | 'entropy' | 'modulation';

export interface McqQuestion {
  id: string;
  kind: 'mcq';
  prompt: string;
  options: {
    id: string;
    label: string;
    detail?: string;
  }[];
  correctOptionId: string;
  hint: string;
  explanation: string;
}

export interface KeypadQuestion {
  id: string;
  kind: 'keypad';
  prompt: string;
  placeholder: string;
  unitLabel?: string;
  preset: KeypadPreset;
  acceptedAnswers: string[];
  displayAnswer: string;
  hint: string;
  explanation: string;
}

export interface SliderTargetQuestion {
  id: string;
  kind: 'slider-target';
  prompt: string;
  simulation: SimulationType;
  parameterLabel: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  targetMin: number;
  targetMax: number;
  targetDescription: string;
  hint: string;
  explanation: string;
}

export type Question = McqQuestion | KeypadQuestion | SliderTargetQuestion;

export interface FormulaBlock {
  expression: string;
  caption: string;
}

export interface LessonStep {
  id: string;
  title: string;
  paragraphs: string[];
  formula?: FormulaBlock;
  simulation?: SimulationType;
  question: Question;
}

export interface PracticeProblem {
  id: string;
  title: string;
  question: Question;
}

export interface Module {
  id: string;
  bookId: string;
  number: string;
  title: string;
  subtitle: string;
  readMinutes: number;
  steps: LessonStep[];
  practice: PracticeProblem[];
}

export interface Book {
  id: string;
  number: string;
  title: string;
  lntRef: string;
  category: Exclude<BookCategory, 'all'>;
  summary: string;
  modules: Module[];
}

export interface ProgressState {
  completedStepIds: string[];
  completedPracticeIds: string[];
  lastModuleId: string;
  lastStepIndex: number;
}
