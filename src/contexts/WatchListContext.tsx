import asyncStorage from "../core/asyncStorage";
import { createContext } from "../core/context";

type ContextValueType = {
  watchList: MovieType[];
}

type ContextActionType = {
  setData: (data: MovieType[]) => void,
  addMovie: (movie: MovieType) => void;
  removeMovie: (id: number) => void,
};

export const defaultValue: ContextValueType = {
  watchList: [],
};

export default createContext<ContextValueType, ContextActionType>(
  defaultValue,
  () => ({
    setData: (_, data) => ({ watchList: data.sort((a, b) => a.title - b.title) }),
    addMovie: (state, movie) => {
      const newState: ContextValueType = {
        watchList: [...state.watchList, movie]
      }
      asyncStorage.set('WATCH_LIST', newState.watchList);
      return newState;
    },
    removeMovie: (state, id) => {
      const newState: ContextValueType = {
        watchList: state.watchList.filter((movie) => movie.id !== id)
      }
      asyncStorage.set('WATCH_LIST', newState.watchList);
      return newState;
    },
  }),
);
