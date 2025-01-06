import {
  View,
  Text,
  StyleProp,
  ImageStyle,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TextStyle,
  ImageResizeMode,
} from 'react-native';
import React from 'react';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import TextComponent from './TextComponent';

type Props = {
  source: string;
  size?: number;
  onPress?: () => void;
  padding?: number;
  backgroundColor?: string;
  imgStyles?: StyleProp<TextStyle>;
  resizeMode?: ImageResizeMode;
  text?: string;
};

const Avatar = (props: Props) => {
  const {
    source,
    size,
    onPress,
    padding,
    backgroundColor,
    imgStyles,
    resizeMode,
    text,
  } = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[
        {
          // padding: padding ?? 0,
          backgroundColor: backgroundColor ?? undefined,
          borderRadius: 999,
          width: size ?? 24,
          height: size ?? 24,
        },
        imgStyles,
      ]}
      onPress={onPress}>
      {source ? (
        <Image
          source={{uri: source}}
          width={size ?? 24}
          height={size ?? 24}
          borderRadius={size ? size / 2 : 12}
          resizeMode={resizeMode ?? 'cover'}
        />
      ) : (
        <View
          style={{
            width: size ?? 24,
            height: size ?? 24,
            backgroundColor,
            borderRadius: 999,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
