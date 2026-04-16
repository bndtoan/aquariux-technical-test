import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { basicStyles, colors, imageResources } from '../../../themes';

interface HeaderProps {
  onBack: () => void;
}

export default function WatchListHeader({ onBack }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBack}
      >
        <Image source={imageResources.icBack} style={styles.backButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...basicStyles.rowAlignCenter,
    height: 66,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundBlue,
  },
  backButton: {
    width: 32,
    height: 32,
  },
});
