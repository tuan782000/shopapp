import {ArrowRight} from 'iconsax-react-native';
import React, {useRef, useState} from 'react';
import {ImageBackground, Platform, StatusBar, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  ButtonComponent,
  CardComponent,
  Row,
  Space,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {globalStyles} from '../../styles/globalStyles';

interface SlideItem {
  id: number;
  title: string;
  keyWord: string;
  description: string;
  image: any;
}

const slides: SlideItem[] = [
  {
    id: 1,
    title: 'Find the best keyWord for you',
    keyWord: 'fashion style',
    description:
      'Get exclusive limited apperal that only you have! Made by famous brand ',
    image: require('../../assets/images/shopping-slide-01.png'),
  },
  {
    id: 2,
    title: 'Define yourself in your keyWord',
    keyWord: 'unique way',
    description:
      'Get exclusive limited apperal that only you have! Made by famous brand ',
    image: require('../../assets/images/shopping-slide-02.png'),
  },
  {
    id: 3,
    title: 'Start discover your keyWord style',
    keyWord: 'unique fashion',
    description:
      'Get exclusive limited apperal that only you have! Made by famous brand ',
    image: require('../../assets/images/shopping-slide-03.png'),
  },
];
const HomeAuth = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<AppIntroSlider>(null);

  return (
    <AppIntroSlider
      ref={swiperRef}
      initialScrollIndex={index}
      onSlideChange={int => setIndex(int)}
      data={slides}
      renderItem={({item}: {item: SlideItem}) => {
        return (
          <ImageBackground
            source={item.image}
            style={{
              flex: 1,
              padding: 20,
              paddingTop:
                Platform.OS === 'android'
                  ? StatusBar.currentHeight
                    ? StatusBar.currentHeight + 20
                    : 60
                  : 60,
            }}
            imageStyle={{flex: 1, resizeMode: 'cover'}}>
            <Row justifyContent="flex-end">
              {index < slides.length - 1 && (
                <Row
                  onPress={() => {
                    // setIndex(index + 1);
                    // swiperRef.current?.goToSlide(index + 1);
                    // swiperRef.current?.goToSlide(index + (slides.length - 1));
                    navigation.navigate('Login');
                  }}>
                  <TextComponent text="Skip" color={colors.primary.p500} />
                  <Space width={8} />
                  <View
                    style={[
                      globalStyles.center,
                      {
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        backgroundColor: colors.primary.p500,
                      },
                    ]}>
                    <ArrowRight size={24} color={colors.white.w500} />
                  </View>
                </Row>
              )}
            </Row>

            {/* cách 2 */}
            <View style={{flex: 1}} />
            <Row styles={{paddingVertical: 20}}>
              <CardComponent
                styles={[
                  {
                    flex: 1,
                    padding: 30,
                    // backgroundColor: 'rgba(255,255,255,0.9)',
                    // backgroundColor: colors.white.w500,
                    // opacity: 0.9,
                  },
                ]}>
                <Text
                  style={[
                    globalStyles.text,
                    {
                      textAlign: 'center',
                      color: colors.dark.d500,
                      fontFamily: fonts.Bold,
                      fontSize: 20,
                    },
                  ]}>
                  {item.title.split('keyWord').map((text, index) => (
                    <Row
                      key={`text${index}`}
                      styles={{
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={[
                          globalStyles.text,
                          {
                            textAlign: 'center',
                            color: colors.dark.d500,
                            fontFamily: fonts.Bold,
                            fontSize: 20,
                          },
                        ]}>
                        {text}
                      </Text>
                      {index === 0 && (
                        <Text
                          key={`text${index}`}
                          style={[
                            globalStyles.text,
                            {
                              // textAlign: 'center',
                              color: colors.primary.p500,
                              fontFamily: fonts.Bold,
                              fontSize: 20,
                            },
                          ]}>
                          {item.keyWord}
                        </Text>
                      )}
                    </Row>
                  ))}
                </Text>
                <Space height={10} />
                <TextComponent
                  text={item.description}
                  color={colors.gray.g500_80}
                  size={14}
                  textAlign="center"
                />

                <Space height={20} />

                <Row>
                  {slides.map((item, int) => (
                    <View
                      key={item.id}
                      style={[
                        globalStyles.dot,
                        {
                          paddingHorizontal: int === index ? 12 : 0,
                          backgroundColor:
                            int === index
                              ? colors.primary.p500
                              : colors.gray.g500_80,
                        },
                      ]}
                    />
                  ))}
                </Row>

                <Space height={20} />

                <ButtonComponent
                  onPress={() => {
                    if (index === slides.length - 1) {
                      navigation.navigate('Login');
                    } else {
                      setIndex(index + 1);
                      swiperRef.current?.goToSlide(index + 1);
                    }
                  }}
                  value={index === slides.length - 1 ? 'Get Started' : 'Next'}
                  backgroundColor={colors.primary.p500}
                  // buttonStyles={{backgroundColor: colors.primary.p500}}
                  // color={colors.white.w500}
                  type="primary"
                  textStyleProps={{fontFamily: fonts.Bold}}
                />
              </CardComponent>
            </Row>
          </ImageBackground>
        );
      }}
      renderPagination={() => null}
    />
  );
};

export default HomeAuth;
