import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ChevronLeft, h as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as PosterCard } from "./poster-card-BVAr1EM9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-row-NNNCcr9B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaRow({ title, items, ranked = false }) {
	const scroller = (0, import_react.useRef)(null);
	if (items.length === 0) return null;
	function move(direction) {
		const node = scroller.current;
		if (!node) return;
		node.scrollBy({
			left: direction * node.clientWidth * .8,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative mx-auto mt-10 max-w-7xl px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-primary",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Anterior en ${title}`,
					onClick: () => move(-1),
					className: "flex size-11 items-center justify-center rounded-lg bg-surface text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Siguiente en ${title}`,
					onClick: () => move(1),
					className: "flex size-11 items-center justify-center rounded-lg bg-surface text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scroller,
			className: "no-scrollbar flex gap-3 overflow-x-auto pb-2",
			children: items.map((anime, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				anime,
				rank: ranked ? index + 1 : void 0
			}, anime.id))
		})]
	});
}
//#endregion
export { MediaRow as t };
