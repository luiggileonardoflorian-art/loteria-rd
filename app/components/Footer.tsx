import Link from 'next/link';
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>Lotería<span style={{ color: '#3b82f6' }}>RD</span></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>Portal de resultados de loterías dominicanas verificados al instante.</p>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Resultados</div>
            {[['Todos los resultados', '/resultados'], ['Lotería Nacional', '/resultados/loteria-nacional'], ['Leidsa', '/resultados/leidsa'], ['Loteka', '/resultados/loteka'], ['Horarios', '/horarios']].map(([l, h]) => (
              <Link key={h} href={h} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 5, textDecoration: 'none' }} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Herramientas</div>
            {[['Comprobar jugada', '/comprobar'], ['Estadísticas', '/estadisticas'], ['Histórico', '/historico'], ['Hoy hace años', '/hoy-hace-anos'], ['Generador', '/generador'], ['Calculadora', '/calculadora']].map(([l, h]) => (
              <Link key={h} href={h} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 5, textDecoration: 'none' }} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Info</div>
            {[['Alertas', '/alertas'], ['Jugar Online', '/jugar-online'], ['Cobrar Premios', '/cobrar-premios']].map(([l, h]) => (
              <Link key={h} href={h} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 5, textDecoration: 'none' }} className="footer-link">{l}</Link>
            ))}
            <div style={{ marginTop: 14, padding: '0.6rem 0.9rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: '0.75rem', color: '#f59e0b', lineHeight: 1.6 }}>
              +18 · Juego Responsable · Solo informativo
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>© {year} LoteríaRD. Portal informativo. No somos operador de apuestas.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacidad', 'Términos', 'Cookies'].map(t => (<a key={t} href="#" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>{t}</a>))}
          </div>
        </div>
      </div>
      <style>{`.footer-link:hover{color:var(--text)!important;}`}</style>
    </footer>
  );
}
