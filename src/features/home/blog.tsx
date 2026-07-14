import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@components/ui/card';
import { SectionLabel } from './section-label';

const posts = [
  { title: 'Arquitectura de frontend escalable con Atomic Design', date: '02 Jun 2026', category: 'Arquitectura', image: '/portfolio/blog-2.png', href: '#' },
  { title: 'Optimizar React: lazy loading y code splitting en la práctica', date: '02 Jun 2026', category: 'Rendimiento', image: '/portfolio/blog-3.png', href: '#' },
  { title: 'Componentes reutilizables y design systems mantenibles', date: '02 Jun 2026', category: 'React', image: '/portfolio/blog-1.png', href: '#' },
];

export function Blog() {
  return (
    <section id="blog" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Blog</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Últimas publicaciones</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="group overflow-hidden pt-0">
              <a href={post.href} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image || '/placeholder.svg'} alt={`Imagen del artículo: ${post.title}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <span>{post.date}</span>
                    <span aria-hidden="true" className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{post.category}</span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-lg font-semibold leading-snug text-balance">
                    {post.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </h3>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
