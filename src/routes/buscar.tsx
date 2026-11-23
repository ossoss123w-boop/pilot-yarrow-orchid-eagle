import { createFileRoute } from "@tanstack/react-router";
import { PosterCard } from "@/components/poster-card";
import { browseAnime } from "@/lib/anilist";
import { genreLabel, formatLabel, statusLabel } from "@/lib/format";
import { readBrowseSearch } from "@/lib/search";

export const Route = createFileRoute("/buscar")({
  validateSearch: (search) => readBrowseSearch(search as Record<string, unknown>),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => browseAnime({ data: deps }),
  component: BrowsePage,
});

function BrowsePage() {
  const search = Route.useSearch();
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const chips = [
    search.q ? `“${search.q}”` : null,
    search.genero ? genreLabel(search.genero) : null,
    search.formato ? formatLabel(search.formato) : null,
    search.estado ? statusLabel(search.estado) : null,
  ].filter(Boolean);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Catálogo</h1>
      <p className="mt-2 text-sm text-muted">
        {chips.length > 0 ? chips.join(" · ") : "Tendencias de ahora"}
      </p>
      {data.items.length === 0 ? (
        <p className="mt-10 text-muted">Nada coincide con esa búsqueda.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.items.map((anime) => (
            <PosterCard key={anime.id} anime={anime} fluid />
          ))}
        </div>
      )}
      <div className="mt-8 flex gap-3">
        {search.page > 1 ? (
          <button
            type="button"
            className="h-11 rounded-full bg-elevated px-5 text-sm font-semibold"
            onClick={() => void navigate({ search: { ...search, page: search.page - 1 } })}
          >
            Anterior
          </button>
        ) : null}
        {data.hasNext ? (
          <button
            type="button"
            className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
            onClick={() => void navigate({ search: { ...search, page: search.page + 1 } })}
          >
            Siguiente
          </button>
        ) : null}
      </div>
    </main>
  );
}
