import { useState, FormEvent } from "react";
import { useContactConfig, useSocial } from "../data/usePortfolio";
import {
  Send,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa6";

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

type FormStatus = "idle" | "success";

export function Contact(): JSX.Element {
  const contactConfig = useContactConfig();
  const socials = useSocial();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Minimo 2 caracteres";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Minimo 10 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) return;
    const subject = encodeURIComponent(contactConfig.subject);
    const body = encodeURIComponent(
      `Nombre: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`,
    );
    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    setTimeout(() => setStatus("idle"), 7000);
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section
      id="contact"
      className="section-padding-lg scroll-offset relative"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--accent-dim)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--accent)] font-mono text-lg">#</span>
          <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">
            contact
          </span>
        </div>

        <h2
          id="contact-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight"
        >
          ¿Habl<span className="text-gradient">amos</span>?
        </h2>

        <p className="text-[var(--text-secondary)] mb-16 max-w-xl text-lg">
          Estoy abierto a nuevas oportunidades, colaboraciones y proyectos
          desafiantes. Escribeme.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              Conectemos
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map(
                (social: { label: string; href: string; icon: string }) => (
                  <a
                    key={social.label}
                    href={social.href.startsWith("mailto:") ? social.href : social.icon === "mail" ? `mailto:${social.href}` : social.href}
                    target={social.href.startsWith("mailto:") || social.icon === "mail" ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") || social.icon === "mail" ? undefined : "noopener noreferrer"}
                    aria-label={`Abrir ${social.label}${social.icon === "mail" ? "" : " en una pestaña nueva"}`}
                    className="group cursor-pointer flex items-center justify-between p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--accent-subtle)] transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--border-hover)] transition-colors">
                        {social.icon === "github" && (
                          <FaGithub className="w-5 h-5" />
                        )}
                        {social.icon === "linkedin" && (
                          <FaLinkedin className="w-5 h-5" />
                        )}
                        {social.icon === "mail" && (
                          <FaEnvelope className="w-5 h-5" />
                        )}
                        {social.icon === "facebook" && (
                          <FaFacebook className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-medium">
                        {social.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  </a>
                ),
              )}
            </div>
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Email directo
              </p>
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-lg text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors font-medium"
              >
                {contactConfig.email}
              </a>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 hover:border-[var(--border-hover)] transition-all duration-500">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Envia un mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="sr-only">Tu nombre</label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Tu nombre *"
                  aria-required="true"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={status === "loading"}
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--bg-tertiary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300 ${errors.name ? "border-red-500" : "border-[var(--border)] focus:border-[var(--accent)]"} ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="sr-only">Tu email</label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Tu email *"
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={status === "loading"}
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--bg-tertiary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300 ${errors.email ? "border-red-500" : "border-[var(--border)] focus:border-[var(--accent)]"} ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="sr-only">Tu mensaje</label>
                <textarea
                  id="contact-message"
                  placeholder="Tu mensaje... *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  disabled={status === "loading"}
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--bg-tertiary)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300 resize-none ${errors.message ? "border-red-500" : "border-[var(--border)] focus:border-[var(--accent)]"} ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                aria-live="polite"
                className={`group cursor-pointer w-full py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 ${status === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent-dim)]"} active:scale-[0.98]`}
              >
                {status === "success" ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                {status === "success" ? contactConfig.successMessage : "Preparar correo"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
