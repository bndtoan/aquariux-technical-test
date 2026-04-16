import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { basicStyles, colors, imageResources, metrics } from '../../themes';
import { formatReleaseDate, getPosterUrl } from '../../utils';
import MyText from '../MyText';

type Props = {
  item: MovieType;
  onPressItem?: () => void;
  onPressDelete?: () => void;
  style?: ViewProps['style'];
};

export default function MovieItem({ item, onPressItem, onPressDelete, style }: Props) {
  const { title, poster_path, overview, release_date } = item;

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]} onPress={onPressItem}>
      <Image source={{ uri: getPosterUrl(poster_path) }} style={styles.poster} />
      <View style={styles.infoContainer}>
        <MyText.SemiBold>{title}</MyText.SemiBold>
        <MyText.Regular size='text14' color={colors.textGrey}>{formatReleaseDate(release_date)}</MyText.Regular>
        <MyText.Regular size='text14' style={styles.overviewText} numberOfLines={2}>{overview}</MyText.Regular>
      </View>
      {onPressDelete && (
        <TouchableOpacity activeOpacity={0.8} style={styles.deleteIcon} onPress={onPressDelete}>
          <Image source={imageResources.icDelete} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: colors.backgroundWhite,
    borderRadius: metrics.radius4,
    overflow: 'hidden',
    marginBottom: metrics.space20,
    ...basicStyles.rowAlignCenter,
    ...basicStyles.shadow
  },
  poster: {
    height: '100%',
    width: 96,
  },
  infoContainer: {
    paddingHorizontal: metrics.space16,
    ...basicStyles.flexJustifyCenter,
  },
  overviewText: {
    marginTop: metrics.space16,
  },
  deleteIcon: {
    position: 'absolute',
    top: metrics.space4,
    right: metrics.space4,
    width: metrics.icon20,
    height: metrics.icon20,
  }
});