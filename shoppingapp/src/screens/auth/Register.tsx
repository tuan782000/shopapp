import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    ButtonComponent,
    Container,
    Input,
    Row,
    Section,
    Space,
    TextComponent
} from '../../components';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import { Lock1, Sms, User } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Loading } from '../../modals';
import { handleAuthAPI } from '../../api/authAPI';
import SocialLogin from './components/SocialLogin';
// ? confirmPassword
const initialStateFormRegister = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const initialErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const initialIcons = {
    name: <User size={20} color={colors.gray.g500_80} />,
    email: <Sms size={20} color={colors.gray.g500_80} />,
    password: <Lock1 size={20} color={colors.gray.g500_80} />,
    confirmPassword: <Lock1 size={20} color={colors.gray.g500_80} />
};

const Register = ({ navigation }: any) => {
    const [registerForm, setRegisterForm] = useState<any>(
        initialStateFormRegister
    );

    const [errors, setErrors] = useState<any>(initialErrors);

    const icons: any = initialIcons;

    const [isFormValid, setIsFormValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const noErrors = Object.values(errors).every(error => error === '');
        const allFieldsFilled = Object.values(registerForm).every(
            value => value !== ''
        );
        setIsFormValid(noErrors && allFieldsFilled);
    }, [registerForm, errors]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...registerForm };
        data[`${key}`] = value;
        setRegisterForm(data);

        validateInput(key, value);
    };

    const validateInput = (key: string, value: string) => {
        const newErrors: any = { ...errors };

        switch (key) {
            case 'name':
                newErrors.name =
                    value.length < 3
                        ? 'Name must be at least 3 characters'
                        : '';
                break;
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
            case 'confirmPassword':
                newErrors.confirmPassword =
                    value !== registerForm.password
                        ? 'Passwords do not match'
                        : '';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSignUp = async () => {
        // Check for errors before submitting
        if (Object.values(errors).some(error => error !== '')) {
            console.log('There are errors in the form');
            return;
        }

        setIsLoading(true);

        try {
            const data = {
                email: registerForm.email,
                name: registerForm.name,
                password: registerForm.password
            };

            const res: any = await handleAuthAPI('/register', data, 'post');
            // console.log(res.data);

            navigation.navigate('VerificationCode', {
                code: res.data.verificationCode,
                id: res.data.id
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

        console.log(registerForm);
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
                        text='Create New Account'
                        size={25}
                        font={fonts.Bold}
                    />
                    <Space height={10} />
                    <TextComponent
                        text="Looks like you don't have an account or connect with social networks"
                        size={16}
                        color={colors.gray.g500_80}
                        numberOfLines={2}
                        styles={{ width: 300 }}
                        textAlign='center'
                    />
                </View>
                <Space height={25} />

                {Object.keys(registerForm).map(key => (
                    <View key={key}>
                        {errors[key] ? (
                            <TextComponent
                                text={errors[key]}
                                color={colors.options.red}
                            />
                        ) : null}
                        <Input
                            value={registerForm[`${key}`]}
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

                <ButtonComponent
                    disabled={!isFormValid}
                    onPress={handleSignUp}
                    type='primary'
                    value='Sign Up'
                    backgroundColor={
                        isFormValid ? colors.primary.p500 : colors.gray.g500
                    }
                />
                <SocialLogin />

                <Row>
                    <TextComponent text='Already have an account?' />
                    <Space width={4} />
                    <ButtonComponent
                        onPress={() => navigation.navigate('Login')}
                        type='link'
                        value='Login'
                    />
                </Row>
            </Section>
            <Loading visible={isLoading} />
        </Container>
    );
};

export default Register;
