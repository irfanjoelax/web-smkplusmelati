import assert from "node:assert/strict";
import { deleteContentItem } from "./deleteContentItem";

const source = {
  title: "tetap",
  nested: { items: [{ id: "a", draft: false }, { id: "b", draft: false }] },
};
const result = deleteContentItem(source, "nested.items", { id: "a", draft: false });

assert.equal(result.ok, true);
assert.deepEqual(source, {
  title: "tetap",
  nested: { items: [{ id: "b", draft: false }] },
});
assert.deepEqual(deleteContentItem(source, "nested.missing", {}), {
  ok: false,
  reason: "invalid-section",
});
assert.deepEqual(deleteContentItem(source, "nested.items", { id: "missing" }), {
  ok: false,
  reason: "not-found",
});
