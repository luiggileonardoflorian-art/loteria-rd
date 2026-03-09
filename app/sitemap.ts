import { MetadataRoute } from 'next';
import { LOTERIAS } from '../lib/data';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://loteria-rd-two.vercel.app';
  const routes = [
    { path: '', freq: 'hourly', priority: 1.0 },
    { path: '/resultados', freq: 'hourly', priority: 0.95 },
    { path: '/comprobar', freq: 'daily', priority: 0.9 },
    { path: '/estadisticas', freq: 'daily', priority: 0.85 },
    { path: '/historico', freq: 'daily', priority: 0.85 },
    { path: '/horarios', freq: 'weekly', priority: 0.7 },
    { path: '/hoy-hace-anos', freq: 'daily', priority: 0.8 },
    { path: '/generador', freq: 'weekly', priority: 0.7 },
    { path: '/calculadora', freq: 'monthly', priority: 0.65 },
    { path: '/alertas', freq: 'monthly', priority: 0.7 },
    { path: '/jugar-online', freq: 'weekly', priority: 0.75 },
    { path: '/cobrar-premios', freq: 'monthly', priority: 0.8 },
  ];
  const loteriaRoutes = LOTERIAS.map(l => ({ path: `/resultados/${l.id}`, freq: 'hourly', priority: 0.9 }));
  return [...routes, ...loteriaRoutes].map(r => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: r.priority,
  }));
}
