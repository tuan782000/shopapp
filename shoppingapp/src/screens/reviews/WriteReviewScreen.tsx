import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
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
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowLeft2, Export, ImportCurve} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import {Rating} from 'react-native-ratings';

const WriteReviewScreen = ({navigation, route}: any) => {
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
          text="Write a Review"
        />
      </Row>
      <ScrollView style={{flex: 1, backgroundColor: colors.white.w500}}>
        <Section>
          <Space height={20} />
          <Row
            alignItems="flex-start"
            styles={{
              backgroundColor: colors.primary.p500_20,
              padding: 10,
              borderRadius: 20,
            }}>
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
            <Row
              alignItems="flex-start"
              justifyContent="flex-start"
              styles={{flexDirection: 'column', flex: 1}}>
              <TextComponent text="Dennis Lingo" font={fonts.Bold} />
              <Space height={10} />
              <Row>
                <TextComponent text="Size:" />
                <TextComponent text="XL" />
              </Row>
              <Space height={10} />
              <TextComponent text="$250" font={fonts.Bold} />
            </Row>
          </Row>
          <Space height={20} />
          <TextComponent text="Select Star" font={fonts.Bold} size={16} />
          <Rating
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
          <Space height={20} />
          <TextComponent
            text="Add Photo or Video"
            font={fonts.Bold}
            size={16}
          />
          <Space height={20} />
          {/* <Input onChange={() => {}} value="" /> */}
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Export size={40} color={colors.primary.p500} />
            <Space height={10} />
            <TextComponent text="Click here to upload" />
          </View>
          <Space height={20} />
          <TextComponent text="Write your Reivew" font={fonts.Bold} size={16} />
          <Space height={20} />
          {/* <Input autoCapitalize='none' onChange={() => {}} value=''/> */}
          <TextInput
            style={{
              height: 40,
              padding: 10,
              borderWidth: 1,
              minHeight: 100,
              borderRadius: 10,
              borderColor: colors.gray.g500_20,
            }}
            multiline
            placeholder="Write Some thing about this product"
          />
          <Space height={20} />
        </Section>
      </ScrollView>
      <Section>
        <ButtonComponent
          onPress={() => navigation.navigate('ReviewScreen')}
          // onPress={() => navigation.navigate('CheckoutScreen')} // truyền props ở đây
          backgroundColor={colors.primary.p500}
          type="primary"
          value="Submit Review"
          inline
          buttonStyles={{marginTop: 10, marginBottom: 40}}
        />
      </Section>
    </>

    // <Container back title="Write a Review" titlePosition="center">
    //   <Section>
    //     <Space height={20} />
    //     <Row>
    //       <Image
    //         source={{
    //           uri: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //         }}
    //         style={{
    //           resizeMode: 'cover',
    //           width: 100,
    //           height: 100,
    //           maxHeight: 100, // lý do để maxHeight để cho các ảnh cao bằng nhau
    //           borderRadius: 12,
    //         }}
    //       />
    //       <Space width={10} />
    //       <Row
    //         alignItems="flex-start"
    //         justifyContent="flex-start"
    //         styles={{flexDirection: 'column', flex: 1}}>
    //         <TextComponent text="Dennis Lingo" />
    //         <Space height={10} />
    //         <Row>
    //           <TextComponent text="Size:" />
    //           <TextComponent text="XL" />
    //         </Row>
    //         <Space height={10} />
    //         <TextComponent text="$250" />
    //       </Row>
    //     </Row>
    //   </Section>
    // </Container>
  );
};

export default WriteReviewScreen;
