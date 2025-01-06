import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartSelector,
    removeCart,
    updateQuantity
} from '../../redux/reducers/cartReducer';
import {
    ButtonComponent,
    Container,
    Input,
    Row,
    Section,
    Space,
    TextComponent
} from '../../components';
import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';
import { fonts } from '../../constants/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Add, Minus, PercentageCircle, Trash } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const navigation: any = useNavigation();
    const [itemTotal, setItemTotal] = useState<number>();
    const [promoCode, setPromoCode] = useState<number>();
    const [grandTotal, setGrandTotal] = useState<number>();

    const cartData = useSelector(cartSelector);
    // console.log(cartData);
    const dispatch = useDispatch();

    useEffect(() => {
        calculateTotalItems(cartData);
    }, [cartData, promoCode]);

    const handleMinusNumberInCart = (item: any) => {
        if (item.numberProduct === 1) {
            dispatch(
                removeCart({
                    id: item._id,
                    selectedSizes: item.selectedSizes
                })
            );
        }

        dispatch(
            updateQuantity({
                id: item._id,
                selectedSizes: item.selectedSizes,
                number: -1
            })
        );
    };

    const calculateTotalItems = (cartItems: any) => {
        let totals: number[] = [];
        cartItems.forEach((item: any) =>
            totals.push(item.numberProduct * item.price)
        );

        const itemTotalCalculate = totals.reduce(
            (accumulatorPrice, currentPrice) => {
                return accumulatorPrice + currentPrice;
            },
            0
        );
        setItemTotal(itemTotalCalculate);
    };

    return (
        <Container isScroll={false} title='My Cart' titlePosition='center' back>
            <>
                <SwipeableFlatList
                    data={cartData}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                globalStyles.card,
                                globalStyles.shadow,
                                { marginHorizontal: 16, marginBottom: 16 }
                            ]}
                        >
                            <Row>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={{
                                        width: 80,
                                        height: 90,
                                        borderRadius: 12,
                                        resizeMode: 'cover'
                                    }}
                                />
                                <Space width={12} />
                                <View style={{ flex: 1 }}>
                                    <TextComponent
                                        text={item.title}
                                        font={fonts.Bold}
                                        size={18}
                                    />
                                    <Space height={5} />
                                    <TextComponent
                                        text={`Size: ${item.selectedSizes}`}
                                    />
                                    <Space height={5} />
                                    <Row justifyContent='space-between'>
                                        <TextComponent
                                            text={`$${(
                                                parseFloat(item.price) *
                                                parseInt(item.numberProduct)
                                            ).toLocaleString()}`}
                                            size={18}
                                            font={fonts.Bold}
                                        />
                                        <Row
                                            justifyContent='center'
                                            alignItems='center'
                                            styles={{
                                                borderWidth: 1,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                borderRadius: 8,
                                                borderColor:
                                                    colors.primary.p500,
                                                width: 100
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleMinusNumberInCart(
                                                        item
                                                    )
                                                }
                                                // disabled={item.numberProduct === 1}
                                            >
                                                <Minus
                                                    color={colors.primary.p500}
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                            <Space width={10} />
                                            <TextComponent
                                                text={item.numberProduct.toString()}
                                                textAlign='center'
                                                styles={{ flex: 1 }}
                                            />
                                            <Space width={10} />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    dispatch(
                                                        updateQuantity({
                                                            id: item._id,
                                                            selectedSizes:
                                                                item.selectedSizes,
                                                            number: +1
                                                        })
                                                    );
                                                }}
                                                disabled={
                                                    item.numberProduct === 10
                                                }
                                            >
                                                <Add
                                                    color={
                                                        item.numberProduct ===
                                                        10
                                                            ? colors.gray.g500
                                                            : colors.primary
                                                                  .p500
                                                    }
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        </Row>
                                    </Row>
                                </View>
                            </Row>
                        </View>
                    )}
                    renderRightActions={item => (
                        <View
                            style={{
                                paddingHorizontal: 20,
                                backgroundColor: '#FF5B5B',
                                borderRadius: 8,
                                marginBottom: 16,
                                marginLeft: -32,
                                marginRight: 16,
                                justifyContent: 'center',
                                alignContent: 'center',
                                paddingLeft: 32
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    dispatch(
                                        removeCart({
                                            id: item._id,
                                            selectedSizes: item.selectedSizes
                                        })
                                    )
                                }
                            >
                                <Trash size={28} color='white' />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListFooterComponent={
                        <Section>
                            <Row>
                                <Input
                                    value=''
                                    onChange={() => console.log('Coupon')}
                                    styles={{
                                        flex: 1,
                                        backgroundColor: colors.gray.g500_10,
                                        borderRadius: 999,
                                        zIndex: -1,
                                        position: 'relative'
                                    }}
                                    placeholder='Enter Promocode'
                                    prefix={
                                        <PercentageCircle
                                            color={colors.dark.d500}
                                            size={20}
                                        />
                                    }
                                />
                                <ButtonComponent
                                    onPress={() => console.log('Add')}
                                    backgroundColor={colors.primary.p500}
                                    type='primary'
                                    value='Apply'
                                    buttonStyles={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 30,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}
                                />
                            </Row>
                            <Space height={20} />
                            <Row justifyContent='space-between'>
                                <TextComponent text='Item total' />
                                <TextComponent text={`$${itemTotal}`} />
                            </Row>
                            <Space height={10} />

                            <Row justifyContent='space-between'>
                                <TextComponent text='Discount' />
                                <TextComponent text='$0' />
                            </Row>
                            <Space height={10} />

                            <Row justifyContent='space-between'>
                                <TextComponent text='Delivery Free' />
                                <TextComponent text='Free' />
                            </Row>
                            <Space height={10} />
                            <Row>
                                <View
                                    style={{
                                        height: 1,
                                        flex: 1,
                                        backgroundColor: colors.gray.g500_20
                                    }}
                                />
                            </Row>
                            <Space height={20} />
                            <Row justifyContent='space-between'>
                                <TextComponent text='Grand total' />
                                {/* Để tạm sau này sẽ setState sau */}
                                <TextComponent text={`$${itemTotal}`} />
                            </Row>
                            <Space height={40} />
                        </Section>
                    }
                />

                {/* Đoạn mới Design */}
                <Section>
                    <ButtonComponent
                        onPress={() => navigation.navigate('CheckoutScreen')}
                        backgroundColor={colors.primary.p500}
                        type='primary'
                        value='Pay Now'
                    />
                </Section>
            </>
        </Container>
    );
};

export default CartScreen;
