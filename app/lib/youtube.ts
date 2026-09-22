const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function getYouTubeVideoId(value: string): string | null {
  const input = value.trim();
  if (VIDEO_ID_PATTERN.test(input)) return input;

  try {
    const url = new URL(input);
    const hostname = url.hostname.replace(/^www\./, "");
    let id: string | null = null;

    if (hostname === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      const [, route, routeId] = url.pathname.split("/");
      if (route === "watch") id = url.searchParams.get("v");
      else if (["embed", "shorts", "live"].includes(route)) id = routeId;
    }

    return id && VIDEO_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
}
