import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as genreLabel, d as statusLabel, l as roleLabel, s as formatLabel, u as scoreLabel } from "./format-DrhHf9PQ.mjs";
import { c as Play } from "../_libs/lucide-react.mjs";
import { c as AnimeTitle, l as browseDefaults, r as Route$1 } from "./router-BKX-4Una.mjs";
import { t as Button } from "./button-DcRVNS9l.mjs";
import { t as FavButton } from "./fav-button-DB5pj1Eh.mjs";
import { t as MediaRow } from "./media-row-NNNCcr9B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anime._id-BxBoSCwM.js
var import_jsx_runtime = require_jsx_runtime();
function AnimePage() {
	const anime = Route$1.useLoaderData();
	if (!anime) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "No encontramos este título"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-6 inline-flex h-11 items-center text-primary",
			children: "Volver al inicio"
		})]
	});
	const score = scoreLabel(anime.score);
	const facts = [
		["Formato", formatLabel(anime.format)],
		["Estado", statusLabel(anime.status)],
		["Episodios", anime.episodes ? String(anime.episodes) : "Por anunciar"],
		["Duración", anime.duration ? `${anime.duration} min` : "Por anunciar"],
		["Temporada", anime.seasonLabel ?? "Por anunciar"],
		["Estudio", anime.studio ?? "Por anunciar"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-56 overflow-hidden sm:h-80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: anime.banner || anime.cover,
				alt: "",
				className: "h-full w-full object-cover object-top"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/30" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto -mt-24 grid max-w-7xl gap-6 px-4 md:grid-cols-[11rem_1fr] md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: anime.cover,
				alt: "",
				className: "w-44 rounded-xl border border-border object-cover md:w-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-primary",
					children: [
						formatLabel(anime.format),
						anime.year ? ` · ${anime.year}` : "",
						score ? ` · ${score}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
				}),
				anime.nativeTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: anime.nativeTitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/watch/$id",
							params: { id: String(anime.id) },
							search: { ep: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), "Ver ahora"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavButton, { fav: {
						id: anime.id,
						title: anime.title,
						nativeTitle: anime.nativeTitle,
						cover: anime.cover,
						score: anime.score,
						format: anime.format
					} })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-3xl leading-relaxed text-muted",
					children: anime.description || "Sin sinopsis publicada."
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-8 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-8",
			children: facts.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-medium",
					children: value
				})]
			}, label))
		}),
		anime.genres.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-4 flex max-w-7xl flex-wrap gap-2 px-4 md:px-8",
			children: anime.genres.map((genre) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/buscar",
				search: {
					...browseDefaults,
					genero: genre
				},
				className: "inline-flex h-9 items-center rounded-full bg-elevated px-3 text-sm",
				children: genreLabel(genre)
			}, genre))
		}) : null,
		anime.characters.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto mt-10 max-w-7xl px-4 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-xl font-semibold text-primary",
				children: "Reparto"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar flex gap-4 overflow-x-auto pb-2",
				children: anime.characters.map((character) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-24 shrink-0 text-center",
					children: [
						character.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: character.image,
							alt: "",
							className: "mx-auto size-20 rounded-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto size-20 rounded-full bg-elevated" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-xs",
							children: character.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: roleLabel(character.role)
						})
					]
				}, character.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: "Parecidos",
			items: anime.related
		})
	] });
}
//#endregion
export { AnimePage as component };
