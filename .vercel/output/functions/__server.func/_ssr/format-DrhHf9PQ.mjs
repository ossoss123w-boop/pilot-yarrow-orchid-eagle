//#region node_modules/.nitro/vite/services/ssr/assets/format-DrhHf9PQ.js
var GENRES = [
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
	["Sobrenatural", "Supernatural"]
];
var SORTS = [
	["Tendencias", "TRENDING_DESC"],
	["Popularidad", "POPULARITY_DESC"],
	["Puntuación", "SCORE_DESC"],
	["Estreno", "START_DATE_DESC"]
];
var FORMATS = [
	["Todos", ""],
	["Serie", "TV"],
	["Película", "MOVIE"],
	["OVA", "OVA"],
	["ONA", "ONA"],
	["Especial", "SPECIAL"]
];
var STATUSES = [
	["Cualquier estado", ""],
	["En emisión", "RELEASING"],
	["Finalizado", "FINISHED"],
	["Próximamente", "NOT_YET_RELEASED"]
];
var FORMAT_LABEL = {
	TV: "Serie",
	TV_SHORT: "Corto",
	MOVIE: "Película",
	SPECIAL: "Especial",
	OVA: "OVA",
	ONA: "ONA",
	MUSIC: "Música"
};
var STATUS_LABEL = {
	FINISHED: "Finalizado",
	RELEASING: "En emisión",
	NOT_YET_RELEASED: "Próximamente",
	CANCELLED: "Cancelado",
	HIATUS: "En pausa"
};
var ROLE_LABEL = {
	MAIN: "Principal",
	SUPPORTING: "Secundario",
	BACKGROUND: "Extra"
};
function formatLabel(format) {
	return FORMAT_LABEL[format] ?? format;
}
function statusLabel(status) {
	return STATUS_LABEL[status] ?? status;
}
function genreLabel(genre) {
	return GENRES.find((item) => item[1] === genre)?.[0] ?? genre;
}
function roleLabel(role) {
	return ROLE_LABEL[role] ?? role;
}
function scoreLabel(score) {
	if (score == null) return null;
	return (score / 10).toFixed(1);
}
function displayTitle(anime, mode) {
	if (mode === "jp" && anime.nativeTitle) return anime.nativeTitle;
	return anime.title;
}
function clock(seconds) {
	const safe = Math.max(0, Math.floor(seconds));
	const h = Math.floor(safe / 3600);
	const m = Math.floor(safe % 3600 / 60);
	const s = safe % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	return `${m}:${String(s).padStart(2, "0")}`;
}
//#endregion
export { clock as a, genreLabel as c, statusLabel as d, STATUSES as i, roleLabel as l, GENRES as n, displayTitle as o, SORTS as r, formatLabel as s, FORMATS as t, scoreLabel as u };
