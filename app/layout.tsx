import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: { default: 'LoteríaRD — Resultados Lotería Dominicana Hoy', template: '%s | LoteríaRD' },
  description: 'Consulta los resultados de la lotería dominicana al instante. Números ganadores verificados de Lotería Nacional, Leidsa, Loteka, La Primera, La Suerte y más.',
  keywords: ['resultados loteria dominicana', 'numeros ganadores', 'loteria nacional', 'leidsa', 'loteka', 'quiniela'],
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'LoteríaRD',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
