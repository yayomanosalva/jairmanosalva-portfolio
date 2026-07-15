import { Phone, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-12 md:pt-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div className="relative z-10 pb-8">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">Senior Frontend Developer</p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl">
              Jair
              <br />
              <span className="text-primary">Manosalva</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Radicado en Colombia, con más de 10 años construyendo aplicaciones web escalables con React, Angular y TypeScript. Transformo ideas en productos digitales con código limpio y arquitecturas mantenibles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a href="tel:+573008288485" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <Phone className="size-4 text-primary" />+57 300 828 8485
              </a>
              <a href="mailto:yayomanosalva@gmail.com" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <Mail className="size-4 text-primary" />yayomanosalva@gmail.com
              </a>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -right-6 top-1/2 size-64 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl md:size-80" />
            <div className="relative mx-auto flex aspect-[4/5] max-w-sm items-end justify-center overflow-hidden rounded-t-[2rem] bg-gradient-to-b from-secondary to-card">
              <img src="/portfolio/hero-portrait.png" alt="Retrato de Jair Manosalva" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
