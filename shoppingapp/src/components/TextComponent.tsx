import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';

type Props = {
  text: string;
  color?: string;
  styles?: StyleProp<TextStyle>;
  size?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  font?: string;
  numberOfLines?: number;
  flex?: number;
};

const TextComponent = (props: Props) => {
  const {text, color, styles, size, textAlign, font, numberOfLines, flex} =
    props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        globalStyles.text,
        {
          color: color ?? colors.dark.d500,
          fontSize: size ?? 14,
          textAlign: textAlign,
          fontFamily: font ?? fonts.Regular,
          flex: flex ?? 0,
          lineHeight: size ? size + 8 : 19,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
