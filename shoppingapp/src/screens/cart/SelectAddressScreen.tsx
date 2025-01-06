import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  CardComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {
  Add,
  AddCircle,
  ArrowLeft2,
  Edit2,
  Location,
  Paypal,
  TickCircle,
  Trash,
} from 'iconsax-react-native';
import {fonts} from '../../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AddressModel} from '../../models/AddressModel';
import {HandleAPI} from '../../api/handleAPI';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {Modalize} from 'react-native-modalize';
import {Loading} from '../../modals';
import {Portal} from 'react-native-portalize';

const SelectAddressScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<AddressModel[]>([]);
  const user = useSelector(authSelector); // redux
  const modalizeRef = useRef<Modalize>();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getListAddress();
  }, []);

  const getListAddress = async () => {
    setIsLoading(true);
    const api = `/list-address/${user.id}`;

    try {
      const listAddress: any = await HandleAPI.Address(api);
      // console.log(listAddress);
      setAddress(listAddress.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeAddress = async (id: string) => {
    setIsLoading(true);
    const api = `/remove-address?id=${id}`;

    try {
      await HandleAPI.Address(api, undefined, 'delete');
      getListAddress();
      modalizeRef.current?.close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(address);
  const handleOpenModal = (id: string) => {
    modalizeRef.current?.open();
    // console.log(id);
    setSelectedId(id);
  };

  return (
    <>
      <Row
        styles={{
          paddingTop: Platform.OS === 'ios' ? 40 : 20,
          backgroundColor: colors.white.w500,
        }}>
        <Space width={5} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            globalStyles.center,
            {
              height: 42,
              width: 42,
              borderRadius: 100,
              // backgroundColor: 'rgba(0,0,0,0.5)',
            },
          ]}>
          <ArrowLeft2 color={colors.dark.d500} />
        </TouchableOpacity>
        <TextComponent
          flex={1}
          textAlign="center"
          numberOfLines={1}
          font={fonts.Bold}
          size={18}
          color={colors.dark.d500}
          styles={{paddingRight: 30}} // bên phải có icon thì xoá này đi
          // text={product.title}
          text="Select Address"
        />
      </Row>
      <Section>
        <Space height={20} />
        <TextComponent text="Select Address" font={fonts.Bold} />
        <Space height={20} />
      </Section>
      {/* <ScrollView
        style={{flex: 1, zIndex: -1, backgroundColor: colors.white.w500}}>
        <CardComponent
          type="horizontal"
          onPress={() => console.log('Choose address')}>
          <Row alignItems="flex-start">
            <TickCircle size={20} color={colors.primary.p500} />
            <Space width={10} />
            <Row
              styles={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextComponent text="Home" font={fonts.Bold} />
              <Space height={10} />
              <TextComponent text="1901" />
              <TextComponent text="Hawai" />
            </Row>
            <Space width={10} />
            <Ionicons name="ellipsis-vertical-outline" size={20} />
          </Row>
        </CardComponent>
        <CardComponent type="horizontal">
          <Row alignItems="flex-start">
            <FontAwesome name="circle" color={colors.white.w500_10} size={20} />
            <Space width={10} />
            <Row
              styles={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextComponent text="Work" font={fonts.Bold} />
              <Space height={10} />
              <TextComponent text="1901" />
              <TextComponent text="Hawai" />
            </Row>
            <Space width={10} />
            <Ionicons name="ellipsis-vertical-outline" size={20} />
          </Row>
        </CardComponent>
        <CardComponent type="horizontal">
          <Row alignItems="flex-start">
            <FontAwesome name="circle" color={colors.white.w500_10} size={20} />
            <Space width={10} />
            <Row
              styles={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextComponent text="Other" font={fonts.Bold} />
              <Space height={10} />
              <TextComponent text="1901" />
              <TextComponent text="Hawai" />
            </Row>
            <Space width={10} />
            <Ionicons name="ellipsis-vertical-outline" size={20} />
          </Row>
        </CardComponent>
      </ScrollView> */}
      {/* <FlatList
        style={{flex: 1, zIndex: -1, backgroundColor: colors.white.w500}}
        showsVerticalScrollIndicator={false}
        data={address}
        renderItem={({item}) => (
          <CardComponent
            key={item._id}
            type="horizontal"
            onPress={() => console.log('Choose address')}>
            <Row alignItems="flex-start">
              <TickCircle size={20} color={colors.primary.p500} />
              <Space width={10} />
              <Row
                styles={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextComponent text={item.address} font={fonts.Bold} />
                <Space height={10} />
                <TextComponent text="1901" />
                <TextComponent text="Hawai" />
              </Row>
              <Space width={10} />
              <Ionicons name="ellipsis-vertical-outline" size={20} />
            </Row>
          </CardComponent>
        )}
      /> */}
      {address.length > 0 ? (
        <ScrollView
          style={{flex: 1, zIndex: -1, backgroundColor: colors.white.w500}}
          showsVerticalScrollIndicator={false}>
          {address?.map(item => (
            <CardComponent
              key={item._id}
              type="horizontal"
              onPress={() => console.log('Choose address')}>
              <Row alignItems="flex-start">
                <TickCircle size={20} color={colors.primary.p500} />
                <Space width={10} />
                <Row
                  styles={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'flex-start',
                  }}>
                  <TextComponent text={item.address} font={fonts.Bold} />
                  <Space height={10} />
                  {/* Bạn có thể thêm các thành phần khác ở đây nếu cần */}
                </Row>
                <Space width={10} />
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={20}
                  onPress={() => {
                    handleOpenModal(item._id);
                  }}
                />
              </Row>
            </CardComponent>
          ))}
        </ScrollView>
      ) : (
        <Section
          styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextComponent text="No Data" />
        </Section>
      )}

      <Section>
        <ButtonComponent
          onPress={() => console.log('Pay Now')}
          backgroundColor={colors.primary.p500}
          value="Select Address"
          buttonStyles={{marginBottom: 30}}
        />
      </Section>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAddressScreen')}
        style={{
          padding: 20,
          backgroundColor: colors.primary.p500,
          borderRadius: 999,
          position: 'absolute',
          bottom: 100,
          right: 20,
        }}>
        <Add size={30} color={colors.white.w500} />
      </TouchableOpacity>
      <Loading visible={isLoading} />
      <Portal>
        <Modalize
          // overlayStyle={{backgroundColor: 'transparent'}}
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside"
          modalStyle={{paddingVertical: 20}}>
          <Section>
            {/* <TextComponent text={selectedId} /> */}
            <Space height={10} />
            <Row
              alignItems="center"
              justifyContent="flex-start"
              onPress={() => console.log(selectedId)}>
              <TextComponent text="Edit" size={20} />
              <Space width={10} />
              <Edit2 color={colors.primary.p500} size={20} />
            </Row>
            <Space height={10} />
            <Row
              alignItems="center"
              justifyContent="flex-start"
              onPress={() => removeAddress(selectedId)}>
              <TextComponent text="Delete" size={20} />
              <Space width={10} />
              <Trash color={colors.primary.p500} size={20} />
            </Row>
            <Space height={20} />
          </Section>
        </Modalize>
      </Portal>
    </>
  );
};

export default SelectAddressScreen;
