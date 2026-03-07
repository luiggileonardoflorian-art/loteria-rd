import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resultados Lotería Dominicana Hoy',
  description: 'Resultados de lotería dominicana hoy. Lotería Nacional, Leidsa, Loteka, Lotería Real, La Primera y La Suerte.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-900 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎰</span>
              <div>
                <div className="font-bold text-lg">Lotería Dominicana</div>
                <div className="text-blue-300 text-xs">Resultados en tiempo real</div>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-blue-300">Inicio</a>
              <a href="/horarios" className="hover:text-blue-300">Horarios</a>
              <a href="/sobre-nosotros" className="hover:text-blue-300">Sobre Nosotros</a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-gray-400 mt-16 py-10">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p className="mb-3 text-yellow-300">
              ⚠️ Los resultados publicados son informativos. Verifique siempre los resultados oficiales en las páginas de las loterías correspondientes.
            </p>
            <p>© {new Date().getFullYear()} Lotería Dominicana. Este sitio no está afiliado con ninguna lotería oficial.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
