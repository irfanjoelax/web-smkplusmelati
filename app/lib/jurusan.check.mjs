import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const items = JSON.parse(readFileSync(new URL("../data/jurusan.json", import.meta.url), "utf8"));
const normalized = items.map((item) => ({ ...item, image: typeof item.image === "string" ? item.image : "" }));

assert.equal(normalized.length > 0, true);
assert.equal(normalized.every((item) => typeof item.image === "string"), true);
