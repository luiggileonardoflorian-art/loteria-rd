'use client';
import { useState } from 'react';
import { LOTERIAS, ESTADISTICAS_NACIONAL } from '../../lib/data';
import AdBanner from '../components/AdBanner';

type Peso = 'frecuencia' | 'recencia' | 'equilibrado' | 'aleatorio';

function generarCombinacion(cantidad: number, rangoMax: number, peso: Peso, alpha: number): string[] {
  const nums = Array.from({ length: rangoMax }, (_, i) => i.toString().padStart(2, '0'));
  
  if (peso === 'aleatorio') {
    const shuffled = [...nums].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, cantidad);
  }

  // Pesos basados en estadísticas
  const statsMap: Record<string, { freq: number; recencia: number }> = {};
  ESTADISTICAS_NACIONAL.forEach((s, idx) => {
    statsMap[s.numero] = { freq: s.frecuencia / 28, recencia: 1 - (idx / ESTADISTICAS_NACIONAL.length) };
  });

  const weighted = nums.map(n => {
    const stat = statsMap[n];
    if (!stat) return { n, w: Math.random() };
    const normFreq = stat.freq;
    const normRec = stat.recencia;
    let w: number;
    if (peso === 'frecuencia') w = alpha * normFreq + (1 - alpha) * Math.random() * 0.3;
    else if (peso === 'recencia') w = alpha * normRec + (1 - alpha) * Math.random() * 0.3;
    else w = alpha * (normFreq * 0.5 + normRec * 0.5) + (1 - alpha) * Math.random() * 0.4;
    return { n, w };
  });

  weighted.sort((a, b) => b.w - a.w);
  return weighted.slice(0, cantidad).map(x => x.n).sort(() => Math.random() - 0.5);
}

export default function GeneradorClient() {
  const [loteriaId, setLoteriaId] = useState('loteria-nacional');
  const [sorteoId, setSorteoId] = useState('');
  const [peso, setPeso] = useState<Peso>('equilibrado');
  const [alpha, setAlpha] = useState(0.6);
  const [combinaciones, setCombinaciones] = useState<string[][]>([]);
  const [cantidad, setCantidad] = useState(5);

  const loteria = LOTERIAS.find(l => l.id === loteriaId)!;
  const sorteo = sorteoId ? loteria.sorteos.find(s => s.id === sorteoId) : loteria.sorteos[0];

  function generar() {
    const nuevas: string[][] = [];
    for (let i = 0; i < cantidad; i++) {
      nuevas.push(generarCombinacion(sorteo?.cantidadNumeros || 3, sorteo?.rangoMax || 100, peso, alpha));
    }
    setCombinaciones(nuevas);
  }

  const PESOS: { v: Peso; label: string; desc: string; icon: string }[] = [
    { v: 'frecuencia', label: 'Frecuentes', desc: 'Números que más han salido', icon: '🔥' },
    { v: 'recencia', label: 'Recientes', desc: 'Números que salieron últimamente', icon: '⚡' },
    { v: 'equilibrado', label: 'Equilibrado', desc: 'Mezcla de frecuencia y recencia', icon: '⚖️' },
    { v: 'aleatorio', label: 'Aleatorio', desc: 'Completamente al azar', icon: '🎲' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>
          🎲 Generador de Combinaciones
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', fontSize: '0.93rem' }}>
          Genera combinaciones basadas en estadísticas históricas. Solo para entretenimiento — las loterías son juegos de azar.
        </p>
      </div>

      <div style={{ padding: '0.9rem 1.25rem', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, marginBottom: '2rem', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span>⚠️</span>
        <span style={{ fontSize: '0.8rem', color: '#f59e0b', lineHeight: 1.6 }}>
          <strong>Aviso importante:</strong> Este generador es una herramienta de entretenimiento. Las loterías son juegos de azar donde cada sorteo es independiente. Ningún sistema garantiza ganar. Juega con responsabilidad. +18.
        </span>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {/* Lotería */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            Lotería
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {LOTERIAS.map(l => (
              <button key={l.id} onClick={() => { setLoteriaId(l.id); setSorteoId(''); setCombinaciones([]); }}
                style={{ padding: '5px 14px', borderRadius: 8, border: `2px solid ${loteriaId === l.id ? l.color : 'var(--border)'}`, background: loteriaId === l.id ? `${l.color}18` : 'var(--bg-card2)', color: loteriaId === l.id ? l.color : 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {l.logo} {l.nombreCorto}
              </button>
            ))}
          </div>
        </div>

        {/* Sorteo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            Tipo de sorteo
          </label>
          <select value={sorteoId} onChange={e => setSorteoId(e.target.value)}
            style={{ padding: '0.6rem 1rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '0.88rem', minWidth: 220 }}>
            {loteria.sorteos.map(s => (
              <option key={s.id} value={s.id}>{s.nombre} ({s.cantidadNumeros} números del 0 al {s.rangoMax - 1})</option>
            ))}
          </select>
        </div>

        {/* Peso */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            Estrategia de selección
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {PESOS.map(p => (
              <button key={p.v} onClick={() => setPeso(p.v)}
                style={{ padding: '0.75rem', borderRadius: 10, border: `2px solid ${peso === p.v ? 'var(--accent)' : 'var(--border)'}`, background: peso === p.v ? 'rgba(59,130,246,0.1)' : 'var(--bg-card2)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: peso === p.v ? '#f0f4ff' : 'var(--text-muted)' }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Alpha slider */}
        {peso !== 'aleatorio' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
              <span>Peso estadístico (α)</span>
              <span style={{ color: 'var(--accent)' }}>{(alpha * 100).toFixed(0)}% estadísticas / {((1 - alpha) * 100).toFixed(0)}% azar</span>
            </label>
            <input type="range" min={0.1} max={0.9} step={0.1} value={alpha} onChange={e => setAlpha(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>
        )}

        {/* Cantidad */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            Número de combinaciones: <span style={{ color: 'var(--accent)' }}>{cantidad}</span>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[3, 5, 10, 20].map(n => (
              <button key={n} onClick={() => setCantidad(n)}
                style={{ padding: '5px 16px', borderRadius: 8, border: `1px solid ${cantidad === n ? 'var(--accent)' : 'var(--border)'}`, background: cantidad === n ? 'rgba(59,130,246,0.1)' : 'var(--bg-card2)', color: cantidad === n ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generar}
          style={{ width: '100%', padding: '0.9rem', background: `linear-gradient(135deg, ${loteria.color}, ${loteria.color}bb)`, color: 'white', border: 'none', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.02em' }}>
          ✨ Generar Combinaciones
        </button>
      </div>

      {/* Results */}
      {combinaciones.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>
            Combinaciones generadas ({combinaciones.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {combinaciones.map((combo, i) => (
              <div key={i} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-muted)', minWidth: 30 }}>#{i + 1}</span>
                <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                  {combo.map((n, j) => (
                    <div key={j} style={{ width: 46, height: 46, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', background: `linear-gradient(145deg, ${loteria.color}, ${loteria.color}bb)`, color: 'white', boxShadow: `0 4px 12px ${loteria.color}40, inset 0 -2px 4px rgba(0,0,0,0.25)`, position: 'relative', overflow: 'hidden' }}>
                      <span style={{ position: 'absolute', top: 4, left: 7, width: '35%', height: '22%', background: 'rgba(255,255,255,0.28)', borderRadius: '50%', filter: 'blur(1px)' }}></span>
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setCombinaciones([])}
            style={{ marginTop: 12, padding: '7px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.83rem' }}>
            Limpiar
          </button>
        </div>
      )}

      <AdBanner />
    </div>
  );
}
