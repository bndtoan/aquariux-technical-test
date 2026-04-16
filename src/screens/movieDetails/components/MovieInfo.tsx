import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyText } from '../../../components';
import { basicStyles, colors, imageResources, metrics, strings } from '../../../themes';
import { formatReleaseDate, getPosterUrl } from '../../../utils';
import UserScore from './UserScore';

export type CrewData = Record<number, { name: string, jobs: string[] }>;

type Props = {
  movieItem: MovieDetailsType;
  crews: CrewData;
  isWatchListed: boolean;
  onToggleWatchList: () => void;
};

export default function MovieInfo({ movieItem, crews, isWatchListed, onToggleWatchList }: Props) {

  const { poster_path, release_dates, origin_country,
    release_date, runtime, genres, status, original_language,
    vote_average, tagline, overview
  } = movieItem || {};

  // Find the certification rating of the cinema release (type 3) from the same country of origin 
  const contentRating = React.useMemo(() => {
    const releaseInfo = release_dates.results.find(item => item.iso_3166_1 === origin_country[0])
    return releaseInfo?.release_dates.find(item => item.type === 3 && !!item.certification)?.certification || 'PG13'
  }, [])

  const releaseDateText = React.useMemo(() => {
    const runtimeH = Math.floor(runtime / 60);
    const runtimeM = runtime % 60;
    return `${formatReleaseDate(release_date)} (${origin_country})  •  ${runtimeH}h ${runtimeM}m`
  }, [])

  const genresText = React.useMemo(() => {
    return genres.map(genre => genre.name).join(', ')
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={{ uri: getPosterUrl(poster_path) }} style={styles.poster} />
        <View style={styles.infoContainer}>
          <View style={styles.contentRating}>
            <MyText.Regular color={colors.textWhiteLight}>{contentRating}</MyText.Regular>
          </View>
          <MyText.Regular color={colors.textWhite}>{releaseDateText}</MyText.Regular>
          <MyText.Regular color={colors.textWhite}>{genresText}</MyText.Regular>
          <View style={basicStyles.row}>
            <MyText.SemiBold color={colors.textWhite}>{strings.status}</MyText.SemiBold>
            <MyText.Regular color={colors.textWhite} style={basicStyles.flex}>{status}</MyText.Regular>
          </View>
          <View style={basicStyles.row}>
            <MyText.SemiBold color={colors.textWhite}>{strings.originalLanguage}</MyText.SemiBold>
            <MyText.Regular color={colors.textWhite} style={basicStyles.flex}>{original_language}</MyText.Regular>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={basicStyles.row}>
          <View style={basicStyles.flex}>
            <UserScore score={vote_average} />
            <MyText.Bold size='text18' color={colors.textWhite}>{strings.userScore}</MyText.Bold>
          </View>

          <View style={styles.crewContainer}>
            {Object.entries(crews).map(([id, crew]) => (
              <View key={id}>
                <MyText.SemiBold color={colors.textWhite}>{crew.name}</MyText.SemiBold>
                <MyText.Regular color={colors.textWhite}>{crew.jobs.join(', ')}</MyText.Regular>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.space} />

        {!!tagline && (
          <MyText.Italic size='text20' color={colors.textWhite} style={styles.tagLine}>{tagline}</MyText.Italic>
        )}
        <MyText.Bold size='text24' color={colors.textWhite}>{strings.overview}</MyText.Bold>
        <MyText.Regular color={colors.textWhite} style={styles.overview}>{overview}</MyText.Regular>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.watchListButton, isWatchListed ? styles.watchListButtonEnabled : styles.watchListButtonDisabled]}
          onPress={onToggleWatchList}
        >
          <Image
            source={imageResources.icBookmark}
            style={styles.watchListIcon}
            resizeMode='contain'
            tintColor={isWatchListed ? colors.primary : colors.textWhite}
          />
          <MyText.SemiBold size='text18' color={isWatchListed ? colors.primary : colors.textWhite}>
            {isWatchListed ? strings.removeFromWatchList : strings.addToWatchList}
          </MyText.SemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  topContainer: {
    flexDirection: 'row',
    padding: metrics.space24,
    backgroundColor: '#00000026'
  },
  poster: {
    height: 150,
    width: 112,
    marginRight: metrics.space20,
    borderRadius: metrics.radius4,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    gap: metrics.space8,
  },
  contentRating: {
    paddingVertical: metrics.space4,
    paddingHorizontal: metrics.space8,
    borderRadius: metrics.radius4,
    borderWidth: 1,
    borderColor: colors.textWhiteLight,
  },
  bottomContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: metrics.space24,
    paddingVertical: metrics.space32,
  },
  crewContainer: {
    flex: 1,
    gap: metrics.space16,
  },
  tagLine: {
    marginBottom: metrics.space16,
  },
  overview: {
    marginTop: metrics.space12,
    marginBottom: metrics.space32,
  },
  space: {
    height: metrics.space32,
  },
  watchListButton: {
    borderRadius: metrics.radius4,
    paddingHorizontal: metrics.space16,
    paddingVertical: metrics.space8,
    ...basicStyles.rowAlignCenter,
  },
  watchListButtonDisabled: {
    borderWidth: 1,
    borderColor: colors.textWhite,
    backgroundColor: colors.primary,
  },
  watchListButtonEnabled: {
    backgroundColor: colors.backgroundWhite,
  },
  watchListIcon: {
    width: 16,
    height: 16,
    marginRight: metrics.space12,
  }
});