import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as clock } from "./format-DrhHf9PQ.mjs";
import { _ as Captions, c as Play, f as Maximize, l as Pause, n as VolumeX, r as Volume2 } from "../_libs/lucide-react.mjs";
import { c as AnimeTitle, n as Route, s as cn } from "./router-BKX-4Una.mjs";
import { t as useLibrary } from "./library-O9WChF0G.mjs";
import { t as FavButton } from "./fav-button-DB5pj1Eh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._id-BcSFZcKX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function timestamp(value) {
	const clean = value.trim().replace(",", ".");
	const parts = clean.split(":");
	if (parts.length === 3) return Number(parts[0]) * 3600 + Number(parts[1]) * 60 + Number(parts[2]);
	if (parts.length === 2) return Number(parts[0]) * 60 + Number(parts[1]);
	return Number(clean) || 0;
}
function parseSubs(raw) {
	const text = raw.replace(/^\uFEFF/, "").replace(/\r/g, "").trim();
	if (!text) return [];
	const cues = [];
	for (const block of text.split(/\n\s*\n/)) {
		const lines = block.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("WEBVTT") && !line.startsWith("NOTE") && !line.startsWith("STYLE"));
		const timeIndex = lines.findIndex((line) => line.includes("-->"));
		if (timeIndex < 0) continue;
		const [startRaw, endRaw = ""] = lines[timeIndex].split("-->");
		const start = timestamp(startRaw ?? "");
		const end = timestamp((endRaw ?? "").trim().split(/\s+/)[0] ?? "");
		const body = lines.slice(timeIndex + 1).join("\n").replace(/<[^>]+>/g, "").trim();
		if (!body || !Number.isFinite(start) || !Number.isFinite(end)) continue;
		cues.push({
			start,
			end,
			text: body
		});
	}
	return cues;
}
function Player({ entry, sources }) {
	const touch = useLibrary((state) => state.touch);
	const videoRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const hlsRef = (0, import_react.useRef)(null);
	const [sourceId, setSourceId] = (0, import_react.useState)(sources[0]?.id ?? "");
	const source = sources.find((item) => item.id === sourceId) ?? sources[0];
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [levels, setLevels] = (0, import_react.useState)([]);
	const [level, setLevel] = (0, import_react.useState)(-1);
	const [error, setError] = (0, import_react.useState)(null);
	const [subId, setSubId] = (0, import_react.useState)("");
	const [builtin, setBuiltin] = (0, import_react.useState)([]);
	const [fileCues, setFileCues] = (0, import_react.useState)([]);
	const [fileLabel, setFileLabel] = (0, import_react.useState)("");
	const [fileRtl, setFileRtl] = (0, import_react.useState)(false);
	const savedAt = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		touch({
			...entry,
			seconds: 0
		});
	}, [
		entry.id,
		entry.episode,
		entry.title,
		entry.cover,
		touch
	]);
	const sourceUrl = source?.url ?? "";
	const sourceKind = source?.kind;
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video || !sourceUrl || sourceKind === "iframe" || !sourceKind) return;
		let cancel = false;
		const local = {};
		setError(null);
		setLevels([]);
		setLevel(-1);
		setPlaying(false);
		setTime(0);
		async function mount(node, url, kind) {
			if (kind === "mp4" || node.canPlayType("application/vnd.apple.mpegurl")) {
				node.src = url;
				return;
			}
			const { default: Hls } = await import("../_libs/hls.js.mjs").then((n) => n.t);
			if (cancel) return;
			if (!Hls.isSupported()) {
				setError("Este navegador no reproduce HLS. Prueba el MP4.");
				return;
			}
			const hls = new Hls();
			local.hls = hls;
			hlsRef.current = hls;
			hls.loadSource(url);
			hls.attachMedia(node);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if (cancel) return;
				setLevels(hls.levels.map((item, index) => ({
					index,
					label: item.height ? `${item.height}p` : `Nivel ${index + 1}`
				})));
			});
			hls.on(Hls.Events.ERROR, (_event, data) => {
				if (!cancel && data.fatal) setError("No se pudo reproducir esta fuente.");
			});
		}
		mount(video, sourceUrl, sourceKind);
		return () => {
			cancel = true;
			local.hls?.destroy();
			hlsRef.current = null;
			video.pause();
			video.removeAttribute("src");
			video.load();
		};
	}, [sourceUrl, sourceKind]);
	(0, import_react.useEffect)(() => {
		if (subId !== "es" && subId !== "ar") return;
		let cancel = false;
		fetch(subId === "es" ? "/subs/demo-es.vtt" : "/subs/demo-ar.vtt").then((response) => response.text()).then((text) => {
			if (!cancel) setBuiltin(parseSubs(text));
		}).catch(() => {
			if (!cancel) setBuiltin([]);
		});
		return () => {
			cancel = true;
		};
	}, [subId]);
	function remember(seconds, force = false) {
		if (!force && seconds > 0 && seconds - savedAt.current < 5) return;
		savedAt.current = seconds;
		touch({
			...entry,
			seconds,
			at: Date.now()
		});
	}
	function toggle() {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) video.play();
		else video.pause();
	}
	function fullscreen() {
		const node = stageRef.current;
		if (!node) return;
		if (document.fullscreenElement) document.exitFullscreen();
		else node.requestFullscreen();
	}
	const active = (subId === "file" ? fileCues : subId === "es" || subId === "ar" ? builtin : []).filter((cue) => time >= cue.start && time < cue.end);
	const rtl = subId === "ar" || subId === "file" && fileRtl;
	const direct = source && source.kind !== "iframe";
	async function loadSampleSrt() {
		const parsed = parseSubs(await (await fetch("/subs/demo-es.srt")).text());
		setFileCues(parsed);
		setFileLabel("demo-es.srt");
		setSubId("file");
		setError(parsed.length ? null : "No leí subtítulos en el SRT de ejemplo.");
	}
	function onFile(file) {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const parsed = parseSubs(String(reader.result ?? ""));
			setFileCues(parsed);
			setFileLabel(file.name);
			setSubId(parsed.length ? "file" : "");
			setError(parsed.length ? null : "Ese archivo no tiene subtítulos VTT o SRT.");
		};
		reader.readAsText(file);
	}
	if (!source) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stageRef,
		className: "group relative aspect-video overflow-hidden rounded-xl bg-surface",
		children: [
			source.kind === "iframe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: `Tráiler de ${entry.title}`,
				src: source.url,
				className: "absolute inset-0 h-full w-full",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
				allowFullScreen: true,
				referrerPolicy: "strict-origin-when-cross-origin"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					poster: entry.cover,
					className: "h-full w-full bg-bg object-contain",
					playsInline: true,
					onPlay: () => setPlaying(true),
					onPause: () => {
						setPlaying(false);
						if (videoRef.current) remember(videoRef.current.currentTime, true);
					},
					onTimeUpdate: () => {
						const node = videoRef.current;
						if (!node) return;
						setTime(node.currentTime);
						remember(node.currentTime);
					},
					onDurationChange: () => setDuration(videoRef.current?.duration || 0),
					onClick: toggle
				}),
				active.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-x-4 bottom-16 z-10 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						dir: rtl ? "rtl" : "ltr",
						lang: subId === "ar" ? "ar" : "es",
						className: cn("max-w-3xl rounded-lg bg-bg/80 px-3 py-1.5 text-center text-base leading-snug whitespace-pre-line text-fg", rtl && "font-arabic text-right"),
						children: active.map((cue) => cue.text).join("\n")
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-bg/90 to-transparent p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": "Posición",
						type: "range",
						min: 0,
						max: duration || 0,
						step: .1,
						value: Math.min(time, duration || 0),
						onChange: (event) => {
							const next = Number(event.target.value);
							if (videoRef.current) videoRef.current.currentTime = next;
							setTime(next);
						},
						className: "h-2 w-full accent-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": playing ? "Pausar" : "Reproducir",
								onClick: toggle,
								className: "flex size-11 items-center justify-center text-fg",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-current" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									clock(time),
									" / ",
									clock(duration)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": muted ? "Activar sonido" : "Silenciar",
								onClick: () => {
									const node = videoRef.current;
									if (!node) return;
									node.muted = !node.muted;
									setMuted(node.muted);
								},
								className: "flex size-11 items-center justify-center text-fg",
								children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ml-auto flex items-center gap-2 text-xs text-muted",
								children: ["Calidad", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Calidad",
									value: level,
									onChange: (event) => {
										const next = Number(event.target.value);
										setLevel(next);
										if (hlsRef.current) hlsRef.current.currentLevel = next;
									},
									className: "h-9 rounded-lg border border-border bg-elevated px-2 text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: -1,
										children: levels.length ? "Auto" : "Original"
									}), levels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.index,
										children: item.label
									}, item.index))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Pantalla completa",
								onClick: fullscreen,
								className: "flex size-11 items-center justify-center text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-5" })
							})
						]
					})]
				})
			] }),
			source.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute top-3 left-3 z-10 rounded-full bg-bg/80 px-3 py-1 text-xs text-fg",
				children: "Vídeo de prueba, no es el episodio"
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute inset-x-4 top-12 z-10 rounded-lg bg-bg/90 px-3 py-2 text-sm text-fg",
				children: error
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm text-muted",
			children: "Servidor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSourceId(item.id),
				className: cn("h-11 rounded-full px-4 text-sm font-semibold", item.id === source.id ? "bg-primary text-primary-fg" : "bg-elevated text-fg"),
				children: item.label
			}, item.id))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex flex-col gap-3 rounded-xl border border-border bg-surface p-4", !direct && "opacity-80"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-4" }), "Subtítulos"]
				}),
				!direct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Los subtítulos se aplican a las fuentes HLS y MP4, no al tráiler."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						["", "Sin subtítulos"],
						["es", "Español"],
						["ar", "العربية"],
						...fileLabel ? [["file", fileLabel]] : []
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !direct && id !== "",
						onClick: () => setSubId(id),
						className: cn("h-11 rounded-full px-4 text-sm", subId === id ? "bg-primary text-primary-fg" : "bg-elevated text-fg"),
						children: label
					}, id || "off"))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex h-11 cursor-pointer items-center rounded-full bg-elevated px-4 text-sm text-fg",
							children: ["Cargar .vtt / .srt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: ".vtt,.srt,text/vtt",
								className: "sr-only",
								onChange: (event) => onFile(event.target.files?.[0])
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void loadSampleSrt(),
							className: "h-11 rounded-full bg-elevated px-4 text-sm text-fg",
							children: "Probar .srt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex h-11 items-center gap-2 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: fileRtl,
								onChange: (event) => setFileRtl(event.target.checked)
							}), "RTL en archivo"]
						})
					]
				})
			]
		})]
	})] });
}
/**
* Playback endpoints configured by the app.
* Trailer embeds come from the public catalog. HLS and MP4 entries are
* open demo streams so quality switching and subtitles can be tried
* without hosting copyrighted episodes.
*/
function sourcesFor(trailer) {
	const sources = [];
	if (trailer && trailer.site.toLowerCase() === "youtube" && /^[\w-]{6,20}$/.test(trailer.id)) sources.push({
		id: "trailer",
		label: "Tráiler",
		kind: "iframe",
		url: `https://www.youtube-nocookie.com/embed/${trailer.id}?rel=0&modestbranding=1`,
		demo: false
	});
	sources.push({
		id: "hls",
		label: "HLS de prueba",
		kind: "hls",
		url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
		demo: true
	}, {
		id: "mp4",
		label: "MP4 de prueba",
		kind: "mp4",
		url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		demo: true
	});
	return sources;
}
function episodeTotal(episodes, nextEpisode, format) {
	if (episodes && episodes > 0) return episodes;
	if (nextEpisode && nextEpisode > 1) return nextEpisode - 1;
	if (format === "MOVIE") return 1;
	return 12;
}
function WatchPage() {
	const anime = Route.useLoaderData();
	const { ep } = Route.useSearch();
	const navigate = Route.useNavigate();
	const total = anime ? episodeTotal(anime.episodes, anime.nextEpisode, anime.format) : 1;
	const episode = Math.min(ep, total);
	const pageSize = 40;
	const [range, setRange] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setRange(Math.floor((episode - 1) / pageSize));
	}, [episode]);
	if (!anime) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "No encontramos este título"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-6 inline-flex text-primary",
			children: "Volver al inicio"
		})]
	});
	const start = range * pageSize + 1;
	const end = Math.min(total, start + pageSize - 1);
	const ranges = Math.ceil(total / pageSize);
	const sources = sourcesFor(anime.trailer);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-6 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/anime/$id",
				params: { id: String(anime.id) },
				className: "text-sm text-muted",
				children: "Volver a la ficha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold md:text-4xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeTitle, { anime })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Episodio ",
						episode,
						anime.episodes ? ` de ${anime.episodes}` : "",
						" · vista previa"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavButton, { fav: {
					id: anime.id,
					title: anime.title,
					nativeTitle: anime.nativeTitle,
					cover: anime.cover,
					score: anime.score,
					format: anime.format
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
					sources,
					entry: {
						id: anime.id,
						title: anime.title,
						nativeTitle: anime.nativeTitle,
						cover: anime.cover,
						episode,
						seconds: 0,
						at: Date.now()
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-primary",
						children: "Episodios"
					}), ranges > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Rango de episodios",
						value: range,
						onChange: (event) => setRange(Number(event.target.value)),
						className: "h-11 rounded-lg border border-border bg-elevated px-3 text-sm",
						children: Array.from({ length: ranges }, (_, index) => {
							const from = index * pageSize + 1;
							const to = Math.min(total, from + pageSize - 1);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: index,
								children: [
									from,
									"–",
									to
								]
							}, index);
						})
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-10",
					children: Array.from({ length: end - start + 1 }, (_, index) => start + index).map((number) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void navigate({ search: { ep: number } }),
						className: cn("h-11 rounded-lg text-sm font-semibold", number === episode ? "bg-primary text-primary-fg" : "bg-elevated text-fg"),
						children: number
					}, number))
				})]
			})
		]
	});
}
//#endregion
export { WatchPage as component };
