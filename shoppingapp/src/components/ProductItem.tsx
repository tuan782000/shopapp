import { View, Text, Image } from 'react-native';
import React from 'react';
import { ProductModel } from '../models/ProductModel';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import ButtonComponent from './ButtonComponent';
import { Heart } from 'iconsax-react-native';
import Row from './Row';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { Alert } from 'react-native';
import {
    profileSelector,
    updateFavourites
} from '../redux/reducers/profileReducer';
import { HandleAPI } from '../api/handleAPI';
import { useNavigation } from '@react-navigation/native';

type Props = {
    item: ProductModel;
    type?: 'vertical' | 'horizontal';
};

const ProductItem = (props: Props) => {
    const { item, type } = props;
    const dispatch = useDispatch();

    const profile = useSelector(profileSelector);
    const user = useSelector(authSelector);

    const navigation: any = useNavigation();

    const handleFavourites = async (id: string) => {
        if (user.id) {
            // console.log(id);
            // console.log(user.favourites);

            // cách 1:
            // const favourites: string[] = profile.favourites
            //   ? [...profile.favourites]
            //   : []; // Tạo một bản sao của mảng favourites
            // cách 2:
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
            favourites: values
        };

        try {
            // const res = await HandleAPI.Profile(api, data, 'put');
            await HandleAPI.Profile(api, data, 'put');
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(profile.favourites);

    return !type || type === 'vertical' ? (
        <CardComponent
            styles={{ padding: 0 }}
            type={type}
            onPress={() =>
                navigation.navigate('ProductDetail', {
                    id: item._id
                })
            }
        >
            <Image
                source={{ uri: item.imageURL }}
                style={{
                    flex: 1,
                    resizeMode: 'cover',
                    width: '100%',
                    height: 200,
                    maxHeight: 200,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                }}
            />
            <Row
                styles={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}
            >
                <ButtonComponent
                    type='text'
                    inline
                    icon={
                        <Heart
                            size={20}
                            color={
                                profile.favourites.includes(item._id)
                                    ? '#dc3545'
                                    : colors.dark.d500_20
                            }
                            variant={
                                profile.favourites.includes(item._id)
                                    ? 'Bold'
                                    : 'Outline'
                            }
                        />
                    }
                    onPress={() => handleFavourites(item._id)}
                />
            </Row>
            <View style={{ padding: 12 }}>
                <TextComponent
                    font={fonts.Bold}
                    numberOfLines={2}
                    text={item.title}
                />
                <TextComponent
                    numberOfLines={2}
                    text={item.description}
                    color={colors.dark.d500_20}
                />
                <TextComponent numberOfLines={2} text={`$${item.price}`} />
            </View>
        </CardComponent>
    ) : (
        <CardComponent>
            <TextComponent text={'Horizontal Card Item'} />
        </CardComponent>
    );
};

export default ProductItem;
