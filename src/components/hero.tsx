import { Link } from "@tanstack/react-router";
import { Calendar, Captions, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { AnimeTitle } from "@/components/anime-title";
import { Button } from "@/components/ui/button";
import { formatLabel, scoreLabel } from "@/lib/format";
import type { Anime } from "@/lib/types";

export function Hero({ items }: { items: Anime[] }) {
  const slides = items.slice(0, 6);
  const [index, setIndex] = useState(() => (slides.length > 1 ? 1 : 0));
  const anime = slides[index];
  if (!anime) return null;
  const art = anime.banner || anime.cover;
  const score = scoreLabel(anime.score);

  function step(delta: number) {
    setIndex((current) => (current + delta + slides.length) % slides.length);
  }

  return (
    <section className="relative flex min-h-112 items-center overflow-hidden md:min-h-144">
      <img src={art} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-primary">Destacado {String(index + 1).padStart(2, "0")}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
            <AnimeTitle anime={anime} />
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Play className="size-3.5 fill-current" />
              {formatLabel(anime.format)}
            </span>
            {anime.startLabel ? (
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {anime.startLabel}
              </span>
            ) : null}
            <span className="rounded-md bg-bg/75 px-1.5 py-0.5 text-xs font-semibold text-primary">HD</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-bg/75 px-1.5 py-0.5 text-xs text-info">
              <Captions className="size-3.5" />
              ES AR
            </span>
            {score ? (
              <span className="rounded-md bg-bg/75 px-1.5 py-0.5 text-xs font-semibold text-info">{score}</span>
            ) : null}
          </div>
          {anime.description ? (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted md:text-base">{anime.description}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/watch/$id" params={{ id: String(anime.id) }} search={{ ep: 1 }}>
                <Play className="size-4 fill-current" />
                Ver ahora
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/anime/$id" params={{ id: String(anime.id) }}>
                Ficha
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {slides.length > 1 ? (
        <div className="absolute top-1/2 right-3 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          <button
            type="button"
            aria-label="Siguiente destacado"
            onClick={() => step(1)}
            className="flex size-11 items-center justify-center rounded-lg bg-bg/70 text-fg"
          >
            <ChevronRight className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Anterior destacado"
            onClick={() => step(-1)}
            className="flex size-11 items-center justify-center rounded-lg bg-bg/70 text-fg"
          >
            <ChevronLeft className="size-5" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
