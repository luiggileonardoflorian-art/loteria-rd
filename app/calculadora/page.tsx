import CalculadoraClient from './CalculadoraClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Calculadora de Probabilidades — Lotería Dominicana',
  description: 'Calcula las probabilidades reales de ganar en la lotería dominicana. Quiniela, pale, loto y más.',
};
export default function CalculadoraPage() { return <CalculadoraClient />; }
