import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { basicStyles, imageResources } from '../../themes';

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image source={imageResources.logoMovieDB} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    ...basicStyles.center,
  },
  logo: {
    width: 80,
    height: 58,
  }
});