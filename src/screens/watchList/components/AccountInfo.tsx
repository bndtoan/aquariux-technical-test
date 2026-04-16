import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, colors, metrics } from '../../../themes';
import { getAvatarUrl } from '../../../utils';

interface HeaderProps {
  account: AccountType | undefined;
}

export default function AccountInfo({ account }: HeaderProps) {
  const { username = '', avatar } = account || {};
  const avatarPath = avatar?.tmdb?.avatar_path;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatarPath
          ? <Image source={{ uri: getAvatarUrl(avatarPath) }} style={styles.avatar} />
          : <MyText.SemiBold size='text24' color={colors.textWhite}>{username[0] || ''}</MyText.SemiBold>}
      </View>
      <View style={basicStyles.flex}>
        <MyText.Bold size='text20' color={colors.textWhite}>{username}</MyText.Bold>
        {/* Member's joined date is not exposed in the api */}
        <MyText.Regular color={colors.textWhiteLight}>Member since...</MyText.Regular>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 64;
const styles = StyleSheet.create({
  container: {
    ...basicStyles.rowAlignCenter,
    paddingHorizontal: metrics.space28,
    paddingBottom: metrics.space32,
    marginBottom: metrics.space32,
    backgroundColor: colors.backgroundBlue,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#9747FF',
    marginRight: metrics.space24,
    ...basicStyles.center,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  }
});
