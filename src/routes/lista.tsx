import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimeTitle } from "@/components/anime-title";
import { clock, formatLabel, scoreLabel } from "@/lib/format";
import { useLibrary, useLibraryReady } from "@/lib/library";
import { browseDefaults } from "@/lib/search";

export const Route = createFileRoute("/lista")({
  component: ListPage,
});

function ListPage() {
  const ready = useLibraryReady();
  const favorites = useLibrary((state) => state.favorites);
  const history = useLibrary((state) => state.history);
  const toggleFav = useLibrary((state) => state.toggleFav);
  const removeHistory = useLibrary((state) => state.removeHistory);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Mi lista</h1>
      <p className="mt-2 text-sm text-muted">Favoritos e historial guardados en este dispositivo.</p>
      {!ready ? <p className="mt-8 text-muted">Cargando tu lista…</p> : null}
      {ready && favorites.length === 0 ? (
        <p className="mt-8 text-muted">
          Todavía no guardaste títulos.{" "}
          <Link to="/buscar" search={{ ...browseDefaults }} className="text-primary">
            Explora el catálogo
          </Link>
        </p>
      ) : null}
      {ready && favorites.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {favorites.map((fav) => (
            <li key={fav.id} className="rounded-xl border border-border bg-surface p-2">
              <Link to="/anime/$id" params={{ id: String(fav.id) }}>
                <img src={fav.cover} alt="" className="aspect-2/3 w-full rounded-lg object-cover" />
                <p className="mt-2 line-clamp-2 text-sm font-medium">
                  <AnimeTitle anime={fav} />
                </p>
                <p className="text-xs text-muted">
                  {formatLabel(fav.format)}
                  {scoreLabel(fav.score) ? ` · ${scoreLabel(fav.score)}` : ""}
                </p>
              </Link>
              <button type="button" onClick={() => toggleFav(fav)} className="mt-2 h-11 text-sm text-muted">
                Quitar
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <h2 id="actividad" className="mt-12 font-display text-xl font-semibold text-primary">
        Actividad
      </h2>
      {ready && history.length === 0 ? <p className="mt-4 text-sm text-muted">Cuando reproduzcas algo, queda aquí.</p> : null}
      {ready ? (
        <ul className="mt-4 flex flex-col gap-3">
          {history.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2">
              <Link to="/watch/$id" params={{ id: String(item.id) }} search={{ ep: item.episode }} className="flex min-w-0 flex-1 items-center gap-3">
                <img src={item.cover} alt="" className="h-16 w-12 rounded-lg object-cover" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    <AnimeTitle anime={item} />
                  </span>
                  <span className="text-xs text-muted">
                    Episodio {item.episode}
                    {item.seconds > 0 ? ` · ${clock(item.seconds)}` : ""}
                  </span>
                </span>
              </Link>
              <button type="button" onClick={() => removeHistory(item.id)} className="h-11 px-3 text-sm text-muted">
                Quitar
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
