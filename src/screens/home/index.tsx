import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MovieItem, MyText } from '../../components';
import api from '../../core/api';
import { NativeStackNavigationChildren } from '../../navigation/types';
import { basicStyles, colors, metrics, strings } from '../../themes';
import ListFooter from './components/ListFooter';
import ListHeader, { filterOptions } from './components/ListHeader';

type Props = {
  navigation: NativeStackNavigationChildren;
}

type States = {
  isFetching: boolean;
  isRefreshing: boolean;
  canLoadMore: boolean;
  dataList: MovieType[];
};

export default function HomeScreen({ navigation }: Props) {
  const page = React.useRef<number>(1);
  const filterBy = React.useRef<MovieFilterType>(filterOptions[0].value);
  const sortBy = React.useRef<MovieSortType | undefined>(undefined);
  const searchQuery = React.useRef<string>('');
  const [state, setState] = React.useState<States>({
    isRefreshing: false,
    isFetching: false,
    canLoadMore: true,
    dataList: [],
  });

  React.useEffect(() => {
    requesMovieList();
  }, [])

  const setNewState = (next: Partial<States>) => setState((prev) => ({ ...prev, ...next }))

  const requesMovieList = async (isRefreshing: boolean = false) => {
    if (isRefreshing) {
      page.current = 1
      setNewState({ isRefreshing: true });
    } else {
      setNewState({ isFetching: true, ...(page.current === 1 ? { dataList: [] } : {}) });
    }

    const response = await api.requestMovieList(page.current, filterBy.current, sortBy.current, searchQuery.current)

    if (response.ok) {
      const movies = response?.data?.results || [];
      const totalPages = response?.data?.total_pages || 0;
      setNewState({
        isFetching: false,
        isRefreshing: false,
        dataList: page.current === 1 ? movies : [...state.dataList, ...movies],
        canLoadMore: page.current < totalPages,
      });
      page.current += 1;
    } else {
      setNewState({
        isFetching: false,
        isRefreshing: false,
        canLoadMore: false,
      });
    }

  };

  const handleRefresh = () => {
    requesMovieList(true);
  };

  const handleLoadMore = () => {
    const { canLoadMore, isRefreshing } = state;
    if (canLoadMore && !isRefreshing) {
      requesMovieList();
    }
  };

  const handleOptionChange = (
    filter: MovieFilterType,
    sort: MovieSortType | undefined,
    search: string,
  ) => {
    filterBy.current = filter;
    sortBy.current = sort;
    searchQuery.current = search;
    page.current = 1;
    requesMovieList();
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={state.dataList}
      refreshing={state.isRefreshing}
      onRefresh={handleRefresh}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieItem
          item={item}
          onPressItem={() => {
            navigation.navigate(
              'movieDetails',
              { id: item.id, title: item.title, releaseDate: item.release_date },
            );
          }}
        />
      )}
      ListHeaderComponent={
        <ListHeader onOptionChange={handleOptionChange} />
      }
      ListFooterComponent={
        <ListFooter
          isFetching={state.isFetching}
          canLoadMore={state.canLoadMore}
          onLoadMore={handleLoadMore}
        />
      }
      ListEmptyComponent={
        !state.isFetching ? (
          <View style={basicStyles.flexAlignCenter}>
            <MyText.Italic size='text14' color={colors.textGrey} style={basicStyles.textAlignCenter}>
              {strings.noMovie}
            </MyText.Italic>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: metrics.space28,
  },
});
