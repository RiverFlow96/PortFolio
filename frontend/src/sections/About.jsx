export function About() {
  return (
    <section id="about" className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="font-mono text-purple-500 mb-8 text-sm">
          <span className="text-purple-400">#</span> about
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Sobre <span className="text-purple-500">mí</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              Soy desarrollador fullstack con pasión por crear soluciones web
              elegantes y funcionales. Me especializo en construir aplicaciones
              que combinan rendimiento con experiencia de usuario excepcional.
            </p>
            <p>
              Mi enfoque está en el desarrollo moderno utilizando React, Django
              y tecnologías relacionadas. Siempre estoy buscando aprender nuevas
              tecnologías y mejorar mis habilidades.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Proyectos", value: "4+" },
              { label: "Tecnologías", value: "15+" },
              { label: "Coffee", value: "∞" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#0f0f14] border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors"
              >
                <div className="text-purple-500 font-mono text-xs mb-1">
                  {item.label}
                </div>
                <div className="text-2xl font-bold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#0f0f14] border border-purple-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-500 font-mono text-sm ml-2">
              terminal
            </span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-purple-500">$</span>
            {""}
            <span className="text-green-400">echo</span>{" "}
            <span className="text-yellow-300">"¡Listo para colaborar!"</span>
          </div>
        </div>
      </div>
    </section>
  );
}
