import type { ReactNode } from "react";

type ClayCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  inset?: boolean;
  variant?: "white" | "blue";
};

export default function ClayCard({
  children,
  className = "",
  hover = false,
  inset = false,
  variant = "white",
}: ClayCardProps) {
  const base = inset
    ? "clay-inset"
    : variant === "blue"
      ? "clay-card-blue"
      : "clay-card";

  const hoverClass =
    !inset && hover
      ? variant === "blue"
        ? "clay-card-blue-hover"
        : "clay-card-hover"
      : "";

  return (
    <div className={`${base} ${hoverClass} ${className}`}>{children}</div>
  );
}