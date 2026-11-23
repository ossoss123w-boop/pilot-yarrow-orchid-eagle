import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as STATUSES, n as GENRES, r as SORTS, t as FORMATS } from "./format-DrhHf9PQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anilist-BQVodYYK.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ENDPOINT = "https://graphql.anilist.co";
var TTL = 3e5;
var cache = /* @__PURE__ */ new Map();
function cleanGenre(value) {
	const genre = (value ?? "").trim();
	if (!genre) return "";
	if (GENRE_SET.has(genre)) return genre;
	if (/^[A-Za-z0-9][A-Za-z0-9 '&-]{0,40}$/.test(genre)) return genre;
	return "";
}
var GENRE_SET = new Set(GENRES.map((item) => item[1]));
var SORT_SET = new Set(SORTS.map((item) => item[1]));
var FORMAT_SET = new Set(FORMATS.map((item) => item[1]).filter(Boolean));
var STATUS_SET = new Set(STATUSES.map((item) => item[1]).filter(Boolean));
var MONTHS = [
	"ene",
	"feb",
	"mar",
	"abr",
	"may",
	"jun",
	"jul",
	"ago",
	"sep",
	"oct",
	"nov",
	"dic"
];
var SEASONS = {
	WINTER: "Invierno",
	SPRING: "Primavera",
	SUMMER: "Verano",
	FALL: "Otoño"
};
var CARD_FIELDS = `
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
function plainText(value) {
	if (!value) return "";
	return value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/"/g, "\"").replace(/&#039;|'/g, "'").replace(/</g, "<").replace(/>/g, ">").replace(/\s*\(Source:.*?\)\s*$/i, "").replace(/\s+/g, " ").trim();
}
function startLabel(date) {
	if (!date?.year) return null;
	if (!date.month) return String(date.year);
	const month = MONTHS[date.month - 1] ?? "";
	if (!date.day) return `${month} ${date.year}`;
	return `${date.day} ${month} ${date.year}`;
}
function airLabel(unix) {
	if (!unix) return null;
	return new Intl.DateTimeFormat("es", {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Madrid"
	}).format(/* @__PURE__ */ new Date(unix * 1e3));
}
function mapMedia(raw) {
	if (!raw?.id || raw.isAdult || raw.type && raw.type !== "ANIME") return null;
	const title = raw.title?.english || raw.title?.romaji || raw.title?.native || "Sin título";
	const seasonLabel = [raw.season ? SEASONS[raw.season] ?? raw.season : null, raw.seasonYear].filter(Boolean).join(" ") || null;
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
		trailer: raw.trailer?.id && raw.trailer.site ? {
			id: raw.trailer.id,
			site: raw.trailer.site
		} : null,
		startLabel: startLabel(raw.startDate ?? null),
		nextEpisode: raw.nextAiringEpisode?.episode ?? null,
		nextAirAt: raw.nextAiringEpisode?.airingAt ?? null,
		nextAirLabel: airLabel(raw.nextAiringEpisode?.airingAt)
	};
}
async function anilist(query, variables) {
	const key = `${query}:${JSON.stringify(variables)}`;
	const hit = cache.get(key);
	if (hit && Date.now() - hit.at < TTL) return hit.data;
	const response = await fetch(ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"User-Agent": "BYMONTA/1.0"
		},
		body: JSON.stringify({
			query,
			variables
		}),
		signal: AbortSignal.timeout(12e3)
	});
	if (!response.ok) throw new Error(`Catálogo no disponible (${response.status})`);
	const payload = await response.json();
	if (!payload.data) throw new Error(payload.errors?.[0]?.message ?? "Sin datos del catálogo");
	cache.set(key, {
		at: Date.now(),
		data: payload.data
	});
	return payload.data;
}
async function fetchPage(vars) {
	const data = await anilist(`query ($page: Int, $perPage: Int, $sort: [MediaSort], $search: String, $genre: String, $format: MediaFormat, $status: MediaStatus) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { hasNextPage }
        media(type: ANIME, isAdult: false, sort: $sort, search: $search, genre: $genre, format: $format, status: $status) {
          ${CARD_FIELDS}
        }
      }
    }`, {
		page: vars.page,
		perPage: vars.perPage,
		sort: vars.sort,
		search: vars.search || null,
		genre: vars.genre || null,
		format: vars.format || null,
		status: vars.status || null
	});
	return {
		items: (data.Page?.media ?? []).map(mapMedia).filter((item) => item != null && item.cover !== ""),
		hasNext: Boolean(data.Page?.pageInfo?.hasNextPage)
	};
}
function emptyHome(message) {
	return {
		ok: false,
		message,
		trending: [],
		airing: [],
		top: [],
		movies: []
	};
}
var loadHome_createServerFn_handler = createServerRpc({
	id: "405d6c2d3df34a830b9fdef7984b80c1c373ad5c3337632b1d6eebaa5eff12ce",
	name: "loadHome",
	filename: "src/lib/anilist.ts"
}, (opts) => loadHome.__executeServer(opts));
var loadHome = createServerFn({ method: "GET" }).handler(loadHome_createServerFn_handler, async () => {
	try {
		const [trending, airing, top, movies] = await Promise.all([
			fetchPage({
				page: 1,
				perPage: 12,
				sort: ["TRENDING_DESC"]
			}),
			fetchPage({
				page: 1,
				perPage: 12,
				sort: ["POPULARITY_DESC"],
				status: "RELEASING"
			}),
			fetchPage({
				page: 1,
				perPage: 12,
				sort: ["SCORE_DESC"]
			}),
			fetchPage({
				page: 1,
				perPage: 12,
				sort: ["TRENDING_DESC"],
				format: "MOVIE"
			})
		]);
		return {
			ok: true,
			message: "",
			trending: trending.items,
			airing: airing.items,
			top: top.items,
			movies: movies.items
		};
	} catch (error) {
		return emptyHome(error instanceof Error ? error.message : "No se pudo cargar el catálogo");
	}
});
var searchQuick_createServerFn_handler = createServerRpc({
	id: "8a79fe651008b23b7825458f09e2f872d08d9b54afedf8f4d2cbf1300a1eb491",
	name: "searchQuick",
	filename: "src/lib/anilist.ts"
}, (opts) => searchQuick.__executeServer(opts));
var searchQuick = createServerFn({ method: "GET" }).validator((input) => ({ q: (input?.q ?? "").trim().slice(0, 80) })).handler(searchQuick_createServerFn_handler, async ({ data }) => {
	if (data.q.length < 2) return [];
	try {
		return (await fetchPage({
			page: 1,
			perPage: 6,
			sort: ["SEARCH_MATCH"],
			search: data.q
		})).items;
	} catch {
		return [];
	}
});
var browseAnime_createServerFn_handler = createServerRpc({
	id: "fa075082011924359e8373985bb50745992cc51d7c2e908f7d6d5ed493b13ac4",
	name: "browseAnime",
	filename: "src/lib/anilist.ts"
}, (opts) => browseAnime.__executeServer(opts));
var browseAnime = createServerFn({ method: "GET" }).validator((input) => {
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
		page: Number.isFinite(page) && page > 0 ? Math.min(20, Math.floor(page)) : 1
	};
}).handler(browseAnime_createServerFn_handler, async ({ data }) => {
	const page = await fetchPage({
		page: data.page,
		perPage: 18,
		sort: [data.orden],
		search: data.q || null,
		genre: data.genero || null,
		format: data.formato || null,
		status: data.estado || null
	});
	return {
		items: page.items,
		page: data.page,
		hasNext: page.hasNext
	};
});
var randomAnime_createServerFn_handler = createServerRpc({
	id: "923736b2c9ec57af5b3ddfb29d4f566bd19045f5089ab1897d393a0047039eaf",
	name: "randomAnime",
	filename: "src/lib/anilist.ts"
}, (opts) => randomAnime.__executeServer(opts));
var randomAnime = createServerFn({ method: "GET" }).handler(randomAnime_createServerFn_handler, async () => {
	const result = await fetchPage({
		page: 1 + Math.floor(Math.random() * 5),
		perPage: 20,
		sort: ["TRENDING_DESC"]
	});
	if (result.items.length === 0) return null;
	return result.items[Math.floor(Math.random() * result.items.length)]?.id ?? null;
});
var getAnime_createServerFn_handler = createServerRpc({
	id: "032ab072cff817ebad08048595e2a2fa632781604eedc58b5cc2d8a68d4cda44",
	name: "getAnime",
	filename: "src/lib/anilist.ts"
}, (opts) => getAnime.__executeServer(opts));
var getAnime = createServerFn({ method: "GET" }).validator((input) => {
	const id = Number(input?.id);
	return { id: Number.isInteger(id) ? id : 0 };
}).handler(getAnime_createServerFn_handler, async ({ data }) => {
	if (data.id <= 0) return null;
	try {
		const payload = await anilist(`query ($id: Int) {
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
        }`, { id: data.id });
		const anime = mapMedia(payload.Media);
		if (!anime || !payload.Media) return null;
		const characters = (payload.Media.characters?.edges ?? []).flatMap((edge) => {
			const node = edge?.node;
			if (!node?.id || !node.name?.full) return [];
			return [{
				id: node.id,
				name: node.name.full,
				image: node.image?.medium ?? null,
				role: edge.role ?? ""
			}];
		});
		const related = (payload.Media.recommendations?.nodes ?? []).map((node) => mapMedia(node?.mediaRecommendation)).filter((item) => item != null && item.cover !== "" && item.id !== anime.id).slice(0, 12);
		return {
			...anime,
			characters,
			related
		};
	} catch {
		return null;
	}
});
//#endregion
export { browseAnime_createServerFn_handler, getAnime_createServerFn_handler, loadHome_createServerFn_handler, randomAnime_createServerFn_handler, searchQuick_createServerFn_handler };
