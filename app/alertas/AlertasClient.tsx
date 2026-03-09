'use client';
import { useState } from 'react';
import { LOTERIAS } from '../../lib/data';
import AdBanner from '../components/AdBanner';

export default function AlertasClient() {
  const [email, setEmail] = useState('');
  const [seleccionadas, setSeleccionadas] = useState<string[]>(['loteria-nacional', 'leidsa', 'loteka']);
  const [frecuencia, setFrecuencia] = useState<'inmediata' | 'resumen'>('inmediata');
  const [enviado, setEnviado] = useState(false);
  const [pushActivo, setPushActivo] = useState(false);

  function toggleLoteria(id: string) {
    setSeleccionadas(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleSubmit() {
    if (!email || seleccionadas.length === 0) return;
    setEnviado(true);
  }

  function handlePush() {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') setPushActivo(true);
      });
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>
          🔔 Alertas de Resultados
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem', maxWidth: 500, margin: '0 auto' }}>
          Recibe notificaciones automáticas cuando se publiquen los resultados de tus loterías favoritas
        </p>
      </div>

      <AdBanner />
      <div style={{ marginBottom: '2rem' }}></div>

      {/* Push notification */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: pushActivo ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.12)', border: `2px solid ${pushActivo ? '#10b981' : 'rgba(59,130,246,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
          {pushActivo ? '✅' : '📱'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
            Notificaciones Push
            {pushActivo && <span style={{ marginLeft: 8, fontSize: '0.72rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 999 }}>Activas</span>}
          </div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            Recibe alertas instantáneas en tu navegador sin necesidad de abrir la web.
          </p>
        </div>
        <button onClick={handlePush} disabled={pushActivo}
          style={{ padding: '0.65rem 1.25rem', background: pushActivo ? 'rgba(16,185,129,0.15)' : 'var(--accent)', color: pushActivo ? '#10b981' : 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem', cursor: pushActivo ? 'default' : 'pointer', flexShrink: 0 }}>
          {pushActivo ? 'Activado ✓' : 'Activar Push'}
        </button>
      </div>

      {/* Email form */}
      {!enviado ? (
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            📧 Alertas por Email
          </h2>

          {/* Loterías */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>
              ¿Qué loterías quieres seguir?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
              {LOTERIAS.map(l => {
                const activa = seleccionadas.includes(l.id);
                return (
                  <button key={l.id} onClick={() => toggleLoteria(l.id)}
                    style={{ padding: '0.7rem 0.9rem', borderRadius: 10, border: `2px solid ${activa ? l.color : 'var(--border)'}`, background: activa ? `${l.color}15` : 'var(--bg-card2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}>
                    <span style={{ fontSize: '1.1rem' }}>{l.logo}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: activa ? l.color : 'var(--text-muted)' }}>{l.nombreCorto}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.sorteos.length} sorteo{l.sorteos.length > 1 ? 's' : ''}</div>
                    </div>
                    {activa && <span style={{ marginLeft: 'auto', color: l.color, fontSize: '0.9rem' }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frecuencia */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>
              Frecuencia de notificación
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { v: 'inmediata' as const, label: '⚡ Inmediata', desc: 'Al publicarse cada sorteo' },
                { v: 'resumen' as const, label: '📋 Resumen diario', desc: 'Una vez al día, todos los resultados' },
              ].map(f => (
                <button key={f.v} onClick={() => setFrecuencia(f.v)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: 10, border: `2px solid ${frecuencia === f.v ? 'var(--accent)' : 'var(--border)'}`, background: frecuencia === f.v ? 'rgba(59,130,246,0.1)' : 'var(--bg-card2)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: frecuencia === f.v ? 'var(--text)' : 'var(--text-muted)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Email input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
              Tu email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ejemplo@correo.com"
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-card2)', border: '1px solid var(--border-strong)', borderRadius: 10, color: 'var(--text)', fontSize: '0.95rem' }} />
          </div>

          <button onClick={handleSubmit} disabled={!email || seleccionadas.length === 0}
            style={{ width: '100%', padding: '0.9rem', background: email && seleccionadas.length > 0 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'var(--bg-card2)', color: email && seleccionadas.length > 0 ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', cursor: email && seleccionadas.length > 0 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
            Activar Alertas por Email →
          </button>

          <p style={{ marginTop: 12, fontSize: '0.73rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            Al suscribirte, aceptas nuestra política de privacidad. Puedes cancelar en cualquier momento. No compartimos tu email con terceros.
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', marginBottom: 8 }}>¡Alertas activadas!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.9rem' }}>
            Recibirás notificaciones en <strong style={{ color: 'var(--text)' }}>{email}</strong> para {seleccionadas.length} lotería{seleccionadas.length > 1 ? 's' : ''}.
          </p>
          <button onClick={() => { setEnviado(false); setEmail(''); }}
            style={{ padding: '0.6rem 1.5rem', background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
            Modificar preferencias
          </button>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        {/* Features */}
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>Qué incluyen las alertas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏆', title: 'Números ganadores', desc: 'Los resultados verificados al instante' },
            { icon: '✅', title: 'Estado verificado', desc: 'Solo te avisamos cuando está confirmado' },
            { icon: '⏰', title: 'Recordatorios', desc: 'Aviso 15 min antes del sorteo' },
            { icon: '🆓', title: 'Completamente gratis', desc: 'Sin costos ni suscripción premium' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '1rem' }}>
              <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: 6 }}>{f.icon}</span>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <AdBanner />
      </div>
    </div>
  );
}
