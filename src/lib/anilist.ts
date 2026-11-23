import { createServerFn } from "@tanstack/react-start";
import { FORMATS, GENRES, SORTS, STATUSES } from "@/lib/format";
import type { Anime, AnimeDetail, BrowseQuery, BrowseResult, CharacterCard, HomeData } from "@/lib/types";

const ENDPOINT = "https://graphql.anilist.co";
const TTL = 5 * 60 * 1000;

const cache = new Map<string, { at: number; data: unknown }>();

function cleanGenre(value: string | undefined): string {
  const genre = (value ?? "").trim();
  if (!genre) return "";
  if (GENRE_SET.has(genre)) return genre;
  if (/^[A-Za-z0-9][A-Za-z0-9 '&-]{0,40}$/.test(genre)) return genre;
  return "";
}

const GENRE_SET = new Set<string>(GENRES.map((item) => item[1]));
const SORT_SET = new Set<string>(SORTS.map((item) => item[1]));
const FORMAT_SET = new Set<string>(FORMATS.map((item) => item[1]).filter(Boolean));
const STATUS_SET = new Set<string>(STATUSES.map((item) => item[1]).filter(Boolean));

type RawDate = { year?: number | null; month?: number | null; day?: number | null } | null;

type RawMedia = {
  id?: number | null;
  type?: string | null;
  isAdult?: boolean | null;
  title?: { romaji?: string | null; english?: string | null; native?: string | null } | null;
  coverImage?: { extraLarge?: string | null; large?: string | null; color?: string | null } | null;
  bannerImage?: string | null;
  description?: string | null;
  averageScore?: number | null;
  episodes?: number | null;
  duration?: number | null;
  format?: string | null;
  status?: string | null;
  season?: string | null;
  seasonYear?: number | null;
  genres?: string[] | null;
  studios?: { nodes?: { name?: string | null }[] | null } | null;
  trailer?: { id?: string | null; site?: string | null } | null;
  startDate?: RawDate;
  nextAiringEpisode?: { episode?: number | null; airingAt?: number | null } | null;
  characters?: {
    edges?: {
      role?: string | null;
      node?: { id?: number | null; name?: { full?: string | null } | null; image?: { medium?: string | null } | null } | null;
    }[] | null;
  } | null;
  recommendations?: {
    nodes?: { mediaRecommendation?: RawMedia | null }[] | null;
  } | null;
};

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const SEASONS: Record<string, string> = {
  WINTER: "Invierno",
  SPRING: "Primavera",
  SUMMER: "Verano",
  FALL: "Otoño",
};

const CARD_FIELDS = `
  id
  type
  isAdult
  title { romaji english native }
  coverImage { extraLarge large color }
  bannerImage
  description(asHtml: false)
  averageScore
  episodes
  duration
  format
  status
  season
  seasonYear
  genres
  studios(isMain: true) { nodes { name } }
  trailer { id site }
  startDate { year month day }
  nextAiringEpisode { episode airingAt }
`;

function plainText(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#039;|'/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/\s*\(Source:.*?\)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function startLabel(date: RawDate): string | null {
  if (!date?.year) return null;
  if (!date.month) return String(date.year);
  const month = MONTHS[date.month - 1] ?? "";
  if (!date.day) return `${month} ${date.year}`;
  return `${date.day} ${month} ${date.year}`;
}

function airLabel(unix: number | null | undefined): string | null {
  if (!unix) return null;
  return new Intl.DateTimeFormat("es", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(unix * 1000));
}

function mapMedia(raw: RawMedia | null | undefined): Anime | null {
  if (!raw?.id || raw.isAdult || (raw.type && raw.type !== "ANIME")) return null;
  const title = raw.title?.english || raw.title?.romaji || raw.title?.native || "Sin título";
  const seasonName = raw.season ? (SEASONS[raw.season] ?? raw.season) : null;
  const seasonLabel = [seasonName, raw.seasonYear].filter(Boolean).join(" ") || null;
  return {
    id: raw.id,
    title,
    nativeTitle: raw.title?.native ?? null,
    cover: raw.coverImage?.extraLarge || raw.coverImage?.large || "",
    banner: raw.bannerImage ?? null,
    color: raw.coverImage?.color ?? null,
    score: raw.averageScore ?? null,
    episodes: raw.episodes ?? null,
    duration: raw.duration ?? null,
    format: raw.format ?? "TV",
    status: raw.status ?? "",
    seasonLabel,
    year: raw.seasonYear ?? raw.startDate?.year ?? null,
    genres: raw.genres ?? [],
    studio: raw.studios?.nodes?.find((node) => node?.name)?.name ?? null,
    description: plainText(raw.description),
    trailer: raw.trailer?.id && raw.trailer.site ? { id: raw.trailer.id, site: raw.trailer.site } : null,
    startLabel: startLabel(raw.startDate ?? null),
    nextEpisode: raw.nextAiringEpisode?.episode ?? null,
    nextAirAt: raw.nextAiringEpisode?.airingAt ?? null,
    nextAirLabel: airLabel(raw.nextAiringEpisode?.airingAt),
  };
}

async function anilist<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const key = `${query}:${JSON.stringify(variables)}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data as T;
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "BYMONTA/1.0",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Catálogo no disponible (${response.status})`);
  const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (!payload.data) throw new Error(payload.errors?.[0]?.message ?? "Sin datos del catálogo");
  cache.set(key, { at: Date.now(), data: payload.data });
  return payload.data;
}

type PageVars = {
  page: number;
  perPage: number;
  sort: string[];
  search?: string | null;
  genre?: string | null;
  format?: string | null;
  status?: string | null;
};

async function fetchPage(vars: PageVars): Promise<{ items: Anime[]; hasNext: boolean }> {
  const defs = ["$page: Int", "$perPage: Int", "$sort: [MediaSort]"];
  const args = ["type: ANIME", "isAdult: false", "sort: $sort"];
  const variables: Record<string, unknown> = {
    page: vars.page,
    perPage: vars.perPage,
    sort: vars.sort,
  };
  if (vars.search) {
    defs.push("$search: String");
    args.push("search: $search");
    variables.search = vars.search;
  }
  if (vars.genre) {
    defs.push("$genre: String");
    args.push("genre: $genre");
    variables.genre = vars.genre;
  }
  if (vars.format) {
    defs.push("$format: MediaFormat");
    args.push("format: $format");
    variables.format = vars.format;
  }
  if (vars.status) {
    defs.push("$status: MediaStatus");
    args.push("status: $status");
    variables.status = vars.status;
  }
  const data = await anilist<{
    Page?: { pageInfo?: { hasNextPage?: boolean }; media?: RawMedia[] };
  }>(
    `query (${defs.join(", ")}) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { hasNextPage }
        media(${args.join(", ")}) {
          ${CARD_FIELDS}
        }
      }
    }`,
    variables,
  );
  const items = (data.Page?.media ?? []).map(mapMedia).filter((item): item is Anime => item != null && item.cover !== "");
  return { items, hasNext: Boolean(data.Page?.pageInfo?.hasNextPage) };
}

function emptyHome(message: string): HomeData {
  return { ok: false, message, trending: [], airing: [], top: [], movies: [] };
}

export const loadHome = createServerFn({ method: "GET" }).handler(async (): Promise<HomeData> => {
  try {
    const [trending, airing, top, movies] = await Promise.all([
      fetchPage({ page: 1, perPage: 12, sort: ["TRENDING_DESC"] }),
      fetchPage({ page: 1, perPage: 12, sort: ["POPULARITY_DESC"], status: "RELEASING" }),
      fetchPage({ page: 1, perPage: 12, sort: ["SCORE_DESC"] }),
      fetchPage({ page: 1, perPage: 12, sort: ["TRENDING_DESC"], format: "MOVIE" }),
    ]);
    return { ok: true, message: "", trending: trending.items, airing: airing.items, top: top.items, movies: movies.items };
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo cargar el catálogo";
    return emptyHome(message);
  }
});

export const searchQuick = createServerFn({ method: "GET" })
  .validator((input: { q: string }) => ({ q: (input?.q ?? "").trim().slice(0, 80) }))
  .handler(async ({ data }): Promise<Anime[]> => {
    if (data.q.length < 2) return [];
    try {
      const page = await fetchPage({ page: 1, perPage: 6, sort: ["SEARCH_MATCH"], search: data.q });
      return page.items;
    } catch {
      return [];
    }
  });

export const browseAnime = createServerFn({ method: "GET" })
  .validator((input: BrowseQuery): BrowseQuery => {
    const page = Number(input?.page);
    const orden = SORT_SET.has(input?.orden) ? input.orden : "TRENDING_DESC";
    const formato = FORMAT_SET.has(input?.formato) ? input.formato : "";
    const estado = STATUS_SET.has(input?.estado) ? input.estado : "";
    const genero = cleanGenre(input?.genero);
    return {
      q: (input?.q ?? "").trim().slice(0, 80),
      genero,
      formato,
      orden: input?.q ? "SEARCH_MATCH" : orden,
      estado,
      page: Number.isFinite(page) && page > 0 ? Math.min(20, Math.floor(page)) : 1,
    };
  })
  .handler(async ({ data }): Promise<BrowseResult> => {
    const page = await fetchPage({
      page: data.page,
      perPage: 18,
      sort: [data.orden],
      search: data.q || null,
      genre: data.genero || null,
      format: data.formato || null,
      status: data.estado || null,
    });
    return { items: page.items, page: data.page, hasNext: page.hasNext };
  });

export const randomAnime = createServerFn({ method: "GET" }).handler(async (): Promise<number | null> => {
  const page = 1 + Math.floor(Math.random() * 5);
  const result = await fetchPage({ page, perPage: 20, sort: ["TRENDING_DESC"] });
  if (result.items.length === 0) return null;
  return result.items[Math.floor(Math.random() * result.items.length)]?.id ?? null;
});

export const getAnime = createServerFn({ method: "GET" })
  .validator((input: { id: number }) => {
    const id = Number(input?.id);
    return { id: Number.isInteger(id) ? id : 0 };
  })
  .handler(async ({ data }): Promise<AnimeDetail | null> => {
    if (data.id <= 0) return null;
    try {
      const payload = await anilist<{ Media?: RawMedia | null }>(
        `query ($id: Int) {
          Media(id: $id, type: ANIME, isAdult: false) {
            ${CARD_FIELDS}
            characters(perPage: 8, sort: [ROLE]) {
              edges { role node { id name { full } image { medium } } }
            }
            recommendations(perPage: 10, sort: RATING_DESC) {
              nodes {
                mediaRecommendation {
                  ${CARD_FIELDS}
                }
              }
            }
          }
        }`,
        { id: data.id },
      );
      const anime = mapMedia(payload.Media);
      if (!anime || !payload.Media) return null;
      const characters: CharacterCard[] = (payload.Media.characters?.edges ?? []).flatMap((edge) => {
        const node = edge?.node;
        if (!node?.id || !node.name?.full) return [];
        return [{ id: node.id, name: node.name.full, image: node.image?.medium ?? null, role: edge.role ?? "" }];
      });
      const related = (payload.Media.recommendations?.nodes ?? [])
        .map((node) => mapMedia(node?.mediaRecommendation))
        .filter((item): item is Anime => item != null && item.cover !== "" && item.id !== anime.id)
        .slice(0, 12);
      return { ...anime, characters, related };
    } catch {
      return null;
    }
  });
