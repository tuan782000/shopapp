import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {TextComponent} from '../components';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';

type Props = {
  message?: string;
  visible: boolean;
};

const Loading = (props: Props) => {
  const {message, visible} = props;
  return (
    <Modal
      animationType="slide"
      visible={visible}
      style={[globalStyles.center, {flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={colors.white.w500} />
        {message && <TextComponent text={message} />}
      </View>
    </Modal>
  );
};

export default Loading;
