import { useNavigation } from '@react-navigation/native';
import { TickCircle } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import RnRangeSlider from 'rn-range-slider';
import { HandleAPI } from '../api/handleAPI';
import {
    ButtonComponent,
    Row,
    Section,
    Space,
    Tabbar,
    TextComponent
} from '../components';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { CategoryModel } from '../models/CategoryModel';
import { globalStyles } from '../styles/globalStyles';

// Xoá bỏ warning: https://stackoverflow.com/questions/76012269/warn-sending-onanimatedvalueupdate-with-no-listeners-registered
// import {Animated} from 'react-native';
// const av = new Animated.Value(0);
// av.addListener(() => {
//   return;
// });
//

type Props = {
    visible: boolean;
    onClose: () => void;
};

interface Prices {
    min: number;
    max: number;
}

const FilterModal = (props: Props) => {
    const { onClose, visible } = props;
    const modalizeRef = useRef<Modalize>();

    const [isLoading, setIsLoading] = useState(false);

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    // const [prices, setPrices] = useState<Prices>();
    const [prices, setPrices] = useState<Prices>();

    const [filterData, setFilterData] = useState<{
        categoriesSelected: String[];
        sizesSelected: String[];
        price: {
            min: number;
            max: number;
        };
    }>({
        categoriesSelected: [],
        sizesSelected: [],
        price: {
            min: 0,
            max: 0
        }
    });

    const navigation: any = useNavigation();

    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }
    }, [visible]);

    useEffect(() => {
        getFilterData();
    }, []);

    const getFilterData = async () => {
        setIsLoading(true);
        try {
            await getCategories();
            await getSizes();
            await getPrices();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategories = async () => {
        const api = `/all-categories`;
        const res = await HandleAPI.Category(api);
        // console.log(res.data);
        setCategories(res.data);
    };
    const getSizes = async () => {
        const api = `/get-product-sizes`;
        const res = await HandleAPI.Product(api);
        setSizes(res.data);
    };
    const getPrices = async () => {
        const api = `/get-product-prices`;
        const res = await HandleAPI.Product(api);
        setPrices(res.data);
    };

    const handleSelectCategories = (key: string) => {
        let items = [...filterData.categoriesSelected];

        if (key === 'all') {
            if (items.includes('all')) {
                // Nếu 'all' đang được chọn, bỏ chọn tất cả
                items = [];
            } else {
                // Nếu 'all' chưa được chọn, chọn tất cả các categories
                items = ['all', ...categories.map(category => category._id)];
            }
        } else {
            const index = items.findIndex(element => element === key);

            if (index !== -1) {
                // Nếu mục đã tồn tại, bỏ chọn nó
                items.splice(index, 1);
            } else {
                // Nếu mục chưa tồn tại, thêm vào danh sách
                items.push(key);
            }

            // Bỏ chọn 'all' nếu nó đã được chọn
            const allIndex = items.findIndex(element => element === 'all');
            if (allIndex !== -1) {
                items.splice(allIndex, 1);
            }
        }

        // Cập nhật lại
        setFilterData({ ...filterData, categoriesSelected: items });
    };

    const handleSelectSizes = (key: string) => {
        let items = [...filterData.sizesSelected];

        const index = items.findIndex(element => element === key); // có trả về - 0 có trả về -1

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(key);
        }

        setFilterData({ ...filterData, sizesSelected: items });
    };

    return (
        <Portal>
            <Modalize
                adjustToContentHeight
                handlePosition='inside'
                ref={modalizeRef}
                onClose={() => onClose()}
                modalStyle={{ paddingVertical: 20 }}
            >
                <View style={{ marginBottom: 30 }}>
                    {isLoading ? (
                        <Section>
                            <ActivityIndicator />
                        </Section>
                    ) : (
                        <>
                            <Section>
                                <TextComponent
                                    text='Filter'
                                    font={fonts.Bold}
                                    size={18}
                                />
                            </Section>
                            <Space height={20} />
                            <Section>
                                <Tabbar title='Categories' />
                            </Section>
                            <Space height={12} />
                            <FlatList
                                style={{ paddingLeft: 16 }}
                                data={categories}
                                ListHeaderComponent={
                                    <Row
                                        onPress={() =>
                                            handleSelectCategories('all')
                                        }
                                        styles={[
                                            globalStyles.tag,
                                            {
                                                marginRight: 16,
                                                backgroundColor:
                                                    filterData.categoriesSelected.includes(
                                                        'all'
                                                    )
                                                        ? colors.primary.p500_20
                                                        : colors.gray.g500_20
                                            }
                                        ]}
                                    >
                                        {filterData.categoriesSelected.includes(
                                            'all'
                                        ) && (
                                            <TickCircle
                                                size={20}
                                                color={colors.primary.p500}
                                                style={{ marginRight: 8 }}
                                            />
                                        )}

                                        <TextComponent
                                            text='All'
                                            color={
                                                filterData.categoriesSelected.includes(
                                                    'all'
                                                )
                                                    ? colors.primary.p500
                                                    : colors.dark.d500
                                            }
                                            styles={{ lineHeight: 20 }}
                                        />
                                    </Row>
                                }
                                renderItem={({ item, index }) => (
                                    <Row
                                        onPress={() =>
                                            handleSelectCategories(item._id)
                                        }
                                        key={item._id}
                                        styles={[
                                            globalStyles.tag,
                                            {
                                                marginRight:
                                                    index <
                                                    categories.length - 1
                                                        ? 16
                                                        : 32,
                                                backgroundColor:
                                                    filterData.categoriesSelected.includes(
                                                        item._id
                                                    )
                                                        ? colors.primary.p500_20
                                                        : colors.gray.g500_20
                                            }
                                        ]}
                                    >
                                        {filterData.categoriesSelected.includes(
                                            item._id
                                        ) && (
                                            <TickCircle
                                                size={20}
                                                color={colors.primary.p500}
                                                style={{ marginRight: 8 }}
                                            />
                                        )}
                                        <TextComponent
                                            text={item?.title}
                                            color={
                                                filterData.categoriesSelected.includes(
                                                    item._id
                                                )
                                                    ? colors.primary.p500
                                                    : colors.dark.d500
                                            }
                                            styles={{ lineHeight: 20 }}
                                        />
                                    </Row>
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                            <Space height={20} />
                            <Section>
                                <Tabbar title='Sizes' />
                                <Space height={12} />
                                <Row wrap='wrap' justifyContent='flex-start'>
                                    {sizes.map(size => (
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleSelectSizes(size)
                                            }
                                            style={[
                                                globalStyles.tag,
                                                {
                                                    backgroundColor:
                                                        colors.gray.g500_20,
                                                    marginRight: 16,
                                                    marginBottom: 12
                                                }
                                            ]}
                                            key={size}
                                        >
                                            <Row>
                                                {filterData.sizesSelected.includes(
                                                    size
                                                ) && (
                                                    <TickCircle
                                                        size={20}
                                                        color={
                                                            colors.primary.p500
                                                        }
                                                        style={{
                                                            marginRight: 8
                                                        }}
                                                    />
                                                )}
                                                <TextComponent
                                                    text={size}
                                                    color={
                                                        filterData.sizesSelected.includes(
                                                            size
                                                        )
                                                            ? colors.primary
                                                                  .p500
                                                            : colors.dark.d500
                                                    }
                                                />
                                            </Row>
                                        </TouchableOpacity>
                                    ))}
                                </Row>
                                <Space height={20} />
                            </Section>
                            <Section>
                                <Tabbar title='Price' />
                                <Space height={12} />
                                {prices && (
                                    <RnRangeSlider
                                        // style={{width: '100%'}}
                                        min={prices?.min}
                                        max={prices?.max}
                                        step={1}
                                        renderThumb={() => (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.primary.p500,
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 999
                                                }}
                                            />
                                        )}
                                        renderRail={() => (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.gray.g500_20,
                                                    width: '100%',
                                                    height: 4
                                                }}
                                            />
                                        )}
                                        renderRailSelected={() => (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.primary.p500,
                                                    width: '100%',
                                                    height: 4
                                                }}
                                            />
                                        )}
                                        onSliderTouchEnd={(low, high) => {
                                            // console.log(low, high);
                                            setFilterData({
                                                ...filterData,
                                                price: {
                                                    min: low,
                                                    max: high
                                                }
                                            });
                                        }}
                                    />
                                )}
                            </Section>
                            <Space height={20} />
                            <Section>
                                <ButtonComponent
                                    type='primary'
                                    onPress={() => {
                                        modalizeRef.current?.close();
                                        navigation.navigate('FilterScreen', {
                                            filterData
                                        });
                                    }}
                                    backgroundColor={colors.primary.p500}
                                    inline
                                    value='Apply'
                                />
                            </Section>
                        </>
                    )}
                </View>
            </Modalize>
        </Portal>
    );
};

export default FilterModal;
