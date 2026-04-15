import React from 'react';
import WatchListContext from './contexts/WatchListContext';
import asyncStorage from './core/asyncStorage';

export default function AppStartup() {
  const watchListContext = WatchListContext.useContext()

  React.useEffect(() => {
    (async () => {
      const data = await asyncStorage.get('WATCH_LIST') || [];
      watchListContext.setData(data);
    })();
  }, []);

  return <></>;
}