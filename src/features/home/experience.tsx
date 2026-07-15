import { SectionLabel } from './section-label';

const experiences = [
  {
    period: 'Mar 2025 — Presente',
    company: 'Bidilink',
    role: 'Frontend Architect and Developer',
    description: [
      'Desarrollé plataforma SaaS con React y TypeScript.',
      'Diseñé e implementé arquitectura frontend modular enfocada en escalabilidad y reutilización.',
      'Integré APIs REST y comunicación con microservicios.',
      'Implementé entornos Docker y pipelines CI/CD con GitHub Actions.',
    ],
  },
  {
    period: 'Ene 2025 — Mar 2025',
    company: 'Epayco / Interfell',
    role: 'Frontend Developer',
    description: [
      'Construí interfaces web con React, Redux Toolkit y TypeScript.',
      'Creé componentes reutilizables y consumí APIs REST.',
      'Optimicé rendimiento con Lazy Loading y Code Splitting.',
      'Mejoré tiempos de carga en aproximadamente un 40%.',
    ],
  },
  {
    period: 'May 2022 — Jun 2024',
    company: 'Iridian Consulting',
    role: 'Frontend Developer',
    description: [
      'Contribuí al diseño, arquitectura y desarrollo de aplicaciones frontend.',
      'Desarrollé con React, Angular, Ionic y TypeScript.',
      'Construí componentes reutilizables y estructuras escalables.',
      'Desarrollé formularios complejos e integré servicios REST.',
    ],
  },
  {
    period: 'Ene 2017 — May 2021',
    company: 'Stack Pointer',
    role: 'Support and Development Engineer',
    description: [
      'Desarrollé interfaces AngularJS y APIs con Spring Boot.',
      'Creé componentes reutilizables para proyectos internos.',
      'Construí soluciones empresariales frontend/backend.',
    ],
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Trayectoria</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Experiencia profesional</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Más de 10 años construyendo productos digitales con equipos talentosos.
          </p>
        </div>

        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.company + exp.period} className="relative grid gap-4 md:grid-cols-2">
                <div className="pl-10 md:pl-0 md:text-right">
                  <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">{exp.period}</span>
                  <h3 className="mt-1 font-display text-xl font-bold">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.role}</p>
                </div>

                <div className="relative pl-10 md:pl-10">
                  <span aria-hidden="true" className="absolute left-[7px] top-1.5 size-2.5 rounded-full border-2 border-primary bg-background md:left-[7px]" />
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
