import { displayTitle } from "@/lib/format";
import { useTitleMode } from "@/lib/prefs";
import type { Anime } from "@/lib/types";

export function AnimeTitle({
  anime,
  className,
}: {
  anime: Pick<Anime, "title" | "nativeTitle">;
  className?: string;
}) {
  const mode = useTitleMode();
  return <span className={className}>{displayTitle(anime, mode)}</span>;
}
