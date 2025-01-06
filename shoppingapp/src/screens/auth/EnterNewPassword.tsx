import React, {useState} from 'react';
import {
  ButtonComponent,
  Container,
  Input,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Image, View} from 'react-native';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';
import {SIZES} from '../../constants/theme';
import {Lock1, Mobile} from 'iconsax-react-native';
import {InfoModal} from '../../modals';

const EnterNewPassword = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  return (
    <Container back>
      <Section>
        <View style={[globalStyles.center]}>
          <TextComponent
            text="Enter New Password"
            font={fonts.Bold}
            size={20}
          />
          <Space height={10} />
          <TextComponent
            text="Please enter your new password"
            color={colors.gray.g500}
          />
          <Space height={20} />

          <Image
            source={require('../../assets/images/Newpassword.png')}
            style={{width: SIZES.width, height: 340}}
            resizeMode="contain"
          />
        </View>
        <Space height={20} />
        <Input
          value={password}
          onChange={val => setPassword(val)}
          allowClear
          password
          placeholder="Enter New Password"
          autoCapitalize="none"
          prefix={<Lock1 size={20} color={colors.gray.g500_80} />}
        />
        <Input
          value={confirmPassword}
          onChange={val => setConfirmPassword(val)}
          allowClear
          password
          placeholder="Re-Enter Password"
          autoCapitalize="none"
          prefix={<Lock1 size={20} color={colors.gray.g500_80} />}
        />
        <Space height={20} />
        <ButtonComponent
          onPress={() => setIsVisibleModalInfo(true)}
          type="primary"
          backgroundColor={colors.primary.p500}
          value="Verify"
        />
      </Section>

      <InfoModal
        visible={isVisibleModalInfo}
        onOk={() => {
          setIsVisibleModalInfo(false);
          navigation.navigate('Login');
        }}
        title="Password update successfully"
        description="Your password has been updated successfully"
        icon={<Mobile size={100} color={colors.primary.p500} />}
        okText="Back to HomeScreen"
      />
    </Container>
  );
};

export default EnterNewPassword;
