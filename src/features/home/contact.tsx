'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Field, FieldGroup, FieldLabel, FieldError } from '@components/ui/field';
import { SectionLabel } from './section-label';

type FormState = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const contactInfo = [
  { icon: Phone, label: 'Llámame', value: '+57 300 828 8485', href: 'tel:+573008288485' },
  { icon: Mail, label: 'Escríbeme', value: 'yayomanosalva@gmail.com', href: 'mailto:yayomanosalva@gmail.com' },
  { icon: MessageCircle, label: 'LinkedIn', value: 'in/jair-manosalva', href: 'https://www.linkedin.com/' },
  { icon: MapPin, label: 'Encuéntrame', value: 'Colombia', href: '#' },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values: FormState): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Ingresa tu nombre.';
    if (!values.email.trim()) {
      next.email = 'Ingresa tu correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Ingresa un correo válido.';
    }
    if (!values.message.trim()) {
      next.message = 'Cuéntame sobre tu proyecto.';
    } else if (values.message.trim().length < 10) {
      next.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

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
                    <a href={item.href} className="group flex items-center gap-4">
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
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-7" />
                </span>
                <h3 className="font-display text-xl font-bold">¡Mensaje enviado!</h3>
                <p className="max-w-xs text-muted-foreground">Gracias por escribirme, {form.name.split(' ')[0]}. Te responderé muy pronto.</p>
                <Button variant="outline" onClick={() => { setForm({ name: '', email: '', message: '' }); setSubmitted(false); }}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <FieldGroup>
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input id="name" placeholder="Tu nombre completo" value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} />
                    <FieldError>{errors.name}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} />
                    <FieldError>{errors.email}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.message}>
                    <FieldLabel htmlFor="message">Mensaje</FieldLabel>
                    <Textarea id="message" rows={5} placeholder="Cuéntame sobre tu proyecto..." value={form.message} onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} />
                    <FieldError>{errors.message}</FieldError>
                  </Field>

                  <Button type="submit" size="lg" className="w-full">Enviar mensaje</Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
