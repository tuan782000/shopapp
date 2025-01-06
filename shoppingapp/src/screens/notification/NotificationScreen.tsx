import {View, Text} from 'react-native';
import React from 'react';
import {Container, Row, Section, Space, TextComponent} from '../../components';
import {Icon, ReceiptDisscount} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const NotificationScreen = () => {
  return (
    <Container back title="Notifications" titlePosition="center">
      <Section>
        <Space height={20} />
        <TextComponent text="Today" />
        <Space height={10} />
        <Row justifyContent="flex-start">
          <View
            style={{
              backgroundColor: colors.gray.g500_10,
              padding: 20,
              borderRadius: 999,
            }}>
            <ReceiptDisscount size={20} color={colors.primary.p500} />
          </View>
          <Row
            alignItems="flex-start"
            styles={{flexDirection: 'column', marginLeft: 20}}
            flex={1}>
            <TextComponent text="Flat 30% OFF" font={fonts.Medium} size={18} />
            <TextComponent
              text="Get 30% OFF on your first order"
              color={colors.gray.g500_90}
            />
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
        <Row justifyContent="flex-start">
          <View
            style={{
              backgroundColor: colors.gray.g500_10,
              padding: 20,
              borderRadius: 999,
            }}>
            <ReceiptDisscount size={20} color={colors.primary.p500} />
          </View>
          <Row
            alignItems="flex-start"
            styles={{flexDirection: 'column', marginLeft: 20}}
            flex={1}>
            <TextComponent text="Flat 30% OFF" font={fonts.Medium} size={18} />
            <TextComponent
              text="Get 30% OFF on your first order"
              color={colors.gray.g500_90}
            />
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
        <Space height={10} />

        <TextComponent text="Yesterday" />
        <Space height={15} />

        <Row justifyContent="flex-start">
          <View
            style={{
              backgroundColor: colors.gray.g500_10,
              padding: 20,
              borderRadius: 999,
            }}>
            <ReceiptDisscount size={20} color={colors.primary.p500} />
          </View>
          <Row
            alignItems="flex-start"
            styles={{flexDirection: 'column', marginLeft: 20}}
            flex={1}>
            <TextComponent text="Flat 30% OFF" font={fonts.Medium} size={18} />
            <TextComponent
              text="Get 30% OFF on your first order"
              color={colors.gray.g500_90}
            />
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
        <Row justifyContent="flex-start">
          <View
            style={{
              backgroundColor: colors.gray.g500_10,
              padding: 20,
              borderRadius: 999,
            }}>
            <ReceiptDisscount size={20} color={colors.primary.p500} />
          </View>
          <Row
            alignItems="flex-start"
            styles={{flexDirection: 'column', marginLeft: 20}}
            flex={1}>
            <TextComponent text="Flat 30% OFF" font={fonts.Medium} size={18} />
            <TextComponent
              text="Get 30% OFF on your first order"
              color={colors.gray.g500_90}
            />
          </Row>
        </Row>
        <Space height={15} />
      </Section>
    </Container>
  );
};

export default NotificationScreen;
