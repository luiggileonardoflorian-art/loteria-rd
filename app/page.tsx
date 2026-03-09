import { LOTERIAS, RESULTADOS_HOY, getLoteria } from '../lib/data';
import ResultCard from './components/ResultCard';
import AdBanner from './components/AdBanner';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resultados Lotería Dominicana Hoy — Números Ganadores Verificados',
  description: 'Resultados de la lotería dominicana en tiempo real. Números ganadores verificados de Lotería Nacional, Leidsa, Loteka, La Primera, La Suerte. Comprobador, estadísticas e histórico.',
};

export default function HomePage() {
  const fecha = new Date().toLocaleDateString('es-DO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const verificados = RESULTADOS_HOY.filter(r => r.verificado).length;
  const pendientes = RESULTADOS_HOY.filter(r => !r.verificado).length;

  const HERRAMIENTAS = [
    { href: '/comprobar', icon: '🎯', label: 'Comprobar jugada', desc: 'Verifica si ganaste', color: '#3b82f6' },
    { href: '/estadisticas', icon: '📊', label: 'Estadísticas', desc: 'Números calientes/fríos', color: '#8b5cf6' },
    { href: '/historico', icon: '📅', label: 'Histórico', desc: 'Sorteos anteriores', color: '#f59e0b' },
    { href: '/hoy-hace-anos', icon: '🔁', label: 'Hoy hace años', desc: 'Misma fecha, años pasados', color: '#10b981' },
    { href: '/generador', icon: '🎲', label: 'Generador', desc: 'Combinaciones sugeridas', color: '#ef4444' },
    { href: '/calculadora', icon: '🧮', label: 'Calculadora', desc: 'Probabilidades reales', color: '#06b6d4' },
    { href: '/alertas', icon: '🔔', label: 'Alertas', desc: 'Notificaciones al instante', color: '#f97316' },
    { href: '/cobrar-premios', icon: '💰', label: 'Cobrar premios', desc: 'Guía paso a paso', color: '#84cc16' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 999, padding: '4px 14px', fontSize: '0.75rem', color: '#60a5fa', marginBottom: 18 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 1.5s ease-in-out infinite' }}></span>
          Resultados actualizados en tiempo real
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', lineHeight: 1.12, marginBottom: 14, color: '#f0f4ff' }}>
          Resultados Lotería<br />
          <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Dominicana Hoy
          </span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 22, textTransform: 'capitalize' }}>{fecha}</p>

        <div style={{ display: 'inline-flex', gap: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '0.85rem 1.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { n: verificados, label: 'Verificados', color: '#10b981' },
            { n: pendientes, label: 'Pendientes', color: '#f59e0b' },
            { n: LOTERIAS.length, label: 'Loterías', color: '#f0f4ff' },
            { n: LOTERIAS.reduce((a, l) => a + l.sorteos.length, 0), label: 'Sorteos/día', color: '#8b5cf6' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: s.color, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner />
      <div style={{ marginBottom: '2.5rem' }}></div>

      {/* Herramientas grid */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>🛠 Herramientas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {HERRAMIENTAS.map(h => (
            <Link key={h.href} href={h.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', height: '100%' }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `${h.color}16`, border: `1px solid ${h.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {h.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>{h.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>{h.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: h.color, fontSize: '0.85rem', flexShrink: 0 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Resultados hoy */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>🏆 Resultados de Hoy</h2>
          <Link href="/resultados" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}>Ver todos →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))', gap: '0.95rem' }}>
          {RESULTADOS_HOY.map(r => {
            const loteria = getLoteria(r.loteriaId);
            if (!loteria) return null;
            return <ResultCard key={r.id} resultado={r} loteria={loteria} />;
          })}
        </div>
      </section>

      <AdBanner />
      <div style={{ marginBottom: '3rem' }}></div>

      {/* Loterías hub */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>🎰 Todas las Loterías</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.85rem' }}>
          {LOTERIAS.map(l => (
            <Link key={l.id} href={`/resultados/${l.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.1rem', borderLeft: `4px solid ${l.color}`, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.4rem' }}>{l.logo}</span>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: l.color }}>{l.nombre}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.sorteos.length} sorteo{l.sorteos.length > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Ver resultados →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>¿Por qué usar LoteríaRD?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.85rem' }}>
          {[
            { icon: '⚡', title: 'Resultados al instante', desc: 'Publicamos los números minutos después de cada sorteo, antes que muchos otros portales.' },
            { icon: '✅', title: 'Resultados verificados', desc: 'Cada resultado pasa por verificación con múltiples fuentes antes de marcarse como "Verificado".' },
            { icon: '📱', title: 'Optimizado para móvil', desc: 'Diseñado primero para tu teléfono. Rápido, claro y sin anuncios invasivos.' },
            { icon: '🔔', title: 'Alertas personalizadas', desc: 'Recibe notificaciones push o email exactamente de las loterías que te interesan.' },
            { icon: '📊', title: 'Estadísticas reales', desc: 'Frecuencias, números calientes y fríos, probabilidades calculadas matemáticamente.' },
            { icon: '🆓', title: '100% gratuito', desc: 'Acceso completo a todos los resultados, herramientas y estadísticas sin costo alguno.' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>
          Resultados de Lotería Dominicana en Tiempo Real
        </h2>
        <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.875rem' }}>
          <p style={{ marginBottom: 10 }}>
            Bienvenido a <strong style={{ color: 'var(--text)' }}>LoteríaRD</strong>, el portal más completo de resultados de lotería de la República Dominicana.
            Consulta los números ganadores verificados de todas las loterías: Lotería Nacional, Leidsa, Loteka, Lotería Real, La Primera y La Suerte.
          </p>
          <p style={{ marginBottom: 10 }}>
            Además de los resultados, ofrecemos: <Link href="/comprobar" style={{ color: '#3b82f6' }}>comprobador de jugadas</Link>,{' '}
            <Link href="/estadisticas" style={{ color: '#3b82f6' }}>estadísticas de números calientes y fríos</Link>,{' '}
            <Link href="/historico" style={{ color: '#3b82f6' }}>histórico de sorteos</Link>,{' '}
            <Link href="/hoy-hace-anos" style={{ color: '#3b82f6' }}>resultados de esta fecha en años anteriores</Link>,{' '}
            <Link href="/generador" style={{ color: '#3b82f6' }}>generador de combinaciones</Link>,{' '}
            <Link href="/calculadora" style={{ color: '#3b82f6' }}>calculadora de probabilidades</Link> y{' '}
            <Link href="/cobrar-premios" style={{ color: '#3b82f6' }}>guía para cobrar premios</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.25rem' }}>Preguntas Frecuentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { q: '¿Cuándo se actualizan los resultados?', a: 'Los resultados se publican como "Pendiente" minutos tras el sorteo oficial y se marcan "Verificado" cuando confirmamos con la fuente oficial y una fuente secundaria de respaldo.' },
            { q: '¿Son oficiales los resultados?', a: 'Nuestros resultados son informativos. Para reclamaciones de premios, siempre verifique directamente con la lotería oficial correspondiente.' },
            { q: '¿Cómo usar el comprobador de jugada?', a: 'Ve a "Comprobar", selecciona la lotería y el sorteo, ingresa tus números y el sistema calcula automáticamente tus aciertos y posibles premios.' },
            { q: '¿Qué significa "Verificado" vs "Pendiente"?', a: '"Verificado" significa que el resultado fue confirmado con al menos 2 fuentes. "Pendiente" indica que el sorteo aún no ha ocurrido o el resultado está en proceso de verificación.' },
            { q: '¿Puedo recibir notificaciones de resultados?', a: 'Sí. En la sección "Alertas" puedes activar notificaciones push en tu navegador o suscribirte por email para recibir los resultados al instante.' },
            { q: '¿Cómo cobro mi premio si gané?', a: 'Consulta nuestra guía completa en "Cobrar premios" donde explicamos los pasos, documentos requeridos, plazos y información sobre impuestos.' },
          ].map((f, i) => (
            <details key={i} className="card" style={{ padding: '1rem 1.25rem' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>
                {f.q}
                <span className="faq-icon" style={{ color: 'var(--accent)', fontSize: '1.2rem', marginLeft: 12, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ marginTop: 10, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AdBanner />
    </div>
  );
}
