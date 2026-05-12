import { useEffect, useRef, useState, FormEvent } from "react";
import { socials } from "../datas/social_medias";
import { useContactConfig } from "../datas/usePortfolio";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact(): JSX.Element {
  const contactConfig = useContactConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".reveal").forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("visible");
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    try {
      // Simular envío (aquí puedes integrar EmailJS, Formspree, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="font-mono text-cyan-500 mb-8 text-sm reveal">
          <span className="text-emerald-400">#</span> contact
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 reveal">
          ¿Habl<span className="text-gradient-cyan">amos</span>?
        </h2>

        <p className="text-gray-400 mb-12 max-w-xl reveal">
          Estoy siempre abierto a nuevas oportunidades, colaboraciones y
          proyectos desafiantes. Ya sea que tengas una idea innovadora,
          necesites consultoría técnica o simplemente quieras saludar, ¡me
          encantaría escucharte!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Social links */}
          <div className="space-y-6 reveal">
            <h3 className="text-xl font-semibold text-white">Conectemos</h3>
            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0f0f14] border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <span className="text-gray-300 font-mono">
                    {social.label}
                  </span>
                  <span className="ml-auto text-gray-600 group-hover:text-cyan-500/60 transition-colors">
                    →
                  </span>
                </a>
              ))}
            </div>

            {/* Contact email */}
            <div className="mt-6 p-4 bg-[#0f0f14] border border-cyan-500/20 rounded-lg">
              <p className="text-gray-500 text-sm mb-2">Email directo</p>
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-cyan-400 font-mono hover:underline"
              >
                {contactConfig.email}
              </a>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-[#0f0f14] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-700 reveal">
            <h3 className="text-xl font-semibold text-white mb-6">
              Envía un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre *"
                  aria-required="true"
                  aria-autocomplete="list"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={status === "loading"}
                  className={`
                    w-full px-4 py-3 bg-[#1a1a24] border rounded-lg text-white placeholder-gray-600 
                    focus:outline-none focus:bg-[#1f1f2e] transition-colors duration-200
                    ${
                      errors.name
                        ? "border-cyan-500/50 focus:border-cyan-500"
                        : "border-cyan-500/20 focus:border-cyan-500/60"
                    }
                    ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                />
                {errors.name && (
                  <p className="text-cyan-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <input
                  type="email"
                  placeholder="Tu email *"
                  aria-autocomplete="list"
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={status === "loading"}
                  className={`
                    w-full px-4 py-3 bg-[#1a1a24] border rounded-lg text-white placeholder-gray-600 
                    focus:outline-none focus:bg-[#1f1f2e] transition-colors duration-200
                    ${
                      errors.email
                        ? "border-cyan-500/50 focus:border-cyan-500"
                        : "border-cyan-500/20 focus:border-cyan-500/60"
                    }
                    ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                />
                {errors.email && (
                  <p className="text-cyan-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div>
                <textarea
                  placeholder="Tu mensaje... *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  disabled={status === "loading"}
                  className={`
                    w-full px-4 py-3 bg-[#1a1a24] border rounded-lg text-white placeholder-gray-600 
                    focus:outline-none focus:bg-[#1f1f2e] transition-colors duration-200 resize-none
                    ${
                      errors.message
                        ? "border-cyan-500/50 focus:border-cyan-500"
                        : "border-cyan-500/20 focus:border-cyan-500/60"
                    }
                    ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                />
                {errors.message && (
                  <p className="text-cyan-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`
                  w-full py-3 font-mono rounded-lg transition-all duration-300
                  flex items-center justify-center gap-2
                  ${
                    status === "success"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : status === "error"
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-red-600 text-white hover:shadow-lg hover:shadow-cyan-500/25"
                  }
                  ${status === "loading" ? "opacity-70 cursor-wait" : ""}
                  disabled:cursor-not-allowed
                `}
              >
                {status === "loading" && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {status === "success" && <CheckCircle className="w-4 h-4" />}
                {status === "error" && <AlertCircle className="w-4 h-4" />}
                {status === "idle" && <Send className="w-4 h-4" />}

                {status === "loading" && "Enviando..."}
                {status === "success" && contactConfig.successMessage}
                {status === "error" && contactConfig.errorMessage}
                {status === "idle" && "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
