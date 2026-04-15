import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, WatchListScreen } from '../screens';
import { TabParamTypes } from './types';

const Tab = createBottomTabNavigator<TabParamTypes>();
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ lazy: true }}
      initialRouteName='homeTab'
    >
      <Tab.Screen name="homeTab" component={HomeScreen} />
      <Tab.Screen name="watchListTab" component={WatchListScreen} />
    </Tab.Navigator>
  );
}