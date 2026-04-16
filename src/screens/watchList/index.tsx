import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MovieItem, MyText } from '../../components';
import WatchListContext from '../../contexts/WatchListContext';
import api from '../../core/api';
import { NativeStackNavigationChildren } from '../../navigation/types';
import { basicStyles, colors, metrics, strings } from '../../themes';
import AccountInfo from './components/AccountInfo';
import SortHeader from './components/SortHeader';
import WatchListHeader from './components/WatchListHeader';

type Props = {
  navigation: NativeStackNavigationChildren;
}

export default function WatchListScreen({ navigation }: Props) {
  const watchListContext = WatchListContext.useContext();
  const { sortBy, sortOrder, watchList } = watchListContext;

  const [account, setAccount] = React.useState<AccountType>();

  React.useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = async () => {
    const response = await api.requestAccountInfo();
    if (response.ok) {
      setAccount(response.data)
    }
  }

  return (
    <View style={styles.container} >
      <WatchListHeader onBack={navigation.goBack} />
      <FlatList
        style={styles.container}
        data={watchList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem
            style={styles.movieItem}
            item={item}
            onPressItem={() => {
              navigation.navigate(
                'movieDetails',
                { id: item.id, title: item.title, releaseDate: item.release_date },
              );
            }}
            onPressDelete={() => watchListContext.removeMovie(item.id)}
          />
        )}
        ListHeaderComponent={
          <>
            <AccountInfo account={account} />
            <MyText.Bold size='text18' style={styles.watchListText}>{strings.myWatchList}</MyText.Bold>
            <SortHeader
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={(sort, order) => watchListContext.sortMovieList(sort, order)}
            />
          </>
        }
        ListEmptyComponent={
          <View style={basicStyles.center}>
            <MyText.Italic size='text14' color={colors.textGrey} style={basicStyles.textAlignCenter}>
              {strings.noData}
            </MyText.Italic>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  movieItem: {
    marginHorizontal: metrics.space28,
  },
  watchListText: {
    marginHorizontal: metrics.space28,
  }
});
