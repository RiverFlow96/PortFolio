import { socials } from "../datas/social_medias";

export function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="font-mono text-purple-500 mb-8 text-sm">
          <span className="text-purple-400">#</span> contact
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Habl<span className="text-purple-500">amos</span>?
        </h2>

        <p className="text-gray-400 mb-12 max-w-xl">
          Estoy siempre abierto a nuevas oportunidades y proyectos interesantes.
          Ya sea que tengas una pregunta o simplemente quieras saludar, ¡hazmelo
          saber!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Conectemos</h3>
            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0f0f14] border border-purple-500/20 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                >
                  <social.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="text-gray-300 font-mono">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0f14] border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Envía un mensaje
            </h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tu mensaje..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
