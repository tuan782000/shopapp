import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from '../screens';
import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HandleAPI } from '../api/handleAPI';
import { addProfile } from '../redux/reducers/profileReducer';

const Routers = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);

    const auth = useSelector(authSelector);

    // console.log(auth);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            await getAuth();

            if (1 > 2) {
                await getCarts();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsShowSplash(false); //
        }
    };

    const getAuth = async () => {
        const res = await AsyncStorage.getItem('authData');

        res && dispatch(addAuth(JSON.parse(res)));
    };

    const getCarts = async () => {};

    return isShowSplash ? (
        <SplashScreen />
    ) : (
        <NavigationContainer>
            {!auth || !auth.accesstoken ? <AuthNavigator /> : <MainNavigator />}
        </NavigationContainer>
    );
};

export default Routers;
