import { NavigationContainerRefWithCurrent, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamTypes = {
  homeTab: undefined;
  watchListTab: undefined;
};

export type RootStackParamList = {
  tabs: undefined;
  movieDetails: undefined
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

type ScreenViewType = ReturnType<typeof createNativeStackNavigator<RootStackParamList>>['Screen'];
type ScreenViewPropsType = Parameters<ScreenViewType>[0];

export type ConfigsType<ParamList extends ParamListBase> = (ScreenViewPropsType & {
  name: keyof ParamList;
  options: NativeStackNavigationOptions;
})[];
export type ScreenPropsType<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type RootNavigationType = NavigationContainerRefWithCurrent<RootStackParamList>;
export type NativeStackNavigationChildrenFull = NativeStackNavigationProp<RootStackParamList>;
export type NativeStackNavigationChildren = Omit<NativeStackNavigationChildrenFull, 'setParams'>;