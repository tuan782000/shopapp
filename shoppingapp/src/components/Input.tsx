import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';
import {CloseCircle, Eye, EyeSlash} from 'iconsax-react-native';

type Props = {
  value: string;
  prefix?: ReactNode;
  subfix?: ReactNode;
  placeholder?: string;
  onChange: (val: string) => void;
  // styles?: StyleProp<ViewProps>;
  styles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<TextStyle>;
  password?: boolean;
  allowClear?: boolean;
  inline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?: KeyboardTypeOptions;
  max?: number;
  onBlur?: () => void;
};

const Input = (props: Props) => {
  const {
    value,
    prefix,
    subfix,
    placeholder,
    onChange,
    styles,
    inputStyles,
    password,
    allowClear,
    inline,
    autoCapitalize,
    keyboardType,
    max,
    onBlur,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(password ? true : false);
  return (
    <View
      style={[
        globalStyles.inputContainer,
        {
          borderColor: value ? colors.dark.d500 : colors.gray.g500_20,
          borderWidth: 1,
          backgroundColor: value ? 'white' : colors.dark.d500_10,
          marginBottom: inline ? 0 : 16,
        },
        styles,
      ]}>
      {prefix && prefix}
      <View style={{flex: 1}}>
        <TextInput
          style={[
            globalStyles.input,
            {
              paddingLeft: prefix ? 12 : 0,
              paddingRight: password || allowClear ? 10 : 0,
            },
            inputStyles,
          ]}
          value={value}
          placeholderTextColor={colors.gray.g500}
          onChangeText={val => onChange(val)}
          secureTextEntry={password ? isShowPassword : false}
          placeholder={placeholder ?? ''}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={max}
          onBlur={onBlur}
        />
      </View>
      {subfix && subfix}
      {value && allowClear && (
        <TouchableOpacity onPress={() => onChange('')}>
          <CloseCircle size={20} color={colors.gray.g500_80} />
        </TouchableOpacity>
      )}
      {password ? (
        isShowPassword ? (
          <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
            <Eye size={20} color={colors.gray.g500_80} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
            <EyeSlash size={20} color={colors.gray.g500_80} />
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default Input;
