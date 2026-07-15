import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/accordion';
import { SectionLabel } from './section-label';

const faqs = [
  { q: '¿Qué tecnologías dominas?', a: 'Mi stack principal es React, Angular, TypeScript y JavaScript, con gestión de estado usando Redux Toolkit, Zustand y TanStack Query. También trabajo con SASS, Docker, GitHub Actions y CI/CD.' },
  { q: '¿Cómo abordas la arquitectura de un proyecto?', a: 'Aplico Atomic Design, design systems y patrones de arquitectura de componentes para crear estructuras modulares, escalables y mantenibles, con código limpio y listo para crecer.' },
  { q: '¿Trabajas también con el backend?', a: 'Mi foco es el frontend, pero integro APIs REST y comunicación con microservicios. Tengo experiencia con Spring Boot y PostgreSQL para soluciones full-stack cuando el proyecto lo requiere.' },
  { q: '¿Cómo optimizas el rendimiento?', a: 'Uso lazy loading, code splitting y buenas prácticas de SEO y accesibilidad. En proyectos anteriores logré mejorar los tiempos de carga en aproximadamente un 40%.' },
  { q: '¿Trabajas con metodologías ágiles?', a: 'Sí. Trabajo con Scrum, Kanban y Git Flow, integrado en equipos que usan herramientas como Jira y Figma para mantener un flujo colaborativo y transparente.' },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <SectionLabel className="justify-center">FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Preguntas frecuentes</h2>
        </div>

        <Accordion className="mt-12" defaultValue={['item-0']}>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`} className="rounded-lg border border-border bg-card px-4 not-last:mb-3 not-last:border-b">
              <AccordionTrigger className="font-display text-base hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
