import { LOTERIAS, RESULTADOS_HOY, HISTORICO, getLoteria } from '../../../lib/data';
import ResultCard from '../../components/ResultCard';
import AdBanner from '../../components/AdBanner';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props { params: { loteriaId: string } }

export async function generateStaticParams() {
  return LOTERIAS.map(l => ({ loteriaId: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loteria = getLoteria(params.loteriaId);
  if (!loteria) return {};
  return {
    title: `Resultados ${loteria.nombre} Hoy — Números Ganadores`,
    description: `Consulta los resultados de ${loteria.nombre} hoy. Números ganadores verificados, histórico, estadísticas y horarios de sorteos.`,
  };
}

export default function LoteriaPage({ params }: Props) {
  const loteria = getLoteria(params.loteriaId);
  if (!loteria) notFound();

  const resultadosHoy = RESULTADOS_HOY.filter(r => r.loteriaId === loteria.id);
  const historico = [...RESULTADOS_HOY, ...HISTORICO].filter(r => r.loteriaId === loteria.id && r.fuente !== 'pendiente');

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: `${loteria.color}20`, border: `2px solid ${loteria.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
          {loteria.logo}
        </div>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: loteria.color, marginBottom: 4 }}>
            {loteria.nombre}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{loteria.descripcion}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <a href={loteria.sitioOficial} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 14px', borderRadius: 8 }}>
            Sitio oficial ↗
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { href: `/comprobar?loteria=${loteria.id}`, label: '🎯 Comprobar jugada' },
          { href: `/estadisticas?loteria=${loteria.id}`, label: '📊 Estadísticas' },
          { href: `/horarios`, label: '🕐 Horarios' },
        ].map(a => (
          <Link key={a.href} href={a.href} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}>
            {a.label}
          </Link>
        ))}
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      {/* Resultados hoy */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1rem' }}>Resultados de Hoy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {resultadosHoy.map(r => <ResultCard key={r.id} resultado={r} loteria={loteria} />)}
        </div>
      </section>

      {/* Sorteos de esta lotería */}
      <section className="card" style={{ padding: '1.5rem', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Sorteos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {loteria.sorteos.map(s => (
            <div key={s.id} style={{ padding: '0.9rem 1rem', background: 'var(--bg-card2)', borderRadius: 10, borderLeft: `3px solid ${loteria.color}` }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{s.nombre}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 2 }}>🕐 {s.hora}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📆 {s.dias}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Histórico */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1rem' }}>📋 Histórico de Sorteos</h2>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Sorteo</th>
                <th>Números</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {historico.slice(0, 20).map(r => {
                const sorteo = loteria.sorteos.find(s => s.id === r.sorteoId);
                return (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{r.fecha}</td>
                    <td>{sorteo?.nombre || r.sorteoId}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {r.numeros.map((n, i) => (
                          <span key={i} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: loteria.color, background: `${loteria.color}15`, padding: '2px 8px', borderRadius: 6 }}>{n}</span>
                        ))}
                      </div>
                    </td>
                    <td><span className="badge-verified">✓ Verificado</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <Link href="/resultados" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem' }}>← Todas las loterías</Link>
        <Link href="/historico" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem' }}>Histórico completo →</Link>
      </div>

      <AdBanner />
    </div>
  );
}
