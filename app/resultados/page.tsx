import { LOTERIAS, RESULTADOS_HOY, HISTORICO, getLoteria } from '../../lib/data';
import ResultCard from '../components/ResultCard';
import AdBanner from '../components/AdBanner';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resultados de Todas las Loterías Dominicanas',
  description: 'Consulta los resultados de todas las loterías dominicanas: Lotería Nacional, Leidsa, Loteka, La Primera, La Suerte y más.',
};

export default function ResultadosPage() {
  const fecha = new Date().toLocaleDateString('es-DO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 8 }}>
          Resultados de Hoy
        </h1>
        <p style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{fecha}</p>
      </div>

      {LOTERIAS.map(loteria => {
        const resultados = RESULTADOS_HOY.filter(r => r.loteriaId === loteria.id);
        const historico = HISTORICO.filter(r => r.loteriaId === loteria.id).slice(0, 3);

        return (
          <section key={loteria.id} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid', borderImage: `linear-gradient(90deg, ${loteria.color}, transparent) 1`, paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.5rem' }}>{loteria.logo}</span>
                <Link href={`/resultados/${loteria.id}`} style={{ textDecoration: 'none' }}>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: loteria.color }}>{loteria.nombre}</h2>
                </Link>
              </div>
              <Link href={`/resultados/${loteria.id}`} style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}>Histórico →</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.9rem' }}>
              {resultados.map(r => <ResultCard key={r.id} resultado={r} loteria={loteria} />)}
            </div>

            {historico.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-card2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Últimos sorteos</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {historico.map(h => (
                    <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.fecha}</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {h.numeros.map((n, i) => (
                          <span key={i} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: loteria.color, background: `${loteria.color}15`, padding: '1px 7px', borderRadius: 6 }}>{n}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
