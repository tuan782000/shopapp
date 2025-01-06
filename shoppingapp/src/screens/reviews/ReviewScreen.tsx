import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {Row, Section, Space, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowLeft2} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import {Rating} from 'react-native-ratings';

const ReviewScreen = ({navigation, route}: any) => {
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
          text="Reviews"
        />
      </Row>
      <ScrollView style={{flex: 1, backgroundColor: colors.white.w500}}>
        <Section>
          <Space height={20} />
          <Row>
            <TextComponent text="4.2" size={30} font={fonts.Bold} />
            <Space width={20} />
            <Row
              styles={{flexDirection: 'column'}}
              flex={1}
              justifyContent="flex-start"
              alignItems="flex-start">
              <Rating
                readonly
                type="custom"
                imageSize={25}
                ratingColor={colors.primary.p500}
                ratingBackgroundColor={colors.light.l500}
                tintColor={colors.white.w500}
                jumpValue={0.5}
                fractions={2}
                // onFinishRating={(value: any) => setRating(value)}
                startingValue={4.5} // nên để product.rate ở đây
              />
              <Space height={5} />
              <TextComponent
                text="120 Reviews"
                color={colors.gray.g500_80}
                size={12}
              />
            </Row>
          </Row>
        </Section>
        <Section>
          <Space height={20} />
          <Row alignItems="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 40,
                height: 40,
                maxHeight: 50, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={10} />
            <View style={{flex: 1}}>
              <Row justifyContent="space-between">
                <TextComponent text="Ketty Perry" font={fonts.Semibold} />
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
              <TextComponent
                text="05 May, 2023"
                color={colors.gray.g500_80}
                size={12}
              />
              <Space height={5} />
              <TextComponent text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nisi, illo possimus voluptate, tempora corporis necessitatibus nihil odio cumque vitae distinctio praesentium. Distinctio tenetur sint voluptate odio consectetur, totam est." />
              <Space height={10} />
              <Row justifyContent="flex-start">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
                <Space width={10} />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
              </Row>
              <Space height={10} />
            </View>
          </Row>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
        </Section>
        <Section>
          <Space height={20} />
          <Row alignItems="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 40,
                height: 40,
                maxHeight: 50, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={10} />
            <View style={{flex: 1}}>
              <Row justifyContent="space-between">
                <TextComponent text="Ketty Perry" font={fonts.Semibold} />
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
              <TextComponent
                text="05 May, 2023"
                color={colors.gray.g500_80}
                size={12}
              />
              <Space height={5} />
              <TextComponent text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nisi, illo possimus voluptate, tempora corporis necessitatibus nihil odio cumque vitae distinctio praesentium. Distinctio tenetur sint voluptate odio consectetur, totam est." />
              <Space height={10} />
              <Row justifyContent="flex-start">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
                <Space width={10} />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
              </Row>
              <Space height={10} />
            </View>
          </Row>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
        </Section>
        <Section>
          <Space height={20} />
          <Row alignItems="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 40,
                height: 40,
                maxHeight: 50, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={10} />
            <View style={{flex: 1}}>
              <Row justifyContent="space-between">
                <TextComponent text="Ketty Perry" font={fonts.Semibold} />
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
              <TextComponent
                text="05 May, 2023"
                color={colors.gray.g500_80}
                size={12}
              />
              <Space height={5} />
              <TextComponent text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nisi, illo possimus voluptate, tempora corporis necessitatibus nihil odio cumque vitae distinctio praesentium. Distinctio tenetur sint voluptate odio consectetur, totam est." />
              <Space height={10} />
              <Row justifyContent="flex-start">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
                <Space width={10} />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
              </Row>
              <Space height={10} />
            </View>
          </Row>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
        </Section>
        <Section>
          <Space height={20} />
          <Row alignItems="flex-start">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{
                resizeMode: 'cover',
                width: 40,
                height: 40,
                maxHeight: 50, // lý do để maxHeight để cho các ảnh cao bằng nhau
                borderRadius: 12,
              }}
            />
            <Space width={10} />
            <View style={{flex: 1}}>
              <Row justifyContent="space-between">
                <TextComponent text="Ketty Perry" font={fonts.Semibold} />
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
              <TextComponent
                text="05 May, 2023"
                color={colors.gray.g500_80}
                size={12}
              />
              <Space height={5} />
              <TextComponent text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nisi, illo possimus voluptate, tempora corporis necessitatibus nihil odio cumque vitae distinctio praesentium. Distinctio tenetur sint voluptate odio consectetur, totam est." />
              <Space height={10} />
              <Row justifyContent="flex-start">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
                <Space width={10} />
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    resizeMode: 'cover',
                    width: 60,
                    height: 60,
                    maxHeight: 60, // lý do để maxHeight để cho các ảnh cao bằng nhau
                    borderRadius: 12,
                  }}
                />
              </Row>
              <Space height={10} />
            </View>
          </Row>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.gray.g500_20,
            }}
          />
        </Section>
      </ScrollView>
    </>
  );
};

export default ReviewScreen;
