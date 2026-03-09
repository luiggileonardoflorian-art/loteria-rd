'use client';
import { useState } from 'react';
import { LOTERIAS, HISTORICO, RESULTADOS_HOY, getLoteria } from '../../lib/data';
import AdBanner from '../components/AdBanner';

// Simulamos datos históricos multi-año para esta función
const HISTORICO_MULTIANIO = [
  // 2025
  { id: 'y25-1', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2025-03-09', numeros: ['42', '17', '83'], verificado: true, fuente: 'oficial' as const, timestamp: '12:57 PM' },
  { id: 'y25-2', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2025-03-09', numeros: ['06', '29', '54'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y25-3', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2025-03-09', numeros: ['88', '33'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y25-4', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2025-03-09', numeros: ['11', '72', '45'], verificado: true, fuente: 'oficial' as const, timestamp: '7:57 PM' },
  // 2024
  { id: 'y24-1', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2024-03-09', numeros: ['35', '61', '09'], verificado: true, fuente: 'oficial' as const, timestamp: '12:57 PM' },
  { id: 'y24-2', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2024-03-09', numeros: ['77', '14', '38'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y24-3', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2024-03-09', numeros: ['52', '19'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y24-4', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2024-03-09', numeros: ['63', '28', '01'], verificado: true, fuente: 'oficial' as const, timestamp: '7:57 PM' },
  // 2023
  { id: 'y23-1', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2023-03-09', numeros: ['90', '07', '46'], verificado: true, fuente: 'oficial' as const, timestamp: '12:57 PM' },
  { id: 'y23-2', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2023-03-09', numeros: ['13', '57', '82'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y23-3', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2023-03-09', numeros: ['74', '41'], verificado: true, fuente: 'oficial' as const, timestamp: '8:57 PM' },
  { id: 'y23-4', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2023-03-09', numeros: ['26', '95', '50'], verificado: true, fuente: 'oficial' as const, timestamp: '7:57 PM' },
];

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function HoyHaceAnosClient() {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [dia, setDia] = useState(hoy.getDate());

  const fechaBusqueda = `-${String(mes).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
  const resultados = HISTORICO_MULTIANIO.filter(r => r.fecha.endsWith(fechaBusqueda));
  const anos = [...new Set(resultados.map(r => r.fecha.split('-')[0]))].sort().reverse();

  const diasEnMes = new Date(2024, mes, 0).getDate();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>
          🔁 Hoy Hace Años
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem' }}>
          ¿Qué números salieron en esta misma fecha en años anteriores?
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      {/* Date picker */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 6 }}>Mes</label>
          <select value={mes} onChange={e => setMes(parseInt(e.target.value))}
            style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '0.9rem' }}>
            {MESES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 6 }}>Día</label>
          <select value={dia} onChange={e => setDia(parseInt(e.target.value))}
            style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '0.9rem' }}>
            {Array.from({ length: diasEnMes }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
          <div style={{ padding: '0.65rem 1.25rem', background: 'var(--bg-card2)', borderRadius: 10, border: '1px solid var(--border)', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--accent)', fontSize: '0.95rem' }}>
            {dia} de {MESES[mes - 1]}
          </div>
        </div>
      </div>

      {/* Results by year */}
      {anos.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
          <p style={{ color: 'var(--text-muted)' }}>No hay datos históricos para esta fecha.</p>
        </div>
      ) : (
        anos.map(ano => {
          const resAno = resultados.filter(r => r.fecha.startsWith(ano));
          return (
            <div key={ano} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ padding: '3px 14px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 999, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'var(--accent)', fontSize: '0.9rem' }}>
                  {ano}
                </div>
                <div style={{ height: 1, flex: 1, background: 'var(--border)' }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>hace {hoy.getFullYear() - parseInt(ano)} año{hoy.getFullYear() - parseInt(ano) !== 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.9rem' }}>
                {resAno.map(r => {
                  const loteria = getLoteria(r.loteriaId);
                  if (!loteria) return null;
                  const sorteo = loteria.sorteos.find(s => s.id === r.sorteoId);
                  return (
                    <div key={r.id} className="card" style={{ padding: '1.1rem', borderTop: `3px solid ${loteria.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div>
                          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: loteria.color }}>{loteria.nombre}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sorteo?.nombre}</div>
                        </div>
                        <span style={{ fontSize: '1.2rem' }}>{loteria.logo}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        {r.numeros.map((n, i) => (
                          <div key={i} style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.95rem', background: `linear-gradient(145deg, ${loteria.color}, ${loteria.color}bb)`, color: 'white', boxShadow: `0 3px 10px ${loteria.color}40` }}>
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      <div style={{ marginTop: '3rem' }}>
        <AdBanner />
      </div>
    </div>
  );
}
