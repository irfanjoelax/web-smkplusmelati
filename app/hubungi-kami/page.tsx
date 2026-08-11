import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PageHero from "@/app/components/PageHero";
import { CONTACT, SOCIALS } from "@/app/components/site";

export const metadata: Metadata = {
  title: "Hubungi Kami",
};

const contactItems = [
  {
    label: "Alamat",
    value: CONTACT.address,
    href: undefined as string | undefined,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Telepon",
    value: `${CONTACT.phone} — ${CONTACT.phonePerson}`,
    href: `tel:${CONTACT.phone.replace(/-/g, "")}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function HubungiKamiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Kontak"
          title="Hubungi Kami"
          description="Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut seputar pendaftaran dan kegiatan sekolah."
        />

        <section className="px-4 py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              {contactItems.map((item) => {
                const inner = (
                  <ClayCard hover className="flex items-center gap-5 p-6">
                    <span className="clay-inset flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                        {item.label}
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </ClayCard>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}

              <ClayCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                  Ikuti Kami
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-chip"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </ClayCard>
            </div>

            <ClayCard className="flex flex-col p-8 sm:p-10">
              <span className="clay-chip clay-chip-primary mb-5">
                Pesan Cepat
              </span>
              <h2 className="text-2xl font-extrabold text-primary-dark">
                Kirim Pertanyaanmu
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Gunakan Google Form resmi SMK Plus Melati untuk menyampaikan
                pertanyaan atau permohonan informasi.
              </p>
              <a
                href={CONTACT.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn clay-btn-accent mt-8"
              >
                Buka Form Kontak
              </a>
              <div className="mt-auto pt-8">
                <div className="clay-inset rounded-3xl p-6 text-sm leading-relaxed text-foreground/75">
                  <p className="font-extrabold text-primary-dark">
                    {CONTACT.name}
                  </p>
                  <p className="mt-1 font-semibold text-accent">
                    {CONTACT.tagline}
                  </p>
                  <p className="mt-3">
                    Kunjungi kami untuk melihat langsung fasilitas dan suasana
                    belajar di SMK Plus Melati Samarinda.
                  </p>
                </div>
              </div>
            </ClayCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
