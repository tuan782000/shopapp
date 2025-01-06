import {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {ButtonComponent, Space, Tabbar} from '../../../components';
import {ArrowRotateLeft} from 'iconsax-react-native';
import {colors} from '../../../constants/colors';

const Recently = () => {
  const [rencently, setRencently] = useState<any[]>([]);

  useEffect(() => {
    getProductRecently();
  }, []);

  const getProductRecently = () => {
    // const api = ``
    setRencently([
      {
        title: 'Fancy T-Shirt',
      },
      {
        title: 'Danim Jacket',
      },
      {
        title: 'One Piece',
      },
      {
        title: 'Marks & Spencer',
      },
    ]);
  };
  return (
    <View>
      <View>
        <Tabbar title="Recently Search" clear onClear={() => {}} />
      </View>
      <Space height={10} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: Dimensions.get('window').width,
        }}>
        {rencently.map((item, index) => (
          //   <ProductItem item={item} key={item.id} />
          <ButtonComponent
            key={index}
            onPress={() => {}}
            value={item.title}
            icon={
              <ArrowRotateLeft
                size={20}
                color={colors.gray.g500_80}
                style={{marginRight: 5}}
              />
            }
            color={colors.gray.g500_80}
            type="outline"
            borderRadius={10}
            buttonStyles={{borderColor: colors.dark.d500_5, marginRight: 10}}
          />
        ))}
      </View>
    </View>
  );
};

export default Recently;
