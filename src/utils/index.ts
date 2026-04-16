export const getSortQueryParam = (sort: MovieSortType | undefined) => {
  switch (sort) {
    case 'alphabetical': return 'title.asc';
    case 'rating': return 'vote_average.desc';
    case 'releaseDate': return 'primary_release_date.desc';
    default: return 'popularity.desc';
  }
}

export const sortMovieList = (list: MovieType[], sort: MovieSortType, order: MovieSortOrderType) => {
  const tempList = [...list]
  switch (sort) {
    case 'alphabetical':
      return tempList.sort((a, b) => {
        const diff = a.title.localeCompare(b.title);
        return order === 'asc' ? diff : -diff
      })
    case 'rating':
      return tempList.sort((a, b) => {
        const diff = a.vote_average - b.vote_average;
        return order === 'asc' ? diff : -diff
      })
    case 'releaseDate':
      return tempList.sort((a, b) => {
        const diff = a.release_date > b.release_date ? 1 : -1
        return order === 'asc' ? diff : -diff
      })
  }
}

// now playing date is from 35 days before to 6 days after current day
export const getNowPlayingDate = () => {
  const min = new Date();
  min.setDate(min.getDate() - 35)

  const max = new Date();
  max.setDate(max.getDate() + 6)

  return ({
    min: `${min.getFullYear()}-${String(min.getMonth() + 1).padStart(2, '0')}-${String(min.getDate()).padStart(2, '0')}`,
    max: `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, '0')}-${String(max.getDate()).padStart(2, '0')}`,
  })
}

// upcoming date is from 7 days to 28 days after current day
export const getUpcomingDate = () => {
  const min = new Date();
  min.setDate(min.getDate() + 7)

  const max = new Date();
  max.setDate(max.getDate() + 28)

  return ({
    min: `${min.getFullYear()}-${String(min.getMonth() + 1).padStart(2, '0')}-${String(min.getDate()).padStart(2, '0')}`,
    max: `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, '0')}-${String(max.getDate()).padStart(2, '0')}`,
  })
}

export const getPosterUrl = (path: string, size: string = 'w185') => `http://image.tmdb.org/t/p/${size}${path}`
export const getProfileUrl = (path: string) => `http://image.tmdb.org/t/p/w185${path}`
export const getAvatarUrl = (path: string) => `http://image.tmdb.org/t/p/w300${path}`

export const formatReleaseDate = (releaseDate: string) => {
  const date = releaseDate.split('-');
  return `${date[2]}/${date[1]}/${date[0]}`
}