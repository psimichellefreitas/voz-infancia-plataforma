/**
 * Ilustração do hero da Home — provisória, coerente com a direção visual atual.
 *
 * Escolha de ilustração (e não fotografia) nesta fase: é livre de licenciamento, totalmente
 * controlável e respeita os limites de imagem da base — infância representada com dignidade,
 * sem rostos, sem crianças identificáveis, sem cena de sofrimento (DOC 01, Art. 25–26; DOC 09).
 * Motivo: um arco que abriga um adulto e uma criança, com ondas que sugerem escuta.
 * Usa os tokens de cor, então acompanha os temas claro e escuro.
 */
export function HeroArt({ className }: { className?: string }) {
  return (
    <div
      className={
        "overflow-hidden rounded-[12px] border border-border bg-secondary shadow-[var(--shadow-lift)] " +
        (className ?? "")
      }
    >
      <svg
        viewBox="0 0 640 520"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ilustração: um adulto e uma criança lado a lado, abrigados por um arco, com ondas suaves que sugerem escuta."
      >
        <defs>
          <clipPath id="hero-arch">
            <path d="M92 472 V252 C92 132 192 52 320 52 C448 52 548 132 548 252 V472 Z" />
          </clipPath>
        </defs>

        <rect width="640" height="520" fill="var(--secondary)" />

        {/* ondas de escuta */}
        <g fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.32">
          <path d="M320 498 A132 132 0 0 1 112 306" />
          <path d="M320 498 A198 198 0 0 1 74 258" />
          <path d="M320 498 A264 264 0 0 1 44 212" />
        </g>

        {/* arco / abrigo */}
        <path
          d="M92 472 V252 C92 132 192 52 320 52 C448 52 548 132 548 252 V472 Z"
          fill="var(--primary)"
        />

        <g clipPath="url(#hero-arch)">
          <rect x="92" y="70" width="456" height="402" fill="var(--card)" />
          <rect x="92" y="430" width="456" height="42" fill="var(--primary)" opacity="0.85" />

          {/* adulto */}
          <circle cx="264" cy="212" r="33" fill="var(--accent)" />
          <path
            d="M264 250 c-37 0 -54 33 -54 80 v92 h108 v-92 c0 -47 -17 -80 -54 -80 Z"
            fill="var(--accent)"
          />

          {/* criança */}
          <circle cx="366" cy="270" r="23" fill="var(--primary)" />
          <path
            d="M366 296 c-25 0 -37 23 -37 56 v70 h74 v-70 c0 -33 -12 -56 -37 -56 Z"
            fill="var(--primary)"
          />

          {/* gesto protetor: mão do adulto em direção ao ombro da criança */}
          <path
            d="M302 300 c18 -10 39 -12 57 -4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="15"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
