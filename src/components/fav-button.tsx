import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLibrary, useLibraryReady, type Favorite } from "@/lib/library";

export function FavButton({ fav, size = "md" }: { fav: Favorite; size?: "md" | "sm" }) {
  const ready = useLibraryReady();
  const favorites = useLibrary((state) => state.favorites);
  const toggleFav = useLibrary((state) => state.toggleFav);
  const on = ready && favorites.some((item) => item.id === fav.id);
  return (
    <Button variant="ghost" size={size} onClick={() => toggleFav(fav)} aria-pressed={on}>
      <Heart className={on ? "size-4 fill-primary text-primary" : "size-4"} />
      {on ? "En mi lista" : "Mi lista"}
    </Button>
  );
}
