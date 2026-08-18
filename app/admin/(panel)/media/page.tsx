import { readdirSync, existsSync } from "fs";
import path from "path";
import MediaClient from "./media-client";

export const metadata = {
  title: "Media | Admin Panel",
};

export default function MediaPage() {
  const dir = path.join(process.cwd(), "public", "uploads");
  let files: string[] = [];
  if (existsSync(dir)) {
    files = readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .map((f) => `/uploads/${f}`)
      .sort((a, b) => b.localeCompare(a));
  }

  return <MediaClient initial={files} />;
}