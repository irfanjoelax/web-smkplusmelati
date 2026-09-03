import { list } from "@vercel/blob";
import MediaClient from "./media-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Media | Admin Panel",
};

export default async function MediaPage() {
  let files: string[] = [];
  try {
    const { blobs } = await list({ prefix: "uploads/" });
    files = blobs
      .map((b) => b.url)
      .sort((a, b) => b.localeCompare(a));
  } catch {
    // BLOB_READ_WRITE_TOKEN belum di-set (dev lokal) — tampilkan kosong
  }

  return <MediaClient initial={files} />;
}
