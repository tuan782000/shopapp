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
import {ArrowLeft2} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';

const MyOrderScreen = ({navigation, route}: any) => {
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
          text="My Orders"
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
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
                        text="Order Placed"
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
                  onPress={() => console.log('Cancel Order')}
                  value="Cancel Order"
                  backgroundColor={colors.primary.p500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
                <Space width={10} />
                <ButtonComponent
                  onPress={() => navigation.navigate('OrderDetailScreen')}
                  value="View Details"
                  backgroundColor={colors.gray.g500_20}
                  color={colors.dark.d500}
                  borderRadius={10}
                  inline
                  buttonStyles={{flex: 1}}
                />
              </Row>
            </Row>
          </CardComponent>
        </Section>
      </ScrollView>
    </>
  );
};

export default MyOrderScreen;
