import { Resultado, Loteria } from '../../lib/data';
import Link from 'next/link';

interface Props {
  resultado: Resultado;
  loteria: Loteria;
}

export default function ResultCard({ resultado, loteria }: Props) {
  const isPending = resultado.fuente === 'pendiente';
  const sorteo = loteria.sorteos.find(s => s.id === resultado.sorteoId);

  return (
    <div className="card" style={{ borderTop: `3px solid ${loteria.color}`, padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Link href={`/resultados/${loteria.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: loteria.color, marginBottom: 2 }}>
              {loteria.nombre}
            </h3>
          </Link>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sorteo?.nombre || resultado.sorteoId}</p>
        </div>
        <span className={isPending ? 'badge-pending' : 'badge-verified'}>
          {isPending ? '⏳ Pendiente' : '✓ Verificado'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: 14 }}>
        {resultado.numeros.map((n, i) => (
          <div key={i} className="num-ball"
            style={{ background: isPending ? '#2d3748' : `linear-gradient(145deg, ${loteria.color}, ${loteria.color}cc)`, color: 'white' }}>
            {n}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          🕐 {resultado.timestamp}
        </span>
        {resultado.premio && (
          <span style={{ fontSize: '0.75rem', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 999 }}>
            {resultado.premio}
          </span>
        )}
      </div>
    </div>
  );
}
