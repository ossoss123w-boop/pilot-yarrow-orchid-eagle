export type Cue = { start: number; end: number; text: string };

function timestamp(value: string): number {
  const clean = value.trim().replace(",", ".");
  const parts = clean.split(":");
  if (parts.length === 3) {
    return Number(parts[0]) * 3600 + Number(parts[1]) * 60 + Number(parts[2]);
  }
  if (parts.length === 2) return Number(parts[0]) * 60 + Number(parts[1]);
  return Number(clean) || 0;
}

export function parseSubs(raw: string): Cue[] {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r/g, "").trim();
  if (!text) return [];
  const cues: Cue[] = [];
  for (const block of text.split(/\n\s*\n/)) {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("WEBVTT") && !line.startsWith("NOTE") && !line.startsWith("STYLE"));
    const timeIndex = lines.findIndex((line) => line.includes("-->"));
    if (timeIndex < 0) continue;
    const [startRaw, endRaw = ""] = lines[timeIndex].split("-->");
    const start = timestamp(startRaw ?? "");
    const end = timestamp((endRaw ?? "").trim().split(/\s+/)[0] ?? "");
    const body = lines
      .slice(timeIndex + 1)
      .join("\n")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!body || !Number.isFinite(start) || !Number.isFinite(end)) continue;
    cues.push({ start, end, text: body });
  }
  return cues;
}
