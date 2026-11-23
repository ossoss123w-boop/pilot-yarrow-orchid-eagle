import { Captions, Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLibrary, type HistoryEntry } from "@/lib/library";
import type { PlaySource } from "@/lib/playback";
import { clock } from "@/lib/format";
import { parseSubs, type Cue } from "@/lib/subs";
import { cn } from "@/lib/cn";

type Level = { index: number; label: string };

export function Player({
  entry,
  sources,
}: {
  entry: HistoryEntry;
  sources: PlaySource[];
}) {
  const touch = useLibrary((state) => state.touch);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<{ destroy: () => void; currentLevel: number } | null>(null);
  const [sourceId, setSourceId] = useState(sources[0]?.id ?? "");
  const source = sources.find((item) => item.id === sourceId) ?? sources[0];
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [level, setLevel] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [subId, setSubId] = useState("");
  const [builtin, setBuiltin] = useState<Cue[]>([]);
  const [fileCues, setFileCues] = useState<Cue[]>([]);
  const [fileLabel, setFileLabel] = useState("");
  const [fileRtl, setFileRtl] = useState(false);
  const savedAt = useRef(0);

  useEffect(() => {
    touch({ ...entry, seconds: 0 });
  }, [entry.id, entry.episode, entry.title, entry.cover, touch]);

  const sourceUrl = source?.url ?? "";
  const sourceKind = source?.kind;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceUrl || sourceKind === "iframe" || !sourceKind) return;
    let cancel = false;
    const local: { hls?: { destroy: () => void } } = {};
    setError(null);
    setLevels([]);
    setLevel(-1);
    setPlaying(false);
    setTime(0);

    async function mount(node: HTMLVideoElement, url: string, kind: "hls" | "mp4") {
      if (kind === "mp4" || node.canPlayType("application/vnd.apple.mpegurl")) {
        node.src = url;
        return;
      }
      const { default: Hls } = await import("hls.js");
      if (cancel) return;
      if (!Hls.isSupported()) {
        setError("Este navegador no reproduce HLS. Prueba el MP4.");
        return;
      }
      const hls = new Hls();
      local.hls = hls;
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(node);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (cancel) return;
        setLevels(
          hls.levels.map((item, index) => ({
            index,
            label: item.height ? `${item.height}p` : `Nivel ${index + 1}`,
          })),
        );
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!cancel && data.fatal) setError("No se pudo reproducir esta fuente.");
      });
    }

    void mount(video, sourceUrl, sourceKind);
    return () => {
      cancel = true;
      local.hls?.destroy();
      hlsRef.current = null;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [sourceUrl, sourceKind]);

  useEffect(() => {
    if (subId !== "es" && subId !== "ar") return;
    let cancel = false;
    const url = subId === "es" ? "/subs/demo-es.vtt" : "/subs/demo-ar.vtt";
    void fetch(url)
      .then((response) => response.text())
      .then((text) => {
        if (!cancel) setBuiltin(parseSubs(text));
      })
      .catch(() => {
        if (!cancel) setBuiltin([]);
      });
    return () => {
      cancel = true;
    };
  }, [subId]);

  function remember(seconds: number, force = false) {
    if (!force && seconds > 0 && seconds - savedAt.current < 5) return;
    savedAt.current = seconds;
    touch({ ...entry, seconds, at: Date.now() });
  }

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function fullscreen() {
    const node = stageRef.current;
    if (!node) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void node.requestFullscreen();
  }

  const cues = subId === "file" ? fileCues : subId === "es" || subId === "ar" ? builtin : [];
  const active = cues.filter((cue) => time >= cue.start && time < cue.end);
  const rtl = subId === "ar" || (subId === "file" && fileRtl);
  const direct = source && source.kind !== "iframe";

  async function loadSampleSrt() {
    const response = await fetch("/subs/demo-es.srt");
    const text = await response.text();
    const parsed = parseSubs(text);
    setFileCues(parsed);
    setFileLabel("demo-es.srt");
    setSubId("file");
    setError(parsed.length ? null : "No leí subtítulos en el SRT de ejemplo.");
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseSubs(String(reader.result ?? ""));
      setFileCues(parsed);
      setFileLabel(file.name);
      setSubId(parsed.length ? "file" : "");
      setError(parsed.length ? null : "Ese archivo no tiene subtítulos VTT o SRT.");
    };
    reader.readAsText(file);
  }

  if (!source) return null;

  return (
    <div>
      <div ref={stageRef} className="group relative aspect-video overflow-hidden rounded-xl bg-surface">
        {source.kind === "iframe" ? (
          <iframe
            title={`Tráiler de ${entry.title}`}
            src={source.url}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              poster={entry.cover}
              className="h-full w-full bg-bg object-contain"
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => {
                setPlaying(false);
                if (videoRef.current) remember(videoRef.current.currentTime, true);
              }}
              onTimeUpdate={() => {
                const node = videoRef.current;
                if (!node) return;
                setTime(node.currentTime);
                remember(node.currentTime);
              }}
              onDurationChange={() => setDuration(videoRef.current?.duration || 0)}
              onClick={toggle}
            />
            {active.length > 0 ? (
              <div className="pointer-events-none absolute inset-x-4 bottom-16 z-10 flex justify-center">
                <p
                  dir={rtl ? "rtl" : "ltr"}
                  lang={subId === "ar" ? "ar" : "es"}
                  className={cn(
                    "max-w-3xl rounded-lg bg-bg/80 px-3 py-1.5 text-center text-base leading-snug whitespace-pre-line text-fg",
                    rtl && "font-arabic text-right",
                  )}
                >
                  {active.map((cue) => cue.text).join("\n")}
                </p>
              </div>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-bg/90 to-transparent p-3">
              <input
                aria-label="Posición"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(time, duration || 0)}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (videoRef.current) videoRef.current.currentTime = next;
                  setTime(next);
                }}
                className="h-2 w-full accent-primary"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" aria-label={playing ? "Pausar" : "Reproducir"} onClick={toggle} className="flex size-11 items-center justify-center text-fg">
                  {playing ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
                </button>
                <span className="text-xs text-muted">
                  {clock(time)} / {clock(duration)}
                </span>
                <button
                  type="button"
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  onClick={() => {
                    const node = videoRef.current;
                    if (!node) return;
                    node.muted = !node.muted;
                    setMuted(node.muted);
                  }}
                  className="flex size-11 items-center justify-center text-fg"
                >
                  {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                </button>
                <label className="ml-auto flex items-center gap-2 text-xs text-muted">
                  Calidad
                  <select
                    aria-label="Calidad"
                    value={level}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setLevel(next);
                      if (hlsRef.current) hlsRef.current.currentLevel = next;
                    }}
                    className="h-9 rounded-lg border border-border bg-elevated px-2 text-fg"
                  >
                    <option value={-1}>{levels.length ? "Auto" : "Original"}</option>
                    {levels.map((item) => (
                      <option key={item.index} value={item.index}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" aria-label="Pantalla completa" onClick={fullscreen} className="flex size-11 items-center justify-center text-fg">
                  <Maximize className="size-5" />
                </button>
              </div>
            </div>
          </>
        )}
        {source.demo ? (
          <p className="absolute top-3 left-3 z-10 rounded-full bg-bg/80 px-3 py-1 text-xs text-fg">
            Vídeo de prueba, no es el episodio
          </p>
        ) : null}
        {error ? (
          <p className="absolute inset-x-4 top-12 z-10 rounded-lg bg-bg/90 px-3 py-2 text-sm text-fg">{error}</p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm text-muted">Servidor</p>
          <div className="flex flex-wrap gap-2">
            {sources.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSourceId(item.id)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm font-semibold",
                  item.id === source.id ? "bg-primary text-primary-fg" : "bg-elevated text-fg",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={cn("flex flex-col gap-3 rounded-xl border border-border bg-surface p-4", !direct && "opacity-80")}>
          <p className="flex items-center gap-2 text-sm font-medium text-fg">
            <Captions className="size-4" />
            Subtítulos
          </p>
          {!direct ? <p className="text-sm text-muted">Los subtítulos se aplican a las fuentes HLS y MP4, no al tráiler.</p> : null}
          <div className="flex flex-wrap gap-2">
            {[
              ["", "Sin subtítulos"],
              ["es", "Español"],
              ["ar", "العربية"],
              ...(fileLabel ? [["file", fileLabel] as const] : []),
            ].map(([id, label]) => (
              <button
                key={id || "off"}
                type="button"
                disabled={!direct && id !== ""}
                onClick={() => setSubId(id)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm",
                  subId === id ? "bg-primary text-primary-fg" : "bg-elevated text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex h-11 cursor-pointer items-center rounded-full bg-elevated px-4 text-sm text-fg">
              Cargar .vtt / .srt
              <input
                type="file"
                accept=".vtt,.srt,text/vtt"
                className="sr-only"
                onChange={(event) => onFile(event.target.files?.[0])}
              />
            </label>
            <button type="button" onClick={() => void loadSampleSrt()} className="h-11 rounded-full bg-elevated px-4 text-sm text-fg">
              Probar .srt
            </button>
            <label className="inline-flex h-11 items-center gap-2 text-sm text-muted">
              <input type="checkbox" checked={fileRtl} onChange={(event) => setFileRtl(event.target.checked)} />
              RTL en archivo
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
