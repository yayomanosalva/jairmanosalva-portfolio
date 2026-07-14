import { Code2, Layers, Gauge, Smartphone, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { SectionLabel } from './section-label';

const services = [
  { icon: Code2, title: 'Desarrollo Frontend', description: 'Aplicaciones web con React, Angular y TypeScript, con componentes reutilizables y código limpio.' },
  { icon: Layers, title: 'Arquitectura Frontend', description: 'Diseño de arquitecturas modulares y escalables basadas en Atomic Design y design systems.', featured: true },
  { icon: Gauge, title: 'Optimización de Rendimiento', description: 'Lazy loading, code splitting y buenas prácticas de SEO y accesibilidad para tiempos de carga óptimos.' },
  { icon: Smartphone, title: 'Integración de APIs', description: 'Consumo de APIs REST y comunicación con microservicios para conectar el frontend con tu backend.' },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Servicios</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">¿Qué puedo hacer por ti?</h2>
          <p className="mt-4 text-pretty text-muted-foreground">Un conjunto de servicios pensados para acompañar tu producto desde la idea hasta el lanzamiento.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="group relative transition-colors hover:border-primary/50 data-[featured=true]:border-primary/60 data-[featured=true]:bg-primary/5" data-featured={service.featured}>
                <CardHeader>
                  <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <CardTitle className="mt-4 font-display text-lg">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Saber más <ArrowUpRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
