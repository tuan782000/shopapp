import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
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
import {ArrowLeft2, ImportCurve} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import {Rating} from 'react-native-ratings';

const OrderDetailScreen = ({navigation, route}: any) => {
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
          text="Order Details"
        />
      </Row>
      <ScrollView style={{flex: 1, backgroundColor: colors.white.w500}}>
        <Section>
          <Space height={20} />
          <Row justifyContent="flex-start">
            <TextComponent text="Order ID: " font={fonts.Bold} size={16} />
            <TextComponent text="897823459000" font={fonts.Bold} size={16} />
          </Row>
          <Row justifyContent="flex-start">
            <TextComponent
              text="Order Date: "
              color={colors.gray.g500_80}
              size={12}
            />
            <TextComponent
              text="March 2021, 2023"
              color={colors.gray.g500_80}
              size={12}
            />
          </Row>

          <Space height={20} />
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>
          <CardComponent type="horizontal" styles={{marginHorizontal: 0}}>
            <Row styles={{flexDirection: 'column'}}>
              <Row justifyContent="flex-start" alignItems="flex-start">
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
                <Space width={10} />
                <View style={{flex: 1}}>
                  <TextComponent text="Dennis Lingo" />
                  <Space height={10} />
                  <TextComponent text="$250" />
                  <Space height={10} />
                  <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                      <TextComponent text="QTY:" />
                      <TextComponent text="1" />
                    </Row>
                    <View
                      style={{
                        backgroundColor: colors.gray.g500_20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}>
                      <TextComponent
                        text="Delivered"
                        color={colors.primary.p500}
                        size={12}
                      />
                    </View>
                  </Row>
                </View>
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <ButtonComponent
                  onPress={() => console.log('Reorder')}
                  value="Reorder"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('WriteReviewScreen')}
                  //   onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="Write Review"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
              <Space height={20} />
              <Row justifyContent="space-between">
                <TextComponent
                  text="Your Ratings"
                  font={fonts.Bold}
                  styles={{flex: 1}}
                />
                {/* <Rating /> */}
                {/* <View></View> */}
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
              </Row>
            </Row>
          </CardComponent>

          <Space height={20} />
          <TextComponent text="Delivery Address" font={fonts.Bold} />
          <Space height={10} />
          <TextComponent text="1901 Theard ANCC" />
          <Space height={10} />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
          <Space height={20} />
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
        </Section>
      </ScrollView>
      <Section>
        <ButtonComponent
          onPress={() => console.log('Download Invoice')}
          // onPress={() => navigation.navigate('CheckoutScreen')} // truyền props ở đây
          backgroundColor={colors.primary.p500}
          type="primary"
          value="Download Invoice"
          icon={<ImportCurve size={20} color={colors.white.w500} />}
          iconPosition="left"
          inline
          buttonStyles={{marginTop: 10, marginBottom: 40}}
        />
      </Section>
    </>
  );
};

export default OrderDetailScreen;
