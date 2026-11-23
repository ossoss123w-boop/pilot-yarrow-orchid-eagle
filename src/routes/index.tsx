import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { MediaRow } from "@/components/media-row";
import { AnimeTitle } from "@/components/anime-title";
import { Button } from "@/components/ui/button";
import { loadHome } from "@/lib/anilist";
import { clock } from "@/lib/format";
import { useLibrary, useLibraryReady } from "@/lib/library";

export const Route = createFileRoute("/")({
  loader: () => loadHome(),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  const router = useRouter();
  if (!data.ok) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="font-display text-3xl font-semibold">No pudimos cargar el catálogo</h1>
        <p className="mt-3 text-muted">{data.message}</p>
        <Button className="mt-6" onClick={() => void router.invalidate()}>
          Reintentar
        </Button>
      </main>
    );
  }
  return (
    <main>
      <Hero items={data.trending} />
      <ContinueRow />
      <MediaRow title="Tendencias" items={data.trending} ranked />
      <MediaRow title="En emisión" items={data.airing} />
      <MediaRow title="Mejor valorados" items={data.top} />
      <MediaRow title="Películas" items={data.movies} />
    </main>
  );
}

function ContinueRow() {
  const ready = useLibraryReady();
  const history = useLibrary((state) => state.history);
  if (!ready || history.length === 0) return null;
  return (
    <section className="mx-auto mt-8 max-w-7xl px-4">
      <h2 className="mb-4 font-display text-xl font-semibold text-primary">Seguir viendo</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {history.map((item) => (
          <Link
            key={item.id}
            to="/watch/$id"
            params={{ id: String(item.id) }}
            search={{ ep: item.episode }}
            className="w-36 shrink-0"
          >
            <img src={item.cover} alt="" className="aspect-2/3 w-full rounded-xl object-cover" />
            <p className="mt-2 line-clamp-2 text-sm">
              <AnimeTitle anime={item} />
            </p>
            <p className="text-xs text-muted">
              Episodio {item.episode}
              {item.seconds > 0 ? ` · ${clock(item.seconds)}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
