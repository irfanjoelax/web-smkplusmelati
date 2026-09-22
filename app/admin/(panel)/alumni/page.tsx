import AlumniEditor from "./editor";
import { getContent } from "@/app/lib/content";
import { getJurusanData } from "@/app/lib/jurusan";
import type { AlumniItem, TestimoniOrtuItem } from "@/app/lib/types";

export const dynamic = "force-dynamic";

export default async function AlumniAdminPage() {
  const [rawAlumni, jurusan, testimonials] = await Promise.all([
    getContent<(AlumniItem & { institution?: string })[]>("alumni"),
    getJurusanData(),
    getContent<TestimoniOrtuItem[]>("testimoniOrtu"),
  ]);
  return (
    <AlumniEditor
      initial={rawAlumni.map(({ name, graduationYear, major, status, testimonial, institution, image }) => ({
        name,
        graduationYear,
        major,
        status,
        testimonial: testimonial ?? institution ?? "",
        image,
      }))}
      initialTestimonials={testimonials}
      majors={jurusan.map((j) => j.name)}
    />
  );
}
