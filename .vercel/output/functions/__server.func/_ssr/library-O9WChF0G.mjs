import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-O9WChF0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useLibrary = create()(persist((set) => ({
	history: [],
	favorites: [],
	touch: (entry) => set((state) => {
		const prev = state.history.find((item) => item.id === entry.id);
		const seconds = entry.seconds > 0 ? entry.seconds : prev && prev.episode === entry.episode ? prev.seconds : 0;
		return { history: [{
			...entry,
			seconds
		}, ...state.history.filter((item) => item.id !== entry.id)].slice(0, 30) };
	}),
	toggleFav: (fav) => set((state) => {
		return { favorites: state.favorites.some((item) => item.id === fav.id) ? state.favorites.filter((item) => item.id !== fav.id) : [fav, ...state.favorites].slice(0, 80) };
	}),
	removeHistory: (id) => set((state) => ({ history: state.history.filter((item) => item.id !== id) }))
}), {
	name: "by-monta-library",
	skipHydration: true
}));
function useLibraryReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		Promise.resolve(useLibrary.persist.rehydrate()).finally(() => {
			if (alive) setReady(true);
		});
		return () => {
			alive = false;
		};
	}, []);
	return ready;
}
//#endregion
export { useLibraryReady as n, useLibrary as t };
