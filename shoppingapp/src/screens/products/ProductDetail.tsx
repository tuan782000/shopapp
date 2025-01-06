import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {ProductModel} from '../../models/ProductModel';
import {HandleAPI} from '../../api/handleAPI';
import {SIZES} from '../../constants/theme';
import {colors} from '../../constants/colors';
import {
  Add,
  ArrowLeft2,
  Heart,
  Minus,
  ShoppingBag,
  ShoppingCart,
} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {
  profileSelector,
  updateFavourites,
} from '../../redux/reducers/profileReducer';
import {authSelector} from '../../redux/reducers/authReducer';
import LinearGradient from 'react-native-linear-gradient';
import ReadMore from '../../components/ReadMore';
import {addCart, cartSelector} from '../../redux/reducers/cartReducer';

const ProductDetail = ({navigation, route}: any) => {
  // route chỉ nhận về id - mặc dù có thể truyền toàn bộ thông tin nhưng không nên như vậy
  // ví dụ: bấm vào thông báo di chuyển đến chi tiết sản phẩm - thông báo thì chỉ có id nên dùng truyền id

  const {id} = route.params;
  const dispatch = useDispatch();

  const profile = useSelector(profileSelector);
  const user = useSelector(authSelector);

  const cartData: any[] = useSelector(cartSelector);
  //   console.log(cartData);

  const handleFavourites = async (id: string) => {
    if (user.id) {
      const favourites: string[] = [...(profile.favourites ?? [])]; // Tạo một bản sao của mảng favourites

      // console.log(favourites)
      const index = favourites.findIndex(element => element === id);
      if (index !== -1) {
        favourites.splice(index, 1);
      } else {
        favourites.push(id);
      }
      // cập nhật vào store
      dispatch(updateFavourites(favourites));
      // lưu vào database
      await handleUpdateFavourites(favourites, user.id);
    } else {
      Alert.alert('', 'You need to login');
    }
  };

  // sau khi mà đã cập nhật trạng thái của like xong thì mình sẽ call api để lưu lại
  const handleUpdateFavourites = async (values: string[], id: string) => {
    const api = `/update-favourites?id=${id}`;
    const data = {
      favourites: values,
    };

    try {
      const res = await HandleAPI.Profile(api, data, 'put');
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductModel>();

  //   const [rating, setRating] = useState(0);
  const [numberProduct, setNumberProduct] = useState(1);
  const [sizes, setSizes] = useState<string[]>([]);
  //   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState('');
  // const [readMore, setReadMore] = useState<number | undefined>(); // number dành cho giới hạn số dòng - undefined khi mà nó hiện toàn bộ, không giới hạn dòng

  // khi mà không để id - thì component này chỉ gọi hàm getProductById 1 lần duy nhất dù re-render cũng gọi 1 lần duy nhất
  // cho nên khi để id và thì khi truyền id vào component re-render call lại để lấy lại thông tin
  useEffect(() => {
    getProductById();
    getSizes();
  }, [id]);

  // trong trang này có rating - thay đổi có thể re-render
  // thay đổi số lượng sản phẩm
  // chọn size...
  // đều gây ra re-render

  useEffect(() => {
    if (cartData.length > 0) {
      const item = cartData.find(element => element._id === id);

      if (item) {
        setNumberProduct(item.numberProduct);
        setSelectedSizes(item.sizesSelected);
      }
    }
  }, [id, cartData]);

  useEffect(() => {
    // console.log(selectedSizes);
    if (cartData.length > 0) {
      const item = cartData.find(
        element =>
          element.selectedSizes === selectedSizes && element._id === id,
      );

      if (item) {
        setNumberProduct(item.numberProduct);
      } else {
        setNumberProduct(1);
      }
    }
  }, [selectedSizes]);

  const getProductById = async () => {
    setIsLoading(true);
    const api = `/detail-product/${id}`;

    try {
      const res = await HandleAPI.Product(api);
      //   console.log(res);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSizes = async () => {
    const api = `/get-product-sizes`;
    const res = await HandleAPI.Product(api);
    setSizes(res.data);
  };

  const handleIncrement = () => {
    if (numberProduct < 10) {
      setNumberProduct(numberProduct + 1);
    }
  };

  const handleDecrement = () => {
    if (numberProduct > 1) {
      setNumberProduct(numberProduct - 1);
    }
  };

  //   const handleSelectedSizes = (id: string) => {
  //     const items = [...selectedSizes];
  //     const index = items.findIndex(element => element === id);

  //     if (index !== -1) {
  //       items.splice(index, 1);
  //     } else {
  //       items.push(id);
  //     }

  //     setSelectedSizes(items);
  //   };

  //   console.log(product?.imageURL);
  //   console.log(sizes);

  const handleAddToCart = () => {
    // console.log(product, selectedSizes, numberProduct);
    if (selectedSizes.length > 0) {
      const data = {
        _id: product?._id,
        price: product?.price,
        selectedSizes,
        numberProduct,
        title: product?.title,
        imageUrl: product?.imageURL,
      };

      dispatch(addCart(data));
    } else {
      Alert.alert('', 'Please choose the size');
    }
  };

  return isLoading ? (
    <Section styles={[globalStyles.center]} flex={1}>
      <ActivityIndicator />
      <TextComponent text="Loading..." />
    </Section>
  ) : product ? (
    <>
      <StatusBar barStyle={'light-content'} />
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          paddingTop: Platform.OS === 'ios' ? 40 : 20,
        }}
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}>
        <Row>
          <Space width={5} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              globalStyles.center,
              {
                height: 42,
                width: 42,
                borderRadius: 100,
                // backgroundColor: 'rgba(0,0,0,0.5)',
              },
            ]}>
            <ArrowLeft2 color={colors.white.w500} />
          </TouchableOpacity>
          <TextComponent
            flex={1}
            textAlign="center"
            numberOfLines={1}
            font={fonts.Bold}
            size={18}
            color={colors.white.w500}
            // text={product.title}
            text="Product Details"
          />
          {/* Vì cái ProductDetail này nó nằm ngoài TabsNavigator - cụ thể nằm ở MainNavigator */}
          {/* Di chuyển vào TabsNavigator chọn CartTab */}
          {/* Sau đó truy cập CartScreen - giúp di chuyển đến màn hình cart */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CartTab', {
                screen: 'CartScreen',
              })
            }>
            <ShoppingCart size={24} color={colors.white.w500} variant="Bold" />
          </TouchableOpacity>
          <Space width={15} />
        </Row>
      </LinearGradient>
      <ScrollView
        style={{flex: 1, zIndex: -1, backgroundColor: colors.white.w500}}>
        <View
          style={{
            height: SIZES.height * 0.5, // SIZES lấy từ kích thước màn hình thiết bị đang dùng lấy ra chiều cao sau đó * 0.5 - là lấy 1/2 là 1 nữa màn hình
            backgroundColor: colors.gray.g500_20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          {product.imageURL && (
            <Image
              source={{uri: product.imageURL}}
              style={{
                height: SIZES.height * 0.5,
                backgroundColor: colors.gray.g500_20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                resizeMode: 'cover',
              }}
            />
          )}
        </View>
        <Space height={20} />
        <Section>
          <Row justifyContent="space-between">
            <View>
              <Row
                justifyContent="space-between"
                onPress={() => {
                  navigation.navigate('ReviewScreen');
                }}>
                <View>
                  <Rating
                    readonly
                    type="custom"
                    imageSize={20}
                    ratingColor={colors.primary.p500}
                    ratingBackgroundColor={colors.light.l500}
                    tintColor={colors.white.w500}
                    jumpValue={0.5}
                    fractions={2}
                    // onFinishRating={(value: any) => setRating(value)}
                    startingValue={4.5} // nên để product.rate ở đây
                  />
                </View>
                <View>
                  <TextComponent text={product.rate} />
                </View>
                {/* <TextComponent text={product.rate} /> */}
              </Row>
            </View>
            <View>
              <Row
                justifyContent="center"
                alignItems="center"
                styles={{
                  borderWidth: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderColor: colors.primary.p500,
                  width: 100,
                }}>
                <TouchableOpacity
                  onPress={handleDecrement}
                  disabled={numberProduct === 1}>
                  <Minus
                    color={
                      numberProduct === 1
                        ? colors.gray.g500
                        : colors.primary.p500
                    }
                    size={20}
                  />
                </TouchableOpacity>
                <Space width={10} />
                <TextComponent
                  text={numberProduct.toString()}
                  textAlign="center"
                  styles={{flex: 1}}
                />
                <Space width={10} />
                <TouchableOpacity
                  onPress={handleIncrement}
                  disabled={numberProduct === 10}>
                  {/* <Text style={{color: colors.primary.p500}}>+</Text> */}
                  <Add
                    color={
                      numberProduct === 10
                        ? colors.gray.g500
                        : colors.primary.p500
                    }
                    size={20}
                  />
                </TouchableOpacity>
              </Row>
            </View>
          </Row>
          <Space height={10} />
          <TextComponent text={product.title} size={20} font={fonts.Bold} />
          {/* <Space height={10} /> */}
          <TextComponent
            text={`$${product.price.toString()}`}
            size={20}
            font={fonts.Bold}
          />
          <Space height={10} />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
          <Space height={10} />
          <TextComponent text="Descriptions" size={20} font={fonts.Bold} />
          <Space height={10} />
          {/* Cách 1 */}
          {/* <TextComponent
            numberOfLines={readMore}
            text={product.description}
          />
          <Row onPress={() => setReadMore(readMore ? undefined : 3)}>
            <TextComponent
              text={readMore ? 'Read More' : 'Read Less'}
              size={12}
              color={colors.primary.p200}
            />
            {readMore ? (
              <ArrowDown2 color={colors.primary.p200} size={12} />
            ) : (
              <ArrowUp2 color={colors.primary.p200} size={12} />
            )}
          </Row> */}

          {/* Cách 2 */}

          <ReadMore numberOfLines={3}>{product.description}</ReadMore>
          {/* <ReadMore numberOfLines={3}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab quis a,
            ipsam consequuntur deleniti praesentium ut incidunt esse vitae
            nulla, obcaecati officiis! Tempora, repudiandae mollitia accusamus
            totam eligendi aliquid labore?
          </ReadMore> */}

          <Space height={20} />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
          <Space height={10} />
          <TextComponent text="Select Sizes" size={20} font={fonts.Bold} />
          <Space height={10} />
          <Row wrap="wrap" justifyContent="flex-start">
            {sizes.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  //   setNumberProduct(1);
                  setSelectedSizes(item);
                }}
                style={[
                  //   globalStyles.tag,
                  globalStyles.center,
                  {
                    backgroundColor:
                      selectedSizes === item
                        ? colors.primary.p500
                        : colors.white.w500_20,
                    marginRight: 16,
                    marginBottom: 12,
                    borderRadius: 999,
                    width: 50,
                    height: 50,
                  },
                ]}
                key={index}>
                <TextComponent
                  text={item}
                  color={
                    selectedSizes === item
                      ? colors.white.w500
                      : colors.dark.d500
                  }
                />
              </TouchableOpacity>
            ))}
          </Row>
          {/* <FlatList
            horizontal={true}
            // style={{paddingLeft: 16}}
            showsHorizontalScrollIndicator={false}
            data={sizes}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => console.log(item)}
                style={[
                  //   globalStyles.tag,
                  globalStyles.center,
                  {
                    backgroundColor: colors.white.w500_20,
                    marginRight: 16,
                    marginBottom: 12,
                    borderRadius: 999,
                    width: 50,
                    height: 50,
                  },
                ]}
                key={index}>
                <TextComponent text={item} color={colors.dark.d500} />
              </TouchableOpacity>
            )}
          /> */}
        </Section>
      </ScrollView>
      <Section styles={{paddingBottom: Platform.OS === 'ios' ? 10 : 0}}>
        <Row>
          <ButtonComponent
            buttonStyles={{
              backgroundColor: colors.light.l500_20,
              padding: 18,
              borderRadius: 999,
            }}
            type="text"
            inline
            icon={
              <Heart
                size={20}
                color={
                  profile.favourites.includes(id)
                    ? '#dc3545'
                    : colors.primary.p400
                }
                variant={profile.favourites.includes(id) ? 'Bold' : 'Outline'}
              />
            }
            onPress={() => handleFavourites(id)}
          />
          <Space width={20} />
          <ButtonComponent
            onPress={() => handleAddToCart()}
            type="primary"
            value="Add to cart"
            backgroundColor={colors.primary.p500}
            buttonStyles={{flex: 1, marginTop: 20}}
            iconPosition="left"
            icon={<ShoppingCart color={colors.white.w500} />}
          />
        </Row>
      </Section>
    </>
  ) : (
    <Section styles={[globalStyles.center]} flex={1}>
      <TextComponent text="Product not found" />
    </Section>
  );
};

export default ProductDetail;

// vì thằng productDetail - không nằm trong bottom tab nên là đặt nó nằm ở main - vì bottom tab không bọc main
