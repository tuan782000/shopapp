import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import TextComponent from './TextComponent';
import Row from './Row';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';

type Props = {
  children: ReactNode;
  checked?: string[];
  styles?: StyleProp<ViewStyle>;
  onCheck?: () => void;
  textStyles?: StyleProp<TextStyle>;
};

const Tag = (props: Props) => {
  const {children, checked, styles, onCheck, textStyles} = props;
  const [itemSelected, setItemSelected] = useState<string[]>([]);
  const handleToggleSelected = (id: string) => {
    const items = [...itemSelected];
    const index = items.findIndex(element => element === id);

    if (index !== -1) {
      items.push(id);
    } else {
      items.splice(index, 1);
    }

    setItemSelected(items);
  };
  return (
    <Row
      onPress={onCheck ? () => onCheck() : undefined}
      styles={[globalStyles.tag, {}, styles]}>
      {children}
    </Row>
  );
};

export default Tag;
