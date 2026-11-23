import type { BrowseQuery } from "@/lib/types";

export const browseDefaults: BrowseQuery = {
  q: "",
  genero: "",
  formato: "",
  orden: "TRENDING_DESC",
  estado: "",
  page: 1,
};

export function readBrowseSearch(search: Record<string, unknown>): BrowseQuery {
  const page = Number(search.page);
  return {
    q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
    genero: typeof search.genero === "string" ? search.genero : "",
    formato: typeof search.formato === "string" ? search.formato : "",
    orden: typeof search.orden === "string" ? search.orden : browseDefaults.orden,
    estado: typeof search.estado === "string" ? search.estado : "",
    page: Number.isFinite(page) && page > 0 ? Math.min(20, Math.floor(page)) : 1,
  };
}
