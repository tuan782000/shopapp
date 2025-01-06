import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Tabbar, TextComponent, Section, Tag} from '../../../components';
import {colors} from '../../../constants/colors';
import {HandleAPI} from '../../../api/handleAPI';
import {useNavigation} from '@react-navigation/native';

const TopCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    // show lỗi error.response.data.message
    const api = `/all-categories`;
    try {
      const res = await HandleAPI.Category(api);
      // console.log(res);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  /*
    const [itemsSelected, setItemsSelected] = useState<string[]>([])
    const handleToggleSelected = (id:string) => {
        const items = [...itemsSelected]

        const index = items.findIndex(element => element === id)

        if(index !== -1) {
            items.push(id)
        } else {
            items.splice(index, 1)
        }

        setItemsSelected(items);
    }
  */

  return (
    <View>
      {/* <Tabbar title="Top categories" viewAll onViewAll={() => {}} /> */}
      <View style={{paddingHorizontal: 16}}>
        <Tabbar title="Top categories" />
      </View>
      {categories.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          style={{paddingHorizontal: 16, paddingVertical: 12}}
          ListHeaderComponent={
            // <View style={{paddingLeft: 16}}>
            //   <TextComponent text={'All'} />
            // </View>
            <Tag
              styles={{
                backgroundColor: colors.primary.p500,
                paddingLeft: 16,
                marginRight: 16,
              }}
              // checked={['all']}
              textStyles={{color: colors.white.w500}}>
              <TextComponent text="All" color={colors.white.w500} />
            </Tag>
          }
          renderItem={({item, index}) => (
            // <View
            //   key={item.id}
            //   style={{paddingHorizontal: 16, marginRight: 12}}>
            //   <TextComponent text={item.title} />
            // </View>
            <Tag
              onCheck={() =>
                navigation.navigate('ProductScreen', {
                  id: item._id,
                  title: item.title,
                  sortBy: 'categories',
                })
              }
              styles={{marginRight: index <= categories.length - 1 ? 16 : 0}}
              key={item._id}>
              <TextComponent text={item.title} color={colors.primary.p500} />
            </Tag>
          )}
        />
      )}
    </View>
  );
};

export default TopCategories;
