import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/logo-voz-pela-infancia.png";

export function Logo({ variant = "default" }: { variant?: "default" | "inverse" }) {
  const inverse = variant === "inverse";
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Voz Pela Infância — início">
      <img
        src={logoSrc}
        alt="Voz Pela Infância"
        className={`h-14 w-auto object-contain transition-opacity ${inverse ? "brightness-105" : ""}`}
        width={696}
        height={359}
      />
    </Link>
  );
}
