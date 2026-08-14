import { Link } from "@tanstack/react-router";

export function Logo({ variant = "default" }: { variant?: "default" | "inverse" }) {
  const inverse = variant === "inverse";
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Voz Pela Infância — início">
      <span
        className={
          inverse
            ? "grid h-9 w-9 place-items-center rounded-[10px] bg-primary-foreground/15 text-primary-foreground"
            : "grid h-9 w-9 place-items-center rounded-[10px] bg-primary/10 text-primary"
        }
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M4 6.5v4a8 8 0 0 0 8 8 8 8 0 0 0 8-8v-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M12 3v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.95rem] font-bold tracking-tight ${inverse ? "text-primary-foreground" : "text-primary"}`}
        >
          VOZ PELA INFÂNCIA
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
            inverse ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          Movimento em defesa da infância
        </span>
      </span>
    </Link>
  );
}
