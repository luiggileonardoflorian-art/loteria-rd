import { LOTERIAS } from '../../lib/data';
import AdBanner from '../components/AdBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Cobrar Premios de Lotería Dominicana — Guía Completa',
  description: 'Guía completa para cobrar premios de lotería en República Dominicana. Documentos requeridos, plazos, impuestos y pasos a seguir.',
};

const PASOS = [
  { num: '01', titulo: 'Verifica tu número ganador', desc: 'Comprueba tus números en LoteríaRD o directamente en la web oficial de la lotería correspondiente. Asegúrate de que el sorteo esté marcado como "Verificado".', icon: '🔍', color: '#3b82f6' },
  { num: '02', titulo: 'Guarda tu ticket original', desc: 'Conserva el ticket físico en buen estado. Sin el ticket original NO puedes reclamar el premio. No lo dobles, mojes ni deteriores.', icon: '🎫', color: '#8b5cf6' },
  { num: '03', titulo: 'Verifica el plazo de cobro', desc: 'Los premios tienen un plazo limitado para ser cobrados (generalmente 60–90 días desde el sorteo). Pasado este tiempo, el premio caduca.', icon: '⏰', color: '#f59e0b' },
  { num: '04', titulo: 'Prepara los documentos', desc: 'Necesitarás tu cédula de identidad dominicana vigente (o pasaporte si eres extranjero) y el ticket original ganador.', icon: '📄', color: '#10b981' },
  { num: '05', titulo: 'Dirígete al punto de pago', desc: 'Los premios pequeños se cobran en las bancas o puntos autorizados. Los premios mayores deben cobrarse en las oficinas centrales de la lotería.', icon: '🏢', color: '#ef4444' },
  { num: '06', titulo: 'Recibe tu pago', desc: 'Los premios pequeños se pagan en efectivo. Los premios mayores pueden pagarse por cheque o transferencia bancaria, dependiendo del monto.', icon: '💵', color: '#10b981' },
];

const LIMITES_COBRO = [
  { rango: 'Hasta RD$5,000', lugar: 'Banca autorizada', docs: 'Solo el ticket', tiempo: 'Inmediato' },
  { rango: 'RD$5,000 – RD$50,000', lugar: 'Banca o sucursal', docs: 'Ticket + cédula', tiempo: '24 horas' },
  { rango: 'RD$50,000 – RD$500,000', lugar: 'Oficina central', docs: 'Ticket + cédula + formulario', tiempo: '1–3 días' },
  { rango: 'Más de RD$500,000', lugar: 'Solo oficina central', docs: 'Ticket + cédula + formulario DGII + declaración', tiempo: '3–7 días' },
];

const IMPUESTOS = [
  { tipo: 'Premios hasta RD$5,000', tasa: '0%', nota: 'Exento de impuestos' },
  { tipo: 'Premios de RD$5,001 a RD$500,000', tasa: '10%', nota: 'Retención en la fuente' },
  { tipo: 'Premios mayores de RD$500,000', tasa: '25%', nota: 'ISR sobre la ganancia' },
];

export default function CobrarPremiosPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>
          💰 Cómo Cobrar tu Premio
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', fontSize: '0.93rem' }}>
          Guía paso a paso para reclamar tus premios de lotería dominicana. Todo lo que necesitas saber.
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2.5rem' }}></div>

      {/* Pasos */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          Pasos para cobrar tu premio
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {PASOS.map((p, i) => (
            <div key={i} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', borderLeft: `4px solid ${p.color}` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}18`, border: `2px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  {p.icon}
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.7rem', color: p.color, marginTop: 4 }}>PASO {p.num}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{p.titulo}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner />
      <div style={{ marginBottom: '2.5rem' }}></div>

      {/* Límites de cobro */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
          ¿Dónde cobrar según el monto?
        </h2>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Monto del premio</th>
                <th>Dónde cobrar</th>
                <th>Documentos</th>
                <th>Tiempo estimado</th>
              </tr>
            </thead>
            <tbody>
              {LIMITES_COBRO.map((r, i) => (
                <tr key={i}>
                  <td><span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--accent)' }}>{r.rango}</span></td>
                  <td>{r.lugar}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{r.docs}</td>
                  <td><span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.82rem' }}>{r.tiempo}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Impuestos */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
          🏛 Impuestos sobre premios
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.7 }}>
          En República Dominicana, los premios de lotería están sujetos al Impuesto Sobre la Renta (ISR) según la Ley 11-92. La retención se aplica en la fuente al momento del cobro.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.9rem' }}>
          {IMPUESTOS.map((imp, i) => (
            <div key={i} className="card" style={{ padding: '1.25rem', textAlign: 'center', borderTop: `3px solid ${i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#ef4444'}` }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>{imp.tipo}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#ef4444', marginBottom: 4 }}>{imp.tasa}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{imp.nota}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', padding: '0.75rem', background: 'rgba(245,158,11,0.07)', borderRadius: 8 }}>
          ⚠️ Estos son rangos orientativos. Consulte con la DGII o un asesor tributario para casos específicos. Las tasas pueden variar.
        </p>
      </section>

      {/* Por lotería */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
          Contactos oficiales por lotería
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.9rem' }}>
          {LOTERIAS.map(l => (
            <div key={l.id} className="card" style={{ padding: '1.25rem', borderLeft: `4px solid ${l.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.4rem' }}>{l.logo}</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: l.color }}>{l.nombre}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.6 }}>{l.descripcion}</p>
              <a href={l.sitioOficial} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: l.color, textDecoration: 'none' }}>
                🌐 {l.sitioOficial.replace('https://', '')} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Consejos */}
      <section className="card" style={{ padding: '2rem', marginBottom: '3rem', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem', color: '#10b981' }}>
          ✅ Consejos importantes
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Fotografía tu ticket inmediatamente después de comprarlo como respaldo.',
            'No pierdas el ticket físico original — es el único comprobante válido.',
            'Verifica el plazo de cobro en la lotería correspondiente.',
            'Para premios grandes, considera asesorarte con un abogado o contador.',
            'Nunca le pagues a nadie para que "gestione" tu premio por ti.',
            'Desconfía de mensajes diciendo que ganaste si no compraste un ticket.',
          ].map((c, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <AdBanner />
    </div>
  );
}
