import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as genreLabel, d as statusLabel, s as formatLabel } from "./format-DrhHf9PQ.mjs";
import { a as Route$4 } from "./router-BKX-4Una.mjs";
import { t as PosterCard } from "./poster-card-BVAr1EM9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-BByR8bhv.js
var import_jsx_runtime = require_jsx_runtime();
function BrowsePage() {
	const search = Route$4.useSearch();
	const data = Route$4.useLoaderData();
	const navigate = Route$4.useNavigate();
	const chips = [
		search.q ? `“${search.q}”` : null,
		search.genero ? genreLabel(search.genero) : null,
		search.formato ? formatLabel(search.formato) : null,
		search.estado ? statusLabel(search.estado) : null
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: chips.length > 0 ? chips.join(" · ") : "Tendencias de ahora"
			}),
			data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "Nada coincide con esa búsqueda."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
				children: data.items.map((anime) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					anime,
					fluid: true
				}, anime.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex gap-3",
				children: [search.page > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full bg-elevated px-5 text-sm font-semibold",
					onClick: () => void navigate({ search: {
						...search,
						page: search.page - 1
					} }),
					children: "Anterior"
				}) : null, data.hasNext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg",
					onClick: () => void navigate({ search: {
						...search,
						page: search.page + 1
					} }),
					children: "Siguiente"
				}) : null]
			})
		]
	});
}
//#endregion
export { BrowsePage as component };
