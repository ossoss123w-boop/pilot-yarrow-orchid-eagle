import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { AnimeTitle } from "@/components/anime-title";
import { FavButton } from "@/components/fav-button";
import { MediaRow } from "@/components/media-row";
import { Button } from "@/components/ui/button";
import { getAnime } from "@/lib/anilist";
import { formatLabel, genreLabel, roleLabel, scoreLabel, statusLabel } from "@/lib/format";
import { browseDefaults } from "@/lib/search";

export const Route = createFileRoute("/anime/$id")({
  loader: ({ params }) => getAnime({ data: { id: Number(params.id) } }),
  component: AnimePage,
});

function AnimePage() {
  const anime = Route.useLoaderData();
  if (!anime) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">No encontramos este título</h1>
        <Link to="/" className="mt-6 inline-flex h-11 items-center text-primary">
          Volver al inicio
        </Link>
      </main>
    );
  }
  const score = scoreLabel(anime.score);
  const facts = [
    ["Formato", formatLabel(anime.format)],
    ["Estado", statusLabel(anime.status)],
    ["Episodios", anime.episodes ? String(anime.episodes) : "Por anunciar"],
    ["Duración", anime.duration ? `${anime.duration} min` : "Por anunciar"],
    ["Temporada", anime.seasonLabel ?? "Por anunciar"],
    ["Estudio", anime.studio ?? "Por anunciar"],
  ];
  return (
    <main>
      <section className="relative h-56 overflow-hidden sm:h-80">
        <img src={anime.banner || anime.cover} alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/30" />
      </section>
      <div className="relative z-10 mx-auto -mt-24 grid max-w-7xl gap-6 px-4 md:grid-cols-[11rem_1fr] md:px-8">
        <img src={anime.cover} alt="" className="w-44 rounded-xl border border-border object-cover md:w-full" />
        <div>
          <p className="text-sm text-primary">
            {formatLabel(anime.format)}
            {anime.year ? ` · ${anime.year}` : ""}
            {score ? ` · ${score}` : ""}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            <AnimeTitle anime={anime} />
          </h1>
          {anime.nativeTitle ? <p className="mt-1 text-muted">{anime.nativeTitle}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/watch/$id" params={{ id: String(anime.id) }} search={{ ep: 1 }}>
                <Play className="size-4 fill-current" />
                Ver ahora
              </Link>
            </Button>
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
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            {anime.description || "Sin sinopsis publicada."}
          </p>
        </div>
      </div>
      <section className="mx-auto mt-8 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-8">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-xs text-muted">{label}</p>
            <p className="mt-1 text-sm font-medium">{value}</p>
          </div>
        ))}
      </section>
      {anime.genres.length > 0 ? (
        <div className="mx-auto mt-4 flex max-w-7xl flex-wrap gap-2 px-4 md:px-8">
          {anime.genres.map((genre) => (
            <Link
              key={genre}
              to="/buscar"
              search={{ ...browseDefaults, genero: genre }}
              className="inline-flex h-9 items-center rounded-full bg-elevated px-3 text-sm"
            >
              {genreLabel(genre)}
            </Link>
          ))}
        </div>
      ) : null}
      {anime.characters.length > 0 ? (
        <section className="mx-auto mt-10 max-w-7xl px-4 md:px-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-primary">Reparto</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {anime.characters.map((character) => (
              <div key={character.id} className="w-24 shrink-0 text-center">
                {character.image ? (
                  <img src={character.image} alt="" className="mx-auto size-20 rounded-full object-cover" />
                ) : (
                  <div className="mx-auto size-20 rounded-full bg-elevated" />
                )}
                <p className="mt-2 line-clamp-2 text-xs">{character.name}</p>
                <p className="text-xs text-muted">{roleLabel(character.role)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <MediaRow title="Parecidos" items={anime.related} />
    </main>
  );
}
