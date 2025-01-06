import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {ProductModel} from '../models/ProductModel';
// import {FlatList} from 'react-native-gesture-handler';
import ProductItem from './ProductItem';
import TextComponent from './TextComponent';
import Section from './Section';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  items: ProductModel[];
}

const ProductList = (props: Props) => {
  const {items} = props;
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      numColumns={2}
      contentContainerStyle={{
        justifyContent: 'space-between',
        marginHorizontal: 8,
      }}
      // Nếu như không có sản phẩm nào thì làm sao
      ListEmptyComponent={
        <Section styles={[globalStyles.center]}>
          <TextComponent text="Data not found" />
        </Section>
      }
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );
};

export default ProductList;
