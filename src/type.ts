type MovieFilterType = 'nowPlaying' | 'upcoming' | 'popular'

type MovieSortType = 'alphabetical' | 'rating' | 'releaseDate'

type MovieSortOrderType = 'asc' | 'desc'

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

type MovieDetailsType = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genres: GenreType[];
  status: string;
  original_language: string;
  vote_average: number;
  tagline: string;
  overview: string;
  adult: boolean;
  origin_country: string[],
  release_dates: { results: { iso_3166_1: string, release_dates: ReleaseDateType[] }[] }
}

type GenreType = {
  id: number;
  name: string;
}

type CastType = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

type CrewType = {
  id: number;
  name: string;
  job: string;
}

type CreditsType = {
  cast: CastType[];
  crew: CrewType[];
}

type ReleaseDateType = {
  certification: string;
  type: number;
}

type AccountType = {
  id: number;
  avatar: { tmdb: { avatar_path: string } };
  username: string;
}