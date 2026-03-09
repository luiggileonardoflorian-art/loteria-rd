import ComprobarClient from './ComprobarClient';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Comprobar Jugada — Verifica tus Números de Lotería',
  description: 'Comprueba si ganaste en la lotería dominicana. Ingresa tus números y verifica tus aciertos al instante.',
};
export default function ComprobarPage() { return <ComprobarClient />; }
