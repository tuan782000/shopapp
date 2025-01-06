import { Lock1, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, View } from 'react-native';
import {
    ButtonComponent,
    Container,
    Input,
    Row,
    Section,
    Space,
    TextComponent
} from '../../components';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { globalStyles } from '../../styles/globalStyles';
import { Loading } from '../../modals';
import { handleAuthAPI } from '../../api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import SocialLogin from './components/SocialLogin';

const initialStateFormLogin = {
    email: '',
    password: ''
};

const initialErrors = {
    email: '',
    password: ''
};

const initialIcons = {
    email: <Sms size={20} color={colors.gray.g500_80} />,
    password: <Lock1 size={20} color={colors.gray.g500_80} />
};

const Login = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState<any>(initialStateFormLogin);
    const icons: any = initialIcons;
    const [errors, setErrors] = useState<any>(initialErrors);

    const [isFormValid, setIsFormValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const noErrors = Object.values(errors).every(error => error === '');
        const allFieldsFilled = Object.values(loginForm).every(
            value => value !== ''
        );
        setIsFormValid(noErrors && allFieldsFilled);
    }, [loginForm, errors]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...loginForm };
        data[`${key}`] = value;
        setLoginForm(data);

        validateInput(key, value);
    };

    const validateInput = (key: string, value: string) => {
        const newErrors: any = { ...errors };

        switch (key) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                newErrors.email = !emailRegex.test(value)
                    ? 'Invalid email address'
                    : '';
                break;
            case 'password':
                newErrors.password =
                    value.length < 6
                        ? 'Password must be at least 6 characters'
                        : '';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleLogin = async () => {
        if (Object.values(errors).some(error => error !== '')) {
            console.log('There are errors in the form');
            return;
        }

        setIsLoading(true);

        try {
            const data = {
                email: loginForm.email,
                password: loginForm.password
            };
            const res: any = await handleAuthAPI('/login', data, 'post');
            await AsyncStorage.setItem('authData', JSON.stringify(res.data));
            dispatch(addAuth(res.data));
            // console.log(res.data);
        } catch (error) {
            console.log(error);
            Alert.alert(`${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Section>
                <Space height={20} />
                <View style={[globalStyles.center]}>
                    <Image
                        source={require('../../assets/images/icon-logo.png')}
                        style={{
                            width: 70,
                            height: 70
                        }}
                    />
                    <Space height={20} />
                    <TextComponent
                        text='Welcome Back'
                        size={25}
                        font={fonts.Bold}
                    />
                    <Space height={10} />
                    <TextComponent
                        text='Login to your account using email or social networks'
                        size={16}
                        color={colors.gray.g500_80}
                        numberOfLines={2}
                        styles={{ width: 280 }}
                        textAlign='center'
                    />
                </View>
                <Space height={25} />
                {Object.keys(loginForm).map(key => (
                    <View key={key}>
                        {errors[key] ? (
                            <TextComponent
                                text={errors[key]}
                                color={colors.options.red}
                            />
                        ) : null}
                        <Input
                            value={loginForm[`${key}`]}
                            onChange={value => handleChangeValue(key, value)}
                            placeholder={`Please enter your ${key}`}
                            allowClear={
                                key === 'password' || key === 'confirmPassword'
                                    ? false
                                    : true
                            }
                            autoCapitalize='none'
                            password={
                                key === 'password' || key === 'confirmPassword'
                                    ? true
                                    : false
                            }
                            prefix={icons[key]}
                        />
                    </View>
                ))}
                <Space height={5} />
                <View style={{ alignItems: 'flex-end' }}>
                    <ButtonComponent
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type='link'
                        value='Forgot Password?'
                    />
                </View>
                <Space height={25} />
                <ButtonComponent
                    disabled={!isFormValid}
                    onPress={handleLogin}
                    type='primary'
                    value='Login'
                    backgroundColor={
                        isFormValid ? colors.primary.p500 : colors.gray.g500
                    }
                />
                <SocialLogin />

                <Row>
                    <TextComponent text='First time here?' />
                    <Space width={4} />
                    <ButtonComponent
                        onPress={() => navigation.navigate('Register')}
                        type='link'
                        value='SignUp'
                    />
                </Row>
            </Section>
            <Loading visible={isLoading} />
        </Container>
    );
};

export default Login;
