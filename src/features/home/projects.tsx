import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { SectionLabel } from './section-label';

const projects = [
  { title: 'Bidilink Nexus', category: 'React · TypeScript · Bun · RsBuild', image: '/portfolio/bidilink-web.png', href: 'https://bidilink.com/' },
  { title: 'Vumi Travels', category: 'Angular · Ionic · REST APIs', image: '/portfolio/vumi-travels.png', href: 'https://play.google.com/store/apps/details?id=com.vumiagentcentral&hl=en' },
  { title: 'Prodesa Web/App', category: 'React ', image: '/portfolio/prodesa-web-app.png', href: 'https://prodesa.com/' },
  { title: 'Copidrogas Front', category: 'React · RTK - Form', image: '/portfolio/copidrogas-front.png', href: 'https://www.coopidrogas.com.co/sip-enlaces' },
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
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                {project.image ? (
                  <img src={project.image} alt={`Vista previa del proyecto ${project.title}`} className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-5xl font-bold text-muted-foreground/20">{project.title[0]}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                  <h3 className="font-display text-lg font-semibold truncate">{project.title}</h3>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
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
