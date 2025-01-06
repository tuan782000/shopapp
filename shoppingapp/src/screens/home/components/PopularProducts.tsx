import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Tabbar,
  Section,
  Card,
  ProductItem,
  Row,
  Space,
} from '../../../components';
import {colors} from '../../../constants/colors';
import {Heart} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {ProductModel} from '../../../models/ProductModel';
import {HandleAPI} from '../../../api/handleAPI';

const PopularProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation: any = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    // const api = `/all-products`;
    // const api = `/all-products?limit=1`; // giới hạn 1 sản phẩm
    const api = `/all-products?limit=4&sort`; // giới hạn 1 sản phẩm - thêm sort

    try {
      const res = await HandleAPI.Product(api);
      // console.log(res);
      if (res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <View style={{paddingHorizontal: 16}}>
        <Tabbar
          title="Popular Products"
          viewAll
          onViewAll={() =>
            navigation.navigate('ProductScreen', {
              id: '',
              title: 'Products',
              sortBy: '',
            })
          }
        />
      </View>

      <Space height={20} />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}>
        {products.map(item => (
          <ProductItem item={item} key={item._id} />
        ))}
      </View>
    </View>
  );
};

export default PopularProducts;
