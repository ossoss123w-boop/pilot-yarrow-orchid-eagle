import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Heart } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DcRVNS9l.mjs";
import { n as useLibraryReady, t as useLibrary } from "./library-O9WChF0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fav-button-DB5pj1Eh.js
var import_jsx_runtime = require_jsx_runtime();
function FavButton({ fav, size = "md" }) {
	const ready = useLibraryReady();
	const favorites = useLibrary((state) => state.favorites);
	const toggleFav = useLibrary((state) => state.toggleFav);
	const on = ready && favorites.some((item) => item.id === fav.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size,
		onClick: () => toggleFav(fav),
		"aria-pressed": on,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: on ? "size-4 fill-primary text-primary" : "size-4" }), on ? "En mi lista" : "Mi lista"]
	});
}
//#endregion
export { FavButton as t };
