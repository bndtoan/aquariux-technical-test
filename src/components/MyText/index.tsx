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
      size: SizeType;
      children: React.ReactNode;
    } & TextProps;

    function MyText(props: Props) {
      const { color = colors.textBlack, size, children, style, ...anyProps } = props;

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
    MyText.defaultProps = { size: 'text16', };
    return MyText;
  }

  return {
    Bold: createMyText('bold'),
    Medium: createMyText('medium'),
    Regular: createMyText('regular'),
  };
}

export default createTextComponent();