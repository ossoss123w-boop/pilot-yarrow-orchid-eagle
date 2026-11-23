import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as AnimeTitle, i as Route$2 } from "./router-BKX-4Una.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/novedades-7FkYHxXa.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const items = [...Route$2.useLoaderData().items].sort((a, b) => (a.nextAirAt ?? Number.MAX_SAFE_INTEGER) - (b.nextAirAt ?? Number.MAX_SAFE_INTEGER));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Novedades"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Lo que está en emisión y cuándo llega el siguiente episodio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex flex-col gap-3",
				children: items.map((anime) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/anime/$id",
					params: { id: String(anime.id) },
					className: "flex gap-3 rounded-xl border border-border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: anime.cover,
						alt: "",
						className: "h-20 w-14 rounded-lg object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [anime.nextEpisode ? `Episodio ${anime.nextEpisode}` : "En emisión", anime.nextAirLabel ? ` · ${anime.nextAirLabel}` : ""]
					})] })]
				}) }, anime.id))
			})
		]
	});
}
//#endregion
export { NewsPage as component };
