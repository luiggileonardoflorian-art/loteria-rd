'use client';
import { useState } from 'react';
import { LOTERIAS, RESULTADOS_HOY, HISTORICO } from '../../lib/data';
import AdBanner from '../components/AdBanner';

interface CheckResult {
  aciertos: number;
  total: number;
  numeros: string[];
  ganados: string[];
  categoria: string;
  premio: string;
}

export default function ComprobarClient() {
  const [loteriaId, setLoteriaId] = useState(LOTERIAS[0].id);
  const [sorteoId, setSorteoId] = useState('');
  const [numeros, setNumeros] = useState<string[]>(['', '', '']);
  const [resultado, setResultado] = useState<CheckResult | null>(null);
  const [checked, setChecked] = useState(false);

  const loteria = LOTERIAS.find(l => l.id === loteriaId)!;
  const todosResultados = [...RESULTADOS_HOY, ...HISTORICO].filter(r => r.loteriaId === loteriaId && r.fuente !== 'pendiente');
  const sorteoSeleccionado = sorteoId
    ? todosResultados.find(r => r.id === sorteoId)
    : todosResultados[0];

  function handleCheck() {
    if (!sorteoSeleccionado) return;
    const numerosResultado = sorteoSeleccionado.numeros;
    const ganados = numeros.filter(n => n && numerosResultado.includes(n.padStart(2, '0')));
    const aciertos = ganados.length;
    let categoria = 'Sin premio';
    let premio = '—';

    if (aciertos === numerosResultado.length) { categoria = '🏆 ¡JACKPOT!'; premio = 'Premio mayor — verificar con lotería oficial'; }
    else if (aciertos === 2 && numerosResultado.length >= 2) { categoria = '🥈 Pale / 2 aciertos'; premio = 'Premio secundario'; }
    else if (aciertos === 1) { categoria = '🎫 1 acierto'; premio = 'Revisa tabla de premios'; }

    setResultado({ aciertos, total: numerosResultado.length, numeros: numerosResultado, ganados, categoria, premio });
    setChecked(true);
  }

  function handleReset() {
    setNumeros(['', '', '']);
    setResultado(null);
    setChecked(false);
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 10 }}>
          🎯 Comprobar Jugada
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Ingresa tus números y verifica si ganaste
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      {/* Form */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {/* Lotería selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            1. Selecciona la Lotería
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
            {LOTERIAS.map(l => (
              <button key={l.id} onClick={() => { setLoteriaId(l.id); setSorteoId(''); handleReset(); }}
                style={{ padding: '0.6rem 1rem', borderRadius: 10, border: `2px solid ${loteriaId === l.id ? l.color : 'var(--border)'}`, background: loteriaId === l.id ? `${l.color}20` : 'var(--bg-card2)', color: loteriaId === l.id ? l.color : 'var(--text-muted)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {l.logo} {l.nombreCorto}
              </button>
            ))}
          </div>
        </div>

        {/* Sorteo selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            2. Selecciona el Sorteo
          </label>
          <select value={sorteoId} onChange={e => setSorteoId(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '0.9rem', cursor: 'pointer' }}>
            <option value="">Sorteo más reciente</option>
            {todosResultados.map(r => (
              <option key={r.id} value={r.id}>{r.fecha} — {loteria.sorteos.find(s => s.id === r.sorteoId)?.nombre}</option>
            ))}
          </select>
        </div>

        {/* Números */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
            3. Ingresa tus Números (del 00 al 99)
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {numeros.map((n, i) => (
              <input key={i} type="text" maxLength={2} value={n} placeholder="00"
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  setNumeros(prev => { const next = [...prev]; next[i] = val; return next; });
                  setChecked(false); setResultado(null);
                }}
                className="checker-input" />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleCheck}
            style={{ flex: 1, padding: '0.9rem', background: loteria.color, color: 'white', border: 'none', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}>
            Comprobar →
          </button>
          <button onClick={handleReset}
            style={{ padding: '0.9rem 1.25rem', background: 'var(--bg-card2)', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
            Limpiar
          </button>
        </div>
      </div>

      {/* Resultado */}
      {checked && resultado && sorteoSeleccionado && (
        <div className="card" style={{ padding: '2rem', border: `2px solid ${resultado.aciertos === resultado.total ? '#10b981' : resultado.aciertos > 0 ? '#f59e0b' : 'var(--border)'}`, animation: 'fadeUp 0.4s ease forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>
              {resultado.aciertos === resultado.total ? '🎉' : resultado.aciertos > 0 ? '⭐' : '😔'}
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: resultado.aciertos === resultado.total ? '#10b981' : resultado.aciertos > 0 ? '#f59e0b' : 'var(--text-muted)', marginBottom: 4 }}>
              {resultado.categoria}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{resultado.premio}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-card2)', borderRadius: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: loteria.color }}>{resultado.aciertos}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Aciertos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--text)' }}>{resultado.total}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total</div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>Números del sorteo:</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {resultado.numeros.map((n, i) => (
                <div key={i} style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', background: resultado.ganados.includes(n) ? loteria.color : 'var(--bg-card2)', color: resultado.ganados.includes(n) ? 'white' : 'var(--text-muted)', border: `2px solid ${resultado.ganados.includes(n) ? loteria.color : 'var(--border)'}` }}>
                  {n}
                </div>
              ))}
            </div>
          </div>

          <p style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: '0.78rem', color: '#f59e0b', textAlign: 'center' }}>
            ⚠️ Resultado informativo. Para reclamar premios, dirígete a la lotería oficial correspondiente.
          </p>
        </div>
      )}

      {/* Info */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>¿Cómo funciona?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {['Selecciona la lotería y el sorteo que quieres verificar.', 'Ingresa los números de tu jugada tal como los tienes en tu ticket.', 'Presiona "Comprobar" y verás tus aciertos al instante.', 'Si ganaste, acude a la lotería oficial para reclamar tu premio.'].map((step, i) => (
            <div key={i} className="card" style={{ padding: '1rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', marginBottom: 8 }}>{i + 1}</div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
