import {useEffect, useState} from 'react';
import {ArrowRotateLeft, SearchNormal1} from 'iconsax-react-native';
import {View} from 'react-native';
import {
  ButtonComponent,
  Container,
  Input,
  ProductItem,
  Row,
  Section,
  Space,
  Tabbar,
  TextComponent,
} from '../components';
import {colors} from '../constants/colors';
import Recently from './home/components/Recently';
import PopularProducts from './home/components/PopularProducts';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {replaceName} from '../utils/replaceName';
import {HandleAPI} from '../api/handleAPI';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProductList from '../components/ProductList';
// import _ from "lodash";

const SearchScreen = ({navigation}: any) => {
  // const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchHistories, setSearchHistories] = useState([]);

  const user = useSelector(authSelector);

  // call function get Search
  useEffect(() => {
    handleGetSearch();
  }, []);

  useEffect(() => {
    if (!searchKey) {
      setProducts([]);
    } else {
      //debounce and call handleSearch
      // const search = debounce(handleSearch, 500)
      // search()
      handleSearch();
    }
  }, [searchKey]);

  const handleSearch = async () => {
    const api = `/all-products?title=${replaceName(searchKey)}`;
    try {
      const res = await HandleAPI.Product(api);

      if (res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSearchData = async () => {
    const api = `/add-search`;

    const data = {
      title: searchKey,
      slug: replaceName(searchKey),
      count: 1,
      createdBy: user.id,
    };

    try {
      await HandleAPI.Search(api, data, 'post');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSearch = async () => {
    const api = `/get-all?uid=${user.id}`;

    try {
      const res = await HandleAPI.Search(api);
      setSearchHistories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container back title="Search" titlePosition="center" isScroll={false}>
      <Section>
        <Space height={10} />
        <Input
          placeholder="Search..."
          prefix={<SearchNormal1 size={20} color={colors.gray.g500_80} />}
          value={searchKey}
          onChange={val => setSearchKey(val)}
          allowClear
          autoCapitalize="none"
          onBlur={handleSaveSearchData}
        />
        {/* <Recently /> */}

        <Tabbar title="Recently Search" viewAll onViewAll={() => {}} />
        <Space height={10} />
        {searchHistories.length > 0 && (
          <Row justifyContent="flex-start">
            {searchHistories.map((item: any) => (
              // <TouchableOpacity
              //   key={item.id}
              //   onPress={() => setSearchKey(item.title)}>
              //   <TextComponent text={item.title} />
              // </TouchableOpacity>
              <ButtonComponent
                key={item._id}
                onPress={() => {}}
                value={item.title}
                icon={
                  <ArrowRotateLeft
                    size={20}
                    color={colors.gray.g500_80}
                    style={{marginRight: 5}}
                  />
                }
                color={colors.gray.g500_80}
                type="outline"
                borderRadius={10}
                buttonStyles={{
                  borderColor: colors.dark.d500_5,
                  marginRight: 10,
                }}
              />
            ))}
          </Row>
        )}

        <Tabbar title="Popular Products" viewAll onViewAll={() => {}} />
        <Space height={20} />
      </Section>

      {/* Products */}
      {/* {products.length > 0 && (
        <Section>
          <Row justifyContent="flex-start" wrap="wrap">
            {products.map((item: any) => (
              <ProductItem item={item} key={item._id} />
            ))}
          </Row>
        </Section>
      )} */}
      {products.length > 0 ? (
        <ProductList items={products} />
      ) : (
        <Section
          flex={1}
          styles={{justifyContent: 'center', alignItems: 'center'}}>
          <TextComponent text="No data" />
        </Section>
      )}
    </Container>
  );
};

export default SearchScreen;
