export function CircularProgress({ value, label }: { value: number; label: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-32" role="img" aria-label={`${label}: ${value}%`}>
        <svg className="size-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--secondary)" strokeWidth="8" />
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">{value}%</span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
