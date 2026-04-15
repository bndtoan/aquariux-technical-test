import * as React from 'react';

import AppStartup from './AppStartup';
import WatchListContext from './contexts/WatchListContext';
import Navigation from './navigation';


function App() {
  const watchListContextValue = WatchListContext.createContextValue();

  return (
    <WatchListContext.Provider value={watchListContextValue}>
      <AppStartup />
      <Navigation />
    </WatchListContext.Provider>
  );
}

export default App;
