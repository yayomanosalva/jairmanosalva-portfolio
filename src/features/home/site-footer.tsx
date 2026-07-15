const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jair-manosalva-66111541/' },
  { label: 'GitHub', href: 'https://github.com/yayomanosalva/' },
  { label: 'Email', href: 'mailto:yayomanosalva@gmail.com' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary font-display text-base font-bold text-primary-foreground">J.</span>
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Jair Manosalva. Todos los derechos reservados.</span>
        </div>
        <nav aria-label="Redes sociales" className="flex items-center gap-5">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{social.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
