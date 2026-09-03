import { existsSync, readdirSync } from "fs";
import path from "path";
import { list } from "@vercel/blob";
import MediaClient from "./media-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Media | Admin Panel",
};

export default async function MediaPage() {
  let files: string[] = [];

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Production → list dari Vercel Blob
    try {
      const { blobs } = await list({ prefix: "uploads/" });
      files = blobs
        .map((b) => b.url)
        .sort((a, b) => b.localeCompare(a));
    } catch {
      // token ada tapi gagal → biarkan kosong
    }
  } else {
    // Dev lokal → baca dari public/uploads/
    const dir = path.join(process.cwd(), "public", "uploads");
    if (existsSync(dir)) {
      files = readdirSync(dir)
        .filter((f) => !f.startsWith("."))
        .map((f) => `/uploads/${f}`)
        .sort((a, b) => b.localeCompare(a));
    }
  }

  return <MediaClient initial={files} />;
}
