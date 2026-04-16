import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MyText, MyTextInput } from '../../../components';
import { basicStyles, colors, metrics, strings } from '../../../themes';
import CollapsiblePicker, { PickerOption } from './CollapsiblePicker';

type Props = {
  onOptionChange: (
    filter: MovieFilterType,
    sort: MovieSortType | undefined,
    search: string,
  ) => void;
};

type RefType = {
  setInitialSort: (sort: MovieSortType) => void;
};

export const filterOptions: PickerOption<MovieFilterType>[] = [
  { value: 'nowPlaying', label: strings.nowPlaying },
  { value: 'upcoming', label: strings.upcoming },
  { value: 'popular', label: strings.popular },
]

const sortOptions: PickerOption<MovieSortType>[] = [
  { value: 'alphabetical', label: strings.byAlphabetical },
  { value: 'rating', label: strings.byRating },
  { value: 'releaseDate', label: strings.byRelease },
]

export default React.forwardRef<RefType, Props>(function ListHeader({ onOptionChange }, ref) {
  const [search, setSearch] = React.useState<string>('');
  const [filterBy, setFilterBy] = React.useState<PickerOption<MovieFilterType>>(filterOptions[0]);
  const [sortBy, setSortBy] = React.useState<PickerOption<MovieSortType>>();

  React.useImperativeHandle(ref, () => ({
    setInitialSort: (sort) => {
      const option = sortOptions.find(option => option.value === sort);
      setSortBy(option);
    }
  }))

  return (
    <>
      <CollapsiblePicker<MovieFilterType>
        selectedOption={filterBy}
        options={filterOptions}
        onSelectValue={(option) => {
          setFilterBy(option)
          onOptionChange(option.value, sortBy?.value, search)
        }}
      />
      <CollapsiblePicker<MovieSortType>
        selectedOption={sortBy}
        options={sortOptions}
        placeholder={strings.sortBy}
        onSelectValue={(option) => {
          setSortBy(option)
          onOptionChange(filterBy.value, option.value, search)
        }}
      />
      <View style={styles.searchContainer}>
        <MyTextInput
          style={basicStyles.flex}
          value={search}
          onChangeText={setSearch}
          placeholder={strings.searchPlaceholder}
          placeholderTextColor={colors.textBlack}
        />
      </View>
      <TouchableOpacity
        disabled={!search}
        style={[styles.searchButton, { backgroundColor: search ? colors.primary : colors.backgroundGrey }]}
        onPress={() => onOptionChange(filterBy.value, sortBy?.value, search)}
      >
        <MyText.SemiBold color={search ? colors.textWhite : colors.textBlackLight}>{strings.search}</MyText.SemiBold>
      </TouchableOpacity>
    </>
  )
})

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    height: 50,
    borderRadius: metrics.radius4,
    backgroundColor: colors.backgroundWhite,
    marginBottom: metrics.space20,
    paddingLeft: metrics.space16,
    paddingRight: 36,
    ...basicStyles.rowAlignCenter,
    ...basicStyles.shadow,
  },
  searchButton: {
    height: 50,
    borderRadius: 40,
    marginBottom: 44,
    ...basicStyles.center,
  }
});