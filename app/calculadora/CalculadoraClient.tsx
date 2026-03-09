'use client';
import { useState } from 'react';
import { LOTERIAS } from '../../lib/data';
import AdBanner from '../components/AdBanner';

function factorial(n: number): bigint {
  if (n <= 1) return BigInt(1);
  let result = BigInt(1);
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

function combinatoria(n: number, k: number): number {
  if (k > n) return 0;
  const num = factorial(n);
  const den = factorial(k) * factorial(n - k);
  return Number(num / den);
}

function formatProb(p: number): string {
  if (p === 0) return '0';
  const inv = Math.round(1 / p);
  if (inv >= 1_000_000) return `1 en ${(inv / 1_000_000).toFixed(1)}M`;
  if (inv >= 1000) return `1 en ${(inv / 1000).toFixed(0)}K`;
  return `1 en ${inv}`;
}

const JUEGOS_CUSTOM = [
  { nombre: 'Quiniela (3 números del 0–99)', rangoN: 100, k: 3, tipo: 'ordered' },
  { nombre: 'Pale (2 números del 0–99)', rangoN: 100, k: 2, tipo: 'ordered' },
  { nombre: 'Loto (6 de 38)', rangoN: 38, k: 6, tipo: 'combo' },
  { nombre: 'Lotomax (5 de 36)', rangoN: 36, k: 5, tipo: 'combo' },
  { nombre: 'Personalizado', rangoN: 0, k: 0, tipo: 'custom' },
];

export default function CalculadoraClient() {
  const [juegoIdx, setJuegoIdx] = useState(0);
  const [customN, setCustomN] = useState(100);
  const [customK, setCustomK] = useState(3);
  const [numApuestas, setNumApuestas] = useState(1);

  const juego = JUEGOS_CUSTOM[juegoIdx];
  const n = juego.tipo === 'custom' ? customN : juego.rangoN;
  const k = juego.tipo === 'custom' ? customK : juego.k;

  let prob1 = 0;
  let formas = 0;
  if (juego.tipo === 'ordered') {
    // Quiniela/Pale: orden importa (permutaciones)
    formas = n ** k; // simplificado para quiniela
    prob1 = 1 / formas;
  } else {
    formas = combinatoria(n, k);
    prob1 = formas > 0 ? 1 / formas : 0;
  }

  const probN = 1 - Math.pow(1 - prob1, numApuestas);

  const NIVELES = [
    { label: 'Acertar 1 número', prob: 1 / n, icon: '🎫' },
    { label: 'Acertar 2 números (pale)', prob: juego.tipo === 'ordered' ? 1 / (n * n) : combinatoria(k, 2) / formas, icon: '🥈' },
    { label: 'Jackpot', prob: prob1, icon: '🏆' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>
          🧮 Calculadora de Probabilidades
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem' }}>
          Calcula las probabilidades reales de ganar en cada tipo de juego
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {/* Juego selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            Tipo de juego
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {JUEGOS_CUSTOM.map((j, i) => (
              <button key={i} onClick={() => setJuegoIdx(i)}
                style={{ padding: '0.65rem 1rem', borderRadius: 10, border: `2px solid ${juegoIdx === i ? 'var(--accent)' : 'var(--border)'}`, background: juegoIdx === i ? 'rgba(59,130,246,0.1)' : 'var(--bg-card2)', color: juegoIdx === i ? 'var(--text)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                {j.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Custom params */}
        {juegoIdx === 4 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Total de números (N)</label>
              <input type="number" min={2} max={1000} value={customN} onChange={e => setCustomN(parseInt(e.target.value) || 2)}
                style={{ width: '100%', padding: '0.6rem 0.9rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '1rem', textAlign: 'center' }} />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Números a elegir (K)</label>
              <input type="number" min={1} max={customN} value={customK} onChange={e => setCustomK(parseInt(e.target.value) || 1)}
                style={{ width: '100%', padding: '0.6rem 0.9rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '1rem', textAlign: 'center' }} />
            </div>
          </div>
        )}

        {/* Num apuestas */}
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            <span>Número de apuestas</span>
            <span style={{ color: 'var(--accent)' }}>{numApuestas}</span>
          </label>
          <input type="range" min={1} max={100} value={numApuestas} onChange={e => setNumApuestas(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <span>1 apuesta</span><span>50</span><span>100 apuestas</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #ef4444' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>Posibilidades totales</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#ef4444' }}>
            {formas > 1e9 ? `${(formas / 1e9).toFixed(2)}B` : formas > 1e6 ? `${(formas / 1e6).toFixed(2)}M` : formas > 1000 ? `${(formas / 1000).toFixed(1)}K` : formas.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>combinaciones posibles</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid var(--accent)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>Probabilidad (1 apuesta)</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: 'var(--accent)' }}>
            {formatProb(prob1)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{(prob1 * 100).toFixed(6)}%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #10b981' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>Con {numApuestas} apuesta{numApuestas > 1 ? 's' : ''}</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#10b981' }}>
            {(probN * 100).toFixed(4)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>probabilidad acumulada</div>
        </div>
      </div>

      {/* Levels */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>Probabilidad por nivel de premio</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NIVELES.map((niv, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-card2)', borderRadius: 10 }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{niv.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>{niv.label}</div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--border)', overflow: 'hidden', marginTop: 4 }}>
                  <div style={{ height: '100%', borderRadius: 3, width: `${Math.min(100, niv.prob * 10000)}%`, background: i === 0 ? '#10b981' : i === 1 ? 'var(--accent)' : '#f59e0b' }}></div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)', flexShrink: 0 }}>
                {formatProb(niv.prob)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem', marginBottom: '2rem', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          ℹ️ <strong style={{ color: 'var(--text)' }}>Fórmulas utilizadas:</strong> Para quiniela/pale se calculan permutaciones (N^K). Para loto/combinaciones se usa C(N,K) = N! / (K! × (N-K)!). La probabilidad acumulada con N apuestas se calcula como P = 1 - (1 - p)^N.
        </p>
      </div>

      <AdBanner />
    </div>
  );
}
