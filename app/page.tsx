const RESULTADOS = [
  {
    id: 1,
    loteria: 'Lotería Nacional',
    sorteo: 'Mediodía',
    numeros: ['14', '32', '57'],
    color: '#1d4ed8',
    verificado: true,
  },
  {
    id: 2,
    loteria: 'Lotería Nacional',
    sorteo: 'Noche',
    numeros: ['08', '45', '23'],
    color: '#1d4ed8',
    verificado: false,
  },
  {
    id: 3,
    loteria: 'Leidsa',
    sorteo: 'Quiniela Pale',
    numeros: ['67', '12', '89'],
    color: '#15803d',
    verificado: true,
  },
  {
    id: 4,
    loteria: 'Loteka',
    sorteo: 'Quiniela',
    numeros: ['34', '56', '78'],
    color: '#b91c1c',
    verificado: true,
  },
  {
    id: 5,
    loteria: 'Lotería Real',
    sorteo: 'Quiniela Real',
    numeros: ['91', '03', '44'],
    color: '#7c3aed',
    verificado: true,
  },
  {
    id: 6,
    loteria: 'La Primera',
    sorteo: 'Matutino',
    numeros: ['22', '55', '77'],
    color: '#b45309',
    verificado: true,
  },
  {
    id: 7,
    loteria: 'La Primera',
    sorteo: 'Vespertino',
    numeros: ['11', '66', '33'],
    color: '#b45309',
    verificado: true,
  },
  {
    id: 8,
    loteria: 'La Suerte',
    sorteo: 'Mediodía',
    numeros: ['48', '29', '61'],
    color: '#0f766e',
    verificado: true,
  },
];

const HORARIOS = [
  { loteria: 'Lotería Nacional', sorteos: 'Lun, Mié, Vie — 12:55 PM y 8:55 PM', color: '#1d4ed8' },
  { loteria: 'Leidsa', sorteos: 'Todos los días — 8:55 PM', color: '#15803d' },
  { loteria: 'Loteka', sorteos: 'Todos los días — 7:55 PM', color: '#b91c1c' },
  { loteria: 'Lotería Real', sorteos: 'Todos los días — 8:55 PM', color: '#7c3aed' },
  { loteria: 'La Primera', sorteos: 'Lun-Sáb — 11:30 AM y 2:30 PM', color: '#b45309' },
  { loteria: 'La Suerte', sorteos: 'Todos los días — 1:00 PM y 9:00 PM', color: '#0f766e' },
];

export default function HomePage() {
  const fecha = new Date().toLocaleDateString('es-DO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-blue-900 mb-3">
          Resultados Lotería Dominicana Hoy
        </h1>
        <p className="text-gray-500 text-lg capitalize">{fecha}</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Resultados actualizados
        </div>
      </section>

      {/* Anuncio */}
      <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center min-h-[90px] text-gray-400 text-sm mb-10">
        Espacio publicitario
      </div>

      {/* Resultados */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🏆 Resultados de Hoy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESULTADOS.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
              style={{ borderTop: `4px solid ${r.color}` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: r.color }}>
                    {r.loteria}
                  </h3>
                  <p className="text-gray-500 text-sm">{r.sorteo}</p>
                </div>
                {r.verificado && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    ✓ Verificado
                  </span>
                )}
              </div>
              <div className="flex gap-3 justify-center">
                {r.numeros.map((n, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg"
                    style={{ backgroundColor: r.color }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anuncio medio */}
      <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center min-h-[90px] text-gray-400 text-sm mb-12">
        Espacio publicitario
      </div>

      {/* Horarios */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📅 Horarios de Sorteos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HORARIOS.map((h) => (
            <div
              key={h.loteria}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
              style={{ borderLeft: `4px solid ${h.color}` }}
            >
              <div className="font-bold text-gray-800">{h.loteria}</div>
              <div className="text-sm text-gray-500 mt-1">{h.sorteos}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resultados de Lotería Dominicana en Tiempo Real
        </h2>
        <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            Bienvenido al portal más completo de resultados de lotería de la República Dominicana.
            Aquí encontrarás los números ganadores de todas las loterías dominicanas: Lotería Nacional,
            Leidsa, Loteka, Lotería Real, La Primera y La Suerte.
          </p>
          <p>
            Nuestro sistema actualiza los resultados minutos después de cada sorteo para que siempre
            tengas acceso inmediato a los números ganadores. Consulta el historial, estadísticas de
            números frecuentes y horarios de todos los sorteos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
        <div className="space-y-3">
          {[
            { p: '¿Cuándo se actualizan los resultados?', r: 'Los resultados se actualizan minutos después de cada sorteo.' },
            { p: '¿Son oficiales los resultados?', r: 'Los resultados son informativos. Siempre verifique con la lotería oficial correspondiente.' },
            { p: '¿Qué loterías cubren?', r: 'Cubrimos Lotería Nacional, Leidsa, Loteka, Lotería Real, La Primera y La Suerte.' },
            { p: '¿Cómo jugar quiniela?', r: 'Acude a cualquier banca autorizada, elige tu número del 00 al 99 y define tu monto de apuesta.' },
          ].map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between">
                {faq.p} <span className="text-blue-600">+</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">{faq.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Anuncio final */}
      <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center min-h-[90px] text-gray-400 text-sm">
        Espacio publicitario
      </div>

    </div>
  );
}
