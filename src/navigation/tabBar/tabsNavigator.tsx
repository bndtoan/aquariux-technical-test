import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ImageSourcePropType, StyleSheet } from 'react-native';
import { HomeScreen, WatchListScreen } from '../../screens';
import { basicStyles, colors, imageResources } from '../../themes';
import { TabParamTypes } from '../types';
import TabBarIcon from './TabBarIcon';

type TabConfig = {
  name: keyof TabParamTypes;
  icon: ImageSourcePropType;
  component: (props: any) => React.ReactNode;
  options: BottomTabNavigationOptions
}

const tabConfis: TabConfig[] = [
  { name: 'homeTab', icon: imageResources.icHome, component: HomeScreen, options: {} },
  { name: 'watchListTab', icon: imageResources.icWatchList, component: WatchListScreen, options: {} },
]

const Tab = createBottomTabNavigator<TabParamTypes>();
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true, headerShown: false, tabBarShowLabel: false,
        tabBarStyle: styles.tabBarContainer, tabBarItemStyle: basicStyles.rowAlignCenter,
      }}
      initialRouteName='homeTab'
      backBehavior='initialRoute'
    >
      {tabConfis.map(config => (
        <Tab.Screen
          key={config.name}
          name={config.name}
          component={config.component}
          options={{
            ...config.options,
            tabBarIcon: () => <TabBarIcon icon={config.icon} />
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: colors.backgroundBlue,
  }
});