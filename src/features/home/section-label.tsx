import { cn } from '@lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary', className)}>
      <span aria-hidden="true" className="h-px w-6 bg-primary" />
      {children}
    </span>
  );
}
