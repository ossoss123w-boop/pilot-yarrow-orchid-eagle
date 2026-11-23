import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimeTitle } from "@/components/anime-title";
import { FavButton } from "@/components/fav-button";
import { Player } from "@/components/player";
import { getAnime } from "@/lib/anilist";
import { sourcesFor } from "@/lib/playback";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/watch/$id")({
  validateSearch: (search: Record<string, unknown>) => {
    const episode = Number(search.ep);
    return { ep: Number.isFinite(episode) && episode > 0 ? Math.floor(episode) : 1 };
  },
  loader: ({ params }) => getAnime({ data: { id: Number(params.id) } }),
  component: WatchPage,
});

function episodeTotal(episodes: number | null, nextEpisode: number | null, format: string): number {
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
  const [range, setRange] = useState(0);

  useEffect(() => {
    setRange(Math.floor((episode - 1) / pageSize));
  }, [episode]);

  if (!anime) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">No encontramos este título</h1>
        <Link to="/" className="mt-6 inline-flex text-primary">
          Volver al inicio
        </Link>
      </main>
    );
  }

  const start = range * pageSize + 1;
  const end = Math.min(total, start + pageSize - 1);
  const ranges = Math.ceil(total / pageSize);
  const sources = sourcesFor(anime.trailer);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <Link to="/anime/$id" params={{ id: String(anime.id) }} className="text-sm text-muted">
        Volver a la ficha
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold md:text-4xl">
            <AnimeTitle anime={anime} />
          </h1>
          <p className="mt-1 text-sm text-muted">
            Episodio {episode}
            {anime.episodes ? ` de ${anime.episodes}` : ""} · vista previa
          </p>
        </div>
        <FavButton
          fav={{
            id: anime.id,
            title: anime.title,
            nativeTitle: anime.nativeTitle,
            cover: anime.cover,
            score: anime.score,
            format: anime.format,
          }}
        />
      </div>
      <div className="mt-5">
        <Player
          sources={sources}
          entry={{
            id: anime.id,
            title: anime.title,
            nativeTitle: anime.nativeTitle,
            cover: anime.cover,
            episode,
            seconds: 0,
            at: Date.now(),
          }}
        />
      </div>
      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-primary">Episodios</h2>
          {ranges > 1 ? (
            <select
              aria-label="Rango de episodios"
              value={range}
              onChange={(event) => setRange(Number(event.target.value))}
              className="h-11 rounded-lg border border-border bg-elevated px-3 text-sm"
            >
              {Array.from({ length: ranges }, (_, index) => {
                const from = index * pageSize + 1;
                const to = Math.min(total, from + pageSize - 1);
                return (
                  <option key={index} value={index}>
                    {from}–{to}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {Array.from({ length: end - start + 1 }, (_, index) => start + index).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => void navigate({ search: { ep: number } })}
              className={cn(
                "h-11 rounded-lg text-sm font-semibold",
                number === episode ? "bg-primary text-primary-fg" : "bg-elevated text-fg",
              )}
            >
              {number}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
