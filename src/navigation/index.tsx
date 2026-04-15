import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screenConfig } from './screenConfig';
import { RootStackParamList } from './types';
import { colors } from '../themes';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer
      theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.backgroundWhite } }}
    >
      <Stack.Navigator initialRouteName='tabs'>
        {screenConfig.map(config => {
          return <Stack.Screen key={config.name} {...config} />
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}