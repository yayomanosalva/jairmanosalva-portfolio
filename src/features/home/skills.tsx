import { CircularProgress } from './circular-progress';
import { SectionLabel } from './section-label';

const topSkills = [
  { label: 'React', value: 85 },
  { label: 'Angular', value: 72 },
  { label: 'TypeScript', value: 82 },
  { label: 'Arquitectura', value: 80 },
];

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS'],
  },
  {
    title: 'State Management',
    skills: ['Redux Toolkit', 'Zustand', 'TanStack Query'],
  },
  {
    title: 'Arquitectura',
    skills: ['Atomic Design', 'Design Systems', 'Component Architecture', 'Clean Code', 'Design Patterns'],
  },
  {
    title: 'Rendimiento',
    skills: ['Lazy Loading', 'Code Splitting', 'SEO Principles', 'Accesibilidad', 'Responsive Web'],
  },
  {
    title: 'Backend',
    skills: ['REST APIs', 'Spring Boot', 'PostgreSQL'],
  },
  {
    title: 'Herramientas',
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Git', 'Jira', 'Figma'],
  },
  {
    title: 'Workflow',
    skills: ['Scrum', 'Kanban', 'Git Flow', 'Agile Development'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Skills</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Lo que domino</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Tecnologías, herramientas y metodologías que uso a diario para construir productos de calidad.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          {topSkills.map((skill) => (
            <CircularProgress key={skill.label} value={skill.value} label={skill.label} />
          ))}
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
