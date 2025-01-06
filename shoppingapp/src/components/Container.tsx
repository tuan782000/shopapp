import { View, Text, SafeAreaView, ScrollView, Platform } from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';
import Row from './Row';
import ButtonComponent from './ButtonComponent';
import { ArrowLeft, ArrowLeft2, Home } from 'iconsax-react-native';
import { colors } from '../constants/colors';
import TextComponent from './TextComponent';
import { StatusBar } from 'react-native';
import Space from './Space';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';

type Props = {
    children: ReactNode;
    isScroll?: boolean;
    back?: boolean;
    title?: string;
    titlePosition?: 'left' | 'center' | 'right';
    right?: ReactNode;
    left?: ReactNode;
};

const Container = (props: Props) => {
    const { children, isScroll, back, title, titlePosition, right, left } =
        props;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[globalStyles.container]}>
            {title || back || right || left ? (
                <Row
                    styles={{
                        marginTop: Platform.OS === 'android' ? 30 : 0,
                        paddingHorizontal: 16
                    }}
                >
                    {left && left}
                    {back ? (
                        <ButtonComponent
                            // android quy định nút nên có chiều cao 48
                            buttonStyles={{ minWidth: 42, minHeight: 42 }}
                            inline
                            icon={
                                <ArrowLeft2
                                    size={28}
                                    color={colors.dark.d500}
                                />
                            }
                            onPress={() => {
                                if (navigation.canGoBack()) {
                                    navigation.goBack();
                                }
                            }}
                        />
                    ) : (
                        <Space width={42} />
                    )}
                    <View style={{ flex: 1, paddingHorizontal: 16 }}>
                        {title && (
                            <TextComponent
                                numberOfLines={1}
                                font={fonts.Semibold}
                                size={18}
                                text={title}
                                textAlign={titlePosition ?? 'left'}
                            />
                        )}
                    </View>
                    {right ? (
                        <View
                            style={[
                                globalStyles.center,
                                { minWidth: 42, minHeight: 42 }
                            ]}
                        >
                            {right}
                        </View>
                    ) : (
                        <Space width={42} />
                    )}
                </Row>
            ) : null}
            {!isScroll && isScroll !== false ? (
                <ScrollView style={[globalStyles.container]}>
                    {children}
                </ScrollView>
            ) : (
                <View style={[globalStyles.container]}>{children}</View>
            )}
        </SafeAreaView>
    );
};

export default Container;
