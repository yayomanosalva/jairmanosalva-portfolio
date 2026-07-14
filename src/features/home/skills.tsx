import { CircularProgress } from './circular-progress';
import { SectionLabel } from './section-label';

const skills = [
  { label: 'React', value: 96 },
  { label: 'Angular', value: 88 },
  { label: 'TypeScript', value: 94 },
  { label: 'Arquitectura', value: 92 },
];

export function Skills() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Skills</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Lo que domino</h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          {skills.map((skill) => (
            <CircularProgress key={skill.label} value={skill.value} label={skill.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
