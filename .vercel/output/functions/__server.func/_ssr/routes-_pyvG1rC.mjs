import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as clock, s as formatLabel, u as scoreLabel } from "./format-DrhHf9PQ.mjs";
import { _ as Captions, c as Play, g as ChevronLeft, h as ChevronRight, v as Calendar } from "../_libs/lucide-react.mjs";
import { c as AnimeTitle, o as Route$5 } from "./router-BKX-4Una.mjs";
import { t as Button } from "./button-DcRVNS9l.mjs";
import { n as useLibraryReady, t as useLibrary } from "./library-O9WChF0G.mjs";
import { t as MediaRow } from "./media-row-NNNCcr9B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-_pyvG1rC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Hero({ items }) {
	const slides = items.slice(0, 6);
	const [index, setIndex] = (0, import_react.useState)(() => slides.length > 1 ? 1 : 0);
	const anime = slides[index];
	if (!anime) return null;
	const art = anime.banner || anime.cover;
	const score = scoreLabel(anime.score);
	function step(delta) {
		setIndex((current) => (current + delta + slides.length) % slides.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-112 items-center overflow-hidden md:min-h-144",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover object-top"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto w-full max-w-7xl px-4 py-12 md:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium text-primary",
							children: ["Destacado ", String(index + 1).padStart(2, "0")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" }), formatLabel(anime.format)]
								}),
								anime.startLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), anime.startLabel]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-bg/75 px-1.5 py-0.5 text-xs font-semibold text-primary",
									children: "HD"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-md bg-bg/75 px-1.5 py-0.5 text-xs text-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-3.5" }), "ES AR"]
								}),
								score ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-bg/75 px-1.5 py-0.5 text-xs font-semibold text-info",
									children: score
								}) : null
							]
						}),
						anime.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 line-clamp-3 text-sm leading-relaxed text-muted md:text-base",
							children: anime.description
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/watch/$id",
									params: { id: String(anime.id) },
									search: { ep: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), "Ver ahora"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/anime/$id",
									params: { id: String(anime.id) },
									children: ["Ficha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
								})
							})]
						})
					]
				})
			}),
			slides.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-1/2 right-3 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Siguiente destacado",
					onClick: () => step(1),
					className: "flex size-11 items-center justify-center rounded-lg bg-bg/70 text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Anterior destacado",
					onClick: () => step(-1),
					className: "flex size-11 items-center justify-center rounded-lg bg-bg/70 text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				})]
			}) : null
		]
	});
}
function Home() {
	const data = Route$5.useLoaderData();
	const router = useRouter();
	if (!data.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "No pudimos cargar el catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: data.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: () => void router.invalidate(),
				children: "Reintentar"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { items: data.trending }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueRow, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: "Tendencias",
			items: data.trending,
			ranked: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: "En emisión",
			items: data.airing
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: "Mejor valorados",
			items: data.top
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: "Películas",
			items: data.movies
		})
	] });
}
function ContinueRow() {
	const ready = useLibraryReady();
	const history = useLibrary((state) => state.history);
	if (!ready || history.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto mt-8 max-w-7xl px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 font-display text-xl font-semibold text-primary",
			children: "Seguir viendo"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar flex gap-3 overflow-x-auto pb-2",
			children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/watch/$id",
				params: { id: String(item.id) },
				search: { ep: item.episode },
				className: "w-36 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.cover,
						alt: "",
						className: "aspect-2/3 w-full rounded-xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime: item })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Episodio ",
							item.episode,
							item.seconds > 0 ? ` · ${clock(item.seconds)}` : ""
						]
					})
				]
			}, item.id))
		})]
	});
}
//#endregion
export { Home as component };
