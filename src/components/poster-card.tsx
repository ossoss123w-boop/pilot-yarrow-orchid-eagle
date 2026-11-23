import { Link } from "@tanstack/react-router";
import { AnimeTitle } from "@/components/anime-title";
import { formatLabel, scoreLabel } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Anime } from "@/lib/types";

export function PosterCard({ anime, rank, fluid = false }: { anime: Anime; rank?: number; fluid?: boolean }) {
  const score = scoreLabel(anime.score);
  return (
    <Link
      to="/anime/$id"
      params={{ id: String(anime.id) }}
      className={cn("group block", fluid ? "w-full" : "w-32 shrink-0 sm:w-40")}
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-surface">
        <img
          src={anime.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        {rank != null ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-bg/85 to-transparent" />
            <span className="spine absolute top-3 bottom-14 left-1.5 max-h-48 text-xs font-medium text-fg [text-shadow:0_1px_2px_rgb(0_0_0/0.85)]">
              <AnimeTitle anime={anime} />
            </span>
            <span className="absolute bottom-1 left-2 font-display text-3xl font-semibold text-fg [text-shadow:0_2px_8px_rgb(0_0_0/0.8)]">
              {String(rank).padStart(2, "0")}
            </span>
          </>
        ) : null}
        {score ? (
          <span className="absolute top-2 right-2 rounded-md bg-bg/80 px-1.5 py-0.5 text-xs font-medium text-info">
            {score}
          </span>
        ) : null}
      </div>
      {rank == null ? (
        <div className="mt-2">
          <p className="line-clamp-2 text-sm font-medium text-fg">
            <AnimeTitle anime={anime} />
          </p>
          <p className="text-xs text-muted">{formatLabel(anime.format)}</p>
        </div>
      ) : null}
    </Link>
  );
}
