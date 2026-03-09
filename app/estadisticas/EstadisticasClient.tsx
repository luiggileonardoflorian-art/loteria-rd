'use client';
import { useState } from 'react';
import { LOTERIAS, ESTADISTICAS_NACIONAL } from '../../lib/data';
import AdBanner from '../components/AdBanner';

export default function EstadisticasClient() {
  const [loteriaId, setLoteriaId] = useState('loteria-nacional');
  const [ventana, setVentana] = useState<'calientes' | 'frios' | 'todos'>('todos');

  const loteria = LOTERIAS.find(l => l.id === loteriaId)!;
  const stats = ESTADISTICAS_NACIONAL;
  const maxFrecuencia = Math.max(...stats.map(s => s.frecuencia));

  const filtered = stats.filter(s => {
    if (ventana === 'calientes') return s.zScore > 0.5;
    if (ventana === 'frios') return s.zScore < -0.5;
    return true;
  }).sort((a, b) => b.frecuencia - a.frecuencia);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 10 }}>
          📊 Estadísticas de Números
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Frecuencia, números calientes/fríos y análisis histórico
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      {/* Lotería selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {LOTERIAS.map(l => (
          <button key={l.id} onClick={() => setLoteriaId(l.id)}
            style={{ padding: '0.5rem 1rem', borderRadius: 8, border: `2px solid ${loteriaId === l.id ? l.color : 'var(--border)'}`, background: loteriaId === l.id ? `${l.color}18` : 'var(--bg-card)', color: loteriaId === l.id ? l.color : 'var(--text-muted)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s' }}>
            {l.logo} {l.nombreCorto}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
        {[
          { v: 'todos' as const, label: 'Todos los números' },
          { v: 'calientes' as const, label: '🔥 Calientes (sobre media)' },
          { v: 'frios' as const, label: '❄️ Fríos (bajo media)' },
        ].map(f => (
          <button key={f.v} onClick={() => setVentana(f.v)}
            style={{ padding: '0.5rem 1rem', borderRadius: 8, border: `1px solid ${ventana === f.v ? 'var(--accent)' : 'var(--border)'}`, background: ventana === f.v ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)', color: ventana === f.v ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 500, fontSize: '0.82rem', cursor: 'pointer' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats cards top */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {filtered.slice(0, 10).map(s => (
          <div key={s.numero} className="card" style={{ padding: '1rem', textAlign: 'center', borderBottom: `3px solid ${s.zScore > 0.5 ? '#f97316' : s.zScore < -0.5 ? '#60a5fa' : loteria.color}` }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: s.zScore > 0.5 ? '#f97316' : s.zScore < -0.5 ? '#60a5fa' : loteria.color }}>
              {s.numero}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.frecuencia} veces</div>
            <div style={{ fontSize: '0.65rem', color: s.zScore > 0.5 ? '#f97316' : s.zScore < -0.5 ? '#60a5fa' : 'var(--text-muted)', marginTop: 2 }}>
              {s.zScore > 0.5 ? '🔥 Caliente' : s.zScore < -0.5 ? '❄️ Frío' : '⚖️ Normal'}
            </div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="card" style={{ marginBottom: '3rem', overflowX: 'auto' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
            Tabla de frecuencias — {loteria.nombre}
          </h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Número</th>
              <th>Frecuencia</th>
              <th style={{ minWidth: 200 }}>Barra</th>
              <th>Porcentaje</th>
              <th>Última vez</th>
              <th>Gap</th>
              <th>Clasificación</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.numero}>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{i + 1}</td>
                <td>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: loteria.color }}>
                    {s.numero}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{s.frecuencia}</td>
                <td>
                  <div className="stat-bar" style={{ width: 200 }}>
                    <div className="stat-bar-fill" style={{ width: `${(s.frecuencia / maxFrecuencia) * 100}%`, background: s.zScore > 0.5 ? '#f97316' : s.zScore < -0.5 ? '#60a5fa' : loteria.color }}></div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{s.porcentaje.toFixed(1)}%</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{s.ultimaAparicion}</td>
                <td>
                  <span style={{ fontWeight: 600, color: s.gap === 0 ? '#10b981' : s.gap > 5 ? '#ef4444' : 'var(--text-muted)' }}>
                    {s.gap === 0 ? 'Hoy' : `${s.gap} sorteos`}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.75rem', color: s.zScore > 0.5 ? '#f97316' : s.zScore < -0.5 ? '#60a5fa' : 'var(--text-muted)', fontWeight: 600 }}>
                    {s.zScore > 0.5 ? '🔥 Caliente' : s.zScore < -0.5 ? '❄️ Frío' : '⚖️ Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Probabilidad */}
      <div className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>
          🎲 Probabilidad de Acierto
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { tipo: 'Quiniela (3 números)', prob: '1 en 1,000,000', porcentaje: '0.0001%' },
            { tipo: 'Pale (2 números)', prob: '1 en 10,000', porcentaje: '0.01%' },
            { tipo: '1 número exacto', prob: '1 en 100', porcentaje: '1%' },
          ].map(p => (
            <div key={p.tipo} style={{ padding: '1rem', background: 'var(--bg-card2)', borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 6 }}>{p.tipo}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)', marginBottom: 2 }}>{p.prob}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.porcentaje}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', padding: '0.75rem', background: 'rgba(59,130,246,0.06)', borderRadius: 8 }}>
          ℹ️ Las estadísticas son informativas. En loterías de azar, cada sorteo es independiente y los resultados pasados no predicen los futuros. Juega con responsabilidad. +18.
        </p>
      </div>

      <AdBanner />
    </div>
  );
}
