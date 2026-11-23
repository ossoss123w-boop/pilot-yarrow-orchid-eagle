import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryEntry = {
  id: number;
  title: string;
  nativeTitle: string | null;
  cover: string;
  episode: number;
  seconds: number;
  at: number;
};

export type Favorite = {
  id: number;
  title: string;
  nativeTitle: string | null;
  cover: string;
  score: number | null;
  format: string;
};

type Library = {
  history: HistoryEntry[];
  favorites: Favorite[];
  touch: (entry: HistoryEntry) => void;
  toggleFav: (fav: Favorite) => void;
  removeHistory: (id: number) => void;
};

export const useLibrary = create<Library>()(
  persist(
    (set) => ({
      history: [],
      favorites: [],
      touch: (entry) =>
        set((state) => {
          const prev = state.history.find((item) => item.id === entry.id);
          const seconds =
            entry.seconds > 0 ? entry.seconds : prev && prev.episode === entry.episode ? prev.seconds : 0;
          const next = { ...entry, seconds };
          return { history: [next, ...state.history.filter((item) => item.id !== entry.id)].slice(0, 30) };
        }),
      toggleFav: (fav) =>
        set((state) => {
          const exists = state.favorites.some((item) => item.id === fav.id);
          return {
            favorites: exists
              ? state.favorites.filter((item) => item.id !== fav.id)
              : [fav, ...state.favorites].slice(0, 80),
          };
        }),
      removeHistory: (id) => set((state) => ({ history: state.history.filter((item) => item.id !== id) })),
    }),
    { name: "by-monta-library", skipHydration: true },
  ),
);

export function useLibraryReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    void Promise.resolve(useLibrary.persist.rehydrate()).finally(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
