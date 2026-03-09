import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{maxWidth:600, margin:'6rem auto', padding:'2rem', textAlign:'center'}}>
      <div style={{fontSize:'4rem', marginBottom:16}}>🎰</div>
      <h1 style={{fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'2rem', marginBottom:8}}>Página no encontrada</h1>
      <p style={{color:'var(--text-muted)', marginBottom:24}}>Esta página no existe o fue movida.</p>
      <Link href="/" style={{padding:'0.75rem 1.5rem', background:'var(--accent)', color:'white', borderRadius:10, textDecoration:'none', fontWeight:600}}>
        Ir al inicio →
      </Link>
    </div>
  );
}
