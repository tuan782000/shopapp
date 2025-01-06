import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import {
    ButtonComponent,
    Row,
    Space,
    TextComponent
} from '../../../components';
import { colors } from '../../../constants/colors';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../modals';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { handleAuthAPI } from '../../../api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../../redux/reducers/authReducer';

const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });
            const { idToken } = await GoogleSignin.signIn();
            const credential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(
                credential
            );
            const res = await handleAuthAPI(
                '/google-signin',
                userCredential.user,
                'post'
            );
            await AsyncStorage.setItem('authData', JSON.stringify(res.data));
            dispatch(addAuth(res.data));
            // console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View>
            <Row>
                <View
                    style={{
                        height: 1,
                        flex: 1,
                        backgroundColor: colors.gray.g500_80
                    }}
                />
                <Space width={10} />
                <TextComponent text='Or login with' />
                <Space width={10} />
                <View
                    style={{
                        height: 1,
                        flex: 1,
                        backgroundColor: colors.gray.g500_80
                    }}
                />
            </Row>
            <Space height={20} />

            <ButtonComponent
                onPress={loginWithGoogle}
                type='primary'
                value='Login with Google'
                backgroundColor={colors.gray.g500_10}
                color={colors.dark.d500}
                borderRadius={10}
                icon={
                    <Image
                        source={require('../../../assets/images/google-icon.png')}
                        style={{ width: 25, height: 25, marginRight: 5 }}
                    />
                }
            />
            <ButtonComponent
                onPress={() => console.log('Login with facebook')}
                type='primary'
                value='Login with Facebook'
                backgroundColor={colors.gray.g500_10}
                color={colors.dark.d500}
                borderRadius={10}
                icon={
                    <Image
                        source={require('../../../assets/images/facebook-icon.png')}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                }
            />
            <Loading visible={isLoading} />
        </View>
    );
};

export default SocialLogin;
