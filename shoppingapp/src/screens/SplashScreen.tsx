import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';
import {Row, Space, TextComponent} from '../components';

const SplashScreen = () => {
  return (
    <View style={[globalStyles.container, globalStyles.center]}>
      <Image
        source={require('../assets/images/icon-logo.png')}
        style={{width: 80, resizeMode: 'contain'}}
      />
      <Row>
        <ActivityIndicator color={colors.dark.d500_20} />
        <Space width={10} />
        <TextComponent text="Loading..." color={colors.dark.d500_20} />
      </Row>
    </View>
  );
};

export default SplashScreen;
// Những thứ lấy ra bên trong thư viện cần required
