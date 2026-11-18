import { Book, Module } from '../types/curriculum';

export const BOOKS: Book[] = [
  {
    id: 'book-1',
    number: 'Book 1',
    title: 'Signal Representation',
    lntRef: 'LNTwww · Signal Representation',
    category: 'signals',
    summary:
      'Build intuition for waves in time and frequency: sine oscillations, Fourier harmonics, Nyquist sampling, and decibel power ratios.',
    modules: [
      {
        id: 'mod-1-1',
        bookId: 'book-1',
        number: '1.1',
        title: 'Waves, Harmonics & Fourier Series',
        subtitle: 'A gentle climb from single pure sines to complex repeating waveforms',
        readMinutes: 7,
        steps: [
          {
            id: 'step-1-1-0',
            title: 'What Makes a Signal "Pure"?',
            paragraphs: [
              'Think of a tuning fork humming a single clean note. In communications engineering, that pure hum is a sine wave—a smooth back-and-forth oscillation that repeats endlessly without sharp corners.',
              'Three simple numbers describe any pure sine wave: its peak height (amplitude A), how fast it repeats (frequency f₀), and where in its cycle it starts at t = 0 (phase φ).',
            ],
            formula: {
              expression: 'x(t) = A · sin(2π · f₀ · t + φ)',
              caption: 'A single pure tone: amplitude A, frequency f₀, and starting phase φ.',
            },
            question: {
              id: 'q-1-1-0',
              kind: 'mcq',
              prompt:
                'If you double the amplitude A of a radio wave while keeping its frequency f₀ and phase φ identical, what changes?',
              options: [
                { id: 'a', label: 'The wave swings twice as tall (stronger signal), at the same speed' },
                { id: 'b', label: 'The wave oscillates twice as fast in time' },
                { id: 'c', label: 'The wave shifts sideways in time' },
              ],
              correctOptionId: 'a',
              hint: 'Amplitude A multiplies the vertical height of sin(…).',
              explanation:
                'Amplitude scales vertical height (voltage/strength), whereas frequency controls horizontal speed and phase shifts the starting angle.',
            },
          },
          {
            id: 'step-1-1-1',
            title: 'Time Period & Fundamental Frequency',
            paragraphs: [
              'Every repeating waveform finishes one full cycle in a fundamental period T₀ seconds. Instead of always quoting how long one cycle takes, engineers usually quote how many cycles fit into one second: the fundamental frequency f₀ = 1 / T₀.',
              'Short periods mean rapid wiggles. If a clock pulse repeats every 0.5 seconds, two full cycles fit inside every second (2 Hz).',
            ],
            formula: {
              expression: 'f₀ = 1 / T₀   [Hz = cycles/s]',
              caption: 'Fundamental frequency equals the reciprocal of the fundamental period.',
            },
            question: {
              id: 'q-1-1-1',
              kind: 'keypad',
              prompt:
                'A periodic baseband clock has period T₀ = 0.25 seconds. What is its fundamental frequency f₀ in Hz?',
              placeholder: 'Enter number in Hz',
              unitLabel: 'Hz',
              preset: 'frequency',
              acceptedAnswers: ['4', '4hz'],
              displayAnswer: '4 Hz',
              hint: 'How many 0.25-second intervals fit inside 1 full second?',
              explanation:
                'Since f₀ = 1 / 0.25 = 4 Hz, the clock completes four full periods every second.',
            },
          },
          {
            id: 'step-1-1-2',
            title: 'Building Sharp Shapes from Smooth Sines',
            paragraphs: [
              'Real digital pulses look boxy, not smooth. Around 1807, Joseph Fourier discovered a remarkable secret: any repeating shape—even a jagged square wave—can be built by stacking pure sine waves at integer multiples k·f₀ called harmonics.',
              'Drag the slider below to add odd harmonics one by one. Watch how low harmonics rough out the general shape, while higher harmonics carve the sharp vertical cliffs.',
            ],
            simulation: 'fourier-harmonics',
            question: {
              id: 'q-1-1-2',
              kind: 'mcq',
              prompt:
                'When stacking sine waves to build a symmetric square wave, which harmonics are actually needed?',
              options: [
                {
                  id: 'a',
                  label: 'Only odd harmonics (1f₀, 3f₀, 5f₀, …)',
                  detail: 'Symmetric positive/negative halves cancel even multiples',
                },
                {
                  id: 'b',
                  label: 'Only even harmonics (2f₀, 4f₀, 6f₀, …)',
                },
                {
                  id: 'c',
                  label: 'Every frequency in between integers too',
                },
              ],
              correctOptionId: 'a',
              hint: 'Watch the harmonic counter k in the simulator: it steps 1, 3, 5, 7…',
              explanation:
                'Because the positive and negative halves of a square wave mirror each other upside-down, all even harmonics cancel out to zero.',
            },
          },
          {
            id: 'step-1-1-3',
            title: 'Two Ways to Look at the Same Signal',
            paragraphs: [
              'Plotting voltage versus time is called the time domain. Plotting how tall each harmonic sine wave is at its frequency k·f₀ is called the frequency domain (or spectrum).',
              'They are two viewpoints of the exact same physical signal. Smooth, rounded signals have short spectra concentrated near low frequencies; sharp-edged digital pulses spread energy far out into high frequencies.',
            ],
            question: {
              id: 'q-1-1-3',
              kind: 'mcq',
              prompt:
                'If you stretch a periodic pulse train in time so its period T₀ doubles (repeating half as often), what happens to the spacing Δf = 1/T₀ between its spectral lines?',
              options: [
                {
                  id: 'a',
                  label: 'The spectral lines pack twice as tightly together',
                  detail: 'Stretching time compresses frequency spacing',
                },
                {
                  id: 'b',
                  label: 'The spectral lines spread twice as far apart',
                },
                {
                  id: 'c',
                  label: 'The spacing never changes',
                },
              ],
              correctOptionId: 'a',
              hint: 'Time and frequency live on opposite ends of a seesaw: Δf = 1 / T₀.',
              explanation:
                'Stretching a signal in time always squeezes its frequency spacing. Doubling T₀ halves Δf = 1/T₀.',
            },
          },
          {
            id: 'step-1-1-4',
            title: 'From Periodic Lines to Continuous Spectra',
            paragraphs: [
              'What if a pulse happens only once and never repeats (an aperiodic signal, like a single Wi-Fi packet)? Imagine letting the period T₀ grow toward infinity.',
              'As T₀ grows huge, the spectral lines Δf = 1/T₀ squeeze closer and closer until they merge into a smooth continuous curve—the Fourier Transform X(f).',
            ],
            formula: {
              expression: 'T₀ → ∞   ⟹   Δf = 1/T₀ → 0   (Discrete lines merge into continuous X(f))',
              caption: 'Bridge from Fourier Series (periodic) to Fourier Transform (non-repeating pulses).',
            },
            question: {
              id: 'q-1-1-4',
              kind: 'mcq',
              prompt:
                'Which kind of signal produces discrete, isolated vertical spikes in its frequency spectrum?',
              options: [
                { id: 'a', label: 'A strictly periodic signal repeating forever' },
                { id: 'b', label: 'A single one-off lightning strike pulse' },
                { id: 'c', label: 'Random thermal hiss' },
              ],
              correctOptionId: 'a',
              hint: 'Only repeating signals lock onto integer multiples k·f₀.',
              explanation:
                'Periodicity in time forces discreteness in frequency: only periodic waves have line spectra at k/T₀.',
            },
          },
        ],
        practice: [
          {
            id: 'p-1-1-1',
            title: 'Frequency-Period Formula',
            question: {
              id: 'pq-1-1-1',
              kind: 'keypad',
              prompt:
                'Write the fundamental frequency f₀ in terms of the period T using the math keypad.',
              placeholder: 'Write expression',
              preset: 'frequency',
              acceptedAnswers: ['1/t', 't^-1', 't^(-1)'],
              displayAnswer: '1 / T',
              hint: 'Frequency is the reciprocal of period T.',
              explanation: 'By definition, f₀ = 1/T for any periodic waveform with period T.',
            },
          },
          {
            id: 'p-1-1-2',
            title: 'Next Nonzero Harmonic',
            question: {
              id: 'pq-1-1-2',
              kind: 'keypad',
              prompt:
                'A symmetric square wave has fundamental frequency f₀ = 100 Hz. What is the frequency of its next nonzero harmonic above 100 Hz?',
              placeholder: 'Enter frequency',
              unitLabel: 'Hz',
              preset: 'frequency',
              acceptedAnswers: ['300', '300hz'],
              displayAnswer: '300 Hz',
              hint: 'Symmetric square waves skip k = 2 and jump to k = 3.',
              explanation: 'The k = 3 odd harmonic sits at 3 × 100 = 300 Hz.',
            },
          },
          {
            id: 'p-1-1-3',
            title: 'Harmonic Count Target',
            question: {
              id: 'pq-1-1-3',
              kind: 'slider-target',
              prompt:
                'Tune the square-wave synthesizer so that exactly 4 sinusoidal harmonics (k = 1, 3, 5, 7) are summed together.',
              simulation: 'fourier-harmonics',
              parameterLabel: 'Highest Odd Harmonic (k)',
              unit: '',
              min: 1,
              max: 15,
              step: 2,
              initialValue: 1,
              targetMin: 7,
              targetMax: 7,
              targetDescription: 'Sum 4 odd harmonics (k = 7)',
              hint: 'Count odd integers: 1, 3, 5, 7.',
              explanation: 'Setting k = 7 combines the 1st, 3rd, 5th, and 7th harmonics.',
            },
          },
          {
            id: 'p-1-1-4',
            title: 'Bandwidth & Sharpness Intuition',
            question: {
              id: 'pq-1-1-4',
              kind: 'mcq',
              prompt:
                'Two signals repeat at the same rate f₀: Signal A is a smooth cosine, while Signal B is a crisp square pulse. Which needs wider channel bandwidth?',
              options: [
                { id: 'a', label: 'Signal B (sharp corners demand high-frequency harmonics)' },
                { id: 'b', label: 'Signal A (smooth cosines require infinite harmonics)' },
                { id: 'c', label: 'Both occupy the exact same single frequency f₀' },
              ],
              correctOptionId: 'a',
              hint: 'How many harmonics does a pure cosine need? Just one!',
              explanation:
                'A pure cosine lives at a single frequency f₀, whereas sharp square edges require a long tail of odd harmonics.',
            },
          },
        ],
      },
      {
        id: 'mod-1-2',
        bookId: 'book-1',
        number: '1.2',
        title: 'Sampling & The Nyquist Bound',
        subtitle: 'Turning smooth waves into digital numbers without creating ghost frequencies',
        readMinutes: 6,
        steps: [
          {
            id: 'step-1-2-0',
            title: 'Why Digital Needs Snapshots',
            paragraphs: [
              'Microprocessors and phones cannot store an unbroken curve of infinitely many time instants. Instead, an Analog-to-Digital Converter (ADC) measures the voltage at regular ticks spaced T_s seconds apart.',
              'The number of snapshots taken per second is the sampling rate f_s = 1 / T_s. Faster f_s captures finer detail, at the cost of more data to store or transmit.',
            ],
            question: {
              id: 'q-1-2-0',
              kind: 'mcq',
              prompt:
                'CD-quality audio takes 44,100 voltage snapshots every second (f_s = 44.1 kHz). What happens if you double f_s to 88.2 kHz?',
              options: [
                { id: 'a', label: 'Snapshots occur twice as often (T_s halves), doubling data rate' },
                { id: 'b', label: 'The audio plays back twice as fast' },
                { id: 'c', label: 'Half as many numbers are stored per second' },
              ],
              correctOptionId: 'a',
              hint: 'f_s simply counts snapshots per second.',
              explanation:
                'Doubling f_s cuts the interval T_s = 1/f_s in half, producing twice as many digital numbers per second.',
            },
          },
          {
            id: 'step-1-2-1',
            title: 'The Wagon-Wheel Illusion (Aliasing)',
            paragraphs: [
              'Have you ever seen car wheels appear to spin backward on video? A movie camera snaps 24 frames per second; if a wheel spins nearly once per frame, your eye connects dots into a fake slow motion.',
              'The same optical illusion happens to electrical signals! Harry Nyquist and Claude Shannon proved you must sample strictly faster than twice the highest frequency f_max to prevent high waves from impersonating slow ones.',
            ],
            formula: {
              expression: 'f_s > 2 · f_max',
              caption: 'Nyquist-Shannon condition for exact, alias-free reconstruction.',
            },
            question: {
              id: 'q-1-2-1',
              kind: 'keypad',
              prompt:
                'Write the minimum Nyquist sampling rate expression for a signal with highest frequency f_max.',
              placeholder: 'e.g. 2*f_max',
              preset: 'frequency',
              acceptedAnswers: ['2*f_max', '2f_max', '2*fmax', '2fmax'],
              displayAnswer: '2 · f_max',
              hint: 'Twice the highest frequency component.',
              explanation:
                'Sampling faster than 2·f_max ensures at least two samples per cycle of the fastest wiggle, eliminating aliases.',
            },
          },
          {
            id: 'step-1-2-2',
            title: 'Seeing Aliasing Live',
            paragraphs: [
              'Below, the solid blue wave oscillates at f₀ = 2 Hz. Whenever the sampling rate f_s drops below 4 Hz, notice the dashed red ghost wave threading through the exact same amber sample dots.',
              'Adjust the slider to push f_s safely past the Nyquist threshold.',
            ],
            question: {
              id: 'q-1-2-2',
              kind: 'slider-target',
              prompt:
                'Raise the sampling rate f_s until aliasing disappears for the 2 Hz tone (place f_s between 4.5 Hz and 6.0 Hz).',
              simulation: 'nyquist-sampling',
              parameterLabel: 'Sampling Rate (f_s)',
              unit: 'Hz',
              min: 1.5,
              max: 10,
              step: 0.5,
              initialValue: 2.5,
              targetMin: 4.5,
              targetMax: 6.0,
              targetDescription: 'Set f_s in [4.5, 6.0] Hz',
              hint: 'For f₀ = 2 Hz, Nyquist requires f_s > 4 Hz.',
              explanation:
                'Above 4 Hz, only one bandlimited 2 Hz wave fits the sample dots, and the red alias vanishes.',
            },
          },
          {
            id: 'step-1-2-3',
            title: 'Why Receivers Filter Before Sampling',
            paragraphs: [
              'Even if your microphone voice stops at 4 kHz, high-frequency hiss or nearby radio interference above 4 kHz might hit the ADC chip.',
              'If that high-frequency clutter is sampled without filtering first, it folds down onto your voice track permanently. That is why every ADC puts an analog anti-aliasing low-pass filter right in front of the sampler.',
            ],
            question: {
              id: 'q-1-2-3',
              kind: 'mcq',
              prompt:
                'Can digital software clean up aliasing AFTER the ADC has already sampled too slowly?',
              options: [
                { id: 'a', label: 'No—once folded, the fake slow wave looks identical to real low-frequency data' },
                { id: 'b', label: 'Yes—an equalizer can always tell them apart' },
              ],
              correctOptionId: 'a',
              hint: 'Recall the red and blue waves passing through the exact same dots.',
              explanation:
                'Once samples are captured, an aliased tone and a true low-frequency tone produce identical numbers, so no post-processing can separate them.',
            },
          },
        ],
        practice: [
          {
            id: 'p-1-2-1',
            title: 'Telephone Speech Nyquist Rate',
            question: {
              id: 'pq-1-2-1',
              kind: 'keypad',
              prompt:
                'Narrowband telephone speech is filtered to f_max = 4 kHz. What is its minimum Nyquist rate in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'numeric',
              acceptedAnswers: ['8', '8khz'],
              displayAnswer: '8 kHz',
              hint: 'Multiply 4 kHz by 2.',
              explanation: '2 × 4 kHz = 8 kHz, the classic digital telephony sampling rate.',
            },
          },
          {
            id: 'p-1-2-2',
            title: 'Sample Spacing T_s',
            question: {
              id: 'pq-1-2-2',
              kind: 'keypad',
              prompt:
                'If an accelerometer samples at f_s = 10 Hz, how many seconds T_s elapse between consecutive samples?',
              placeholder: 'Fraction or decimal',
              unitLabel: 's',
              preset: 'numeric',
              acceptedAnswers: ['0.1', '1/10'],
              displayAnswer: '0.1 s',
              hint: 'T_s = 1 / f_s.',
              explanation: 'T_s = 1 / 10 Hz = 0.1 s (100 milliseconds).',
            },
          },
          {
            id: 'p-1-2-3',
            title: 'Alias Folding Check',
            question: {
              id: 'pq-1-2-3',
              kind: 'mcq',
              prompt:
                'A 7 Hz tone is sampled at f_s = 10 Hz (half-rate f_s/2 = 5 Hz). What apparent alias frequency appears?',
              options: [
                { id: 'a', label: '3 Hz', detail: '|7 − 10| = 3 Hz' },
                { id: 'b', label: '7 Hz' },
                { id: 'c', label: '17 Hz' },
              ],
              correctOptionId: 'a',
              hint: 'Subtract the nearest multiple of f_s = 10 Hz from 7 Hz.',
              explanation: '|7 − 10| = 3 Hz; the 7 Hz wave folds across 5 Hz down to 3 Hz.',
            },
          },
          {
            id: 'p-1-2-4',
            title: 'Human Hearing Margin',
            question: {
              id: 'pq-1-2-4',
              kind: 'mcq',
              prompt:
                'Human ears hear up to roughly 20 kHz. Why did CD audio pick 44.1 kHz instead of exactly 40 kHz?',
              options: [
                { id: 'a', label: 'Real analog anti-aliasing filters need a gentle transition band above 20 kHz' },
                { id: 'b', label: '44.1 kHz makes speakers twice as loud' },
              ],
              correctOptionId: 'a',
              hint: 'Practical filters cannot drop to zero instantaneously at 20.000 kHz.',
              explanation:
                'The extra 4.1 kHz above 40 kHz gives real analog low-pass filters room to roll off smoothly between 20 kHz and 22.05 kHz.',
            },
          },
        ],
      },
      {
        id: 'mod-1-3',
        bookId: 'book-1',
        number: '1.3',
        title: 'Decibels (dB) & Signal Power',
        subtitle: 'Mastering the everyday shorthand engineers use for huge power ratios',
        readMinutes: 5,
        steps: [
          {
            id: 'step-1-3-0',
            title: 'Why Engineers Love Logarithms',
            paragraphs: [
              'A cell tower might blast 20 Watts while your phone antenna receives 0.0000000001 Watts—a trillion-fold drop! Writing strings of zeros gets exhausting fast.',
              'Decibels (dB) turn messy multiplication and division across huge ranges into simple addition and subtraction by using base-10 logarithms.',
            ],
            formula: {
              expression: 'G_dB = 10 · log₁₀(P_out / P_in)',
              caption: 'Power ratio converted into decibels. Every +10 dB multiplies power by 10.',
            },
            question: {
              id: 'q-1-3-0',
              kind: 'keypad',
              prompt:
                'An amplifier boosts signal power by a factor of 100 (P_out = 100 · P_in). What is its gain in dB?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['20', '20db'],
              displayAnswer: '20 dB',
              hint: 'log₁₀(100) = 2, then multiply by 10.',
              explanation: '10 · log₁₀(100) = 10 × 2 = 20 dB. Each zero in a power of 10 adds +10 dB!',
            },
          },
          {
            id: 'step-1-3-1',
            title: 'The Golden +3 dB & +10 dB Rules',
            paragraphs: [
              'You almost never need a calculator for decibels if you memorize two landmarks: doubling power (×2) adds about +3 dB, and multiplying power by ten (×10) adds exactly +10 dB.',
              'Halving power (×1/2) subtracts −3 dB, and cutting power to one-tenth subtracts −10 dB. Notice 0 dB simply means a ratio of 1 (no change)!',
            ],
            question: {
              id: 'q-1-3-1',
              kind: 'mcq',
              prompt:
                'Using only the +3 dB (×2) and +10 dB (×10) mental shortcuts, roughly what power factor is +13 dB?',
              options: [
                { id: 'a', label: '×20 (since 13 dB = 10 dB + 3 dB → 10 × 2)' },
                { id: 'b', label: '×13' },
                { id: 'c', label: '×1000' },
              ],
              correctOptionId: 'a',
              hint: 'Adding decibels corresponds to multiplying linear factors.',
              explanation:
                '+10 dB gives ×10 and +3 dB gives ×2, so +13 dB means 10 × 2 = 20× the power!',
            },
          },
          {
            id: 'step-1-3-2',
            title: 'Watch Out: Power vs. Voltage (10 vs. 20)',
            paragraphs: [
              'Electrical power grows with the SQUARE of voltage (P ∝ V²). If you double a wave’s voltage amplitude (×2), its power jumps fourfold (×4 = +6 dB)!',
              'That is why voltage ratios use 20·log₁₀(V₂/V₁), whereas power ratios use 10·log₁₀(P₂/P₁). Both formulas give the exact same physical dB number.',
            ],
            question: {
              id: 'q-1-3-2',
              kind: 'keypad',
              prompt:
                'A cable cuts a signal’s voltage amplitude in half (V_out / V_in = 0.5). Roughly how many dB did the signal lose (enter negative dB)?',
              placeholder: 'e.g. -6',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['-6', '-6db'],
              displayAnswer: '−6 dB',
              hint: 'Half voltage means 1/4 power, which is two halvings (−3 dB twice).',
              explanation:
                'Half voltage equals quarter power: 20·log₁₀(0.5) ≈ −6 dB.',
            },
          },
        ],
        practice: [
          {
            id: 'p-1-3-1',
            title: 'Thousandfold Power Gain',
            question: {
              id: 'pq-1-3-1',
              kind: 'keypad',
              prompt:
                'A directional dish antenna concentrates power 1,000× toward a satellite. What is its gain in dB?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['30', '30db'],
              displayAnswer: '30 dB',
              hint: '1,000 = 10³, so three steps of +10 dB.',
              explanation: '10 · log₁₀(1000) = 10 × 3 = 30 dB.',
            },
          },
          {
            id: 'p-1-3-2',
            title: 'Combining Gains & Losses',
            question: {
              id: 'pq-1-3-2',
              kind: 'keypad',
              prompt:
                'A signal enters an amplifier (+16 dB gain) followed by a coax cable (−6 dB loss). What is the net dB gain?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['10', '10db'],
              displayAnswer: '10 dB',
              hint: 'Simply add and subtract the decibel stages.',
              explanation: '+16 dB − 6 dB = +10 dB net gain (10× power).',
            },
          },
          {
            id: 'p-1-3-3',
            title: 'Zero dB Meaning',
            question: {
              id: 'pq-1-3-3',
              kind: 'mcq',
              prompt:
                'What does a gain of 0 dB mean?',
              options: [
                { id: 'a', label: 'Output power equals input power (ratio = 1)' },
                { id: 'b', label: 'Zero power comes out (dead wire)' },
                { id: 'c', label: 'Infinite amplification' },
              ],
              correctOptionId: 'a',
              hint: 'What is log₁₀(1)?',
              explanation: 'Since log₁₀(1) = 0, 0 dB means P_out / P_in = 1 (unchanged).',
            },
          },
          {
            id: 'p-1-3-4',
            title: 'Absolute Power in dBm',
            question: {
              id: 'pq-1-3-4',
              kind: 'mcq',
              prompt:
                'The unit "dBm" measures power relative to 1 milliwatt (1 mW = 0 dBm). Roughly how much power is +20 dBm?',
              options: [
                { id: 'a', label: '100 mW (100× larger than 1 mW)' },
                { id: 'b', label: '20 mW' },
                { id: 'c', label: '0.01 mW' },
              ],
              correctOptionId: 'a',
              hint: '+20 dB above 1 mW means 1 mW × 10².',
              explanation: '20 dB = ×100, so +20 dBm = 100 mW (typical Wi-Fi router power!).',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'book-2',
    number: 'Book 2',
    title: 'Linear & Time-Invariant Systems',
    lntRef: 'LNTwww · LTI Systems',
    category: 'signals',
    summary:
      'Predict how filters, cables, and wireless rooms reshape signals via impulse responses, convolution, causality, and echoes.',
    modules: [
      {
        id: 'mod-2-1',
        bookId: 'book-2',
        number: '2.1',
        title: 'Linearity, Impulse Response & Convolution',
        subtitle: 'Why recording a single sharp clap lets you predict any sound in a room',
        readMinutes: 6,
        steps: [
          {
            id: 'step-2-1-0',
            title: 'What Makes a System LTI?',
            paragraphs: [
              'A system (a filter, copper cable, or concert hall) is Linear if doubling the input doubles the output, and adding two inputs adds their outputs without creating weird cross-products.',
              'It is Time-Invariant if the rules do not change from morning to night: sending a pulse 2 seconds later simply makes the exact same output arrive 2 seconds later.',
            ],
            question: {
              id: 'q-2-1-0',
              kind: 'mcq',
              prompt:
                'Which everyday device is NOT linear (because loud sounds get clipped or distorted into new harmonics)?',
              options: [
                { id: 'a', label: 'An overdriven guitar distortion pedal' },
                { id: 'b', label: 'A passive copper wire' },
                { id: 'c', label: 'A quiet acoustic room echo' },
              ],
              correctOptionId: 'a',
              hint: 'Does doubling the input of a distortion pedal cleanly double its output without changing tone?',
              explanation:
                'Clipping and saturation change signal shape at high amplitudes, breaking linearity. Passive wires and acoustic halls are LTI.',
            },
          },
          {
            id: 'step-2-1-1',
            title: 'The "Clap" Test: Impulse Response h(t)',
            paragraphs: [
              'Imagine walking into a cathedral and clapping your hands once—an ultra-brief unit impulse δ(t). Recording the lingering echoes gives the cathedral’s impulse response h(t).',
              'Because the room is LTI, any spoken speech x(t) is just a rapid stream of scaled claps, so its output y(t) is completely determined by combining shifted copies of h(t)—an operation called convolution.',
            ],
            formula: {
              expression: 'y(t) = (x * h)(t) = ∫ x(τ) · h(t − τ) dτ',
              caption: 'Convolution: every slice of x(τ) triggers a scaled, delayed copy of h.',
            },
            question: {
              id: 'q-2-1-1',
              kind: 'mcq',
              prompt:
                'If an LTI system outputs y(t) for input x(t), what does it output when you feed in 3·x(t − 2)?',
              options: [
                { id: 'a', label: '3·y(t − 2)' },
                { id: 'b', label: 'y(3t − 2)' },
                { id: 'c', label: '3·y(t) − 2' },
              ],
              correctOptionId: 'a',
              hint: 'Linearity scales amplitude by 3; time-invariance shifts time by −2.',
              explanation:
                'Scaling the input by 3 scales the output by 3, and delaying by 2 seconds delays the output by 2 seconds.',
            },
          },
          {
            id: 'step-2-1-2',
            title: 'Flip, Slide & Overlap Visually',
            paragraphs: [
              'Notice h(t − τ) inside the convolution formula: flipping h backward and sliding it across x(τ) by amount t measures how much the two shapes overlap at moment t.',
              'Drag the time slider below to slide the amber pulse across the blue pulse and watch the green overlap area build a triangle.',
            ],
            question: {
              id: 'q-2-1-2',
              kind: 'slider-target',
              prompt:
                'Slide time t so the two unit pulses align completely and the overlap area y(t) hits its peak of 1.0.',
              simulation: 'convolution-overlap',
              parameterLabel: 'Time Shift (t)',
              unit: 's',
              min: -0.4,
              max: 2.4,
              step: 0.1,
              initialValue: 0.3,
              targetMin: 0.95,
              targetMax: 1.05,
              targetDescription: 'Maximize overlap at t = 1.0 s',
              hint: 'Watch the green dot climb to the top point of the triangle.',
              explanation:
                'At t = 1.0 s, the sliding pulse covers [0, 1] completely, producing the peak overlap area of 1.0.',
            },
          },
          {
            id: 'step-2-1-3',
            title: 'Why Engineers Switch to Frequency',
            paragraphs: [
              'Doing flip-slide-integrate in time can get heavy quickly. Fortunately, the Fourier Transform converts time-domain convolution into plain pointwise multiplication!',
              'In frequency, each pure sine wave passes through the system unchanged in frequency—only scaled and phase-shifted by H(f).',
            ],
            formula: {
              expression: 'y(t) = x(t) * h(t)   ⟺   Y(f) = X(f) · H(f)',
              caption: 'Convolution in time equals simple multiplication in frequency.',
            },
            question: {
              id: 'q-2-1-3',
              kind: 'mcq',
              prompt:
                'A filter has frequency response H(f) = 0 at f = 5 kHz. If you send a pure 5 kHz tone into it, what comes out?',
              options: [
                { id: 'a', label: 'Zero output (the 5 kHz tone is blocked)' },
                { id: 'b', label: 'A 10 kHz tone' },
                { id: 'c', label: 'The 5 kHz tone passes unchanged' },
              ],
              correctOptionId: 'a',
              hint: 'Multiply X(5 kHz) by H(5 kHz) = 0.',
              explanation:
                'LTI systems never invent new frequencies; they only multiply existing ones by H(f). Since H(5 kHz) = 0, the output is zero.',
            },
          },
        ],
        practice: [
          {
            id: 'p-2-1-1',
            title: 'Total Output Duration',
            question: {
              id: 'pq-2-1-1',
              kind: 'keypad',
              prompt:
                'Convolving a 1-second box pulse with another 1-second box pulse gives a triangle. How many seconds long is the nonzero triangle?',
              placeholder: 'Enter seconds',
              unitLabel: 's',
              preset: 'numeric',
              acceptedAnswers: ['2', '2s'],
              displayAnswer: '2 s',
              hint: 'Add the two durations: 1 s + 1 s.',
              explanation: 'Convolution adds signal durations: 1 s + 1 s = 2 s.',
            },
          },
          {
            id: 'p-2-1-2',
            title: 'The Ideal Wire Impulse',
            question: {
              id: 'pq-2-1-2',
              kind: 'mcq',
              prompt:
                'Which impulse response h(t) represents an ideal lossless wire with zero delay?',
              options: [
                { id: 'a', label: 'h(t) = δ(t) (a unit spike at t = 0)' },
                { id: 'b', label: 'h(t) = 1 (flat constant)' },
                { id: 'c', label: 'h(t) = cos(t)' },
              ],
              correctOptionId: 'a',
              hint: 'A single instant spike returns just one unshifted copy of the input.',
              explanation: 'Convolving x(t) with δ(t) returns x(t) untouched.',
            },
          },
          {
            id: 'p-2-1-3',
            title: 'Filters in Series',
            question: {
              id: 'pq-2-1-3',
              kind: 'mcq',
              prompt:
                'Two LTI filters H₁(f) and H₂(f) are wired back-to-back in series. What is the combined frequency response?',
              options: [
                { id: 'a', label: 'H₁(f) · H₂(f)' },
                { id: 'b', label: 'H₁(f) + H₂(f)' },
                { id: 'c', label: 'H₁(f) − H₂(f)' },
              ],
              correctOptionId: 'a',
              hint: 'The first stage multiplies X(f) by H₁(f), then the second multiplies that by H₂(f).',
              explanation: 'Series cascades multiply transfer functions: H_total(f) = H₁(f) · H₂(f).',
            },
          },
          {
            id: 'p-2-1-4',
            title: 'Delayed Impulse Effect',
            question: {
              id: 'pq-2-1-4',
              kind: 'mcq',
              prompt:
                'If a cable’s impulse response is h(t) = δ(t − 5 ms), what does that cable do to any signal?',
              options: [
                { id: 'a', label: 'Delays the signal cleanly by 5 ms without changing its shape' },
                { id: 'b', label: 'Deletes the first 5 ms' },
                { id: 'c', label: 'Predicts the signal 5 ms early' },
              ],
              correctOptionId: 'a',
              hint: 'A spike at +5 ms means the "echo" arrives 5 ms after the clap.',
              explanation: 'Convolving with δ(t − T) simply produces x(t − T)—a pure 5 ms delay.',
            },
          },
        ],
      },
      {
        id: 'mod-2-2',
        bookId: 'book-2',
        number: '2.2',
        title: 'Filters, Cutoffs & Causality',
        subtitle: 'Passing desired bands, rejecting noise, and respecting the arrow of time',
        readMinutes: 6,
        steps: [
          {
            id: 'step-2-2-0',
            title: 'Low-Pass, High-Pass & Band-Pass',
            paragraphs: [
              'Filters act like frequency sieves. A low-pass filter keeps slow variations and blocks fast jitter; a high-pass filter blocks slow drift (like DC) and passes fast oscillations.',
              'A band-pass filter—used in every FM radio and Wi-Fi tuner—keeps only a narrow frequency slice around one station while rejecting stations above and below.',
            ],
            question: {
              id: 'q-2-2-0',
              kind: 'mcq',
              prompt:
                'Your voice microphone picks up 60 Hz wall-outlet hum below your 300–3,400 Hz speech band. Which filter removes the 60 Hz hum while keeping speech?',
              options: [
                { id: 'a', label: 'High-pass filter cutting off around 150 Hz' },
                { id: 'b', label: 'Low-pass filter cutting off at 50 Hz' },
              ],
              correctOptionId: 'a',
              hint: '60 Hz is LOWER than speech (300–3,400 Hz).',
              explanation:
                'A high-pass filter blocks frequencies below ~150 Hz (stopping the 60 Hz hum) while letting 300–3,400 Hz speech pass.',
            },
          },
          {
            id: 'step-2-2-1',
            title: 'The −3 dB Cutoff Convention',
            paragraphs: [
              'Real-world filters never drop like a sheer cliff. Instead, engineers mark the cutoff frequency f_c where the output power drops to half of its passband peak (−3 dB).',
              'Explore the Butterworth low-pass curve below. Toggle filter order n = 1, 2, 4 to see how adding complexity sharpens the roll-off cliff past f_c.',
            ],
            simulation: 'lti-filter',
            question: {
              id: 'q-2-2-1',
              kind: 'mcq',
              prompt:
                'Raising the Butterworth filter order n from 1 to 4 causes what change?',
              options: [
                { id: 'a', label: 'Much steeper drop-off past f_c (stronger noise rejection)' },
                { id: 'b', label: 'The −3 dB cutoff point disappears' },
                { id: 'c', label: 'High frequencies get boosted above 1.0' },
              ],
              correctOptionId: 'a',
              hint: 'Click n=1 then n=4 in the simulation and watch the curve to the right of f_c.',
              explanation:
                'Higher order flattens the passband and steepens the stopband roll-off (20·n dB per decade).',
            },
          },
          {
            id: 'step-2-2-2',
            title: 'Why Ideal Brick-Wall Filters Break Time',
            paragraphs: [
              'You might wonder: why not build a computer chip with a razor-sharp rectangular box filter that passes 1.0 below f_c and 0.0 everywhere above?',
              'The inverse Fourier transform of a sharp frequency box is a sinc(t) ripple stretching infinitely into BOTH positive and negative time. Having h(t) ≠ 0 for t < 0 means the filter would have to start reacting BEFORE the input arrives!',
            ],
            question: {
              id: 'q-2-2-2',
              kind: 'mcq',
              prompt:
                'For a live, real-time physical filter to be causal (not a fortune teller), what must hold for its impulse response h(t)?',
              options: [
                { id: 'a', label: 'h(t) = 0 for all t < 0' },
                { id: 'b', label: 'h(t) = 0 for all t > 0' },
                { id: 'c', label: 'h(t) must be a square wave' },
              ],
              correctOptionId: 'a',
              hint: 'The clap happens at t = 0. Can echoes exist before the clap?',
              explanation:
                'Causality requires zero output before an impulse hits at t = 0, so h(t) = 0 for all t < 0.',
            },
          },
          {
            id: 'step-2-2-3',
            title: 'Positioning the Cutoff',
            paragraphs: [
              'Choosing f_c is always a balancing act: too low and you slice off your signal’s sharp details; too high and extra broadband noise sneaks in.',
              'Practice placing the cutoff frequency right where needed below.',
            ],
            question: {
              id: 'q-2-2-3',
              kind: 'slider-target',
              prompt:
                'Set the low-pass cutoff f_c to pass a 3 kHz voice band cleanly while starting to reject frequencies above 4 kHz (target [3.0, 4.0] kHz).',
              simulation: 'lti-filter',
              parameterLabel: 'Cutoff Frequency (f_c)',
              unit: 'kHz',
              min: 1,
              max: 8,
              step: 0.5,
              initialValue: 6.5,
              targetMin: 3.0,
              targetMax: 4.0,
              targetDescription: 'Place f_c inside [3.0, 4.0] kHz',
              hint: 'Slide f_c left into the 3.0–4.0 kHz zone.',
              explanation:
                'Placing f_c in [3.0, 4.0] kHz preserves the 3 kHz speech signal while attenuating higher-frequency interference.',
            },
          },
        ],
        practice: [
          {
            id: 'p-2-2-1',
            title: 'Half-Power Cutoff in dB',
            question: {
              id: 'pq-2-2-1',
              kind: 'keypad',
              prompt:
                'At f_c, output power falls to half (50%) of passband power. Rounded to the nearest integer, how many dB is that (negative number)?',
              placeholder: 'e.g. -3',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['-3', '-3db'],
              displayAnswer: '−3 dB',
              hint: 'Remember our golden halving rule from decibels!',
              explanation: 'Half power equals 10·log₁₀(0.5) ≈ −3 dB.',
            },
          },
          {
            id: 'p-2-2-2',
            title: 'Stopband Attenuation',
            question: {
              id: 'pq-2-2-2',
              kind: 'keypad',
              prompt:
                'A stopband cuts an interfering station’s power by a factor of 100. How many dB of attenuation is that (positive value)?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['20', '20db'],
              displayAnswer: '20 dB',
              hint: '10·log₁₀(100) = 10 × 2.',
              explanation: 'A 100× power reduction corresponds to 20 dB of attenuation.',
            },
          },
          {
            id: 'p-2-2-3',
            title: 'Distortion-Free Phase',
            question: {
              id: 'pq-2-2-3',
              kind: 'mcq',
              prompt:
                'To keep a digital pulse’s shape crisp inside the passband, how should a filter’s phase shift vary with frequency?',
              options: [
                { id: 'a', label: 'Linearly with frequency (so all frequencies experience the same delay)' },
                { id: 'b', label: 'Randomly across frequency' },
              ],
              correctOptionId: 'a',
              hint: 'If high frequencies arrive later than low frequencies, the pulse smears out.',
              explanation:
                'Linear phase produces constant group delay across frequencies, keeping all harmonics aligned in time.',
            },
          },
          {
            id: 'p-2-2-4',
            title: 'Half-Power Magnitude',
            question: {
              id: 'pq-2-2-4',
              kind: 'mcq',
              prompt:
                'At the −3 dB cutoff frequency, power is 0.5. What is the voltage magnitude |H(f_c)|?',
              options: [
                { id: 'a', label: '1/√2 ≈ 0.707' },
                { id: 'b', label: '0.500' },
                { id: 'c', label: '0.250' },
              ],
              correctOptionId: 'a',
              hint: 'Power is proportional to voltage squared: (0.707)² ≈ 0.5.',
              explanation: 'Since P ∝ |H|², half power requires |H(f_c)| = √0.5 = 1/√2 ≈ 0.707.',
            },
          },
        ],
      },
      {
        id: 'mod-2-3',
        bookId: 'book-2',
        number: '2.3',
        title: 'Multipath Channels & Intersymbol Interference',
        subtitle: 'What happens when radio waves bounce off buildings and smear bits together',
        readMinutes: 5,
        steps: [
          {
            id: 'step-2-3-0',
            title: 'Echoes in Wireless Space',
            paragraphs: [
              'When your phone receives a Wi-Fi or 5G signal indoors, the wave does not just fly in one straight line. Copies bounce off walls, windows, and ceilings, arriving slightly later than the direct path.',
              'We can model that multipath room as a simple LTI impulse response with multiple delayed spikes: h(t) = a₀·δ(t) + a₁·δ(t − τ₁) + …',
            ],
            question: {
              id: 'q-2-3-0',
              kind: 'mcq',
              prompt:
                'If a direct path arrives at t = 0 and a wall echo arrives 100 ns later, what is the channel’s impulse response?',
              options: [
                { id: 'a', label: 'Two distinct spikes separated by 100 ns' },
                { id: 'b', label: 'A single spike at t = 0' },
                { id: 'c', label: 'Zero output everywhere' },
              ],
              correctOptionId: 'a',
              hint: 'One clap in the room produces two audible claps: direct + echo.',
              explanation:
                'Each propagation path adds a scaled, delayed spike to the channel impulse response h(t).',
            },
          },
          {
            id: 'step-2-3-1',
            title: 'Intersymbol Interference (ISI)',
            paragraphs: [
              'If you send digital pulses slowly (say 1 pulse every 1,000 ns), a 100 ns echo finishes long before the next bit starts. No problem!',
              'But if you speed up to 1 pulse every 50 ns, the echo from Bit 1 crashes right into Bit 2! This smearing of neighboring symbols is called Intersymbol Interference (ISI).',
            ],
            question: {
              id: 'q-2-3-1',
              kind: 'mcq',
              prompt:
                'When does multipath echo cause severe Intersymbol Interference (ISI)?',
              options: [
                { id: 'a', label: 'When the symbol duration T_sym is shorter than or comparable to the echo delay spread' },
                { id: 'b', label: 'When you transmit very slowly (long symbol duration)' },
              ],
              correctOptionId: 'a',
              hint: 'Does a short symbol finish before the echo arrives, or do they overlap?',
              explanation:
                'Fast symbol rates shrink T_sym below the channel’s delay spread, causing delayed echoes of earlier symbols to collide with current symbols.',
            },
          },
          {
            id: 'step-2-3-2',
            title: 'Frequency-Selective Fading & Equalization',
            paragraphs: [
              'When direct and echoed sine waves arrive out of phase (half a wavelength apart), they cancel each other out at certain frequencies—carving deep notches into |H(f)|.',
              'To rescue smudged pulses, receivers use an equalizer filter H_eq(f) ≈ 1 / H(f) that boosts the notched frequencies back up (or switch to OFDM, as we will see in Book 5!).',
            ],
            question: {
              id: 'q-2-3-2',
              kind: 'mcq',
              prompt:
                'What is the basic job of a channel equalizer inside a digital receiver?',
              options: [
                { id: 'a', label: 'Invert the channel’s frequency notches and echoes to undo ISI' },
                { id: 'b', label: 'Increase transmitter battery voltage' },
                { id: 'c', label: 'Delete every second bit' },
              ],
              correctOptionId: 'a',
              hint: 'H_channel(f) · H_eq(f) ≈ 1 restores a flat channel.',
              explanation:
                'An equalizer approximates the inverse of the channel response so pulses regain crisp, non-overlapping shapes.',
            },
          },
        ],
        practice: [
          {
            id: 'p-2-3-1',
            title: 'Delay Spread vs. Symbol Time',
            question: {
              id: 'pq-2-3-1',
              kind: 'mcq',
              prompt:
                'A warehouse has multipath echoes stretching over 2 μs. Which symbol duration avoids heavy ISI without needing an equalizer?',
              options: [
                { id: 'a', label: 'T_sym = 20 μs (much longer than 2 μs)' },
                { id: 'b', label: 'T_sym = 0.2 μs (10× shorter than the echoes)' },
              ],
              correctOptionId: 'a',
              hint: 'Make each symbol much longer than the echo tail.',
              explanation:
                'At T_sym = 20 μs, echoes only affect the first 10% of the symbol; at 0.2 μs, one symbol smears across 10 neighbors!',
            },
          },
          {
            id: 'p-2-3-2',
            title: 'Echo Cancellation Hazard',
            question: {
              id: 'pq-2-3-2',
              kind: 'mcq',
              prompt:
                'If a receiver uses a naive linear equalizer H_eq(f) = 1 / H(f) across a deep fade where |H(f)| ≈ 0.01, what bad side effect occurs?',
              options: [
                { id: 'a', label: 'Noise at that faded frequency gets amplified 100× (noise enhancement)' },
                { id: 'b', label: 'The signal turns into a square wave' },
              ],
              correctOptionId: 'a',
              hint: 'Multiplying by 1 / 0.01 = 100 boosts both the weak signal AND the receiver noise!',
              explanation:
                'Zero-forcing inversion amplifies thermal noise massively inside deep spectral notches—a classic motivation for MMSE equalizers and OFDM.',
            },
          },
          {
            id: 'p-2-3-3',
            title: 'Destructive Echo Interference',
            question: {
              id: 'pq-2-3-3',
              kind: 'keypad',
              prompt:
                'If an echo arrives with the exact same amplitude (1) as the direct path but 180° out of phase (−1), what is their summed amplitude?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['0'],
              displayAnswer: '0',
              hint: 'Compute 1 + (−1).',
              explanation: '1 + (−1) = 0: complete destructive cancellation (a deep fade).',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'book-3',
    number: 'Book 3',
    title: 'Theory of Stochastic Signals',
    lntRef: 'LNTwww · Stochastic Signals',
    category: 'signals',
    summary:
      'Model unpredictable message sources and thermal noise with probability density curves, autocorrelation, SNR, and white noise.',
    modules: [
      {
        id: 'mod-3-1',
        bookId: 'book-3',
        number: '3.1',
        title: 'Randomness, Noise & The Bell Curve',
        subtitle: 'Why billions of jiggling electrons always sum to a predictable Gaussian curve',
        readMinutes: 5,
        steps: [
          {
            id: 'step-3-1-0',
            title: 'Deterministic vs. Random Signals',
            paragraphs: [
              'If you already know the exact message someone is going to send you, there is no point transmitting it! Real messages and receiver noise are both unpredictable—we model them as random (stochastic) signals.',
              'Even though we cannot predict the exact next voltage sample, we can predict its statistical habits: its average (mean μ) and how widely it swings around that average (standard deviation σ).',
            ],
            question: {
              id: 'q-3-1-0',
              kind: 'mcq',
              prompt:
                'If a pure +2 V DC battery signal has zero-mean random hiss added on top of it, what is the average (mean μ) of the combined voltage?',
              options: [
                { id: 'a', label: '+2 V' },
                { id: 'b', label: '0 V' },
                { id: 'c', label: 'It fluctuates randomly every second' },
              ],
              correctOptionId: 'a',
              hint: 'Zero-mean hiss averages to 0 over time, leaving the +2 V baseline.',
              explanation: 'E[2 + Noise] = 2 + E[Noise] = 2 + 0 = +2 V.',
            },
          },
          {
            id: 'step-3-1-1',
            title: 'Why Thermal Noise Forms a Bell Curve',
            paragraphs: [
              'Inside every warm resistor, billions of electrons bounce randomly. By the Central Limit Theorem, adding countless tiny independent kicks always produces the same symmetric bell curve: the Gaussian distribution.',
              'Its spread σ is the RMS noise voltage, while its square σ² equals the average noise power.',
            ],
            simulation: 'gaussian-pdf',
            question: {
              id: 'q-3-1-1',
              kind: 'keypad',
              prompt:
                'If zero-mean Gaussian noise has RMS standard deviation σ = 3 V, what is its average noise power (variance σ²) in V²?',
              placeholder: 'Enter variance',
              unitLabel: 'V²',
              preset: 'numeric',
              acceptedAnswers: ['9'],
              displayAnswer: '9 V²',
              hint: 'Square the standard deviation σ.',
              explanation: 'Average power of zero-mean noise equals its variance σ² = 3² = 9 V².',
            },
          },
          {
            id: 'step-3-1-2',
            title: 'Trading Peak Height for Spread',
            paragraphs: [
              'The total area under a probability density curve p(x) must always equal 1 (100% probability). If noise gets quieter (smaller σ), probability piles up taller around 0.',
              'Use the slider below to shrink σ and watch the bell spike upward.',
            ],
            question: {
              id: 'q-3-1-2',
              kind: 'slider-target',
              prompt:
                'Lower the noise standard deviation σ so the variance σ² drops to 0.36 or less (σ ≤ 0.6).',
              simulation: 'gaussian-pdf',
              parameterLabel: 'Noise Std. Dev (σ)',
              unit: '',
              min: 0.5,
              max: 2.2,
              step: 0.1,
              initialValue: 1.4,
              targetMin: 0.5,
              targetMax: 0.6,
              targetDescription: 'Set σ inside [0.5, 0.6]',
              hint: 'Drag σ left toward 0.5–0.6.',
              explanation:
                'Smaller σ tightly traps almost all noise samples near 0 V, keeping large error-causing voltage spikes rare.',
            },
          },
          {
            id: 'step-3-1-3',
            title: 'How Noise Tails Flip Bits',
            paragraphs: [
              'Suppose bit "0" is sent as −1 V and bit "1" is sent as +1 V, with decision boundary at 0 V. If bit "1" (+1 V) is sent, an error happens only when a negative noise spike drops below −1 V.',
              'That tiny tail area under the bell curve past the decision threshold—called the Q-function—governs every bit error rate formula in digital communications!',
            ],
            question: {
              id: 'q-3-1-3',
              kind: 'mcq',
              prompt:
                'You send +1 V for bit "1" (threshold 0 V). Which Gaussian noise sample causes a bit error?',
              options: [
                { id: 'a', label: 'Noise = −1.3 V (received voltage becomes −0.3 V < 0)' },
                { id: 'b', label: 'Noise = −0.4 V (received voltage becomes +0.6 V > 0)' },
                { id: 'c', label: 'Noise = +0.8 V' },
              ],
              correctOptionId: 'a',
              hint: 'Add +1 V to each noise sample and check if the sum crosses below 0 V.',
              explanation:
                '+1.0 + (−1.3) = −0.3 V, which lands on the negative side of 0 V and gets decoded wrongly as bit "0".',
            },
          },
        ],
        practice: [
          {
            id: 'p-3-1-1',
            title: 'Zero-Mean Symmetry',
            question: {
              id: 'pq-3-1-1',
              kind: 'keypad',
              prompt:
                'For zero-mean Gaussian noise, what is the probability P(N > 0) that a single sample is positive?',
              placeholder: 'Decimal or fraction',
              preset: 'numeric',
              acceptedAnswers: ['0.5', '1/2', '.5'],
              displayAnswer: '0.5',
              hint: 'The bell curve is symmetric around 0.',
              explanation: 'Exactly half of the area lies to the right of 0, so P(N > 0) = 0.5.',
            },
          },
          {
            id: 'p-3-1-2',
            title: 'The 68% Band',
            question: {
              id: 'pq-3-1-2',
              kind: 'mcq',
              prompt:
                'Roughly what fraction of Gaussian noise samples fall within ±1σ of the mean?',
              options: [
                { id: 'a', label: 'About 68%' },
                { id: 'b', label: 'Exactly 50%' },
                { id: 'c', label: 'About 99.7%' },
              ],
              correctOptionId: 'a',
              hint: 'Recall the 68–95–99.7 rule for ±1σ, ±2σ, ±3σ.',
              explanation: 'Roughly 68% of samples stay within ±1σ, 95% within ±2σ, and 99.7% within ±3σ.',
            },
          },
          {
            id: 'p-3-1-3',
            title: 'Independent Noise Addition',
            question: {
              id: 'pq-3-1-3',
              kind: 'keypad',
              prompt:
                'Two independent zero-mean noise sources with variances σ₁² = 4 and σ₂² = 5 add together. What is the combined variance?',
              placeholder: 'Enter variance',
              preset: 'numeric',
              acceptedAnswers: ['9'],
              displayAnswer: '9',
              hint: 'Variances of independent variables simply add.',
              explanation: 'Var(N₁ + N₂) = 4 + 5 = 9 (so the new RMS spread is √9 = 3).',
            },
          },
        ],
      },
      {
        id: 'mod-3-2',
        bookId: 'book-3',
        number: '3.2',
        title: 'Autocorrelation, SNR & White Noise',
        subtitle: 'Connecting time unpredictability to flat frequency spectra',
        readMinutes: 5,
        steps: [
          {
            id: 'step-3-2-0',
            title: 'How Fast Does a Random Signal Forget?',
            paragraphs: [
              'Weather temperature is random, yet today’s temperature strongly resembles tomorrow’s. Thermal noise, by contrast, changes wildly every nanosecond.',
              'The autocorrelation function R_xx(τ) measures how strongly a signal at time t correlates with itself τ seconds later.',
            ],
            formula: {
              expression: 'S_xx(f) = ℱ{ R_xx(τ) }',
              caption: 'Wiener-Khinchin theorem: Power Spectral Density is the Fourier transform of autocorrelation.',
            },
            question: {
              id: 'q-3-2-0',
              kind: 'mcq',
              prompt:
                'For a slowly drifting random signal whose samples stay correlated over long lags τ, what does its Power Spectral Density S_xx(f) look like?',
              options: [
                { id: 'a', label: 'Concentrated at low frequencies' },
                { id: 'b', label: 'Completely flat out to infinite frequency' },
              ],
              correctOptionId: 'a',
              hint: 'Wide in time (slowly varying) corresponds to narrow in frequency!',
              explanation:
                'Slow time fluctuations mean wide R_xx(τ), whose Fourier transform S_xx(f) hugs low frequencies.',
            },
          },
          {
            id: 'step-3-2-1',
            title: 'White Noise Spectrum',
            paragraphs: [
              'White light mixes all visible colors equally. Similarly, ideal white noise mixes all frequencies equally with a completely flat power spectral density S_nn(f) = N₀ / 2.',
              'Because its spectrum is flat across every frequency, its autocorrelation is an infinitely narrow spike δ(τ) at τ = 0—meaning two samples separated by any nonzero delay are totally uncorrelated.',
            ],
            question: {
              id: 'q-3-2-1',
              kind: 'mcq',
              prompt:
                'What does the Power Spectral Density S_nn(f) of ideal white noise look like across frequency?',
              options: [
                { id: 'a', label: 'A completely flat horizontal line' },
                { id: 'b', label: 'A single spike at f = 0' },
                { id: 'c', label: 'A decaying staircase' },
              ],
              correctOptionId: 'a',
              hint: 'Equal power per hertz everywhere.',
              explanation:
                'Ideal white noise carries constant power density N₀/2 at every frequency.',
            },
          },
          {
            id: 'step-3-2-2',
            title: 'Filtering White Noise & Signal-to-Noise Ratio',
            paragraphs: [
              'Inside a real receiver of bandwidth B (Hz), your front-end filter blocks out-of-band frequencies and captures total noise power P_N = N₀ · B.',
              'Comparing your useful signal power P_S against this captured noise power gives the most famous ratio in communications: Signal-to-Noise Ratio (SNR = P_S / P_N).',
            ],
            formula: {
              expression: 'P_N = N₀ · B     |     SNR = P_S / (N₀ · B)',
              caption: 'Narrower receiver bandwidth B captures less white noise, raising SNR.',
            },
            question: {
              id: 'q-3-2-2',
              kind: 'mcq',
              prompt:
                'If you cut your receiver filter’s bandwidth B in half (while keeping all of your signal intact), what happens to the total noise power P_N entering your detector?',
              options: [
                { id: 'a', label: 'Noise power drops by half (doubling SNR by +3 dB!)' },
                { id: 'b', label: 'Noise power doubles' },
                { id: 'c', label: 'Noise power stays the same' },
              ],
              correctOptionId: 'a',
              hint: 'P_N = N₀ · B is directly proportional to bandwidth B.',
              explanation:
                'Halving B rejects half the flat noise spectrum, halving P_N and boosting SNR by +3 dB.',
            },
          },
        ],
        practice: [
          {
            id: 'p-3-2-1',
            title: 'Filtered Noise Power',
            question: {
              id: 'pq-3-2-1',
              kind: 'keypad',
              prompt:
                'White noise with one-sided density N₀ = 2 mW/Hz passes through an ideal filter of bandwidth B = 5 Hz. What is the output noise power in mW?',
              placeholder: 'Enter mW',
              unitLabel: 'mW',
              preset: 'numeric',
              acceptedAnswers: ['10', '10mw'],
              displayAnswer: '10 mW',
              hint: 'P_N = N₀ × B.',
              explanation: 'P_N = 2 mW/Hz × 5 Hz = 10 mW.',
            },
          },
          {
            id: 'p-3-2-2',
            title: 'SNR in Decibels',
            question: {
              id: 'pq-3-2-2',
              kind: 'keypad',
              prompt:
                'A received signal has P_S = 100 mW and captured noise has P_N = 1 mW. What is the SNR in dB?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['20', '20db'],
              displayAnswer: '20 dB',
              hint: 'SNR = 100 / 1 = 100; convert ×100 power ratio to dB.',
              explanation: '10 · log₁₀(100) = 20 dB.',
            },
          },
          {
            id: 'p-3-2-3',
            title: 'Autocorrelation at Zero Lag',
            question: {
              id: 'pq-3-2-3',
              kind: 'mcq',
              prompt:
                'For any stationary signal x(t), what does R_xx(0) (zero lag) always equal?',
              options: [
                { id: 'a', label: 'Average signal power E[x²(t)]' },
                { id: 'b', label: 'Zero' },
                { id: 'c', label: 'Fundamental frequency f₀' },
              ],
              correctOptionId: 'a',
              hint: 'At τ = 0, you multiply x(t) by itself.',
              explanation: 'R_xx(0) = E[x(t)·x(t)] = E[x²(t)], the total average power.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'book-4',
    number: 'Book 4',
    title: 'Information Theory',
    lntRef: 'LNTwww · Information Theory',
    category: 'information',
    summary:
      'Measure information in bits, compress data down to Shannon entropy with Huffman trees, and calculate noisy channel capacity.',
    modules: [
      {
        id: 'mod-4-1',
        bookId: 'book-4',
        number: '4.1',
        title: 'Surprise, Bits & Shannon Entropy',
        subtitle: 'Why rare news carries more bits than predictable routine',
        readMinutes: 6,
        steps: [
          {
            id: 'step-4-1-0',
            title: 'Information as Yes/No Questions',
            paragraphs: [
              'Suppose a friend picks one square out of a 4-square grid. How many binary yes/no questions do you need to pinpoint it guaranteed? First ask "top or bottom?" (1 bit), then "left or right?" (1 bit)—2 bits total.',
              'Notice log₂(4) = 2. Each binary question cuts the remaining possibilities in half, which is why information naturally speaks in base-2 logarithms.',
            ],
            question: {
              id: 'q-4-1-0',
              kind: 'keypad',
              prompt:
                'How many binary yes/no questions (bits) does it take to identify one card out of 16 equally likely cards?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'entropy',
              acceptedAnswers: ['4', 'log2(16)'],
              displayAnswer: '4 bits',
              hint: 'Each question halves 16 → 8 → 4 → 2 → 1.',
              explanation: 'log₂(16) = 4 binary questions pinpoint any 1 of 16 equally likely choices.',
            },
          },
          {
            id: 'step-4-1-1',
            title: 'Self-Information (Surprise)',
            paragraphs: [
              'What if outcomes are NOT equally likely? Hearing "rain in Seattle" surprises nobody; hearing "snow in Sahara" shocks everyone. Claude Shannon defined the self-information of an event with probability P as I = −log₂(P) = log₂(1/P).',
              'Smaller probability means larger surprise—and when an event is 100% certain (P = 1), log₂(1) = 0 bits of information.',
            ],
            formula: {
              expression: 'I(x) = −log₂ P(x) = log₂(1 / P(x))   [bits]',
              caption: 'Self-information grows when probability P(x) shrinks.',
            },
            question: {
              id: 'q-4-1-1',
              kind: 'keypad',
              prompt:
                'An unlikely event occurs with probability P = 1/8. How many bits of self-information does it carry?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'entropy',
              acceptedAnswers: ['3', 'log2(8)'],
              displayAnswer: '3 bits',
              hint: 'Compute log₂(8).',
              explanation: 'I = log₂(1 / (1/8)) = log₂(8) = 3 bits.',
            },
          },
          {
            id: 'step-4-1-2',
            title: 'Average Surprise: Shannon Entropy H(X)',
            paragraphs: [
              'Rare events carry lots of surprise, but happen seldom. To judge a whole message source, we take the weighted average of surprise across all symbols: Shannon Entropy H(X) = ∑ P(x)·log₂(1/P(x)).',
              'Explore the binary coin entropy curve H(p) below. Drag p to see where uncertainty peaks.',
            ],
            question: {
              id: 'q-4-1-2',
              kind: 'slider-target',
              prompt:
                'Tune probability p to maximize the binary source entropy H(p) = 1.00 bit/symbol.',
              simulation: 'shannon-entropy',
              parameterLabel: 'Probability (p)',
              unit: '',
              min: 0,
              max: 1,
              step: 0.02,
              initialValue: 0.16,
              targetMin: 0.48,
              targetMax: 0.52,
              targetDescription: 'Maximize H(p) near p = 0.50',
              hint: 'A coin is maximally unpredictable when fair (50/50).',
              explanation:
                'At p = 0.50, both outcomes are equally likely and H(p) peaks at 1.0 bit per flip.',
            },
          },
          {
            id: 'step-4-1-3',
            title: 'Predictability Shrinks Entropy',
            paragraphs: [
              'If a coin is heavily rigged (99% Heads, 1% Tails), you almost always guess right before flipping! Its average surprise drops way down to H ≈ 0.08 bits per flip.',
              'Shannon’s Source Coding Theorem proves that H(X) is the exact physical speed limit of lossless compression: you can squeeze data down to H(X) bits/symbol on average, never lower.',
            ],
            question: {
              id: 'q-4-1-3',
              kind: 'mcq',
              prompt:
                'A sensor outputs "OK" 99% of the time and "Alert" 1% of the time. What does Shannon’s theorem promise?',
              options: [
                { id: 'a', label: 'Long logs can be losslessly compressed far below 1 bit per reading' },
                { id: 'b', label: 'Every reading must take at least 1 bit even after compression' },
              ],
              correctOptionId: 'a',
              hint: 'Look at H(0.99) on the curve—it sits close to 0.08 bits/symbol!',
              explanation:
                'Because H(0.99) ≈ 0.08 bits/symbol, run-length or arithmetic coding shrinks long logs more than 10× without losing a single reading.',
            },
          },
        ],
        practice: [
          {
            id: 'p-4-1-1',
            title: 'Uniform 32-Symbol Source',
            question: {
              id: 'pq-4-1-1',
              kind: 'keypad',
              prompt:
                'A source picks uniformly from 32 equally likely symbols. What is its entropy H(X) in bits/symbol?',
              placeholder: 'Enter bits',
              unitLabel: 'bits/sym',
              preset: 'entropy',
              acceptedAnswers: ['5', 'log2(32)'],
              displayAnswer: '5 bits/sym',
              hint: 'What power of 2 equals 32?',
              explanation: 'H = log₂(32) = 5 bits/symbol.',
            },
          },
          {
            id: 'p-4-1-2',
            title: 'Zero-Uncertainty Source',
            question: {
              id: 'pq-4-1-2',
              kind: 'keypad',
              prompt:
                'A stuck beacon transmits "1" with probability 1.0 every time. What is its entropy H(X)?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'entropy',
              acceptedAnswers: ['0'],
              displayAnswer: '0 bits',
              hint: 'No uncertainty means zero surprise.',
              explanation: 'Since P = 1, −1·log₂(1) = 0 bits.',
            },
          },
          {
            id: 'p-4-1-3',
            title: 'Two Fair Coins',
            question: {
              id: 'pq-4-1-3',
              kind: 'keypad',
              prompt:
                'You flip two independent fair coins. What is their combined joint entropy H(X₁, X₂) in bits?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'entropy',
              acceptedAnswers: ['2'],
              displayAnswer: '2 bits',
              hint: 'Independent entropies add: 1 bit + 1 bit.',
              explanation: 'H(X₁, X₂) = H(X₁) + H(X₂) = 1 + 1 = 2 bits.',
            },
          },
          {
            id: 'p-4-1-4',
            title: 'Quarter-Probability Surprise',
            question: {
              id: 'pq-4-1-4',
              kind: 'keypad',
              prompt:
                'A symbol has probability P = 1/4. How many bits of self-information I(x) does seeing it provide?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'entropy',
              acceptedAnswers: ['2', 'log2(4)'],
              displayAnswer: '2 bits',
              hint: 'I = log₂(1 / 0.25) = log₂(4).',
              explanation: 'log₂(4) = 2 bits.',
            },
          },
        ],
      },
      {
        id: 'mod-4-2',
        bookId: 'book-4',
        number: '4.2',
        title: 'Lossless Compression & Huffman Coding',
        subtitle: 'Giving common symbols short nicknames without scrambling the decoder',
        readMinutes: 5,
        steps: [
          {
            id: 'step-4-2-0',
            title: 'Why Morse Code Works',
            paragraphs: [
              'Samuel Morse noticed that English uses "E" and "T" constantly while "Q" and "Z" rarely appear. So he gave "E" a single short dot, and saved long dot-dash combos for rare letters.',
              'Fixed-length ASCII gives every character 8 bits regardless of frequency. Variable-length codes beat fixed-length codes by assigning fewer bits to frequent symbols!',
            ],
            question: {
              id: 'q-4-2-0',
              kind: 'mcq',
              prompt:
                'Suppose four symbols have probabilities A = 1/2, B = 1/4, C = 1/8, D = 1/8. Why does assigning {A:0, B:10, C:110, D:111} beat fixed 2-bit codes?',
              options: [
                { id: 'a', label: 'A occurs half the time and only spends 1 bit, dropping the average to 1.75 bits' },
                { id: 'b', label: 'Every symbol uses 3 bits' },
              ],
              correctOptionId: 'a',
              hint: 'Compute (1/2)(1) + (1/4)(2) + (1/8)(3) + (1/8)(3).',
              explanation:
                'Average length is 0.5 + 0.5 + 0.375 + 0.375 = 1.75 bits/symbol—beating the 2.0-bit fixed code and matching the source entropy!',
            },
          },
          {
            id: 'step-4-2-1',
            title: 'The Prefix-Free Rule (No Commas Needed)',
            paragraphs: [
              'If we stream bits continuously like "0101100", how does the receiver know where one symbol ends and the next begins without pauses?',
              'The secret is the prefix-free condition: no valid codeword can ever appear as the starting prefix of another valid codeword. That lets a decoder chop bits cleanly the instant a leaf is reached!',
            ],
            question: {
              id: 'q-4-2-1',
              kind: 'mcq',
              prompt:
                'Which codebook is cleanly prefix-free (no codeword starts any other)?',
              options: [
                { id: 'a', label: '{ 0, 10, 110, 111 }' },
                { id: 'b', label: '{ 0, 01, 10, 11 }' },
                { id: 'c', label: '{ 1, 10, 101 }' },
              ],
              correctOptionId: 'a',
              hint: 'In B, "0" is the start of "01". In C, "1" is the start of "10".',
              explanation:
                'In {0, 10, 110, 111}, reading a 0 immediately completes a symbol, so no word prefixes another.',
            },
          },
          {
            id: 'step-4-2-2',
            title: 'Decoding a Prefix-Free Stream',
            paragraphs: [
              'Because prefix-free codes form a binary tree where every codeword sits on a leaf, decoding is instant and unambiguous—just read left-to-right until a leaf matches.',
              'Try decoding a short message in your head below.',
            ],
            question: {
              id: 'q-4-2-2',
              kind: 'mcq',
              prompt:
                'Using codebook { A = 0, B = 10, C = 110, D = 111 }, what three letters decode from the bitstream "100110"?',
              options: [
                { id: 'a', label: 'B A C' },
                { id: 'b', label: 'A B C' },
                { id: 'c', label: 'B D A' },
              ],
              correctOptionId: 'a',
              hint: 'Scan from left: "10" matches B, next "0" matches A, remaining "110" matches…',
              explanation: '10 → B, 0 → A, 110 → C, giving BAC cleanly with zero separator symbols.',
            },
          },
        ],
        practice: [
          {
            id: 'p-4-2-1',
            title: 'Entropy Lower Bound',
            question: {
              id: 'pq-4-2-1',
              kind: 'keypad',
              prompt:
                'A binary source has entropy H(X) = 0.6 bits/symbol, and an engineer designs a lossless code averaging 0.8 bits/symbol. How many bits/symbol of redundancy remain?',
              placeholder: 'Enter decimal',
              unitLabel: 'bits/sym',
              preset: 'entropy',
              acceptedAnswers: ['0.2', '.2'],
              displayAnswer: '0.2 bits/sym',
              hint: 'Redundancy = Average length − Entropy H(X).',
              explanation: '0.8 − 0.6 = 0.2 bits/symbol above the theoretical entropy floor.',
            },
          },
          {
            id: 'p-4-2-2',
            title: 'Huffman Pairing Principle',
            question: {
              id: 'pq-4-2-2',
              kind: 'mcq',
              prompt:
                'When David Huffman built an optimal prefix-free tree, which two symbols did he always merge first at the bottom of the tree?',
              options: [
                { id: 'a', label: 'The two LEAST probable symbols (giving them the longest codewords)' },
                { id: 'b', label: 'The two MOST probable symbols' },
              ],
              correctOptionId: 'a',
              hint: 'Rare symbols belong deepest in the tree so frequent symbols stay near the root.',
              explanation:
                'Huffman coding repeatedly merges the two lowest-probability nodes, pushing rare symbols to longer bit lengths.',
            },
          },
          {
            id: 'p-4-2-3',
            title: 'Kraft Inequality Check',
            question: {
              id: 'pq-4-2-3',
              kind: 'mcq',
              prompt:
                'Can ANY prefix-free binary code have two codewords of length 1 (both "0" and "1") AND a third codeword "01"?',
              options: [
                { id: 'a', label: 'No—"0" already claims the entire 0-branch, blocking "01"' },
                { id: 'b', label: 'Yes, if "01" is rare' },
              ],
              correctOptionId: 'a',
              hint: 'Both branches from the root (0 and 1) are already leaves!',
              explanation:
                'Once 0 and 1 are assigned as codewords, the entire binary tree is full (Kraft sum 1/2 + 1/2 = 1).',
            },
          },
        ],
      },
      {
        id: 'mod-4-3',
        bookId: 'book-4',
        number: '4.3',
        title: 'Mutual Information & Channel Capacity',
        subtitle: 'The ultimate speed limit of any noisy radio, fiber, or copper link',
        readMinutes: 6,
        steps: [
          {
            id: 'step-4-3-0',
            title: 'What Survives a Noisy Channel?',
            paragraphs: [
              'Suppose you transmit X, and random channel noise corrupts it into received symbol Y. Before seeing Y, your uncertainty about X was H(X).',
              'After observing Y, some uncertainty H(X|Y) remains because of noise. The information that actually survived the trip—Mutual Information—is I(X; Y) = H(X) − H(X|Y).',
            ],
            formula: {
              expression: 'I(X; Y) = H(X) − H(X | Y)',
              caption: 'Mutual information: initial uncertainty minus remaining doubt after observing output Y.',
            },
            question: {
              id: 'q-4-3-0',
              kind: 'mcq',
              prompt:
                'If a channel is completely disconnected so the output Y is pure unrelated static, what is the mutual information I(X; Y)?',
              options: [
                { id: 'a', label: '0 bits (seeing Y leaves your doubt H(X|Y) equal to H(X))' },
                { id: 'b', label: 'Infinite bits' },
                { id: 'c', label: 'Equal to H(X)' },
              ],
              correctOptionId: 'a',
              hint: 'If Y tells you nothing about X, H(X|Y) = H(X).',
              explanation: 'H(X) − H(X) = 0 bits: pure static reveals zero information about the input.',
            },
          },
          {
            id: 'step-4-3-1',
            title: 'The Shannon-Hartley Speed Limit',
            paragraphs: [
              'For a continuous channel of bandwidth B (Hz) corrupted by white Gaussian noise with signal-to-noise power ratio SNR = P_S / P_N, maximizing mutual information yields the iconic Shannon-Hartley theorem.',
              'Below capacity C (bits/s), clever error-correcting codes can achieve virtually zero errors; above C, errors are mathematically guaranteed.',
            ],
            formula: {
              expression: 'C = B · log₂(1 + SNR)   [bits/s]',
              caption: 'Notice SNR here is the linear power ratio P_S/P_N, not decibels.',
            },
            question: {
              id: 'q-4-3-1',
              kind: 'keypad',
              prompt:
                'A 10 MHz wireless channel has linear SNR = 3 (signal power is 3× noise power). What is its Shannon capacity C in Mbps?',
              placeholder: 'Enter Mbps',
              unitLabel: 'Mbps',
              preset: 'entropy',
              acceptedAnswers: ['20', '20mbps'],
              displayAnswer: '20 Mbps',
              hint: 'Compute 1 + 3 = 4, take log₂(4) = 2, then multiply by 10 MHz.',
              explanation: 'C = 10 MHz × log₂(1 + 3) = 10 × 2 = 20 Mbps.',
            },
          },
          {
            id: 'step-4-3-2',
            title: 'Bandwidth vs. Power: Why Spectrum Is Gold',
            paragraphs: [
              'Look closely at C = B · log₂(1 + SNR). Bandwidth B sits outside the logarithm (linear reward!), whereas SNR sits inside log₂ (diminishing returns!).',
              'Play with the sliders below: notice how doubling bandwidth doubles speed immediately, while doubling power barely nudges C/B upward at high SNR.',
            ],
            simulation: 'channel-capacity',
            question: {
              id: 'q-4-3-2',
              kind: 'mcq',
              prompt:
                'Why do 5G and Wi-Fi 7 chase wider 160 MHz and 320 MHz spectrum channels rather than just cranking up transmit power?',
              options: [
                { id: 'a', label: 'Capacity scales linearly with bandwidth B, but only logarithmically with power' },
                { id: 'b', label: 'Radio waves cannot carry power above 1 Watt' },
              ],
              correctOptionId: 'a',
              hint: 'Compare B × log₂(…) versus log₂(1 + 2·SNR).',
              explanation:
                'Doubling B doubles capacity directly (at fixed SNR), whereas doubling transmit power adds at most 1 bit/s/Hz.',
            },
          },
        ],
        practice: [
          {
            id: 'p-4-3-1',
            title: 'SNR = 7 Channel Capacity',
            question: {
              id: 'pq-4-3-1',
              kind: 'keypad',
              prompt:
                'With bandwidth B = 5 MHz and linear SNR = 7, what is the Shannon capacity C in Mbps?',
              placeholder: 'Enter Mbps',
              unitLabel: 'Mbps',
              preset: 'entropy',
              acceptedAnswers: ['15', '15mbps'],
              displayAnswer: '15 Mbps',
              hint: '1 + 7 = 8, and log₂(8) = 3.',
              explanation: 'C = 5 MHz × log₂(8) = 5 × 3 = 15 Mbps.',
            },
          },
          {
            id: 'p-4-3-2',
            title: 'Zero-dB Spectral Efficiency',
            question: {
              id: 'pq-4-3-2',
              kind: 'keypad',
              prompt:
                'At 0 dB SNR (signal power equals noise power, SNR = 1), what is the spectral efficiency C / B in bps/Hz?',
              placeholder: 'Enter bps/Hz',
              unitLabel: 'bps/Hz',
              preset: 'numeric',
              acceptedAnswers: ['1'],
              displayAnswer: '1 bps/Hz',
              hint: 'Compute log₂(1 + 1).',
              explanation: 'log₂(1 + 1) = log₂(2) = 1 bit/s/Hz.',
            },
          },
          {
            id: 'p-4-3-3',
            title: 'High Spectral Efficiency Target',
            question: {
              id: 'pq-4-3-3',
              kind: 'slider-target',
              prompt:
                'Raise the Channel SNR (dB) until spectral efficiency C/B reaches at least 5 bps/Hz (place SNR inside [15, 20] dB).',
              simulation: 'channel-capacity',
              parameterLabel: 'Channel SNR',
              unit: 'dB',
              min: 0,
              max: 30,
              step: 1,
              initialValue: 6,
              targetMin: 15,
              targetMax: 20,
              targetDescription: 'Set SNR inside [15, 20] dB',
              hint: '5 bps/Hz requires 1 + SNR = 32 → SNR ≈ 31 ≈ 15 dB.',
              explanation: 'At 15–20 dB, C/B climbs past 5 bps/Hz (over 50 Mbps in a 10 MHz channel).',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'book-5',
    number: 'Book 5',
    title: 'Modulation Methods',
    lntRef: 'LNTwww · Modulation Methods',
    category: 'transmission',
    summary:
      'Carry messages over radio waves using AM/FM foundations, digital ASK/FSK/BPSK, multi-bit QAM constellations, and OFDM subcarriers.',
    modules: [
      {
        id: 'mod-5-1',
        bookId: 'book-5',
        number: '5.1',
        title: 'Analog Roots: AM, FM & Carrier Waves',
        subtitle: 'Why signals need high-frequency radio carriers to fly through thin air',
        readMinutes: 5,
        steps: [
          {
            id: 'step-5-1-0',
            title: 'Why We Need a Carrier Wave',
            paragraphs: [
              'Your voice vibrates slowly around 1 kHz, which corresponds to a radio wavelength of 300 kilometers! To radiate 1 kHz efficiently into the air, you would need an antenna miles tall.',
              'Modulation solves this by stamping your slow baseband message onto a fast high-frequency carrier cos(2πf_c t)—shifting your signal up to gigahertz bands where pocket-sized antennas shine.',
            ],
            question: {
              id: 'q-5-1-0',
              kind: 'mcq',
              prompt:
                'Aside from allowing tiny antennas, what other huge problem does modulating onto different carrier frequencies f_c solve?',
              options: [
                { id: 'a', label: 'Many stations (FM radio, Wi-Fi, GPS) can share the air without colliding' },
                { id: 'b', label: 'It eliminates the speed of light' },
                { id: 'c', label: 'It deletes noise completely' },
              ],
              correctOptionId: 'a',
              hint: 'Think about tuning your car radio dial from 98.1 MHz to 101.5 MHz.',
              explanation:
                'Frequency-division multiplexing places each transmitter at its own carrier f_c so receivers can tune into one channel at a time.',
            },
          },
          {
            id: 'step-5-1-1',
            title: 'Amplitude Modulation (AM)',
            paragraphs: [
              'Every cosine carrier A · cos(2πf_c t + φ) has three knobs you can twist to encode information: its height (amplitude), its speed (frequency), or its timing (phase).',
              'In Amplitude Modulation (AM), the slow message m(t) scales the carrier’s height up and down like a volume envelope. Multiplying by cos(2πf_c t) shifts the message’s spectrum up to ±f_c, doubling its occupied bandwidth to 2·B.',
            ],
            formula: {
              expression: 's_AM(t) = [A₀ + m(t)] · cos(2πf_c t)',
              caption: 'Standard AM: message m(t) rides inside the carrier amplitude envelope.',
            },
            question: {
              id: 'q-5-1-1',
              kind: 'keypad',
              prompt:
                'A baseband voice signal spans 0 to 5 kHz (B = 5 kHz). When modulated onto an AM radio station (producing both upper and lower sidebands), how wide is the total AM bandwidth in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'frequency',
              acceptedAnswers: ['10', '10khz'],
              displayAnswer: '10 kHz',
              hint: 'Double-sideband AM occupies f_c − B to f_c + B, total width 2·B.',
              explanation: '2 × 5 kHz = 10 kHz (5 kHz lower sideband + 5 kHz upper sideband).',
            },
          },
          {
            id: 'step-5-1-2',
            title: 'Frequency Modulation (FM) & Constant Envelope',
            paragraphs: [
              'Lightning, car ignitions, and fading alter a radio wave’s amplitude—creating awful crackles on AM radio. Frequency Modulation (FM) keeps the wave’s height completely constant and instead speeds up or slows down the carrier’s instantaneous frequency.',
              'Because the information hides in zero-crossings (timing) rather than wave height, an FM receiver can slice off amplitude noise spikes before demodulating—trading extra radio bandwidth for crystal-clear audio!',
            ],
            question: {
              id: 'q-5-1-2',
              kind: 'mcq',
              prompt:
                'Why does FM radio sound dramatically cleaner than AM radio during thunderstorms?',
              options: [
                { id: 'a', label: 'Lightning spikes corrupt amplitude, whereas FM hides the message in frequency variations' },
                { id: 'b', label: 'FM waves travel around storms' },
                { id: 'c', label: 'FM uses zero bandwidth' },
              ],
              correctOptionId: 'a',
              hint: 'FM receivers use a "limiter" to clip away amplitude bumps.',
              explanation:
                'Since FM has a constant envelope, amplitude noise can be clipped off cleanly without harming the frequency-encoded audio.',
            },
          },
        ],
        practice: [
          {
            id: 'p-5-1a-1',
            title: 'Three Carrier Knobs',
            question: {
              id: 'pq-5-1a-1',
              kind: 'mcq',
              prompt:
                'Which three properties of a sinusoidal carrier can be modulated to carry information?',
              options: [
                { id: 'a', label: 'Amplitude, Frequency, and Phase' },
                { id: 'b', label: 'Mass, Temperature, and Voltage' },
                { id: 'c', label: 'Sampling rate, Bit depth, and Checksum' },
              ],
              correctOptionId: 'a',
              hint: 'Look at A · cos(2πf_c t + φ).',
              explanation: 'A sinusoid is completely governed by Amplitude (A), Frequency (f_c), and Phase (φ).',
            },
          },
          {
            id: 'p-5-1a-2',
            title: 'AM Sideband Frequencies',
            question: {
              id: 'pq-5-1a-2',
              kind: 'keypad',
              prompt:
                'A 2 kHz pure tone modulates a 100 kHz AM carrier. What is the frequency of the upper sideband in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'frequency',
              acceptedAnswers: ['102', '102khz'],
              displayAnswer: '102 kHz',
              hint: 'Upper sideband sits at f_c + f_m.',
              explanation: '100 kHz + 2 kHz = 102 kHz (and the lower sideband sits at 98 kHz).',
            },
          },
          {
            id: 'p-5-1a-3',
            title: 'Carson’s FM Bandwidth Rule',
            question: {
              id: 'pq-5-1a-3',
              kind: 'keypad',
              prompt:
                'Carson’s rule estimates FM bandwidth as B_FM ≈ 2 · (Δf + f_m). If peak frequency deviation Δf = 75 kHz and audio f_m = 15 kHz, what is B_FM in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'frequency',
              acceptedAnswers: ['180', '180khz'],
              displayAnswer: '180 kHz',
              hint: 'Add 75 + 15 = 90, then multiply by 2.',
              explanation: '2 × (75 + 15) = 180 kHz—matching commercial 200 kHz FM broadcast channel spacing!',
            },
          },
        ],
      },
      {
        id: 'mod-5-2',
        bookId: 'book-5',
        number: '5.2',
        title: 'Digital Keying: ASK, FSK & BPSK',
        subtitle: 'Sending 0s and 1s one bit at a time with amplitude, frequency, or phase flips',
        readMinutes: 6,
        steps: [
          {
            id: 'step-5-2a-0',
            title: 'From Smooth Knobs to Digital Switches',
            paragraphs: [
              'Digital modulation uses the exact same three carrier knobs—amplitude, frequency, and phase—except instead of twisting them smoothly, we snap them between discrete preset states for each bit.',
              'Toggle between ASK, FSK, and BPSK in the interactive waveform viewer below and tap the 4 bits to watch how each scheme paints 1s and 0s onto the carrier.',
            ],
            simulation: 'modulation-waves',
            question: {
              id: 'q-5-2a-0',
              kind: 'mcq',
              prompt:
                'In the waveform simulator above, switch to ASK (Amplitude-Shift Keying). How does ASK distinguish a "1" from a "0"?',
              options: [
                { id: 'a', label: 'Tall wave amplitude for "1", low/zero amplitude for "0"' },
                { id: 'b', label: 'Faster wiggles for "1", slower wiggles for "0"' },
                { id: 'c', label: 'Flipping the wave upside down' },
              ],
              correctOptionId: 'a',
              hint: 'Look at the vertical height of slot 2 (bit 0) vs slot 1 (bit 1) in ASK mode.',
              explanation:
                'ASK encodes bits by stepping the carrier’s amplitude height (On-Off Keying drops bit 0 all the way to zero).',
            },
          },
          {
            id: 'step-5-2a-1',
            title: 'Frequency-Shift Keying (FSK)',
            paragraphs: [
              'Switch the simulator above to FSK. Now the amplitude stays completely flat and steady—instead, bit "1" hops to a faster carrier tone f₁ while bit "0" hops to a slower tone f₀.',
              'Bluetooth Classic and many low-power IoT radios love FSK because constant-amplitude waves let cheap, battery-friendly amplifiers run at maximum efficiency.',
            ],
            question: {
              id: 'q-5-2a-1',
              kind: 'mcq',
              prompt:
                'Why does FSK work better than ASK when radio signal strength fluctuates wildly due to fading?',
              options: [
                { id: 'a', label: 'The receiver only cares which tone frequency arrived, not how tall the wave is' },
                { id: 'b', label: 'FSK does not use a carrier' },
              ],
              correctOptionId: 'a',
              hint: 'In ASK, a sudden fade can make a "1" look short like a "0"!',
              explanation:
                'Because FSK keeps constant amplitude and encodes bits in frequency, fading doesn’t confuse "1" and "0" thresholds as easily.',
            },
          },
          {
            id: 'step-5-2a-2',
            title: 'Binary Phase-Shift Keying (BPSK)',
            paragraphs: [
              'Now switch the simulator to BPSK and set bits to [1, 0, 1, 1]. Notice that at the boundary between 1 and 0, the carrier flips 180° upside down: +cos(2πf_c t) for bit "1" and −cos(2πf_c t) for bit "0"!',
              'Because +1 and −1 point in exact opposite directions, BPSK achieves the widest possible separation for a given transmit power—making it the gold standard for deep-space probes like Voyager.',
            ],
            question: {
              id: 'q-5-2a-2',
              kind: 'keypad',
              prompt:
                'In BPSK, what is the phase angle separation (in degrees) between the carrier representing bit "1" (+cos) and bit "0" (−cos)?',
              placeholder: 'Enter degrees',
              unitLabel: '°',
              preset: 'numeric',
              acceptedAnswers: ['180'],
              displayAnswer: '180°',
              hint: 'Flipping a wave upside down shifts its phase by half a full 360° cycle.',
              explanation: '−cos(θ) = cos(θ + 180°), giving maximum antipodal 180° separation.',
            },
          },
        ],
        practice: [
          {
            id: 'p-5-2a-1',
            title: 'On-Off Keying Example',
            question: {
              id: 'pq-5-2a-1',
              kind: 'mcq',
              prompt:
                'Fiber-optic links and garage door openers often flash light/radio ON for bit "1" and completely OFF for bit "0". Which modulation family is this?',
              options: [
                { id: 'a', label: 'ASK (specifically On-Off Keying)' },
                { id: 'b', label: 'FSK' },
                { id: 'c', label: 'BPSK' },
              ],
              correctOptionId: 'a',
              hint: 'Turning power ON and OFF varies the amplitude.',
              explanation: 'On-Off Keying (OOK) is the simplest binary form of Amplitude-Shift Keying.',
            },
          },
          {
            id: 'p-5-2a-2',
            title: 'Best Distance for Fixed Energy',
            question: {
              id: 'pq-5-2a-2',
              kind: 'mcq',
              prompt:
                'At the same average transmit power, which binary scheme places its "0" and "1" signals farthest apart in signal space (lowest error rate)?',
              options: [
                { id: 'a', label: 'BPSK (+1 and −1 antipodal waves)' },
                { id: 'b', label: 'On-Off Keying (0 and +1)' },
                { id: 'c', label: 'Orthogonal FSK' },
              ],
              correctOptionId: 'a',
              hint: 'Opposite directions (+A and −A) have distance 2A, vs distance A for OOK.',
              explanation:
                'BPSK’s antipodal (+1, −1) signals give a 3 dB power advantage over orthogonal FSK or OOK.',
            },
          },
          {
            id: 'p-5-2a-3',
            title: 'Bit Rate of Binary Keying',
            question: {
              id: 'pq-5-2a-3',
              kind: 'keypad',
              prompt:
                'A BPSK radio sends 5,000 symbols per second (1 bit per symbol). What is its bit rate in bps?',
              placeholder: 'Enter bps',
              unitLabel: 'bps',
              preset: 'modulation',
              acceptedAnswers: ['5000', '5000bps'],
              displayAnswer: '5000 bps',
              hint: '1 bit per symbol × 5,000 symbols/s.',
              explanation: 'With 1 bit/symbol, symbol rate (baud) equals bit rate: 5,000 bps.',
            },
          },
        ],
      },
      {
        id: 'mod-5-3',
        bookId: 'book-5',
        number: '5.3',
        title: 'I-Q Constellations: QPSK, 8-PSK & QAM',
        subtitle: 'Packing multiple bits into every symbol using 2D In-phase & Quadrature maps',
        readMinutes: 7,
        steps: [
          {
            id: 'step-5-3-0',
            title: 'Two Orthogonal Lanes at Once',
            paragraphs: [
              'BPSK only sends 1 bit per symbol because it uses a single cosine axis. How can we send TWO independent streams at the exact same carrier frequency without them mixing?',
              'Mathematics gives us a gift: cos(2πf_c t) and sin(2πf_c t) (shifted by 90°) are orthogonal! Multiplying and averaging over a cycle lets a receiver separate the In-phase (I) cosine and Quadrature (Q) sine lanes cleanly.',
            ],
            question: {
              id: 'q-5-3-0',
              kind: 'keypad',
              prompt:
                'What phase angle (in degrees) separates the In-phase (I) cosine wave and the Quadrature (Q) sine wave?',
              placeholder: 'Enter degrees',
              unitLabel: '°',
              preset: 'numeric',
              acceptedAnswers: ['90'],
              displayAnswer: '90°',
              hint: 'Think of perpendicular X and Y axes.',
              explanation: 'Sine and cosine are 90° (π/2 radians) apart, making them orthogonal axes.',
            },
          },
          {
            id: 'step-5-3-1',
            title: 'Constellation Diagrams & M-ary Packing',
            paragraphs: [
              'Because we control both I and Q independently, every symbol becomes a 2D coordinate (I, Q) on a map called a constellation diagram. With M = 4 corners (QPSK), each point encodes log₂(4) = 2 bits.',
              'With 16-QAM (a 4×4 grid), each symbol carries 4 bits; with 64-QAM (an 8×8 grid), each symbol carries 6 bits!',
            ],
            formula: {
              expression: 'k = log₂(M)   [bits per symbol]',
              caption: 'Number of bits encoded per constellation point of size M.',
            },
            question: {
              id: 'q-5-3-1',
              kind: 'keypad',
              prompt:
                'A 64-QAM Wi-Fi constellation arranges M = 64 points in an 8×8 grid. How many bits does each symbol carry?',
              placeholder: 'Enter bits/sym',
              unitLabel: 'bits/sym',
              preset: 'modulation',
              acceptedAnswers: ['6', 'log2(64)'],
              displayAnswer: '6 bits/sym',
              hint: '2 raised to what power equals 64?',
              explanation: 'Since 2⁶ = 64, every 64-QAM symbol conveys 6 bits at once.',
            },
          },
          {
            id: 'step-5-3-2',
            title: 'Noise Clouds & Adaptive Modulation',
            paragraphs: [
              'Toggle between BPSK, QPSK, and 16-QAM below while dragging SNR. Packing 16 points into the same power box forces dots much closer together!',
              'That is why your phone drops smoothly from 64-QAM down to 16-QAM or QPSK as you walk away from a Wi-Fi router and SNR weakens.',
            ],
            simulation: 'constellation-awgn',
            question: {
              id: 'q-5-3-2',
              kind: 'mcq',
              prompt:
                'Comparing QPSK and 16-QAM at the same total transmit power and 10 dB SNR, which constellation suffers more symbol errors?',
              options: [
                { id: 'a', label: '16-QAM (its dots sit much closer together, so noise clouds overlap)' },
                { id: 'b', label: 'QPSK (4 dots are harder to separate than 16)' },
              ],
              correctOptionId: 'a',
              hint: 'Switch between QPSK and 16-QAM at 10 dB in the simulator above.',
              explanation:
                'Higher-order QAM buys higher speed at the expense of tight spacing, requiring higher SNR.',
            },
          },
          {
            id: 'step-5-3-3',
            title: 'Gray Coding Neighboring Points',
            paragraphs: [
              'When noise does nudge a symbol slightly over a decision line, it almost always lands in an immediate neighboring cell rather than across the map.',
              'To minimize damage, engineers label adjacent constellation dots with Gray codes—bit patterns differing by only 1 bit—so a 1-symbol slip causes just 1 bit error.',
            ],
            question: {
              id: 'q-5-3-3',
              kind: 'mcq',
              prompt:
                'In Gray-coded QPSK going clockwise: 00 → 01 → 11 → ?, what must the fourth corner label be?',
              options: [
                { id: 'a', label: '10 (differs by 1 bit from both 11 and 00)' },
                { id: 'b', label: '00' },
                { id: 'c', label: '11' },
              ],
              correctOptionId: 'a',
              hint: 'Each step around the circle flips only one bit.',
              explanation: '00 → 01 → 11 → 10 → 00 flips exactly one bit on every adjacent edge.',
            },
          },
        ],
        practice: [
          {
            id: 'p-5-3-1',
            title: 'Symbol Rate to Bit Rate',
            question: {
              id: 'pq-5-3-1',
              kind: 'keypad',
              prompt:
                'An 8-PSK modem (3 bits/symbol) transmits 1,000 symbols per second. What is its raw bit rate in bps?',
              placeholder: 'Enter bps',
              unitLabel: 'bps',
              preset: 'modulation',
              acceptedAnswers: ['3000', '3000bps'],
              displayAnswer: '3000 bps',
              hint: '1,000 symbols/s × 3 bits/symbol.',
              explanation: '1,000 × 3 = 3,000 bps.',
            },
          },
          {
            id: 'p-5-3-2',
            title: 'Constellation Size for 5 Bits',
            question: {
              id: 'pq-5-3-2',
              kind: 'keypad',
              prompt:
                'How many constellation points M are required to carry 5 bits per symbol?',
              placeholder: 'Enter M',
              preset: 'modulation',
              acceptedAnswers: ['32', '2^5'],
              displayAnswer: '32',
              hint: 'M = 2⁵.',
              explanation: '2⁵ = 32 constellation symbols (32-QAM).',
            },
          },
          {
            id: 'p-5-3-3',
            title: 'Clean Constellation SNR',
            question: {
              id: 'pq-5-3-3',
              kind: 'slider-target',
              prompt:
                'Adjust SNR so the amber noise scatter hugs the blue symbols tightly (set SNR inside [18, 22] dB).',
              simulation: 'constellation-awgn',
              parameterLabel: 'Channel SNR',
              unit: 'dB',
              min: 2,
              max: 24,
              step: 1,
              initialValue: 6,
              targetMin: 18,
              targetMax: 22,
              targetDescription: 'Set SNR inside [18, 22] dB',
              hint: 'Slide right to 18–22 dB.',
              explanation: 'High SNR shrinks σ so even dense 16-QAM clouds stay cleanly separated.',
            },
          },
          {
            id: 'p-5-3-4',
            title: 'PSK vs. QAM',
            question: {
              id: 'pq-5-3-4',
              kind: 'mcq',
              prompt:
                'What distinguishes 16-QAM from 16-PSK?',
              options: [
                { id: 'a', label: '16-QAM varies BOTH amplitude and phase (a 4×4 grid), spacing points farther apart than a single 16-PSK circle' },
                { id: 'b', label: '16-QAM only uses 1 bit per symbol' },
              ],
              correctOptionId: 'a',
              hint: 'Putting 16 dots on one circle crowds them tightly; spreading across a 2D square grid opens up room!',
              explanation:
                'QAM modulates both amplitude and phase across the I-Q grid, outperforming PSK above 8 points.',
            },
          },
        ],
      },
      {
        id: 'mod-5-4',
        bookId: 'book-5',
        number: '5.4',
        title: 'OFDM & Subcarrier Orthogonality',
        subtitle: 'How 4G, 5G, and Wi-Fi defeat multipath echoes using parallel slow lanes',
        readMinutes: 5,
        steps: [
          {
            id: 'step-5-4-0',
            title: 'Many Slow Lanes Beat One Fast Lane',
            paragraphs: [
              'Remember Intersymbol Interference from Book 2? Sending 100 million symbols per second on a single carrier makes each symbol tiny (10 ns), so a 100 ns wall echo smears 10 symbols together.',
              'OFDM (Orthogonal Frequency-Division Multiplexing) splits that single fast stream across N parallel subcarriers—making each symbol N times longer so echoes become harmless!',
            ],
            formula: {
              expression: 'Δf = 1 / T_sym',
              caption: 'Orthogonal subcarrier spacing equals the reciprocal of the OFDM symbol duration.',
            },
            question: {
              id: 'q-5-4-0',
              kind: 'keypad',
              prompt:
                'An OFDM symbol lasts T_sym = 4 μs (4 × 10⁻⁶ s). What is the orthogonal subcarrier spacing Δf in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'frequency',
              acceptedAnswers: ['250', '250khz'],
              displayAnswer: '250 kHz',
              hint: '1 / 0.000004 = 250,000 Hz = 250 kHz.',
              explanation: 'Δf = 1 / 4 μs = 250 kHz.',
            },
          },
          {
            id: 'step-5-4-1',
            title: 'Overlapping Without Crosstalk',
            paragraphs: [
              'Ordinary radio channels leave empty guard gaps between stations so filters can separate them, wasting spectrum. OFDM packs subcarriers so tightly that their sinc spectra overlap heavily.',
              'Yet at the exact center frequency of any subcarrier k, every other subcarrier passes straight through ZERO! That mathematical orthogonality packs maximum data per hertz with zero crosstalk.',
            ],
            question: {
              id: 'q-5-4-1',
              kind: 'mcq',
              prompt:
                'Why don’t overlapping OFDM subcarriers interfere with one another at the receiver?',
              options: [
                { id: 'a', label: 'At each subcarrier’s peak, every neighboring subcarrier’s spectrum equals zero' },
                { id: 'b', label: 'Only one subcarrier transmits at a time' },
              ],
              correctOptionId: 'a',
              hint: 'Spacing Δf = 1/T_sym places neighbor nulls right on top of each peak.',
              explanation:
                'Choosing Δf = 1/T_sym makes subcarriers mutually orthogonal over the symbol window.',
            },
          },
          {
            id: 'step-5-4-2',
            title: 'The Cyclic Prefix & FFT Magic',
            paragraphs: [
              'To stop wall echoes from leaking between consecutive OFDM symbols, transmitters copy a sliver from the end of each symbol and paste it onto the front as a guard interval called the Cyclic Prefix.',
              'Better yet, instead of needing 1,000 physical oscillators, phones compute all N subcarriers simultaneously in silicon using one Inverse FFT at the transmitter and one FFT at the receiver!',
            ],
            question: {
              id: 'q-5-4-2',
              kind: 'mcq',
              prompt:
                'Which algorithm turns N parallel OFDM subcarriers into one fast digital hardware block?',
              options: [
                { id: 'a', label: 'Fast Fourier Transform (IFFT / FFT)' },
                { id: 'b', label: 'Analog crystal tuning' },
                { id: 'c', label: 'Huffman tree sorting' },
              ],
              correctOptionId: 'a',
              hint: 'Subcarriers are discrete complex sinusoids spaced by Δf = 1/T_sym.',
              explanation: 'An N-point IFFT synthesizes all N orthogonal subcarriers simultaneously in O(N log N) operations.',
            },
          },
        ],
        practice: [
          {
            id: 'p-5-4-1',
            title: '5G Numerology Trade-Off',
            question: {
              id: 'pq-5-4-1',
              kind: 'mcq',
              prompt:
                '4G LTE uses Δf = 15 kHz. If 5G doubles subcarrier spacing to Δf = 30 kHz, what happens to the useful symbol duration T_sym?',
              options: [
                { id: 'a', label: 'It halves (faster symbols, lower latency)' },
                { id: 'b', label: 'It doubles' },
              ],
              correctOptionId: 'a',
              hint: 'T_sym = 1 / Δf.',
              explanation: 'Doubling Δf cuts T_sym in half, enabling ultra-low-latency 5G slots.',
            },
          },
          {
            id: 'p-5-4-2',
            title: 'Total OFDM Bandwidth',
            question: {
              id: 'pq-5-4-2',
              kind: 'keypad',
              prompt:
                'An OFDM frame packs 64 active subcarriers spaced Δf = 10 kHz apart. Roughly how wide is the occupied bandwidth in kHz?',
              placeholder: 'Enter kHz',
              unitLabel: 'kHz',
              preset: 'frequency',
              acceptedAnswers: ['640', '640khz'],
              displayAnswer: '640 kHz',
              hint: '64 × 10 kHz.',
              explanation: '64 subcarriers × 10 kHz = 640 kHz.',
            },
          },
          {
            id: 'p-5-4-3',
            title: 'Cyclic Prefix Overhead',
            question: {
              id: 'pq-5-4-3',
              kind: 'mcq',
              prompt:
                'What is the main job of the Cyclic Prefix prepended to every OFDM symbol?',
              options: [
                { id: 'a', label: 'Absorb multipath echoes so subcarriers remain strictly orthogonal' },
                { id: 'b', label: 'Encrypt the packet header' },
              ],
              correctOptionId: 'a',
              hint: 'Echoes from symbol n−1 decay inside the guard interval before symbol n’s FFT window begins.',
              explanation:
                'As long as echoes are shorter than the cyclic prefix, inter-symbol interference disappears completely.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'book-6',
    number: 'Book 6',
    title: 'Channel Coding & Error Control',
    lntRef: 'LNTwww · Channel Coding',
    category: 'information',
    summary:
      'Protect noisy digital links against flipped bits using parity checks, Hamming (7,4) syndromes, CRC, Viterbi trellises, and LDPC codes.',
    modules: [
      {
        id: 'mod-6-1',
        bookId: 'book-6',
        number: '6.1',
        title: 'Parity Checks, Repetition & Hamming Distance',
        subtitle: 'Building protective spacing between valid messages so errors cannot disguise themselves',
        readMinutes: 6,
        steps: [
          {
            id: 'step-6-1-0',
            title: 'Why Uncoded Bits Break Silently',
            paragraphs: [
              'Suppose you assign "0" to "Turn Left" and "1" to "Turn Right". If noise flips that single bit, the receiver obeys the opposite command with zero warning!',
              'Error-control coding adds carefully structured extra bits (redundancy) so corrupted messages land in invalid gaps between legal codewords.',
            ],
            question: {
              id: 'q-6-1-0',
              kind: 'mcq',
              prompt:
                'You add 1 even-parity bit at the end of a byte so every valid 9-bit word has an EVEN number of 1s. What happens if noise flips 1 bit?',
              options: [
                { id: 'a', label: 'The receiver counts an ODD number of 1s and detects an error, though it cannot tell which bit flipped' },
                { id: 'b', label: 'The receiver automatically fixes the exact flipped bit' },
              ],
              correctOptionId: 'a',
              hint: 'Counting total 1s tells you something went wrong, not where.',
              explanation:
                'A single parity bit guarantees d_min = 2: it detects any 1-bit flip, but cannot locate which position flipped.',
            },
          },
          {
            id: 'step-6-1-1',
            title: 'Hamming Distance Between Words',
            paragraphs: [
              'The Hamming distance between two bit strings is simply how many positions differ between them. To resist errors, code designers maximize the minimum Hamming distance d_min across all pairs of legal codewords.',
              'If d_min = 3 (like repeating every bit 3 times: 000 vs 111), a 1-bit flip lands at distance 1 from the truth and distance 2 from the impostor—so majority vote heals the error!',
            ],
            formula: {
              expression: 't_detect = d_min − 1   |   t_correct = ⌊(d_min − 1) / 2⌋',
              caption: 'Guaranteed error detection and correction power from minimum distance d_min.',
            },
            question: {
              id: 'q-6-1-1',
              kind: 'keypad',
              prompt:
                'What is the Hamming distance between the two 4-bit words 1011 and 1101?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['2'],
              displayAnswer: '2',
              hint: 'Compare bit-by-bit: positions 1 and 4 match; positions 2 and 3…',
              explanation: 'Positions 2 (0≠1) and 3 (1≠0) differ, so Hamming distance = 2.',
            },
          },
          {
            id: 'step-6-1-2',
            title: 'Sphere-Packing Correction Intuition',
            paragraphs: [
              'Picture every legal codeword sitting at the center of a protective bubble of radius t_correct. As long as bubbles around Codeword A and Codeword B do not overlap, any error inside A’s bubble snaps straight back to A!',
              'Use the slider below to find the minimum separation d_min needed to correct 1 bit error.',
            ],
            question: {
              id: 'q-6-1-2',
              kind: 'slider-target',
              prompt:
                'Set minimum Hamming distance d_min to the smallest value that guarantees correcting any 1-bit error.',
              simulation: 'hamming-cube',
              parameterLabel: 'Minimum Distance (d_min)',
              unit: '',
              min: 1,
              max: 5,
              step: 1,
              initialValue: 1,
              targetMin: 3,
              targetMax: 3,
              targetDescription: 'Set d_min = 3 (Correct 1 bit)',
              hint: 'Watch the "Correct" count at the top of the diagram.',
              explanation:
                'At d_min = 3, radius-1 bubbles around A and B stay separate, allowing guaranteed 1-bit correction.',
            },
          },
        ],
        practice: [
          {
            id: 'p-6-1-1',
            title: 'Correcting 2-Bit Errors',
            question: {
              id: 'pq-6-1-1',
              kind: 'keypad',
              prompt:
                'What minimum Hamming distance d_min is needed to guarantee correcting up to 2 bit errors per codeword?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['5'],
              displayAnswer: '5',
              hint: 'Use d_min = 2·t + 1 with t = 2.',
              explanation: 'd_min = 2(2) + 1 = 5 keeps radius-2 spheres around valid codewords separate.',
            },
          },
          {
            id: 'p-6-1-2',
            title: 'Repetition Code Rate',
            question: {
              id: 'pq-6-1-2',
              kind: 'keypad',
              prompt:
                'A simple 3× repetition code sends 0 → 000 and 1 → 111. What is its code rate R = k / n?',
              placeholder: 'e.g. 1/3',
              preset: 'numeric',
              acceptedAnswers: ['1/3', '0.333', '0.33'],
              displayAnswer: '1/3',
              hint: 'k = 1 information bit divided by n = 3 transmitted bits.',
              explanation: 'R = 1/3: two-thirds of transmitted bits are redundant parity.',
            },
          },
          {
            id: 'p-6-1-3',
            title: '2-Bit Flip Vulnerability in Even Parity',
            question: {
              id: 'pq-6-1-3',
              kind: 'mcq',
              prompt:
                'Why does a simple 1-bit parity check (d_min = 2) FAIL to notice when TWO bits flip in the same word?',
              options: [
                { id: 'a', label: 'Two flips restore the even count of 1s, landing on another valid codeword' },
                { id: 'b', label: 'Parity bits only check the first bit' },
              ],
              correctOptionId: 'a',
              hint: 'Flipping 2 bits changes parity twice (even → odd → even).',
              explanation:
                'With d_min = 2, flipping 2 bits moves from one valid even-parity word to another valid even-parity word!',
            },
          },
        ],
      },
      {
        id: 'mod-6-2',
        bookId: 'book-6',
        number: '6.2',
        title: 'Linear Block Codes & Hamming (7, 4)',
        subtitle: 'Using overlapping parity circles to pinpoint and repair flipped bits efficiently',
        readMinutes: 6,
        steps: [
          {
            id: 'step-6-2a-0',
            title: 'Beating Wasteful Repetition',
            paragraphs: [
              'Repeating every bit 3 times wastes 67% of your channel speed (rate R = 1/3). In 1950, Richard Hamming discovered how to protect 4 data bits using only 3 clever parity bits—jumping efficiency up to R = 4/7 (57%)!',
              'In a systematic (n, k) linear block code, the transmitter sends k original data bits unchanged followed by (n − k) parity-check bits computed via XOR (modulo-2 addition).',
            ],
            formula: {
              expression: 'R = k / n     |     Parity bits = n − k',
              caption: 'Code rate R measures the fraction of transmitted bits carrying real user data.',
            },
            question: {
              id: 'q-6-2a-0',
              kind: 'keypad',
              prompt:
                'In Hamming (7, 4), k = 4 data bits are encoded into n = 7 transmitted bits. How many parity bits are added per block?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['3'],
              displayAnswer: '3',
              hint: 'Compute n − k.',
              explanation: '7 − 4 = 3 parity bits (p₁, p₂, p₃) protect all 4 data bits.',
            },
          },
          {
            id: 'step-6-2a-1',
            title: 'Overlapping Circles & The Error Syndrome',
            paragraphs: [
              'How can 3 parity bits pinpoint WHICH of 7 bits flipped? Imagine 3 overlapping Venn circles (A, B, C), each enforced to have even parity. Every bit sits inside a unique combination of circles!',
              'Tap different bits inside the Hamming (7, 4) diagram below! Watch how the 3-bit failure pattern—called the syndrome—uniquely identifies the culprit bit.',
            ],
            simulation: 'hamming-syndrome',
            question: {
              id: 'q-6-2a-1',
              kind: 'mcq',
              prompt:
                'In the interactive Hamming (7, 4) diagram above, suppose Check A fails, Check B fails, and Check C passes (syndrome 110). Which bit flipped?',
              options: [
                { id: 'a', label: 'd₁ (the bit sitting inside BOTH Circle A and Circle B, outside C)' },
                { id: 'b', label: 'd₄ (the center bit inside all three circles)' },
                { id: 'c', label: 'p₁ (inside Circle A only)' },
              ],
              correctOptionId: 'a',
              hint: 'Tap d₁ in the simulator above and verify the syndrome readout!',
              explanation:
                'Only d₁ belongs to Circle A and Circle B without belonging to Circle C—so syndrome 110 points straight at d₁, and the decoder flips it back!',
            },
          },
          {
            id: 'step-6-2a-2',
            title: 'Why "Linear" Codes Scale to Hardware',
            paragraphs: [
              'Checking parity circles uses nothing more than XOR logic gates (mod-2 addition: 0⊕0=0, 0⊕1=1, 1⊕1=0), which run at gigabit speeds in tiny silicon circuits.',
              'Furthermore, in any linear block code, the XOR sum of any two valid codewords is always another valid codeword—meaning d_min equals the lightest nonzero codeword weight!',
            ],
            question: {
              id: 'q-6-2a-2',
              kind: 'mcq',
              prompt:
                'What does the syndrome equal when a received block contains ZERO errors?',
              options: [
                { id: 'a', label: 'All zeros (000 — every parity check passes)' },
                { id: 'b', label: 'All ones (111)' },
                { id: 'c', label: 'The original 4 data bits' },
              ],
              correctOptionId: 'a',
              hint: 'Click the currently highlighted bit in the Hamming diagram to clear the error.',
              explanation:
                'When no bit flipped, every parity circle satisfies even parity and the syndrome reads 000.',
            },
          },
        ],
        practice: [
          {
            id: 'p-6-2a-1',
            title: 'Hamming (15, 11) Efficiency',
            question: {
              id: 'pq-6-2a-1',
              kind: 'keypad',
              prompt:
                'A larger single-error-correcting Hamming (15, 11) code uses 4 parity bits to protect k = 11 data bits in n = 15 total bits. How many parity bits are there?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['4'],
              displayAnswer: '4',
              hint: '15 − 11 = ?',
              explanation: '15 − 11 = 4 parity bits yield 2⁴ − 1 = 15 nonzero syndromes—covering every single bit position!',
            },
          },
          {
            id: 'p-6-2a-2',
            title: 'Locating a Center Flip',
            question: {
              id: 'pq-6-2a-2',
              kind: 'mcq',
              prompt:
                'In our Hamming (7, 4) Venn diagram, if ALL THREE parity checks (A, B, and C) fail at once (syndrome 111), which single bit flipped?',
              options: [
                { id: 'a', label: 'd₄ (the center bit shared by all three circles)' },
                { id: 'b', label: 'p₃ (only in Circle C)' },
              ],
              correctOptionId: 'a',
              hint: 'Which bit lies inside A, B, AND C?',
              explanation: 'Only d₄ sits in the triple intersection of A, B, and C.',
            },
          },
          {
            id: 'p-6-2a-3',
            title: 'Syndrome Count Limit',
            question: {
              id: 'pq-6-2a-3',
              kind: 'keypad',
              prompt:
                'With 3 syndrome bits (000 through 111), excluding 000 ("no error"), how many distinct single-bit error locations can be uniquely pointed to?',
              placeholder: 'Enter integer',
              preset: 'numeric',
              acceptedAnswers: ['7'],
              displayAnswer: '7',
              hint: '2³ − 1 = ?',
              explanation: '2³ − 1 = 7 nonzero syndromes—which is exactly why Hamming (7, 4) has block length n = 7!',
            },
          },
        ],
      },
      {
        id: 'mod-6-3',
        bookId: 'book-6',
        number: '6.3',
        title: 'CRC, Convolutional Codes & Viterbi Decoding',
        subtitle: 'Packet checksums for retransmission and sliding-memory trellis decoders',
        readMinutes: 6,
        steps: [
          {
            id: 'step-6-3-0',
            title: 'Detect-and-Retry (CRC) vs. Fix-on-the-Fly (FEC)',
            paragraphs: [
              'In computer networks like Ethernet and Wi-Fi, you often have a return channel. Instead of fixing damaged packets immediately, a Cyclic Redundancy Check (CRC) appends a 16- or 32-bit polynomial remainder to catch errors reliably.',
              'If the CRC check fails at the receiver, it simply requests a quick retransmission (ARQ). For one-way links like deep-space probes or live broadcasts, Forward Error Correction (FEC) must fix errors without asking!',
            ],
            question: {
              id: 'q-6-3-0',
              kind: 'mcq',
              prompt:
                'When is Forward Error Correction (FEC) strongly preferred over CRC + Retransmission?',
              options: [
                { id: 'a', label: 'Live satellite broadcasts or Mars rovers where round-trip retransmission is impossible or far too slow' },
                { id: 'b', label: 'Local USB flash drive writes' },
              ],
              correctOptionId: 'a',
              hint: 'Waiting 20 minutes for Mars to say "please resend packet 42" hurts!',
              explanation:
                'Long round-trip delays and one-to-many broadcasts cannot rely on retransmission, so FEC repairs errors immediately.',
            },
          },
          {
            id: 'step-6-3-1',
            title: 'Convolutional Codes: Memory Across Time',
            paragraphs: [
              'Block codes chop data into isolated independent chunks like 7-bit blocks. Convolutional codes work like a sliding assembly line: each incoming bit passes through a short shift register of K memory stages.',
              'Every new output depends on the current bit PLUS the previous K − 1 bits! That overlapping memory weaves bits together continuously so isolated noise bursts cannot break the chain.',
            ],
            question: {
              id: 'q-6-3-1',
              kind: 'mcq',
              prompt:
                'How does a convolutional encoder differ from a block encoder like Hamming (7, 4)?',
              options: [
                { id: 'a', label: 'Each output depends on both the current bit AND recent previous bits stored in shift-register memory' },
                { id: 'b', label: 'It transmits analog sine waves without any bits' },
              ],
              correctOptionId: 'a',
              hint: 'Think of a sliding window (convolution!) over incoming bits.',
              explanation:
                'Convolutional encoders remember the last K − 1 input bits inside flip-flops, coupling consecutive outputs together.',
            },
          },
          {
            id: 'step-6-3-2',
            title: 'The Viterbi Trellis Decoder',
            paragraphs: [
              'At the receiver, Andrew Viterbi invented a brilliant GPS-like algorithm to decode convolutional codes. Every encoder state transition forms a grid over time called a trellis.',
              'Instead of checking all 2^1000 possible messages, the Viterbi decoder keeps only the single shortest-distance "survivor path" entering each state at each tick—finding the globally optimal message effortlessly!',
            ],
            question: {
              id: 'q-6-3-2',
              kind: 'mcq',
              prompt:
                'Why does the Viterbi algorithm prune away losing paths at every single state node instead of waiting until the end of a long packet?',
              options: [
                { id: 'a', label: 'Any future extension of a worse path can never beat the best survivor path reaching that exact same state' },
                { id: 'b', label: 'It randomly guesses half the bits' },
              ],
              correctOptionId: 'a',
              hint: 'Think of driving from LA to NYC: whichever route reached Chicago faster stays faster for the rest of the trip!',
              explanation:
                'By Bellman’s principle of optimality, pruning inferior paths at every trellis state reduces exponential search into fast linear time.',
            },
          },
        ],
        practice: [
          {
            id: 'p-6-3-1',
            title: 'Rate-1/2 Convolutional Encoder',
            question: {
              id: 'pq-6-3-1',
              kind: 'keypad',
              prompt:
                'A rate-1/2 convolutional encoder outputs 2 coded bits for every 1 input bit. If 500 user bits enter (ignoring tail flush), how many coded bits exit?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'numeric',
              acceptedAnswers: ['1000'],
              displayAnswer: '1000',
              hint: '500 × 2.',
              explanation: 'At rate R = 1/2, 500 information bits expand to 1,000 transmitted bits.',
            },
          },
          {
            id: 'p-6-3-2',
            title: 'Trellis States from Memory',
            question: {
              id: 'pq-6-3-2',
              kind: 'keypad',
              prompt:
                'A convolutional encoder has m = 3 memory flip-flops in its shift register. How many distinct encoder states (2^m) appear in its Viterbi trellis?',
              placeholder: 'Enter states',
              preset: 'numeric',
              acceptedAnswers: ['8', '2^3'],
              displayAnswer: '8',
              hint: 'Each flip-flop holds 0 or 1, so 2³ = ?',
              explanation: 'm = 3 memory bits create 2³ = 8 trellis states.',
            },
          },
          {
            id: 'p-6-3-3',
            title: 'CRC Strength',
            question: {
              id: 'pq-6-3-3',
              kind: 'mcq',
              prompt:
                'What makes a 32-bit CRC so effective on Wi-Fi and Ethernet frames?',
              options: [
                { id: 'a', label: 'It catches single errors, double errors, and long burst errors with virtually 100% certainty using tiny hardware shift registers' },
                { id: 'b', label: 'It corrects 32 errors automatically without retransmission' },
              ],
              correctOptionId: 'a',
              hint: 'CRC is an error DETECTION polynomial check.',
              explanation: 'CRC-32 catches 100% of burst errors up to 32 bits long using simple XOR shift registers.',
            },
          },
        ],
      },
      {
        id: 'mod-6-4',
        bookId: 'book-6',
        number: '6.4',
        title: 'Soft Decisions, LDPC & The Shannon Limit',
        subtitle: 'How modern 5G and Wi-Fi codes whisper right next to Shannon’s theoretical wall',
        readMinutes: 5,
        steps: [
          {
            id: 'step-6-4-0',
            title: 'Hard Rounding Throws Away Gold',
            paragraphs: [
              'Imagine BPSK sends +1 V for bit "1" and −1 V for bit "0". If noise makes two bits arrive at +0.98 V and +0.01 V, a "hard" detector rounds BOTH to "1"—hiding the fact that the second bit was a coin-toss!',
              'A "soft" decoder preserves the analog confidence (log-likelihood ratio), letting rock-solid +0.98 V neighbors rescue an uncertain +0.01 V bit—gaining ~2 dB of free performance!',
            ],
            question: {
              id: 'q-6-4-0',
              kind: 'mcq',
              prompt:
                'What extra clue does a soft-decision decoder use that a hard-decision decoder deletes?',
              options: [
                { id: 'a', label: 'How confident or borderline each received sample is before rounding to 0 or 1' },
                { id: 'b', label: 'The Wi-Fi password' },
              ],
              correctOptionId: 'a',
              hint: 'Compare +0.98 V vs +0.01 V.',
              explanation:
                'Soft confidence values tell the error-correcting decoder which bits to trust and which borderline bits probably flipped.',
            },
          },
          {
            id: 'step-6-4-1',
            title: 'LDPC & Iterative Belief Passing',
            paragraphs: [
              'For 40 years after Shannon’s 1948 paper, nobody knew how to build practical codes that actually reached Shannon capacity without requiring impossibly huge computers.',
              'Then came Turbo codes (1993) and rediscovered LDPC (Low-Density Parity-Check) codes. LDPC links thousands of bits in a sparse graph where bit nodes and parity-check nodes pass confidence messages back and forth in rounds—converging to the right answer within fractions of a dB of Shannon’s limit!',
            ],
            question: {
              id: 'q-6-4-1',
              kind: 'mcq',
              prompt:
                'Why do modern 5G, Wi-Fi, and satellite standards use long sparse-graph codes (LDPC / Polar) instead of repeating Hamming (7, 4)?',
              options: [
                { id: 'a', label: 'Longer blocks with iterative soft decoding approach Shannon capacity without wasting bandwidth rate' },
                { id: 'b', label: 'LDPC codes require zero parity bits' },
              ],
              correctOptionId: 'a',
              hint: 'Remember Shannon’s theorem requires long blocks to average out noise fluctuations.',
              explanation:
                'Long sparse graphs let iterative decoders average out random noise across thousands of bits, approaching the Shannon limit closely.',
            },
          },
          {
            id: 'step-6-4-2',
            title: 'The −1.59 dB Ultimate Floor',
            paragraphs: [
              'Even with infinite bandwidth and an ideal infinitely long code, physics still sets an unbreakable minimum energy per bit relative to noise density: Eb/N0 ≥ ln(2) ≈ 0.693, or −1.59 dB.',
              'Notice that is NEGATIVE dB—meaning with Shannon-grade coding, deep-space probes like Voyager can whisper reliably even when their signal is slightly weaker than the background thermal hiss!',
            ],
            formula: {
              expression: '(Eb / N₀)_min = ln(2) ≈ −1.59 dB',
              caption: 'Ultimate Shannon energy-efficiency limit for reliable binary communication.',
            },
            question: {
              id: 'q-6-4-2',
              kind: 'mcq',
              prompt:
                'What does the negative value −1.59 dB for the Shannon limit prove?',
              options: [
                { id: 'a', label: 'Reliable error-free bits are still possible even when bit energy Eb is slightly smaller than noise density N₀' },
                { id: 'b', label: 'Transmitters can send negative power' },
              ],
              correctOptionId: 'a',
              hint: '0 dB means Eb = N₀; negative dB means Eb < N₀.',
              explanation:
                'Below 0 dB means Eb < N₀—yet spreading and long error-correcting codes still pull messages cleanly out of the noise down to −1.59 dB.',
            },
          },
        ],
        practice: [
          {
            id: 'p-6-4-1',
            title: 'High-Rate LDPC Payload',
            question: {
              id: 'pq-6-4-1',
              kind: 'keypad',
              prompt:
                'A Wi-Fi LDPC frame uses code rate R = 3/4 with n = 1,000 total transmitted bits. How many user data bits k are inside?',
              placeholder: 'Enter bits',
              unitLabel: 'bits',
              preset: 'numeric',
              acceptedAnswers: ['750'],
              displayAnswer: '750 bits',
              hint: 'k = (3/4) × 1,000.',
              explanation: 'k = 0.75 × 1,000 = 750 data bits (plus 250 parity bits).',
            },
          },
          {
            id: 'p-6-4-2',
            title: 'Soft vs. Hard Gain',
            question: {
              id: 'pq-6-4-2',
              kind: 'keypad',
              prompt:
                'Switching from hard-decision decoding to soft-decision decoding typically saves roughly how many dB of transmit power on an AWGN channel?',
              placeholder: 'Enter dB',
              unitLabel: 'dB',
              preset: 'numeric',
              acceptedAnswers: ['2', '2db'],
              displayAnswer: '~2 dB',
              hint: 'Mentioned in the first step of this module!',
              explanation: 'Soft-decision decoding buys about 2 dB of coding gain almost for free.',
            },
          },
          {
            id: 'p-6-4-3',
            title: '5G Channel Coding Pair',
            question: {
              id: 'pq-6-4-3',
              kind: 'mcq',
              prompt:
                'Which pair of modern error-correcting codes powers 5G NR (LDPC for data channels, and which code for short control channels)?',
              options: [
                { id: 'a', label: 'LDPC + Polar codes' },
                { id: 'b', label: 'Morse code + 3× Repetition' },
              ],
              correctOptionId: 'a',
              hint: 'Erdal Arıkan invented Polar codes in 2008, adopted in 5G control channels!',
              explanation: '5G uses LDPC for high-throughput user data and Polar codes for short control packets.',
            },
          },
        ],
      },
    ],
  },
];

export function getAllModules(): { book: Book; module: Module }[] {
  return BOOKS.flatMap((book) => book.modules.map((module) => ({ book, module })));
}

export function findModuleById(moduleId: string): { book: Book; module: Module } | null {
  for (const book of BOOKS) {
    const found = book.modules.find((m) => m.id === moduleId);
    if (found) return { book, module: found };
  }
  return null;
}
