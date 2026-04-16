import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, colors, metrics, strings } from '../../../themes';

type Props = {
  isFetching: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
};

export default function ListFooter({ isFetching, canLoadMore, onLoadMore }: Props) {
  if (isFetching) return <ActivityIndicator style={styles.container} />

  if (canLoadMore) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.container, styles.loadMoreButton]} onPress={onLoadMore}>
        <MyText.Bold size='text20' color={colors.textWhite}>{strings.loadMore}</MyText.Bold>
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: metrics.space20
  },
  loadMoreButton: {
    width: '100%',
    borderRadius: metrics.radius4,
    backgroundColor: colors.primary,
    ...basicStyles.center,
  }
});