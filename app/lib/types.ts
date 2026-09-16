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

export type JurusanItem = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  whyTitle: string;
  whyText: string;
  skills: string[];
  card1: JurusanCard;
  card2: JurusanCard;
};

export type JurusanData = JurusanItem[];

export type PrestasiItem = {
  title: string;
  description: string;
  image: string;
};

export type EkskulItem = {
  title: string;
  desc: string;
  image: string;
  required?: boolean;
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

export type ProgramSection = {
  type: "list" | "text";
  title: string;
  items?: string[];
  text?: string;
};

export type ProgramEntity = {
  id: string;
  title: string;
  summary: string;
  description: string;
  icon: IconKey;
  cards: ProgramCard[];
  section?: ProgramSection;
};

export type ProgramData = ProgramEntity[];

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
