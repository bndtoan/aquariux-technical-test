import { getNowPlayingDate, getSortQueryParam, getUpcomingDate } from "../../utils";
import requestApi from "./requestApi";

type R = Record<string, any>;

export default {
  // TODO: get image configuration through api if have time

  // HOME
  // Can not sort while requesting popular movie because the api is already sorting according to popularity
  requestNowPlaying: (page: number, sort: MovieSortType | undefined, search: string) => {
    const { min, max } = getNowPlayingDate()
    const sortParam = getSortQueryParam(sort)
    return requestApi.get<R>(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortParam}&with_release_type=2|3&release_date.gte=${min}&release_date.lte=${max}&with_keywords=${search}`
    )
  },
  requestUpcoming: (page: number, sort: MovieSortType | undefined, search: string) => {
    const { min, max } = getUpcomingDate()
    const sortParam = getSortQueryParam(sort)
    return requestApi.get<R>(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortParam}&with_release_type=2|3&release_date.gte=${min}&release_date.lte=${max}&with_keywords=${search}`
    )
  },
  requestPopular: (page: number, search: string) => requestApi.get<R>(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_keywords=${search}`),

  // DETAILS
  requestMovieDetails: (id: number) => requestApi.get<R>(`/movie/${id}`),
  requestMovieCredits: (id: number) => requestApi.get<R>(`/movie/${id}/credits`),
  requestMovieRecommendations: (id: number) => requestApi.get<R>(`/movie/${id}/recommendations`),

  // WATCH LIST
  requestAccountInfo: () => requestApi.get<R>(`account/null`),
}