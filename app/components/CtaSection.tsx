import Link from "next/link";
import ClayCard from "./ClayCard";
import Reveal from "./Reveal";

type CtaSectionProps = {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
};

export default function CtaSection({
  title = "Wujudkan Masa Depan Bersama SMK Plus Melati",
  description = "Pendaftaran Peserta Didik Baru (SPMB) 2026 telah dibuka. Daftarkan diri secara online dengan mudah dan cepat.",
  primaryText = "Daftar SPMB 2026",
  primaryHref = "/spmb",
  secondaryText = "Hubungi Panitia",
  secondaryHref = "/hubungi-spmb",
}: CtaSectionProps) {
  return (
    <section className="px-4 pb-20 pt-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ClayCard
            variant="blue"
            className="relative overflow-hidden rounded-[2.5rem] p-8 text-center sm:p-12"
          >
            <span className="clay-orb h-40 w-40 -right-10 -top-10 animate-float-orb opacity-75" />
            <span className="clay-orb-ghost h-32 w-32 -bottom-10 -left-10 opacity-60" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="clay-chip-blue mx-auto mb-4">
                Penerimaan Peserta Didik Baru
              </span>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href={primaryHref} className="clay-btn clay-btn-accent">
                  {primaryText}
                </Link>
                {secondaryText && (
                  <Link href={secondaryHref} className="clay-btn clay-btn-light">
                    {secondaryText}
                  </Link>
                )}
              </div>
            </div>
          </ClayCard>
        </Reveal>
      </div>
    </section>
  );
}
