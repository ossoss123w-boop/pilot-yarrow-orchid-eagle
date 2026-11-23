export type PlaySource = {
  id: string;
  label: string;
  kind: "hls" | "mp4" | "iframe";
  url: string;
  demo: boolean;
};

/**
 * Playback endpoints configured by the app.
 * Trailer embeds come from the public catalog. HLS and MP4 entries are
 * open demo streams so quality switching and subtitles can be tried
 * without hosting copyrighted episodes.
 */
export function sourcesFor(trailer: { id: string; site: string } | null): PlaySource[] {
  const sources: PlaySource[] = [];
  if (trailer && trailer.site.toLowerCase() === "youtube" && /^[\w-]{6,20}$/.test(trailer.id)) {
    sources.push({
      id: "trailer",
      label: "Tráiler",
      kind: "iframe",
      url: `https://www.youtube-nocookie.com/embed/${trailer.id}?rel=0&modestbranding=1`,
      demo: false,
    });
  }
  sources.push(
    {
      id: "hls",
      label: "HLS de prueba",
      kind: "hls",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
      demo: true,
    },
    {
      id: "mp4",
      label: "MP4 de prueba",
      kind: "mp4",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      demo: true,
    },
  );
  return sources;
}
