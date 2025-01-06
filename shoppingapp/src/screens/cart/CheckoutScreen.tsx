import {View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  Container,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {fonts} from '../../constants/fonts';
import {
  AddCircle,
  ArrowLeft2,
  Edit2,
  Location,
  Paypal,
  ReceiptDisscount,
} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

// nhận props navigate để lấy các thông đã được làm bên giỏ hàng
const CheckoutScreen = ({navigation, route}: any) => {
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
          text="Checkout"
        />
      </Row>
      <Section>
        <Space height={10} />
        <Row justifyContent="space-between" alignItems="center">
          <TextComponent text="Shipping Addrees" font={fonts.Bold} size={18} />
          <Edit2
            color={colors.dark.d500}
            size={20}
            onPress={() => navigation.navigate('SelectAddressScreen')}
          />
        </Row>
        <Space height={15} />
        <Row justifyContent="flex-start">
          <View
            style={{
              backgroundColor: colors.primary.p500,
              padding: 10,
              borderRadius: 999,
            }}>
            <Location size={20} color={colors.white.w500} />
          </View>
          <Row
            alignItems="flex-start"
            styles={{flexDirection: 'column', marginLeft: 20}}
            flex={1}>
            <TextComponent text="Home" font={fonts.Medium} />
            <Space height={5} />
            <TextComponent text="322/10 Dien Bien Phu" />
          </Row>
        </Row>
        <Space height={15} />
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: colors.gray.g500_20,
          }}
        />
        <Space height={15} />
        <TextComponent text="Add Payment Method" font={fonts.Bold} size={18} />
        <Space height={15} />
        <Row
          justifyContent="space-between"
          onPress={() => console.log('Add Card')}>
          <Row justifyContent="flex-start">
            <View
              style={{
                backgroundColor: colors.primary.p500,
                padding: 10,
                borderRadius: 999,
                marginRight: 20,
              }}>
              <Location size={20} color={colors.white.w500} />
            </View>
            <TextComponent text="Debit/CreditCard" size={18} />
          </Row>
          <AddCircle size={16} color={colors.primary.p500} />
        </Row>
        <Space height={20} />
        <Row styles={{flexDirection: 'column'}}>
          <Input
            onChange={() => {}}
            value=""
            placeholder="Card Number"
            styles={{borderRadius: 999, backgroundColor: colors.gray.g500_10}}
          />
          <Row justifyContent="space-between">
            <Input
              onChange={() => {}}
              value=""
              placeholder="Expriy Date"
              styles={{
                borderRadius: 999,
                backgroundColor: colors.gray.g500_10,
                flex: 1,
              }}
            />
            <Space width={10} />
            <Input
              onChange={() => {}}
              value=""
              placeholder="CVV"
              styles={{
                borderRadius: 999,
                backgroundColor: colors.gray.g500_10,
                flex: 1,
              }}
            />
          </Row>
        </Row>
        <Space height={10} />
      </Section>
      <ScrollView
        style={{flex: 1, zIndex: -1, backgroundColor: colors.white.w500}}>
        <Section>
          <Space height={10} />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
          <Space height={10} />
          <Row
            justifyContent="space-between"
            onPress={() => console.log('Paypal')}>
            <Row justifyContent="flex-start">
              <View
                style={{
                  backgroundColor: colors.primary.p500,
                  padding: 10,
                  borderRadius: 999,
                  marginRight: 20,
                }}>
                <Paypal size={20} color={colors.white.w500} />
              </View>
              <TextComponent text="Paypal" size={18} />
            </Row>
            <AddCircle size={16} color={colors.primary.p500} />
          </Row>
          <Space height={10} />
          <Row
            justifyContent="space-between"
            onPress={() => console.log('Paypal')}>
            <Row justifyContent="flex-start">
              <View
                style={{
                  backgroundColor: colors.primary.p500,
                  padding: 10,
                  borderRadius: 999,
                  marginRight: 20,
                }}>
                <Paypal size={20} color={colors.white.w500} />
              </View>
              <TextComponent text="Paypal" size={18} />
            </Row>
            <AddCircle size={16} color={colors.primary.p500} />
          </Row>
          <Space height={10} />
          <Row
            justifyContent="space-between"
            onPress={() => console.log('Paypal')}>
            <Row justifyContent="flex-start">
              <View
                style={{
                  backgroundColor: colors.primary.p500,
                  padding: 10,
                  borderRadius: 999,
                  marginRight: 20,
                }}>
                <Paypal size={20} color={colors.white.w500} />
              </View>
              <TextComponent text="Paypal" size={18} />
            </Row>
            <AddCircle size={16} color={colors.primary.p500} />
          </Row>
          <Space height={10} />
          <Row
            justifyContent="space-between"
            onPress={() => console.log('Paypal')}>
            <Row justifyContent="flex-start">
              <View
                style={{
                  backgroundColor: colors.primary.p500,
                  padding: 10,
                  borderRadius: 999,
                  marginRight: 20,
                }}>
                <Paypal size={20} color={colors.white.w500} />
              </View>
              <TextComponent text="Paypal" size={18} />
            </Row>
            <AddCircle size={16} color={colors.primary.p500} />
          </Row>
        </Section>
      </ScrollView>
      <Section>
        <ButtonComponent
          onPress={() => navigation.navigate('OrderReviewScreen')}
          backgroundColor={colors.primary.p500}
          value="Pay Now"
          inline
          buttonStyles={{
            marginBottom: 40,
            marginTop: 10,
          }}
        />
      </Section>
    </>
  );
};

export default CheckoutScreen;
