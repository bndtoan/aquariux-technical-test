import React from 'react';
import { View, StyleSheet, TextInputProps, TextInput } from 'react-native';
import { metrics, colors } from '../../themes';
import { textLineHeight, textSize, textStyle } from '../../themes/typography';

export default function MyTextInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput style={[styles.textInput, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: textStyle.regular,
    fontSize: textSize.text14,
    lineHeight: textLineHeight.text14,
    color: colors.textWhite,
  },
});