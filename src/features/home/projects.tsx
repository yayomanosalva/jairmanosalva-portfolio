import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { SectionLabel } from './section-label';

const projects = [
  { title: 'Bidilink SaaS Platform', category: 'React · TypeScript · Docker', image: '/portfolio/project-2.png', href: '#' },
  { title: 'Vumi Travels', category: 'React · REST APIs', image: '/portfolio/project-1.png', href: '#' },
  { title: 'Prodesa Web/App', category: 'Angular · Ionic', image: '/portfolio/project-3.png', href: '#' },
  { title: 'Copidrogas Front', category: 'React · E-commerce', image: '/portfolio/project-4.png', href: '#' },
];

export function Projects() {
  return (
    <section id="proyectos" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Portafolio</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Proyectos destacados</h2>
          </div>
          <p className="max-w-sm text-pretty text-muted-foreground">Una selección de plataformas y aplicaciones web construidas con React, Angular y TypeScript.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a key={project.title} href={project.href} className="group relative overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={project.image || '/placeholder.svg'} alt={`Vista previa del proyecto ${project.title}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                  <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
