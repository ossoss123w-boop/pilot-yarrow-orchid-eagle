export type Anime = {
  id: number;
  title: string;
  nativeTitle: string | null;
  cover: string;
  banner: string | null;
  color: string | null;
  score: number | null;
  episodes: number | null;
  duration: number | null;
  format: string;
  status: string;
  seasonLabel: string | null;
  year: number | null;
  genres: string[];
  studio: string | null;
  description: string;
  trailer: { id: string; site: string } | null;
  startLabel: string | null;
  nextEpisode: number | null;
  nextAirAt: number | null;
  nextAirLabel: string | null;
};

export type CharacterCard = {
  id: number;
  name: string;
  image: string | null;
  role: string;
};

export type AnimeDetail = Anime & {
  characters: CharacterCard[];
  related: Anime[];
};

export type BrowseQuery = {
  q: string;
  genero: string;
  formato: string;
  orden: string;
  estado: string;
  page: number;
};

export type BrowseResult = {
  items: Anime[];
  page: number;
  hasNext: boolean;
};

export type HomeData = {
  ok: boolean;
  message: string;
  trending: Anime[];
  airing: Anime[];
  top: Anime[];
  movies: Anime[];
};
