import React from 'react';
import { StyleSheet, View } from 'react-native';
import { G, Path, Svg } from 'react-native-svg';

type Props = {
  percent: number,
  size: number,
  backgroundLineWidth: number,
  lineWidth: number,
  children?: React.ReactNode,
}

const COLOR_FILL = '#45FF8F'
const COLOR_BACKGROUND = '#D0D2D366'

export default function CircularProgress(props: Props) {
  const {
    size,
    lineWidth,
    percent = 0,
    backgroundLineWidth = 10,
    children = null,
  } = props;
  const halfSize = size / 2;

  // consts
  const maxWidthCircle = backgroundLineWidth ? Math.max(lineWidth, backgroundLineWidth) : lineWidth;
  const radius = size / 2 - maxWidthCircle / 2;
  const offset = size - maxWidthCircle * 2;
  const clampFill = (number: number) => Math.min(100, Math.max(0, number));
  const currentFillAngle = (360 * clampFill(percent)) / 100;

  // path calc
  const polarToCartesian = (
    centerX: number, centerY: number, angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const createCirclePath = (
    x: number, y: number, startAngle: number, endAngle: number,
  ) => {
    const start = polarToCartesian(x, y, endAngle - 1);
    const end = polarToCartesian(x, y, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  };
  const circlePath = createCirclePath(halfSize, halfSize, 0, currentFillAngle);
  const backgroundPath = createCirclePath(halfSize, halfSize, 0, 360);

  return (
    <View style={{}}>
      <Svg width={size} height={size}>
        <G rotation={0} originX={(size) / 2} originY={size / 2}>
          {
            <Path
              d={backgroundPath}
              stroke={COLOR_BACKGROUND}
              strokeWidth={backgroundLineWidth || lineWidth}
              strokeLinecap={'round'}
              fill="transparent"
            />
          }
          {
            Number(percent) > 0 ? (
              <Path
                d={circlePath}
                stroke={COLOR_FILL}
                strokeWidth={lineWidth}
                strokeLinecap={'round'}
                fill="transparent"
              />
            ) : null
          }
        </G>
      </Svg>
      {
        children
          ? (
            <View style={[
              styles.childrenStyle,
              {
                left: maxWidthCircle,
                top: maxWidthCircle,
                width: offset,
                height: offset,
                borderRadius: offset / 2,
              },
            ]}
            >
              {children}
            </View>
          ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  childrenStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
