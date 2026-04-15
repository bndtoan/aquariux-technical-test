import * as React from 'react';

import AppStartup from './AppStartup';
import WatchListContext from './contexts/WatchListContext';
import Navigation from './navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { basicStyles, colors } from './themes';
import { LogoHeader } from './components';
import { StyleSheet } from 'react-native';


export default function App() {
  const watchListContextValue = WatchListContext.createContextValue();

  return (
    <SafeAreaProvider>
      <WatchListContext.Provider value={watchListContextValue}>
        <AppStartup />
        <SafeAreaView style={styles.container}>
          <LogoHeader />
          <Navigation />
        </SafeAreaView>
      </WatchListContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite
  }
})

