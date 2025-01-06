import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  AddAddressScreen,
  CheckoutScreen,
  FilterScreen,
  MapScreen,
  MyOrderScreen,
  OrderDetailScreen,
  OrderReviewScreen,
  PrivacyPolicyScreen,
  ProductDetail,
  ReviewScreen,
  SearchScreen,
  SelectAddressScreen,
  TernsandConditionsScreen,
  WriteReviewScreen,
} from '../../screens';
import DrawerNavigator from './DrawerNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {HandleAPI} from '../../api/handleAPI';
import {addProfile} from '../../redux/reducers/profileReducer';
import {
  addCart,
  cartSelector,
  syncData,
} from '../../redux/reducers/cartReducer';
import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {SplashScreen} from '../../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const cart = useSelector(cartSelector);

  // hỏi quyền truy cập vị trí - chỉ có android mới dùng
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //   }
  // }, []);

  useEffect(() => {
    // vừa mới vào app nó sẽ chạy
    getData(user.id);
    // nếu là thiết bị thật - hỏi quyền ở trên copy xuống
  }, [user]);

  // useEffect(() => {
  //   user && console.log(cart);
  // }, [cart, user]);

  useEffect(() => {
    // console.log(cart);
    // mỗi lần có sự thay đổi của giỏ hàng - thì gọi hàm saveDate để lưu lại giỏ hàng vào cartData
    saveData(user.id); // truyền user.id để làm giỏ hàng cho riêng người đó
  }, [cart]);

  useEffect(() => {
    user.id && getProfile();
  }, [user]);

  const getProfile = async () => {
    const api = `/?id=${user.id}`;
    const res = await HandleAPI.Profile(api);
    if (res.data) {
      dispatch(addProfile(res.data));
    }
  };

  // Hàm lưu sản phẩm xuống asyncStorage
  const saveData = async (userId: string) => {
    await AsyncStorage.setItem(`cartData_${userId}`, JSON.stringify(cart));
  };

  const getData = async (userId: string) => {
    // Kiểm tra nếu có userId - tức là người dùng có đăng nhập
    if (userId) {
      // tìm kiếm trong thiết bị người dùng - rằng có giỏ hàng nào có id người dùng đang lưu sản phẩm không
      const resCart = await AsyncStorage.getItem(`cartData_${userId}`);
      // Nếu có - dùng dispatch bắn sự kiện lên redux để mà chạy hàm đồng bộ giỏ hàng hiện tại
      // Nếu không - set giỏ hàng là rỗng
      if (resCart) {
        dispatch(syncData(JSON.parse(resCart)));
      } else {
        dispatch(syncData([]));
      }
    }
  };

  // console.log(user);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Thuộc Bottom Navigator - 4 thằng này đã được gộp vào trong TabsNavigator */}
      {/* <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} /> */}

      {/* <Stack.Screen name="Home" component={TabsNavigator} /> */}
      <Stack.Screen name="Main" component={DrawerNavigator} />

      {/* Các màn hình ngoài không thuộc Bottom Navigator */}
      <Stack.Screen
        name="TernsandConditionsScreen"
        component={TernsandConditionsScreen}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderReviewScreen" component={OrderReviewScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
      {/* <Stack.Screen name="MapScreen" component={MapScreen} /> */}
      <Stack.Screen
        name="SelectAddressScreen"
        component={SelectAddressScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
