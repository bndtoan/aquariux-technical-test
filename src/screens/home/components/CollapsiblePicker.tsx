import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MyText } from "../../../components";
import { basicStyles, colors, imageResources, metrics } from "../../../themes";

export type PickerOption<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  selectedOption: PickerOption<T> | undefined;
  placeholder?: string;
  options: PickerOption<T>[];
  onSelectValue: (value: PickerOption<T>) => void;
};

export default function CollapsiblePicker<T extends string>({
  selectedOption,
  placeholder,
  options,
  onSelectValue,
}: Props<T>) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  const handleSelect = (val: PickerOption<T>) => {
    onSelectValue(val);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity activeOpacity={0.8} style={styles.header} onPress={toggle}>
        <MyText.SemiBold style={basicStyles.flex}>
          {selectedOption?.label ?? placeholder}
        </MyText.SemiBold>

        <Image
          source={imageResources.icArrowRight}
          style={[
            styles.icon,
            expanded && { transform: [{ rotate: "90deg" }] },
          ]}
        />
      </TouchableOpacity>

      {/* Options */}
      {expanded && (
        <View style={styles.optionsContainer}>
          {options.map(option => {
            const isSelected = option.value === selectedOption?.value;
            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.8}
                style={[styles.option, { backgroundColor: isSelected ? colors.primary : colors.backgroundGrey }]}
                onPress={() => handleSelect(option)}
              >
                <MyText.Regular size="text14" color={isSelected ? colors.textWhite : colors.textBlack}>
                  {option.label}
                </MyText.Regular>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: metrics.radius4,
    backgroundColor: colors.backgroundWhite,
    marginBottom: metrics.space16,
    ...basicStyles.shadow,
  },
  header: {
    height: 50,
    paddingHorizontal: metrics.space16,
    ...basicStyles.rowCenter,
  },
  icon: {
    width: metrics.icon20,
    height: metrics.icon20,
    marginLeft: metrics.space8
  },
  optionsContainer: {
    paddingVertical: metrics.space20,
    paddingHorizontal: metrics.space16,
    gap: metrics.space8,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  option: {
    paddingVertical: metrics.space8,
    paddingHorizontal: metrics.space16,
    borderRadius: metrics.radius4,
  },
});