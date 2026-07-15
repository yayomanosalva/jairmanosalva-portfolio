'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Phone, Mail, MapPin, MessageCircle, Check, Loader2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { SectionLabel } from './section-label';

const FORMSPREE_ID = 'xpqvwkoz';

const contactInfo = [
  { icon: Phone, label: 'Llámame', value: '+57 300 828 8485', href: 'tel:+573008288485' },
  { icon: Mail, label: 'Escríbeme', value: 'yayomanosalva@gmail.com', href: 'mailto:yayomanosalva@gmail.com' },
  { icon: MessageCircle, label: 'LinkedIn', value: 'in/jair-manosalva', href: 'https://www.linkedin.com/in/jair-manosalva-66111541/' },
  { icon: MapPin, label: 'Ubicación', value: 'Colombia', href: 'https://maps.google.com/?q=Colombia' },
];

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  return (
    <section id="contacto" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>Contacto</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Hablemos o tomemos un café</h2>
            <p className="mt-4 text-pretty text-muted-foreground">¿Tienes una idea en mente? Rellena el formulario o usa cualquiera de estos canales. Respondo en menos de 24 horas.</p>

            <ul className="mt-10 flex flex-col gap-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a href={item.href} target='_blank' className="group flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            {state.succeeded ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-7" />
                </span>
                <h3 className="font-display text-xl font-bold">¡Mensaje enviado!</h3>
                <p className="max-w-xs text-muted-foreground">Gracias por escribirme. Te responderé muy pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Nombre</label>
                    <Input id="name" type="text" name="name" placeholder="Tu nombre completo" />
                    <ValidationError field="name" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Correo electrónico</label>
                    <Input id="email" type="email" name="email" placeholder="tucorreo@ejemplo.com" required />
                    <ValidationError field="email" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Mensaje</label>
                    <Textarea id="message" name="message" rows={5} placeholder="Cuéntame sobre tu proyecto..." required />
                    <ValidationError field="message" errors={state.errors} />
                  </div>

                  {state.errors && !Array.isArray(state.errors) && (
                    <p className="text-sm text-destructive">Error al enviar. Intenta de nuevo.</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={state.submitting}>
                    {state.submitting ? (
                      <><Loader2 className="size-4 animate-spin" /> Enviando...</>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
