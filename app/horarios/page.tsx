import { LOTERIAS } from '../../lib/data';
import AdBanner from '../components/AdBanner';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Horarios de Sorteos — Loterías Dominicanas',
  description: 'Horarios de todos los sorteos de loterías dominicanas. Dias y horas de Lotería Nacional, Leidsa, Loteka, La Primera y más.',
};
const DIAS_ORDEN = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
export default function HorariosPage() {
  return (
    <div style={{maxWidth:1100, margin:'0 auto', padding:'2rem 1rem'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <h1 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.2rem)', marginBottom:10}}>🕐 Horarios de Sorteos</h1>
        <p style={{color:'var(--text-muted)'}}>Días y horas de todos los sorteos de la lotería dominicana</p>
      </div>
      <AdBanner/>
      <div style={{marginBottom:'2.5rem'}}></div>

      {LOTERIAS.map(l=>(
        <section key={l.id} style={{marginBottom:'2.5rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:'1rem', paddingBottom:'0.75rem', borderBottom:`2px solid ${l.color}30`}}>
            <span style={{fontSize:'1.5rem'}}>{l.logo}</span>
            <div>
              <h2 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:l.color}}>{l.nombre}</h2>
              <a href={l.sitioOficial} target="_blank" rel="noopener noreferrer" style={{fontSize:'0.75rem', color:'var(--text-muted)', textDecoration:'none'}}>
                {l.sitioOficial} ↗
              </a>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'0.75rem'}}>
            {l.sorteos.map(s=>(
              <div key={s.id} className="card" style={{padding:'1.25rem', borderLeft:`4px solid ${l.color}`}}>
                <div style={{fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:8}}>{s.nombre}</div>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                  <span style={{fontSize:'1.2rem'}}>🕐</span>
                  <span style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:l.color}}>{s.hora}</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                  <span style={{fontSize:'1rem'}}>📆</span>
                  <span style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>{s.dias}</span>
                </div>
                <div style={{display:'inline-flex', gap:4, flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.72rem', background:`${l.color}15`, color:l.color, padding:'2px 8px', borderRadius:999, fontWeight:600}}>
                    {s.cantidadNumeros} número{s.cantidadNumeros>1?'s':''} (0–{s.rangoMax-1})
                  </span>
                  <span style={{fontSize:'0.72rem', background:'var(--bg-card2)', color:'var(--text-muted)', padding:'2px 8px', borderRadius:999, fontWeight:600, textTransform:'capitalize'}}>
                    {s.tipoNumeros}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="card" style={{padding:'1.5rem', marginBottom:'3rem'}}>
        <h2 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', marginBottom:'0.75rem'}}>📋 Vista rápida por hora</h2>
        <div style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead><tr><th>Hora</th><th>Lotería</th><th>Sorteo</th><th>Días</th></tr></thead>
            <tbody>
              {LOTERIAS.flatMap(l=>l.sorteos.map(s=>({loteria:l, sorteo:s}))).sort((a,b)=>a.sorteo.hora.localeCompare(b.sorteo.hora)).map(({loteria:l,sorteo:s})=>(
                <tr key={s.id}>
                  <td><span style={{fontFamily:'Syne, sans-serif', fontWeight:700, color:l.color}}>{s.hora}</span></td>
                  <td><span style={{fontWeight:600, color:l.color}}>{l.logo} {l.nombreCorto}</span></td>
                  <td style={{color:'var(--text-muted)'}}>{s.nombre}</td>
                  <td style={{fontSize:'0.82rem', color:'var(--text-muted)'}}>{s.dias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdBanner/>
    </div>
  );
}
