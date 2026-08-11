export const CONTACT = {
  name: "SMK Plus Melati Samarinda",
  tagline: "Terampil Berakhlak",
  address: "Jl. H.A.M. Rifaddin No 1 RT 25, Harapan Baru, Samarinda Seberang",
  phone: "0851-9157-6889",
  phonePerson: "Yuzi Deliana, S.H",
  email: "plus@smkplusmelati.sch.id",
  ppdbUrl: "https://ppdb.smkplusmelati.sch.id",
  googleFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfCNrHBi-8TYbc5GLMDHVVbWk8Weh5S0p6Knd4cW17X2TSXHw/viewform",
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
    url: "https://www.facebook.com/SMKPlusMelatiSamarinda",
  },
  {
    label: "YouTube",
    handle: "SMK Plus Melati Samarinda",
    url: "https://www.youtube.com/@smkplusmelatisamarinda",
  },
];

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil",
    children: [
      { label: "Profil", href: "/profil" },
      { label: "Visi Misi", href: "/visi-misi" },
      { label: "Daftar Guru", href: "/guru" },
    ],
  },
  {
    label: "Program",
    href: "/program-pelatihan",
    children: [
      { label: "Program Pelatihan", href: "/program-pelatihan" },
      { label: "Program Asrama", href: "/program-asrama" },
      { label: "Program Keagamaan", href: "/program-keagamaan" },
      { label: "Prestasi Siswa", href: "/prestasi-siswa" },
    ],
  },
  {
    label: "Jurusan",
    href: "/jurusan/tkj",
    children: [
      { label: "TKJ", href: "/jurusan/tkj" },
      { label: "Tata Boga", href: "/jurusan/tata-boga" },
    ],
  },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Ekskul", href: "/ekskul" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];
