import { View, Text, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    ButtonComponent,
    Row,
    Section,
    Space,
    TextComponent
} from '../../components';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../styles/globalStyles';
import { ArrowLeft2 } from 'iconsax-react-native';
import { fonts } from '../../constants/fonts';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const ProfileScreen = ({ navigation }: any) => {
    // Nó vẫn thuộc Home nên cho nó vào HomeNavigator
    const user = useSelector(authSelector);

    //   console.log(user);

    return (
        <>
            <Row
                styles={{
                    paddingTop: Platform.OS === 'ios' ? 40 : 20,
                    backgroundColor: colors.white.w500
                }}
            >
                <Space width={5} />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[
                        globalStyles.center,
                        {
                            height: 42,
                            width: 42,
                            borderRadius: 100
                            // backgroundColor: 'rgba(0,0,0,0.5)',
                        }
                    ]}
                >
                    <ArrowLeft2 color={colors.dark.d500} />
                </TouchableOpacity>
                <TextComponent
                    flex={1}
                    textAlign='center'
                    numberOfLines={1}
                    font={fonts.Bold}
                    size={18}
                    color={colors.dark.d500}
                    styles={{ paddingRight: 30 }} // bên phải có icon thì xoá này đi
                    // text={product.title}
                    text='Profile'
                />
            </Row>
            <Section flex={1}>
                <Space height={20} />
                <Row justifyContent='flex-start'>
                    <TextComponent text='Email: ' />
                    <TextComponent text={user.email} />
                </Row>
                <Space height={20} />
            </Section>
        </>
    );
};

export default ProfileScreen;
