import assert from "node:assert/strict";
import { getYouTubeVideoId } from "./youtube.ts";

const id = "dQw4w9WgXcQ";

assert.equal(getYouTubeVideoId(`https://www.youtube.com/watch?v=${id}&t=10`), id);
assert.equal(getYouTubeVideoId(`https://youtu.be/${id}?si=test`), id);
assert.equal(getYouTubeVideoId(`https://youtube.com/shorts/${id}`), id);
assert.equal(getYouTubeVideoId(`https://youtube.com/embed/${id}`), id);
assert.equal(getYouTubeVideoId("https://example.com/video"), null);
assert.equal(getYouTubeVideoId("invalid"), null);
