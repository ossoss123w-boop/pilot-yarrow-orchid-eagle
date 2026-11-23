import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as STATUSES, n as GENRES, o as displayTitle, r as SORTS, t as FORMATS } from "./format-DrhHf9PQ.mjs";
import { a as SlidersHorizontal, d as Menu, i as TriangleAlert, m as Clapperboard, o as Shuffle, s as Search, t as X, u as Newspaper } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BJRkw_VB.js
var browseDefaults = {
	q: "",
	genero: "",
	formato: "",
	orden: "TRENDING_DESC",
	estado: "",
	page: 1
};
function readBrowseSearch(search) {
	const page = Number(search.page);
	return {
		q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
		genero: typeof search.genero === "string" ? search.genero : "",
		formato: typeof search.formato === "string" ? search.formato : "",
		orden: typeof search.orden === "string" ? search.orden : browseDefaults.orden,
		estado: typeof search.estado === "string" ? search.estado : "",
		page: Number.isFinite(page) && page > 0 ? Math.min(20, Math.floor(page)) : 1
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/anilist-BwTOiPGf.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var loadHome = createServerFn({ method: "GET" }).handler(createSsrRpc("405d6c2d3df34a830b9fdef7984b80c1c373ad5c3337632b1d6eebaa5eff12ce"));
var searchQuick = createServerFn({ method: "GET" }).validator((input) => ({ q: (input?.q ?? "").trim().slice(0, 80) })).handler(createSsrRpc("8a79fe651008b23b7825458f09e2f872d08d9b54afedf8f4d2cbf1300a1eb491"));
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
}).handler(createSsrRpc("fa075082011924359e8373985bb50745992cc51d7c2e908f7d6d5ed493b13ac4"));
var randomAnime = createServerFn({ method: "GET" }).handler(createSsrRpc("923736b2c9ec57af5b3ddfb29d4f566bd19045f5089ab1897d393a0047039eaf"));
var getAnime = createServerFn({ method: "GET" }).validator((input) => {
	const id = Number(input?.id);
	return { id: Number.isInteger(id) ? id : 0 };
}).handler(createSsrRpc("032ab072cff817ebad08048595e2a2fa632781604eedc58b5cc2d8a68d4cda44"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BKX-4Una.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Ocurrió un error inesperado. Prueba a recargar.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg font-semibold",
				children: "Algo salió mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base font-semibold tracking-widest text-fg",
				children: "BY MONTA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xl leading-relaxed",
				children: "Fichas, portadas y tráilers salen del catálogo público. El reproductor abre ese tráiler o una fuente directa de prueba (HLS o MP4) para calidades y subtítulos en español y árabe. Tu lista y tu historial se quedan en este dispositivo."
			})]
		})
	});
}
var usePrefs = create()(persist((set) => ({
	mode: "en",
	setMode: (mode) => set({ mode })
}), {
	name: "by-monta-prefs",
	skipHydration: true
}));
function useTitleMode() {
	const mode = usePrefs((state) => state.mode);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		Promise.resolve(usePrefs.persist.rehydrate()).finally(() => {
			if (alive) setReady(true);
		});
		return () => {
			alive = false;
		};
	}, []);
	return ready ? mode : "en";
}
function AnimeTitle({ anime, className }) {
	const mode = useTitleMode();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: displayTitle(anime, mode)
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function SiteHeader() {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const search = useRouterState({ select: (state) => state.location.search });
	const mode = useTitleMode();
	const setMode = usePrefs((state) => state.setMode);
	const [query, setQuery] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [openHits, setOpenHits] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [filters, setFilters] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(browseDefaults);
	const [busyRandom, setBusyRandom] = (0, import_react.useState)(false);
	const request = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const q = query.trim();
		if (q.length < 2) {
			setHits([]);
			return;
		}
		const id = ++request.current;
		const timer = window.setTimeout(() => {
			searchQuick({ data: { q } }).then((rows) => {
				if (request.current === id) setHits(rows);
			}).catch(() => {
				if (request.current === id) setHits([]);
			});
		}, 250);
		return () => window.clearTimeout(timer);
	}, [query]);
	function goBrowse(next) {
		setFilters(false);
		setOpenHits(false);
		setMenu(false);
		navigate({
			to: "/buscar",
			search: next
		});
	}
	function onSubmit(event) {
		event.preventDefault();
		goBrowse({
			...browseDefaults,
			q: query.trim(),
			orden: query.trim() ? "SEARCH_MATCH" : "TRENDING_DESC"
		});
	}
	async function goRandom() {
		setBusyRandom(true);
		try {
			const id = await randomAnime();
			if (id) {
				setMenu(false);
				navigate({
					to: "/anime/$id",
					params: { id: String(id) }
				});
			}
		} finally {
			setBusyRandom(false);
		}
	}
	function toggleFilters() {
		setDraft({
			q: query || (typeof search.q === "string" ? search.q : ""),
			genero: typeof search.genero === "string" ? search.genero : "",
			formato: typeof search.formato === "string" ? search.formato : "",
			orden: typeof search.orden === "string" ? search.orden : browseDefaults.orden,
			estado: typeof search.estado === "string" ? search.estado : "",
			page: 1
		});
		setFilters((value) => !value);
		setOpenHits(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center rounded-lg text-fg lg:hidden",
						"aria-label": menu ? "Cerrar menú" : "Abrir menú",
						"aria-expanded": menu,
						onClick: () => setMenu((value) => !value),
						children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-lg font-semibold tracking-widest text-fg",
						onClick: () => setMenu(false),
						children: "BY MONTA"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "relative order-last w-full lg:order-none lg:max-w-md lg:min-w-80 lg:flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-11 items-center rounded-lg bg-field pr-1 pl-3 text-field-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => {
										setQuery(event.target.value);
										setOpenHits(true);
									},
									onFocus: () => setOpenHits(true),
									placeholder: "Buscar anime...",
									"aria-label": "Buscar anime",
									className: "h-full w-full bg-transparent text-base outline-none placeholder:text-field-fg/50"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "sr-only",
									children: "Buscar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: toggleFilters,
									className: "ml-2 inline-flex h-8 items-center gap-1 rounded-md bg-field-fg px-3 text-xs font-semibold text-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), "Filtrar"]
								})
							]
						}),
						openHits && hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
							children: hits.map((anime) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/anime/$id",
								params: { id: String(anime.id) },
								className: "flex items-center gap-3 px-3 py-2 hover:bg-elevated",
								onClick: () => setOpenHits(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: anime.cover,
									alt: "",
									className: "h-12 w-9 rounded-md object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, {
									anime,
									className: "line-clamp-2 text-sm text-fg"
								})]
							}) }, anime.id))
						}) : null,
						filters ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "filtros",
							className: "absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mb-3 block text-sm text-muted",
									children: ["Género", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: draft.genero,
										onChange: (event) => setDraft({
											...draft,
											genero: event.target.value
										}),
										className: "mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Todos"
										}), GENRES.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value,
											children: label
										}, value))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm text-muted",
										children: ["Formato", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: draft.formato,
											onChange: (event) => setDraft({
												...draft,
												formato: event.target.value
											}),
											className: "mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg",
											children: FORMATS.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value,
												children: label
											}, label))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm text-muted",
										children: ["Estado", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: draft.estado,
											onChange: (event) => setDraft({
												...draft,
												estado: event.target.value
											}),
											className: "mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg",
											children: STATUSES.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value,
												children: label
											}, label))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-3 block text-sm text-muted",
									children: ["Orden", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: draft.orden === "SEARCH_MATCH" ? "TRENDING_DESC" : draft.orden,
										onChange: (event) => setDraft({
											...draft,
											orden: event.target.value
										}),
										className: "mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg",
										children: SORTS.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value,
											children: label
										}, value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => goBrowse({
										...draft,
										q: query.trim() || draft.q,
										page: 1
									}),
									className: "mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-fg",
									children: "Aplicar"
								})
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2 lg:ml-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-9 items-center rounded-md bg-elevated p-0.5 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("en"),
								className: cn("h-8 rounded px-2", mode === "en" ? "bg-primary text-primary-fg" : "text-muted"),
								"aria-pressed": mode === "en",
								children: "EN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("jp"),
								className: cn("h-8 rounded px-2", mode === "jp" ? "bg-primary text-primary-fg" : "text-muted"),
								"aria-pressed": mode === "jp",
								children: "JP"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-4 lg:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
									label: "Aleatorio",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }),
									busy: busyRandom,
									onClick: () => void goRandom()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/buscar",
									search: { ...browseDefaults },
									label: "Catálogo",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "size-4" }),
									active: pathname === "/buscar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/novedades",
									label: "Novedades",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "size-4" }),
									active: pathname === "/novedades"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lista",
							className: "inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg",
							children: "Mi lista"
						})
					]
				})
			]
		}), menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border px-4 py-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void goRandom(),
						className: "h-11 rounded-lg text-left text-sm text-fg",
						children: "Aleatorio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/buscar",
						search: { ...browseDefaults },
						className: "flex h-11 items-center text-sm",
						onClick: () => setMenu(false),
						children: "Catálogo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/novedades",
						className: "flex h-11 items-center text-sm",
						onClick: () => setMenu(false),
						children: "Novedades"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lista",
						className: "flex h-11 items-center text-sm",
						onClick: () => setMenu(false),
						children: "Actividad"
					})
				]
			})
		}) : null]
	});
}
function NavButton({ label, icon, onClick, busy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		disabled: busy,
		className: "flex flex-col items-center gap-1 text-xs text-muted hover:text-fg",
		children: [icon, label]
	});
}
function NavLink({ to, search, label, icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		search,
		className: cn("flex flex-col items-center gap-1 text-xs hover:text-fg", active ? "text-fg" : "text-muted"),
		children: [icon, label]
	});
}
var styles_default = "/assets/styles-D4UNL1e_.css";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BY MONTA" },
			{
				name: "description",
				content: "BY MONTA, catálogo de anime con ficha, tráiler y reproductor."
			},
			{
				name: "theme-color",
				content: "#12101a"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@500;700&family=Outfit:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-bg font-sans text-fg antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-_pyvG1rC.mjs");
var Route$5 = createFileRoute("/")({
	loader: () => loadHome(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./buscar-BByR8bhv.mjs");
var Route$4 = createFileRoute("/buscar")({
	validateSearch: (search) => readBrowseSearch(search),
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => browseAnime({ data: deps }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./lista-C9BZ2v1Y.mjs");
var Route$3 = createFileRoute("/lista")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./novedades-7FkYHxXa.mjs");
var Route$2 = createFileRoute("/novedades")({
	loader: () => browseAnime({ data: {
		...browseDefaults,
		estado: "RELEASING",
		orden: "POPULARITY_DESC",
		page: 1
	} }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./anime._id-BxBoSCwM.mjs");
var Route$1 = createFileRoute("/anime/$id")({
	loader: ({ params }) => getAnime({ data: { id: Number(params.id) } }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./watch._id-BcSFZcKX.mjs");
var Route = createFileRoute("/watch/$id")({
	validateSearch: (search) => {
		const episode = Number(search.ep);
		return { ep: Number.isFinite(episode) && episode > 0 ? Math.floor(episode) : 1 };
	},
	loader: ({ params }) => getAnime({ data: { id: Number(params.id) } }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	BuscarRoute: Route$4.update({
		id: "/buscar",
		path: "/buscar",
		getParentRoute: () => Route$6
	}),
	ListaRoute: Route$3.update({
		id: "/lista",
		path: "/lista",
		getParentRoute: () => Route$6
	}),
	NovedadesRoute: Route$2.update({
		id: "/novedades",
		path: "/novedades",
		getParentRoute: () => Route$6
	}),
	AnimeIdRoute: Route$1.update({
		id: "/anime/$id",
		path: "/anime/$id",
		getParentRoute: () => Route$6
	}),
	WatchIdRoute: Route.update({
		id: "/watch/$id",
		path: "/watch/$id",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, AnimeTitle as c, Route$2 as i, browseDefaults as l, Route as n, Route$5 as o, Route$1 as r, cn as s, router_exports as t };
