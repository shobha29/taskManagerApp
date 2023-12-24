import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {icons} from '../asserts';
import {Settings} from '../screens';
import {horizontalScale, moderateScale} from '../utils/dimensions';
import {screenNameString} from '../utils/constants';

import BottomTabNavigator from './bottomTabNavigator';
import colors from '../utils/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const drawerIcon = ({route, focused}) => {
    let iconName;
    if (route.name === screenNameString.HOME) {
      iconName = focused ? icons.homeActive : icons.homeInactive;
    } else if (route.name === screenNameString.PROFILE) {
      iconName = focused ? icons.profileActive : icons.profileInactive;
    } else if (route.name === screenNameString.SETTINGS) {
      iconName = focused ? icons.settingsActive : icons.settingsInactive;
    }

    return (
      <Image
        style={[
          styles.iconStyle,
          focused ? styles.activeTintColor : styles.inactiveTintColor,
        ]}
        source={iconName}
      />
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        swipeEnabled: false,
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: colors.black,
        drawerLabelStyle: {
          marginLeft: -horizontalScale(20),
        },
        drawerIcon: ({focused}) => drawerIcon({route, focused}),
      })}>
      <Drawer.Screen
        name={screenNameString.HOME}
        component={BottomTabNavigator}
        initialParams={{initialScreen: screenNameString.HOME}}
      />
      <Drawer.Screen
        name={screenNameString.PROFILE}
        component={BottomTabNavigator}
        initialParams={{initialScreen: screenNameString.PROFILE}}
      />
      <Drawer.Screen name={screenNameString.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  activeTintColor: {
    tintColor: colors.blue,
  },
  inactiveTintColor: {
    tintColor: colors.black,
  },
});
