import React, { useState } from 'react';
import { SimulationType } from '../types/curriculum';
import { SimulationStage } from './Simulations';

const SIM_CATALOG: { id: SimulationType; title: string; topic: string }[] = [
  { id: 'fourier-harmonics', title: 'Fourier Square-Wave Synthesis', topic: 'Book 1 · Signal Representation' },
  { id: 'nyquist-sampling', title: 'Nyquist Sampling & Aliasing', topic: 'Book 1 · Signal Representation' },
  { id: 'convolution-overlap', title: 'Pulse Convolution Overlap', topic: 'Book 2 · LTI Systems' },
  { id: 'lti-filter', title: 'Butterworth Low-Pass Filter', topic: 'Book 2 · LTI Systems' },
  { id: 'gaussian-pdf', title: 'Gaussian Thermal Noise PDF', topic: 'Book 3 · Stochastic Signals' },
  { id: 'shannon-entropy', title: 'Binary Shannon Entropy H(p)', topic: 'Book 4 · Information Theory' },
  { id: 'channel-capacity', title: 'Shannon-Hartley Capacity', topic: 'Book 4 · Information Theory' },
  { id: 'modulation-waves', title: 'ASK, FSK & BPSK Waveforms', topic: 'Book 5 · Modulation Methods' },
  { id: 'constellation-awgn', title: 'IQ Constellation & AWGN', topic: 'Book 5 · Modulation Methods' },
  { id: 'hamming-cube', title: 'Hamming Distance Bound', topic: 'Book 6 · Channel Coding' },
  { id: 'hamming-syndrome', title: 'Hamming (7, 4) Parity Syndrome', topic: 'Book 6 · Channel Coding' },
];

export const SimulationsLab: React.FC = () => {
  const [activeId, setActiveId] = useState<SimulationType>('nyquist-sampling');
  const current = SIM_CATALOG.find((s) => s.id === activeId) ?? SIM_CATALOG[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="space-y-2 pb-6 border-b border-rule">
        <h1 className="text-3xl sm:text-4xl font-semibold text-ink">
          Interactive Signal Lab
        </h1>
        <p className="text-base text-ink-muted max-w-2xl leading-relaxed">
          Explore every visual model from the LNTwww-inspired textbooks in real time
          with touch-friendly sliders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-1.5">
          {SIM_CATALOG.map((sim) => {
            const active = sim.id === activeId;
            return (
              <button
                key={sim.id}
                type="button"
                onClick={() => setActiveId(sim.id)}
                className={`w-full min-h-[54px] text-left px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                  active
                    ? 'bg-vellum border-cobalt text-ink shadow-xs'
                    : 'bg-papyrus-deep/50 border-rule/80 text-ink-muted hover:text-ink hover:bg-vellum/60'
                }`}
              >
                <div className="text-xs text-ochre font-medium">{sim.topic}</div>
                <div className="text-sm font-semibold text-ink">{sim.title}</div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-ink-muted">{current.topic}</div>
            <h2 className="text-2xl font-semibold text-ink">{current.title}</h2>
          </div>
          <SimulationStage type={activeId} />
        </div>
      </div>
    </div>
  );
};
