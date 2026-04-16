import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, colors, imageResources, metrics } from '../../../themes';

interface HeaderProps {
  title: string;
  releaseDate: string;
  onBack: () => void;
}

export default function TitleHeader({ title, releaseDate, onBack }: HeaderProps) {
  const releaseYear = React.useMemo(() => releaseDate.slice(0, 4), []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundOverlay} />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButtonContainer}
        onPress={onBack}
      >
        <Image source={imageResources.icBack} style={styles.backButton} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <MyText.SemiBold size='text24' color={colors.textWhite} style={{ flexShrink: 1 }} numberOfLines={1}>
          {title}
        </MyText.SemiBold>
        <MyText.Regular size='text20' color={colors.textWhite}>{`(${releaseYear})`}</MyText.Regular>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...basicStyles.rowAlignCenter,
    height: 66,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000026'
  },
  backButtonContainer: {
    marginRight: metrics.space8,
  },
  backButton: {
    width: 32,
    height: 32,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 8,
    marginRight: 40 // back button width + spacing
  },
});
