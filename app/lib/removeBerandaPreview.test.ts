import assert from "node:assert/strict";
import { removeBerandaPreview } from "./removeBerandaPreview";
import type { Beranda } from "./types";

const data = {
  stats: [],
  majors: [],
  programs: [],
  ekskulPreview: [
    { name: "PodSchool", href: "/ekskul", image: "/images/podschool.jpg" },
    { name: "Pramuka", href: "/ekskul", image: "/images/pramuka.jpg" },
  ],
  facilities: [
    { name: "Ruang Kelas", image: "/images/ruang-kelas.jpg" },
  ],
} satisfies Beranda;

const ekskul = removeBerandaPreview(data, "ekskul", {
  title: "PodSchool Zaman Now",
  image: "/images/podschool.jpg",
});
assert.equal(ekskul.changed, true);
assert.deepEqual(ekskul.data.ekskulPreview.map((item) => item.name), ["Pramuka"]);

const fasilitas = removeBerandaPreview(data, "fasilitas", {
  title: "Ruang Kelas",
  image: "",
});
assert.equal(fasilitas.changed, true);
assert.equal(fasilitas.data.facilities.length, 0);

const missing = removeBerandaPreview(data, "ekskul", {
  title: "Tidak Ada",
  image: "/images/tidak-ada.jpg",
});
assert.equal(missing.changed, false);
