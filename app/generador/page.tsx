import GeneradorClient from './GeneradorClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Generador de Combinaciones — Lotería Dominicana',
  description: 'Genera combinaciones para la lotería dominicana basadas en estadísticas históricas. Entretenimiento, no garantiza premios.',
};
export default function GeneradorPage() { return <GeneradorClient />; }
