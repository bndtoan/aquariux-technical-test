import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, colors, metrics, strings } from '../../../themes';
import { getProfileUrl } from '../../../utils';

type Props = {
  casts: CastType[];
};

export default function CastList({ casts }: Props) {
  if (!casts.length) return null;

  return (
    <View style={styles.container}>
      <MyText.SemiBold size='text22' style={styles.title}>{strings.topBilledCast}</MyText.SemiBold>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={casts}
        renderItem={({ item }) => {
          const { profile_path, name, character } = item;
          return (
            <View style={styles.castItem}>
              <Image source={{ uri: getProfileUrl(profile_path) }} style={styles.castImage} />
              <View style={styles.castInfo}>
                <MyText.Bold size='text18' numberOfLines={2}>{name}</MyText.Bold>
                <MyText.Regular numberOfLines={1}>{character}</MyText.Regular>
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

const IMAGE_WIDTH = 140

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: metrics.space32,
    borderBottomWidth: 2,
    borderColor: colors.border,
  },
  title: {
    marginLeft: metrics.space24,
  },
  listContent: {
    padding: metrics.space20
  },
  castItem: {
    width: IMAGE_WIDTH,
    height: 244,
    borderRadius: metrics.radius4,
    overflow: 'hidden',
    backgroundColor: colors.backgroundWhite,
    ...basicStyles.shadow,
  },
  castImage: {
    width: IMAGE_WIDTH,
    height: 154,
    overflow: 'hidden',
  },
  castInfo: {
    paddingHorizontal: metrics.space12,
    paddingVertical: metrics.space8,
  }
});