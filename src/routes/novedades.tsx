import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimeTitle } from "@/components/anime-title";
import { browseAnime } from "@/lib/anilist";
import { browseDefaults } from "@/lib/search";

export const Route = createFileRoute("/novedades")({
  loader: () =>
    browseAnime({
      data: { ...browseDefaults, estado: "RELEASING", orden: "POPULARITY_DESC", page: 1 },
    }),
  component: NewsPage,
});

function NewsPage() {
  const data = Route.useLoaderData();
  const items = [...data.items].sort((a, b) => (a.nextAirAt ?? Number.MAX_SAFE_INTEGER) - (b.nextAirAt ?? Number.MAX_SAFE_INTEGER));
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Novedades</h1>
      <p className="mt-2 text-sm text-muted">Lo que está en emisión y cuándo llega el siguiente episodio.</p>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((anime) => (
          <li key={anime.id}>
            <Link
              to="/anime/$id"
              params={{ id: String(anime.id) }}
              className="flex gap-3 rounded-xl border border-border bg-surface p-3"
            >
              <img src={anime.cover} alt="" className="h-20 w-14 rounded-lg object-cover" />
              <div>
                <p className="font-medium">
                  <AnimeTitle anime={anime} />
                </p>
                <p className="mt-1 text-sm text-muted">
                  {anime.nextEpisode ? `Episodio ${anime.nextEpisode}` : "En emisión"}
                  {anime.nextAirLabel ? ` · ${anime.nextAirLabel}` : ""}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
