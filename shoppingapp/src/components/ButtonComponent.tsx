import {
    View,
    Text,
    StyleProp,
    ViewProps,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import React, { ReactNode } from 'react';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';

type Props = {
    onPress: () => void;
    value?: string;
    buttonStyles?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    color?: string;
    borderRadius?: number;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    type?: 'primary' | 'outline' | 'text' | 'link';
    textStyleProps?: StyleProp<TextStyle>;
    inline?: boolean;
    disabled?: boolean;
};

const ButtonComponent = (props: Props) => {
    const {
        value,
        onPress,
        buttonStyles,
        backgroundColor,
        color,
        borderRadius,
        icon,
        iconPosition,
        type,
        textStyleProps,
        inline,
        disabled
    } = props;

    const localStyles =
        type === 'link' || type === 'text'
            ? [buttonStyles]
            : [
                  globalStyles.button,
                  {
                      marginBottom: inline ? 0 : 20,
                      backgroundColor: backgroundColor,
                      borderRadius: borderRadius ?? 999,
                      borderWidth: type === 'outline' ? 1 : 0,
                      borderColor: backgroundColor ?? colors.gray.g500
                  },
                  buttonStyles
              ];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={localStyles}
            disabled={disabled}
        >
            {icon && (iconPosition === 'left' || !iconPosition) && icon}
            {value && (
                <TextComponent
                    color={
                        color
                            ? color
                            : type === 'link'
                            ? colors.primary.p500
                            : backgroundColor
                            ? backgroundColor !== 'white'
                                ? colors.white.w500
                                : colors.dark.d500
                            : colors.dark.d500
                    }
                    text={value}
                    styles={[
                        {
                            paddingRight:
                                icon && iconPosition === 'right' ? 12 : 0,
                            paddingLeft:
                                icon && iconPosition === 'left' ? 12 : 0
                        },
                        textStyleProps
                    ]}
                />
            )}
            {icon && iconPosition === 'right' && icon}
        </TouchableOpacity>
    );
};

export default ButtonComponent;
