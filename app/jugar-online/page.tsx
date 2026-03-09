import type { Metadata } from 'next';
import AdBanner from '../components/AdBanner';
import { LOTERIAS } from '../../lib/data';
export const metadata: Metadata = {
  title: 'Jugar Lotería Online — Sitios Oficiales y Licenciados',
  description: 'Enlace a sitios oficiales y licenciados para jugar lotería dominicana en línea. Juego responsable +18.',
};
const OPERADORES = [
  { nombre: 'Leidsa', url: 'https://www.leidsa.com/play', descripcion: 'Portal oficial Leidsa para jugar quiniela, pale y loto online.', color: '#15803d', logo: '🟢', licencia: 'Operador oficial RD' },
  { nombre: 'Lotería Nacional', url: 'https://www.loterianacional.gob.do', descripcion: 'Sitio oficial del Estado dominicano.', color: '#1d4ed8', logo: '🔵', licencia: 'Operador estatal RD' },
  { nombre: 'Loteka', url: 'https://loteka.com.do', descripcion: 'Portal oficial de Loteka con resultados y juego online.', color: '#b91c1c', logo: '🔴', licencia: 'Operador oficial RD' },
];
export default function JugarOnlinePage() {
  return (
    <div style={{maxWidth:1000, margin:'0 auto', padding:'2rem 1rem'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <h1 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.2rem)', marginBottom:10}}>🎮 Jugar Lotería Online</h1>
        <p style={{color:'var(--text-muted)', maxWidth:600, margin:'0 auto'}}>
          Te redirigimos a los portales oficiales y licenciados. No somos operador de apuestas ni procesamos pagos.
        </p>
      </div>

      <div style={{padding:'1rem 1.5rem', background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:12, marginBottom:'2rem', display:'flex', gap:12, alignItems:'flex-start'}}>
        <span style={{fontSize:'1.5rem', flexShrink:0}}>⚠️</span>
        <div style={{fontSize:'0.85rem', color:'#f59e0b', lineHeight:1.7}}>
          <strong>Aviso legal:</strong> LoteríaRD es un portal informativo de resultados. Los siguientes enlaces dirigen a webs oficiales/licenciadas de terceros. Solo mayores de 18 años. Juego responsable. No somos afiliados de estos operadores.
        </div>
      </div>

      <AdBanner/>
      <div style={{marginBottom:'2rem'}}></div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.25rem', marginBottom:'3rem'}}>
        {OPERADORES.map(op=>(
          <div key={op.nombre} className="card" style={{padding:'1.5rem', borderTop:`4px solid ${op.color}`}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
              <span style={{fontSize:'2rem'}}>{op.logo}</span>
              <div>
                <div style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:op.color}}>{op.nombre}</div>
                <div style={{fontSize:'0.7rem', color:'var(--text-muted)', background:'var(--bg-card2)', padding:'1px 8px', borderRadius:999, display:'inline-block', marginTop:2}}>{op.licencia}</div>
              </div>
            </div>
            <p style={{fontSize:'0.83rem', color:'var(--text-muted)', marginBottom:16, lineHeight:1.6}}>{op.descripcion}</p>
            <a href={op.url} target="_blank" rel="noopener noreferrer sponsored"
              style={{display:'block', textAlign:'center', padding:'0.7rem', background:op.color, color:'white', borderRadius:10, textDecoration:'none', fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.9rem'}}>
              Ir al sitio oficial ↗
            </a>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:'2rem', marginBottom:'3rem'}}>
        <h2 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', marginBottom:'1rem'}}>🛡️ Juego Responsable</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1rem'}}>
          {[
            {icon:'🔞', tip:'Solo mayores de 18 años pueden participar en juegos de azar.'},
            {icon:'💰', tip:'Juega solo con dinero que puedas permitirte perder.'},
            {icon:'⏰', tip:'Establece límites de tiempo y dinero antes de jugar.'},
            {icon:'🆘', tip:'Si crees que tienes un problema, busca ayuda profesional.'},
          ].map((t,i)=>(
            <div key={i} style={{padding:'1rem', background:'var(--bg-card2)', borderRadius:10, display:'flex', gap:10, alignItems:'flex-start'}}>
              <span style={{fontSize:'1.3rem', flexShrink:0}}>{t.icon}</span>
              <p style={{fontSize:'0.82rem', color:'var(--text-muted)', lineHeight:1.6}}>{t.tip}</p>
            </div>
          ))}
        </div>
      </div>

      <AdBanner/>
    </div>
  );
}
