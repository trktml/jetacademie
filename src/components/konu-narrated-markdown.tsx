"use client";

import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AudioLines, BookOpen, Pause, Play } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import {
  NARRATION_VERSION,
  narrationBodyHash,
  narrationCueAt,
  type NarrationManifest,
} from "@/lib/konu-narration";
import type { KonuVocabItem } from "@/lib/data/konu-curriculum";

const NarrationText = memo(MarkdownContent);

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function NarratedLesson({
  manifest,
  body,
  vocabulary,
}: {
  manifest: NarrationManifest;
  body: string;
  vocabulary: readonly KonuVocabItem[];
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(true);
  const [follow, setFollow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const cueIndex = started ? narrationCueAt(manifest.cues, time) : -1;

  useEffect(() => {
    if (!playerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setPlayerVisible(entry.isIntersecting), {
      rootMargin: "-64px 0px 0px",
    });
    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (cueIndex < 0) return;
    const paragraph = textRef.current?.querySelector<HTMLElement>(
      `[data-narration-cue="${cueIndex}"]`
    );
    paragraph?.setAttribute("data-narration-active", "");
    if (paragraph && playing && follow) {
      const { top, bottom } = paragraph.getBoundingClientRect();
      if (top < 96 || bottom > window.innerHeight - 100) {
        paragraph.scrollIntoView({
          block: bottom - top > window.innerHeight - 196 ? "start" : "center",
        });
      }
    }
    return () => {
      paragraph?.removeAttribute("data-narration-active");
    };
  }, [cueIndex, follow, playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (failed) audio.load();
      setFailed(false);
      void audio.play().catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setFailed(true);
      });
    } else {
      audio.pause();
    }
  };

  const playButton = (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-700 px-3 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
    >
      {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
      {playing ? "Duraklat" : started ? "Devam et" : "Dinle"}
    </button>
  );

  return (
    <>
      <div
        ref={playerRef}
        role="group"
        aria-label="Konu seslendirmesi"
        className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 p-2.5 dark:border-teal-900 dark:bg-teal-950/50"
      >
        <audio
          ref={audioRef}
          src={manifest.audioUrl}
          preload="none"
          onLoadedMetadata={(event) =>
            setDuration(
              Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0
            )
          }
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onSeeked={(event) => setTime(event.currentTarget.currentTime)}
          onPlay={() => {
            setStarted(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setStarted(false);
          }}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
        {playButton}
        <input
          type="range"
          aria-label="Ses kaydında ilerle"
          aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(time, duration)}
          disabled={!duration}
          onChange={(event) => {
            if (audioRef.current) audioRef.current.currentTime = event.currentTarget.valueAsNumber;
            setTime(event.currentTarget.valueAsNumber);
          }}
          className="min-h-[44px] min-w-[44px] flex-1 cursor-pointer accent-teal-700 disabled:cursor-default dark:accent-teal-400"
        />
        <span aria-hidden className="text-xs tabular-nums">
          {formatTime(time)} / {formatTime(duration)}
        </span>
        <button
          type="button"
          onClick={() => setFollow((value) => !value)}
          aria-pressed={follow}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-3 text-xs font-semibold text-teal-900 aria-pressed:bg-teal-200 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100 dark:aria-pressed:bg-teal-800"
        >
          <BookOpen size={16} aria-hidden />
          Paragrafı takip et
        </button>
        {failed && (
          <p role="alert" className="w-full text-sm">
            Ses yüklenemedi. Tekrar deneyebilirsin.
          </p>
        )}
      </div>
      <div ref={textRef}>
        <NarrationText vocabulary={vocabulary} narration>
          {body}
        </NarrationText>
      </div>
      {started &&
        !playerVisible &&
        createPortal(
          <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-[55] flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-teal-200 bg-white p-1.5 pr-3 text-teal-950 shadow-lg dark:border-teal-800 dark:bg-slate-900 dark:text-teal-100">
            {playButton}
            <AudioLines size={16} aria-hidden />
            <span className="text-xs tabular-nums" aria-label="Geçen süre">
              {formatTime(time)}
            </span>
          </div>,
          document.body
        )}
    </>
  );
}

export function KonuNarratedMarkdown({
  entryId,
  body,
  vocabulary,
}: {
  entryId: string;
  body: string;
  vocabulary: readonly KonuVocabItem[];
}) {
  const [narration, setNarration] = useState<{ body: string; manifest: NarrationManifest }>();

  useEffect(() => {
    const request = new AbortController();
    async function load() {
      const url = `/api/curriculum/konu-ses/${encodeURIComponent(entryId)}`;
      const response = await fetch(url, { signal: request.signal });
      if (!response.ok) return;
      const manifest: NarrationManifest = await response.json();
      if (
        manifest.version === NARRATION_VERSION &&
        manifest.bodyHash === (await narrationBodyHash(body)) &&
        !request.signal.aborted
      ) {
        setNarration({ body, manifest });
      }
    }
    void load().catch(() => {}); // Reading still works when audio is unavailable.
    return () => request.abort();
  }, [body, entryId]);

  return narration?.body === body ? (
    <NarratedLesson
      key={narration.manifest.audioUrl}
      manifest={narration.manifest}
      body={body}
      vocabulary={vocabulary}
    />
  ) : (
    <MarkdownContent vocabulary={vocabulary}>{body}</MarkdownContent>
  );
}
