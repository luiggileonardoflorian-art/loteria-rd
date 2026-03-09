import AlertasClient from './AlertasClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Alertas de Resultados — Recibe Notificaciones de Lotería',
  description: 'Activa alertas por email y push para recibir los resultados de la lotería dominicana al instante.',
};
export default function AlertasPage() { return <AlertasClient />; }
