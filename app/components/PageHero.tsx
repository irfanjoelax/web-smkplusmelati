import Reveal from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative px-4 pt-10 sm:pt-14">
      <div className="clay-card-blue relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-16">
        <span className="clay-orb h-40 w-40 -right-10 -top-10 animate-float-orb opacity-90" />
        <span className="clay-orb-ghost h-28 w-28 -bottom-12 -left-8" />
        <Reveal className="relative">
          <span className="clay-chip-blue mx-auto mb-5">{eyebrow}</span>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}