import { LOTERIAS, HISTORICO, RESULTADOS_HOY, getLoteria } from '../../lib/data';
import AdBanner from '../components/AdBanner';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Histórico de Sorteos — Resultados Anteriores de Lotería',
  description: 'Consulta el histórico de sorteos de la lotería dominicana. Resultados anteriores verificados por fecha y lotería.',
};
export default function HistoricoPage() {
  const todos = [...RESULTADOS_HOY.filter(r=>r.verificado), ...HISTORICO].sort((a,b)=>b.fecha.localeCompare(a.fecha));
  return (
    <div style={{maxWidth:1200, margin:'0 auto', padding:'2rem 1rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.2rem)', marginBottom:8}}>📅 Histórico de Sorteos</h1>
        <p style={{color:'var(--text-muted)'}}>Todos los resultados verificados, ordenados por fecha</p>
      </div>
      <AdBanner/>
      <div style={{marginBottom:'2rem'}}></div>
      <div style={{display:'flex', gap:8, marginBottom:'1.5rem', flexWrap:'wrap'}}>
        {LOTERIAS.map(l=>(
          <Link key={l.id} href={`/resultados/${l.id}`} style={{padding:'0.45rem 1rem', borderRadius:8, border:`1px solid ${l.color}40`, background:`${l.color}10`, color:l.color, fontSize:'0.8rem', fontWeight:600, textDecoration:'none'}}>
            {l.logo} {l.nombreCorto}
          </Link>
        ))}
      </div>
      <div className="card" style={{overflowX:'auto', marginBottom:'3rem'}}>
        <table className="data-table">
          <thead><tr><th>Fecha</th><th>Lotería</th><th>Sorteo</th><th>Números</th><th>Estado</th></tr></thead>
          <tbody>
            {todos.map(r=>{
              const loteria = getLoteria(r.loteriaId);
              if(!loteria) return null;
              const sorteo = loteria.sorteos.find(s=>s.id===r.sorteoId);
              return (
                <tr key={r.id}>
                  <td style={{whiteSpace:'nowrap', fontSize:'0.82rem'}}>{r.fecha}</td>
                  <td><span style={{color:loteria.color, fontWeight:600, fontSize:'0.85rem'}}>{loteria.logo} {loteria.nombreCorto}</span></td>
                  <td style={{color:'var(--text-muted)', fontSize:'0.82rem'}}>{sorteo?.nombre}</td>
                  <td>
                    <div style={{display:'flex', gap:5}}>
                      {r.numeros.map((n,i)=>(<span key={i} style={{fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.88rem', color:loteria.color, background:`${loteria.color}15`, padding:'2px 8px', borderRadius:6}}>{n}</span>))}
                    </div>
                  </td>
                  <td><span className="badge-verified">✓</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdBanner/>
    </div>
  );
}
