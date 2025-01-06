import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Section, Space, TextComponent } from '../../components';
import { fonts } from '../../constants/fonts';
import { globalStyles } from '../../styles/globalStyles';
import { ProductModel } from '../../models/ProductModel';
import ProductList from '../../components/ProductList';
import { HandleAPI } from '../../api/handleAPI';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../redux/reducers/profileReducer';
import { authSelector } from '../../redux/reducers/authReducer';

const FavouriteScreen = () => {
    const [isLoading, setisLoading] = useState(false);
    const [products, setProducts] = useState<ProductModel[]>([]);

    const profile = useSelector(profileSelector);
    const user = useSelector(authSelector);

    useEffect(() => {
        handleFavouriteProducts(profile.favourites ?? []);
    }, [profile.favourites]);

    const handleFavouriteProducts = async (listProdcutFavourites: []) => {
        setisLoading(true);
        const api = `/get-product-favourites`;

        try {
            const listProducts = await HandleAPI.Product(
                api,
                listProdcutFavourites,
                'post'
            );

            if (user.id) {
                setProducts(listProducts.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    };

    return (
        <Container
            isScroll={false}
            back
            title='Favourite Products'
            titlePosition='center'
        >
            {isLoading ? (
                <Section styles={[globalStyles.center]} flex={1}>
                    <ActivityIndicator />
                </Section>
            ) : (
                <ProductList items={products} />
            )}
        </Container>
    );
};

export default FavouriteScreen;
