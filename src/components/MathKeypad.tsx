import React, { useState } from 'react';
import { Delete, RotateCcw, CornerDownLeft } from 'lucide-react';
import { KeypadPreset } from '../types/curriculum';

interface KeyDef {
  label: string;
  insert: string;
  ariaLabel?: string;
  emphasis?: 'symbol' | 'operator' | 'digit';
}

const DIGIT_KEYS: KeyDef[] = [
  { label: '7', insert: '7', emphasis: 'digit' },
  { label: '8', insert: '8', emphasis: 'digit' },
  { label: '9', insert: '9', emphasis: 'digit' },
  { label: '/', insert: '/', emphasis: 'operator', ariaLabel: 'divide' },
  { label: '4', insert: '4', emphasis: 'digit' },
  { label: '5', insert: '5', emphasis: 'digit' },
  { label: '6', insert: '6', emphasis: 'digit' },
  { label: '·', insert: '*', emphasis: 'operator', ariaLabel: 'multiply' },
  { label: '1', insert: '1', emphasis: 'digit' },
  { label: '2', insert: '2', emphasis: 'digit' },
  { label: '3', insert: '3', emphasis: 'digit' },
  { label: '−', insert: '-', emphasis: 'operator', ariaLabel: 'minus' },
  { label: '0', insert: '0', emphasis: 'digit' },
  { label: '.', insert: '.', emphasis: 'digit' },
  { label: '^', insert: '^', emphasis: 'operator', ariaLabel: 'power' },
  { label: '+', insert: '+', emphasis: 'operator', ariaLabel: 'plus' },
];

const PRESET_SYMBOLS: Record<KeypadPreset, KeyDef[]> = {
  numeric: [
    { label: '(', insert: '(', emphasis: 'operator' },
    { label: ')', insert: ')', emphasis: 'operator' },
    { label: 'π', insert: 'π', emphasis: 'symbol' },
    { label: '√', insert: '√(', emphasis: 'symbol', ariaLabel: 'square root' },
    { label: 'log₂', insert: 'log₂(', emphasis: 'symbol', ariaLabel: 'log base 2' },
    { label: '∞', insert: '∞', emphasis: 'symbol' },
  ],
  frequency: [
    { label: 'f', insert: 'f', emphasis: 'symbol' },
    { label: 'f₀', insert: 'f₀', emphasis: 'symbol' },
    { label: 'f_max', insert: 'f_max', emphasis: 'symbol' },
    { label: 'T', insert: 'T', emphasis: 'symbol' },
    { label: 'π', insert: 'π', emphasis: 'symbol' },
    { label: '(', insert: '(', emphasis: 'operator' },
    { label: ')', insert: ')', emphasis: 'operator' },
    { label: '√', insert: '√(', emphasis: 'symbol' },
  ],
  entropy: [
    { label: 'log₂', insert: 'log₂(', emphasis: 'symbol' },
    { label: 'p', insert: 'p', emphasis: 'symbol' },
    { label: 'N', insert: 'N', emphasis: 'symbol' },
    { label: 'B', insert: 'B', emphasis: 'symbol' },
    { label: 'H', insert: 'H', emphasis: 'symbol' },
    { label: '(', insert: '(', emphasis: 'operator' },
    { label: ')', insert: ')', emphasis: 'operator' },
    { label: 'bits', insert: 'bits', emphasis: 'symbol' },
  ],
  modulation: [
    { label: 'M', insert: 'M', emphasis: 'symbol' },
    { label: 'log₂', insert: 'log₂(', emphasis: 'symbol' },
    { label: 'dB', insert: 'dB', emphasis: 'symbol' },
    { label: 'SNR', insert: 'SNR', emphasis: 'symbol' },
    { label: 'π', insert: 'π', emphasis: 'symbol' },
    { label: '√', insert: '√(', emphasis: 'symbol' },
    { label: '(', insert: '(', emphasis: 'operator' },
    { label: ')', insert: ')', emphasis: 'operator' },
  ],
};

interface MathKeypadProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  preset: KeypadPreset;
  placeholder?: string;
  unitLabel?: string;
  disabled?: boolean;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  value,
  onChange,
  onSubmit,
  preset,
  placeholder = 'Tap keys below to build answer',
  unitLabel,
  disabled = false,
}) => {
  const [showExtraSymbols, setShowExtraSymbols] = useState(false);

  const symbolKeys = PRESET_SYMBOLS[preset];
  const extraKeys: KeyDef[] = [
    { label: 'e', insert: 'e', emphasis: 'symbol' },
    { label: 'j', insert: 'j', emphasis: 'symbol' },
    { label: 'ω', insert: 'ω', emphasis: 'symbol' },
    { label: 'σ', insert: 'σ', emphasis: 'symbol' },
    { label: 'd_min', insert: 'd_min', emphasis: 'symbol' },
    { label: 'n', insert: 'n', emphasis: 'symbol' },
    { label: 'k', insert: 'k', emphasis: 'symbol' },
    { label: 'Hz', insert: 'Hz', emphasis: 'symbol' },
  ];

  const handleInsert = (token: string) => {
    if (disabled) return;
    onChange(value + token);
  };

  const handleBackspace = () => {
    if (disabled || !value) return;
    // Smart-delete multi-character tokens when at the end
    const multiTokens = ['log₂(', 'f_max', 'd_min', 'bits', 'SNR', 'f₀', '√(', 'dB', 'Hz'];
    for (const tok of multiTokens) {
      if (value.endsWith(tok)) {
        onChange(value.slice(0, -tok.length));
        return;
      }
    }
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    onChange('');
  };

  return (
    <div className="space-y-3 select-none">
      {/* Read-only tactile expression display — prevents native mobile OS keyboard popup */}
      <div
        role="textbox"
        aria-label="Math answer display"
        aria-readonly="true"
        className="flex items-center justify-between gap-3 min-h-[54px] px-4 py-3 rounded-xl bg-vellum border border-rule shadow-xs"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto font-mono text-lg font-medium text-ink tabular-nums">
          {value ? (
            <span>{value}</span>
          ) : (
            <span className="text-ink-muted/70 text-sm font-sans">{placeholder}</span>
          )}
          {!disabled && (
            <span
              aria-hidden="true"
              className="inline-block w-0.5 h-5 bg-cobalt animate-pulse shrink-0"
            />
          )}
        </div>
        {unitLabel && (
          <span className="font-mono text-xs font-medium text-ink-muted shrink-0">
            {unitLabel}
          </span>
        )}
      </div>

      {/* Domain-specific quick symbol strip */}
      <div className="bg-papyrus-deep/80 border border-rule rounded-2xl p-2.5 space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-medium text-ink-muted">
            Math &amp; Signal Keys
          </span>
          <button
            type="button"
            onClick={() => setShowExtraSymbols((s) => !s)}
            className="min-h-[32px] px-2 text-xs font-medium text-cobalt hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showExtraSymbols ? 'Hide extra' : 'More symbols'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {symbolKeys.map((key) => (
            <button
              key={key.label}
              type="button"
              disabled={disabled}
              aria-label={key.ariaLabel || key.label}
              onClick={() => handleInsert(key.insert)}
              className="min-h-[44px] rounded-xl bg-vellum border border-rule/80 text-cobalt font-mono text-sm font-semibold flex items-center justify-center active:scale-95 transition-transform duration-100 hover:bg-cobalt-soft disabled:opacity-50 cursor-pointer"
            >
              {key.label}
            </button>
          ))}
        </div>

        {showExtraSymbols && (
          <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-rule/70">
            {extraKeys.map((key) => (
              <button
                key={key.label}
                type="button"
                disabled={disabled}
                onClick={() => handleInsert(key.insert)}
                className="min-h-[44px] rounded-xl bg-vellum border border-rule/80 text-ink font-mono text-sm font-medium flex items-center justify-center active:scale-95 transition-transform duration-100 hover:bg-papyrus disabled:opacity-50 cursor-pointer"
              >
                {key.label}
              </button>
            ))}
          </div>
        )}

        {/* Main 4x4 numeric + arithmetic grid */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {DIGIT_KEYS.map((key) => (
            <button
              key={key.label}
              type="button"
              disabled={disabled}
              aria-label={key.ariaLabel || key.label}
              onClick={() => handleInsert(key.insert)}
              className={`min-h-[48px] rounded-xl border text-base font-mono font-semibold flex items-center justify-center active:scale-95 transition-transform duration-100 disabled:opacity-50 cursor-pointer ${
                key.emphasis === 'operator'
                  ? 'bg-papyrus border-rule text-ink hover:bg-papyrus-deep'
                  : 'bg-vellum border-rule/90 text-ink hover:bg-papyrus/60'
              }`}
            >
              {key.label}
            </button>
          ))}
        </div>

        {/* Bottom action row: Clear, Backspace, Check */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            type="button"
            disabled={disabled || !value}
            onClick={handleClear}
            aria-label="Clear answer"
            className="min-h-[48px] rounded-xl bg-papyrus border border-rule text-ink-muted text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-100 hover:text-ink disabled:opacity-40 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            disabled={disabled || !value}
            onClick={handleBackspace}
            aria-label="Delete last character"
            className="min-h-[48px] rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-100 hover:bg-papyrus-deep disabled:opacity-40 cursor-pointer"
          >
            <Delete className="w-4 h-4" />
            <span>Del</span>
          </button>

          <button
            type="button"
            disabled={disabled || !value.trim()}
            onClick={onSubmit}
            className="col-span-2 min-h-[48px] rounded-xl bg-cobalt text-vellum text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100 hover:bg-cobalt/90 disabled:opacity-45 cursor-pointer"
          >
            <CornerDownLeft className="w-4 h-4" />
            <span>Check Answer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
