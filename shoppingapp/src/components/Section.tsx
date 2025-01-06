import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

type Props = {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  flex?: number;
};

const Section = (props: Props) => {
  const {children, styles, flex} = props;
  return (
    <View
      style={[
        globalStyles.container,
        {flex: flex ?? 0, paddingHorizontal: 16},
        styles,
      ]}>
      {children}
    </View>
  );
};

export default Section;
