import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import {DeviceContext} from '../utils/context';
import {syncOfflineTask} from '../redux/reducers';
import DrawerNavigator from './drawerNavigator';

const Route = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(val => {
      setIsConnected(val.isConnected);
    });
    syncOfflineTask();
    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isConnected,
        changeIsConnected: val => setIsConnected(val),
      }}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </DeviceContext.Provider>
  );
};

export default Route;
