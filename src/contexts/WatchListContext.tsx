import asyncStorage from "../core/asyncStorage";
import { createContext } from "../core/context";
import { sortMovieList } from "../utils";

type ContextValueType = {
  sortBy: MovieSortType;
  sortOrder: MovieSortOrderType;
  watchList: MovieType[];
}

type ContextActionType = {
  setData: (data: MovieType[]) => void,
  addMovie: (movie: MovieType) => void;
  removeMovie: (id: number) => void,
  sortMovieList: (sort: MovieSortType, order: MovieSortOrderType) => void,
};

export const defaultValue: ContextValueType = {
  sortBy: 'alphabetical',
  sortOrder: 'asc',
  watchList: [],
};

export default createContext<ContextValueType, ContextActionType>(
  defaultValue,
  () => ({
    setData: (state, data) => ({ ...state, watchList: sortMovieList(data, 'alphabetical', 'asc') }),
    addMovie: (state, movie) => {
      const newState: ContextValueType = {
        ...state,
        watchList: sortMovieList([...state.watchList, movie], state.sortBy, state.sortOrder)
      }
      asyncStorage.set('WATCH_LIST', newState.watchList);
      return newState;
    },
    removeMovie: (state, id) => {
      const newState: ContextValueType = {
        ...state,
        watchList: state.watchList.filter((movie) => movie.id !== id)
      }
      asyncStorage.set('WATCH_LIST', newState.watchList);
      return newState;
    },
    sortMovieList: (state, sort, order) => ({
      ...state,
      sortBy: sort,
      sortOrder: order,
      watchList: sortMovieList(state.watchList, sort, order)
    })

  }),
);
