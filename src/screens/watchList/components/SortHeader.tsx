import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MyText } from '../../../components';
import { basicStyles, colors, imageResources, metrics, strings } from '../../../themes';

type Props = {
  sortBy: MovieSortType;
  sortOrder: MovieSortOrderType;
  onChange: (sort: MovieSortType, order: MovieSortOrderType) => void;
};

const sortData: { value: MovieSortType, label: string }[] = [
  { label: strings.alphabetical, value: 'alphabetical' },
  { label: strings.rating, value: 'rating' },
  { label: strings.release, value: 'releaseDate' },
];

export default function SortHeader({ sortBy, sortOrder, onChange }: Props) {

  const onChangeSort = (item: any) => onChange(item.value, sortOrder)
  const onChangeOrder = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc'
    onChange(sortBy, order)
  }

  return (
    <View style={styles.container}>
      <MyText.Regular color={colors.textGreyDark}>{strings.fitlerBy}</MyText.Regular>
      <Dropdown
        style={styles.sortDropDown}
        selectedTextStyle={styles.sortText}
        iconStyle={{ tintColor: colors.primary }}
        data={sortData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={sortBy}
        onChange={onChangeSort}
      />
      <MyText.Regular color={colors.textGreyDark}>{strings.order}</MyText.Regular>
      <TouchableOpacity activeOpacity={0.8} onPress={onChangeOrder}>
        <Image
          source={imageResources.icArrowUp}
          style={[
            styles.arrowIcon,
            sortOrder === 'asc' && { transform: [{ rotate: "180deg" }] }
          ]}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: metrics.space20,
    marginBottom: metrics.space32,
    marginHorizontal: metrics.space28,
    ...basicStyles.rowAlignCenter,
  },
  sortDropDown: {
    width: 126,
    height: 28,
    marginHorizontal: metrics.space16,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  sortText: {
    fontFamily: 'SourceSans3-SemiBold',
    fontSize: 16,
    color: colors.primary
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: metrics.space4,
  },
});