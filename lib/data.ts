// ============================================================
// DATOS MAESTROS — Loterías Dominicanas
// ============================================================

export interface Loteria {
  id: string;
  nombre: string;
  nombreCorto: string;
  color: string;
  colorSecundario: string;
  logo: string;
  sorteos: Sorteo[];
  descripcion: string;
  sitioOficial: string;
}

export interface Sorteo {
  id: string;
  nombre: string;
  hora: string;
  dias: string;
  tipoNumeros: 'quiniela' | 'pale' | 'tripleta' | 'loto';
  cantidadNumeros: number;
  rangoMax: number;
}

export interface Resultado {
  id: string;
  loteriaId: string;
  sorteoId: string;
  fecha: string;
  numeros: string[];
  numerosExtra?: string[];
  verificado: boolean;
  fuente: 'oficial' | 'confirmado' | 'pendiente';
  timestamp: string;
  premio?: string;
}

export interface EstadisticaNumero {
  numero: string;
  frecuencia: number;
  porcentaje: number;
  ultimaAparicion: string;
  gap: number;
  zScore: number;
}

// ============================================================
// LOTERÍAS DOMINICANAS
// ============================================================

export const LOTERIAS: Loteria[] = [
  {
    id: 'loteria-nacional',
    nombre: 'Lotería Nacional',
    nombreCorto: 'Nacional',
    color: '#1d4ed8',
    colorSecundario: '#dbeafe',
    logo: '🔵',
    descripcion: 'La lotería más antigua de la República Dominicana, fundada en 1931.',
    sitioOficial: 'https://www.loterianacional.gob.do',
    sorteos: [
      { id: 'nacional-mediodia', nombre: 'Mediodía', hora: '12:55 PM', dias: 'Lun, Mié, Vie', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
      { id: 'nacional-noche', nombre: 'Noche', hora: '8:55 PM', dias: 'Lun, Mié, Vie', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
    ]
  },
  {
    id: 'leidsa',
    nombre: 'Leidsa',
    nombreCorto: 'Leidsa',
    color: '#15803d',
    colorSecundario: '#dcfce7',
    logo: '🟢',
    descripcion: 'Lotería Electrónica Internacional Dominicana S.A. Operadora oficial.',
    sitioOficial: 'https://www.leidsa.com',
    sorteos: [
      { id: 'leidsa-quiniela', nombre: 'Quiniela Pale', hora: '8:55 PM', dias: 'Todos los días', tipoNumeros: 'pale', cantidadNumeros: 2, rangoMax: 100 },
      { id: 'leidsa-superpale', nombre: 'Super Pale', hora: '8:55 PM', dias: 'Todos los días', tipoNumeros: 'pale', cantidadNumeros: 2, rangoMax: 100 },
      { id: 'leidsa-loto', nombre: 'Loto', hora: '9:00 PM', dias: 'Mar, Jue, Sáb', tipoNumeros: 'loto', cantidadNumeros: 6, rangoMax: 38 },
    ]
  },
  {
    id: 'loteka',
    nombre: 'Loteka',
    nombreCorto: 'Loteka',
    color: '#b91c1c',
    colorSecundario: '#fee2e2',
    logo: '🔴',
    descripcion: 'Lotería Electrónica S.A., conocida como Loteka.',
    sitioOficial: 'https://loteka.com.do',
    sorteos: [
      { id: 'loteka-quiniela', nombre: 'Quiniela', hora: '7:55 PM', dias: 'Todos los días', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
      { id: 'loteka-lotomax', nombre: 'Lotomax', hora: '8:00 PM', dias: 'Lun, Mié, Vie', tipoNumeros: 'loto', cantidadNumeros: 5, rangoMax: 36 },
    ]
  },
  {
    id: 'loteria-real',
    nombre: 'Lotería Real',
    nombreCorto: 'Real',
    color: '#7c3aed',
    colorSecundario: '#ede9fe',
    logo: '🟣',
    descripcion: 'Lotería Real, operadora dominicana con múltiples sorteos diarios.',
    sitioOficial: 'https://www.loteriareal.com.do',
    sorteos: [
      { id: 'real-quiniela', nombre: 'Quiniela Real', hora: '8:55 PM', dias: 'Todos los días', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
    ]
  },
  {
    id: 'la-primera',
    nombre: 'La Primera',
    nombreCorto: 'Primera',
    color: '#b45309',
    colorSecundario: '#fef3c7',
    logo: '🟡',
    descripcion: 'La Primera, con sorteos matutinos y vespertinos.',
    sitioOficial: 'https://www.laprimera.com.do',
    sorteos: [
      { id: 'primera-matutino', nombre: 'Matutino', hora: '11:30 AM', dias: 'Lun–Sáb', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
      { id: 'primera-vespertino', nombre: 'Vespertino', hora: '2:30 PM', dias: 'Lun–Sáb', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
    ]
  },
  {
    id: 'la-suerte',
    nombre: 'La Suerte',
    nombreCorto: 'Suerte',
    color: '#0f766e',
    colorSecundario: '#ccfbf1',
    logo: '🟦',
    descripcion: 'La Suerte, lotería dominicana con sorteos de mediodía y noche.',
    sitioOficial: 'https://www.lasuerte.com.do',
    sorteos: [
      { id: 'suerte-mediodia', nombre: 'Mediodía', hora: '1:00 PM', dias: 'Todos los días', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
      { id: 'suerte-noche', nombre: 'Noche', hora: '9:00 PM', dias: 'Todos los días', tipoNumeros: 'quiniela', cantidadNumeros: 3, rangoMax: 100 },
    ]
  },
];

// ============================================================
// RESULTADOS SIMULADOS (reemplazar con scraper/API real)
// ============================================================

export const RESULTADOS_HOY: Resultado[] = [
  { id: 'r1', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2026-03-09', numeros: ['14', '32', '57'], verificado: true, fuente: 'oficial', timestamp: '12:57 PM', premio: 'RD$80 por peso' },
  { id: 'r2', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2026-03-09', numeros: ['--', '--', '--'], verificado: false, fuente: 'pendiente', timestamp: 'Pendiente 8:55 PM' },
  { id: 'r3', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2026-03-09', numeros: ['67', '12'], verificado: true, fuente: 'oficial', timestamp: '8:57 PM' },
  { id: 'r4', loteriaId: 'leidsa', sorteoId: 'leidsa-superpale', fecha: '2026-03-09', numeros: ['23', '45'], verificado: true, fuente: 'confirmado', timestamp: '8:58 PM' },
  { id: 'r5', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2026-03-09', numeros: ['34', '56', '78'], verificado: true, fuente: 'oficial', timestamp: '7:57 PM' },
  { id: 'r6', loteriaId: 'loteria-real', sorteoId: 'real-quiniela', fecha: '2026-03-09', numeros: ['91', '03', '44'], verificado: true, fuente: 'confirmado', timestamp: '8:57 PM' },
  { id: 'r7', loteriaId: 'la-primera', sorteoId: 'primera-matutino', fecha: '2026-03-09', numeros: ['22', '55', '77'], verificado: true, fuente: 'oficial', timestamp: '11:32 AM' },
  { id: 'r8', loteriaId: 'la-primera', sorteoId: 'primera-vespertino', fecha: '2026-03-09', numeros: ['11', '66', '33'], verificado: true, fuente: 'oficial', timestamp: '2:32 PM' },
  { id: 'r9', loteriaId: 'la-suerte', sorteoId: 'suerte-mediodia', fecha: '2026-03-09', numeros: ['48', '29', '61'], verificado: true, fuente: 'oficial', timestamp: '1:02 PM' },
  { id: 'r10', loteriaId: 'la-suerte', sorteoId: 'suerte-noche', fecha: '2026-03-09', numeros: ['--', '--', '--'], verificado: false, fuente: 'pendiente', timestamp: 'Pendiente 9:00 PM' },
];

export const HISTORICO: Resultado[] = [
  { id: 'h1', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2026-03-06', numeros: ['08', '23', '71'], verificado: true, fuente: 'oficial', timestamp: '12:57 PM' },
  { id: 'h2', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2026-03-06', numeros: ['45', '12', '88'], verificado: true, fuente: 'oficial', timestamp: '8:57 PM' },
  { id: 'h3', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2026-03-08', numeros: ['31', '54'], verificado: true, fuente: 'oficial', timestamp: '8:57 PM' },
  { id: 'h4', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2026-03-08', numeros: ['19', '72', '05'], verificado: true, fuente: 'oficial', timestamp: '7:57 PM' },
  { id: 'h5', loteriaId: 'loteria-nacional', sorteoId: 'nacional-mediodia', fecha: '2026-03-04', numeros: ['33', '67', '14'], verificado: true, fuente: 'oficial', timestamp: '12:57 PM' },
  { id: 'h6', loteriaId: 'loteria-nacional', sorteoId: 'nacional-noche', fecha: '2026-03-04', numeros: ['90', '01', '55'], verificado: true, fuente: 'oficial', timestamp: '8:57 PM' },
  { id: 'h7', loteriaId: 'leidsa', sorteoId: 'leidsa-quiniela', fecha: '2026-03-07', numeros: ['78', '22'], verificado: true, fuente: 'oficial', timestamp: '8:57 PM' },
  { id: 'h8', loteriaId: 'loteka', sorteoId: 'loteka-quiniela', fecha: '2026-03-07', numeros: ['44', '11', '63'], verificado: true, fuente: 'oficial', timestamp: '7:57 PM' },
  { id: 'h9', loteriaId: 'la-primera', sorteoId: 'primera-matutino', fecha: '2026-03-08', numeros: ['07', '38', '92'], verificado: true, fuente: 'oficial', timestamp: '11:32 AM' },
  { id: 'h10', loteriaId: 'la-suerte', sorteoId: 'suerte-noche', fecha: '2026-03-08', numeros: ['55', '27', '84'], verificado: true, fuente: 'oficial', timestamp: '9:02 PM' },
];

// ============================================================
// ESTADÍSTICAS CALCULADAS
// ============================================================

export const ESTADISTICAS_NACIONAL: EstadisticaNumero[] = [
  { numero: '14', frecuencia: 28, porcentaje: 14.2, ultimaAparicion: '2026-03-09', gap: 0, zScore: 1.8 },
  { numero: '33', frecuencia: 26, porcentaje: 13.1, ultimaAparicion: '2026-03-04', gap: 3, zScore: 1.4 },
  { numero: '45', frecuencia: 25, porcentaje: 12.6, ultimaAparicion: '2026-03-06', gap: 2, zScore: 1.2 },
  { numero: '67', frecuencia: 24, porcentaje: 12.1, ultimaAparicion: '2026-03-04', gap: 3, zScore: 1.0 },
  { numero: '08', frecuencia: 23, porcentaje: 11.6, ultimaAparicion: '2026-03-06', gap: 2, zScore: 0.8 },
  { numero: '88', frecuencia: 22, porcentaje: 11.1, ultimaAparicion: '2026-03-06', gap: 2, zScore: 0.6 },
  { numero: '71', frecuencia: 20, porcentaje: 10.1, ultimaAparicion: '2026-03-06', gap: 2, zScore: 0.2 },
  { numero: '90', frecuencia: 19, porcentaje: 9.6, ultimaAparicion: '2026-03-04', gap: 3, zScore: -0.1 },
  { numero: '55', frecuencia: 17, porcentaje: 8.6, ultimaAparicion: '2026-03-04', gap: 3, zScore: -0.5 },
  { numero: '01', frecuencia: 15, porcentaje: 7.6, ultimaAparicion: '2026-03-04', gap: 3, zScore: -0.9 },
  { numero: '23', frecuencia: 13, porcentaje: 6.6, ultimaAparicion: '2026-03-06', gap: 2, zScore: -1.3 },
  { numero: '12', frecuencia: 10, porcentaje: 5.1, ultimaAparicion: '2026-03-06', gap: 2, zScore: -1.8 },
];

export function getLoteria(id: string): Loteria | undefined {
  return LOTERIAS.find(l => l.id === id);
}

export function getResultadosByLoteria(loteriaId: string): Resultado[] {
  return [...RESULTADOS_HOY, ...HISTORICO].filter(r => r.loteriaId === loteriaId);
}

export function getResultadosByFecha(fecha: string): Resultado[] {
  return [...RESULTADOS_HOY, ...HISTORICO].filter(r => r.fecha === fecha);
}
