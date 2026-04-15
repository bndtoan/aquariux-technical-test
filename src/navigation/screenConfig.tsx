import { MovieDetailsScreen } from "../screens";
import TabsNavigator from "./tabsNavigator";
import { ConfigsType, RootStackParamList } from "./types";

export const screenConfig: ConfigsType<RootStackParamList> = [
  {
    name: 'tabs',
    component: TabsNavigator,
    options: { headerShown: false },
  },
  {
    name: 'movieDetails',
    component: MovieDetailsScreen,
  },
]