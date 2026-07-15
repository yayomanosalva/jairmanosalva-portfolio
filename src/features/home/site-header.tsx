'use client';

import { useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experiencia', id: 'experiencia' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contacto', id: 'contacto' },
];

function scrollTo(id: string, e?: MouseEvent) {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const closeAndScroll = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <button onClick={(e) => scrollTo('inicio', e)} className="flex size-10 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground" aria-label="Ir al inicio">
          J.
        </button>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button key={link.id} onClick={(e) => scrollTo(link.id, e)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button onClick={(e) => scrollTo('contacto', e)}>Hablemos</Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={cn('overflow-hidden border-t border-border/60 md:hidden', open ? 'max-h-96' : 'max-h-0 border-t-0')}>
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => closeAndScroll(link.id)} className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {link.label}
            </button>
          ))}
          <Button className="mt-2" onClick={() => closeAndScroll('contacto')}>Hablemos</Button>
        </nav>
      </div>
    </header>
  );
}
