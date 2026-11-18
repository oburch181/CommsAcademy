import React, { useState } from 'react';
import { SimulationType } from '../types/curriculum';

interface SimulationProps {
  type: SimulationType;
  controlledValue?: number;
  onControlledChange?: (val: number) => void;
  hideInternalSlider?: boolean;
}

const SVG_W = 480;
const SVG_H = 210;

export const SimulationStage: React.FC<SimulationProps> = ({
  type,
  controlledValue,
  onControlledChange,
  hideInternalSlider = false,
}) => {
  switch (type) {
    case 'fourier-harmonics':
      return (
        <FourierHarmonicsSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'nyquist-sampling':
      return (
        <NyquistSamplingSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'lti-filter':
      return (
        <LtiFilterSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'convolution-overlap':
      return (
        <ConvolutionSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'shannon-entropy':
      return (
        <ShannonEntropySim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'channel-capacity':
      return (
        <ChannelCapacitySim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'constellation-awgn':
      return (
        <ConstellationAwgnSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'gaussian-pdf':
      return (
        <GaussianPdfSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'hamming-cube':
      return (
        <HammingCubeSim
          controlledValue={controlledValue}
          onControlledChange={onControlledChange}
          hideInternalSlider={hideInternalSlider}
        />
      );
    case 'modulation-waves':
      return <ModulationWavesSim />;
    case 'hamming-syndrome':
      return <HammingSyndromeSim />;
  }
};

/* 1. Fourier Series Synthesis of a Square Wave */
const FourierHarmonicsSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localN, setLocalN] = useState(3);
  const N = controlledValue ?? localN;
  const setN = onControlledChange ?? setLocalN;

  const padX = 28;
  const midY = SVG_H / 2;
  const amp = 62;
  const plotW = SVG_W - padX * 2;

  const points: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * 2 * Math.PI;
    let yVal = 0;
    for (let k = 1; k <= N; k += 2) {
      yVal += (4 / (Math.PI * k)) * Math.sin(k * t);
    }
    const px = padX + (i / 180) * plotW;
    const py = midY - yVal * amp;
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  // Ideal square wave reference
  const idealPts = [
    `${padX},${midY - amp}`,
    `${padX + plotW / 2},${midY - amp}`,
    `${padX + plotW / 2},${midY + amp}`,
    `${padX + plotW},${midY + amp}`,
  ].join(' ');

  const harmonicCount = Math.ceil(N / 2);

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between text-xs text-ink-muted">
        <span className="font-medium text-ink">Fourier Square-Wave Synthesis</span>
        <span className="font-mono tabular-nums">
          Max harmonic k = {N} ({harmonicCount} {harmonicCount === 1 ? 'sine' : 'sines'})
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={midY} x2={SVG_W - padX} y2={midY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={padX} y1={24} x2={padX} y2={SVG_H - 24} stroke="#DFCFA9" strokeWidth="1.5" />
        <polyline fill="none" stroke="#9A5B13" strokeWidth="1.5" strokeDasharray="4 4" points={idealPts} opacity="0.65" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" strokeLinejoin="round" points={points.join(' ')} />
        <text x={padX + 6} y={24} className="fill-ink-muted text-[11px] font-mono">x(t)</text>
        <text x={SVG_W - padX - 24} y={midY - 8} className="fill-ink-muted text-[11px] font-mono">T₀</text>
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="fourier-n" className="font-medium text-ink">Highest Odd Harmonic (k)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">k = {N}</span>
          </div>
          <input
            id="fourier-n"
            type="range"
            min={1}
            max={15}
            step={2}
            value={N}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 2. Nyquist-Shannon Sampling & Aliasing Explorer */
const NyquistSamplingSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localFs, setLocalFs] = useState(5);
  const fs = controlledValue ?? localFs;
  const setFs = onControlledChange ?? setLocalFs;
  const f0 = 2; // 2 Hz signal => Nyquist rate = 4 Hz

  const padX = 26;
  const midY = SVG_H / 2;
  const amp = 56;
  const plotW = SVG_W - padX * 2;
  const duration = 1.5; // seconds

  const trueWave: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * duration;
    const y = Math.sin(2 * Math.PI * f0 * t);
    trueWave.push(`${(padX + (i / 180) * plotW).toFixed(1)},${(midY - y * amp).toFixed(1)}`);
  }

  // Alias wave when fs < 2*f0
  const isAliased = fs < 2 * f0;
  const aliasFreq = Math.abs(f0 - Math.round(f0 / fs) * fs);
  const aliasWave: string[] = [];
  if (isAliased) {
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * duration;
      const y = Math.sin(2 * Math.PI * (f0 - Math.round(f0 / fs) * fs) * t);
      aliasWave.push(`${(padX + (i / 180) * plotW).toFixed(1)},${(midY - y * amp).toFixed(1)}`);
    }
  }

  const sampleDots: { x: number; y: number }[] = [];
  const totalSamples = Math.floor(duration * fs);
  for (let n = 0; n <= totalSamples; n++) {
    const t = n / fs;
    if (t > duration + 1e-6) break;
    const y = Math.sin(2 * Math.PI * f0 * t);
    sampleDots.push({
      x: padX + (t / duration) * plotW,
      y: midY - y * amp,
    });
  }

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Signal f₀ = 2 Hz · Sampling f_s = {fs.toFixed(1)} Hz</span>
        <span
          className={`font-mono font-semibold tabular-nums ${
            isAliased ? 'text-vermilion' : 'text-verdigris'
          }`}
        >
          {isAliased
            ? `▲ Aliasing (${aliasFreq.toFixed(1)} Hz ghost)`
            : '● Nyquist satisfied (f_s ≥ 4 Hz)'}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={midY} x2={SVG_W - padX} y2={midY} stroke="#DFCFA9" strokeWidth="1.5" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.2" points={trueWave.join(' ')} />
        {isAliased && (
          <polyline
            fill="none"
            stroke="#B3261E"
            strokeWidth="2"
            strokeDasharray="5 4"
            points={aliasWave.join(' ')}
          />
        )}
        {sampleDots.map((dot, idx) => (
          <g key={idx}>
            <line x1={dot.x} y1={midY} x2={dot.x} y2={dot.y} stroke="#9A5B13" strokeWidth="1.2" opacity="0.6" />
            <circle cx={dot.x} cy={dot.y} r="4.5" fill="#9A5B13" stroke="#FFFDF6" strokeWidth="1.5" />
          </g>
        ))}
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="nyquist-fs" className="font-medium text-ink">Sampling Rate (f_s)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">{fs.toFixed(1)} Hz</span>
          </div>
          <input
            id="nyquist-fs"
            type="range"
            min={1.5}
            max={10}
            step={0.5}
            value={fs}
            onChange={(e) => setFs(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 3. LTI Butterworth Low-Pass Magnitude Response */
const LtiFilterSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localFc, setLocalFc] = useState(4);
  const [order, setOrder] = useState(2);
  const fc = controlledValue ?? localFc;
  const setFc = onControlledChange ?? setLocalFc;

  const padX = 34;
  const baseY = SVG_H - 30;
  const topY = 26;
  const plotW = SVG_W - padX * 2;
  const plotH = baseY - topY;
  const fMax = 10;

  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const f = (i / 160) * fMax;
    const mag = 1 / Math.sqrt(1 + Math.pow(f / fc, 2 * order));
    const px = padX + (i / 160) * plotW;
    const py = baseY - mag * plotH;
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  const fcX = padX + (fc / fMax) * plotW;
  const cutoffY = baseY - 0.7071 * plotH;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Low-Pass Magnitude |H(f)|</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          f_c = {fc.toFixed(1)} kHz · Order n = {order}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <rect x={padX} y={topY} width={Math.max(0, fcX - padX)} height={plotH} fill="#1D4E89" opacity="0.07" />
        <line x1={padX} y1={baseY} x2={SVG_W - padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={padX} y1={topY} x2={padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={fcX} y1={topY} x2={fcX} y2={baseY} stroke="#9A5B13" strokeWidth="1.5" strokeDasharray="4 4" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" points={pts.join(' ')} />
        <circle cx={fcX} cy={cutoffY} r="4.5" fill="#9A5B13" stroke="#FFFDF6" strokeWidth="1.5" />
        <text x={fcX + 6} y={cutoffY - 6} className="fill-ochre text-[11px] font-mono">−3 dB (0.707)</text>
        <text x={padX + 6} y={topY + 14} className="fill-ink-muted text-[11px] font-mono">1.0</text>
        <text x={SVG_W - padX - 40} y={baseY + 16} className="fill-ink-muted text-[11px] font-mono">10 kHz</text>
      </svg>

      {!hideInternalSlider && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor="filter-fc" className="font-medium text-ink">Cutoff (f_c)</label>
              <span className="font-mono tabular-nums text-cobalt">{fc.toFixed(1)} kHz</span>
            </div>
            <input
              id="filter-fc"
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={fc}
              onChange={(e) => setFc(Number(e.target.value))}
              className="w-full papyrus-slider"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-ink">Filter Order</span>
              <span className="font-mono tabular-nums text-cobalt">n = {order}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 4].map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOrder(o)}
                  className={`min-h-[38px] rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                    order === o
                      ? 'bg-cobalt text-vellum border-cobalt'
                      : 'bg-papyrus text-ink border-rule hover:bg-papyrus-deep'
                  }`}
                >
                  n={o}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* 4. Convolution of Two Unit Box Pulses -> Triangle */
const ConvolutionSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localT, setLocalT] = useState(1.0);
  const tShift = controlledValue ?? localT;
  const setTShift = onControlledChange ?? setLocalT;

  // x(tau) = rect on [0, 1], h(tau) = rect on [0, 1]
  // Overlap interval = [max(0, t-1), min(1, t)]
  const overlapStart = Math.max(0, tShift - 1);
  const overlapEnd = Math.min(1, tShift);
  const overlapArea = Math.max(0, overlapEnd - overlapStart);

  const padX = 40;
  const plotW = SVG_W - padX * 2;
  const mapX = (tau: number) => padX + ((tau + 1) / 4) * plotW; // tau in [-1, 3]

  const baseTop = 92;
  const pulseH = 44;
  const baseBot = 185;
  const triH = 60;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Sliding Pulse Convolution y(t) = (x * h)(t)</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          t = {tShift.toFixed(1)} · y(t) = {overlapArea.toFixed(2)}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        {/* Top panel: x(tau) and sliding h(t - tau) */}
        <line x1={padX} y1={baseTop} x2={SVG_W - padX} y2={baseTop} stroke="#DFCFA9" strokeWidth="1.5" />
        {/* Fixed x(tau) on [0,1] */}
        <rect
          x={mapX(0)}
          y={baseTop - pulseH}
          width={mapX(1) - mapX(0)}
          height={pulseH}
          fill="#1D4E89"
          opacity="0.18"
          stroke="#1D4E89"
          strokeWidth="2"
        />
        {/* Sliding h(t - tau) on [t-1, t] */}
        <rect
          x={mapX(tShift - 1)}
          y={baseTop - pulseH + 4}
          width={mapX(tShift) - mapX(tShift - 1)}
          height={pulseH - 4}
          fill="#9A5B13"
          opacity="0.22"
          stroke="#9A5B13"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        {/* Highlight overlap */}
        {overlapArea > 0 && (
          <rect
            x={mapX(overlapStart)}
            y={baseTop - pulseH + 4}
            width={mapX(overlapEnd) - mapX(overlapStart)}
            height={pulseH - 4}
            fill="#1C6B4E"
            opacity="0.4"
          />
        )}
        <text x={padX} y={24} className="fill-ink-muted text-[11px] font-mono">
          x(τ) [blue] &amp; h(t−τ) [amber]
        </text>

        {/* Bottom panel: Resulting triangle y(t) */}
        <line x1={padX} y1={baseBot} x2={SVG_W - padX} y2={baseBot} stroke="#DFCFA9" strokeWidth="1.5" />
        <polyline
          fill="none"
          stroke="#1D4E89"
          strokeWidth="2"
          opacity="0.35"
          points={`${mapX(-0.5)},${baseBot} ${mapX(0)},${baseBot} ${mapX(1)},${baseBot - triH} ${mapX(2)},${baseBot} ${mapX(2.5)},${baseBot}`}
        />
        <circle cx={mapX(tShift)} cy={baseBot - overlapArea * triH} r="5" fill="#1C6B4E" stroke="#FFFDF6" strokeWidth="1.5" />
        <text x={padX} y={122} className="fill-ink-muted text-[11px] font-mono">
          Output y(t) = area of overlap
        </text>
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="conv-t" className="font-medium text-ink">Time Shift (t)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">t = {tShift.toFixed(1)} s</span>
          </div>
          <input
            id="conv-t"
            type="range"
            min={-0.4}
            max={2.4}
            step={0.1}
            value={tShift}
            onChange={(e) => setTShift(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 5. Binary Shannon Entropy H(p) */
const ShannonEntropySim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localP, setLocalP] = useState(0.5);
  const p = controlledValue ?? localP;
  const setP = onControlledChange ?? setLocalP;

  const calcH = (prob: number) => {
    if (prob <= 0 || prob >= 1) return 0;
    return -(prob * Math.log2(prob) + (1 - prob) * Math.log2(1 - prob));
  };

  const H = calcH(p);
  const padX = 36;
  const baseY = SVG_H - 30;
  const topY = 26;
  const plotW = SVG_W - padX * 2;
  const plotH = baseY - topY;

  const curvePts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const pv = i / 100;
    const hv = calcH(pv);
    curvePts.push(`${(padX + pv * plotW).toFixed(1)},${(baseY - hv * plotH).toFixed(1)}`);
  }

  const curX = padX + p * plotW;
  const curY = baseY - H * plotH;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Binary Entropy H(p)</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          p = {p.toFixed(2)} · H(p) = {H.toFixed(3)} bits/sym
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={baseY} x2={SVG_W - padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={padX} y1={topY} x2={padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={padX + plotW * 0.5} y1={topY} x2={padX + plotW * 0.5} y2={baseY} stroke="#DFCFA9" strokeDasharray="4 4" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" points={curvePts.join(' ')} />
        <line x1={curX} y1={baseY} x2={curX} y2={curY} stroke="#9A5B13" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx={curX} cy={curY} r="5.5" fill="#9A5B13" stroke="#FFFDF6" strokeWidth="1.5" />
        <text x={padX + 6} y={topY + 10} className="fill-ink-muted text-[11px] font-mono">1.0 bit</text>
        <text x={padX + plotW * 0.5 - 24} y={baseY + 16} className="fill-ink-muted text-[11px] font-mono">p = 0.5</text>
        <text x={SVG_W - padX - 18} y={baseY + 16} className="fill-ink-muted text-[11px] font-mono">1.0</text>
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="entropy-p" className="font-medium text-ink">Symbol Probability (p)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">p = {p.toFixed(2)}</span>
          </div>
          <input
            id="entropy-p"
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 6. Shannon-Hartley Channel Capacity C = B * log2(1 + SNR) */
const ChannelCapacitySim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localSnrDb, setLocalSnrDb] = useState(10);
  const [bwMhz, setBwMhz] = useState(10);
  const snrDb = controlledValue ?? localSnrDb;
  const setSnrDb = onControlledChange ?? setLocalSnrDb;

  const snrLinear = Math.pow(10, snrDb / 10);
  const specEff = Math.log2(1 + snrLinear);
  const capacityMbps = bwMhz * specEff;

  const padX = 36;
  const baseY = SVG_H - 30;
  const topY = 26;
  const plotW = SVG_W - padX * 2;
  const plotH = baseY - topY;
  const maxDb = 30;
  const maxEff = Math.log2(1 + Math.pow(10, maxDb / 10));

  const pts: string[] = [];
  for (let d = 0; d <= maxDb; d += 1) {
    const eff = Math.log2(1 + Math.pow(10, d / 10));
    const px = padX + (d / maxDb) * plotW;
    const py = baseY - (eff / maxEff) * plotH;
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  const curX = padX + (snrDb / maxDb) * plotW;
  const curY = baseY - (specEff / maxEff) * plotH;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Shannon-Hartley Capacity C = B·log₂(1 + SNR)</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          C = {capacityMbps.toFixed(1)} Mbps ({specEff.toFixed(2)} bps/Hz)
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={baseY} x2={SVG_W - padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={padX} y1={topY} x2={padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" points={pts.join(' ')} />
        <line x1={curX} y1={baseY} x2={curX} y2={curY} stroke="#9A5B13" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx={curX} cy={curY} r="5.5" fill="#9A5B13" stroke="#FFFDF6" strokeWidth="1.5" />
        <text x={padX + 6} y={topY + 12} className="fill-ink-muted text-[11px] font-mono">C/B (bps/Hz)</text>
        <text x={SVG_W - padX - 42} y={baseY + 16} className="fill-ink-muted text-[11px] font-mono">30 dB</text>
      </svg>

      {!hideInternalSlider && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor="shannon-snr" className="font-medium text-ink">SNR (dB)</label>
              <span className="font-mono tabular-nums text-cobalt">{snrDb} dB</span>
            </div>
            <input
              id="shannon-snr"
              type="range"
              min={0}
              max={30}
              step={1}
              value={snrDb}
              onChange={(e) => setSnrDb(Number(e.target.value))}
              className="w-full papyrus-slider"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor="shannon-bw" className="font-medium text-ink">Bandwidth (B)</label>
              <span className="font-mono tabular-nums text-cobalt">{bwMhz} MHz</span>
            </div>
            <input
              id="shannon-bw"
              type="range"
              min={1}
              max={40}
              step={1}
              value={bwMhz}
              onChange={(e) => setBwMhz(Number(e.target.value))}
              className="w-full papyrus-slider"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* 7. IQ Constellation Diagram with AWGN Noise Cloud */
const ConstellationAwgnSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localSnr, setLocalSnr] = useState(14);
  const [scheme, setScheme] = useState<'BPSK' | 'QPSK' | '16QAM'>('QPSK');
  const snrDb = controlledValue ?? localSnr;
  const setSnrDb = onControlledChange ?? setLocalSnr;

  const cx = SVG_W / 2;
  const cy = SVG_H / 2;
  const scale = 64;

  const symbols: { i: number; q: number }[] =
    scheme === 'BPSK'
      ? [
          { i: -1, q: 0 },
          { i: 1, q: 0 },
        ]
      : scheme === 'QPSK'
      ? [
          { i: -0.707, q: -0.707 },
          { i: 0.707, q: -0.707 },
          { i: -0.707, q: 0.707 },
          { i: 0.707, q: 0.707 },
        ]
      : [-0.95, -0.316, 0.316, 0.95].flatMap((i) =>
          [-0.95, -0.316, 0.316, 0.95].map((q) => ({ i, q }))
        );

  const sigma = 1 / Math.sqrt(2 * Math.pow(10, snrDb / 10));

  // Deterministic pseudo-random Gaussian-like scatter so render stays pure & jitter-free
  const clouds = symbols.flatMap((sym, sIdx) => {
    const pts: { x: number; y: number }[] = [];
    const count = scheme === '16QAM' ? 6 : 12;
    for (let k = 0; k < count; k++) {
      const a = Math.sin((sIdx + 1) * 19.3 + k * 7.1);
      const b = Math.cos((sIdx + 1) * 11.7 + k * 13.9);
      const r = (Math.abs(a) + 0.25) * sigma * 1.4;
      const theta = b * Math.PI;
      pts.push({
        x: cx + (sym.i + r * Math.cos(theta)) * scale,
        y: cy - (sym.q + r * Math.sin(theta)) * scale,
      });
    }
    return pts;
  });

  const bitsPerSym = scheme === 'BPSK' ? 1 : scheme === 'QPSK' ? 2 : 4;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">
          {scheme} I-Q Constellation ({bitsPerSym} {bitsPerSym === 1 ? 'bit' : 'bits'}/symbol)
        </span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">SNR = {snrDb} dB</span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={30} y1={cy} x2={SVG_W - 30} y2={cy} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={cx} y1={16} x2={cx} y2={SVG_H - 16} stroke="#DFCFA9" strokeWidth="1.5" />
        {clouds.map((pt, idx) => (
          <circle key={idx} cx={pt.x} cy={pt.y} r="2.2" fill="#9A5B13" opacity="0.55" />
        ))}
        {symbols.map((sym, idx) => (
          <circle
            key={idx}
            cx={cx + sym.i * scale}
            cy={cy - sym.q * scale}
            r="5"
            fill="#1D4E89"
            stroke="#FFFDF6"
            strokeWidth="1.5"
          />
        ))}
        <text x={SVG_W - 44} y={cy - 8} className="fill-ink-muted text-[11px] font-mono">I</text>
        <text x={cx + 8} y={28} className="fill-ink-muted text-[11px] font-mono">Q</text>
      </svg>

      {!hideInternalSlider && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor="iq-snr" className="font-medium text-ink">Channel SNR</label>
              <span className="font-mono tabular-nums text-cobalt">{snrDb} dB</span>
            </div>
            <input
              id="iq-snr"
              type="range"
              min={2}
              max={24}
              step={1}
              value={snrDb}
              onChange={(e) => setSnrDb(Number(e.target.value))}
              className="w-full papyrus-slider"
            />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['BPSK', 'QPSK', '16QAM'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setScheme(m)}
                className={`min-h-[38px] rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                  scheme === m
                    ? 'bg-cobalt text-vellum border-cobalt'
                    : 'bg-papyrus text-ink border-rule hover:bg-papyrus-deep'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* 8. Gaussian Noise PDF p(x) */
const GaussianPdfSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localSigma, setLocalSigma] = useState(1.0);
  const sigma = controlledValue ?? localSigma;
  const setSigma = onControlledChange ?? setLocalSigma;

  const padX = 32;
  const baseY = SVG_H - 30;
  const plotW = SVG_W - padX * 2;
  const maxY = 145;
  const xRange = 4; // [-4, 4]

  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const x = -xRange + (i / 160) * (2 * xRange);
    const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-(x * x) / (2 * sigma * sigma));
    const px = padX + (i / 160) * plotW;
    const py = baseY - Math.min(1, pdf / 0.85) * maxY;
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Zero-Mean Gaussian Noise PDF</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          σ = {sigma.toFixed(1)} · Variance σ² = {(sigma * sigma).toFixed(2)}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={baseY} x2={SVG_W - padX} y2={baseY} stroke="#DFCFA9" strokeWidth="1.5" />
        <line x1={SVG_W / 2} y1={24} x2={SVG_W / 2} y2={baseY} stroke="#DFCFA9" strokeDasharray="4 4" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" points={pts.join(' ')} />
        <text x={SVG_W / 2 - 14} y={baseY + 16} className="fill-ink-muted text-[11px] font-mono">μ=0</text>
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="gauss-sigma" className="font-medium text-ink">Noise Std. Dev (σ)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">σ = {sigma.toFixed(1)}</span>
          </div>
          <input
            id="gauss-sigma"
            type="range"
            min={0.5}
            max={2.2}
            step={0.1}
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 9. Hamming Distance & Single-Bit Error Correction Cube */
const HammingCubeSim: React.FC<Omit<SimulationProps, 'type'>> = ({
  controlledValue,
  onControlledChange,
  hideInternalSlider,
}) => {
  const [localMode, setLocalMode] = useState(3);
  const dMin = controlledValue ?? localMode;
  const setDMin = onControlledChange ?? setLocalMode;

  const canDetect = Math.max(0, dMin - 1);
  const canCorrect = Math.floor((dMin - 1) / 2);

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Minimum Hamming Distance (d_min)</span>
        <span className="font-mono tabular-nums text-cobalt font-semibold">
          d_min = {dMin} · Detect {canDetect} · Correct {canCorrect}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} 150`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        {/* Draw two valid codewords separated by d_min steps */}
        <circle cx={90} cy={75} r={dMin >= 3 ? 34 : 18} fill="#1C6B4E" opacity="0.14" stroke="#1C6B4E" strokeDasharray="4 3" />
        <circle cx={390} cy={75} r={dMin >= 3 ? 34 : 18} fill="#1D4E89" opacity="0.14" stroke="#1D4E89" strokeDasharray="4 3" />

        <line x1={90} y1={75} x2={390} y2={75} stroke="#DFCFA9" strokeWidth="2" />
        {Array.from({ length: Math.max(0, dMin - 1) }).map((_, i) => {
          const x = 90 + ((i + 1) / dMin) * 300;
          return <circle key={i} cx={x} cy={75} r="5" fill="#FFFDF6" stroke="#9A5B13" strokeWidth="2" />;
        })}

        <circle cx={90} cy={75} r="9" fill="#1C6B4E" stroke="#FFFDF6" strokeWidth="2" />
        <circle cx={390} cy={75} r="9" fill="#1D4E89" stroke="#FFFDF6" strokeWidth="2" />

        <text x={58} y={128} className="fill-ink text-[11px] font-mono">Codeword A</text>
        <text x={358} y={128} className="fill-ink text-[11px] font-mono">Codeword B</text>
        <text x={208} y={42} className="fill-ochre text-[11px] font-mono">{dMin} bit flips apart</text>
      </svg>

      {!hideInternalSlider && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="hamming-d" className="font-medium text-ink">Minimum Distance (d_min)</label>
            <span className="font-mono tabular-nums text-cobalt font-semibold">d_min = {dMin}</span>
          </div>
          <input
            id="hamming-d"
            type="range"
            min={1}
            max={5}
            step={1}
            value={dMin}
            onChange={(e) => setDMin(Number(e.target.value))}
            className="w-full papyrus-slider"
          />
        </div>
      )}
    </div>
  );
};

/* 10. ASK / FSK / BPSK Digital Modulation Waveforms */
const ModulationWavesSim: React.FC = () => {
  const [scheme, setScheme] = useState<'ASK' | 'FSK' | 'BPSK'>('ASK');
  const [bits, setBits] = useState<number[]>([1, 0, 1, 1]);

  const toggleBit = (idx: number) => {
    setBits((prev) => prev.map((b, i) => (i === idx ? (b === 1 ? 0 : 1) : b)));
  };

  const padX = 24;
  const plotW = SVG_W - padX * 2;
  const midY = SVG_H / 2 + 10;
  const amp = 52;

  const wavePts: string[] = [];
  const totalSteps = 240;
  for (let i = 0; i <= totalSteps; i++) {
    const u = i / totalSteps; // 0..1 across 4 bit intervals
    const bitIdx = Math.min(3, Math.floor(u * 4));
    const localU = u * 4 - bitIdx; // 0..1 within bit slot
    const bit = bits[bitIdx];

    let y = 0;
    if (scheme === 'ASK') {
      const a = bit === 1 ? 1.0 : 0.2;
      y = a * Math.sin(2 * Math.PI * 3 * localU);
    } else if (scheme === 'FSK') {
      const cycles = bit === 1 ? 4 : 2;
      y = Math.sin(2 * Math.PI * cycles * localU);
    } else {
      const sign = bit === 1 ? 1 : -1;
      y = sign * Math.sin(2 * Math.PI * 2.5 * localU);
    }
    const px = padX + u * plotW;
    const py = midY - y * amp;
    wavePts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">
          Carrier Waveforms · {scheme === 'ASK' ? 'Amplitude Shift' : scheme === 'FSK' ? 'Frequency Shift' : 'Phase Shift (180°)'}
        </span>
        <span className="font-mono text-cobalt font-semibold">
          Bits: {bits.join(' ')}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        <line x1={padX} y1={midY} x2={SVG_W - padX} y2={midY} stroke="#DFCFA9" strokeWidth="1.5" />
        {[1, 2, 3].map((slot) => {
          const sx = padX + (slot / 4) * plotW;
          return (
            <line
              key={slot}
              x1={sx}
              y1={22}
              x2={sx}
              y2={SVG_H - 18}
              stroke="#DFCFA9"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          );
        })}
        {bits.map((b, idx) => {
          const bx = padX + ((idx + 0.5) / 4) * plotW;
          return (
            <text
              key={idx}
              x={bx}
              y={26}
              textAnchor="middle"
              className="fill-ochre text-[13px] font-mono font-semibold"
            >
              {b}
            </text>
          );
        })}
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.3" strokeLinejoin="round" points={wavePts.join(' ')} />
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid grid-cols-3 gap-1.5">
          {(['ASK', 'FSK', 'BPSK'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setScheme(m)}
              className={`min-h-[40px] rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                scheme === m
                  ? 'bg-cobalt text-vellum border-cobalt'
                  : 'bg-papyrus text-ink border-rule hover:bg-papyrus-deep'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-ink-muted shrink-0">Tap bits:</span>
          <div className="grid grid-cols-4 gap-1.5 flex-1">
            {bits.map((b, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleBit(i)}
                className="min-h-[40px] rounded-lg bg-papyrus border border-rule font-mono text-xs font-semibold text-ink hover:bg-papyrus-deep cursor-pointer"
              >
                b{i + 1}={b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 11. Hamming (7,4) Interactive Venn Parity Syndrome Explorer */
const HammingSyndromeSim: React.FC = () => {
  // Base valid codeword for data d1=1, d2=0, d3=1, d4=1 -> p1=0, p2=1, p3=0
  // Bit indices: 0:d1, 1:d2, 2:d3, 3:d4, 4:p1, 5:p2, 6:p3
  const baseBits = [1, 0, 1, 1, 0, 1, 0];
  const [flippedIdx, setFlippedIdx] = useState<number | null>(3); // Start with d4 flipped to demonstrate syndrome!

  const bits = baseBits.map((b, i) => (i === flippedIdx ? 1 - b : b));
  // Circle A (p1): d1, d2, d4, p1  -> indices 0, 1, 3, 4
  // Circle B (p2): d1, d3, d4, p2  -> indices 0, 2, 3, 5
  // Circle C (p3): d2, d3, d4, p3  -> indices 1, 2, 3, 6
  const errA = (bits[0] ^ bits[1] ^ bits[3] ^ bits[4]) === 1;
  const errB = (bits[0] ^ bits[2] ^ bits[3] ^ bits[5]) === 1;
  const errC = (bits[1] ^ bits[2] ^ bits[3] ^ bits[6]) === 1;

  const bitLabels = ['d₁', 'd₂', 'd₃', 'd₄', 'p₁', 'p₂', 'p₃'];
  const coords = [
    { x: 240, y: 62 },  // d1 (top overlap A&B)
    { x: 185, y: 120 }, // d2 (left overlap A&C)
    { x: 295, y: 120 }, // d3 (right overlap B&C)
    { x: 240, y: 105 }, // d4 (center overlap A&B&C)
    { x: 162, y: 54 },  // p1 (only A)
    { x: 318, y: 54 },  // p2 (only B)
    { x: 240, y: 168 }, // p3 (only C)
  ];

  const syndrome = `${errA ? 1 : 0}${errB ? 1 : 0}${errC ? 1 : 0}`;

  return (
    <div className="bg-vellum border border-rule rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-ink">Hamming (7, 4) Parity Circles</span>
        <span
          className={`font-mono font-semibold tabular-nums ${
            flippedIdx === null ? 'text-verdigris' : 'text-vermilion'
          }`}
        >
          {flippedIdx === null
            ? '● Syndrome 000 (No error)'
            : `▲ Syndrome ${syndrome} → Bit ${bitLabels[flippedIdx]} flipped`}
        </span>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto bg-papyrus/50 rounded-xl border border-rule/60">
        {/* Circle A (Top-Left) */}
        <circle
          cx={196}
          cy={84}
          r={64}
          fill={errA ? '#B3261E' : '#1C6B4E'}
          opacity={errA ? 0.14 : 0.06}
          stroke={errA ? '#B3261E' : '#1C6B4E'}
          strokeWidth="2"
        />
        {/* Circle B (Top-Right) */}
        <circle
          cx={284}
          cy={84}
          r={64}
          fill={errB ? '#B3261E' : '#1D4E89'}
          opacity={errB ? 0.14 : 0.06}
          stroke={errB ? '#B3261E' : '#1D4E89'}
          strokeWidth="2"
        />
        {/* Circle C (Bottom) */}
        <circle
          cx={240}
          cy={138}
          r={64}
          fill={errC ? '#B3261E' : '#9A5B13'}
          opacity={errC ? 0.14 : 0.06}
          stroke={errC ? '#B3261E' : '#9A5B13'}
          strokeWidth="2"
        />

        <text x={78} y={36} className="fill-ink-muted text-[11px] font-mono">
          Check A: {errA ? 'FAIL' : 'OK'}
        </text>
        <text x={338} y={36} className="fill-ink-muted text-[11px] font-mono">
          Check B: {errB ? 'FAIL' : 'OK'}
        </text>
        <text x={324} y={188} className="fill-ink-muted text-[11px] font-mono">
          Check C: {errC ? 'FAIL' : 'OK'}
        </text>

        {coords.map((pt, idx) => {
          const isFlipped = flippedIdx === idx;
          return (
            <g
              key={idx}
              onClick={() => setFlippedIdx(isFlipped ? null : idx)}
              className="cursor-pointer"
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={15}
                fill={isFlipped ? '#B3261E' : '#FFFDF6'}
                stroke={isFlipped ? '#B3261E' : '#1D4E89'}
                strokeWidth="2"
              />
              <text
                x={pt.x}
                y={pt.y + 4}
                textAnchor="middle"
                className={`text-[11px] font-mono font-semibold ${
                  isFlipped ? 'fill-vellum' : 'fill-ink'
                }`}
              >
                {bitLabels[idx]}:{bits[idx]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-ink-muted">Tap a bit in the diagram (or below) to inject a 1-bit flip:</span>
        <div className="flex flex-wrap gap-1.5">
          {bitLabels.map((lbl, idx) => (
            <button
              key={lbl}
              type="button"
              onClick={() => setFlippedIdx(flippedIdx === idx ? null : idx)}
              className={`min-h-[36px] px-2.5 rounded-lg font-mono text-xs font-semibold border cursor-pointer ${
                flippedIdx === idx
                  ? 'bg-vermilion text-vellum border-vermilion'
                  : 'bg-papyrus text-ink border-rule hover:bg-papyrus-deep'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

