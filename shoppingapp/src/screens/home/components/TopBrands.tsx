import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Section,
  Tabbar,
  Row,
  TextComponent,
  Space,
} from '../../../components';
import {colors} from '../../../constants/colors';
import {BrandModel} from '../../../models/BrandModel';
import {HandleAPI} from '../../../api/handleAPI';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const TopBrands = () => {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const api = `/all-brands`;
    try {
      const res = await HandleAPI.Brand(api);
      // console.log(res);
      setBrands(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View style={{paddingHorizontal: 16}}>
        <Tabbar title={'Top Brands'} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={brands}
        style={{paddingHorizontal: 16, paddingVertical: 12}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                title: item.title,
                sortBy: 'brands',
              })
            }
            style={[
              globalStyles.center,
              {marginRight: index <= brands.length - 1 ? 16 : 0},
            ]}>
            <Avatar
              source={`${item.imageURL ?? ''}`}
              size={80}
              // onPress={() => console.log(item._id)}
              backgroundColor={colors.dark.d500_10}
              resizeMode="contain"
              text={item.title}
            />
            <Space height={12} />
            <TextComponent text={item.title} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopBrands;
