import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-voz-pela-infancia.png.asset.json";

export function Logo({ variant = "default" }: { variant?: "default" | "inverse" }) {
  const inverse = variant === "inverse";
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Voz Pela Infância — início">
      <img
        src={logoAsset.url}
        alt="Voz Pela Infância"
        className={`h-16 w-auto rounded-[8px] object-contain transition-opacity ${
          inverse ? "brightness-105" : ""
        }`}
        width={320}
        height={64}
      />
    </Link>
  );
}
