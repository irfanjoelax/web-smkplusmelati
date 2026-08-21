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
  alt: string;
};

export type EkskulItem = {
  title: string;
  desc: string;
  image: string;
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
  value: number;
  suffix: string;
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

export type Beranda = {
  stats: Stat[];
  majors: Major[];
  programs: ProgramItem[];
  ekskulPreview: EkskulPreview[];
  facilities: FacilityPreview[];
};
