"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

const EMBED_BASE = "https://www.youtube-nocookie.com/embed";
const DESKTOP_QUERY = "(min-width: 768px)";
const REVEAL_DELAY_MS = 1500;
const IFRAME_SCALE = 100;
const IFRAME_OVERSCAN = 1.12;

const IFRAME_STYLE: CSSProperties = {
  position: "absolute",
  width: `${IFRAME_SCALE * IFRAME_OVERSCAN * 100}%`,
  height: `${IFRAME_SCALE * IFRAME_OVERSCAN * 100}%`,
  left: `${((1 - IFRAME_OVERSCAN) / 2) * 100}%`,
  top: `${((1 - IFRAME_OVERSCAN) / 2) * 100}%`,
  transform: `scale(${1 / IFRAME_SCALE})`,
  transformOrigin: "0 0",
  border: 0,
};

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

function getCanLoadVideo() {
  if (!window.matchMedia(DESKTOP_QUERY).matches) return false;
  if ((navigator as NavigatorWithConnection).connection?.saveData) return false;

  return true;
}

function getCanLoadVideoOnServer() {
  return false;
}

function getEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: videoId,
    disablekb: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    fs: "0",
    cc_load_policy: "0",
  });

  return `${EMBED_BASE}/${videoId}?${params.toString()}`;
}

export default function HeroVideo({ videoId }: { videoId: string | null }) {
  const canLoadVideo = useSyncExternalStore(
    subscribeToViewport,
    getCanLoadVideo,
    getCanLoadVideoOnServer,
  );
  const [revealedVideoId, setRevealedVideoId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const overlayHidden = videoId !== null && revealedVideoId === videoId;
  const showIframe = Boolean(videoId) && canLoadVideo;

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-darker">
      {showIframe && videoId ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.77777778vh] min-w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <iframe
            key={videoId}
            src={getEmbedSrc(videoId)}
            title="Video profil SMK Plus Melati"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={() => {
              if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
              }

              timerRef.current = window.setTimeout(() => {
                setRevealedVideoId(videoId);
                timerRef.current = null;
              }, REVEAL_DELAY_MS);
            }}
            style={IFRAME_STYLE}
          />
        </div>
      ) : null}
      {showIframe && videoId ? (
        <div
          className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-700 motion-reduce:transition-none ${
            overlayHidden ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : null}
    </div>
  );
}
