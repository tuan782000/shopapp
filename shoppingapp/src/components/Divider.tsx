import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';

const Divider = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.gray.g500_80,
        flex: 1,
      }}
    />
  );
};

export default Divider;
