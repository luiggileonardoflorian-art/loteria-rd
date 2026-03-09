'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_PRIMARY = [
  { href: '/', label: '🏠 Inicio' },
  { href: '/resultados', label: '🏆 Resultados' },
  { href: '/comprobar', label: '🎯 Comprobar' },
];

const NAV_TOOLS = [
  { href: '/estadisticas', label: '📊 Estadísticas' },
  { href: '/historico', label: '📅 Histórico' },
  { href: '/hoy-hace-anos', label: '🔁 Hoy hace años' },
  { href: '/generador', label: '🎲 Generador' },
  { href: '/calculadora', label: '🧮 Calculadora' },
  { href: '/horarios', label: '🕐 Horarios' },
  { href: '/alertas', label: '🔔 Alertas' },
  { href: '/cobrar-premios', label: '💰 Cobrar premios' },
  { href: '/jugar-online', label: '🎮 Jugar Online' },
];

const ALL_NAV = [...NAV_PRIMARY, ...NAV_TOOLS];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🎰</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#f0f4ff' }}>
            Lotería<span style={{ color: '#3b82f6' }}>RD</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="desk-nav">
          {NAV_PRIMARY.map(n => (
            <Link key={n.href} href={n.href}
              style={{ textDecoration: 'none', color: pathname === n.href ? '#f0f4ff' : '#8b9ab8', fontSize: '0.83rem', fontWeight: 500, padding: '5px 10px', borderRadius: 7, background: pathname === n.href ? 'rgba(255,255,255,0.07)' : 'none', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
              {n.label}
            </Link>
          ))}
          {/* Tools dropdown */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setToolsOpen(!toolsOpen)}
              style={{ color: toolsOpen ? '#f0f4ff' : '#8b9ab8', fontSize: '0.83rem', fontWeight: 500, padding: '5px 10px', borderRadius: 7, background: toolsOpen ? 'rgba(255,255,255,0.07)' : 'none', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}>
              🛠 Herramientas {toolsOpen ? '▲' : '▼'}
            </button>
            {toolsOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 8, minWidth: 200, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 200 }}
                onMouseLeave={() => setToolsOpen(false)}>
                {NAV_TOOLS.map(n => (
                  <Link key={n.href} href={n.href} onClick={() => setToolsOpen(false)}
                    style={{ display: 'block', padding: '7px 12px', borderRadius: 8, textDecoration: 'none', color: pathname === n.href ? '#f0f4ff' : '#8b9ab8', fontSize: '0.82rem', fontWeight: 500, background: pathname === n.href ? 'rgba(255,255,255,0.07)' : 'none', transition: 'all 0.12s' }}>
                    {n.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 1.5s ease-in-out infinite' }}></span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>EN VIVO</span>
          </div>
          <button onClick={() => setOpen(!open)} className="mob-btn"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f0f4ff', cursor: 'pointer', padding: '5px 9px', fontSize: '1rem', lineHeight: 1 }}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#0d1424', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '0.75rem', maxHeight: '80vh', overflowY: 'auto' }}>
          {ALL_NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '0.6rem 0.9rem', borderRadius: 8, textDecoration: 'none', color: pathname === n.href ? '#f0f4ff' : '#8b9ab8', fontWeight: 500, fontSize: '0.9rem', background: pathname === n.href ? 'rgba(255,255,255,0.07)' : 'none', marginBottom: 2 }}>
              {n.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media(min-width:768px){.mob-btn{display:none!important;}}
        @media(max-width:767px){.desk-nav{display:none!important;}}
      `}</style>
    </nav>
  );
}
