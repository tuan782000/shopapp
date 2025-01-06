import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAuthAPI } from '../../api/authAPI';
import {
    ButtonComponent,
    Container,
    Row,
    Section,
    Space,
    TextComponent
} from '../../components';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { SIZES } from '../../constants/theme';
import { Loading } from '../../modals';
import { addAuth } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';
// ? navigation
const VerificationCode = ({ navigation, route }: any) => {
    // Redux
    const dispatch = useDispatch();

    const { code, id } = route.params;

    // console.log(route.params);
    // console.log(code);
    // console.log(id);

    const [numbers, setNumbers] = useState<string[]>([]);
    const [isLoading, setisLoading] = useState(false);

    const inputRef1 = useRef<TextInput>(null);
    const inputRef2 = useRef<TextInput>(null);
    const inputRef3 = useRef<TextInput>(null);
    const inputRef4 = useRef<TextInput>(null);

    useEffect(() => {
        inputRef1.current?.focus();
    }, []);

    const handleChangeValue = (val: string, index: number) => {
        const items = [...numbers];
        items[index] = val;

        setNumbers(items);
    };

    const handleVerification = async () => {
        if (numbers.length < 4) {
            Alert.alert('Notfication', 'Verification code is not correct');
        } else {
            setisLoading(true);
            let nums = '';
            numbers.forEach(num => (nums += num));

            if (nums != `${code}`) {
                Alert.alert('Notification', 'Verification code is not correct');
            } else {
                try {
                    const res = await handleAuthAPI(
                        '/verification',
                        { id },
                        'post'
                    );
                    setisLoading(false);

                    await AsyncStorage.setItem(
                        'authData',
                        JSON.stringify(res.data)
                    );
                    dispatch(addAuth(res.data));
                } catch (error) {
                    // console.log(error);
                    setisLoading(false);
                }
            }
        }
    };

    return (
        <Container back>
            <Section>
                <View style={[globalStyles.center]}>
                    <TextComponent
                        textAlign='center'
                        text='Enter Verification Code'
                        size={25}
                        font={fonts.Bold}
                    />
                    <Space height={10} />
                    <TextComponent
                        textAlign='center'
                        text='We have sent the code verification to your mobile number'
                        color={colors.gray.g500_80}
                        numberOfLines={2}
                        styles={{ width: 300 }}
                    />
                    <Image
                        source={require('../../assets/images/Enter-OTP-cuate.png')}
                        style={{ width: SIZES.width, height: 340 }}
                        resizeMode='contain'
                    />
                </View>

                <Space height={40} />

                <Row justifyContent='space-around'>
                    <TextInput
                        ref={inputRef1}
                        value={numbers[0]}
                        onChangeText={val => {
                            handleChangeValue(val, 0);
                            val && inputRef2.current?.focus();
                        }}
                        style={[
                            localStyles.input,
                            {
                                backgroundColor: inputRef1.current?.isFocused()
                                    ? colors.white.w500
                                    : colors.light.l500,
                                borderWidth: inputRef1.current?.isFocused()
                                    ? 1
                                    : 0,
                                borderColor: colors.gray.g500
                            }
                        ]}
                        keyboardType='number-pad'
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputRef2}
                        value={numbers[1]}
                        onChangeText={val => {
                            handleChangeValue(val, 1);
                            val && inputRef3.current?.focus();
                        }}
                        style={[
                            localStyles.input,
                            {
                                backgroundColor: inputRef1.current?.isFocused()
                                    ? colors.white.w500
                                    : colors.light.l500,
                                borderWidth: inputRef1.current?.isFocused()
                                    ? 1
                                    : 0,
                                borderColor: colors.gray.g500
                            }
                        ]}
                        keyboardType='number-pad'
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputRef3}
                        value={numbers[2]}
                        onChangeText={val => {
                            handleChangeValue(val, 2);
                            val && inputRef4.current?.focus();
                        }}
                        style={[
                            localStyles.input,
                            {
                                backgroundColor: inputRef1.current?.isFocused()
                                    ? colors.white.w500
                                    : colors.light.l500,
                                borderWidth: inputRef1.current?.isFocused()
                                    ? 1
                                    : 0,
                                borderColor: colors.gray.g500
                            }
                        ]}
                        keyboardType='number-pad'
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputRef4}
                        value={numbers[3]}
                        onChangeText={val => handleChangeValue(val, 3)}
                        style={[
                            localStyles.input,
                            {
                                backgroundColor: inputRef1.current?.isFocused()
                                    ? colors.white.w500
                                    : colors.light.l500,
                                borderWidth: inputRef1.current?.isFocused()
                                    ? 1
                                    : 0,
                                borderColor: colors.gray.g500
                            }
                        ]}
                        keyboardType='number-pad'
                        maxLength={1}
                    />
                </Row>
                <Space height={10} />
                <Row justifyContent='flex-end'>
                    <TextComponent text='00:30' />
                    <Space width={5} />
                    <ButtonComponent
                        onPress={() => console.log('resend otp')}
                        type='text'
                        value='Resend it'
                        color={colors.primary.p500}
                    />
                </Row>
                <Space height={20} />
                <ButtonComponent
                    onPress={handleVerification}
                    type='primary'
                    backgroundColor={colors.primary.p500}
                    value='Verify'
                />
            </Section>
            <Loading visible={isLoading} />
        </Container>
    );
};

export default VerificationCode;

const localStyles = StyleSheet.create({
    input: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: colors.light.l500,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: fonts.Bold,
        fontSize: 28,
        lineHeight: 40
    }
});
