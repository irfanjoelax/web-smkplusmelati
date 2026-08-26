import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { CONTACT } from "@/app/components/site";

export const metadata: Metadata = {
  title: "Hubungi Panitia PPDB",
  description: "Hubungi panitia PPDB SMK Plus Melati Samarinda untuk informasi pendaftaran dan bantuan.",
};

export default function HubungiPPDBPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Kontak PPDB"
          title="Hubungi Panitia PPDB"
          description="Butuh bantuan pendaftaran? Hubungi panitia PPDB SMK Plus Melati melalui kontak di bawah ini."
        />

        <section className="px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <ClayCard className="p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-primary-dark sm:text-2xl">
                  Kontak Panitia
                </h2>
                <p className="mt-1 text-sm text-foreground/70">
                  Senin – Jumat, 08.00 – 16.00 WITA
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="clay-inset flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">Telepon</p>
                      <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="font-semibold text-foreground hover:text-accent">
                        {CONTACT.phone} — {CONTACT.phonePerson}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="clay-inset flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">Email</p>
                      <a href={`mailto:${CONTACT.email}`} className="font-semibold text-foreground hover:text-accent">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="clay-inset flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">Alamat</p>
                      <p className="font-semibold text-foreground">{CONTACT.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="clay-btn clay-btn-accent text-sm">
                    Telepon Sekarang
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="clay-btn text-sm">
                    Kirim Email
                  </a>
                </div>
              </ClayCard>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}