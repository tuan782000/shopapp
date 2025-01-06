import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  CardComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowLeft2, Edit2, Mobile, ShoppingCart} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import {InfoModal} from '../../modals';

const OrderReviewScreen = ({navigation, route}: any) => {
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);

  return (
    <>
      <Row
        styles={{
          paddingTop: Platform.OS === 'ios' ? 40 : 20,
          backgroundColor: colors.white.w500,
        }}>
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
          <ArrowLeft2 color={colors.dark.d500} />
        </TouchableOpacity>
        <TextComponent
          flex={1}
          textAlign="center"
          numberOfLines={1}
          font={fonts.Bold}
          size={18}
          color={colors.dark.d500}
          styles={{paddingRight: 30}} // bên phải có icon thì xoá này đi
          // text={product.title}
          text="Order Review"
        />
      </Row>
      <ScrollView style={{flex: 1, backgroundColor: colors.white.w500}}>
        <Section>
          <Space height={20} />
          <TextComponent text="Item details" />
          <Space height={20} />
          <Row alignItems="flex-start" justifyContent="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 100,
                height: 100,
                maxHeight: 100, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={20} />
            <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
              <TextComponent text="Dennis Lingo" font={fonts.Bold} />
              <TextComponent text="$ 250" />
              <Row>
                <TextComponent text="QTY:" />
                <TextComponent text="1" />
              </Row>
            </Row>
          </Row>
          <Space height={20} />
          <Row alignItems="flex-start" justifyContent="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 100,
                height: 100,
                maxHeight: 100, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={20} />
            <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
              <TextComponent text="Dennis Lingo" font={fonts.Bold} />
              <TextComponent text="$ 250" />
              <Row>
                <TextComponent text="QTY:" />
                <TextComponent text="1" />
              </Row>
            </Row>
          </Row>
          <Space height={20} />

          <Row alignItems="flex-start" justifyContent="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 100,
                height: 100,
                maxHeight: 100, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={20} />
            <Row styles={{flexDirection: 'column'}} alignItems="flex-start">
              <TextComponent text="Dennis Lingo" font={fonts.Bold} />
              <TextComponent text="$ 250" />
              <Row>
                <TextComponent text="QTY:" />
                <TextComponent text="1" />
              </Row>
            </Row>
          </Row>
          <Space height={20} />

          {/* <View
              style={[
                globalStyles.card,
                globalStyles.shadow,
                {marginBottom: 16},
              ]}>

            </View> */}
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
          <Space height={20} />
          <TextComponent text="Delivery Address" font={fonts.Bold} />
          <Space height={20} />
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row justifyContent="space-between">
              <TextComponent text="Smith Waton" font={fonts.Bold} />
              <View
                style={{
                  backgroundColor: colors.primary.p500_10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Edit2
                  color={colors.primary.p500}
                  size={20}
                  onPress={() => navigation.navigate('SelectAddressScreen')}
                />
              </View>
            </Row>
            <Space height={5} />
            <TextComponent text="1901 Thronrnidge" />
            <Space height={5} />
            <TextComponent text="880163" />
          </CardComponent>
          <Space height={10} />
          <TextComponent text="Payment Detail" font={fonts.Bold} />
          <Space height={20} />
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row alignItems="flex-start">
              {/*  */}
              <Image
                source={{
                  uri: 'https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png',
                }}
                style={{
                  resizeMode: 'contain',
                  width: 50,
                  height: 50,
                  maxHeight: 50, // lý do để maxHeight để cho các ảnh cao bằng nhau
                  borderRadius: 12,
                }}
              />
              <Space width={15} />
              <Row
                justifyContent="flex-start"
                alignItems="flex-start"
                flex={1}
                styles={{flexDirection: 'column'}}>
                <TextComponent text="Smith Waton" />
                <Space height={5} />
                <TextComponent text="8801 6389 9000 1234" />
              </Row>
              <Space width={10} />
              <View
                style={{
                  backgroundColor: colors.primary.p500_10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Edit2
                  color={colors.primary.p500}
                  size={20}
                  onPress={() => navigation.navigate('SelectAddressScreen')}
                />
              </View>
            </Row>
          </CardComponent>
          <Space width={20} />
          <TextComponent text="Order Summary" font={fonts.Bold} />
          <Space height={20} />
          <Row justifyContent="space-between">
            <TextComponent text="Item total" />
            <TextComponent text="$10.000" />
          </Row>
          <Space height={10} />

          <Row justifyContent="space-between">
            <TextComponent text="Discount" />
            <TextComponent text="$50" />
          </Row>
          <Space height={10} />

          <Row justifyContent="space-between">
            <TextComponent text="Delivery Free" />
            <TextComponent text="Free" />
          </Row>
          <Space height={10} />
          <Row>
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: colors.gray.g500_20,
              }}
            />
          </Row>
          <Space height={20} />
          <Row justifyContent="space-between">
            <TextComponent text="Grand total" />
            <TextComponent text="$999.50" />
          </Row>
          <Space height={40} />

          <ButtonComponent
            onPress={() => setIsVisibleModalInfo(true)}
            // onPress={() => navigation.navigate('CheckoutScreen')}
            backgroundColor={colors.primary.p500}
            type="primary"
            value="Pay Now"
          />
          <Space height={40} />
        </Section>
      </ScrollView>

      <InfoModal
        visible={isVisibleModalInfo}
        onOk={() => {
          setIsVisibleModalInfo(false);
          navigation.navigate('MyOrderScreen');
        }}
        title={`Order Place\n Successfully`}
        description="You have successfully made order"
        icon={
          <View
            style={{
              backgroundColor: colors.primary.p500_10,
              padding: 30,
              borderRadius: 999,
            }}>
            <View
              style={{
                backgroundColor: colors.primary.p500,
                padding: 20,
                borderRadius: 999,
              }}>
              <ShoppingCart size={50} color={colors.white.w500} />
            </View>
          </View>
        }
        okText="View Order Status"
      />
    </>
  );
};

export default OrderReviewScreen;
