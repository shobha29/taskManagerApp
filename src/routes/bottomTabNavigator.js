import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

import {icons} from '../asserts';
import {Home, Profile, Search} from '../screens';
import {moderateScale} from '../utils/dimensions';
import {screenNameString} from '../utils/constants';
import colors from '../utils/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = props => {
  const {
    route: {
      params: {initialScreen = ''},
    },
  } = props;

  const tabBarIcon = ({route, focused}) => {
    let iconName;
    if (route.name === screenNameString.HOME) {
      iconName = focused ? icons.homeActive : icons.homeInactive;
    } else if (route.name === screenNameString.PROFILE) {
      iconName = focused ? icons.profileActive : icons.profileInactive;
    } else if (route.name === screenNameString.SEARCH) {
      iconName = focused ? icons.searchActive : icons.searchInactive;
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
    <Tab.Navigator
      initialRouteName={initialScreen}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => tabBarIcon({route, focused}),
        tabBarOptions: {
          activeTintColor: colors.blue,
          inactiveTintColor: colors.black,
          showLabel: false,
        },
      })}>
      <Tab.Screen name={screenNameString.HOME} component={Home} />
      <Tab.Screen name={screenNameString.SEARCH} component={Search} />
      <Tab.Screen name={screenNameString.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

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
