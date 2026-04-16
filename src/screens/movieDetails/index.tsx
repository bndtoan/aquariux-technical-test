import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { MyText } from "../../components";
import WatchListContext from "../../contexts/WatchListContext";
import api from "../../core/api";
import { ScreenPropsType } from "../../navigation/types";
import { basicStyles, colors, strings } from "../../themes";
import CastList from "./components/CastList";
import MovieInfo from "./components/MovieInfo";
import RecommendationList from "./components/RecommendationList";
import TitleHeader from "./components/TitleHeader";

type States = {
  isFetching: boolean;
  movieDetails?: MovieDetailsType;
  casts: CastType[];
  crews: CrewType[];
  recommendations: MovieType[];
}


export default function MovieDetails({ navigation, route }: ScreenPropsType<'movieDetails'>) {
  const watchListContext = WatchListContext.useContext();

  const { id, title, releaseDate } = route.params;

  const [state, setState] = React.useState<States>({
    isFetching: true,
    movieDetails: undefined,
    casts: [],
    crews: [],
    recommendations: [],
  });

  React.useEffect(() => {
    getMovieDetails();
  }, []);

  const setNewState = (next: Partial<States>) => setState((prev) => ({ ...prev, ...next }))

  const getMovieDetails = async () => {
    const [detailsRes, creditsRes, recRes] = await Promise.all([
      api.requestMovieDetails(id),
      api.requestMovieCredits(id),
      api.requestMovieRecommendations(id),
    ]);

    if (detailsRes.ok) {
      const casts = creditsRes.data?.cast || [];
      const crews = (creditsRes.data?.crew || []).filter(
        (crew) => crew.job?.includes('Director') || crew.job?.includes('Writer')
      )

      setNewState({
        isFetching: false,
        movieDetails: detailsRes.data,
        casts: casts,
        crews: crews,
        recommendations: recRes.data?.results || [],
      })
    } else {
      setNewState({ isFetching: false })
    }
  };

  const isWatchListed = watchListContext.watchList.findIndex(movie => movie.id === id) !== -1
  const toggleWatchList = () => {
    if (!isWatchListed) {
      const { poster_path = '', release_date = '', vote_average = 0, overview = '' } = state.movieDetails || {};
      watchListContext.addMovie({ id, poster_path, release_date, title, vote_average, overview })
    } else {
      watchListContext.removeMovie(id)
    }
  }

  const renderContent = () => {
    if (state.isFetching) {
      return <ActivityIndicator style={basicStyles.flexCenter} />
    }

    if (!state.movieDetails) {
      return (
        <MyText.Italic size='text14' color={colors.textGrey} style={basicStyles.textAlignCenter}>
          {strings.noData}
        </MyText.Italic>
      );
    }

    return (
      <ScrollView style={basicStyles.flex}>
        <MovieInfo
          movieItem={state.movieDetails}
          crews={state.crews}
          isWatchListed={isWatchListed}
          onToggleWatchList={toggleWatchList}
        />

        <CastList casts={state.casts} />
        <RecommendationList recommendations={state.recommendations} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <TitleHeader title={title} releaseDate={releaseDate} onBack={navigation.goBack} />
      {renderContent()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite
  },
});