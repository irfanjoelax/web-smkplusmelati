export const CONTACT = {
  name: "SMK Plus Melati Samarinda",
  tagline: "SMK Wirausaha Muda",
  address:
    "Jl. H. A. M. M. Rifaddin No.1, RT.25, Harapan Baru, Kec. Loa Janan Ilir, Kota Samarinda, Kalimantan Timur 75132",
  phone: "0851-9157-6889",
  phonePerson: "Yuzi Deliana, S.H",
  whatsappUrl: `https://wa.me/6285191576889?text=${encodeURIComponent(
    "Halo Admin SMK Plus Melati Samarinda, saya ingin bertanya.",
  )}`,
  email: "smkmelatismd@gmail.com",
  ppdbUrl: "https://ppdb.smkplusmelati.sch.id",
  googleFormUrl: "https://forms.gle/5TurwL5h66Lp19Tc6",
  googleFormEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdBQjKgIQOVRJRFws5RsvtJjaqiFoQ8dSXXnCXqybBdlRgsHQ/viewform?embedded=true",
};

export const SOCIALS = [
  {
    label: "Instagram",
    handle: "smkplusmelati",
    url: "https://www.instagram.com/smkplusmelati",
  },
  {
    label: "Facebook",
    handle: "SMK Plus Melati Samarinda",
    url: "https://www.facebook.com/SMK.PLUS.MELATI.SAMARINDA.2020",
  },
  {
    label: "YouTube",
    handle: "SMK Plus Melati Samarinda",
    url: "https://youtube.com/@esemkaplustivi3837?si=WXYYPJqHU7Wj_v0z",
  },
];

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil",
    children: [
      { label: "Profil", href: "/profil" },
      { label: "Visi Misi", href: "/visi-misi" },
      { label: "Daftar Guru", href: "/guru" },
      { label: "Fasilitas", href: "/fasilitas" },
    ],
  },
  {
    label: "Jurusan",
    href: "/jurusan/tjkt",
    children: [
      { label: "TJKT", href: "/jurusan/tjkt" },
      { label: "Kuliner", href: "/jurusan/kuliner" },
    ],
  },
  {
    label: "Program",
    href: "/program-pelatihan",
    children: [
      { label: "Program Pelatihan", href: "/program-pelatihan" },
      { label: "Program Asrama", href: "/program-asrama" },
      { label: "Program Keagamaan", href: "/program-keagamaan" },
    ],
  },
  { label: "Prestasi", href: "/prestasi-siswa" },
  { label: "Ekskul", href: "/ekskul" },
  { label: "Alumni", href: "/alumni" },
  { label: "Berita", href: "/berita" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];
