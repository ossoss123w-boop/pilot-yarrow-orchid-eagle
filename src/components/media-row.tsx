import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { PosterCard } from "@/components/poster-card";
import type { Anime } from "@/lib/types";

export function MediaRow({ title, items, ranked = false }: { title: string; items: Anime[]; ranked?: boolean }) {
  const scroller = useRef<HTMLDivElement>(null);
  if (items.length === 0) return null;

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="relative mx-auto mt-10 max-w-7xl px-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-primary">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label={`Anterior en ${title}`}
            onClick={() => move(-1)}
            className="flex size-11 items-center justify-center rounded-lg bg-surface text-fg"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label={`Siguiente en ${title}`}
            onClick={() => move(1)}
            className="flex size-11 items-center justify-center rounded-lg bg-surface text-fg"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div ref={scroller} className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {items.map((anime, index) => (
          <PosterCard key={anime.id} anime={anime} rank={ranked ? index + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}
