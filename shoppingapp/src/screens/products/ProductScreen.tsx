import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {HandleAPI} from '../../api/handleAPI';
import {Container, Section} from '../../components';
import ProductList from '../../components/ProductList';
import {ProductModel} from '../../models/ProductModel';
import {globalStyles} from '../../styles/globalStyles';
// import PopularProducts from '../homes/components/PopularProducts';
// import Products from './components/Products';

const ProductScreen = ({navigation, route}: any) => {
  // route do người dùng truyền vào
  const {title, sortBy, id}: {title: string; sortBy: string; id: string} =
    route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    getProducts();
  }, [sortBy, id]);

  const getProducts = async () => {
    setIsLoading(true);
    // const api = `/all-products`;
    // sẽ phải lọc - sortBy
    const api = `/all-products?sortby=${sortBy}&id=${id}`;
    // console.log(api);

    try {
      const res = await HandleAPI.Product(api);
      if (res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(products);
  return (
    <Container isScroll={false} back title={title} titlePosition="center">
      {isLoading ? (
        <Section styles={[globalStyles.center]} flex={1}>
          <ActivityIndicator />
        </Section>
      ) : (
        // <Loading visible={isLoading} />
        <ProductList items={products} />
      )}
    </Container>
  );
};

export default ProductScreen;
