import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import Row from './Row';
import ButtonComponent from './ButtonComponent';
import {fonts} from '../constants/fonts';

type Props = {
  title: string;
  viewAll?: boolean;
  onViewAll?: () => void;
  clear?: boolean;
  onClear?: () => void;
};

const Tabbar = (props: Props) => {
  const {title, viewAll, onViewAll, clear, onClear} = props;
  return (
    <Row>
      <TextComponent size={18} font={fonts.Bold} flex={1} text={title} />
      {viewAll && onViewAll && (
        <ButtonComponent
          inline
          value="View all"
          onPress={onViewAll}
          type="link"
        />
      )}

      {clear && onClear && (
        <ButtonComponent inline value="Clear" onPress={onClear} type="link" />
      )}
    </Row>
  );
};

export default Tabbar;
