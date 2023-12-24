import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import styles from './header.styles';

const Header = ({title = '', leftIcon = false, onPressLeftIcon = () => {}}) => {
  return (
    <View style={styles.headerContainer}>
      {leftIcon && (
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Image source={leftIcon} style={styles.leftIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default Header;
