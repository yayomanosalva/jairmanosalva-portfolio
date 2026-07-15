import { ArrowRight } from 'lucide-react';
import { SectionLabel } from './section-label';

export function About() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>Sobre mí</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-balance md:text-4xl">
              Código limpio, arquitecturas escalables y productos listos para crecer.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Soy Ingeniero de Sistemas y desarrollador frontend senior especializado en arquitectura de frontend, componentes reutilizables, optimización de rendimiento e integración de APIs REST. Me enfoco en entregar productos digitales con buenas prácticas y estructuras mantenibles.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-6xl font-bold text-primary">10+</span>
              <span className="text-sm leading-snug text-muted-foreground">
                Años de<br />experiencia
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">¿Tienes un proyecto?</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-balance md:text-3xl">Cualquier tipo de consulta y colaboración.</h3>
            <p className="mt-4 text-muted-foreground">Hablemos.</p>
            <a href="mailto:yayomanosalva@gmail.com" className="group mt-8 inline-flex items-center gap-3 text-lg font-medium text-primary">
              yayomanosalva@gmail.com
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
