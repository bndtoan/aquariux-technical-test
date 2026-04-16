import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors } from '../../themes';
import { textLineHeight, textSize, textStyle } from '../../themes/typography';

export default function MyTextInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput style={[styles.textInput, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: textStyle.semibold,
    fontSize: textSize.text16,
    lineHeight: textLineHeight.text16,
    color: colors.textBlack,
  },
});