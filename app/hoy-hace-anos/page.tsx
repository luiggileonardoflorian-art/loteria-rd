import HoyHaceAnosClient from './HoyHaceAnosClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hoy Hace Años — Resultados Históricos por Fecha',
  description: 'Consulta qué números salieron en esta misma fecha en años anteriores en la lotería dominicana.',
};
export default function HoyHaceAnosPage() { return <HoyHaceAnosClient />; }
