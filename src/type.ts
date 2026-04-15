type MovieFilterType = 'nowPlaying' | 'upcoming' | 'popular'

type MovieSortType = 'alphabetical' | 'rating' | 'releaseDate'

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}