import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as clock, s as formatLabel, u as scoreLabel } from "./format-DrhHf9PQ.mjs";
import { c as AnimeTitle, l as browseDefaults } from "./router-BKX-4Una.mjs";
import { n as useLibraryReady, t as useLibrary } from "./library-O9WChF0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lista-C9BZ2v1Y.js
var import_jsx_runtime = require_jsx_runtime();
function ListPage() {
	const ready = useLibraryReady();
	const favorites = useLibrary((state) => state.favorites);
	const history = useLibrary((state) => state.history);
	const toggleFav = useLibrary((state) => state.toggleFav);
	const removeHistory = useLibrary((state) => state.removeHistory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Mi lista"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Favoritos e historial guardados en este dispositivo."
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "Cargando tu lista…"
			}) : null,
			ready && favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-muted",
				children: [
					"Todavía no guardaste títulos.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/buscar",
						search: { ...browseDefaults },
						className: "text-primary",
						children: "Explora el catálogo"
					})
				]
			}) : null,
			ready && favorites.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
				children: favorites.map((fav) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/anime/$id",
						params: { id: String(fav.id) },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: fav.cover,
								alt: "",
								className: "aspect-2/3 w-full rounded-lg object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime: fav })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [formatLabel(fav.format), scoreLabel(fav.score) ? ` · ${scoreLabel(fav.score)}` : ""]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleFav(fav),
						className: "mt-2 h-11 text-sm text-muted",
						children: "Quitar"
					})]
				}, fav.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "actividad",
				className: "mt-12 font-display text-xl font-semibold text-primary",
				children: "Actividad"
			}),
			ready && history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Cuando reproduzcas algo, queda aquí."
			}) : null,
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-3",
				children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-xl border border-border bg-surface p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/watch/$id",
						params: { id: String(item.id) },
						search: { ep: item.episode },
						className: "flex min-w-0 flex-1 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.cover,
							alt: "",
							className: "h-16 w-12 rounded-lg object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime: item })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									"Episodio ",
									item.episode,
									item.seconds > 0 ? ` · ${clock(item.seconds)}` : ""
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => removeHistory(item.id),
						className: "h-11 px-3 text-sm text-muted",
						children: "Quitar"
					})]
				}, item.id))
			}) : null
		]
	});
}
//#endregion
export { ListPage as component };
