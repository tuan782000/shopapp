import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProductModel} from '../models/ProductModel';
import {Container, Row, Section, Space, TextComponent} from '../components';
import {Loading} from '../modals';
import {HandleAPI} from '../api/handleAPI';
import ProductList from '../components/ProductList';

interface FilterData {
  categoriesSelected: String[];
  sizeSelected: String[];
  price: {
    min: number;
    max: number;
  };
}

const FilterScreen = ({navigation, route}: any) => {
  // cái dữ liệu được navigation truyền qua - kèm data - route đảm nhận dữ liệu
  // route.params chứa dữ liệu filterData - destructuring lấy ra filterData
  const {filterData}: {filterData: FilterData} = route.params;
  console.log(filterData);

  // gửi dữ liệu lên server

  // Truyền lên server có file => new FormData() - gửi file xuống server để xử lý
  // Truyền lên server mà chỉ có: string, number => query và params
  // Truyền lên server mà có array: body

  const [dataFilterProducrs, setDatafilterProducrs] = useState<ProductModel[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetDataFilterProduct();
  }, []);

  const handleGetDataFilterProduct = async () => {
    setIsLoading(true);
    const api = '/filter-products';

    try {
      const res = await HandleAPI.Filter(api, filterData, 'post');

      //   console.log(res);
      console.log(res.data);
      if (res.data) {
        setDatafilterProducrs(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   console.log(dataFilterProducrs);

  return (
    <Container isScroll={false} back title="Filter" titlePosition="center">
      <Space height={20} />
      {isLoading ? (
        <Loading visible={isLoading} />
      ) : (
        <ProductList items={dataFilterProducrs} />
      )}
    </Container>
  );
};

export default FilterScreen;
