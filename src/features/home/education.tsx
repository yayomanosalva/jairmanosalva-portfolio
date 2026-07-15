import { GraduationCap } from 'lucide-react';
import { SectionLabel } from './section-label';

const education = [
  {
    degree: 'Ingeniero de Sistemas',
    institution: 'Universidad Simón Bolívar',
    year: '2009',
  },
  {
    degree: 'Front End Web Developer Nanodegree',
    institution: 'Udacity',
    year: '2015',
  },
];

export function Education() {
  return (
    <section id="educacion" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Formación</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Educación</h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {education.map((item) => (
            <div key={item.degree} className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                <span className="mt-2 inline-block font-mono text-xs font-medium uppercase tracking-widest text-primary">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
