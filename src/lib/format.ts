import type { Anime } from "@/lib/types";

export const GENRES = [
  ["Acción", "Action"],
  ["Aventura", "Adventure"],
  ["Comedia", "Comedy"],
  ["Drama", "Drama"],
  ["Fantasía", "Fantasy"],
  ["Terror", "Horror"],
  ["Misterio", "Mystery"],
  ["Romance", "Romance"],
  ["Ciencia ficción", "Sci-Fi"],
  ["Cotidiano", "Slice of Life"],
  ["Deportes", "Sports"],
  ["Sobrenatural", "Supernatural"],
] as const;

export const SORTS = [
  ["Tendencias", "TRENDING_DESC"],
  ["Popularidad", "POPULARITY_DESC"],
  ["Puntuación", "SCORE_DESC"],
  ["Estreno", "START_DATE_DESC"],
] as const;

export const FORMATS = [
  ["Todos", ""],
  ["Serie", "TV"],
  ["Película", "MOVIE"],
  ["OVA", "OVA"],
  ["ONA", "ONA"],
  ["Especial", "SPECIAL"],
] as const;

export const STATUSES = [
  ["Cualquier estado", ""],
  ["En emisión", "RELEASING"],
  ["Finalizado", "FINISHED"],
  ["Próximamente", "NOT_YET_RELEASED"],
] as const;

const FORMAT_LABEL: Record<string, string> = {
  TV: "Serie",
  TV_SHORT: "Corto",
  MOVIE: "Película",
  SPECIAL: "Especial",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Música",
};

const STATUS_LABEL: Record<string, string> = {
  FINISHED: "Finalizado",
  RELEASING: "En emisión",
  NOT_YET_RELEASED: "Próximamente",
  CANCELLED: "Cancelado",
  HIATUS: "En pausa",
};

const ROLE_LABEL: Record<string, string> = {
  MAIN: "Principal",
  SUPPORTING: "Secundario",
  BACKGROUND: "Extra",
};

export function formatLabel(format: string): string {
  return FORMAT_LABEL[format] ?? format;
}

export function statusLabel(status: string): string {
  return STATUS_LABEL[status] ?? status;
}

export function genreLabel(genre: string): string {
  return GENRES.find((item) => item[1] === genre)?.[0] ?? genre;
}

export function roleLabel(role: string): string {
  return ROLE_LABEL[role] ?? role;
}

export function scoreLabel(score: number | null): string | null {
  if (score == null) return null;
  return (score / 10).toFixed(1);
}

export function displayTitle(anime: Pick<Anime, "title" | "nativeTitle">, mode: "en" | "jp"): string {
  if (mode === "jp" && anime.nativeTitle) return anime.nativeTitle;
  return anime.title;
}

export function clock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
