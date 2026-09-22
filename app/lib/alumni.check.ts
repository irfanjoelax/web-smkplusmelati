import assert from "node:assert/strict";
import { isAlumniData } from "./alumni";

const valid = [{
  name: "Alumni Contoh",
  graduationYear: 2024,
  major: "TJKT",
  status: "Bekerja",
  testimonial: "Bekal sekolah membantu saya memasuki dunia kerja.",
  image: "/uploads/alumni.jpg",
}];

assert.equal(isAlumniData([]), true);
assert.equal(isAlumniData(valid), true);
assert.equal(isAlumniData([{ ...valid[0], name: "" }]), false);
assert.equal(isAlumniData([{ ...valid[0], graduationYear: 24 }]), false);
assert.equal(isAlumniData([{ ...valid[0], status: "Magang" }]), false);
