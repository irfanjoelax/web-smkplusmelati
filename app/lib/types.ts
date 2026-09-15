export type Teacher = {
  name: string;
  role: string;
  image: string;
};

export type VisiMisi = {
  visi: string;
  misi: string[];
};

export type JurusanCard = {
  chip: string;
  title: string;
  description: string;
};

export type JurusanData = {
  tkj: {
    skills: string[];
    sertifikasi: JurusanCard;
    prospek: JurusanCard;
  };
  tataBoga: {
    skills: string[];
    keunggulan: JurusanCard;
    prospek: JurusanCard;
  };
};

export type PrestasiItem = {
  title: string;
  description: string;
  image: string;
};

export type EkskulItem = {
  title: string;
  desc: string;
  image: string;
};

export type BeritaItem = {
  slug: string;
  title: string;
  desc: string;
  content: string;
  image: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ActivityLogEntry = {
  id: string;
  action: "add" | "edit" | "delete";
  collection: string;
  label: string;
  timestamp: string;
};

export type IncompleteContentItem = {
  title: string;
  issue: string;
  href: string;
};

export type Prestasi = {
  quote: string;
  items: PrestasiItem[];
};

export type FasilitasItem = {
  title: string;
  description: string;
  image: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type IconKey =
  | "network"
  | "chef"
  | "training"
  | "dormitory"
  | "religion"
  | "award";

export type Major = {
  id: string;
  title: string;
  full: string;
  desc: string;
  href: string;
  icon: IconKey;
};

export type ProgramItem = {
  id: string;
  title: string;
  desc: string;
  href: string;
  icon: IconKey;
};

export type EkskulPreview = {
  name: string;
  href: string;
  image: string;
};

export type FacilityPreview = {
  name: string;
  image: string;
};

export type ProgramCard = {
  title: string;
  description: string;
  image: string;
};

export type ProgramData = {
  pelatihan: {
    cards: ProgramCard[];
    harapan: string[];
  };
  keagamaan: {
    cards: ProgramCard[];
    perayaanText: string;
  };
  asrama: {
    cards: ProgramCard[];
    jadwal: string[];
  };
};

export type ProfilReason = {
  title: string;
  desc: string;
};

export type ProfilData = {
  image1: string;
  title1: string;
  paragraphs: string[];
  reasons: ProfilReason[];
  image2: string;
  title2: string;
  desc2: string;
};

export type Beranda = {
  heroImage?: string;
  ppdbImage?: string;
  stats: Stat[];
  majors: Major[];
  programs: ProgramItem[];
  ekskulPreview: EkskulPreview[];
  facilities: FacilityPreview[];
};
