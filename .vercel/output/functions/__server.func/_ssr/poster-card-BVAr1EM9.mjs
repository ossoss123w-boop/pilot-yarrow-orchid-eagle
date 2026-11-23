import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as formatLabel, u as scoreLabel } from "./format-DrhHf9PQ.mjs";
import { c as AnimeTitle, s as cn } from "./router-BKX-4Una.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poster-card-BVAr1EM9.js
var import_jsx_runtime = require_jsx_runtime();
function PosterCard({ anime, rank, fluid = false }) {
	const score = scoreLabel(anime.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/anime/$id",
		params: { id: String(anime.id) },
		className: cn("group block", fluid ? "w-full" : "w-32 shrink-0 sm:w-40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-2/3 overflow-hidden rounded-xl bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: anime.cover,
					alt: "",
					loading: "lazy",
					decoding: "async",
					className: "h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" }),
				rank != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-bg/85 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "spine absolute top-3 bottom-14 left-1.5 max-h-48 text-xs font-medium text-fg [text-shadow:0_1px_2px_rgb(0_0_0/0.85)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-1 left-2 font-display text-3xl font-semibold text-fg [text-shadow:0_2px_8px_rgb(0_0_0/0.8)]",
						children: String(rank).padStart(2, "0")
					})
				] }) : null,
				score ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-2 right-2 rounded-md bg-bg/80 px-1.5 py-0.5 text-xs font-medium text-info",
					children: score
				}) : null
			]
		}), rank == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm font-medium text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: formatLabel(anime.format)
			})]
		}) : null]
	});
}
//#endregion
export { PosterCard as t };
