import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CircularProgress, MyText } from '../../../components';
import { basicStyles, colors, metrics } from '../../../themes';

type Props = {
  score: number
};

export default function UserScore({ score }: Props) {
  const percent = Math.floor(score * 10)
  return (
    <View style={styles.container}>
      <CircularProgress size={52} lineWidth={4} backgroundLineWidth={4} percent={percent}>
        <View style={styles.percentContainer}>
          <MyText.Bold size='text20' color={colors.textWhite}>{percent}</MyText.Bold>
          <MyText.Bold size='text6' color={colors.textWhite} style={styles.percent}>%</MyText.Bold>
        </View>
      </CircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundBlue,
    marginBottom: metrics.space8,
    ...basicStyles.center,
  },
  percentContainer: {
    flexDirection: 'row',
  },
  percent: {
    marginTop: 4,
  }
});