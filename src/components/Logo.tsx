import { useState } from "react";
import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  imgClassName?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizeMap = {
  sm: "h-8 w-auto",
  md: "h-10 md:h-12 w-auto",
  lg: "h-14 md:h-16 w-auto",
  hero: "h-24 md:h-32 lg:h-40 w-auto",
};

const textSizeMap = {
  sm: "text-xl",
  md: "text-2xl md:text-3xl",
  lg: "text-4xl md:text-5xl",
  hero: "text-6xl md:text-7xl lg:text-8xl",
};

export default function Logo({ className = "", imgClassName = "", href = "/", size = "md" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  const fallback = (
    <span className={`font-serif font-bold tracking-tight text-gradient-gold ${textSizeMap[size]}`}>
      α & Ω
    </span>
  );

  const content = imgError ? (
    fallback
  ) : (
    <img
      src="/logo.png"
      alt="Alpha & Omega"
      className={`object-contain ${sizeMap[size]} ${imgClassName}`}
      width={size === "hero" ? 320 : size === "lg" ? 160 : size === "md" ? 120 : 80}
      height={size === "hero" ? 120 : size === "lg" ? 64 : size === "md" ? 48 : 32}
      onError={() => setImgError(true)}
    />
  );

  if (href) {
    return (
      <Link to={href} className={`inline-block ${className}`}>
        {content}
      </Link>
    );
  }

  return <span className={`inline-block ${className}`}>{content}</span>;
}
