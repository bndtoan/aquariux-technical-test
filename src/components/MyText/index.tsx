import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../../themes';
import { SizeType, StyleType, textLineHeight, textSize, textStyle } from '../../themes/typography';


function createTextComponent(
  styleConfig: Record<StyleType, string> = textStyle,
  sizeConfig: Record<SizeType, number> = textSize,
  lineHeighConfig: Record<SizeType, number> = textLineHeight
) {
  function createMyText(textStyle: StyleType) {
    type Props = {
      color?: string;
      size?: SizeType;
      children: React.ReactNode;
    } & TextProps;

    function MyText(props: Props) {
      const { color = colors.textBlack, size = 'text16', children, style, ...anyProps } = props;

      return (
        <Text
          {...anyProps}
          style={[
            {
              color,
              fontSize: sizeConfig[size],
              fontFamily: styleConfig[textStyle],
              lineHeight: lineHeighConfig[size],
            },
            style,
          ]}
        >
          {children}
        </Text>
      );
    }
    return MyText;
  }

  return {
    Bold: createMyText('bold'),
    SemiBold: createMyText('semibold'),
    Regular: createMyText('regular'),
    Italic: createMyText('italic'),
  };
}

export default createTextComponent();