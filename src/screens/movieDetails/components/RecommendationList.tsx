import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, metrics, strings } from '../../../themes';
import { getPosterUrl } from '../../../utils';

type Props = {
  recommendations: MovieType[];
};

export default function RecommendationList({ recommendations }: Props) {
  if (!recommendations.length) return null;

  return (
    <View style={styles.container}>
      <MyText.SemiBold size='text22' style={styles.title}>{strings.recommendations}</MyText.SemiBold>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={recommendations}
        renderItem={({ item }) => {
          const { poster_path, title, vote_average } = item;
          const scoreText = `${Math.floor(vote_average * 10)}%`
          return (
            <View style={styles.recommendItem}>
              <Image source={{ uri: getPosterUrl(poster_path, 'w342') }} style={styles.poster} />
              <View style={basicStyles.row}>
                <View style={styles.movieTitle}>
                  <MyText.Regular size='text18' numberOfLines={1}>{title}</MyText.Regular>
                </View>
                <MyText.Regular size='text18'>{scoreText}</MyText.Regular>
              </View>
            </View>
          )
        }}
        ItemSeparatorComponent={<View style={{ width: metrics.space16 }} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
}

const ITEM_WIDTH = 286

const styles = StyleSheet.create({
  container: {
    paddingTop: metrics.space24,
    paddingBottom: metrics.space32,
  },
  title: {
    marginLeft: metrics.space24,
  },
  listContent: {
    padding: metrics.space20
  },
  recommendItem: {
    width: ITEM_WIDTH,
  },
  poster: {
    width: ITEM_WIDTH,
    height: 162,
    borderRadius: metrics.radius4,
    overflow: 'hidden',
    marginBottom: metrics.space4,
  },
  movieTitle: {
    flex: 1,
    marginRight: metrics.space12,
  }
});