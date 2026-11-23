import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TitleMode = "en" | "jp";

type Prefs = {
  mode: TitleMode;
  setMode: (mode: TitleMode) => void;
};

export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({
      mode: "en",
      setMode: (mode) => set({ mode }),
    }),
    { name: "by-monta-prefs", skipHydration: true },
  ),
);

export function useTitleMode(): TitleMode {
  const mode = usePrefs((state) => state.mode);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    void Promise.resolve(usePrefs.persist.rehydrate()).finally(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready ? mode : "en";
}
