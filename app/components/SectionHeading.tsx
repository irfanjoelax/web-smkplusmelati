type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  variant?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  variant = "light",
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`mb-4 ${
            isDark ? "clay-chip-blue" : "clay-chip clay-chip-primary"
          } ${center ? "mx-auto" : ""}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-extrabold leading-tight sm:text-4xl ${
          isDark ? "text-white" : "text-primary-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            isDark ? "text-white/80" : "text-foreground/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}