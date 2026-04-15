import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  icon: ImageSourcePropType;
};

export default function TabBarIcon({ icon }: Props) {
  return (
    <Image source={icon} resizeMode='contain' />
  );
}
