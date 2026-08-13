import Image from "next/image";
import Link from "next/link";
import { CONTACT, NAV_LINKS, SOCIALS } from "./site";

export default function Footer() {
  return (
    <footer className="px-4 pb-4 pt-16">
      <div className="clay-card-blue relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
        <span className="clay-orb h-52 w-52 -right-20 -top-20 animate-float-orb opacity-80" />
        <span className="clay-orb-ghost h-40 w-40 -bottom-16 -left-12 opacity-70" />

        <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="clay-inset flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl p-1.5">
                <Image
                  src="/logo melati.png"
                  alt="Logo SMK Plus Melati"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-extrabold text-white">SMK Plus Melati</p>
                <p className="text-sm font-semibold text-white/80">
                  Sekolah Kewirausahaan Yang Bertakwa
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Sekolah SMK swasta keunggulan di Samarinda Seberang yang mencetak
              SDM beriman, berjiwa entrepreneur, berwawasan global, cerdas,
              terampil, disiplin, dan berakhlak mulia.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-chip-blue !py-2 !text-xs"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-white">
              Navigasi
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-white">
              Hubungi Kami
            </h3>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-white/80">
              <p>{CONTACT.address}</p>
              <p>
                <a
                  href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                  className="font-semibold text-white"
                >
                  {CONTACT.phone}
                </a>{" "}
                <span className="text-white/60">({CONTACT.phonePerson})</span>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-white"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
            <Link href="/ppdb" className="clay-btn clay-btn-accent mt-5 text-sm">
              Daftar PPDB Sekarang
            </Link>
          </div>
        </div>
        <div className="relative border-t border-white/15 bg-white/10 px-8 py-4 text-center text-xs font-medium text-white/70">
          © {new Date().getFullYear()} SMK Plus Melati Samarinda. Terampil
          Berakhlak.
        </div>
      </div>
    </footer>
  );
}