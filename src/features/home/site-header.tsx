'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="flex size-10 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground" aria-label="Ir al inicio">
          J.
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button nativeButton={false} render={<a href="#contacto">Hablemos</a>} />
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={cn('overflow-hidden border-t border-border/60 md:hidden', open ? 'max-h-96' : 'max-h-0 border-t-0')}>
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {link.label}
            </a>
          ))}
          <Button className="mt-2" nativeButton={false} render={<a href="#contacto">Hablemos</a>} />
        </nav>
      </div>
    </header>
  );
}
