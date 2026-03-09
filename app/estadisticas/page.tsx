import EstadisticasClient from './EstadisticasClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Estadísticas Lotería Dominicana — Números Calientes y Fríos',
  description: 'Estadísticas de números de lotería dominicana. Frecuencias, números calientes, fríos, gaps y probabilidades.',
};
export default function EstadisticasPage() { return <EstadisticasClient />; }
