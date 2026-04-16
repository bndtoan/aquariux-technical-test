import { getNowPlayingDate, getSortQueryParam, getUpcomingDate } from "../../utils";
import requestApi from "./requestApi";

type R = Record<string, any>;

export default {
  // TODO: get image configuration through api if have time

  // HOME
  requestMovieList: (page: number, filter: MovieFilterType, sort: MovieSortType | undefined, search: string) => {
    if (filter === 'nowPlaying') {
      const { min, max } = getNowPlayingDate()
      const sortParam = getSortQueryParam(sort)

      return requestApi.get<R>(
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortParam}&with_release_type=2|3&release_date.gte=${min}&release_date.lte=${max}&with_keywords=${search}`
      )
    } else if (filter === 'upcoming') {
      const { min, max } = getUpcomingDate()
      const sortParam = getSortQueryParam(sort)
      return requestApi.get<R>(
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortParam}&with_release_type=2|3&release_date.gte=${min}&release_date.lte=${max}&with_keywords=${search}`
      )
    } else {
      // Can not sort while requesting popular movie because the api is already sorting according to popularity
      return requestApi.get<R>(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_keywords=${search}`)
    }
  },

  // DETAILS
  requestMovieDetails: (id: number) => requestApi.get<MovieDetailsType>(`/movie/${id}?append_to_response=release_dates`),
  requestMovieCredits: (id: number) => requestApi.get<CreditsType>(`/movie/${id}/credits`),
  requestMovieRecommendations: (id: number) => requestApi.get<R>(`/movie/${id}/recommendations`),

  // WATCH LIST
  requestAccountInfo: () => requestApi.get<R>(`account/null`),
}