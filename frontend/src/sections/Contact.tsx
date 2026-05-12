import { useState, FormEvent } from "react";
import { useContactConfig, useSocial } from "../datas/usePortfolio";
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
  const socials = useSocial();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    else if (formData.name.trim().length < 2) newErrors.name = "Mínimo 2 caracteres";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    else if (formData.message.trim().length < 10) newErrors.message = "Mínimo 10 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormData({ name: "", email: "", message: "" });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="section-padding relative" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--accent)]">#</span>
          <span className="text-[var(--text-muted)] font-mono">contact</span>
        </div>

        <h2 id="contact-heading" className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
          ¿Habl<span className="text-gradient">amos</span>?
        </h2>

        <p className="text-[var(--text-secondary)] mb-12 max-w-xl">
          Estoy abierto a nuevas oportunidades, colaboraciones y proyectos desafiantes. ¡Escríbeme!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">Conectemos</h3>
            <div className="flex flex-col gap-3">
              {socials.map((social: { label: string; href: string; icon: string }) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex items-center gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200 group">
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)]">{social.label}</span>
                  <span className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--accent)]">→</span>
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <p className="text-[var(--text-muted)] text-sm mb-2">Email</p>
              <a href={`mailto:${contactConfig.email}`} className="text-[var(--accent)] hover:underline">{contactConfig.email}</a>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--border-hover)] transition-all duration-200">
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-6">Envía un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" placeholder="Tu nombre *" aria-required="true" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} disabled={status === "loading"} className={`w-full px-4 py-3 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors duration-200 ${errors.name ? 'border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'} ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="Tu email *" aria-required="true" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} disabled={status === "loading"} className={`w-full px-4 py-3 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'} ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea placeholder="Tu mensaje... *" rows={4} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} disabled={status === "loading"} className={`w-full px-4 py-3 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors duration-200 resize-none ${errors.message ? 'border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'} ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === "loading"} className={`cursor-pointer w-full py-3 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : status === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90'} disabled:cursor-not-allowed`}>
                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "success" && <CheckCircle className="w-4 h-4" />}
                {status === "error" && <AlertCircle className="w-4 h-4" />}
                {status === "idle" && <Send className="w-4 h-4" />}
                {status === "idle" ? "Enviar" : status === "loading" ? "Enviando..." : status === "success" ? contactConfig.successMessage : contactConfig.errorMessage}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}