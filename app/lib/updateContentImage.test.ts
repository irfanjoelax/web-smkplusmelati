import assert from "node:assert/strict";
import { clearContentImage } from "./updateContentImage";

const data = { items: [{ title: "Juara", image: "/uploads/juara.jpg" }] };
const result = clearContentImage(
  structuredClone(data),
  "items",
  data.items[0],
);

assert.equal(result.ok, true);
if (result.ok) {
  assert.equal(result.previousImage, "/uploads/juara.jpg");
  assert.equal((result.data as typeof data).items[0].image, "");
}

assert.equal(
  clearContentImage(structuredClone(data), "items", { title: "Lain" }).ok,
  false,
);
