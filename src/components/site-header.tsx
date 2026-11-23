import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Clapperboard, Menu, Newspaper, Search, Shuffle, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimeTitle } from "@/components/anime-title";
import { randomAnime, searchQuick } from "@/lib/anilist";
import { FORMATS, GENRES, SORTS, STATUSES } from "@/lib/format";
import { usePrefs, useTitleMode } from "@/lib/prefs";
import { browseDefaults } from "@/lib/search";
import { cn } from "@/lib/cn";
import type { Anime, BrowseQuery } from "@/lib/types";

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.search }) as Partial<BrowseQuery>;
  const mode = useTitleMode();
  const setMode = usePrefs((state) => state.setMode);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Anime[]>([]);
  const [openHits, setOpenHits] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filters, setFilters] = useState(false);
  const [draft, setDraft] = useState<BrowseQuery>(browseDefaults);
  const [busyRandom, setBusyRandom] = useState(false);
  const request = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    const id = ++request.current;
    const timer = window.setTimeout(() => {
      void searchQuick({ data: { q } })
        .then((rows) => {
          if (request.current === id) setHits(rows);
        })
        .catch(() => {
          if (request.current === id) setHits([]);
        });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  function goBrowse(next: BrowseQuery) {
    setFilters(false);
    setOpenHits(false);
    setMenu(false);
    void navigate({ to: "/buscar", search: next });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    goBrowse({ ...browseDefaults, q: query.trim(), orden: query.trim() ? "SEARCH_MATCH" : "TRENDING_DESC" });
  }

  async function goRandom() {
    setBusyRandom(true);
    try {
      const id = await randomAnime();
      if (id) {
        setMenu(false);
        void navigate({ to: "/anime/$id", params: { id: String(id) } });
      }
    } finally {
      setBusyRandom(false);
    }
  }

  function toggleFilters() {
    setDraft({
      q: query || (typeof search.q === "string" ? search.q : ""),
      genero: typeof search.genero === "string" ? search.genero : "",
      formato: typeof search.formato === "string" ? search.formato : "",
      orden: typeof search.orden === "string" ? search.orden : browseDefaults.orden,
      estado: typeof search.estado === "string" ? search.estado : "",
      page: 1,
    });
    setFilters((value) => !value);
    setOpenHits(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-lg text-fg lg:hidden"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="font-display text-lg font-semibold tracking-widest text-fg" onClick={() => setMenu(false)}>
            BY MONTA
          </Link>
        </div>

        <form onSubmit={onSubmit} className="relative order-last w-full lg:order-none lg:max-w-md lg:min-w-80 lg:flex-1">
          <div className="flex h-11 items-center rounded-lg bg-field pr-1 pl-3 text-field-fg">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenHits(true);
              }}
              onFocus={() => setOpenHits(true)}
              placeholder="Buscar anime..."
              aria-label="Buscar anime"
              className="h-full w-full bg-transparent text-base outline-none placeholder:text-field-fg/50"
            />
            <Search className="size-4 shrink-0" />
            <button type="submit" className="sr-only">
              Buscar
            </button>
            <button
              type="button"
              onClick={toggleFilters}
              className="ml-2 inline-flex h-8 items-center gap-1 rounded-md bg-field-fg px-3 text-xs font-semibold text-field"
            >
              <SlidersHorizontal className="size-3.5" />
              Filtrar
            </button>
          </div>
          {openHits && hits.length > 0 ? (
            <ul className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
              {hits.map((anime) => (
                <li key={anime.id}>
                  <Link
                    to="/anime/$id"
                    params={{ id: String(anime.id) }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-elevated"
                    onClick={() => setOpenHits(false)}
                  >
                    <img src={anime.cover} alt="" className="h-12 w-9 rounded-md object-cover" />
                    <AnimeTitle anime={anime} className="line-clamp-2 text-sm text-fg" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {filters ? (
            <div id="filtros" className="absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface p-4">
              <label className="mb-3 block text-sm text-muted">
                Género
                <select
                  value={draft.genero}
                  onChange={(event) => setDraft({ ...draft, genero: event.target.value })}
                  className="mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg"
                >
                  <option value="">Todos</option>
                  {GENRES.map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-muted">
                  Formato
                  <select
                    value={draft.formato}
                    onChange={(event) => setDraft({ ...draft, formato: event.target.value })}
                    className="mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg"
                  >
                    {FORMATS.map(([label, value]) => (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-muted">
                  Estado
                  <select
                    value={draft.estado}
                    onChange={(event) => setDraft({ ...draft, estado: event.target.value })}
                    className="mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg"
                  >
                    {STATUSES.map(([label, value]) => (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="mt-3 block text-sm text-muted">
                Orden
                <select
                  value={draft.orden === "SEARCH_MATCH" ? "TRENDING_DESC" : draft.orden}
                  onChange={(event) => setDraft({ ...draft, orden: event.target.value })}
                  className="mt-1 h-11 w-full rounded-lg border border-border bg-elevated px-3 text-fg"
                >
                  {SORTS.map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => goBrowse({ ...draft, q: query.trim() || draft.q, page: 1 })}
                className="mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-fg"
              >
                Aplicar
              </button>
            </div>
          ) : null}
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="flex h-9 items-center rounded-md bg-elevated p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("en")}
              className={cn("h-8 rounded px-2", mode === "en" ? "bg-primary text-primary-fg" : "text-muted")}
              aria-pressed={mode === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setMode("jp")}
              className={cn("h-8 rounded px-2", mode === "jp" ? "bg-primary text-primary-fg" : "text-muted")}
              aria-pressed={mode === "jp"}
            >
              JP
            </button>
          </div>
          <nav className="hidden items-center gap-4 lg:flex">
            <NavButton label="Aleatorio" icon={<Shuffle className="size-4" />} busy={busyRandom} onClick={() => void goRandom()} />
            <NavLink to="/buscar" search={{ ...browseDefaults }} label="Catálogo" icon={<Clapperboard className="size-4" />} active={pathname === "/buscar"} />
            <NavLink
              to="/novedades"
              label="Novedades"
              icon={<Newspaper className="size-4" />}
              active={pathname === "/novedades"}
            />
          </nav>
          <Link
            to="/lista"
            className="inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg"
          >
            Mi lista
          </Link>
        </div>
      </div>
      {menu ? (
        <div className="border-t border-border px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <button type="button" onClick={() => void goRandom()} className="h-11 rounded-lg text-left text-sm text-fg">
              Aleatorio
            </button>
            <Link to="/buscar" search={{ ...browseDefaults }} className="flex h-11 items-center text-sm" onClick={() => setMenu(false)}>
              Catálogo
            </Link>
            <Link to="/novedades" className="flex h-11 items-center text-sm" onClick={() => setMenu(false)}>
              Novedades
            </Link>
            <Link to="/lista" className="flex h-11 items-center text-sm" onClick={() => setMenu(false)}>
              Actividad
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavButton({
  label,
  icon,
  onClick,
  busy,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  busy?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} disabled={busy} className="flex flex-col items-center gap-1 text-xs text-muted hover:text-fg">
      {icon}
      {label}
    </button>
  );
}

function NavLink({
  to,
  search,
  label,
  icon,
  active,
}: {
  to: "/buscar" | "/novedades";
  search?: BrowseQuery;
  label: string;
  icon: ReactNode;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn("flex flex-col items-center gap-1 text-xs hover:text-fg", active ? "text-fg" : "text-muted")}
    >
      {icon}
      {label}
    </Link>
  );
}
