/**
 * Normalizes student expressions entered via the custom math keypad
 * so mathematically equivalent phone-friendly inputs pass reliably.
 */
export function normalizeMathInput(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/·/g, '*')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/₂/g, '2')
    .replace(/₁/g, '1')
    .replace(/₀/g, '0')
    .replace(/π/g, 'pi')
    .replace(/∞/g, 'inf')
    .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
    .replace(/√([a-z0-9]+)/g, 'sqrt($1)')
    .replace(/_/g, '');
}

export function isKeypadAnswerCorrect(input: string, acceptedAnswers: string[]): boolean {
  const normalized = normalizeMathInput(input);
  if (!normalized) return false;

  for (const candidate of acceptedAnswers) {
    if (normalized === normalizeMathInput(candidate)) {
      return true;
    }
  }

  // Try lightweight numeric equivalence for simple fractions/decimals (e.g. 1/2 == 0.5)
  const numericInput = tryEvalSimpleNumeric(normalized);
  if (numericInput !== null) {
    for (const candidate of acceptedAnswers) {
      const numericCandidate = tryEvalSimpleNumeric(normalizeMathInput(candidate));
      if (numericCandidate !== null && Math.abs(numericInput - numericCandidate) < 1e-4) {
        return true;
      }
    }
  }

  return false;
}

function tryEvalSimpleNumeric(expr: string): number | null {
  // Only allow safe arithmetic tokens + pi + log2 + sqrt
  const prepared = expr
    .replace(/\bpi\b/g, String(Math.PI))
    .replace(/\blog2\(/g, 'Math.log2(')
    .replace(/\bsqrt\(/g, 'Math.sqrt(')
    .replace(/\^/g, '**');

  if (!/^[0-9+\-*/().\sMathlog2sqrt]+$/.test(prepared)) {
    return null;
  }

  try {
    // Reject unbalanced parentheses or trailing operators
    if (/^[*/+]|[+\-*/]$/.test(prepared)) return null;
    const fn = new Function(`"use strict"; return (${prepared});`);
    const result = fn();
    if (typeof result === 'number' && Number.isFinite(result)) {
      return result;
    }
    return null;
  } catch {
    return null;
  }
}
