import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { basicStyles, colors, imageResources, metrics } from '../../themes';
import { getPosterUrl } from '../../utils';
import MyText from '../MyText';

type Props = {
  item: MovieType;
  onPressDelete?: () => void;
};

export default function index({ item, onPressDelete }: Props) {
  const { title, poster_path, overview, release_date } = item;
  console.log(getPosterUrl(poster_path))

  return (
    <View style={styles.container}>
      <Image source={{ uri: getPosterUrl(poster_path) }} style={styles.poster} />
      <View style={basicStyles.flexJustifyCenter}>
        <MyText.SemiBold>{title}</MyText.SemiBold>
        <MyText.Regular size='text14' color={colors.textGrey}>{release_date}</MyText.Regular>
        <MyText.Regular size='text14' style={styles.overviewText} numberOfLines={2}>{overview}</MyText.Regular>
      </View>
      {onPressDelete && (
        <TouchableOpacity activeOpacity={0.8} style={styles.deleteIcon} onPress={onPressDelete}>
          <Image source={imageResources.icDelete} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: colors.backgroundWhite,
    borderRadius: metrics.radius4,
    ...basicStyles.rowAlignCenter,
    ...basicStyles.shadow
  },
  poster: {
    height: '100%',
    width: 96,
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