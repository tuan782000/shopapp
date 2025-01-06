import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  ButtonComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import axios from 'axios';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {fonts} from '../constants/fonts';
import {Loading} from '../modals';
import {HandleAPI} from '../api/handleAPI';
import {authSelector} from '../redux/reducers/authReducer';
import {useSelector} from 'react-redux';

const MapScreen = ({navigation, route}: any) => {
  const [initRegion, setInitRegion] = useState<{lat: number; long: number}>();
  const [isLoading, setIsLoading] = useState(false);

  // nhấn vào 1 điểm bất kỳ thì phải thay đổi vị trí chọn
  const [positionSelected, setPositionSelected] = useState<{
    lat: number;
    long: number;
  }>();

  const [address, setAddress] = useState('');

  const modalizeRef = useRef<Modalize>();
  const user = useSelector(authSelector); // redux

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      //   console.log(position);
      setInitRegion({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });

      setPositionSelected({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    positionSelected && getAddress(positionSelected);
    modalizeRef.current?.open(); // tự động mở modalize lên
  }, [positionSelected]);

  const getAddress = async (val: {lat: number; long: number}) => {
    // positionSelected -> useEffect -> getAddress -> bên thứ 3 hereAPI để gọi hàm lấy vị trí - setAddress lại address
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${val.lat},${val.long}&lang=vi-VI&apikey=uL0ciopWEgESL7lSwuwZyu0-jiCIsHU4G4N1h6hjFaQ`;

    try {
      const res = await axios(api);
      //   console.log(res);
      if (res && res.data && res.status === 200) {
        // console.log(res.data.items);
        const items = res.data.items;
        items.length > 0 && setAddress(items[0].address.label);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddAddress = async () => {
  //   setIsLoading(true);
  //     try {
  //     //   const res = await HandleAPI.Address(
  //     //     '/add-address',
  //     //     {...address, uid: user.id},
  //     //     'post',
  //     //   );

  //     //   // console.log(res);
  //     //   navigation.goBack();
  //     } catch (error: any) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const handleAddAddress = async () => {
    setIsLoading(true);

    try {
      const res = await HandleAPI.Address(
        '/add-address',
        {address, uid: user.id},
        'post',
      );
      console.log(res);
      navigation.navigate('SelectAddressScreen');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          paddingTop: 40,
          paddingHorizontal: 16,
        }}>
        <Row justifyContent="flex-start">
          <ButtonComponent
            backgroundColor={colors.dark.d500}
            buttonStyles={{
              width: 48,
              height: 48,
            }}
            onPress={() => navigation.goBack()}
            icon={<ArrowLeft2 size={24} color={colors.white.w500} />}
          />
        </Row>
      </View>
      {initRegion ? (
        <MapView
          style={{flex: 1}}
          showsUserLocation // vị trí chính xác người dùng
          initialRegion={{
            latitude: initRegion.lat,
            longitude: initRegion.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: initRegion.lat,
            longitude: initRegion.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          //   onPress={val => console.log(val.nativeEvent)}
          onPress={val =>
            setPositionSelected({
              lat: val.nativeEvent.coordinate.latitude,
              long: val.nativeEvent.coordinate.longitude,
            })
          }
          // show vị trí người dùng
          showsMyLocationButton>
          {/* Lần đầu tiên vào chưa có postionSelected không hiện Marker - vị trí */}
          {/* Nhưng useEffect ở trên giúp set lại positionSelected nên sẽ hiển thị Marker */}
          {positionSelected && (
            <Marker
              draggable // co kéo được
              title="ABC" // tên
              titleVisibility="visible" // hiện title
              coordinate={{
                latitude: positionSelected.lat,
                longitude: positionSelected.long,
              }}
            />
          )}
        </MapView>
      ) : (
        <Section>
          <TextComponent text="Can't get your position" />
        </Section>
      )}

      <Portal>
        {/* Modalize phải bọc trong Portal để mình kiểm soát được vị trí mà nó sẽ xuất hiện */}
        <Modalize
          overlayStyle={{backgroundColor: 'transparent'}}
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside"
          modalStyle={{paddingVertical: 20}}>
          <Section styles={{marginBottom: 30}}>
            <TextComponent text="Your location" font={fonts.Medium} />
            <Space height={5} />
            <TextComponent text={address} />
          </Section>
          <Space height={15} />
          <ButtonComponent
            onPress={handleAddAddress}
            backgroundColor={colors.primary.p500}
            inline
            value="Accept"
          />
        </Modalize>
      </Portal>

      <Loading visible={isLoading} />
    </View>
  );
};

export default MapScreen;
